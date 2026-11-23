import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { tilt, untilt, useReveal } from '../components/useReveal'
import { CLASSIC, WHATSAPP } from '../content'
import blogIndex from '../blog/index.json'
import NotFound from './NotFound'
import { CorporateNav } from './Corporate'

export type BlogMeta = { slug: string; title: string; date: string; excerpt: string; minutes: number; cover: string | null }
export const blogs = blogIndex as BlogMeta[]
export const blogPath = (b: BlogMeta) => `/blog/${b.slug}`

const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
export function trDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

// Card cover: the device the post is about, or the post's initial on the brand gradient
const TINTS = ['159, 216, 255', '183, 168, 255', '134, 226, 214', '255, 196, 170']
function Cover({ b }: { b: BlogMeta }) {
  const tint = TINTS[[...b.slug].reduce((n, c) => n + c.charCodeAt(0), 0) % TINTS.length]
  return (
    <div className={`blog-cover ${b.cover ? 'has-device' : ''}`} style={{ '--tint': tint } as CSSProperties}>
      {b.cover ? (
        <img src={`${CLASSIC}devices/3d/${b.cover}.webp?v=4`} alt="" loading="lazy" />
      ) : (
        <span className="blog-initial" aria-hidden>
          {b.title.charAt(0)}
        </span>
      )}
    </div>
  )
}

export function BlogCard({ b }: { b: BlogMeta }) {
  return (
    <Link to={blogPath(b)} className="post blog-card reveal" onPointerMove={tilt} onPointerLeave={untilt}>
      <div className="post-inner">
        <Cover b={b} />
        <span className="post-n">
          {trDate(b.date)} · {b.minutes} dk okuma
        </span>
        <h3>{b.title}</h3>
        <p className="blog-excerpt">{b.excerpt}</p>
        <i>Yazıyı oku →</i>
      </div>
    </Link>
  )
}

export function BlogPage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  return (
    <div ref={ref}>
      <PageHero eyebrow="Slimwell Blog" title="Wellness, teknoloji ve güzellik" text="Sektörden haberler, cihaz rehberleri ve sağlıklı yaşam önerileri." crumbs={[{ to: '/blog', label: 'Blog' }]} />
      <CorporateNav />
      <section className="wrap blog-grid">
        {blogs.map(b => (
          <BlogCard key={b.slug} b={b} />
        ))}
      </section>
    </div>
  )
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export function BlogPost() {
  const { slug } = useParams()
  const meta = blogs.find(b => b.slug === slug)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [html, setHtml] = useState<string | null>(null)

  // the article bodies live in their own chunk, loaded only when a post is opened
  useEffect(() => {
    if (!meta) return
    let live = true
    setHtml(null)
    import('../blog/posts.json').then(m => {
      const posts = m.default as Record<string, string>
      // links to our own pages carry the site base so they work when opened in a new tab
      if (live) setHtml((posts[meta.slug] ?? '').replace(/href="\/(?=[^"]*" data-internal)/g, `href="${basename}/`))
    })
    return () => {
      live = false
    }
  }, [meta])

  useReveal(ref, [slug, html])

  if (!meta) return <NotFound />

  const i = blogs.indexOf(meta)
  const newer = blogs[i - 1]
  const older = blogs[i + 1]
  const related = blogs.filter(b => b !== meta && meta.cover && b.cover === meta.cover).slice(0, 3)
  const more = related.length ? related : blogs.filter(b => b !== meta).slice(0, 3)

  // in-article links to our own pages stay in the app instead of reloading
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest('a[data-internal]')
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    navigate(a.getAttribute('href')!.slice(basename.length))
  }

  return (
    <div ref={ref} key={meta.slug}>
      <PageHero
        className="page-hero--article"
        eyebrow="Slimwell Blog"
        title={meta.title}
        text={`${trDate(meta.date)} · ${meta.minutes} dk okuma`}
        crumbs={[{ to: '/blog', label: 'Blog' }]}
      />
      <section className="studio">
        <div className="wrap article-wrap">
          {html === null ? (
            <p className="article-loading">Yazı yükleniyor…</p>
          ) : (
            <div className="article" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
          )}
          <aside className="article-cta reveal">
            <p>Cihazlarımız ve işletmenize uygun çözümler için ekibimize yazın.</p>
            <a className="btn dark" href={WHATSAPP} target="_blank" rel="noreferrer">
              WhatsApp’tan yazın <span>↗</span>
            </a>
          </aside>
        </div>
        <div className="wrap dd-pager article-pager">
          {older ? (
            <Link to={blogPath(older)}>
              <span>← Önceki yazı</span>
              <strong>{older.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link to={blogPath(newer)} className="next">
              <span>Sonraki yazı →</span>
              <strong>{newer.title}</strong>
            </Link>
          )}
        </div>
      </section>
      <section className="wrap blog-grid blog-more">
        <h2 className="reveal">Diğer yazılar</h2>
        {more.map(b => (
          <BlogCard key={b.slug} b={b} />
        ))}
      </section>
    </div>
  )
}
