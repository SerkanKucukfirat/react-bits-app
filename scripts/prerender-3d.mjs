// GitHub Pages has no SPA fallback for /3d/*, so every route of the 3D site gets its own
// copy of index.html (dist/3d/<route>/index.html). Device slugs are read from src/data.ts.
import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve(process.env.LIVE === '1' ? 'dist' : 'dist/3d')
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const data = fs.readFileSync('src/data.ts', 'utf8')
const slugs = [...data.matchAll(/^\s+slug: '([a-z0-9-]+)',\n\s+name:/gm)].map(m => m[1])
const posts = JSON.parse(fs.readFileSync('site-3d/src/blog/index.json', 'utf8')).map(p => p.slug)

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
  'heocademy',
  'iletisim',
  'teknik-servis',
  ...slugs.map(s => `cihazlar/${s}`),
  ...posts.map(s => `blog/${s}`),
]
for (const r of routes) {
  fs.mkdirSync(path.join(dist, r), { recursive: true })
  fs.writeFileSync(path.join(dist, r, 'index.html'), html)
}
fs.writeFileSync(path.join(dist, '404.html'), html)
console.log(`prerendered ${routes.length} routes (${slugs.length} devices, ${posts.length} posts)`)

// Live site only: addresses of the old WordPress site (still in Google) forward to their new pages.
// GitHub Pages cannot send real 301s, so each old path gets a tiny page that redirects at once.
if (process.env.LIVE === '1') {
  const map = JSON.parse(fs.readFileSync('scripts/old-urls.json', 'utf8'))
  let n = 0
  for (const [from, to] of Object.entries(map)) {
    const file = path.join(dist, from, 'index.html')
    if (fs.existsSync(file)) continue // a real page of the new site lives here
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(
      file,
      `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>Slimwell Group</title>` +
        `<link rel="canonical" href="${to}"><meta name="robots" content="noindex">` +
        `<meta http-equiv="refresh" content="0; url=${to}">` +
        `<script>location.replace(${JSON.stringify(to)} + location.hash)</script></head>` +
        `<body><a href="${to}">Sayfa taşındı, devam etmek için tıklayın</a></body></html>\n`,
    )
    n++
  }
  console.log(`old-site redirects: ${n}`)
}
