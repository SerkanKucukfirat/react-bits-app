// Content taken from the live site, https://www.slimwell.com.tr
const UPLOADS = 'https://www.slimwell.com.tr/wp-content/uploads/'
// Device photos supplied by Slimwell, served from this site's public/devices (the 3D site lives in /3d/)
const LOCAL_DEVICES = import.meta.env.BASE_URL.replace(/3d\/$/, '') + 'devices/'

export const LOGO = `${UPLOADS}2023/10/slimwell-logo.png`
export const WHATSAPP = 'https://wa.me/905300301283?text=Merhaba%20bilgi%20almak%20istiyorum'
export const PHONE = '+90 216 369 1 369'
export const PHONE_HREF = 'tel:+902163691369'
export const EMAIL = 'info@slimwell.com'
export const ADDRESS = 'İçerenköy Mah. Karaman Çiftlik Yolu Cad. Karakum Sokak No:2 Ataşehir / İstanbul'
export const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent('Karakum Sokak No:2 İçerenköy Ataşehir İstanbul')}&z=16&output=embed`
export const SERVICE_URL = 'https://www.sts.slimwell.tr/'
export const FACEBOOK_URL = 'https://www.facebook.com/SlimwellGroup'
export const PARTNERS_VIDEO = `${UPLOADS}2026/10/Slimwell_Silver_Poppins_10s-2.mov`
export const CERTIFICATES_IMAGE = `${UPLOADS}2023/12/sertifikalar.png`
export const CERTIFICATE_STRIP = `${UPLOADS}2023/12/sertifika.png`
export const ISO_LOGO = `${UPLOADS}2023/12/Logo_for_client_1110011.png`
export const BUILDING_IMAGE = `${UPLOADS}2023/11/slimwell.png`

export type Category = { slug: string; name: string }

export const categories: Category[] = [
  { slug: 'cryo', name: 'Cryo' },
  { slug: 'merdiven', name: 'Merdiven' },
  { slug: 'vakumlu-yurume-ve-kosma-bantlari', name: 'Vakumlu Yürüme ve Koşma Bantları' },
  { slug: 'roll-serisi', name: 'Roll Serisi' },
  { slug: 'su-icerisinde-bisikletler', name: 'Su İçerisinde Bisikletler' },
  { slug: 'yatay-bisikletler', name: 'Yatay Bisikletler' },
  { slug: 'masaj-koltuklari', name: 'Masaj Koltukları' },
  { slug: 'sicak-pilates', name: 'Sıcak Pilates' },
  { slug: 'bolgesel-incelme-cihazlari', name: 'Bölgesel İncelme Cihazları' },
]

export type Device = {
  slug: string
  name: string
  category: string
  categorySlug: string
  image: string
  description: string[]
  features: string[]
}

const VACUUM_TREADMILL = (name: string) => [
  `${name}, Avrupa Birliği’nde üretilmiş yenilikçi bir zayıflama ve incelme cihazıdır. Koşu bandı üzerinde bir yandan yürür veya koşarken, diğer yandan vakum ve kolajen teknolojileri ile donatılmış düşük atmosferik basınç ortamında haftada ortalama 5000 kaloriye kadar yakabilirsiniz.`,
  `Hem kilo vermek hem de vücudunuzu şekillendirmek için ${name} ile tanışın ve etkili sonuçlar elde edin!`,
]
const ROLL = (name: string) =>
  `${name} 2.500 yıllık Uzakdoğu masaj tekniğinin günümüz teknolojisine uyarlanmış hali olan ileri teknolojili bir masaj cihazıdır. Fiziksel aktivitelere ek olarak ${name} masajları ile cildin sıkılaşması, gevşeyen ve sarkan cildin toparlanması sağlanır.`
const HORIZONTAL_BIKE = (name: string) =>
  `${name} horizontal, fiziksel aktivite sağlayan, bu sayede kilo verme, incelme, vücuttaki fazla suyu atma, kas gelişimi ve kuvvetlenmesi gibi etkileri ile kendini kanıtlamış yenilikçi ve yüksek teknoloji içeren, yatay bir bisiklet etrafında tasarlanmış sıra dışı ve devrimsel bir zayıflama cihazıdır. Cihazın içerisindeki düzenek, postürünüze en uygun şekilde pozisyonlanarak uygun kaslarınızın çalışmasını sağlayacak şekilde tasarlanmıştır. Spor salonuna gitmeye vakti olmayanlar veya hedeflerine ulaşmakta zorlananlar için idealdir.`
const WATER_BIKE = (name: string) =>
  `${name}, suyun içinde bir bisikletin çok ötesinde bir fiziksel aktivite sağlayan, bu sayede kilo verme, incelme, vücuttaki fazla suyu atma, kas gelişimi ve kuvvetlenmesi gibi etkileri ile özellikle Avrupa ve ABD’de kendini kanıtlamış yenilikçi ve yüksek teknoloji içeren bir cihazdır. ${name} ile bir seans boyunca suyun içinde bisiklete bindiğinizde 16 jakuzi jeti bedeninize masaj yapar, sizi rahatlatır ve spa/wellness deneyimi sağlar.`
const MASSAGE_BED = (name: string) =>
  `${name}, egzersiz sonrası rahatlama ve gevşeme haline geçmenizi sağlayan, beden ısısı ve bedensel rahatlama için en doğru pozisyona ayarlanmış tüm vücuda masaj yapan ergonomik özel tasarım masaj yatağıdır. Bedeninizin egzersiz sonrası en konforlu şekilde rahatlamasını sağlayarak beyninize kas faaliyetlerinin durduğunu, artık bedeni gevşetmesi gerektiği mesajını iletir.`

const COLOR_CABIN = 'Dış kabin istenilen renkte üretilebilir'
const MASSAGE_FEATURES = ['5 masaj programı', '4 bölgeli masaj', 'Isıtma fonksiyonu', 'Yüksek kaliteli eko deri', 'Ergonomik şekil', 'Uzaktan kumanda', 'İstenilen renkte üretilebilir']
const TREADMILL_FEATURES = ['Dokunmatik ekran', COLOR_CABIN, 'Kolajen teknolojisi', 'Aroma haznesi', 'Vakum paneli', 'IR infrared (ısı)', 'Renk teknolojisi', 'Hava iyonizasyonu']

type DeviceInput = Omit<Device, 'image' | 'category'> & { image: string }

const deviceInputs: DeviceInput[] = [
  {
    slug: 'cryo-q-one',
    name: 'Cryo Q One',
    categorySlug: 'cryo',
    image: '2026/10/cryo.jpg',
    description: [
      'Cryo Q One, kontrollü soğuk uygulama ve recovery deneyimini modern teknolojiyle buluşturan yeni nesil bir wellness çözümüdür. Fiziksel aktivite sonrası toparlanma rutinlerini desteklemeye yönelik tasarlanan sistem; profesyonel recovery, spor ve wellness merkezlerinin kullanımına yönelik geliştirilmiştir.',
      'Teknolojik tasarımıyla öne çıkan Cryo Q One, kontrollü soğuk uygulama deneyimini profesyonel bir sistem içerisinde sunarak recovery ve wellness rutinlerine farklı bir yaklaşım kazandırır.',
    ],
    features: ['−110°C’ye varan soğuk deneyimi', 'Dokunmatik ekran'],
  },
  {
    slug: 'infra-step',
    name: 'Infra Step',
    categorySlug: 'merdiven',
    image: 'local:infra-step.jpg',
    description: [
      'Infra Step, merdiven tırmanma egzersizlerini modern teknoloji ve konforla bir araya getiren yenilikçi bir fitness ve wellness cihazıdır. Kullanıcının kendi enerjisiyle çalışan yapısı sayesinde düşük enerji tüketimi sunarken, kompakt tasarımıyla profesyonel kullanım alanlarına uyum sağlar.',
      'Cihaz; IR infrared (ısı), ozon ve kolajen uygulamaları ile egzersiz deneyimini destekler. Bölgesel uygulamaya olanak sağlayan Infra Step; wellness merkezleri, spor salonları, güzellik merkezleri ve sağlık odaklı işletmeler için profesyonel kullanıma yönelik bir çözüm sunar.',
      'Modern tasarım, fonksiyonel kullanım ve çok yönlü wellness deneyimini tek cihazda bir araya getirir.',
    ],
    features: ['Dokunmatik ekran', 'Kolajen tedavisi', 'Ozon tedavisi', 'IR infrared'],
  },
  {
    slug: 'beautyline',
    name: 'Beautyline',
    categorySlug: 'vakumlu-yurume-ve-kosma-bantlari',
    image: '2023/11/beautyline.jpg',
    description: VACUUM_TREADMILL('Beautyline'),
    features: TREADMILL_FEATURES,
  },
  {
    slug: 'bodyshape',
    name: 'Bodyshape',
    categorySlug: 'vakumlu-yurume-ve-kosma-bantlari',
    image: '2023/11/bodyshape.jpg',
    description: VACUUM_TREADMILL('Bodyshape'),
    features: TREADMILL_FEATURES,
  },
  {
    slug: 'bodyslimmer',
    name: 'Bodyslimmer',
    categorySlug: 'vakumlu-yurume-ve-kosma-bantlari',
    image: '2023/11/bodyslimmer.jpg',
    description: VACUUM_TREADMILL('Bodyslimmer'),
    features: TREADMILL_FEATURES,
  },
  {
    slug: 'vacuactiv',
    name: 'Vacuactiv',
    categorySlug: 'vakumlu-yurume-ve-kosma-bantlari',
    image: 'local:vacuactiv.jpg',
    description: [
      'Vacuactiv, zayıflama ve incelme alanında devrim niteliğinde bir cihazdır. Avrupa Birliği’nde üretilen bu yenilikçi teknoloji, düşük atmosferik basınç ortamında vakum ve kızılötesi ışınları kullanarak, maksimum kalori yakımını sağlar.',
      'Negatif vakum direnci ve kızılötesi ısıtma ile birleşen Vacuactiv, fiziksel aktivite sağlayan, bu sayede kilo verme, incelme, vücuttaki fazla suyu atma, kas gelişimi ve kuvvetlenmesi gibi etkileri ile kendini kanıtlamış yenilikçi ve yüksek teknoloji içeren bir cihazdır. Spor salonuna gitmeye vakti olmayanlar veya hedeflerine ulaşmakta zorlananlar için idealdir.',
      'Cihazın içinde bulunan vakum teknolojisi ile hava tamamen çekilir ve oluşan alçak basınç ortamında kişinin yürüyüşü zorlaşırken, kilo kaybı maksimum seviyeye çıkar.',
    ],
    features: ['Dokunmatik ekran', COLOR_CABIN, 'Aroma haznesi', 'Vakum paneli', 'IR infrared (ısı)', 'Renk teknolojisi', 'Hava iyonizasyonu'],
  },
  {
    slug: 'rollbeautyline',
    name: 'Rollbeautyline',
    categorySlug: 'roll-serisi',
    image: '2023/12/roll-beautyline-1.jpg',
    description: [ROLL('Rollbeautyline')],
    features: ['Dokunmatik ekran', COLOR_CABIN, 'Organik ahşap rollar', 'Kolajen teknolojisi', 'IR infrared (ısı)', 'Renk teknolojisi', 'Hava iyonizasyonu'],
  },
  {
    slug: 'rollshape',
    name: 'Rollshape',
    categorySlug: 'roll-serisi',
    image: 'local:rollshape.jpg',
    description: [ROLL('Rollshape')],
    features: ['Dokunmatik ekran', COLOR_CABIN, 'Organik ahşap rollar', 'IR infrared (ısı)', 'Hava iyonizasyonu'],
  },
  {
    slug: 'rollslimmer',
    name: 'Rollslimmer',
    categorySlug: 'roll-serisi',
    image: '2023/11/rollslimmer.jpg',
    description: [
      ROLL('Rollslimmer'),
      'Selülitlerin giderilmesine, sıkılaşmaya ve gevşeyen, sarkan cildin kısa süre içerisinde toplanmasına yardımcı olur.',
    ],
    features: ['Dokunmatik ekran', COLOR_CABIN, 'Organik ahşap rollar', 'Ozon teknolojisi', 'Kolajen teknolojisi', 'IR infrared (ısı)', 'Kromaterapi', 'Hava iyonizasyonu'],
  },
  {
    slug: 'aquaslimmer',
    name: 'Aquaslimmer',
    categorySlug: 'su-icerisinde-bisikletler',
    image: '2023/11/aquaslimmer.jpg',
    description: [
      WATER_BIKE('Aquaslimmer'),
      'Bisiklete binmek; yarım saatlik bir seansta 400-600 kalori yakımı sağlarken, Aquaslimmer, suyun direnci havadan 12 kat fazla olduğu için, etkili bir fiziksel aktivite ve kalori yakımı ile kilo vermeye yardımcı olur.',
    ],
    features: ['Dokunmatik ekran', COLOR_CABIN, 'Ozon teknolojisi', 'Kolajen teknolojisi', 'Kromaterapi', '16 jakuzi jeti'],
  },
  {
    slug: 'hydroshape',
    name: 'Hydroshape',
    categorySlug: 'su-icerisinde-bisikletler',
    image: '2023/11/hydroshape.png',
    description: [WATER_BIKE('Hydroshape')],
    features: ['Dokunmatik ekran', COLOR_CABIN, '16 jakuzi jeti'],
  },
  {
    slug: 'infrashape',
    name: 'Infrashape',
    categorySlug: 'yatay-bisikletler',
    image: 'local:infrashape.jpg',
    description: [HORIZONTAL_BIKE('Infrashape')],
    features: ['Dokunmatik ekran', COLOR_CABIN, 'Aroma teknolojisi', 'Vakum', 'IR infrared (ısı)', 'Renk teknolojisi', 'Hava iyonizasyonu'],
  },
  {
    slug: 'infraslimmer',
    name: 'Infraslimmer',
    categorySlug: 'yatay-bisikletler',
    image: '2023/11/infraslimmer.jpg',
    description: [HORIZONTAL_BIKE('Infraslimmer')],
    features: ['Dokunmatik ekran', COLOR_CABIN, 'Aroma teknolojisi', 'Vakum', 'IR infrared (ısı)', 'Renk teknolojisi', 'Hava iyonizasyonu'],
  },
  {
    slug: 'activcouch',
    name: 'Activcouch',
    categorySlug: 'masaj-koltuklari',
    image: '2023/11/activcouch.jpg',
    description: [MASSAGE_BED('Activcouch')],
    features: MASSAGE_FEATURES,
  },
  {
    slug: 'couchslimmer',
    name: 'Couchslimmer',
    categorySlug: 'masaj-koltuklari',
    image: '2023/11/couchslimmer.jpg',
    description: [MASSAGE_BED('Couchslimmer')],
    features: MASSAGE_FEATURES,
  },
  {
    slug: 'activshape',
    name: 'Activshape',
    categorySlug: 'sicak-pilates',
    image: '2023/11/activshape.jpg',
    description: [
      'Infrared pilates kapsülü, vücudu güçlendirmek ve şekillendirmek için tasarlanmış bir egzersiz ve fiziksel hareket yöntemi sunar. Bu egzersiz 100°F / 36,6°C dereceye kadar ısıtılmış bir kapsülde vücudun esnemesine, vücut duruşunuzu daha aktif bir şekilde düzeltmenize yardımcı olur.',
      'Dünyanın en büyük yenilikçi fitness ve medikal cihaz üreticilerinden biri olan Vacu Activ, 36,6°C / 100°F vücut sıcaklığına kadar ısıtılan pilates kapsülü ve sıcak yoga egzersizi ile vücut şeklini geliştiren benzersiz bir ekipmanı sunuyor.',
    ],
    features: ['Dokunmatik ekran', 'Dış kabin istenilen renklerde üretilebilir', 'Ağırlık halatları', 'Tutma kolları', 'İleri ve geri hareket edebilen alt masa', 'Ozon teknolojisi', 'Kromaterapi', 'Infrared (ısı)'],
  },
  {
    slug: 'emfit-plus-neo',
    name: 'Emfit Plus Neo',
    categorySlug: 'bolgesel-incelme-cihazlari',
    image: '2023/11/emfit-plus-neo.jpg',
    description: ['Emfit Plus Neo hakkında detaylı bilgi almak için ekibimizle iletişime geçin.'],
    features: [],
  },
]

export const devices: Device[] = deviceInputs.map(d => ({
  ...d,
  image: d.image.startsWith('local:') ? LOCAL_DEVICES + d.image.slice(6) : UPLOADS + d.image,
  category: categories.find(c => c.slug === d.categorySlug)!.name,
}))

export const devicePath = (d: Device) => `/cihazlar/${d.slug}`
export const byName = (name: string) => devices.find(d => d.name === name)!
export const bySlug = (slug: string | undefined) => devices.find(d => d.slug === slug)

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

export const ABOUT_PAGE = [
  '2015 yılında İstanbul’da “İncelmede Devrim” vizyonuyla yolculuğuna başlayan Slimwell Group; bugün profesyonel güzellik, dermokozmetik, wellness ve cilt bakım teknolojilerinde yenilikçi çözümler sunan çok markalı, uluslararası bir organizasyondur.',
  'Türkiye’nin 81 ilinde 9.000’i aşkın iş ortağına ulaşan ve 60’tan fazla ülkeyle ticaret yürüten grubumuz; Slimwell, Ventura Medikal ve California merkezli VABODY Corporation’ın uzmanlıklarını aynı çatı altında bir araya getirmektedir. Uluslararası büyüme vizyonumuz doğrultusunda VacuActiv ortaklığıyla Los Angeles’ta hayata geçirilen VABODY Corporation; ABD, Kanada ve Latin Amerika operasyonlarımızın merkezi konumundadır.',
  'Ürün tedarikinden marka yönetimine, eğitimden teknik servise kadar uçtan uca bütünleşik hizmet sunan Slimwell Group, hem yerli inovasyonun öncüsü hem de dünya devlerinin güvenilir iş ortağıdır. Kore’nin üstün ürün anlayışını lipozom teknolojisiyle buluşturan Playskin markamızla pazarda yeni bir çağ açarken; vücut bakımında “Çatlakta Devrim” mottosuyla ezber bozan Protocol Stria markamızla standartları yeniden tanımlıyoruz. Özgün AR-GE markalarımızla sektörde fark yaratırken; Casmara, Ericson Laboratoire ve WishPro gibi estetik kozmetiğin küresel liderlerinin Türkiye distribütörlüğünü üstlenerek gelişmiş bakım teknolojilerini ülkemizle buluşturuyoruz.',
  'Slimwell Group’u farklılaştıran temel yetkinlik, bu geniş portföyü bilimsel bir metodolojiye dayalı olarak yönetme kabiliyetidir. Grubumuzun en değerli varlığı ise kurumsal bilgi birikimimizin temeli olan 65’i aşkın uzman çalışma arkadaşımızdır. Sürekli öğrenmeyi destekleyen kurum kültürümüzle organizasyonumuzun geleceğini birlikte inşa ediyoruz. İstanbul’dan dünyaya açılan Slimwell Group, gücünü insan kaynağından ve sahadaki deneyiminden alarak sektörde kalıcı değer üretmeye devam etmektedir.',
]

export const faqs = [
  {
    q: 'Cihazlar hakkında eğitim alabiliyor muyum?',
    a: 'Elbette, cihazlarımızı mümkün olan en iyi şekilde kullanabilmeniz için kapsamlı bir eğitim programı sunuyoruz. Biologlarımız tarafından detaylı bir şekilde sunulan eğitimlerimizin ardından, katılımcılarımız sınavlara tabi tutularak cihaz kullanım diplomasını almaya hak kazanmaktadır.',
  },
  {
    q: 'Cihazların garanti süresi ne kadar?',
    a: 'Slimwell Group tarafından satılan tüm cihazlar, malzeme ve işçilik hatalarına karşı 2 yıl garanti süresi ile birlikte gelir. Bu süre zarfında herhangi bir teknik arıza veya malzeme hatası durumunda, cihazınızı ücretsiz olarak onarıyoruz ya da değiştiriyoruz. Müşteri memnuniyeti bizler için çok önemlidir ve sizi her aşamada desteklemek için buradayız.',
  },
  {
    q: 'Satın alacağım cihazın rengini seçebilir miyim?',
    a: 'Evet, Slimwell Group olarak müşterilerimize kişiselleştirilmiş bir hizmet sunuyoruz. Satın alacağınız bölgesel zayıflama cihazlarının renkleri konusunda birkaç farklı seçenek sunuyoruz. İstediğiniz rengi seçebilir ve cihazınızı kişisel zevkinize uygun hale getirebilirsiniz.',
  },
  {
    q: 'Teknik arızalar sonucunda ne kadar sürede yardım alabilirim?',
    a: 'Türkiye genelinde teknik servis problemlerine hızlı çözümler sunabilmek adına her bölgede uzman teknik ekibimiz bulunmaktadır. Cihaz problemlerine en geç 48 saat içinde müdahale etme taahhüdümüzle, sizlere kesintisiz ve hızlı bir servis deneyimi sunuyoruz.',
  },
  {
    q: 'Cihazların üretim merkezi neresidir?',
    a: 'Cihazlarımız Polonya’daki fabrikamızda size özel üretilmektedir. Avrupa Birliği onaylı olup, İtalya, Fransa, Polonya ortak yapımıdır. Cihazlarımız “CE” onaylıdır.',
  },
  {
    q: 'Kurulum ve montaj süreçleri nasıl?',
    a: 'Cihaz alımı kararı aldıktan sonra, sözleşmemiz bir hafta içinde size ulaştırılmaktadır. Sözleşmeniz tarafımıza ulaştıktan sonra ise cihazınız, 1 ila 4 hafta içerisinde sevkiyatı gerçekleştirilmektedir.',
  },
  {
    q: 'Kurulum ve montajda ödeme yapılıyor mu?',
    a: 'Slimwell Group olarak, siz değerli müşterilerimize nakliye, kurulum ve eğitim gibi hizmetlerimizi ücretsiz sunuyoruz.',
  },
]

// Sorted newest first
export const fairs = [
  { date: '30 Mayıs – 2 Haziran 2024', title: 'Acıbadem Üniversitesi 13. Ulusal Sağlıklı Yaşam Kongresi' },
  { date: '7-10 Mart 2024', title: '36. Güzellik ve Bakım Fuarı' },
  { date: '27-29 Eylül 2023', title: '4. Beauty İstanbul Fuarı' },
  { date: '27-30 Nisan 2023', title: '35. Güzellik ve Bakım Fuarı' },
  { date: '13-15 Ekim 2022', title: '3. Beauty İstanbul Fuarı' },
  { date: '17-20 Mart 2022', title: '34. Güzellik ve Bakım Fuarı' },
  { date: '5-8 Mart 2020', title: '32. Güzellik ve Bakım Fuarı' },
]

const BLOG = 'https://www.slimwell.com.tr/'
export const blogPosts: { title: string; url: string }[] = [
  ['Elektrikli Kriyoterapi ile Nitrojenli Kriyoterapi Arasındaki Farklar: İşletmeler İçin Hangisi Daha Avantajlı?', 'elektrikli-kriyoterapi-ile-nitrojenli-kriyoterapi-arasindaki-farklar-isletmeler-icin-hangisi-daha-avantajli'],
  ['Yeni Nesil Biyohacking ve Yenilenme Teknolojisi: Cryo Q One Nedir?', 'cryo-q-one'],
  ['Soğuk Teknolojisinde Yeni Bir Dönem: Slimwell Cryo ile Tanışın', 'slimwell-cryo-teknolojisi'],
  ['Slimwell Profesyonel Cihazları Hangi Sektörlerde Kullanılabilir?', 'slimwell-profesyonel-cihazlari-hangi-sektorlerde-kullanilabilir'],
  ['Güzellik Merkezi İçin Cihaz Alırken Nelere Dikkat Edilmeli? 2026 Cihaz Seçim Rehberi', 'guzellik-merkezi-icin-cihaz-alirken-nelere-dikkat-edilmeli-2026-cihaz-secim-rehberi'],
  ['Güzellik ve Zayıflama Merkezlerinde Vakumlu Yürüyüş Bandı Yatırımı Neden Tercih Ediliyor?', 'vakumlu-yuruyus-bandi-yatirimi-slimwell'],
  ['Vakumlu Koşu Yürüyüş Bandı Nedir? İşletmeler İçin Yeni Nesil Wellness Teknolojisi', 'vakumlu-kosu-yuruyus-bandi-nedir-isletmeler-icin-yeni-nesil-wellness-teknolojisi'],
  ['VacuActiv ile Klasik Kardiyo Arasındaki Farklar', 'vacuactiv-ile-klasik-kardiyo-arasindaki-farklar'],
  ['Güzellik Merkezleri ve Wellness İşletmeleri Neden Slimwell’i Tercih Ediyor?', 'guzellik-merkezleri-ve-wellness-isletmeleri-neden-slimwelli-tercih-ediyor'],
  ['VacuActiv Nedir? Vakumlu Yürüyüş Bandı ile Bölgesel İncelme Rehberi', 'vacu-activ-nedir-vakumlu-yuruyus-bandi'],
  ['300.000 Yıllık İnsan Evrimi ve Modern Dünya’da Hareketsizlik: Slimwell’in Sunduğu Teknolojiler Neden Bu Kadar Önemli?', 'modern-dunyada-hareketsizlik'],
  ['Slimwell Cihazları ile Farklılaşmanızı Sağlayan 5 Faktör', 'slimwell-cihazlari-ile-farklilasmanizi-saglayan-5-faktor'],
  ['Türkiye’de Sağlık Sektöründe Yatırım Avantajları', 'turkiyede-saglik-sektorunde-yatirim-avantajlari'],
  ['Vücut Yaşı Nasıl Hesaplanır?', 'vucut-yasi-nasil-hesaplanir'],
  ['Dermokozmetik Devi Casmara’nın Türkiye Distribütörü Slimwell', 'dermokozmetik-devi-casmaranin-turkiye-distributoru-slimwell'],
  ['Göbek Bölgesi Yağlanmalarından Nasıl Kurtulabiliriz?', 'gobek-bolgesi-yaglanmalarindan-nasil-kurtulabiliriz'],
  ['Yağ Yakımını Hızlandıran 12 Besin', 'yag-yakimini-hizlandiran-12-besin'],
  ['Kereviz Tipi Vücut İçin Beslenme ve Egzersizleri', 'kereviz-tipi-vucut-icin-beslenme-ve-egzersiz-onerileri'],
  ['Kum Saati Vücut Tipi İçin Beslenme ve Egzersizler', 'kum-saati-vucut-tipi-icin-beslenme-ve-egzersiz-onerileri'],
  ['Armut Tipi Vücut İçin Beslenme ve Egzersizler', 'armut-tipi-vucut-icin-beslenme-ve-egzersiz-onerileri'],
  ['Elma Tipi Vücut İçin Beslenme ve Egzersiz Önerileri', 'elma-tipi-vucut-icin-beslenme-ve-egzersiz-onerileri'],
  ['Kan Gruplarına Göre Beslenme Önerileri', 'kan-gruplarina-gore-beslenme-onerileri'],
  ['Denizden ve Güneşten Yıpranan Saçlar İçin Bakım Önerileri', 'denizden-ve-gunesten-yipranan-saclar-icin-bakim-onerileri'],
  ['Ramazan Ayında ve Bayramda Alınan Kilolar Nasıl Verilir?', 'ramazan-ayinda-ve-bayramda-alinan-kilolar-nasil-verilir'],
  ['Yüz İçin Farklı Özelliklerde Güneş Kremleri', 'yuz-icin-farkli-ozelliklerde-gunes-kremleri'],
  ['Düz Bir Karın İçin Dikkat Etmeniz Gereken 5 Nokta', 'duz-bir-karin-icin-dikkat-etmeniz-gereken-5-nokta'],
  ['Protein Deposu 3 Farklı Smoothie Tarifi', 'protein-deposu-3-farkli-smoothie-tarifi'],
  ['Ramazan Ayında Kilo Almamak İçin İftardan Sonra Yürüyüş', 'ramazan-ayinda-kilo-almamak-icin-iftardan-sonra-yuruyus'],
  ['Sağlıklı Bir Ramazan İçin İftar ve Sahur Önerileri', 'saglikli-bir-ramazan-icin-iftar-ve-sahur-onerileri'],
  ['Sağlıklı Yaşam İçin Yeşil Çayın Faydaları', 'saglikli-yasamin-vazgecilmezi-yesil-cayin-faydalari'],
  ['Tüm Kötülükleri Vücudumuzdan Atan Detoks Çayının Faydaları', 'tum-kotulukleri-vucudumuzdan-atan-detoks-cayinin-faydalari'],
  ['Daha Sıkı ve Çekici Bacaklar İçin 5 Egzersiz', 'daha-siki-ve-cekici-bacaklar-icin-5-egzersiz'],
  ['Yüzümüzü Güldüren Güneşin Faydaları', 'yuzumuzu-gulduren-gunesin-yuzumuzu-gulduren-faydalari'],
  ['Selülite Dair Gerekli Bilgiler ve Selülit Uygulaması', 'selulite-dair-gerekli-bilgiler-ve-selulit-uygulamasi'],
  ['Su İçmek İçin Vücudumuzun İhtiyaç Duyduğu Milyonlarca Neden Var', 'su-icmek-icin-vucudumuzun-ihtiyac-duydugu-milyonlarca-neden-var'],
  ['Sağlıklı ve Zinde Kalmanın 5 Yolu', 'saglikli-ve-zinde-kalmanin-5-yolu'],
  ['Yaza İnce Girmenin İpuçları', 'yaza-ince-girmenin-ipuclari'],
  ['Yo-Yo Sendromu: Verdiğim Kiloları Geri Aldım', 'yo-yo-sendromu-verdigim-kilolari-geri-aldim'],
  ['Kışın Kilo Almamak İçin Neler Yapmalı, Nasıl Beslenmeli?', 'kisin-kilo-almamak-icin-neler-yapmali-nasil-beslenmeli'],
  ['Vücut Tipinize Göre Egzersiz Önerileri', 'vucut-tipinize-gore-egzersiz-onerileri'],
  ['Masajın Vücudumuza Faydaları Nelerdir?', 'masajin-vucudumuza-faydalari-nelerdir'],
  ['Aromaterapi Nedir?', 'aromaterapi-nedir'],
  ['Kromoterapi ile Gelen Sağlık', 'kromoterapi-ile-gelen-saglik'],
  ['Selülitlerinizin İyileşmesinde Yardımcı', 'selulitlerinize-elveda-demek-icin-slimwell'],
  ['Sağlıklı ve Fit Kalmak İçin Beslenme ve Slimwell', 'saglikli-ve-fit-kalmak-icin-beslenme-ve-slimwell'],
  ['Daha Sağlıklı Bir Hayat İçin Slimwell', 'daha-saglikli-bir-hayat-icin-slimwell'],
].map(([title, slug]) => ({ title, url: `${BLOG}${slug}/` }))

export const privacySections: { title: string; paragraphs: string[]; list?: string[] }[] = [
  {
    title: 'Gizlilik Politikası',
    paragraphs: [
      'İşbu Gizlilik ve Kişisel Verilerin Korunması Politikası, Slimwell App (bundan böyle kısaca “Slimwell App” olarak anılacaktır) olarak içerik sağlayıcısı ve veri sorumlusu olduğumuz internet sitemiz ve uygulamamız (bundan böyle kısaca “Site” olarak anılacaktır) ve sair yollar üzerinden hangi kişisel verilerin ne şekilde toplandığı, kullanıldığı, kimlerle paylaşılabileceği, Kullanıcıların hangi haklara sahip oldukları, bunları ne şekilde kullanabilecekleri ve çerezler hakkında bilgi vermek amacıyla hazırlanmıştır.',
    ],
  },
  {
    title: 'Kullanıcı Tanımı',
    paragraphs: [
      'İnternet Sitemizi ziyaret eden, kullanan, üye olan, erişen, yorum, bilgi, görüntü, video, resim, fotoğraf gibi içerik gönderen kişi ve kuruluşlar (bundan böyle “Kullanıcı” olarak anılacaktır) işbu Gizlilik ve Kişisel Verilerin Korunması Politikası’nda yer alan tüm şartları kabul etmiş bulunmaktadır.',
      'Şirketin, işbu Gizlilik ve Kişisel Verilerin Korunması Politikası’nda yapacağı değişiklikler ve güncellemeler İnternet Sitemizde yayınlandığı andan itibaren geçerlilik kazanmış sayılır. Bu nedenle, İnternet Sitemiz ziyaret edilmeden önce işbu Gizlilik ve Kişisel Verilerin Korunması Politikası’nın Kullanıcı tarafından gözden geçirilmesi ve yapılan değişiklik ve/veya düzeltmelerin Kullanıcı tarafından dikkate alınmasını öneririz.',
    ],
  },
  {
    title: 'Kişisel Verilerin Toplanması',
    paragraphs: [
      '1.1. İnternet Sitemizi görüntülemek ve ziyaret etmek için Kullanıcının kişisel verilerini paylaşması gerekmemektedir. Ancak, Kullanıcı, İnternet Sitemizin sunduğu özellikler ve hizmetlerden herhangi birine katılmak, yararlanmak veya bunları kullanmak isterse, bu durumda kendisinden çeşitli kişisel ve/veya demografik veriler sağlanması talep edilebilecektir.',
      '1.2. İşbu Politikada kullanılan kişisel veriler terimi; ad-soyad, e-posta adresi, telefon numarası, doğum tarihi, yaş, cinsiyet, kart bilgileri ve Kullanıcının sosyal medya hesaplarıyla bağlanması durumunda mezkûr hesaplar aracılığıyla paylaşılmasına onay verdiği bilgiler dâhil olmak üzere ancak bunlarla sınırlı olmamak kaydıyla Kullanıcıyı doğrudan veya dolaylı olarak tanımlamaya yönelik verileri ifade etmektedir.',
      '1.3. Site, Google Analytics gibi çeşitli üçüncü kişi ya da kuruluşların takip sistemlerini kullanır. Google Analytics kullanıcıların bilgisayarından topladığı bilgileri (IP adresi dahil) istatistiksel amaçlarla Amerika’daki Google sunucusuna aktarır ve bilgiler burada saklanır. Toplanan bilgiler sitemizde bulunan kullanıcıların yapmış olduğu tercihleri değerlendirmek, müşteri profili belirlemek, istatistiksel çalışmalar yapmak, sitemizin aktivite raporlarını düzenlemek ve site hizmetlerini geliştirmek amacıyla kullanılır.',
      '1.4. Kullanıcının, Şirket’e ilettiği kişisel veriler, aşağıda belirtilen amaçlar çerçevesinde işlenecek olup, hiçbir durumda öngörülen amacın dışında kullanılmayacaktır. Rezervasyon ve İletişim formu gibi kaynaklardan alınan kişisel veriler; daha iyi hizmet sağlamak, soruları cevaplamak, müşteri hizmeti sunmak, üyelik hesabı oluşturmak, hizmetleri iyileştirmek, mevzuattan doğan yükümlülükleri yerine getirmek ve istatistikî çalışmalar yapmak gibi amaçlarla işlenebilmektedir.',
      '1.5. Kullanıcıya ait kişisel veriler ile gezinme, trafik bilgileri ve IP adresi; güvenlik ve yasal yükümlülükler kapsamında, yetkili makamlardan usulüne uygun talep gelmesi halinde ilgili kurum ve kuruluşlar ile paylaşılacaktır.',
      '1.6. – 1.7. Kullanıcıya ait kişisel veriler; Slimwell App veya Slimwell App adına veri işleyen gerçek ya da tüzel kişiler tarafından; iletişim formları, sosyal ağlar, internet sitesi, mobil uygulamalar, elektronik posta, başvuru formları, bültenler vb. araçlarla toplanabilecektir. Kullanıcı tarafından verilen bilgilerin doğru ve eksiksiz olması Kullanıcının sorumluluğundadır. Yanlış veya eksik bilgi verildiği takdirde Slimwell App’ın sorumluluğu olmayıp, zarar tazmini Kullanıcıya aittir.',
    ],
  },
  {
    title: 'Kişisel Verilerin Aktarılması',
    paragraphs: [
      'Kullanıcıya ait kişisel veriler, yukarıda sayılan amaçlar dâhilinde, yürürlükte olan mevzuata uygun olarak, Slimwell App’ın iştirakleri ve bağlı şirketleri ile paylaşılabileceği gibi; iş ortaklarımıza, ifa yardımcılarımıza ve alt yüklenicilerimiz ile sunduğumuz hizmetin amacı doğrultusunda ya da düzenleyici kurumlara ve resmi mercilere yurt içinde ve/veya yurt dışına aktarılabilecektir. Kullanıcı, kişisel verilerinin bu şekilde aktarılmasına onay verdiğini kabul ve beyan etmektedir.',
    ],
  },
  {
    title: 'Kişisel Veri Sahibinin Hakları',
    paragraphs: ['Kişisel Verilerin Korunması Kanunu ve yürürlükteki diğer mevzuat kapsamında Kullanıcı;'],
    list: [
      'Kişisel verilerinin işlenip işlenmediğini öğrenme,',
      'Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,',
      'Kişisel verilerin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,',
      'Kişisel verilerin aktarıldığı üçüncü kişileri bilme,',
      'Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme,',
      'İşlenmesini gerektiren sebeplerin ortadan kalkması hâlinde verilerin silinmesini, yok edilmesini veya anonim hale getirilmesini isteme,',
      'Otomatik sistemler vasıtasıyla analiz sonucu aleyhine bir sonuç çıkmasına itiraz etme,',
      'Kanuna aykırı işlenme sebebiyle zararın giderilmesini talep etme haklarına sahiptir.',
    ],
  },
  {
    title: 'Başvuru',
    paragraphs: [
      'Kullanıcı bu haklarını; ıslak imzalı dilekçeyi Slimwell App’ın “İçerenköy Mah. Karaman Çiftlik Yolu Cad, İçerenköy, Karakum Sk. No:2, 34750 Ataşehir/İstanbul” adresine iadeli taahhütlü posta ile göndererek veya Kişisel Verileri Koruma Kurulu’nun duyuracağı yönteme uygun olarak kullanabilir. Başvuruda talebin açık ve anlaşılır olması, kimlik ve adres bilgilerine yer verilmesi ve kimliği tevsik eden belgelerin eklenmesi gerekmektedir.',
      `Kişisel bilgilerini ve iletişim tercihlerini güncellemek isteyen Kullanıcı, taleplerini ${EMAIL} adresine e-posta ile iletebilir. Talepler en kısa sürede değerlendirilir.`,
    ],
  },
  {
    title: 'Çerez (Cookie) Kullanımı',
    paragraphs: [
      '4.1. Sitemizde kullanımı kolaylaştırmak ve özelleştirmek amacıyla çerezler kullanılmaktadır. Çerezler, tarayıcı tarafından cihaza yerleştirilen küçük metin dosyalarıdır. Kullandığımız çerezler kişisel veri saklamaz, anonimdir.',
      '4.2. Kullanıcı tarayıcıyı çerezleri reddedecek şekilde ayarlayabilir; ancak çerezler kabul edilmediğinde sitenin tüm özelliklerine erişim mümkün olmayabilir. Çerez ayarlarını değiştirmediği sürece Kullanıcı çerez kullanımına onay vermiş kabul edilir.',
    ],
  },
  {
    title: 'Ticari İletiler',
    paragraphs: [
      '5.1. Kullanıcının kişisel verilerinin tanıtım, promosyon, reklam, pazarlama ve benzeri elektronik iletişim amaçlı toplanmasına, işlenmesine ve üçüncü kişilere aktarılmasına izin verdiği kabul edilecektir.',
      '5.2. – 5.3. Bülten veya ticari ileti almak istemeyen Kullanıcı üye olurken bu yönde talep belirtmemelidir. Slimwell App e-bülten’e üye olan Kullanıcılara gönderilen e-postalarda bildirimleri almama seçeneği sunulmaktadır.',
    ],
  },
]
