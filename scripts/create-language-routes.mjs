import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const distDir = 'dist'
const indexPath = join(distDir, 'index.html')
const zhDir = join(distDir, 'zh-TW')
const zhIndexPath = join(zhDir, 'index.html')

const zhTitle = '材料多尺度建模實驗室 (M3 Lab) | SDSU'
const zhDescription =
  'Wenwu Xu 教授在聖地牙哥州立大學的材料多尺度建模實驗室，研究場輔助製程 (field-assisted processing)、晶界工程 (grain-boundary engineering)、微結構與計算材料科學。'

await mkdir(zhDir, { recursive: true })
await copyFile(indexPath, zhIndexPath)

const html = await readFile(zhIndexPath, 'utf8')
const localizedHtml = html
  .replace('<html lang="en">', '<html lang="zh-Hant">')
  .replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${zhDescription}" />`,
  )
  .replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${zhTitle}" />`,
  )
  .replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${zhDescription}" />`,
  )
  .replace(
    /<title>[^<]*<\/title>/,
    `<title>${zhTitle}</title>`,
  )

await writeFile(zhIndexPath, localizedHtml)
