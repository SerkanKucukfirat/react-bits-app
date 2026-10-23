import Aurora from '@/components/Aurora'
import BlurText from '@/components/BlurText'
import CountUp from '@/components/CountUp'
import FadeContent from '@/components/FadeContent'
import Header from '@/components/Header'
import ShinyText from '@/components/ShinyText'
import SpotlightCard from '@/components/SpotlightCard'

const stats = [
  { value: 2015, label: 'Kuruluş yılı', separator: '' },
  { value: 2500, suffix: '+', label: 'Türkiye genelinde bayi', separator: '.' },
  { value: 2017, label: "Casmara Türkiye distribütörü", prefix: "'den beri", separator: '' },
]

const products = [
  {
    title: 'Vücut Şekillendirme Cihazları',
    text: "Avrupa Birliği'nden ithal edilen zayıflama ve güzellik cihazları: vakum, infrared, kolajen, ozon, kromoterapi ve aromaterapi uygulamaları.",
    color: 'rgba(45, 212, 191, 0.25)',
  },
  {
    title: 'Casmara',
    text: "İspanyol dermokozmetik markası Casmara'nın 2017'den bu yana Türkiye distribütörüyüz.",
    color: 'rgba(167, 139, 250, 0.25)',
  },
  {
    title: 'Playskin',
    text: 'Kendi markamız Playskin ile lipozom teknolojili cilt serumları üretiyoruz.',
    color: 'rgba(244, 114, 182, 0.25)',
  },
]

const reasons = [
  { title: 'Sağlık Bakanlığı onaylı', text: 'Tüm ürünlerimiz Sağlık Bakanlığı onaylıdır.' },
  { title: 'CE sertifikalı cihazlar', text: 'Cihazlarımız CE sertifikasına sahiptir.' },
  { title: 'Geniş bayi ağı', text: 'Güzellik merkezleri, klinikler ve spalarla Türkiye genelinde çalışıyoruz.' },
]

const currentYear = new Date().getFullYear()

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 opacity-90">
          <Aurora colorStops={['#2dd4bf', '#a78bfa', '#f472b6']} amplitude={1.2} blend={0.6} height={0.85} layers={2} glow={0.8} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/15 to-transparent md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <ShinyText text="Güzellik ve wellness teknolojileri" className="mb-6 text-sm font-medium tracking-widest uppercase" />
          <BlurText
            text="Güzelliğin teknolojisi, Slimwell'de buluşuyor"
            animateBy="words"
            direction="top"
            delay={120}
            className="justify-center text-4xl leading-tight font-bold sm:text-6xl"
          />
          <p className="mt-6 max-w-xl text-lg text-neutral-300">
            Avrupa'dan getirdiğimiz zayıflama ve güzellik cihazları ile dermokozmetik ürünleri güzellik merkezlerine,
            kliniklere ve spalara ulaştırıyoruz.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#urunler"
              className="rounded-full bg-white px-6 py-3 font-medium text-neutral-950 transition-opacity hover:opacity-90"
            >
              Ürünleri keşfedin
            </a>
            <a
              href="#iletisim"
              className="rounded-full border border-white/20 px-6 py-3 font-medium transition-colors hover:bg-white/10"
            >
              Bize ulaşın
            </a>
          </div>
        </div>
      </section>

      <section id="hakkimizda" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
        <FadeContent blur duration={1}>
          <h2 className="text-3xl font-bold sm:text-4xl">Hakkımızda</h2>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            Slimwell Kozmetik Medikal Group A.Ş., 2015 yılında İstanbul'da kuruldu. Güzellik sektörüne Avrupa'nın
            güvenilir cihaz ve ürünlerini getiriyor, iş ortaklarımıza Türkiye genelinde hizmet veriyoruz.
          </p>
        </FadeContent>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {stats.map(stat => (
            <FadeContent key={stat.label} blur duration={1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <div className="text-5xl font-bold text-white">
                  <CountUp to={stat.value} from={stat.value > 2000 && !stat.suffix ? 2000 : 0} separator={stat.separator} />
                  {stat.suffix}
                  {stat.prefix && <span className="text-2xl text-neutral-400">{stat.prefix}</span>}
                </div>
                <p className="mt-2 text-neutral-400">{stat.label}</p>
              </div>
            </FadeContent>
          ))}
        </div>
      </section>

      <section id="urunler" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
        <FadeContent blur duration={1}>
          <h2 className="text-3xl font-bold sm:text-4xl">Ürünlerimiz</h2>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            Profesyonel uygulamalar için cihazlar ve cilt bakım ürünleri.
          </p>
        </FadeContent>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {products.map(product => (
            <SpotlightCard
              key={product.title}
              spotlightColor={product.color}
              className="rounded-2xl border border-white/10 bg-neutral-900 p-8"
            >
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="mt-3 text-neutral-400">{product.text}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section id="neden" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
        <FadeContent blur duration={1}>
          <h2 className="text-3xl font-bold sm:text-4xl">Neden Slimwell?</h2>
        </FadeContent>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {reasons.map((reason, i) => (
            <FadeContent key={reason.title} blur duration={1} delay={i * 0.15}>
              <div className="border-l-2 border-teal-400/60 pl-6">
                <h3 className="text-lg font-semibold">{reason.title}</h3>
                <p className="mt-2 text-neutral-400">{reason.text}</p>
              </div>
            </FadeContent>
          ))}
        </div>
      </section>

      <section id="iletisim" className="scroll-mt-20 px-4 py-24 sm:px-6">
        <FadeContent blur duration={1}>
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-teal-500/15 via-violet-500/15 to-pink-500/15 p-10 text-center sm:p-16">
            <h2 className="text-3xl font-bold sm:text-4xl">İş ortağımız olun</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-300">
              Güzellik merkezi, klinik veya spa işletiyorsanız ürün ve cihazlarımız hakkında bilgi almak için bize ulaşın.
            </p>
            <p className="mt-6 text-neutral-400">Ataşehir, İstanbul</p>
            <a
              href="https://www.slimwell.com.tr"
              className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-medium text-neutral-950 transition-opacity hover:opacity-90"
            >
              slimwell.com.tr
            </a>
          </div>
        </FadeContent>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-neutral-500">
        © {currentYear} Slimwell Kozmetik Medikal Group A.Ş.
      </footer>
    </div>
  )
}

export default App
