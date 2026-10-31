import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Phone } from 'lucide-react'
import { projects, PHONE, PHONE_DISPLAY, fromText } from '../data/projects'
import EnquiryForm from './EnquiryForm'
import { ease } from './ui'
import upvanNight from '../assets/upvan-night.webp'

/** Open the enquiry popup from anywhere: openEnquiry({ project: 'gps-kewale', intent: 'Cost Sheet' }) */
const TITLES = { 'Site Visit': 'Book a site visit', 'Cost Sheet': 'Request the cost sheet', Brochure: 'Request the brochure', Callback: 'Request a callback' }

export function openEnquiry(detail = {}) {
  window.dispatchEvent(new CustomEvent('sara:enquire', { detail }))
}

export default function EnquiryModal() {
  const [state, setState] = useState(null)

  useEffect(() => {
    const h = (e) => setState({ project: e.detail?.project || '', intent: e.detail?.intent || 'Site Visit' })
    window.addEventListener('sara:enquire', h)
    return () => window.removeEventListener('sara:enquire', h)
  }, [])

  useEffect(() => {
    if (!state) return
    const onKey = (e) => e.key === 'Escape' && setState(null)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [state])

  const p = projects.find((x) => x.id === state?.project)

  return (
    <AnimatePresence>
      {state && (
        <motion.div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/75 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setState(null)}>
          <motion.div
            role="dialog" aria-modal="true" aria-label="Enquiry form"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={{ duration: 0.55, ease }}
            className="relative grid max-h-[94svh] w-full max-w-5xl overflow-y-auto bg-white md:grid-cols-5"
          >
            <div className="relative hidden overflow-hidden md:col-span-2 md:block">
              <img src={p?.image || upvanNight} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <span className="eyebrow !text-champagne">{p ? p.location : 'Sara Infra'}</span>
                <p className="mt-2 font-serif text-4xl leading-tight">{p ? p.name : 'Find your home'}</p>
                {p && <p className="mt-2 text-sm text-white/75">{p.config} · {fromText(p)}</p>}
                <a href={`tel:${PHONE}`} className="mt-6 flex items-center gap-2 text-sm font-semibold text-champagne"><Phone size={15} /> {PHONE_DISPLAY}</a>
              </div>
            </div>
            <div className="relative p-6 sm:p-10 md:col-span-3">
              <button onClick={() => setState(null)} className="absolute right-3 top-3 grid h-11 w-11 place-items-center text-ink transition-colors hover:bg-ink hover:text-white" aria-label="Close enquiry form">
                <X size={20} />
              </button>
              <EnquiryForm idPrefix="m" defaultProject={state.project} defaultIntent={state.intent} title={TITLES[state.intent] || 'Book a site visit'} subtitle="Share your details and our team will reach out." />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
