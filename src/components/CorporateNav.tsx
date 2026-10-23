import { motion } from 'motion/react'
import { useLocation } from 'react-router-dom'

import { to } from '@/lib/paths'

const items = [
  { label: 'Hakkımızda', path: '/hakkimizda' },
  { label: 'İş Ortaklarımız', path: '/is-ortaklarimiz' },
  { label: 'Fuarlarımız', path: '/fuarlarimiz' },
  { label: 'Sertifikalar', path: '/sertifika-ve-belgelerimiz' },
  { label: 'SSS', path: '/sik-sorulan-sorular' },
  { label: 'Gizlilik', path: '/gizlilik-politikamiz' },
]

function CorporateNav() {
  const { pathname } = useLocation()

  return (
    <nav aria-label="Kurumsal" className="sticky top-20 z-30 -mt-6 mb-10 flex justify-center px-4">
      <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-neutral-950/95 p-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {items.map(item => {
          const active = pathname === item.path
          return (
            <a
              key={item.path}
              href={to(item.path)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${active ? 'text-neutral-950' : 'text-neutral-300 hover:text-white'}`}
            >
              {active && (
                <motion.span layoutId="corporate-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }} />
              )}
              <span className="relative">{item.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export default CorporateNav
