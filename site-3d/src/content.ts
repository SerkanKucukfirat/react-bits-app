import { brands, categories, devices, type Device } from '@shared/data'

export { brands, devices, categories, type Device }
export { ABOUT_TEXT, ADDRESS, EMAIL, LOGO, PHONE, PHONE_HREF, SERVICE_URL, WHATSAPP, stats } from '@shared/data'

const UPLOADS = 'https://www.slimwell.com.tr/wp-content/uploads/'

// The classic site sits one level up from /3d/
export const CLASSIC = import.meta.env.BASE_URL.replace(/3d\/$/, '')
export const devicePage = (d: Device) => `${CLASSIC}cihazlar/${d.slug}`

// The large banners from the slimwell.com.tr homepage sliders
export type Slide = { image: string; eyebrow: string; title: string; tab: string; text: string; tone: string }
export const slides: Slide[] = [
  {
    image: `${UPLOADS}2026/10/Cryo.png`,
    eyebrow: 'Yeni · Cryo',
    title: 'Cryo Q One',
    tab: 'Cryo Q One',
    text: '−110°C’ye varan kontrollü soğuk deneyimi.',
    tone: '#9fd8ff',
  },
  {
    image: `${UPLOADS}2026/09/slider-1.png`,
    eyebrow: 'Diyetisyenlerin tercihi',
    title: 'Infra Step · Rollshape · Infrashape · Vacu Activ',
    tab: 'Cihaz ailesi',
    text: 'Zayıflama ve incelmede yeni nesil cihaz ailesi.',
    tone: '#dfe6f0',
  },
  {
    image: `${UPLOADS}2026/08/1100x619.jpg.jpeg`,
    eyebrow: '17–20 Aralık · Gloria Verde Resort',
    title: 'Yıldızlar Kongresi 2026',
    tab: 'Yıldızlar Kongresi',
    text: 'Slimwell Group 3. yıl buluşması.',
    tone: '#e7c9a3',
  },
  {
    image: brands[1].image,
    eyebrow: 'Dermokozmetik',
    title: 'Casmara',
    tab: 'Casmara',
    text: 'Profesyonel yüz bakımında İspanyol uzmanlığı.',
    tone: '#e9cfb4',
  },
  {
    image: brands[2].image,
    eyebrow: 'Manyetik infüzyon',
    title: 'WishPro',
    tab: 'WishPro',
    text: 'Bilimin gücünü cildinizde hissedin.',
    tone: '#6fb6ff',
  },
  {
    image: brands[3].image,
    eyebrow: 'Vücut bakımı',
    title: 'Protocol Stria',
    tab: 'Protocol Stria',
    text: '“Çatlakta Devrim” mottosuyla yeni standart.',
    tone: '#7fcf9f',
  },
  {
    image: brands[4].image,
    eyebrow: 'Anti-aging',
    title: 'Ericson Laboratoire',
    tab: 'Ericson',
    text: 'Supreme 4D ile Paris’ten ileri bakım.',
    tone: '#ff7a7a',
  },
  {
    image: brands[0].image,
    eyebrow: 'Kore cam cilt',
    title: 'Playskin',
    tab: 'Playskin',
    text: 'Lipozom teknolojisiyle Kore cam cilt protokolü.',
    tone: '#f5b8c8',
  },
]

// Devices shown in the 3D showroom (product shots on white)
export const showroom = [
  'cryo-q-one',
  'infra-step',
  'rollshape',
  'infrashape',
  'vacuactiv',
  'hydroshape',
  'rollbeautyline',
  'aquaslimmer',
  'activshape',
  'emfit-plus-neo',
]
  .map(slug => devices.find(d => d.slug === slug))
  .filter((d): d is Device => Boolean(d))

export const technologies = [
  { code: 'IR', title: 'Infrared ısı', text: 'Derin dokuya ulaşan kızılötesi ısı ile egzersizin etkisini artırır.' },
  { code: 'VAC', title: 'Vakum', text: 'Alçak basınç ortamında hareket ederken kilo kaybını en üst seviyeye taşır.' },
  { code: 'CRY', title: 'Kriyo', text: 'Kontrollü soğuk uygulama ile recovery ve wellness rutinlerine yeni yaklaşım.' },
  { code: 'COL', title: 'Kolajen', text: 'Kolajen ışığı ile cildin sıkılaşmasını ve yenilenmesini destekler.' },
  { code: 'O₃', title: 'Ozon', text: 'Ozon teknolojisi ile hijyenik ve ferah bir seans ortamı sağlar.' },
  { code: 'ION', title: 'Hava iyonizasyonu', text: 'Negatif iyonlarla kabin içi havayı tazeler, seansı konforlu kılar.' },
]
