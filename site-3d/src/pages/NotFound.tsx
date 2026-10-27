import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="Sayfa bulunamadı" text="Aradığınız sayfa taşınmış ya da kaldırılmış olabilir.">
      <div className="ph-actions">
        <Link className="btn light" to="/">
          Ana sayfaya dön <span>↗</span>
        </Link>
        <Link className="btn glass" to="/cihazlar">
          Cihazlar
        </Link>
      </div>
    </PageHero>
  )
}
