import SplitText from '@/components/SplitText'
import StarBorder from '@/components/StarBorder'
import { to } from '@/lib/paths'

function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
      <SplitText text="404" tag="h1" splitType="chars" effect="pop" trigger="load" className="text-8xl font-bold tracking-tight text-white sm:text-9xl" />
      <p className="mt-6 text-lg text-neutral-400">Aradığınız sayfa bulunamadı.</p>
      <StarBorder as="a" href={to('')} color="#7DD3FC" className="mt-10">
        Ana sayfaya dön
      </StarBorder>
    </section>
  )
}

export default NotFound
