import { useEffect } from 'react'
import Hero from '../components/Hero'
import Showroom from '../components/Showroom'
import { Brands, Manifesto, Marquee, Stats, Technology } from '../components/Sections'

export default function Home() {
  useEffect(() => {
    document.title = 'Slimwell Group — İncelmede Devrim'
  }, [])
  return (
    <>
      <Hero />
      <Marquee />
      <Showroom />
      <Manifesto />
      <Technology />
      <Stats />
      <Brands />
    </>
  )
}
