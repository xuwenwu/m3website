param(
  [string]$HostName = "mmm.sdsu.edu",
  [string]$User = "mmm",
  [string]$RemoteRoot = "/home/mmm/public_html",
  [string]$KeyPath = "$HOME\.ssh\m3website_cpanel_ed25519"
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$stage = Join-Path $root "tmp\cpanel-deploy"
$zip = Join-Path $stage "m3-new-deploy.zip"
$newDir = Join-Path $stage "new"

if (!(Test-Path $KeyPath)) {
  throw "SSH key not found: $KeyPath"
}

Push-Location $root
try {
  npm run build:new

  if (Test-Path $stage) {
    Remove-Item -LiteralPath $stage -Recurse -Force
  }

  New-Item -ItemType Directory -Path $newDir | Out-Null
  Copy-Item -Path (Join-Path $root "dist\*") -Destination $newDir -Recurse -Force
  Compress-Archive -Path $newDir -DestinationPath $zip -Force

  $target = "${User}@${HostName}:${RemoteRoot}/m3-new-deploy.zip"
  scp -i $KeyPath -o BatchMode=yes -o StrictHostKeyChecking=accept-new $zip $target

  $remoteCommand = "cd $RemoteRoot && unzip -o m3-new-deploy.zip; rm -f m3-new-deploy.zip"
  ssh -i $KeyPath -o BatchMode=yes -o StrictHostKeyChecking=accept-new "${User}@${HostName}" $remoteCommand
}
finally {
  Pop-Location
}
