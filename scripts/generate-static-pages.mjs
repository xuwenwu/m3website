import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import * as cheerio from 'cheerio'

const baseArg = process.argv.find((arg) => arg.startsWith('--base='))?.slice('--base='.length) ?? '/'
const base = baseArg === '/' ? '' : `/${baseArg.replace(/^\/+|\/+$/g, '')}`
const isStaging = base === '/new'
const productionOrigin = 'https://mmm.sdsu.edu'
const distDir = 'dist'
const buildManifest = JSON.parse(await readFile(join(distDir, '.vite/manifest.json'), 'utf8'))
const mapEntry = buildManifest['src/entry-map.ts']
if (!mapEntry?.file) throw new Error('Collaborator map entry is missing from the build')
const navigationHash = createHash('sha256').update(await readFile(join(distDir, 'site-navigation.js'))).digest('hex').slice(0, 12)
const template = (await readFile(join(distDir, 'index.html'), 'utf8'))
  .replace(`${base}/site-navigation.js`, `${base}/site-navigation.js?v=${navigationHash}`)
const { render } = await import(`../.prerender/entry-server.js?ts=${Date.now()}`)

const sectionPages = [
  ['research', 'Research', '#research'],
  ['publications', 'Publications', '#publications'],
  ['people', 'People', '#people'],
  ['grants', 'Grants and Sponsored Projects', '#grants'],
  ['news', 'Lab News', '#news'],
  ['opportunities', 'Academic Opportunities', '#opportunities'],
  ['join', 'Join the M3 Lab', '#join'],
  ['teaching', 'Teaching and Student Training', '#teaching'],
  ['collaborators', 'Collaborators and Professional Network', '#collaborators'],
  ['resources', 'Experimental and Computing Resources', '#resources'],
  ['contact', 'Contact the M3 Lab', '#contact'],
]

const projectSlugs = (await readdir('src/content/projects'))
  .filter((name) => name.endsWith('.md'))
  .map((name) => name.replace(/\.md$/, ''))

const newsFiles = (await readdir('src/content/news')).filter((name) => name.endsWith('.md'))
const newsPages = await Promise.all(newsFiles.map(async (name) => {
  const slug = name.replace(/\.md$/, '')
  const source = await readFile(join('src/content/news', name), 'utf8')
  const date = source.match(/^date:\s*["']?([^\r\n"']+)/m)?.[1]?.trim()
  return { slug, date }
}))

function localizedRoute(route, language) {
  return `${language === 'zh-TW' ? '/zh-TW' : ''}${route}`
}

function deployedRoute(route, language) {
  return `${base}${localizedRoute(route, language)}` || '/'
}

function absoluteProductionUrl(route, language) {
  return `${productionOrigin}${localizedRoute(route, language)}`
}

function ensureTrailingSlash(value) {
  return value.endsWith('/') ? value : `${value}/`
}

function addAlternates($, route) {
  $('link[rel="alternate"][hreflang]').remove()
  $('head').append(`\n    <link rel="alternate" hreflang="en" href="${absoluteProductionUrl(route, 'en')}" />`)
  $('head').append(`\n    <link rel="alternate" hreflang="zh-Hant" href="${absoluteProductionUrl(route, 'zh-TW')}" />`)
  $('head').append(`\n    <link rel="alternate" hreflang="x-default" href="${absoluteProductionUrl(route, 'en')}" />`)
}

function setHead($, { route, language, title, description, schemaType = 'WebPage', date }) {
  const canonical = absoluteProductionUrl(route, language)
  const pageTitle = `${title} | M3 Lab, SDSU`
  $('html').attr('lang', language === 'zh-TW' ? 'zh-Hant' : 'en')
  $('title').text(pageTitle)
  $('meta[name="description"]').attr('content', description)
  $('link[rel="canonical"]').attr('href', canonical)
  $('meta[property="og:title"]').attr('content', pageTitle)
  $('meta[property="og:description"]').attr('content', description)
  $('meta[property="og:url"]').attr('content', canonical)
  $('meta[property="og:type"]').attr('content', schemaType === 'NewsArticle' ? 'article' : 'website')
  $('meta[name="robots"], script[data-page-schema]').remove()
  if (isStaging) $('head').append('\n    <meta name="robots" content="noindex, follow" />')
  addAlternates($, route)

  const entity = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: title,
    headline: schemaType === 'NewsArticle' ? title : undefined,
    description,
    url: canonical,
    datePublished: date,
    author: { '@type': 'Person', name: 'Wenwu Xu', url: `${productionOrigin}/people/` },
    publisher: {
      '@type': 'ResearchOrganization',
      name: 'Multiscale Modeling of Materials Lab',
      alternateName: 'M3 Lab',
      url: productionOrigin,
      parentOrganization: { '@type': 'CollegeOrUniversity', name: 'San Diego State University' },
    },
  }
  Object.keys(entity).forEach((key) => entity[key] === undefined && delete entity[key])
  $('head').append(`\n    <script type="application/ld+json" data-page-schema>${JSON.stringify(entity)}</script>`)
}

function descriptionFrom($element, fallback) {
  const text = $element.find('p').filter((_, node) => {
    const item = $element.find(node)
    return !item.hasClass('eyebrow') && !item.hasClass('date')
  }).first().text().replace(/\s+/g, ' ').trim() || fallback
  return text.length > 190 ? `${text.slice(0, 187).trim()}...` : text
}

function simplifyStaticControls($) {
  $('.filter-row, .search-filter-bar, .result-summary, .detail-toggle').remove()
  $('.site-nav').removeClass('is-open').addClass('static-nav')
  $('.mobile-secondary-nav-link').remove()
  $('button').filter((_, element) => !$(element).is('.mobile-nav-toggle') && !$(element).closest('video').length).remove()
}

function promoteHeading($element) {
  const heading = $element.find('h2').first()
  if (heading.length) heading.replaceWith(`<h1${heading.attr('id') ? ` id="${heading.attr('id')}"` : ''}>${heading.html()}</h1>`)
}

function normalizeHeadingOutline($, $content) {
  const parents = []
  $content.find('h1,h2,h3,h4,h5,h6').each((_, element) => {
    const original = Number(element.tagName.slice(1))
    while (parents.length && parents.at(-1).original >= original) parents.pop()
    const level = parents.length ? Math.min(original, parents.at(-1).level + 1) : original
    if (level !== original) {
      // Retain the existing visual style while repairing the semantic outline.
      $(element).attr('data-heading-level', String(original))
      element.tagName = `h${level}`
    }
    parents.push({ original, level })
  })
}

async function writePage(route, language, options) {
  const pathname = deployedRoute(route, language)
  const rendered = render(pathname, true)
  const $app = cheerio.load(`<div id="root">${rendered}</div>`, { decodeEntities: false })
  const $main = $app('main')
  let content

  if (options.kind === 'section') {
    content = $app(options.selector).first().clone()
    if (options.slug === 'research') content.find('.project-detail-section').remove()
    promoteHeading(content)
  } else if (options.kind === 'project') {
    content = $app(`#project-${options.slug}`).first().clone()
    const heading = content.find('h3').first()
    heading.replaceWith(`<h1>${heading.html()}</h1>`)
    const $detail = cheerio.load(`<section class="section research-section static-detail-section"><p class="eyebrow">Research project</p>${$app.html(content)}</section>`, { decodeEntities: false })
    content = $detail('body > section').first()
  } else {
    content = $app(`#news-${options.slug}`).first().clone()
    const heading = content.find('h3,h5').first()
    heading.replaceWith(`<h1>${heading.html()}</h1>`)
    const $detail = cheerio.load(`<section class="section news-section static-detail-section"><p class="eyebrow">Lab news</p>${$app.html(content)}</section>`, { decodeEntities: false })
    content = $detail('body > section').first()
  }

  if (!content?.length) throw new Error(`Could not find content for ${pathname}`)
  normalizeHeadingOutline($app, content)
  $main.empty().append(content)
  simplifyStaticControls($app)

  const title = content.find('h1').first().text().replace(/\s+/g, ' ').trim() || options.title
  const fallback = `${title} from the Multiscale Modeling of Materials Lab at San Diego State University.`
  const description = descriptionFrom(content, fallback)

  const $ = cheerio.load(template, { decodeEntities: false })
  $('#root').replaceWith($app('#root'))
  $('script[type="module"], link[rel="modulepreload"]').remove()
  if (options.slug === 'collaborators') {
    $('body').append(`<script type="module" data-collaborator-map src="${base}/${mapEntry.file}"></script>`)
    for (const css of mapEntry.css ?? []) $('head').append(`<link rel="stylesheet" href="${base}/${css}">`)
  }
  setHead($, {
    route,
    language,
    title,
    description,
    schemaType: options.kind === 'news' ? 'NewsArticle' : options.kind === 'project' ? 'ResearchProject' : 'CollectionPage',
    date: options.date,
  })

  const outputDir = join(distDir, ...deployedRoute(route, language).replace(base, '').split('/').filter(Boolean))
  await mkdir(outputDir, { recursive: true })
  await writeFile(join(outputDir, 'index.html'), $.html())
  return { route, language, title }
}

async function prerenderHomepage(language) {
  const route = '/'
  const pathname = deployedRoute(route, language)
  const $ = cheerio.load(template, { decodeEntities: false })
  $('#root').html(render(pathname, false))
  const title = language === 'zh-TW' ? '材料多尺度建模實驗室 (M3 Lab) | SDSU' : 'Multiscale Modeling of Materials Lab | SDSU'
  const description = language === 'zh-TW'
    ? 'Wenwu Xu 教授在聖地牙哥州立大學的材料多尺度建模實驗室，研究場輔助製程、晶界工程、微結構與計算材料科學。'
    : "Dr. Wenwu Xu's Multiscale Modeling of Materials Lab at San Diego State University studies field-assisted processing, grain-boundary engineering, microstructure, and computational materials science."
  setHead($, { route, language, title: title.replace(' | SDSU', ''), description })
  $('title').text(title)

  const outputDir = language === 'zh-TW' ? join(distDir, 'zh-TW') : distDir
  await mkdir(outputDir, { recursive: true })
  await writeFile(join(outputDir, 'index.html'), $.html())
}

await prerenderHomepage('en')
await prerenderHomepage('zh-TW')

const generated = []
for (const language of ['en', 'zh-TW']) {
  for (const [slug, title, selector] of sectionPages) {
    generated.push(await writePage(`/${slug}/`, language, { kind: 'section', slug, title, selector }))
  }
  for (const slug of projectSlugs) {
    generated.push(await writePage(`/research/${slug}/`, language, { kind: 'project', slug, title: slug }))
  }
  for (const news of newsPages) {
    generated.push(await writePage(`/news/${news.slug}/`, language, { kind: 'news', slug: news.slug, title: news.slug, date: news.date }))
  }
}

const sitemapRoutes = ['/', ...sectionPages.map(([slug]) => `/${slug}/`), ...projectSlugs.map((slug) => `/research/${slug}/`), ...newsPages.map(({ slug }) => `/news/${slug}/`)]
const teachingDemoRoutes = ['crystal-systems', 'bcc-xrd', 'what-is-light'].map((slug) => `/teaching/me542/${slug}/`)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapRoutes.flatMap((route) => ['en', 'zh-TW'].map((language) => `  <url>
    <loc>${productionOrigin}${deployedRoute(route, language)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${productionOrigin}${deployedRoute(route, 'en')}" />
    <xhtml:link rel="alternate" hreflang="zh-Hant" href="${productionOrigin}${deployedRoute(route, 'zh-TW')}" />
  </url>`)).join('\n')}
${teachingDemoRoutes.map((route) => `  <url><loc>${productionOrigin}${base}${route}</loc></url>`).join('\n')}
</urlset>
`
await writeFile(join(distDir, 'sitemap.xml'), sitemap)

const robots = isStaging
  ? `User-agent: *\nDisallow: /new/\n\n# Production crawler policy is activated only after root deployment.\n`
  : `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nSitemap: ${productionOrigin}/sitemap.xml\n`
await writeFile(join(distDir, 'robots.txt'), robots)

let sourceCommit = process.env.GITHUB_SHA
if (!sourceCommit) {
  try { sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() } catch { sourceCommit = 'local-review' }
}
await writeFile(join(distDir, 'site-release.json'), `${JSON.stringify({
  source_commit: sourceCommit,
  base: base || '/',
  navigation_version: navigationHash,
}, null, 2)}\n`)

console.log(`Pre-rendered ${generated.length + 2} pages for ${base || '/'} with canonical metadata, language alternates, sitemap, and crawler policy.`)
