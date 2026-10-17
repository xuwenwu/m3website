import { mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import * as cheerio from 'cheerio'

const origin = 'https://mmm.sdsu.edu'
const output = process.argv[2] || '../drafts/site-parity-audit.json'
const cache = new Map()
async function get(path) {
  if (!cache.has(path)) cache.set(path, (async () => {
    const r = await fetch(origin + path, { signal: AbortSignal.timeout(45000), headers: { 'Cache-Control': 'no-cache' } })
    const bytes = Buffer.from(await r.arrayBuffer())
    return { status: r.status, bytes, text: bytes.toString('utf8') }
  })())
  return cache.get(path)
}
const normalize = s => s.replaceAll('/new/', '/').replace(/(index|leaflet-src)-[\w-]+\.(js|css)/g, '$1-BUILD.$2')
const sitemapPaths = text => [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname.replace(/^\/new\//, '/')).sort()
const rootMap = await get('/sitemap.xml'), newMap = await get('/new/sitemap.xml')
const rootRoutes = sitemapPaths(rootMap.text), newRoutes = sitemapPaths(newMap.text)
const routes = new Set([...rootRoutes, ...newRoutes])
const assets = new Set()
const results = []
for (const path of routes) {
  const [a,b] = await Promise.all([get(path), get('/new' + path)])
  const parse = html => {
    const $ = cheerio.load(html)
    $('[src],link[href],a[href]').each((_, el) => {
      const link = $(el).attr('src') || $(el).attr('href')
      if (!link || /^(data:|mailto:|tel:|#)/.test(link)) return
      const url = new URL(link, origin + path)
      if (url.origin !== origin) return
      const p = url.pathname.replace(/^\/new\//, '/')
      if (/\.[a-z0-9]+$/i.test(p)) assets.add(p)
      else if (p.endsWith('/')) routes.add(p)
    })
    $('meta[name="robots"]').remove()
    return normalize($.html()).replace(/>\s+</g, '><')
  }
  const x = a.status === 200 ? parse(a.text) : a.text, y = b.status === 200 ? parse(b.text) : b.text
  results.push({ path, rootStatus:a.status, newStatus:b.status, equal:x===y })
}
const assetResults = []
for (const path of assets) {
  // Bundle filenames differ by build base; compare the paired bundles separately below.
  if (/\/assets\/index-[\w-]+\.(js|css)$/.test(path)) continue
  const [a,b] = await Promise.all([get(path), get('/new' + path)])
  const textual = /\.(html|js|css|xml|txt|json|svg)$/i.test(path)
  assetResults.push({ path, rootStatus:a.status, newStatus:b.status, equal: textual ? normalize(a.text)===normalize(b.text) : a.bytes.equals(b.bytes) })
}
const bundles = []
for (const ext of ['js','css']) {
  const paths = await Promise.all(['/', '/new/'].map(async base => {
    const html = (await get(base)).text
    return html.match(new RegExp('(?:src|href)="([^" ]*/assets/index-[^" ]+\\.'+ext+')"'))?.[1]
  }))
  if (paths.every(Boolean)) {
    const [a,b] = await Promise.all(paths.map(get))
    bundles.push({ type:ext, paths, rootStatus:a.status, newStatus:b.status, equal:normalize(a.text)===normalize(b.text), hashes:[a,b].map(x=>createHash('sha256').update(x.bytes).digest('hex')) })
    if (ext === 'js') {
      const chunkPaths = [a,b].map((v,i)=>paths[i].replace(/index-[\w-]+\.js$/,v.text.match(/leaflet-src-[\w-]+\.js/)?.[0] || 'MISSING'))
      const [c,d] = await Promise.all(chunkPaths.map(get))
      bundles.push({type:'map-chunk',paths:chunkPaths,rootStatus:c.status,newStatus:d.status,equal:normalize(c.text)===normalize(d.text)})
    }
  }
}
const report = { checkedAt:new Date().toISOString(), sitemapEqual:JSON.stringify(rootRoutes)===JSON.stringify(newRoutes), pages:results, assets:assetResults, bundles }
await mkdir('../drafts', {recursive:true})
await writeFile(output,JSON.stringify(report,null,2))
console.log(JSON.stringify({ report:output, sitemapEqual:report.sitemapEqual, pages:results.length, assets:assetResults.length, differences:[...results,...assetResults,...bundles].filter(x=>!x.equal||x.rootStatus!==200||x.newStatus!==200) },null,2))
