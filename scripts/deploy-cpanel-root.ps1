param(
  [string]$HostName = "mmm.sdsu.edu",
  [string]$User = "mmm",
  [string]$RemoteRoot = "/home/mmm/public_html",
  [string]$KeyPath = "C:\Users\wenwu.xu.ID\.ssh\m3website_cpanel_ed25519"
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$stage = Join-Path ([System.IO.Path]::GetTempPath()) ("m3-cpanel-root-deploy-" + [guid]::NewGuid().ToString("N"))
$zip = Join-Path $stage "m3-root-deploy.zip"

if (!(Test-Path $KeyPath)) { throw "SSH key not found: $KeyPath" }

Push-Location $root
try {
  npm run build:root
  New-Item -ItemType Directory -Path $stage | Out-Null
  Compress-Archive -Path (Join-Path $root "dist\*") -DestinationPath $zip -Force
  $target = "${User}@${HostName}:${RemoteRoot}/m3-root-deploy.zip"
  scp -i $KeyPath -o BatchMode=yes -o StrictHostKeyChecking=accept-new $zip $target
  $remoteCommand = "cd $RemoteRoot && unzip -o m3-root-deploy.zip; rm -f m3-root-deploy.zip"
  ssh -i $KeyPath -o BatchMode=yes -o StrictHostKeyChecking=accept-new "${User}@${HostName}" $remoteCommand
}
finally {
  if (Test-Path $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
  Pop-Location
}
