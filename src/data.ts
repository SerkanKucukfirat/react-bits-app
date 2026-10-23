// Content taken from the live site, https://www.slimwell.com.tr
const UPLOADS = 'https://www.slimwell.com.tr/wp-content/uploads/'
const DEVICE_PAGES = 'https://www.slimwell.com.tr/cihazlar/'

export const LOGO = `${UPLOADS}2023/10/slimwell-logo.png`
export const WHATSAPP = 'https://wa.me/905300301283?text=Merhaba%20bilgi%20almak%20istiyorum'
export const PHONE = '+90 216 369 1 369'
export const PHONE_HREF = 'tel:+902163691369'
export const ADDRESS = 'İçerenköy Mah. Karaman Çiftlik Yolu Cad. Karakum Sokak No:2 Ataşehir / İstanbul'
export const SERVICE_URL = 'https://www.sts.slimwell.tr/'
export const FACEBOOK_URL = 'https://www.facebook.com/SlimwellGroup'

export type Device = {
  name: string
  category: string
  image: string
  url: string
}

const device = (name: string, category: string, image: string, page: string): Device => ({
  name,
  category,
  image: UPLOADS + image,
  url: DEVICE_PAGES + page,
})

export const devices: Device[] = [
  device('Cryo Q One', 'Cryo', '2026/10/cryo.jpg', 'cryo/cyro-q-one/'),
  device('Infra Step', 'Merdiven', '2026/10/infra.jpg', 'merdiven/infra-step/'),
  device('Beautyline', 'Vakumlu yürüme ve koşma bandı', '2023/11/beautyline.jpg', 'vakumlu-yurume-ve-kosma-bantlari/beautyline/'),
  device('Bodyshape', 'Vakumlu yürüme ve koşma bandı', '2023/11/bodyshape.jpg', 'vakumlu-yurume-ve-kosma-bantlari/bodyshape/'),
  device('Bodyslimmer', 'Vakumlu yürüme ve koşma bandı', '2023/11/bodyslimmer.jpg', 'vakumlu-yurume-ve-kosma-bantlari/bodyslimmer/'),
  device('Vacuactiv', 'Vakumlu yürüme ve koşma bandı', '2023/11/vacuactiv.jpg', 'vakumlu-yurume-ve-kosma-bantlari/vacuactiv/'),
  device('Rollbeautyline', 'Roll serisi', '2023/12/roll-beautyline-1.jpg', 'roll-serisi/rollbeautyline/'),
  device('Rollshape', 'Roll serisi', '2023/11/rollshape.jpg', 'roll-serisi/rollshape/'),
  device('Rollslimmer', 'Roll serisi', '2023/11/rollslimmer.jpg', 'roll-serisi/rollslimmer/'),
  device('Aquaslimmer', 'Su içerisinde bisiklet', '2023/11/aquaslimmer.jpg', 'su-icerisinde-bisikletler/aquaslimmer/'),
  device('Hydroshape', 'Su içerisinde bisiklet', '2023/11/hydroshape.png', 'su-icerisinde-bisikletler/hydroshape/'),
  device('Infrashape', 'Yatay bisiklet', '2023/11/infrashapre.png', 'yatay-bisikletler/infrashape/'),
  device('Infraslimmer', 'Yatay bisiklet', '2023/11/infraslimmer.jpg', 'yatay-bisikletler/infraslimmer/'),
  device('Activcouch', 'Masaj koltuğu', '2023/11/activcouch.jpg', 'masaj-koltuklari/activcouch/'),
  device('Couchslimmer', 'Masaj koltuğu', '2023/11/couchslimmer.jpg', 'masaj-koltuklari/couchslimmer/'),
  device('Activshape', 'Sıcak pilates', '2023/11/activshape.jpg', 'sicak-pilates/activshape/'),
  device('Emfit Plus Neo', 'Bölgesel incelme cihazı', '2023/11/emfit-plus-neo.jpg', 'bolgesel-incelme-cihazlari/emfit-plus-neo/'),
]

export const byName = (name: string) => devices.find(d => d.name === name)!

export const heroDevices = ['Cryo Q One', 'Infra Step', 'Bodyshape', 'Emfit Plus Neo'].map(byName)

export const featuredDevices = [
  { device: byName('Cryo Q One'), tagline: '−110°C’ye varan soğuk deneyimi.', accent: '#7DD3FC' },
  { device: byName('Infra Step'), tagline: 'Merdiven serisi', accent: '#FB923C' },
  { device: byName('Bodyshape'), tagline: 'Vakumlu yürüme ve koşma bandı', accent: '#C084FC' },
  { device: byName('Hydroshape'), tagline: 'Su içerisinde bisiklet', accent: '#2DD4BF' },
  { device: byName('Activshape'), tagline: 'Sıcak pilates', accent: '#F472B6' },
]

export const brands = [
  { name: 'Playskin', image: `${UPLOADS}2026/10/Playsk%E2%94%80%E2%96%92n.png`, url: 'https://www.playskin.com.tr/' },
  { name: 'Casmara', image: `${UPLOADS}2026/10/Casmara.png`, url: 'https://www.casmaratr.com/' },
  { name: 'WishPro', image: `${UPLOADS}2026/10/Wishpro.png`, url: 'https://wishproturkiye.com/' },
  { name: 'Protocol Stria', image: `${UPLOADS}2026/10/Protokol-Stria.png`, url: 'https://protocolstria.com/' },
  { name: 'Ericson Laboratoire', image: `${UPLOADS}2026/10/Ericson.png`, url: 'https://www.ericsonlaboratoireturkiye.com.tr/' },
]

export const stats = [
  { value: 65, suffix: '+', label: 'Alanında uzman çalışan' },
  { value: 81, suffix: '', label: 'İlde iş ortağı' },
  { value: 9000, suffix: '+', label: 'İş ortağı' },
  { value: 60, suffix: '+', label: 'Ülkeyle ticaret' },
]

export const ABOUT_TEXT =
  'Slimwell Group, “İncelmede Devrim” misyonuyla sağlıklı zayıflama, yüksek kaliteli dermokozmetik ve güzellik ürün yelpazesiyle inovasyonun liderlerindendir. Casmara, Playskin, Protocol Stria, WishPro ve Ericson Laboratoire gibi seçkin markaları bünyesinde barındırır.'
