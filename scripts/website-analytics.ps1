param(
  [int]$Days = 90,
  [string]$Remote = "mmm@mmm.sdsu.edu",
  [string]$KeyPath = "$HOME\.ssh\m3website_cpanel_ed25519",
  [string]$Domain = "mmm.sdsu.edu",
  [string]$OutputDir = ""
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $KeyPath)) {
  throw "SSH key not found: $KeyPath"
}

if (-not $OutputDir) {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $OutputDir = Join-Path (Resolve-Path ".").Path "analytics-reports\$stamp"
}

New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null

$remotePython = @'
import csv
import datetime as dt
import glob
import gzip
import hashlib
import ipaddress
import json
import os
import re
import subprocess
import sys
import tempfile
import urllib.request
from bisect import bisect_right
from collections import Counter, defaultdict
from urllib.parse import urlsplit

days = int(os.environ.get("M3_ANALYTICS_DAYS", "90"))
domain = os.environ.get("M3_ANALYTICS_DOMAIN", "mmm.sdsu.edu")
cutoff = dt.date.today() - dt.timedelta(days=days)

log_pattern = f"/home/mmm/logs/{domain}*.gz"
log_files = sorted(
    path for path in glob.glob(log_pattern)
    if "error" not in path.lower() and "ftp" not in path.lower()
)

line_re = re.compile(
    r'^(?P<ip>\S+) \S+ \S+ \[(?P<stamp>[^\]]+)\] '
    r'"(?P<method>\S+) (?P<url>\S+) (?P<proto>[^"]*)" '
    r'(?P<status>\d{3}) (?P<bytes>\S+) "(?P<referrer>[^"]*)" "(?P<ua>[^"]*)"'
)

month = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
    "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12,
}

static_ext = {
    ".css", ".js", ".map", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg",
    ".ico", ".mp4", ".mov", ".avi", ".pdf", ".zip", ".gz", ".woff", ".woff2",
    ".ttf", ".eot", ".xml", ".txt", ".webmanifest",
}

bot_terms = (
    "bot", "crawler", "spider", "slurp", "bingpreview", "facebookexternalhit",
    "linkedinbot", "whatsapp", "telegrambot", "preview", "monitor", "uptime",
)

own_hosts = {domain, "www." + domain}

def month_suffixes():
    today = dt.date.today().replace(day=1)
    values = []
    cursor = today
    for _ in range(4):
        values.append(cursor.strftime("%Y-%m"))
        cursor = (cursor - dt.timedelta(days=1)).replace(day=1)
    return values

def ensure_dbip_lite():
    cache_dir = os.path.expanduser("~/.m3-analytics")
    try:
        os.makedirs(cache_dir, exist_ok=True)
    except TypeError:
        if not os.path.isdir(cache_dir):
            os.makedirs(cache_dir)

    for suffix in month_suffixes():
        local_path = os.path.join(cache_dir, "dbip-country-lite-%s.csv.gz" % suffix)
        if os.path.exists(local_path) and os.path.getsize(local_path) > 1000000:
            return local_path

    for suffix in month_suffixes():
        url = "https://download.db-ip.com/free/dbip-country-lite-%s.csv.gz" % suffix
        local_path = os.path.join(cache_dir, "dbip-country-lite-%s.csv.gz" % suffix)
        tmp_path = local_path + ".tmp"
        try:
            request = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 M3LabAnalytics/1.0",
                "Referer": "https://db-ip.com/db/download/ip-to-country-lite",
            })
            with urllib.request.urlopen(request, timeout=60) as response:
                with open(tmp_path, "wb") as output:
                    while True:
                        chunk = response.read(1024 * 1024)
                        if not chunk:
                            break
                        output.write(chunk)
            if os.path.exists(tmp_path) and os.path.getsize(tmp_path) > 1000000:
                os.rename(tmp_path, local_path)
                return local_path
        except Exception:
            try:
                if os.path.exists(tmp_path):
                    os.remove(tmp_path)
            except Exception:
                pass
    return None

def load_dbip_lite():
    path = ensure_dbip_lite()
    if not path:
        return None, [], [], [], []

    v4_ranges = []
    v6_ranges = []
    try:
        with gzip.open(path, "rt", encoding="utf-8", errors="replace") as handle:
            reader = csv.reader(handle)
            for row in reader:
                if len(row) < 3:
                    continue
                try:
                    start = ipaddress.ip_address(row[0])
                    end = ipaddress.ip_address(row[1])
                    code = row[2].strip() or "ZZ"
                except ValueError:
                    continue
                target = v4_ranges if start.version == 4 else v6_ranges
                target.append((int(start), int(end), code))
    except Exception:
        return None, [], [], [], []

    v4_ranges.sort()
    v6_ranges.sort()
    return (
        os.path.basename(path),
        v4_ranges,
        [item[0] for item in v4_ranges],
        v6_ranges,
        [item[0] for item in v6_ranges],
    )

dbip_source, dbip_v4, dbip_v4_starts, dbip_v6, dbip_v6_starts = load_dbip_lite()

def parse_date(stamp):
    # Example: 04/Jun/2026:04:58:20 -0700
    day = int(stamp[0:2])
    mon = month[stamp[3:6]]
    year = int(stamp[7:11])
    return dt.date(year, mon, day)

def normalize_path(url):
    try:
        path = urlsplit(url).path or "/"
    except Exception:
        path = url.split("?", 1)[0] or "/"
    if path != "/" and path.endswith("/"):
        path = path.rstrip("/") + "/"
    return path

def is_static_path(path):
    lowered = path.lower()
    return any(lowered.endswith(ext) for ext in static_ext) or "/assets/" in lowered

def is_bot(ua):
    lowered = ua.lower()
    return any(term in lowered for term in bot_terms)

country_cache = {}

def country_for(ip):
    if ip in country_cache:
        return country_cache[ip]

    try:
        address = ipaddress.ip_address(ip)
        value = int(address)
        ranges = dbip_v4 if address.version == 4 else dbip_v6
        starts = dbip_v4_starts if address.version == 4 else dbip_v6_starts
        idx = bisect_right(starts, value) - 1
        if idx >= 0:
            start, end, code = ranges[idx]
            if start <= value <= end:
                country_cache[ip] = (code, code)
                return country_cache[ip]
    except Exception:
        pass

    code = "ZZ"
    name = "Unknown"
    try:
        result = subprocess.run(
            ["geoiplookup", ip],
            check=False,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=2,
        )
        text = (result.stdout or "").strip()
        match = re.search(r":\s*([A-Z]{2}),\s*(.+)$", text)
        if match and "not found" not in text.lower():
            code, name = match.group(1), match.group(2)
    except Exception:
        pass
    country_cache[ip] = (code, name)
    return country_cache[ip]

salt = f"{domain}:private-visitor-report".encode("utf-8")

def visitor_hash(ip):
    return hashlib.sha256(salt + ip.encode("utf-8")).hexdigest()[:16]

by_day_hits = Counter()
by_day_visitors = defaultdict(set)
by_day_country_hits = Counter()
by_day_country_visitors = defaultdict(set)
pages = Counter()
page_visitors = defaultdict(set)
referrers = Counter()
visitor_hits = Counter()
visitor_days = defaultdict(set)
visitor_country = {}
bot_requests = 0
total_lines = 0
included_pageviews = 0
first_date = None
last_date = None

for path in log_files:
    try:
        opener = gzip.open if path.endswith(".gz") else open
        with opener(path, "rt", encoding="utf-8", errors="replace") as handle:
            for line in handle:
                total_lines += 1
                match = line_re.match(line)
                if not match:
                    continue
                status = int(match.group("status"))
                method = match.group("method")
                ua = match.group("ua")
                request_date = parse_date(match.group("stamp"))
                if request_date < cutoff:
                    continue
                if status >= 400 or method not in {"GET", "HEAD"}:
                    continue
                if is_bot(ua):
                    bot_requests += 1
                    continue
                request_path = normalize_path(match.group("url"))
                if is_static_path(request_path):
                    continue

                ip = match.group("ip")
                code, country = country_for(ip)
                day = request_date.isoformat()
                first_date = request_date if first_date is None else min(first_date, request_date)
                last_date = request_date if last_date is None else max(last_date, request_date)
                included_pageviews += 1

                by_day_hits[day] += 1
                by_day_visitors[day].add(ip)
                by_day_country_hits[(day, code, country)] += 1
                by_day_country_visitors[(day, code, country)].add(ip)
                pages[request_path] += 1
                page_visitors[request_path].add(ip)
                visitor_hits[ip] += 1
                visitor_days[ip].add(day)
                visitor_country[ip] = (code, country)

                ref = match.group("referrer")
                if ref and ref != "-":
                    try:
                        ref_host = urlsplit(ref).netloc.lower()
                    except Exception:
                        ref_host = ""
                    if ref_host and ref_host not in own_hosts:
                        referrers[ref_host] += 1
    except FileNotFoundError:
        continue

by_day = [
    {
        "date": day,
        "pageviews": by_day_hits[day],
        "unique_visitors": len(by_day_visitors[day]),
    }
    for day in sorted(by_day_hits)
]

countries_by_day = [
    {
        "date": day,
        "country_code": code,
        "country": country,
        "pageviews": hits,
        "unique_visitors": len(by_day_country_visitors[(day, code, country)]),
    }
    for (day, code, country), hits in sorted(by_day_country_hits.items())
]

top_countries_counter = Counter()
top_countries_visitors = defaultdict(set)
for (day, code, country), hits in by_day_country_hits.items():
    top_countries_counter[(code, country)] += hits
    top_countries_visitors[(code, country)].update(by_day_country_visitors[(day, code, country)])

countries = [
    {
        "country_code": code,
        "country": country,
        "pageviews": hits,
        "unique_visitors": len(top_countries_visitors[(code, country)]),
    }
    for (code, country), hits in top_countries_counter.most_common()
]

top_pages = [
    {
        "path": path,
        "pageviews": hits,
        "unique_visitors": len(page_visitors[path]),
    }
    for path, hits in pages.most_common(100)
]

top_referrers = [
    {"referrer_host": host, "pageviews": hits}
    for host, hits in referrers.most_common(100)
]

visitor_hashes = []
for ip, hits in visitor_hits.most_common(100):
    code, country = visitor_country.get(ip, ("ZZ", "Unknown"))
    days_seen = sorted(visitor_days[ip])
    visitor_hashes.append({
        "visitor_hash": visitor_hash(ip),
        "country_code": code,
        "country": country,
        "pageviews": hits,
        "active_days": len(days_seen),
        "first_seen": days_seen[0] if days_seen else "",
        "last_seen": days_seen[-1] if days_seen else "",
    })

summary = {
    "domain": domain,
    "days_requested": days,
    "first_date": first_date.isoformat() if first_date else "",
    "last_date": last_date.isoformat() if last_date else "",
    "pageviews": included_pageviews,
    "unique_visitors": len(visitor_hits),
    "countries": len(top_countries_counter),
    "bot_requests_excluded": bot_requests,
    "log_files_read": len(log_files),
    "country_source": dbip_source or "server_geoiplookup_or_unknown",
    "country_source_attribution": "IP geolocation by DB-IP (https://db-ip.com)",
}

print("BEGIN_M3_ANALYTICS_JSON")
print(json.dumps({
    "summary": summary,
    "by_day": by_day,
    "countries_by_day": countries_by_day,
    "countries": countries,
    "top_pages": top_pages,
    "top_referrers": top_referrers,
    "visitor_hashes": visitor_hashes,
}, separators=(",", ":")))
print("END_M3_ANALYTICS_JSON")
'@

$sshArgs = @(
  "-i", $KeyPath,
  "-o", "BatchMode=yes",
  "-o", "StrictHostKeyChecking=accept-new",
  $Remote,
  "M3_ANALYTICS_DAYS=$Days M3_ANALYTICS_DOMAIN=$Domain python3 -"
)

$raw = $remotePython | & ssh @sshArgs
$rawText = ($raw -join "`n")
$match = [regex]::Match($rawText, "BEGIN_M3_ANALYTICS_JSON\s*(?<json>.*?)\s*END_M3_ANALYTICS_JSON", "Singleline")
if (-not $match.Success) {
  throw "Could not parse analytics JSON from server output."
}

$data = $match.Groups["json"].Value | ConvertFrom-Json

$summaryPath = Join-Path $OutputDir "summary.txt"
$data.summary.PSObject.Properties | ForEach-Object { "$($_.Name): $($_.Value)" } | Set-Content -LiteralPath $summaryPath -Encoding UTF8
$data.by_day | Export-Csv -LiteralPath (Join-Path $OutputDir "visits_by_day.csv") -NoTypeInformation -Encoding UTF8
$data.countries_by_day | Export-Csv -LiteralPath (Join-Path $OutputDir "countries_by_day.csv") -NoTypeInformation -Encoding UTF8
$data.countries | Export-Csv -LiteralPath (Join-Path $OutputDir "countries.csv") -NoTypeInformation -Encoding UTF8
$data.top_pages | Export-Csv -LiteralPath (Join-Path $OutputDir "top_pages.csv") -NoTypeInformation -Encoding UTF8
$data.top_referrers | Export-Csv -LiteralPath (Join-Path $OutputDir "top_referrers.csv") -NoTypeInformation -Encoding UTF8
$data.visitor_hashes | Export-Csv -LiteralPath (Join-Path $OutputDir "visitor_hashes_private.csv") -NoTypeInformation -Encoding UTF8

Write-Host "Website analytics report written to:"
Write-Host $OutputDir
Write-Host ""
Get-Content -LiteralPath $summaryPath
