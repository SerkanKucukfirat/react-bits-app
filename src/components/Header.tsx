import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import GooeyNav from '@/components/GooeyNav'
import StarBorder from '@/components/StarBorder'
import { LOGO, WHATSAPP } from '@/data'
import { to } from '@/lib/paths'

const navItems = [
  { label: 'Cihazlar', href: to('cihazlar'), match: ['/cihazlar'] },
  { label: 'Markalar', href: to('#markalar'), match: [] },
  {
    label: 'Kurumsal',
    href: to('hakkimizda'),
    match: ['/hakkimizda', '/is-ortaklarimiz', '/fuarlarimiz', '/sertifika-ve-belgelerimiz', '/sik-sorulan-sorular', '/gizlilik-politikamiz'],
  },
  { label: 'Blog', href: to('blog'), match: ['/blog'] },
  { label: 'İletişim', href: to('iletisim'), match: ['/iletisim'] },
]

const activeFor = (pathname: string, hash: string) => {
  if (pathname === '/' && hash === '#markalar') return 1
  return navItems.findIndex(item => item.match.some(m => pathname.startsWith(m)))
}

const brandColors = ['#7DD3FC', '#C084FC', '#F472B6', '#2DD4BF']

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()
  // The menu stays open only on the page it was opened on, so navigating closes it
  const [menuOpenedOn, setMenuOpenedOn] = useState<string | null>(null)
  const menuOpen = menuOpenedOn === pathname
  const setMenuOpen = (open: boolean) => setMenuOpenedOn(open ? pathname : null)
  const activeIndex = activeFor(pathname, hash)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 ${
          scrolled ? 'py-1' : 'py-3'
        }`}
      >
        <a href={to('')} aria-label="Slimwell Group ana sayfa" className="shrink-0">
          <img
            src={LOGO}
            alt="Slimwell Group"
            className={`w-auto brightness-0 invert transition-all duration-500 ${scrolled ? 'h-12' : 'h-16'}`}
          />
        </a>

        <div className="hidden md:block">
          <GooeyNav items={navItems} activeIndex={Math.max(activeIndex, 0)} colors={brandColors} size="sm" />
        </div>

        <div className="hidden md:block">
          <StarBorder as="a" href={WHATSAPP} target="_blank" rel="noreferrer" color="#7DD3FC" className="text-sm">
            Bilgi al
          </StarBorder>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
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
            className="overflow-hidden border-t border-white/10 bg-neutral-950/95 px-4 backdrop-blur-xl md:hidden"
          >
            {[...navItems, { label: 'Bilgi al (WhatsApp)', href: WHATSAPP }].map((item, i) => (
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
