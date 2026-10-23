import { motion } from 'motion/react'

import ContactCta from '@/components/ContactCta'
import CorporateNav from '@/components/CorporateNav'
import PageHero from '@/components/PageHero'
import { fairs } from '@/data'

function Fairs() {
  return (
    <>
      <PageHero eyebrow="Kurumsal" title="Fuarlar ve Kongreler" text="Sektörün buluşma noktalarında yeniliklerimizi tanıtıyoruz." colors={['#FB923C', '#F472B6', '#C084FC']} />
      <CorporateNav />

      <section className="overflow-x-clip px-4 pb-24 sm:px-6">
        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gradient-to-b from-orange-400 via-pink-400 to-violet-400 md:left-1/2"
          />
          <ol className="space-y-10">
            {fairs.map((f, i) => {
              const left = i % 2 === 0
              return (
                <motion.li
                  key={f.title + f.date}
                  initial={{ opacity: 0, x: left ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative pl-12 md:w-1/2 md:pl-0 ${left ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}
                >
                  <span
                    className={`absolute top-6 left-4 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_20px_4px_rgba(244,114,182,0.6)] ${left ? 'md:right-0 md:left-auto md:translate-x-1/2' : 'md:left-0'}`}
                  />
                  <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 transition-colors hover:border-pink-400/40">
                    <p className="text-sm font-medium text-pink-300">{f.date}</p>
                    <p className="mt-2 text-xl font-semibold text-white">{f.title}</p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </section>

      <ContactCta />
    </>
  )
}

export default Fairs
