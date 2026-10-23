import { motion } from 'motion/react'

import ContactCta from '@/components/ContactCta'
import CorporateNav from '@/components/CorporateNav'
import CountUp from '@/components/CountUp'
import FadeContent from '@/components/FadeContent'
import PageHero from '@/components/PageHero'
import ScrollReveal from '@/components/ScrollReveal'
import { ABOUT_PAGE, BUILDING_IMAGE, brands, stats } from '@/data'

function About() {
  const [intro, ...rest] = ABOUT_PAGE

  return (
    <>
      <PageHero eyebrow="Kurumsal" title="Hakkımızda" text="2015’ten bu yana “İncelmede Devrim” vizyonuyla." />
      <CorporateNav />

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal
            baseOpacity={0.12}
            enableBlur
            blurStrength={6}
            containerClassName="text-center"
            textClassName="text-2xl leading-snug font-semibold tracking-tight text-white sm:text-4xl"
          >
            {intro}
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeContent key={s.label} blur duration={1} delay={i * 0.12}>
              <div className="text-center">
                <div className="text-5xl font-bold tracking-tight text-white tabular-nums sm:text-6xl">
                  <CountUp to={s.value} separator="." />
                  {s.suffix}
                </div>
                <p className="mt-2 text-neutral-400">{s.label}</p>
              </div>
            </FadeContent>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {rest.map((p, i) => (
              <motion.p
                key={p.slice(0, 24)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="text-lg leading-relaxed text-neutral-300"
              >
                {p}
              </motion.p>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="overflow-hidden rounded-[2rem] bg-white"
          >
            <img src={BUILDING_IMAGE} alt="Slimwell Group genel merkezi" className="w-full" loading="lazy" />
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <FadeContent blur duration={1}>
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-white sm:text-5xl">Markalarımız</h2>
          </FadeContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((b, i) => (
              <motion.a
                key={b.name}
                href={b.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="block overflow-hidden rounded-3xl border border-white/10"
              >
                <img src={b.image} alt={b.name} loading="lazy" className="aspect-[1.92] w-full object-cover" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}

export default About
