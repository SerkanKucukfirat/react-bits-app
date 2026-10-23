import Aurora from '@/components/Aurora'
import FadeContent from '@/components/FadeContent'
import SplitText from '@/components/SplitText'
import StarBorder from '@/components/StarBorder'
import { PHONE, PHONE_HREF, WHATSAPP } from '@/data'

function ContactCta({ title = 'Bize ulaşın.', text = 'Cihazlarımız ve markalarımız hakkında bilgi almak için ekibimizle iletişime geçin.' }) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <FadeContent blur duration={1}>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 p-10 text-center sm:p-20">
          <div className="absolute inset-0 -z-10 opacity-50">
            <Aurora colorStops={['#2DD4BF', '#7DD3FC', '#C084FC']} amplitude={0.8} blend={0.7} height={0.6} intro={false} />
          </div>
          <SplitText text={title} tag="h2" splitType="chars" effect="pop" className="text-4xl font-bold tracking-tight text-white sm:text-6xl" />
          <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-300">{text}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <StarBorder as="a" href={WHATSAPP} target="_blank" rel="noreferrer" color="#2DD4BF">
              WhatsApp’tan yazın
            </StarBorder>
            <a
              href={PHONE_HREF}
              className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              {PHONE}
            </a>
          </div>
        </div>
      </FadeContent>
    </section>
  )
}

export default ContactCta
