import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import ContactCta from '@/components/ContactCta'
import CorporateNav from '@/components/CorporateNav'
import PageHero from '@/components/PageHero'
import { faqs } from '@/data'

function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <PageHero eyebrow="Kurumsal" title="Sık Sorulan Sorular" text="Eğitim, garanti, teknik servis ve kurulum hakkında merak ettikleriniz." />
      <CorporateNav />

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? 'border-sky-300/40 bg-neutral-900' : 'border-white/10 bg-neutral-900/60'}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="text-lg font-semibold text-white">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ type: 'spring', bounce: 0.3 }} className="shrink-0 text-2xl text-sky-300">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 leading-relaxed text-neutral-300">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </section>

      <ContactCta title="Sorunuzun cevabını bulamadınız mı?" />
    </>
  )
}

export default Faq
