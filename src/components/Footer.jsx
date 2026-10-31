import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Phone, MapPin } from 'lucide-react'
import logoLight from '../assets/logo-light.png'
import { projects, PHONE, PHONE_DISPLAY, FACEBOOK, INSTAGRAM } from '../data/projects'
import { Facebook, Instagram } from './ui'
import { Link } from '../lib/router'
import { openEnquiry } from './EnquiryModal'

const YEAR = new Date().getFullYear()
const nav = [['home', 'Home'], ['about', 'About Us'], ['projects', 'Projects'], ['lifestyle', 'Lifestyle'], ['contact', 'Contact']]

export default function Footer() {
  return (
    <footer className="relative bg-ink pt-20 text-ivory/70">
      <div className="container-lux">
        <div className="grid gap-12 border-b border-white/10 pb-16 text-center md:grid-cols-2 md:text-left lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src={logoLight} alt="SARA INFRA – Spaces That Matter" loading="lazy" className="mx-auto h-auto w-48 md:mx-0" />
            <p className="mx-auto mt-6 max-w-sm text-[15px] leading-relaxed sm:text-base md:mx-0">
              Sara Infra offers thoughtfully planned residential projects for people looking to make a home in Navi Mumbai and its growing neighbourhoods.
            </p>
            <div className="mt-6 flex justify-center gap-3 md:justify-start">
              <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"><Facebook size={17} /></a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"><Instagram size={17} /></a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h4 className="eyebrow !text-[13px]">Explore</h4>
            <span className="mx-auto mt-3 block h-px w-8 bg-gold/60 md:mx-0" />
            <ul className="mt-6 space-y-3.5 text-base">
              {nav.map(([id, l]) => <li key={id}><Link to={id} className="link-underline transition-colors hover:text-ivory">{l}</Link></li>)}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h4 className="eyebrow !text-[13px]">Our Projects</h4>
            <span className="mx-auto mt-3 block h-px w-8 bg-gold/60 md:mx-0" />
            <ul className="mt-6 grid gap-x-6 gap-y-2.5 text-base sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              {projects.map((p) => (
                <li key={p.id}>
                  <Link to={p.id} className="group inline-block leading-tight">
                    <span className="block font-serif text-lg text-ivory transition-colors group-hover:text-champagne">{p.shortName || p.name}</span>
                    <span className="text-[12px] text-ivory/45">{p.area}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h4 className="eyebrow !text-[13px]">Get in touch</h4>
            <span className="mx-auto mt-3 block h-px w-8 bg-gold/60 md:mx-0" />
            <a href={`tel:${PHONE}`} className="mt-6 flex items-center justify-center gap-3 font-serif text-[1.7rem] md:justify-start text-ivory transition-colors hover:text-champagne"><Phone size={17} className="text-gold" /> {PHONE_DISPLAY}</a>
            <p className="mt-4 flex items-center justify-center gap-3 text-base md:justify-start"><MapPin size={16} className="text-gold" /> Panvel, Maharashtra</p>
            <button onClick={() => openEnquiry({ intent: 'Site Visit' })} className="btn-gold mt-8 !px-7 !py-3.5 !text-[13px]"><span>Book a Site Visit</span></button>
          </div>
        </div>
        <div className="pb-48 pt-6 text-center text-[11px] leading-relaxed text-ivory/40 md:pb-6 md:pr-24 md:text-left">
          {/* TODO(client): add MahaRERA registration numbers for each project here before going live. */}
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-ivory/65 sm:text-[15px] md:flex-row">
            <p>© {YEAR} SARA INFRA. All rights reserved.</p>
            <p>
              Designed &amp; Developed by{' '}
              <a href="https://www.advertisingandbrandingmarketing.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-champagne transition-colors hover:text-gold">
                Advertising Branding &amp; Marketing
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// WhatsApp number in international format (91 + 10-digit number). Change here if WhatsApp uses a different number.
const WHATSAPP = `91${PHONE}`
const WA_TEXT = 'Hi Sara Infra, I would like to know more about your projects.'

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.2-3.6.94.96-3.5-.23-.36a9.46 9.46 0 0 1-1.45-5.05c0-5.23 4.26-9.49 9.5-9.49a9.43 9.43 0 0 1 6.72 2.79 9.43 9.43 0 0 1 2.78 6.71c0 5.24-4.26 9.5-9.48 9.5m8.08-17.58A11.35 11.35 0 0 0 12.05.5C5.76.5.64 5.62.64 11.92c0 2.01.53 3.98 1.53 5.71L.54 23.5l6.01-1.58a11.38 11.38 0 0 0 5.45 1.39h.01c6.29 0 11.41-5.12 11.41-11.42 0-3.05-1.19-5.92-3.34-8.07" />
    </svg>
  )
}

/** Floating Call + WhatsApp buttons on every page (bottom-right), plus back-to-top after scrolling. */
export function FloatingActions({ raised = false }) {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 700)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const btn = 'group relative grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-110'
  const tip = 'pointer-events-none absolute right-[calc(100%+12px)] top-1/2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-sm bg-ink px-3 py-2 text-[12px] font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block'

  return (
    <div
      className={`fixed right-4 z-40 flex flex-col items-center gap-3 sm:right-6 ${raised ? 'bottom-20 md:bottom-6' : 'bottom-5 sm:bottom-6'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-ink text-champagne shadow-lg transition-all hover:-translate-y-1 hover:bg-gold hover:text-white"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_TEXT)}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Chat with Sara Infra on WhatsApp"
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, type: 'spring', stiffness: 160, damping: 14 }}
        className={`${btn} bg-[#25D366]`}
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.4s]" />
        <span className="relative"><WhatsAppIcon size={28} /></span>
        <span className={tip}>Chat on WhatsApp</span>
      </motion.a>

      <motion.a
        href={`tel:${PHONE}`}
        aria-label={`Call Sara Infra on ${PHONE_DISPLAY}`}
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.35, type: 'spring', stiffness: 160, damping: 14 }}
        className={`${btn} bg-gradient-to-br from-gold to-[#8C6A43]`}
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-gold/35 [animation-delay:1.2s] [animation-duration:2.4s]" />
        <motion.span className="relative" animate={{ rotate: [0, -14, 14, -10, 10, 0] }} transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 3 }}>
          <Phone size={24} />
        </motion.span>
        <span className={tip}>Call {PHONE_DISPLAY}</span>
      </motion.a>
    </div>
  )
}
