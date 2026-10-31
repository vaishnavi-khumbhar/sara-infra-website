import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, ChevronDown, ArrowUpRight } from 'lucide-react'
import logoDark from '../assets/logo-dark.png'
import logoLight from '../assets/logo-light.png'
import { projects, PHONE, PHONE_DISPLAY, STATUSES, statusLabel } from '../data/projects'
import { Link, isProjectRoute } from '../lib/router'
import { openEnquiry } from './EnquiryModal'
import { ease } from './ui'

const links = [
  { to: 'home', label: 'Home' },
  { to: 'about', label: 'About Us' },
  { to: 'projects', label: 'Projects', dropdown: true },
  { to: 'lifestyle', label: 'Lifestyle' },
  { to: 'contact', label: 'Contact' },
]

export default function Navbar({ route }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])
  useEffect(() => { setOpen(false); setDrop(false) }, [route])

  const solid = scrolled || open
  const isActive = (to) => route === to || (to === 'projects' && isProjectRoute(route))

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'bg-ivory/95 shadow-[0_10px_40px_-20px_rgba(17,17,17,0.35)] backdrop-blur-md' : 'bg-transparent'}`}
      >
        <nav className={`container-lux flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-[68px]' : 'h-[84px]'}`} aria-label="Main">
          <Link to="home" className="relative h-11 w-[104px] shrink-0 sm:h-12 sm:w-[114px]" aria-label="SARA INFRA home">
            <img src={logoLight} alt="SARA INFRA" className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500 ${solid ? 'opacity-0' : 'opacity-100'}`} />
            <img src={logoDark} alt="" aria-hidden className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-500 ${solid ? 'opacity-100' : 'opacity-0'}`} />
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <li key={l.to} className="relative" onMouseEnter={() => l.dropdown && setDrop(true)} onMouseLeave={() => l.dropdown && setDrop(false)}>
                <Link
                  to={l.to}
                  className={`link-underline flex items-center gap-1 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors ${isActive(l.to) ? 'active' : ''} ${
                    solid ? (isActive(l.to) ? 'text-ink' : 'text-charcoal/70 hover:text-ink') : isActive(l.to) ? 'text-white' : 'text-white/75 hover:text-white'
                  }`}
                >
                  {l.label} {l.dropdown && <ChevronDown size={13} className={`transition-transform ${drop ? 'rotate-180' : ''}`} />}
                </Link>
                {l.dropdown && (
                  <AnimatePresence>
                    {drop && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.3, ease }} className="absolute left-1/2 top-full w-[860px] -translate-x-1/2 pt-3">
                        <div className="grid grid-cols-[1.6fr_1fr] gap-6 bg-white p-6 shadow-2xl">
                          {[STATUSES[0], { id: 'more', label: 'Upcoming & Ready to Move' }].map((s) => (
                            <div key={s.id}>
                              <span className="eyebrow !text-[10px]">{s.label}</span>
                              <div className={`mt-3 grid gap-1 ${s.id === 'more' ? '' : 'grid-cols-2'}`}>
                                {projects.filter((p) => (s.id === 'more' ? p.status !== STATUSES[0].id : p.status === s.id)).map((p) => (
                                  <Link key={p.id} to={p.id} className="group flex items-center gap-3 p-1.5 transition-colors hover:bg-mist">
                                    <span className="h-12 w-14 shrink-0 overflow-hidden"><img src={p.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /></span>
                                    <span className="min-w-0">
                                      <span className="block truncate font-serif text-[17px] leading-tight text-ink group-hover:text-gold-dark">{p.name}</span>
                                      <span className="block truncate text-[11px] text-charcoal/55">{p.area} · {p.status === STATUSES[0].id ? p.config : statusLabel(p.status)}</span>
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <Link to="projects" className="flex items-center justify-between bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-gold">View all {projects.length} projects <span>→</span></Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href={`tel:${PHONE}`} className={`hidden items-center gap-2 text-[13px] font-medium xl:flex ${solid ? 'text-ink' : 'text-white'}`}>
              <Phone size={15} className="text-gold" /> {PHONE_DISPLAY}
            </a>
            <button onClick={() => openEnquiry({ intent: 'Site Visit' })} className="btn-gold hidden !px-6 !py-3 sm:inline-flex"><span>Enquire Now</span></button>
            <button onClick={() => setOpen((o) => !o)} className={`grid h-11 w-11 place-items-center lg:hidden ${solid ? 'text-ink' : 'text-white'}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ivory px-6 pb-8 pt-24 lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <motion.li key={l.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease }}>
                  <Link to={l.to} onClick={() => setOpen(false)} className="flex w-full items-baseline gap-4 border-b border-ink/10 py-3.5">
                    <span className="font-sans text-[11px] text-gold">0{i + 1}</span>
                    <span className={`font-serif text-[2rem] ${isActive(l.to) ? 'italic text-gold' : 'text-ink'}`}>{l.label}</span>
                  </Link>
                  {l.dropdown && (
                    <div className="flex gap-2 overflow-x-auto py-3">
                      {projects.map((p) => (
                        <Link key={p.id} to={p.id} onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-2 border border-ink/10 py-1.5 pl-1.5 pr-3">
                          <img src={p.image} alt="" className="h-9 w-9 object-cover" />
                          <span className="text-[12px] font-semibold text-ink">{p.name}</span>
                          <ArrowUpRight size={13} className="text-gold" />
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-auto flex flex-col gap-3 pt-6">
              <button onClick={() => { setOpen(false); openEnquiry({ intent: 'Site Visit' }) }} className="btn-gold w-full"><span>Book a Site Visit</span></button>
              <a href={`tel:${PHONE}`} className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-ink"><Phone size={16} className="text-gold" /> {PHONE_DISPLAY}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
