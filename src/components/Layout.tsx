import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import ClickSpark from '@/components/ClickSpark'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { BASE } from '@/lib/paths'

// Turns plain same-site <a href> clicks (menus, cards, React Bits components) into client-side navigation
function useInternalLinks() {
  const navigate = useNavigate()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest('a')
      if (!anchor || !anchor.href || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin || !url.pathname.startsWith(BASE)) return
      event.preventDefault()
      navigate(`/${url.pathname.slice(BASE.length)}${url.search}${url.hash}`)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])
}

function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }
    // The target section only exists once the page transition has mounted the new page, so poll for it briefly
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    const timer = window.setInterval(() => {
      const target = document.getElementById(id)
      if (target || ++tries > 30) window.clearInterval(timer)
      target?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return () => window.clearInterval(timer)
  }, [pathname, hash])
}

function Layout() {
  const location = useLocation()
  useInternalLinks()
  useScrollOnNavigate()

  return (
    <ClickSpark sparkColor={['#7DD3FC', '#C084FC', '#F472B6']} sparkCount={10} sparkRadius={22} shape="star">
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </ClickSpark>
  )
}

export default Layout
