# Deployment

Shared source builds https://mmm.sdsu.edu/ and https://mmm.sdsu.edu/new/.
The source repository is https://github.com/xuwenwu/m3website.

## Build and validate

Use Node.js 22.12 or newer with the locked dependencies (`npm ci`).

```powershell
npm run lint
npm run build:new
npm run test:seo:new
```

Save the preview output before building root: each build replaces `dist/`.

```powershell
npm run build:root
npm run test:seo:root
```

Each build contains 56 English/Traditional Chinese pages and three standalone teaching resources. Individual routes are real HTML directories; do not redirect them to the homepage. Production permits indexing. Preview uses staging crawler directives and production canonical URLs.

## Publish

Publish `/new/` first and verify it. Publish root when the user explicitly authorizes it. A request to update both authorizes both versions for that release.

Back up files that will be replaced and verify uploaded file hashes. Preserve server configuration, WordPress archives, server-managed analytics reports, and unrelated directories. Do not upload review fixtures, reports, private keys, `node_modules/`, or `.prerender/`.

The existing SSH configuration is in `scripts/deploy-cpanel-new.ps1` and `scripts/deploy-cpanel-root.ps1`. Private keys remain outside this repository.

Each build publishes `site-release.json`, identifying its source Git commit, deployment base, and navigation version. Root and preview should have the same source commit and navigation version, with different bases.

## GitHub workflow

Pushes to main validate both builds and deploy preview. If the same commit has already been published locally, the workflow recognizes its release marker and skips redundant SSH upload. This accommodates SDSU hosts that respond locally but time out from GitHub-hosted runners. Unpublished commits retain the existing automatic preview deployment.

## Verify live

Run `node scripts/audit-live-parity.mjs`. Check mobile Menu > More > Teaching, dismissal after selection, desktop dropdown dismissal, keyboard navigation, both languages, statistics links, teaching media, and news-to-grant links. Root must remain indexable; preview must retain staging protection.

The standalone Collaborators pages retain a map container, serialized location data, and a small map-only module. They share their renderer with the homepage. Do not strip the map when simplifying static controls. Static validation checks these elements and the map module asset. With Playwright available through `CODEX_TASK_PLAYWRIGHT_MODULE`, `scripts/test-collaborator-map.cjs` checks loaded tiles, every location marker, popups, zoom, and touch/mouse dragging on the homepage and Collaborators pages in both languages at phone and desktop widths. Arguments are origin/base URL, report label, and output directory.
