import { motion } from 'motion/react'

import ContactCta from '@/components/ContactCta'
import PageHero from '@/components/PageHero'
import SpotlightCard from '@/components/SpotlightCard'
import { blogPosts } from '@/data'

const accents = ['rgba(125, 211, 252, 0.25)', 'rgba(192, 132, 252, 0.25)', 'rgba(244, 114, 182, 0.25)', 'rgba(45, 212, 191, 0.25)']

function Blog() {
  return (
    <>
      <PageHero eyebrow="Slimwell Blog" title="Wellness, teknoloji ve güzellik" text="Sektörden haberler, cihaz rehberleri ve sağlıklı yaşam önerileri." colors={['#C084FC', '#F472B6', '#7DD3FC']} />

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="block"
            >
              <SpotlightCard spotlightColor={accents[i % accents.length]} className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-neutral-900 p-7">
                <h2 className="text-lg leading-snug font-semibold text-white">{post.title}</h2>
                <span className="text-sm text-sky-300">Yazıyı oku →</span>
              </SpotlightCard>
            </motion.a>
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  )
}

export default Blog
