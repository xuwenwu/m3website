#!/usr/bin/env python3
import csv
import datetime as dt
import gzip
import hashlib
import ipaddress
import json
import os
import re
import subprocess
import urllib.request
from bisect import bisect_right
from collections import Counter, defaultdict
from urllib.parse import urlsplit


DOMAIN = os.environ.get("M3_ANALYTICS_DOMAIN", "mmm.sdsu.edu")
DAYS = int(os.environ.get("M3_ANALYTICS_DAYS", "90"))
LOG_DIR = os.environ.get("M3_ANALYTICS_LOG_DIR", "/home/mmm/logs")
PUBLIC_DIR = os.environ.get("M3_ANALYTICS_PUBLIC_DIR", "/home/mmm/public_html/analytics")
OUTPUT_PATH = os.path.join(PUBLIC_DIR, "visitor-stats.json")
CACHE_DIR = os.environ.get("M3_ANALYTICS_CACHE_DIR", "/home/mmm/.m3-analytics")


LINE_RE = re.compile(
    r'^(?P<ip>\S+) \S+ \S+ \[(?P<stamp>[^\]]+)\] '
    r'"(?P<method>\S+) (?P<url>\S+) (?P<proto>[^"]*)" '
    r'(?P<status>\d{3}) (?P<bytes>\S+) "(?P<referrer>[^"]*)" "(?P<ua>[^"]*)"'
)

MONTH = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
    "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12,
}

STATIC_EXT = {
    ".css", ".js", ".map", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg",
    ".ico", ".mp4", ".mov", ".avi", ".pdf", ".zip", ".gz", ".woff", ".woff2",
    ".ttf", ".eot", ".xml", ".txt", ".webmanifest",
}

BOT_TERMS = (
    "bot", "crawler", "spider", "slurp", "bingpreview", "facebookexternalhit",
    "linkedinbot", "whatsapp", "telegrambot", "preview", "monitor", "uptime",
)


def month_suffixes():
    cursor = dt.date.today().replace(day=1)
    for _ in range(4):
        yield cursor.strftime("%Y-%m")
        cursor = (cursor - dt.timedelta(days=1)).replace(day=1)


def ensure_dbip_lite():
    os.makedirs(CACHE_DIR, exist_ok=True)
    for suffix in month_suffixes():
        local_path = os.path.join(CACHE_DIR, "dbip-country-lite-%s.csv.gz" % suffix)
        if os.path.exists(local_path) and os.path.getsize(local_path) > 1000000:
            return local_path

    for suffix in month_suffixes():
        url = "https://download.db-ip.com/free/dbip-country-lite-%s.csv.gz" % suffix
        local_path = os.path.join(CACHE_DIR, "dbip-country-lite-%s.csv.gz" % suffix)
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
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
    return None


def load_dbip_lite():
    path = ensure_dbip_lite()
    if not path:
        return None, [], [], [], []

    v4_ranges = []
    v6_ranges = []
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

    v4_ranges.sort()
    v6_ranges.sort()
    return (
        os.path.basename(path),
        v4_ranges,
        [item[0] for item in v4_ranges],
        v6_ranges,
        [item[0] for item in v6_ranges],
    )


DBIP_SOURCE, DBIP_V4, DBIP_V4_STARTS, DBIP_V6, DBIP_V6_STARTS = load_dbip_lite()
COUNTRY_CACHE = {}


def country_for(ip):
    if ip in COUNTRY_CACHE:
        return COUNTRY_CACHE[ip]
    try:
        address = ipaddress.ip_address(ip)
        value = int(address)
        ranges = DBIP_V4 if address.version == 4 else DBIP_V6
        starts = DBIP_V4_STARTS if address.version == 4 else DBIP_V6_STARTS
        idx = bisect_right(starts, value) - 1
        if idx >= 0:
            start, end, code = ranges[idx]
            if start <= value <= end:
                COUNTRY_CACHE[ip] = code
                return code
    except Exception:
        pass

    COUNTRY_CACHE[ip] = "ZZ"
    return "ZZ"


def parse_date(stamp):
    return dt.date(int(stamp[7:11]), MONTH[stamp[3:6]], int(stamp[0:2]))


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
    return any(lowered.endswith(ext) for ext in STATIC_EXT) or "/assets/" in lowered


def is_bot(ua):
    lowered = ua.lower()
    return any(term in lowered for term in BOT_TERMS)


def list_log_files():
    paths = []
    for name in os.listdir(LOG_DIR):
        lower = name.lower()
        if not name.startswith(DOMAIN):
            continue
        if "error" in lower or "ftp" in lower:
            continue
        if lower.endswith(".gz"):
            paths.append(os.path.join(LOG_DIR, name))
    return sorted(paths)


def build_report():
    cutoff = dt.date.today() - dt.timedelta(days=DAYS)
    by_day_hits = Counter()
    by_day_visitors = defaultdict(set)
    country_hits = Counter()
    country_visitors = defaultdict(set)
    country_day_hits = Counter()
    country_day_visitors = defaultdict(set)
    page_hits = Counter()
    page_visitors = defaultdict(set)
    all_visitors = set()
    bot_requests = 0
    included_pageviews = 0
    first_date = None
    last_date = None
    log_files = list_log_files()

    for path in log_files:
        with gzip.open(path, "rt", encoding="utf-8", errors="replace") as handle:
            for line in handle:
                match = LINE_RE.match(line)
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
                country = country_for(ip)
                day = request_date.isoformat()
                first_date = request_date if first_date is None else min(first_date, request_date)
                last_date = request_date if last_date is None else max(last_date, request_date)
                included_pageviews += 1
                all_visitors.add(ip)

                by_day_hits[day] += 1
                by_day_visitors[day].add(ip)
                country_hits[country] += 1
                country_visitors[country].add(ip)
                country_day_hits[(day, country)] += 1
                country_day_visitors[(day, country)].add(ip)
                page_hits[request_path] += 1
                page_visitors[request_path].add(ip)

    return {
        "generated_at": dt.datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
        "domain": DOMAIN,
        "days": DAYS,
        "first_date": first_date.isoformat() if first_date else "",
        "last_date": last_date.isoformat() if last_date else "",
        "pageviews": included_pageviews,
        "unique_visitors": len(all_visitors),
        "countries": len(country_hits),
        "bot_requests_excluded": bot_requests,
        "country_source": DBIP_SOURCE or "unknown",
        "country_source_attribution": "IP geolocation by DB-IP (https://db-ip.com)",
        "privacy_note": "Public stats are aggregated. Raw IP addresses and visitor hashes are not published.",
        "daily": [
            {
                "date": day,
                "pageviews": by_day_hits[day],
                "unique_visitors": len(by_day_visitors[day]),
            }
            for day in sorted(by_day_hits)
        ],
        "country_totals": [
            {
                "country_code": code,
                "pageviews": hits,
                "unique_visitors": len(country_visitors[code]),
            }
            for code, hits in country_hits.most_common(20)
        ],
        "countries_by_day": [
            {
                "date": day,
                "country_code": code,
                "pageviews": hits,
                "unique_visitors": len(country_day_visitors[(day, code)]),
            }
            for (day, code), hits in sorted(country_day_hits.items())
        ],
        "top_pages": [
            {
                "path": path,
                "pageviews": hits,
                "unique_visitors": len(page_visitors[path]),
            }
            for path, hits in page_hits.most_common(10)
        ],
    }


def main():
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    report = build_report()
    tmp_path = OUTPUT_PATH + ".tmp"
    with open(tmp_path, "w", encoding="utf-8") as handle:
        json.dump(report, handle, indent=2, sort_keys=True)
        handle.write("\n")
    os.rename(tmp_path, OUTPUT_PATH)
    print("Wrote %s" % OUTPUT_PATH)


if __name__ == "__main__":
    main()
