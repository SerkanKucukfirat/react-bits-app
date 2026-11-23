import { useRef } from 'react'
import PageHero from '../components/PageHero'
import { tilt, untilt, useReveal } from '../components/useReveal'
import { WHATSAPP, academyVideos, type AcademyVideo } from '../content'

// YouTube links get their cover image automatically when no image is given
function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/))([\w-]{11})/)
  return m ? m[1] : null
}
function cover(v: AcademyVideo) {
  if (v.image) return v.image
  const id = youtubeId(v.url)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null
}

export default function AcademyPage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, [academyVideos.length])
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Heocademy"
        title="Eğitim videoları"
        text="Cihaz kullanımı, uygulama protokolleri ve ürün eğitimleri. Bir videoya tıklayın, doğrudan izlemeye başlayın."
        crumbs={[{ to: '/heocademy', label: 'Heocademy' }]}
      />
      {academyVideos.length === 0 ? (
        <section className="wrap academy-empty reveal">
          <div className="academy-empty-card">
            <span className="academy-play" aria-hidden>
              ▶
            </span>
            <h2>Videolar çok yakında burada</h2>
            <p>Heocademy eğitim videoları hazırlanıyor. Eğitim talepleriniz için ekibimize yazabilirsiniz.</p>
            <a className="btn light" href={WHATSAPP} target="_blank" rel="noreferrer">
              WhatsApp’tan yazın <span>↗</span>
            </a>
          </div>
        </section>
      ) : (
        <section className="wrap academy-grid">
          {academyVideos.map((v, i) => {
            const img = cover(v)
            return (
              <a
                key={v.url + i}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="post academy-card reveal"
                onPointerMove={tilt}
                onPointerLeave={untilt}
                aria-label={`${v.title} videosunu izle`}
              >
                <div className="post-inner">
                  <div className="academy-thumb">
                    {img ? <img src={img} alt="" loading="lazy" /> : <span className="academy-thumb-n">{String(i + 1).padStart(2, '0')}</span>}
                    <span className="academy-play" aria-hidden>
                      ▶
                    </span>
                    {v.duration && <span className="academy-dur">{v.duration}</span>}
                  </div>
                  {v.category && <span className="post-n">{v.category}</span>}
                  <h3>{v.title}</h3>
                  {v.text && <p className="academy-text">{v.text}</p>}
                  <i>Videoyu izle ↗</i>
                </div>
              </a>
            )
          })}
        </section>
      )}
    </div>
  )
}
