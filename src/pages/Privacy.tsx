import { motion } from 'motion/react'

import CorporateNav from '@/components/CorporateNav'
import PageHero from '@/components/PageHero'
import { privacySections } from '@/data'

function Privacy() {
  return (
    <>
      <PageHero eyebrow="Kurumsal" title="Gizlilik Politikamız" text="Kişisel verilerinizi nasıl topladığımız, kullandığımız ve koruduğumuz." />
      <CorporateNav />

      <article className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-12">
          {privacySections.map(section => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">{section.title}</h2>
              <div className="space-y-4 leading-relaxed text-neutral-300">
                {section.paragraphs.map(p => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
                {section.list && (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.list.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.section>
          ))}
        </div>
      </article>
    </>
  )
}

export default Privacy
