import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { NavLink } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { tilt, untilt, useReveal } from '../components/useReveal'
import {
  ABOUT_PAGE,
  ADDRESS,
  BUILDING_IMAGE,
  CERTIFICATES_IMAGE,
  CERTIFICATE_STRIP,
  EMAIL,
  FACEBOOK_URL,
  ISO_LOGO,
  MAP_EMBED,
  PARTNERS_VIDEO,
  PHONE,
  PHONE_HREF,
  SERVICE_URL,
  WHATSAPP,
  blogPosts,
  brands,
  corporatePages,
  fairs,
  faqs,
  privacySections,
  stats,
} from '../content'

const CRUMB = [{ to: '/hakkimizda', label: 'Kurumsal' }]

// Sub-navigation shared by the corporate pages
function CorporateNav() {
  return (
    <nav className="subnav" aria-label="Kurumsal">
      <div className="subnav-track">
        {corporatePages.map(p => (
          <NavLink key={p.to} to={p.to}>
            {p.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { v: 0 }
    const tw = gsap.to(obj, {
      v: to,
      duration: 2.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString('tr-TR') + suffix),
    })
    return () => {
      tw.scrollTrigger?.kill()
      tw.kill()
    }
  }, [to, suffix])
  return <span ref={ref}>0{suffix}</span>
}

export function BrandsPage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  const tags: Record<string, string> = {
    Playskin: 'Kore cam cilt protokolü',
    Casmara: 'Profesyonel yüz bakımı',
    WishPro: 'Manyetik infüzyon teknolojisi',
    'Protocol Stria': '“Çatlakta Devrim”',
    'Ericson Laboratoire': 'Paris’ten ileri bakım',
  }
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Markalar"
        title="Dünya markaları, tek çatı"
        text="Özgün AR-GE markalarımız ve Türkiye distribütörlüğünü üstlendiğimiz estetik kozmetiğin küresel liderleri."
        crumbs={[{ to: '/markalar', label: 'Markalar' }]}
      />
      <section className="brand-stack wrap">
        {brands.map((b, i) => (
          <a key={b.name} href={b.url} target="_blank" rel="noreferrer" className="brand-row reveal" onPointerMove={tilt} onPointerLeave={untilt}>
            <div className="brand-row-inner">
              <img src={b.image} alt={b.name} loading={i < 2 ? 'eager' : 'lazy'} />
              <div className="brand-row-caption">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{b.name}</strong>
                <em>{tags[b.name]}</em>
                <i>Siteyi ziyaret et ↗</i>
              </div>
            </div>
          </a>
        ))}
      </section>
    </div>
  )
}

export function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  const [intro, ...rest] = ABOUT_PAGE
  return (
    <div ref={ref}>
      <PageHero eyebrow="Kurumsal" title="Hakkımızda" text="2015’ten bu yana “İncelmede Devrim” vizyonuyla." crumbs={CRUMB} />
      <CorporateNav />
      <section className="wrap prose-lg">
        <p className="reveal">{intro}</p>
      </section>
      <section className="wrap stat-row">
        {stats.map(s => (
          <div key={s.label} className="stat reveal">
            <strong>
              <Counter to={s.value} suffix={s.suffix} />
            </strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>
      <section className="wrap split">
        <div className="prose">
          {rest.map(p => (
            <p key={p.slice(0, 30)} className="reveal">
              {p}
            </p>
          ))}
        </div>
        <div className="building reveal" onPointerMove={tilt} onPointerLeave={untilt}>
          <div className="building-inner">
            <img src={BUILDING_IMAGE} alt="Slimwell Group genel merkezi" loading="lazy" />
          </div>
        </div>
      </section>
    </div>
  )
}

export function PartnersPage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Kurumsal"
        title="İş Ortaklarımız"
        text="Türkiye’nin 81 ilinde güzellik merkezleri, klinikler ve spalarla birlikte büyüyoruz."
        crumbs={CRUMB}
      />
      <CorporateNav />
      <section className="wrap">
        <div className="video-frame reveal">
          <video src={PARTNERS_VIDEO} autoPlay muted loop playsInline />
        </div>
      </section>
      <section className="wrap stat-row two">
        <div className="stat reveal">
          <strong>
            <Counter to={9000} suffix="+" />
          </strong>
          <span>İş ortağı</span>
        </div>
        <div className="stat reveal">
          <strong>
            <Counter to={81} />
          </strong>
          <span>İlde hizmet</span>
        </div>
      </section>
      <section className="wrap callout reveal">
        <h2>
          Siz de <span className="grad">iş ortağımız</span> olun.
        </h2>
        <p>Güzellik merkezi, klinik veya spa işletiyorsanız ekibimizle iletişime geçin.</p>
        <a className="btn light" href={WHATSAPP} target="_blank" rel="noreferrer">
          WhatsApp’tan yazın <span>↗</span>
        </a>
      </section>
    </div>
  )
}

export function FairsPage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-line', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={ref}>
      <PageHero eyebrow="Kurumsal" title="Fuarlarımız" text="Sektörün buluştuğu fuar ve kongrelerde yeni teknolojilerimizi tanıtıyoruz." crumbs={CRUMB} />
      <CorporateNav />
      <section className="wrap timeline">
        <div className="timeline-line" />
        {fairs.map((f, i) => (
          <article key={f.title + f.date} className={`tl-item reveal ${i % 2 ? 'right' : 'left'}`}>
            <span className="tl-dot" />
            <div className="tl-card">
              <span className="tl-date">{f.date}</span>
              <h3>{f.title}</h3>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export function CertificatesPage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  return (
    <div ref={ref}>
      <PageHero eyebrow="Kurumsal" title="Sertifika ve Belgelerimiz" text="Kalite ve güvenliği belgelerle taahhüt ediyoruz." crumbs={CRUMB} />
      <CorporateNav />
      <section className="wrap cert-grid">
        {[
          { src: CERTIFICATES_IMAGE, alt: 'Sertifikalar' },
          { src: CERTIFICATE_STRIP, alt: 'Kalite ödülleri' },
          { src: ISO_LOGO, alt: 'ISO 9001 belgesi' },
        ].map(c => (
          <div key={c.alt} className="cert reveal" onPointerMove={tilt} onPointerLeave={untilt}>
            <div className="cert-inner">
              <img src={c.src} alt={c.alt} loading="lazy" />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export function FaqPage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  const [open, setOpen] = useState(0)
  return (
    <div ref={ref}>
      <PageHero eyebrow="Kurumsal" title="Sık Sorulan Sorular" text="Cihazlarımız, eğitimlerimiz ve hizmetlerimiz hakkında merak edilenler." crumbs={CRUMB} />
      <CorporateNav />
      <section className="wrap faq">
        {faqs.map((f, i) => (
          <div key={f.q} className={`faq-item reveal ${open === i ? 'is-open' : ''}`}>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <i aria-hidden>+</i>
            </button>
            <div className="faq-a">
              <p>{f.a}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export function PrivacyPage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  return (
    <div ref={ref}>
      <PageHero eyebrow="Kurumsal" title="Gizlilik Politikamız" text="Kişisel verilerinizin nasıl işlendiği ve korunduğu hakkında bilgilendirme." crumbs={CRUMB} />
      <CorporateNav />
      <section className="wrap legal">
        {privacySections.map(sec => (
          <article key={sec.title} className="reveal">
            <h2>{sec.title}</h2>
            {sec.paragraphs.map(p => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            {sec.list && (
              <ul>
                {sec.list.map(li => (
                  <li key={li.slice(0, 40)}>{li}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>
    </div>
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
        {blogPosts.map((p, i) => (
          <a key={p.url} href={p.url} target="_blank" rel="noreferrer" className="post reveal" onPointerMove={tilt} onPointerLeave={untilt}>
            <div className="post-inner">
              <span className="post-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <i>Yazıyı oku ↗</i>
            </div>
          </a>
        ))}
      </section>
    </div>
  )
}

export function ContactPage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  const cards = [
    { title: 'Telefon', value: PHONE, href: PHONE_HREF },
    { title: 'WhatsApp', value: 'Hemen yazın', href: WHATSAPP, external: true },
    { title: 'E-posta', value: EMAIL, href: `mailto:${EMAIL}` },
    { title: 'Teknik servis', value: 'Servis formu', href: SERVICE_URL, external: true },
    { title: 'Facebook', value: 'SlimwellGroup', href: FACEBOOK_URL, external: true },
  ]
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="İletişim"
        title="Bize ulaşın"
        text="Cihazlarımız, markalarımız ve iş ortaklığı için ekibimiz size yardımcı olmaya hazır."
        crumbs={[{ to: '/iletisim', label: 'İletişim' }]}
      />
      <section className="wrap contact-grid">
        {cards.map(c => (
          <a
            key={c.title}
            href={c.href}
            className="ccard reveal"
            onPointerMove={tilt}
            onPointerLeave={untilt}
            {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <div className="ccard-inner">
              <span>{c.title}</span>
              <strong>{c.value}</strong>
              <i>↗</i>
            </div>
          </a>
        ))}
      </section>
      <section className="wrap map-wrap reveal">
        <div className="map-card">
          <div className="map-info">
            <p className="eyebrow">
              <span className="dot" /> Genel merkez
            </p>
            <h2>Slimwell Group</h2>
            <p>{ADDRESS}</p>
          </div>
          <iframe title="Slimwell Group konumu" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </div>
  )
}
