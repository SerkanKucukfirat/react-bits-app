import { AnimatePresence, motion } from 'motion/react'
import { useSearchParams } from 'react-router-dom'

import ContactCta from '@/components/ContactCta'
import PageHero from '@/components/PageHero'
import { categories, devicePath, devices } from '@/data'
import { to } from '@/lib/paths'

function Devices() {
  const [params, setParams] = useSearchParams()
  const active = params.get('kategori')
  const visible = active ? devices.filter(d => d.categorySlug === active) : devices

  const select = (slug: string | null) => setParams(slug ? { kategori: slug } : {}, { replace: true, preventScrollReset: true })

  return (
    <>
      <PageHero eyebrow="Cihazlarımız" title="Zayıflama ve güzellik cihazları" text="Avrupa Birliği’nde üretilen, CE onaylı profesyonel cihazlarımızı keşfedin." />

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {[{ slug: null, name: 'Tümü' }, ...categories].map(c => {
              const selected = (c.slug ?? null) === active
              return (
                <button
                  key={c.slug ?? 'all'}
                  type="button"
                  onClick={() => select(c.slug)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${selected ? 'text-neutral-950' : 'text-neutral-300 hover:text-white'}`}
                >
                  {selected && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{c.name}</span>
                </button>
              )
            })}
          </div>

          <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map((d, i) => (
                <motion.a
                  layout
                  key={d.slug}
                  href={to(devicePath(d))}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                  className="group block overflow-hidden rounded-3xl border border-white/10 bg-neutral-900"
                >
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <img
                      src={d.image}
                      alt={d.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 p-4 sm:p-5">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">{d.name}</p>
                      <p className="truncate text-xs text-neutral-400 sm:text-sm">{d.category}</p>
                    </div>
                    <span className="hidden shrink-0 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-white sm:block">
                      →
                    </span>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <ContactCta title="Hangi cihaz size uygun?" text="İşletmeniz için en doğru cihazı birlikte seçelim." />
    </>
  )
}

export default Devices
