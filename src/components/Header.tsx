import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import GooeyNav from '@/components/GooeyNav'
import GradientText from '@/components/GradientText'
import StarBorder from '@/components/StarBorder'

const navItems = [
  { label: 'Hakkımızda', href: '#hakkimizda' },
  { label: 'Ürünler', href: '#urunler' },
  { label: 'Neden Slimwell', href: '#neden' },
  { label: 'İletişim', href: '#iletisim' },
]

const brandColors = ['#2dd4bf', '#a78bfa', '#f472b6', '#2dd4bf']

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      // The last section whose top has passed the middle of the screen is the active one
      const middle = window.innerHeight / 2
      let current = 0
      navItems.forEach((item, i) => {
        const section = document.querySelector(item.href)
        if (section && section.getBoundingClientRect().top < middle) current = i
      })
      setActiveIndex(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/10 bg-neutral-950/70 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-500 sm:px-6 ${
          scrolled ? 'py-2' : 'py-5'
        }`}
      >
        <a href="#" className="text-2xl font-bold tracking-tight drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)]">
          <GradientText colors={brandColors} animationSpeed={6}>
            Slimwell
          </GradientText>
        </a>

        <div className="hidden md:block">
          <GooeyNav items={navItems} activeIndex={activeIndex} onChange={setActiveIndex} colors={brandColors} size="sm" />
        </div>

        <div className="hidden md:block">
          <StarBorder as="a" href="#iletisim" color="#2dd4bf" className="text-sm">
            Bayimiz olun
          </StarBorder>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(open => !open)}
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
            className="absolute h-0.5 w-6 rounded bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
            className="absolute h-0.5 w-6 rounded bg-white"
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden border-t border-white/10 bg-neutral-950/95 px-4 backdrop-blur-md md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 + i * 0.07 }}
              >
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 text-lg font-medium text-neutral-200"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
