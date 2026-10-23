import { motion } from 'motion/react'

import PageHero from '@/components/PageHero'
import StarBorder from '@/components/StarBorder'
import { ADDRESS, EMAIL, MAP_EMBED, PHONE, PHONE_HREF, SERVICE_URL, WHATSAPP } from '@/data'

const cards = [
  { title: 'Telefon', value: PHONE, href: PHONE_HREF, accent: '#7DD3FC' },
  { title: 'WhatsApp', value: 'Hemen yazın', href: WHATSAPP, accent: '#2DD4BF', external: true },
  { title: 'E-posta', value: EMAIL, href: `mailto:${EMAIL}`, accent: '#C084FC' },
  { title: 'Teknik Servis', value: 'Servis formu', href: SERVICE_URL, accent: '#F472B6', external: true },
]

function Contact() {
  return (
    <>
      <PageHero eyebrow="İletişim" title="Bize ulaşın" text="Cihazlarımız, markalarımız ve iş ortaklığı için ekibimiz yanınızda." colors={['#2DD4BF', '#7DD3FC', '#C084FC']} />

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -8, boxShadow: `0 30px 60px -30px ${c.accent}` }}
              className="block rounded-3xl border border-white/10 bg-neutral-900 p-7"
            >
              <p className="text-sm font-medium tracking-[0.15em] uppercase" style={{ color: c.accent }}>
                {c.title}
              </p>
              <p className="mt-3 text-lg font-semibold break-words text-white">{c.value}</p>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center gap-6 rounded-3xl border border-white/10 bg-neutral-900 p-8"
          >
            <div>
              <p className="text-sm font-medium tracking-[0.15em] text-sky-300 uppercase">Adres</p>
              <p className="mt-3 text-xl font-semibold text-white">Slimwell Group</p>
              <p className="mt-2 text-neutral-300">{ADDRESS}</p>
            </div>
            <StarBorder as="a" href={WHATSAPP} target="_blank" rel="noreferrer" color="#2DD4BF" className="self-start">
              WhatsApp’tan yazın
            </StarBorder>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-3xl border border-white/10"
          >
            <iframe
              title="Slimwell Group konumu"
              src={MAP_EMBED}
              className="h-[420px] w-full grayscale invert-[0.9] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Contact
