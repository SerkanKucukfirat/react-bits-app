import Aurora from '@/components/Aurora'
import BlurText from '@/components/BlurText'
import ShinyText from '@/components/ShinyText'
import SplitText from '@/components/SplitText'

type PageHeroProps = {
  eyebrow: string
  title: string
  text?: string
  colors?: string[]
}

function PageHero({ eyebrow, title, text, colors = ['#7DD3FC', '#C084FC', '#F472B6'] }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-4 pt-40 pb-20 sm:px-6">
      <div className="absolute inset-0 opacity-60">
        <Aurora colorStops={colors} amplitude={1} blend={0.6} height={0.6} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-5">
          <ShinyText text={eyebrow} className="text-sm font-medium tracking-[0.25em] uppercase" />
        </div>
        <SplitText
          text={title}
          tag="h1"
          splitType="chars"
          effect="blur"
          trigger="load"
          delay={30}
          className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-6xl"
        />
        {text && (
          <BlurText
            text={text}
            animateBy="words"
            delay={40}
            className="mx-auto mt-6 max-w-2xl justify-center text-lg text-neutral-300"
          />
        )}
      </div>
    </section>
  )
}

export default PageHero
