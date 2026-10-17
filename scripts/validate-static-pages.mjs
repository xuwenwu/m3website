import { readFile, readdir, stat } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { createHash } from 'node:crypto'
import * as cheerio from 'cheerio'

const baseArg = process.argv.find((arg) => arg.startsWith('--base='))?.slice('--base='.length) ?? '/new/'
const base = baseArg === '/' ? '' : `/${baseArg.replace(/^\/+|\/+$/g, '')}`
const isStaging = base === '/new'
const navigationHash = createHash('sha256').update(await readFile('dist/site-navigation.js')).digest('hex').slice(0, 12)

function routeFor(dir) {
  const parts = [base.replace(/^\//, ''), dir.replace(/\/$/, '')].filter(Boolean)
  return `/${parts.join('/')}${parts.length ? '/' : ''}`
}

async function findHtml(dir) {
  const found = []
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, item.name)
    if (item.isDirectory()) found.push(...await findHtml(path))
    else if (item.name === 'index.html') found.push(path)
  }
  return found
}

const allFiles = await findHtml('dist')
// Standalone course demonstrations have their own interface rather than the site template.
const demoPath = 'teaching/me542/bcc-xrd/index.html'
const symmetryPath = 'teaching/me542/crystal-systems/index.html'
const videoPath = 'teaching/me542/what-is-light/index.html'
const standalonePaths = [demoPath, symmetryPath, videoPath]
const files = allFiles.filter((file) => !standalonePaths.includes(relative('dist', file).replace(/\\/g, '/')))
const failures = []
const demoHtml = await readFile(join('dist', demoPath), 'utf8')
const demo = cheerio.load(demoHtml)
const demoContent = demo('#codex-visualization').attr('data-srcdoc') ?? ''
if (!demo('title').text() || !demoContent.includes('bcc-animation') || !demoContent.includes('Play rotation')) {
  failures.push(`${demoPath}: standalone demonstration content is missing`)
}
const symmetryHtml = await readFile(join('dist', symmetryPath), 'utf8')
if (!symmetryHtml.includes('Seven Crystal Systems') || !symmetryHtml.includes('Play symmetry') || !(await stat('dist/teaching/me542/crystal-systems/three.min.js')).size) failures.push('Crystal-systems demonstration or its local 3D library is missing')
const knownPaths = new Set(allFiles.map((file) => {
  const dir = relative('dist', file).replace(/\\/g, '/').replace(/index\.html$/, '')
  return routeFor(dir)
}))

for (const file of files) {
  const html = await readFile(file, 'utf8')
  const $ = cheerio.load(html)
  const label = relative('dist', file).replace(/\\/g, '/')
  const text = $('main').text().replace(/\s+/g, ' ').trim()
  const isHomepage = label === 'index.html' || label === 'zh-TW/index.html'
  const isCollaborators = label === 'collaborators/index.html' || label === 'zh-TW/collaborators/index.html'

  if (text.length < (isHomepage ? 50000 : 80)) failures.push(`${label}: insufficient pre-rendered main content (${text.length})`)
  if ($('h1').length !== 1) failures.push(`${label}: expected one h1, found ${$('h1').length}`)
  if ($('link[rel="canonical"]').length !== 1) failures.push(`${label}: canonical count is ${$('link[rel="canonical"]').length}`)
  if ($('link[rel="alternate"][hreflang]').length !== 3) failures.push(`${label}: hreflang alternate count is ${$('link[rel="alternate"][hreflang]').length}`)
  const noindexCount = $('meta[name="robots"][content*="noindex"]').length
  if (isStaging && noindexCount !== 1) failures.push(`${label}: staging noindex is missing`)
  if (!isStaging && noindexCount !== 0) failures.push(`${label}: production page unexpectedly contains noindex`)
  if ($('script[data-page-schema]').length !== 1) failures.push(`${label}: page schema count is ${$('script[data-page-schema]').length}`)
  if (isHomepage && $('script[type="module"]').length !== 1) failures.push(`${label}: interactive homepage module is missing`)
  if (!isHomepage && $('script[type="module"]').length !== (isCollaborators ? 1 : 0)) failures.push(`${label}: unexpected interactive module count`)
  if (isCollaborators) {
    if ($('script[type="module"][data-collaborator-map]').length !== 1 || $('.collaborator-leaflet-map[data-locations]').length !== 1) failures.push(`${label}: interactive collaborator map is missing`)
    const locations = JSON.parse($('.collaborator-leaflet-map').attr('data-locations') ?? '[]')
    if (locations.length < 1 || !locations.every((point) => Number.isFinite(point.latitude) && Number.isFinite(point.longitude) && point.collaborators?.length)) failures.push(`${label}: collaborator map coordinates or names are missing`)
    const mapScript = $('script[data-collaborator-map]').attr('src')
    if (!(await stat(join('dist', mapScript.slice(base.length + 1)))).size) failures.push(`${label}: map module asset is missing`)
  }
  if ($(`script[src="${base}/site-navigation.js?v=${navigationHash}"][defer]`).length !== 1) failures.push(`${label}: shared navigation script or its cache version is missing`)
  if ($('.mobile-nav-toggle[aria-controls="main-navigation-links"][aria-expanded="false"]').length !== 1) failures.push(`${label}: collapsible mobile menu is missing`)
  if ($('a.skip-link[href="#main-content"]').length !== 1 || $('main#main-content[tabindex="-1"]').length !== 1) failures.push(`${label}: keyboard skip link or target is missing`)
  if ($('details.nav-more > summary.nav-more-button').length !== 1) failures.push(`${label}: More navigation control is missing`)
  if ($('#secondary-navigation-links a').length < 5) failures.push(`${label}: More navigation links are missing`)
  const statsHref = `${base}${label.startsWith('zh-TW/') ? '/zh-TW' : ''}/#visitor-stats`
  if ($(`#secondary-navigation-links a[href="${statsHref}"]`).length !== 1) failures.push(`${label}: Stats menu link must point to the localized homepage statistics`)

  $('script[type="application/ld+json"]').each((_, element) => {
    try { JSON.parse($(element).text()) } catch { failures.push(`${label}: invalid JSON-LD`) }
  })

  $('a[href^="/"]').each((_, element) => {
    const href = ($(element).attr('href') ?? '').split('#')[0].split('?')[0]
    const isInScope = base ? href.startsWith(`${base}/`) : !href.startsWith('/new/')
    if (isInScope && href.endsWith('/') && !knownPaths.has(href)) failures.push(`${label}: broken internal route ${href}`)
  })

  $('a[href^="#"]').each((_, element) => {
    const hash = ($(element).attr('href') ?? '').slice(1)
    if (hash && !$('[id]').toArray().some((node) => $(node).attr('id') === decodeURIComponent(hash))) failures.push(`${label}: missing fragment target #${hash}`)
  })
  let previousHeading = 0
  $('main h1, main h2, main h3, main h4, main h5, main h6').each((_, element) => {
    const level = Number(element.tagName.slice(1))
    if (level > previousHeading + 1) failures.push(`${label}: heading skips from h${previousHeading} to h${level}`)
    previousHeading = level
  })
}

const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const sitemapUrlCount = (sitemap.match(/<url>/g) ?? []).length
if (sitemapUrlCount !== allFiles.length) failures.push(`sitemap: expected ${allFiles.length} URLs, found ${sitemapUrlCount}`)
if (!(await stat('dist/site-navigation.js')).size) failures.push('Shared navigation script is empty')
for (const asset of ['index.html', 'poster.jpg', 'captions.vtt', 'what-is-light.mp4']) {
  if (!(await stat(join('dist/teaching/me542/what-is-light', asset))).size) failures.push(`Teaching video asset is missing: ${asset}`)
}
if (!(await stat('dist/robots.txt')).size) failures.push('robots.txt is empty')
const robots = await readFile('dist/robots.txt', 'utf8')
const release = JSON.parse(await readFile('dist/site-release.json', 'utf8'))
if (release.base !== (base || '/') || release.navigation_version !== navigationHash || !release.source_commit) failures.push('Release identity does not match this build')
if (isStaging && !robots.includes('Disallow: /new/')) failures.push('robots.txt does not protect staging')
if (!isStaging && (!robots.includes('Allow: /') || !robots.includes('Sitemap: https://mmm.sdsu.edu/sitemap.xml'))) failures.push('robots.txt is missing production crawler directives')

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Validated ${files.length} pre-rendered pages, navigation menus, metadata blocks, JSON-LD records, ${isStaging ? 'staging controls' : 'production crawler controls'}, sitemap URLs, and internal routes.`)
