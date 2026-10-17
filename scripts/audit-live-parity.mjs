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
const normalize = s => s.replaceAll('/new/', '/').replace(/([\w-]+?)-[\w-]{8}\.(js|css)/g, '$1-BUILD.$2')
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
  if (/\/assets\/[\w-]+-[\w-]{8}\.(js|css)$/.test(path)) continue
  const [a,b] = await Promise.all([get(path), get('/new' + path)])
  const textual = /\.(html|js|css|xml|txt|json|svg)$/i.test(path)
  assetResults.push({ path, rootStatus:a.status, newStatus:b.status, equal: textual ? normalize(a.text)===normalize(b.text) : a.bytes.equals(b.bytes) })
}
const bundles = []
const paired = new Set()
async function compareBundle(paths) {
  const key = paths.join('|')
  if (paired.has(key)) return
  paired.add(key)
    const [a,b] = await Promise.all(paths.map(get))
    bundles.push({ type:paths[0].endsWith('.css')?'css':'js', paths, rootStatus:a.status, newStatus:b.status, equal:normalize(a.text)===normalize(b.text), hashes:[a,b].map(x=>createHash('sha256').update(x.bytes).digest('hex')) })
    const references = text => new Map([...text.matchAll(/([\w-]+-[\w-]{8}\.(?:js|css))/g)].map(m=>[normalize(m[1]),m[1]]))
    const left = references(a.text), right = references(b.text)
    for (const [name, file] of left) {
      if (right.has(name)) await compareBundle(['/assets/'+file,'/new/assets/'+right.get(name)])
    }
}
for (const route of ['/', '/collaborators/']) {
  const html = await Promise.all([get(route), get('/new'+route)])
  const entries = html.map(value => {
    const $ = cheerio.load(value.text)
    return new Map($('script[type="module"][src],link[rel="stylesheet"][href]').toArray().map(el=>{
      const url = $(el).attr('src') || $(el).attr('href')
      return [normalize(url),url]
    }))
  })
  for (const [key,path] of entries[0]) if (entries[1].has(key)) await compareBundle([path,entries[1].get(key)])
}
const report = { checkedAt:new Date().toISOString(), sitemapEqual:JSON.stringify(rootRoutes)===JSON.stringify(newRoutes), pages:results, assets:assetResults, bundles }
await mkdir('../drafts', {recursive:true})
await writeFile(output,JSON.stringify(report,null,2))
console.log(JSON.stringify({ report:output, sitemapEqual:report.sitemapEqual, pages:results.length, assets:assetResults.length, differences:[...results,...assetResults,...bundles].filter(x=>!x.equal||x.rootStatus!==200||x.newStatus!==200) },null,2))
