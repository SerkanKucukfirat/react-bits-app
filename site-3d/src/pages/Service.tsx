import { useRef } from 'react'
import PageHero from '../components/PageHero'
import RequestForm, { type Field } from '../components/RequestForm'
import { useReveal } from '../components/useReveal'
import { PHONE, PHONE_HREF, WHATSAPP, devices } from '../content'

const FIELDS: Field[] = [
  { name: 'name', label: 'Ad Soyad', required: true, half: true, autoComplete: 'name' },
  { name: 'company', label: 'İşletme adı', required: true, half: true, autoComplete: 'organization' },
  { name: 'phone', label: 'Telefon', type: 'tel', required: true, half: true, autoComplete: 'tel' },
  { name: 'email', label: 'E-posta', type: 'email', half: true, autoComplete: 'email' },
  { name: 'city', label: 'İl / İlçe', required: true, half: true, autoComplete: 'address-level1' },
  { name: 'device', label: 'Cihaz', type: 'select', required: true, half: true, options: [...devices.map(d => d.name), 'Diğer'] },
  { name: 'serial', label: 'Seri numarası', half: true, placeholder: 'Cihazın arkasındaki etikette' },
  { name: 'urgency', label: 'Aciliyet', type: 'select', half: true, options: ['Cihaz çalışmıyor', 'Çalışıyor ama sorunlu', 'Bakım / kontrol'] },
  { name: 'issue', label: 'Arızayı anlatın', type: 'textarea', required: true, placeholder: 'Ne oluyor, ne zamandan beri, ekranda bir hata kodu var mı?' },
]

const STEPS = [
  { n: '01', t: 'Talebinizi iletin', d: 'Formu doldurun; mesaj WhatsApp’ta hazır açılır, göndermeniz yeterli.' },
  { n: '02', t: 'Ekibimiz arar', d: 'Teknik ekibimiz sizi arayıp arızayı birlikte değerlendirir.' },
  { n: '03', t: '48 saatte müdahale', d: 'Bölgenizdeki uzman ekibimiz en geç 48 saat içinde işletmenizde olur.' },
]

export default function ServicePage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Teknik servis"
        title="Servis talebi oluşturun"
        text="Türkiye genelinde her bölgede uzman teknik ekibimizle cihaz arızalarına en geç 48 saat içinde müdahale ediyoruz. Tüm cihazlarımız 2 yıl garantilidir."
        crumbs={[{ to: '/teknik-servis', label: 'Teknik servis' }]}
      />
      <section className="studio">
        <div className="wrap svc-steps">
          {STEPS.map(s => (
            <div key={s.n} className="svc-step reveal">
              <span>{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="wrap form-wrap">
          <div className="form-card reveal">
            <h2>Arıza bildirimi</h2>
            <p className="form-lead">Yıldızlı alanlar zorunludur.</p>
            <RequestForm title="Teknik servis talebi" fields={FIELDS} submitLabel="Servis talebini gönder" />
          </div>
          <aside className="form-aside reveal">
            <h3>Acil durumda</h3>
            <p>Cihazınız tamamen durduysa doğrudan arayın.</p>
            <a className="btn dark" href={PHONE_HREF}>
              {PHONE}
            </a>
            <a className="btn ghost-dark" href={WHATSAPP} target="_blank" rel="noreferrer">
              WhatsApp’tan yazın <span>↗</span>
            </a>
            <ul className="form-facts">
              <li>
                <strong>48 saat</strong> içinde müdahale
              </li>
              <li>
                <strong>2 yıl</strong> garanti
              </li>
              <li>
                Türkiye geneli <strong>bölge ekipleri</strong>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </div>
  )
}
