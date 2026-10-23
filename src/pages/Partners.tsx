import { motion } from 'motion/react'

import ContactCta from '@/components/ContactCta'
import CorporateNav from '@/components/CorporateNav'
import CountUp from '@/components/CountUp'
import PageHero from '@/components/PageHero'
import { PARTNERS_VIDEO } from '@/data'

function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Kurumsal"
        title="İş Ortaklarımız"
        text="Türkiye’nin 81 ilinde güzellik merkezleri, klinikler ve spalarla birlikte büyüyoruz."
        colors={['#2DD4BF', '#7DD3FC', '#C084FC']}
      />
      <CorporateNav />

      <section className="px-4 pb-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black"
        >
          <video src={PARTNERS_VIDEO} autoPlay muted loop playsInline className="w-full" />
        </motion.div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-4xl gap-10 text-center sm:grid-cols-2">
          {[
            { value: 9000, suffix: '+', label: 'İş ortağı' },
            { value: 81, suffix: '', label: 'İlde hizmet' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-6xl font-bold tracking-tight text-white tabular-nums sm:text-7xl">
                <CountUp to={s.value} separator="." />
                {s.suffix}
              </div>
              <p className="mt-2 text-neutral-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactCta title="Siz de iş ortağımız olun." text="Güzellik merkezi, klinik veya spa işletiyorsanız ekibimizle iletişime geçin." />
    </>
  )
}

export default Partners
