// Pulls the blog posts from slimwell.com.tr (WordPress REST API) into the 3D site's data:
//   site-3d/src/blog/index.json   — list (title, date, excerpt, cover) for the blog page
//   site-3d/src/blog/posts.json   — cleaned article HTML, loaded only on a post page
// Run by hand when new posts are published:  node scripts/fetch-blog.mjs
import fs from 'node:fs'
import path from 'node:path'

const SITE = 'https://www.slimwell.com.tr'
const OUT = path.resolve('site-3d/src/blog')

const res = await fetch(`${SITE}/wp-json/wp/v2/posts?per_page=100&status=publish`)
if (!res.ok) throw new Error(`WordPress API ${res.status}`)
const raw = await res.json()

const decode = s =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

const slugs = new Set(raw.map(p => p.slug))

// Old-site links point at our own pages where we have them; anything else opens in a new tab
function link(href) {
  const u = href.replace(/^https?:\/\/(www\.)?slimwell\.com\.tr/, '')
  if (u === href) return { href, external: true }
  const parts = u.split(/[/#?]/).filter(Boolean)
  if (parts[0] === 'cihazlar') {
    const slug = parts[2] === 'cyro-q-one' ? 'cryo-q-one' : parts[2]
    return { href: slug ? `/cihazlar/${slug}` : '/cihazlar' }
  }
  if (parts[0] === 'iletisim') return { href: '/iletisim' }
  if (parts.length === 1 && slugs.has(parts[0])) return { href: `/blog/${parts[0]}` }
  return { href, external: true }
}

const KEEP = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'blockquote'])
function clean(html) {
  let s = html
    .replace(/<(\/?)h1\b/g, '<$1h2')
    .replace(/<(\/?)b\b/g, '<$1strong')
    .replace(/<(\/?)i\b/g, '<$1em')
  // strip every tag we do not keep, and every attribute except a link's target
  s = s.replace(/<(\/?)([a-z0-9]+)([^>]*)>/gi, (m, close, tag, attrs) => {
    tag = tag.toLowerCase()
    if (!KEEP.has(tag)) return ''
    if (close) return `</${tag}>`
    if (tag === 'a') {
      const h = /href="([^"]+)"/.exec(attrs)
      if (!h) return '<a>'
      const l = link(decode(h[1]))
      return l.external ? `<a href="${l.href}" target="_blank" rel="noreferrer">` : `<a href="${l.href}" data-internal>`
    }
    return `<${tag}>`
  })
  s = s
    .replace(/&nbsp;/g, ' ')
    .replace(/<(p|h2|h3|h4|li|strong|em)>\s*(<br>\s*)*<\/\1>/g, '') // empty blocks
    .replace(/<strong>\s*<\/strong>/g, '')
    .replace(/<(h2|h3|h4)>\s*<strong>([\s\S]*?)<\/strong>\s*<\/\1>/g, '<$1>$2</$1>') // headings are bold already
    .replace(/<\/(ol|ul)>\s*<\1>/g, '') // WordPress splits one list into a list per item
    .replace(/\n{2,}/g, '\n')
    .trim()
  return s
}

const text = html => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

// a cover from our own device photos when the post is about one of them
const COVERS = [
  [/cryo|kriyo|soğuk|recovery/i, 'cryo-q-one'],
  [/vacu|vakum/i, 'vacuactiv'],
  [/infrashape|yatay bisiklet/i, 'infrashape'],
  [/rollshape|roll/i, 'rollshape'],
  [/aqua|su içerisinde/i, 'aquaslimmer'],
  [/pilates/i, 'activshape'],
  [/merdiven|infra step/i, 'infra-step'],
  [/emfit|ems/i, 'emfit-plus-neo'],
]

const seen = new Set()
const index = []
const posts = {}
for (const p of raw) {
  const title = decode(p.title.rendered).trim()
  const key = title.toLocaleLowerCase('tr')
  if (seen.has(key)) continue // the API holds a few re-published duplicates; keep the newest
  seen.add(key)
  const body = clean(p.content.rendered)
  const plain = text(body)
  const first = text((/<p>([\s\S]*?)<\/p>/.exec(body) ?? [, plain])[1])
  const excerpt = first.length > 170 ? first.slice(0, 167).replace(/\s+\S*$/, '') + '…' : first
  const cover = COVERS.find(([re]) => re.test(title))?.[1] ?? null
  index.push({
    slug: p.slug,
    title,
    date: p.date.slice(0, 10),
    excerpt,
    minutes: Math.max(1, Math.round(plain.split(' ').length / 200)),
    cover,
  })
  posts[p.slug] = body
}

fs.mkdirSync(OUT, { recursive: true })
fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index, null, 1) + '\n')
fs.writeFileSync(path.join(OUT, 'posts.json'), JSON.stringify(posts) + '\n')
console.log(`${index.length} posts → ${path.relative(process.cwd(), OUT)}`)
