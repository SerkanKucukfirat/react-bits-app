import { Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout'
import About from '@/pages/About'
import Blog from '@/pages/Blog'
import Certificates from '@/pages/Certificates'
import Contact from '@/pages/Contact'
import DeviceDetail from '@/pages/DeviceDetail'
import Devices from '@/pages/Devices'
import Fairs from '@/pages/Fairs'
import Faq from '@/pages/Faq'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Partners from '@/pages/Partners'
import Privacy from '@/pages/Privacy'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cihazlar" element={<Devices />} />
        <Route path="cihazlar/:slug" element={<DeviceDetail />} />
        <Route path="hakkimizda" element={<About />} />
        <Route path="is-ortaklarimiz" element={<Partners />} />
        <Route path="fuarlarimiz" element={<Fairs />} />
        <Route path="sertifika-ve-belgelerimiz" element={<Certificates />} />
        <Route path="sik-sorulan-sorular" element={<Faq />} />
        <Route path="gizlilik-politikamiz" element={<Privacy />} />
        <Route path="blog" element={<Blog />} />
        <Route path="iletisim" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
