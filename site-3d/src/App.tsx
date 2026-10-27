import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import {
  AboutPage,
  BlogPage,
  BrandsPage,
  CertificatesPage,
  ContactPage,
  FairsPage,
  FaqPage,
  PartnersPage,
  PrivacyPage,
} from './pages/Corporate'
import DeviceDetail from './pages/DeviceDetail'
import Devices from './pages/Devices'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// The 3D site is served from <base>/3d/; strip the trailing slash for the router
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cihazlar" element={<Devices />} />
          <Route path="cihazlar/:slug" element={<DeviceDetail />} />
          <Route path="markalar" element={<BrandsPage />} />
          <Route path="hakkimizda" element={<AboutPage />} />
          <Route path="is-ortaklarimiz" element={<PartnersPage />} />
          <Route path="fuarlarimiz" element={<FairsPage />} />
          <Route path="sertifika-ve-belgelerimiz" element={<CertificatesPage />} />
          <Route path="sik-sorulan-sorular" element={<FaqPage />} />
          <Route path="gizlilik-politikamiz" element={<PrivacyPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="iletisim" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
