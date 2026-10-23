import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import Aurora from '@/components/Aurora'
import BlurText from '@/components/BlurText'
import ChromaGrid from '@/components/ChromaGrid'
import ClickSpark from '@/components/ClickSpark'
import CountUp from '@/components/CountUp'
import FadeContent from '@/components/FadeContent'
import Header from '@/components/Header'
import ScrollReveal from '@/components/ScrollReveal'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'
import ScrollVelocity from '@/components/ScrollVelocity'
import ShinyText from '@/components/ShinyText'
import SplitText from '@/components/SplitText'
import StarBorder from '@/components/StarBorder'
import TiltedCard from '@/components/TiltedCard'
import {
  ABOUT_TEXT,
  ADDRESS,
  FACEBOOK_URL,
  PHONE,
  PHONE_HREF,
  SERVICE_URL,
  WHATSAPP,
  brands,
  devices,
  featuredDevices,
  heroDevices,
  stats,
} from '@/data'

const currentYear = new Date().getFullYear()
const ease = [0.22, 1, 0.36, 1] as const

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <ShinyText text={eyebrow} className="mb-4 text-sm font-medium tracking-[0.2em] uppercase" />
      <SplitText
        text={title}
        tag="h2"
        splitType="words, chars"
        effect="rise"
        delay={25}
        className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-6xl"
      />
      {text && (
        <FadeContent blur duration={1} delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-400">{text}</p>
        </FadeContent>
      )}
    </div>
  )
}

function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setIndex(i => (i + 1) % heroDevices.length), 3500)
    return () => window.clearInterval(timer)
  }, [])

  const current = heroDevices[index]

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 pb-16 sm:px-6">
      <div className="absolute inset-0 opacity-90">
        <Aurora colorStops={['#7DD3FC', '#C084FC', '#F472B6']} amplitude={1.2} blend={0.6} height={0.85} layers={2} glow={0.8} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/20 to-transparent md:from-neutral-950/30" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <ShinyText text="Slimwell Group" className="mb-6 text-sm font-medium tracking-[0.25em] uppercase" />
          <SplitText
            text="İncelmede Devrim."
            tag="h1"
            splitType="chars"
            effect="blur"
            trigger="load"
            delay={45}
            duration={1}
            hoverEffect="wave"
            className="text-5xl leading-[1.05] font-bold tracking-tight text-white sm:text-7xl"
          />
          <BlurText
            text="Yüksek teknolojili zayıflama ve güzellik cihazları, seçkin dermokozmetik markaları."
            animateBy="words"
            delay={60}
            className="mt-6 justify-center text-lg text-neutral-300 sm:text-xl lg:justify-start"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.4 }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center"
          >
            <StarBorder as="a" href="#cihazlar" color="#7DD3FC">
              Cihazları keşfedin
            </StarBorder>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              Bilgi al
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <TiltedCard
            containerWidth="min(440px, 82vw)"
            containerHeight="min(440px, 82vw)"
            imageWidth="min(440px, 82vw)"
            imageHeight="min(440px, 82vw)"
            radius={36}
            rotateAmplitude={14}
            scaleOnHover={1.05}
            glare={0.35}
            floating
            altText={current.name}
            style={{ '--tc-shadow-color': 'rgba(125, 211, 252, 0.45)' } as React.CSSProperties}
          >
            <div className="absolute inset-0 bg-white">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={current.name}
                  src={current.image}
                  alt={current.name}
                  initial={{ opacity: 0, scale: 1.12, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
                  transition={{ duration: 0.9, ease }}
                  className="absolute inset-0 h-full w-full object-contain p-6"
                  draggable={false}
                />
              </AnimatePresence>
            </div>
          </TiltedCard>
          <div className="mt-8 flex items-center gap-3">
            {heroDevices.map((d, i) => (
              <button
                key={d.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={d.name}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-white' : 'w-4 bg-white/30'}`}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.a
              key={current.name}
              href={current.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-4 text-center"
            >
              <span className="block text-xl font-semibold text-white">{current.name}</span>
              <span className="text-sm text-neutral-400">{current.category}</span>
            </motion.a>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function DeviceMarquee() {
  return (
    <section aria-hidden="true" className="border-y border-white/10 py-10">
      <ScrollVelocity
        texts={['Cryo Q One · Infra Step · Bodyshape · Rollshape · Hydroshape ·', 'Activshape · Emfit Plus Neo · Infrashape · Vacuactiv ·']}
        velocity={60}
        className="px-4 text-5xl font-bold tracking-tight text-white sm:text-7xl"
        outlineAlternate
        fadeEdges
      />
    </section>
  )
}

function FeaturedDevices() {
  return (
    <section id="cihazlar" className="scroll-mt-20 pt-28">
      <div className="px-4 sm:px-6">
        <SectionHeading eyebrow="Cihazlarımız" title="Teknolojiyle şekillenen sonuçlar" text="Kaydırdıkça öne çıkan cihazlarımızı tanıyın." />
      </div>
      <ScrollStack useWindowScroll itemDistance={120} itemStackDistance={40} itemScale={0.04} baseScale={0.86} blurAmount={1} dimAmount={0.15}>
        {featuredDevices.map(({ device, tagline, accent }) => (
          <ScrollStackItem key={device.name} itemClassName="mx-auto max-w-6xl">
            <div
              className="grid h-[min(78vh,620px)] grid-rows-[1fr_auto] overflow-hidden rounded-[2.5rem] border border-white/10 bg-neutral-900 md:grid-cols-2 md:grid-rows-1"
              style={{ boxShadow: `0 40px 120px -40px ${accent}` }}
            >
              <div className="order-2 flex flex-col justify-center gap-3 p-6 sm:gap-4 sm:p-12 md:order-1">
                <span className="text-sm font-medium tracking-[0.2em] uppercase" style={{ color: accent }}>
                  {device.category}
                </span>
                <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{device.name}</h3>
                <p className="text-lg text-neutral-400">{tagline}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={device.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-transform hover:scale-105"
                    style={{ backgroundColor: accent }}
                  >
                    Daha fazla bilgi
                  </a>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Bilgi al
                  </a>
                </div>
              </div>
              <div className="relative order-1 bg-white md:order-2">
                <img src={device.image} alt={device.name} className="absolute inset-0 h-full w-full object-contain p-8" />
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}

function AllDevices() {
  return (
    <section className="px-4 py-28 sm:px-6">
      <SectionHeading eyebrow="Tüm cihazlar" title="17 cihaz, tek çatı altında" text="İmleci kartların üzerinde gezdirin." />
      <div className="mx-auto max-w-7xl">
        <ChromaGrid
          items={devices.map(d => ({ image: d.image, title: d.name, subtitle: d.category, url: d.url, alt: d.name }))}
          minCardWidth={160}
          aspectRatio="1 / 1"
          reveal="spotlight"
          theme="dark"
        />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="hakkimizda" className="scroll-mt-20 border-t border-white/10 px-4 py-32 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <ShinyText text="Hakkımızda" className="mb-8 block text-center text-sm font-medium tracking-[0.2em] uppercase" />
        <ScrollReveal
          baseOpacity={0.12}
          enableBlur
          blurStrength={6}
          containerClassName="text-center"
          textClassName="text-3xl leading-snug font-semibold tracking-tight text-white sm:text-5xl"
        >
          {ABOUT_TEXT}
        </ScrollReveal>
        <div className="mt-24 grid grid-cols-2 gap-10 lg:grid-cols-4">
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
      </div>
    </section>
  )
}

function Brands() {
  return (
    <section id="markalar" className="scroll-mt-20 px-4 py-28 sm:px-6">
      <SectionHeading eyebrow="Markalarımız" title="Seçkin dermokozmetik markaları" />
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8">
        {brands.map((b, i) => (
          <FadeContent key={b.name} blur duration={1} delay={i * 0.1}>
            <TiltedCard
              imageSrc={b.image}
              altText={b.name}
              captionText={b.name}
              containerWidth="min(340px, 88vw)"
              containerHeight="calc(min(340px, 88vw) / 1.92)"
              imageWidth="min(340px, 88vw)"
              imageHeight="calc(min(340px, 88vw) / 1.92)"
              radius={20}
              rotateAmplitude={12}
              scaleOnHover={1.06}
              glare={0.4}
              showTooltip
              onClick={() => window.open(b.url, '_blank', 'noreferrer')}
            />
          </FadeContent>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="iletisim" className="scroll-mt-20 px-4 pt-16 pb-10 sm:px-6">
      <FadeContent blur duration={1}>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 p-10 text-center sm:p-20">
          <div className="absolute inset-0 -z-10 opacity-50">
            <Aurora colorStops={['#2DD4BF', '#7DD3FC', '#C084FC']} amplitude={0.8} blend={0.7} height={0.6} intro={false} />
          </div>
          <SplitText
            text="Bize ulaşın."
            tag="h2"
            splitType="chars"
            effect="pop"
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          />
          <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-300">
            Cihazlarımız ve markalarımız hakkında bilgi almak için ekibimizle iletişime geçin.
          </p>
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
      <div className="mx-auto mt-16 grid max-w-6xl gap-8 border-t border-white/10 pt-10 text-sm sm:grid-cols-3">
        <div>
          <p className="font-semibold text-white">Adres</p>
          <p className="mt-2 text-neutral-400">{ADDRESS}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Telefon</p>
          <a href={PHONE_HREF} className="mt-2 block text-sky-300 hover:underline">
            {PHONE}
          </a>
        </div>
        <div>
          <p className="font-semibold text-white">Teknik Servis</p>
          <a href={SERVICE_URL} target="_blank" rel="noreferrer" className="mt-2 block text-sky-300 hover:underline">
            Teknik servis formu
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
        <span>© {currentYear} Slimwell Group A.Ş. Tüm hakları saklıdır.</span>
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="hover:text-white">
          Facebook
        </a>
      </div>
    </section>
  )
}

function App() {
  return (
    <ClickSpark sparkColor={['#7DD3FC', '#C084FC', '#F472B6']} sparkCount={10} sparkRadius={22} shape="star">
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <Header />
        <main>
          <Hero />
          <DeviceMarquee />
          <FeaturedDevices />
          <AllDevices />
          <About />
          <Brands />
          <Contact />
        </main>
      </div>
    </ClickSpark>
  )
}

export default App
