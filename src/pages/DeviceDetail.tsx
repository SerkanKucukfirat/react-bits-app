import { motion } from 'motion/react'
import { useParams } from 'react-router-dom'

import Aurora from '@/components/Aurora'
import ContactCta from '@/components/ContactCta'
import FadeContent from '@/components/FadeContent'
import ShinyText from '@/components/ShinyText'
import SplitText from '@/components/SplitText'
import StarBorder from '@/components/StarBorder'
import TiltedCard from '@/components/TiltedCard'
import { PHONE, PHONE_HREF, WHATSAPP, bySlug, devicePath, devices } from '@/data'
import { to } from '@/lib/paths'
import NotFound from '@/pages/NotFound'

const ease = [0.22, 1, 0.36, 1] as const

function DeviceDetail() {
  const { slug } = useParams()
  const device = bySlug(slug)
  if (!device) return <NotFound />

  const index = devices.indexOf(device)
  const prev = devices[(index - 1 + devices.length) % devices.length]
  const next = devices[(index + 1) % devices.length]
  const related = devices.filter(d => d.categorySlug === device.categorySlug && d.slug !== device.slug)
  const others = (related.length ? related : devices.filter(d => d.slug !== device.slug)).slice(0, 4)

  return (
    <>
      <section className="relative overflow-hidden px-4 pt-36 pb-20 sm:px-6">
        <div className="absolute inset-0 opacity-50">
          <Aurora colorStops={['#7DD3FC', '#C084FC', '#F472B6']} amplitude={1} blend={0.6} height={0.7} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10 text-sm text-neutral-400" aria-label="Sayfa yolu">
            <a href={to('cihazlar')} className="hover:text-white">
              Cihazlar
            </a>
            <span className="mx-2">/</span>
            <a href={to(`cihazlar?kategori=${device.categorySlug}`)} className="hover:text-white">
              {device.category}
            </a>
          </motion.nav>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease }}
              className="flex justify-center"
            >
              <TiltedCard
                imageSrc={device.image}
                altText={device.name}
                containerWidth="min(500px, 88vw)"
                containerHeight="min(500px, 88vw)"
                imageWidth="min(500px, 88vw)"
                imageHeight="min(500px, 88vw)"
                radius={36}
                rotateAmplitude={14}
                scaleOnHover={1.05}
                glare={0.35}
                floating
                style={{ '--tc-shadow-color': 'rgba(125, 211, 252, 0.4)' } as React.CSSProperties}
              />
            </motion.div>

            <div>
              <ShinyText text={device.category} className="mb-4 text-sm font-medium tracking-[0.2em] uppercase" />
              <SplitText
                text={device.name}
                tag="h1"
                splitType="chars"
                effect="flip"
                trigger="load"
                delay={50}
                className="text-5xl font-bold tracking-tight text-white sm:text-7xl"
              />
              <div className="mt-8 space-y-4">
                {device.description.map((p, i) => (
                  <motion.p
                    key={p.slice(0, 24)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.5 + i * 0.15 }}
                    className="text-lg leading-relaxed text-neutral-300"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.9 }}
                className="mt-10 flex flex-col gap-3 sm:flex-row"
              >
                <StarBorder as="a" href={WHATSAPP} target="_blank" rel="noreferrer" color="#7DD3FC">
                  Bilgi al
                </StarBorder>
                <a href={PHONE_HREF} className="rounded-full border border-white/20 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-white/10">
                  {PHONE}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {device.features.length > 0 && (
        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <FadeContent blur duration={1}>
              <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-white sm:text-5xl">Özellikler</h2>
            </FadeContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {device.features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease, delay: i * 0.07 }}
                  whileHover={{ y: -6, borderColor: 'rgba(125, 211, 252, 0.5)' }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-neutral-900 p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-300/10 text-lg text-sky-300">✓</span>
                  <span className="font-medium text-white">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <FadeContent blur duration={1}>
            <h2 className="mb-10 text-3xl font-bold tracking-tight text-white sm:text-4xl">{related.length ? 'Aynı serideki cihazlar' : 'Diğer cihazlarımız'}</h2>
          </FadeContent>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {others.map((d, i) => (
              <motion.a
                key={d.slug}
                href={to(devicePath(d))}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group block overflow-hidden rounded-3xl border border-white/10 bg-neutral-900"
              >
                <div className="aspect-square overflow-hidden bg-white">
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-110" />
                </div>
                <p className="p-4 font-semibold text-white">{d.name}</p>
              </motion.a>
            ))}
          </div>
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
            <a href={to(devicePath(prev))} className="group text-left">
              <span className="block text-xs text-neutral-500">Önceki</span>
              <span className="font-semibold text-white transition-transform group-hover:-translate-x-1">← {prev.name}</span>
            </a>
            <a href={to(devicePath(next))} className="group text-right">
              <span className="block text-xs text-neutral-500">Sonraki</span>
              <span className="font-semibold text-white">{next.name} →</span>
            </a>
          </div>
        </div>
      </section>

      <ContactCta title={`${device.name} için teklif alın.`} />
    </>
  )
}

export default DeviceDetail
