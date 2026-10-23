import { motion } from 'motion/react'

import { ADDRESS, EMAIL, FACEBOOK_URL, LOGO, PHONE, PHONE_HREF, SERVICE_URL, WHATSAPP, categories } from '@/data'
import { to } from '@/lib/paths'

const currentYear = new Date().getFullYear()

const corporate = [
  { label: 'Hakkımızda', href: to('hakkimizda') },
  { label: 'İş Ortaklarımız', href: to('is-ortaklarimiz') },
  { label: 'Fuarlarımız', href: to('fuarlarimiz') },
  { label: 'Sertifika ve Belgelerimiz', href: to('sertifika-ve-belgelerimiz') },
  { label: 'Sık Sorulan Sorular', href: to('sik-sorulan-sorular') },
  { label: 'Gizlilik Politikamız', href: to('gizlilik-politikamiz') },
  { label: 'Blog', href: to('blog') },
]

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 pt-20 pb-10 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <img src={LOGO} alt="Slimwell Group" className="h-20 w-auto brightness-0 invert" />
          <p className="mt-4 max-w-xs text-sm text-neutral-400">“İncelmede Devrim” vizyonuyla 2015’ten beri profesyonel güzellik ve wellness teknolojileri.</p>
        </motion.div>
        <FooterColumn title="Cihazlar" delay={0.1}>
          {categories.map(c => (
            <FooterLink key={c.slug} href={to(`cihazlar?kategori=${c.slug}`)}>
              {c.name}
            </FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn title="Kurumsal" delay={0.2}>
          {corporate.map(item => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
          <FooterLink href={SERVICE_URL} external>
            Teknik Servis
          </FooterLink>
        </FooterColumn>
        <FooterColumn title="İletişim" delay={0.3}>
          <p className="text-neutral-400">{ADDRESS}</p>
          <FooterLink href={PHONE_HREF}>{PHONE}</FooterLink>
          <FooterLink href={`mailto:${EMAIL}`}>{EMAIL}</FooterLink>
          <FooterLink href={WHATSAPP} external>
            WhatsApp
          </FooterLink>
          <FooterLink href={FACEBOOK_URL} external>
            Facebook
          </FooterLink>
        </FooterColumn>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-neutral-500">
        <span>© {currentYear} Slimwell Group A.Ş. Tüm hakları saklıdır.</span>
        <a href={to('gizlilik-politikamiz')} className="hover:text-white">
          Gizlilik Politikası
        </a>
      </div>
    </footer>
  )
}

function FooterColumn({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col gap-2.5 text-sm"
    >
      <p className="mb-2 font-semibold text-white">{title}</p>
      {children}
    </motion.div>
  )
}

function FooterLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="w-fit text-neutral-400 transition-colors hover:text-white"
    >
      {children}
    </a>
  )
}

export default Footer
