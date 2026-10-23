import { motion } from 'motion/react'

import ContactCta from '@/components/ContactCta'
import CorporateNav from '@/components/CorporateNav'
import FadeContent from '@/components/FadeContent'
import PageHero from '@/components/PageHero'
import TiltedCard from '@/components/TiltedCard'
import { CERTIFICATES_IMAGE, CERTIFICATE_STRIP, ISO_LOGO } from '@/data'

function Certificates() {
  return (
    <>
      <PageHero
        eyebrow="Kurumsal"
        title="Sertifika ve Belgelerimiz"
        text="Cihazlarımız Avrupa Birliği onaylı ve CE sertifikalıdır."
        colors={['#2DD4BF', '#7DD3FC', '#A78BFA']}
      />
      <CorporateNav />

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto flex max-w-5xl justify-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <TiltedCard
              imageSrc={CERTIFICATES_IMAGE}
              altText="Slimwell Group sertifikaları"
              containerWidth="min(640px, 90vw)"
              containerHeight="calc(min(640px, 90vw) * 1.17)"
              imageWidth="min(640px, 90vw)"
              imageHeight="calc(min(640px, 90vw) * 1.17)"
              radius={24}
              rotateAmplitude={6}
              scaleOnHover={1.02}
              glare={0.3}
            />
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <FadeContent blur duration={1}>
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 rounded-[2rem] bg-white p-8 sm:p-12">
            <img src={CERTIFICATE_STRIP} alt="Kalite sertifikaları" className="w-full" loading="lazy" />
            <img src={ISO_LOGO} alt="ISO 9001" className="h-20 w-auto" loading="lazy" />
          </div>
        </FadeContent>
      </section>

      <ContactCta />
    </>
  )
}

export default Certificates
