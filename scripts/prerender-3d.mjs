// GitHub Pages has no SPA fallback for /3d/*, so every route of the 3D site gets its own
// copy of index.html (dist/3d/<route>/index.html). Device slugs are read from src/data.ts.
import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist/3d')
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const data = fs.readFileSync('src/data.ts', 'utf8')
const slugs = [...data.matchAll(/^\s+slug: '([a-z0-9-]+)',\n\s+name:/gm)].map(m => m[1])

const routes = [
  'cihazlar',
  'markalar',
  'hakkimizda',
  'is-ortaklarimiz',
  'fuarlarimiz',
  'sertifika-ve-belgelerimiz',
  'sik-sorulan-sorular',
  'gizlilik-politikamiz',
  'blog',
  'iletisim',
  ...slugs.map(s => `cihazlar/${s}`),
]
for (const r of routes) {
  fs.mkdirSync(path.join(dist, r), { recursive: true })
  fs.writeFileSync(path.join(dist, r, 'index.html'), html)
}
fs.writeFileSync(path.join(dist, '404.html'), html)
console.log(`prerendered ${routes.length} routes (${slugs.length} devices)`)
