# Deployment Notes

The recommended first deployment is a non-destructive test copy at:

```text
https://mmm.sdsu.edu/new/
```

This keeps the current WordPress site untouched while the redesign is reviewed.

## Build for the Test Subdirectory

```powershell
npm ci
npm run lint
npm run build:new
npm run preview
```

Upload the contents of `dist/` to the `new` folder on the SDSU/RohanCP server.

Important: upload the files inside `dist/`, not the `dist` folder itself. After upload, the server folder should look like:

```text
new/
  index.html
  assets/
  favicon.svg
  icons.svg
```

## Build for the Final Root Site

Use this only when you are ready to replace the current root site:

```powershell
npm ci
npm run lint
npm run build:root
```

Upload the contents of `dist/` to the public web root for `mmm.sdsu.edu`.

## Routing Notes

The current site uses one page with section anchors such as `#research`, `#people`, and `#join`. It does not use client-side routes like `/research`, so an Apache `.htaccess` fallback is not required for the current version.

If future versions add real routes such as `/research` or `/people`, the server may need a fallback rule that serves `index.html` for those paths.

## WordPress Notes

For the first deployment, do not convert this into a WordPress theme. Use static hosting in `/new/` if SDSU/RohanCP allows file upload.

Convert to a WordPress theme later only if you decide that editing through the WordPress dashboard is more important than the simpler Markdown/YAML workflow in this repository.
