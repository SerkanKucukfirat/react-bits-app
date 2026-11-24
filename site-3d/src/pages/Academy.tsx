import { useEffect } from 'react'
import { HEOCADEMY_URL } from '../content'

// The old /heocademy address now forwards to the Heocademy platform
export default function AcademyPage() {
  useEffect(() => {
    window.location.replace(HEOCADEMY_URL)
  }, [])
  return (
    <section className="wrap academy-redirect">
      <p>
        Heocademy’ye yönlendiriliyorsunuz… <a href={HEOCADEMY_URL}>Açılmazsa tıklayın</a>
      </p>
    </section>
  )
}
