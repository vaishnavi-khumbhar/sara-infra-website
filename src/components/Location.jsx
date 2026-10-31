import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Navigation, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { SectionHeading, ease } from './ui'
import { openEnquiry } from './EnquiryModal'


export default function Location() {
  const [active, setActive] = useState(0)
  const p = projects[active]

  return (
    <section id="location" className="grain relative overflow-hidden bg-charcoal py-16 text-ivory sm:py-20 lg:py-24">
      {/* map-inspired backdrop */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden>
        <defs>
          <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M56 0H0V56" fill="none" stroke="#D9C5A5" strokeWidth=".6" /></pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path d="M-50 420 C 200 300, 420 520, 700 380 S 1200 200, 1600 320" stroke="#B58A52" strokeWidth="2" fill="none" />
        <path d="M100 900 C 300 640, 600 700, 820 520 S 1300 420, 1700 560" stroke="#D9C5A5" strokeWidth="1.2" fill="none" />
      </svg>

      <div className="container-lux relative">
        <SectionHeading dark eyebrow="Location & Connectivity" title={<>Where you'll <em className="text-champagne">belong.</em></>} intro="Projects across New Panvel, Upper Kharghar, Ulwe and Pushpak Nagar. Select a project to see its connectivity." />

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label="Project locations" className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:max-h-[560px] lg:flex-col lg:overflow-y-auto lg:pr-2">
            {projects.map((pr, k) => (
              <button
                key={pr.id}
                role="tab"
                aria-selected={active === k}
                onClick={() => setActive(k)}
                className={`group relative shrink-0 border px-4 py-3 text-left transition-all duration-500 ${active === k ? 'border-gold bg-ink' : 'border-white/10 hover:border-white/30'}`}
              >
                <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold"><MapPin size={12} /> {pr.location}</span>
                <span className="mt-1 block whitespace-nowrap font-serif text-xl text-ivory lg:text-2xl">{pr.name}</span>
                {active === k && <motion.span layoutId="locbar" className="absolute bottom-0 left-0 top-0 hidden w-0.5 bg-gold lg:block" />}
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }} className="grid overflow-hidden border border-white/10 bg-ink md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <img src={p.image} alt={`${p.name} in ${p.location}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="absolute bottom-4 left-4 flex items-center gap-2 bg-ink/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-champagne backdrop-blur"><MapPin size={13} /> {p.location}</span>
                </div>
                <div className="p-7 sm:p-10">
                  <span className="eyebrow">Connectivity</span>
                  <h3 className="mt-3 text-3xl text-ivory sm:text-4xl">{p.name}</h3>
                  {p.connectivity.length ? (
                    <ul className="mt-8 space-y-5">
                      {p.connectivity.map((c, k) => (
                        <motion.li key={c.place} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + k * 0.08, ease }} className="flex items-start gap-4 border-b border-white/10 pb-5">
                          <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 text-gold"><Navigation size={14} /></span>
                          <span className="flex-1">
                            <span className="block font-serif text-2xl text-ivory">{c.time}</span>
                            <span className="text-sm text-ivory/60">to {c.place}</span>
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-8 text-[15px] leading-relaxed text-ivory/65">
                      Located in {p.location}. Ask our team for detailed connectivity information and directions to the experience centre.
                    </p>
                  )}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button onClick={() => openEnquiry({ project: p.id, intent: 'Site Visit' })} className="btn-gold !px-5 !py-3"><span>Plan a Site Visit</span></button>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.mapQuery || p.location)}`} target="_blank" rel="noopener noreferrer" className="btn-outline !px-5 !py-3 border-white/25 text-ivory hover:border-gold hover:text-gold">
                      View Area <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <p className="mt-4 text-[11px] text-ivory/40">Travel times and distances are approximate and depend on route and traffic.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
