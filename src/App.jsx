import { useEffect } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer, { FloatingActions } from './components/Footer'
import EnquiryModal from './components/EnquiryModal'
import LeadPopup from './components/LeadPopup'
import Home from './pages/Home'
import AboutPage from './pages/About'
import ProjectsPage from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import LifestylePage from './pages/Lifestyle'
import ContactPage from './pages/Contact'
import { useRoute, isProjectRoute } from './lib/router'
import { projects } from './data/projects'
import logoLight from './assets/logo-light.png'
import { ease } from './components/ui'

const TITLES = {
  home: 'SARA INFRA | Spaces That Matter – Homes in Panvel & Upper Kharghar',
  about: 'About Us | SARA INFRA',
  projects: 'Our Projects | SARA INFRA',
  lifestyle: 'Lifestyle & Amenities | SARA INFRA',
  contact: 'Contact & Enquiry | SARA INFRA',
}

function Page({ route }) {
  if (isProjectRoute(route)) return <ProjectDetail id={route} />
  switch (route) {
    case 'about': return <AboutPage />
    case 'projects': return <ProjectsPage />
    case 'lifestyle': return <LifestylePage />
    case 'contact': return <ContactPage />
    default: return <Home />
  }
}

/** Gold-and-ink curtain that sweeps across between pages. */
function Curtain() {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-ink"
        initial={{ clipPath: 'inset(0 0 0 0)' }}
        animate={{ clipPath: 'inset(0 0 100% 0)' }}
        exit={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 0.6, ease }}
      >
        <motion.img src={logoLight} alt="" className="w-40 sm:w-52" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -20 }} exit={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[89] bg-gold"
        initial={{ clipPath: 'inset(0 0 0 0)' }}
        animate={{ clipPath: 'inset(0 0 100% 0)' }}
        exit={{ clipPath: 'inset(100% 0 0 0)' }}
        transition={{ duration: 0.75, ease, delay: 0.05 }}
      />
    </>
  )
}

export default function App() {
  const route = useRoute()

  useEffect(() => {
    const p = projects.find((x) => x.id === route)
    document.title = p ? `${p.name}, ${p.location} | ${p.config} | SARA INFRA` : TITLES[route] || TITLES.home
  }, [route])

  const projectPage = isProjectRoute(route)

  return (
    <MotionConfig reducedMotion="user">
      <Navbar route={route} />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div key={route} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1, transition: { duration: 0.6 } }}>
          <Curtain />
          <main className={projectPage ? 'pb-14 md:pb-0' : ''}>
            <Page route={route} />
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
      <FloatingActions raised={projectPage} />
      <EnquiryModal />
      <LeadPopup />
    </MotionConfig>
  )
}
