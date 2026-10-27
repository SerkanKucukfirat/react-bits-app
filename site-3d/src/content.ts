import { brands, categories, devices, type Device } from '@shared/data'

export { brands, devices, categories, type Device }
export { ABOUT_TEXT, ADDRESS, EMAIL, LOGO, PHONE, PHONE_HREF, SERVICE_URL, WHATSAPP, stats } from '@shared/data'

const UPLOADS = 'https://www.slimwell.com.tr/wp-content/uploads/'

// The classic site sits one level up from /3d/
export const CLASSIC = import.meta.env.BASE_URL.replace(/3d\/$/, '')
export const devicePage = (d: Device) => `${CLASSIC}cihazlar/${d.slug}`

// The large banners from the slimwell.com.tr homepage sliders
export type Slide = { image: string; eyebrow: string; title: string; text: string; tone: string }
export const slides: Slide[] = [
  {
    image: `${UPLOADS}2026/10/cryo.jpg`,
    eyebrow: 'Yeni · Cryo',
    title: 'Cryo Q One',
    text: '−110°C’ye varan kontrollü soğuk deneyimi.',
    tone: '#9fd8ff',
  },
  {
    image: brands[1].image,
    eyebrow: 'Dermokozmetik',
    title: 'Casmara',
    text: 'Profesyonel yüz bakımında İspanyol uzmanlığı.',
    tone: '#e9cfb4',
  },
  {
    image: brands[2].image,
    eyebrow: 'Manyetik infüzyon',
    title: 'WishPro',
    text: 'Bilimin gücünü cildinizde hissedin.',
    tone: '#6fb6ff',
  },
  {
    image: brands[3].image,
    eyebrow: 'Vücut bakımı',
    title: 'Protocol Stria',
    text: '“Çatlakta Devrim” mottosuyla yeni standart.',
    tone: '#7fcf9f',
  },
  {
    image: brands[4].image,
    eyebrow: 'Anti-aging',
    title: 'Ericson Laboratoire',
    text: 'Supreme 4D ile Paris’ten ileri bakım.',
    tone: '#ff7a7a',
  },
  {
    image: brands[0].image,
    eyebrow: 'Kore cam cilt',
    title: 'Playskin',
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
  'bodyshape',
  'hydroshape',
  'rollbeautyline',
  'aquaslimmer',
  'activshape',
  'beautyline',
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
