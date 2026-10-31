import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import {
  MapPin, Phone, CalendarCheck, Calculator, FileText, Download, ChevronRight, ChevronLeft, X, Play, Navigation, ArrowUpRight, Check,
  Waves, Trees, Dumbbell, Baby, Sun, Droplets, Building2, Trophy, PartyPopper, Footprints, Armchair, Theater, Sparkles, Sofa, Maximize2,
} from 'lucide-react'
import { projects, PHONE, PHONE_DISPLAY, statusLabel } from '../data/projects'
import { Link } from '../lib/router'
import { openEnquiry } from '../components/EnquiryModal'
import EnquiryForm from '../components/EnquiryForm'
import { Magnetic, ProjectCard } from '../components/blocks'
import { Reveal, SectionHeading, ease, scrollToId, Price } from '../components/ui'

const ICONS = [
  [/pool/i, Waves], [/landscap|garden|lawn/i, Trees], [/fitness|gym/i, Dumbbell], [/kid|child/i, Baby], [/solar/i, Sun], [/rain/i, Droplets],
  [/club|lounge/i, Sofa], [/court|cricket|sport/i, Trophy], [/celebration|party/i, PartyPopper], [/jog|walk/i, Footprints],
  [/senior/i, Armchair], [/amphi/i, Theater], [/recreation/i, Building2],
]
const LAST_MD = { 1: 'md:col-span-4', 2: 'md:col-span-3', 3: 'md:col-span-2' }
function galleryClass(k, n) {
  if (k === 0) return 'col-span-2 row-span-2'
  if (k !== n - 1) return ''
  return `${(n - 1) % 2 ? 'col-span-2' : ''} ${LAST_MD[(n - 1) % 4] || ''}`
}
const iconFor = (a) => ICONS.find(([re]) => re.test(a))?.[1] || Sparkles

const projectFilms = (p) => p.films || (p.video ? [{ src: p.video, poster: p.poster, label: 'Site Walkthrough' }] : [])
const sectionsFor = (p) => [
  ['overview', 'Overview'],
  p.units.length && ['residences', 'Residences'],
  ['gallery', 'Gallery'],
  projectFilms(p).length && ['film', 'Film'],
  (p.amenities.length || p.specs) && ['amenities', p.amenities.length ? 'Amenities' : 'Specifications'],
  ['location', 'Location'],
  ['enquire', 'Enquire'],
].filter(Boolean)

function Lightbox({ images, index, onClose, setIndex }) {
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [images.length, onClose, setIndex])
  return (
    <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <AnimatePresence mode="wait">
        <motion.img key={index} src={images[index]} alt={`Gallery image ${index + 1}`} onClick={(e) => e.stopPropagation()} className="max-h-[86svh] max-w-full object-contain" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} />
      </AnimatePresence>
      <button onClick={onClose} className="absolute right-4 top-4 grid h-12 w-12 place-items-center bg-white/10 text-white hover:bg-gold" aria-label="Close gallery"><X size={20} /></button>
      <button onClick={(e) => { e.stopPropagation(); setIndex((i) => (i - 1 + images.length) % images.length) }} className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/10 text-white hover:bg-gold" aria-label="Previous image"><ChevronLeft /></button>
      <button onClick={(e) => { e.stopPropagation(); setIndex((i) => (i + 1) % images.length) }} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/10 text-white hover:bg-gold" aria-label="Next image"><ChevronRight /></button>
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/60">{index + 1} / {images.length}</span>
    </motion.div>
  )
}

export default function ProjectDetail({ id }) {
  const p = projects.find((x) => x.id === id)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const [lb, setLb] = useState(null)
  const [playing, setPlaying] = useState(null)
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' })
    sectionsFor(p).forEach(([t]) => { const el = document.getElementById(t); if (el) obs.observe(el) })
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const tabs = sectionsFor(p)
  const films = projectFilms(p)
  const others = [...projects.filter((x) => x.id !== id && x.status === p.status), ...projects.filter((x) => x.status !== p.status)].slice(0, 3)
  const enquire = (intent) => openEnquiry({ project: p.id, intent })
  const words = p.name.split(' ')

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-ink pb-14 pt-32">
        <motion.img style={{ y }} src={p.image} alt={`${p.name}, ${p.location}`} className="absolute inset-0 h-[125%] w-full object-cover" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2.6, ease }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />
        <motion.div style={{ opacity: fade }} className="container-lux relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
              <Link to="home" className="hover:text-champagne">Home</Link><ChevronRight size={12} />
              <Link to="projects" className="hover:text-champagne">Projects</Link><ChevronRight size={12} />
              <span className="text-champagne">{p.name}</span>
            </motion.nav>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8, ease }} className="mb-5 flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white ${p.status === 'ready' ? 'bg-emerald-700' : p.status === 'upcoming' ? 'bg-[#2B4A6B]' : 'bg-white/15 backdrop-blur'}`}>{statusLabel(p.status)}</span>
              {p.badge && p.badge !== statusLabel(p.status) && <span className="bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white">{p.badge}</span>}
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-champagne"><MapPin size={13} /> {p.location}</span>
            </motion.div>
            <h1 className="text-[3.4rem] font-light leading-[0.95] text-white sm:text-7xl lg:text-[7rem]">
              {words.map((w, k) => (
                <span key={w + k} className="mr-[0.22em] inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span className={`inline-block ${k === words.length - 1 ? 'italic text-champagne' : ''}`} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.45 + k * 0.12, ease }}>{w}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8, ease }} className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{p.tagline}</motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Magnetic><button onClick={() => enquire('Site Visit')} className="btn-gold w-full sm:w-auto"><CalendarCheck size={16} /><span>Book a Site Visit</span></button></Magnetic>
              <button onClick={() => enquire('Cost Sheet')} className="btn-outline border-white/40 text-white hover:border-white hover:bg-white hover:text-ink"><Calculator size={16} /> Get Cost Sheet</button>
              {p.brochure && <a href={p.brochure} target="_blank" rel="noopener noreferrer" download className="btn-outline border-white/40 text-white hover:border-gold hover:bg-gold"><Download size={16} /> Brochure</a>}
              {films.length > 0 && <button onClick={() => setPlaying(films[0])} className="btn-outline border-transparent text-champagne hover:text-white sm:px-3"><Play size={16} className="fill-current" /> Watch Film</button>}
            </motion.div>
          </div>
          {/* price card */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: 0.9, ease }} className="border border-white/15 bg-ink/50 p-6 backdrop-blur-md lg:col-span-4">
            <span className="eyebrow !text-champagne">{p.priceFrom ? 'Starting from' : 'Pricing'}</span>
            <div className="mt-2 font-serif text-5xl text-white">{p.priceFrom ? <Price value={p.priceFrom} /> : 'On Request'}</div>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-white">
              <div><div className="text-[10px] uppercase tracking-[0.18em] text-white/50">Homes</div><div className="mt-1 text-sm font-semibold">{p.config}</div></div>
              <div><div className="text-[10px] uppercase tracking-[0.18em] text-white/50">{p.towersShort ? 'Building' : 'Status'}</div><div className="mt-1 text-sm font-semibold">{p.towersShort || statusLabel(p.status)}</div></div>
            </div>
            {p.offer && <p className="mt-5 flex items-center gap-2 bg-gold/20 px-3 py-2 text-[12px] font-semibold text-champagne"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" /> {p.offer}</p>}
            <a href={`tel:${PHONE}`} className="mt-5 flex items-center gap-2 text-sm font-semibold text-white hover:text-champagne"><Phone size={15} className="text-gold" /> {PHONE_DISPLAY}</a>
          </motion.div>
        </motion.div>
      </section>

      {/* STICKY SUB-NAV */}
      <div className="sticky top-[68px] z-30 border-b border-ink/10 bg-ivory/95 backdrop-blur-md">
        <div className="container-lux flex items-center justify-between gap-4">
          <div className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
            {tabs.map(([t, l]) => (
              <button key={t} onClick={() => scrollToId(t)} className={`relative shrink-0 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${active === t ? 'text-ink' : 'text-charcoal/55 hover:text-ink'}`}>
                {l}
                {active === t && <motion.span layoutId="ptab" className="absolute inset-x-3 bottom-0 h-0.5 bg-gold" />}
              </button>
            ))}
          </div>
          <button onClick={() => enquire('Site Visit')} className="btn-gold hidden shrink-0 !px-5 !py-2.5 md:inline-flex"><span>Enquire</span></button>
        </div>
      </div>

      {/* OVERVIEW */}
      <section id="overview" className="scroll-mt-32 bg-ivory py-16 sm:py-20">
        <div className="container-lux grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={`${p.number} · Overview`} title={<>{p.name.split(' ')[0]} <em className="text-gold">{p.name.split(' ').slice(1).join(' ')}</em></>} intro={p.tagline} />
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
              {p.brochure ? (
                <a href={p.brochure} target="_blank" rel="noopener noreferrer" download className="btn-gold"><Download size={15} /><span>Download Brochure</span></a>
              ) : (
                <button onClick={() => enquire('Brochure')} className="btn-outline border-ink text-ink hover:bg-ink hover:text-white"><FileText size={15} /> Request Brochure</button>
              )}
            </Reveal>
          </div>
          <div className="grid grid-cols-2 self-start border-l border-t border-ink/10 lg:col-span-7">
            {[...p.highlights.map((h) => [h.label, h.value]), ...p.facts.filter(([k]) => !/towers|offer|spread/i.test(k))].map(([k, v], i) => (
              <motion.div key={k + i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.7, ease }} className="group border-b border-r border-ink/10 bg-ivory p-6 transition-colors duration-500 hover:bg-white sm:p-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal/55">{k}</div>
                <div className="mt-2 font-serif text-2xl leading-tight text-ink sm:text-3xl">{v}</div>
                <span className="mt-4 block h-px w-6 bg-gold transition-all duration-500 group-hover:w-12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESIDENCES */}
      {p.units.length > 0 && <section id="residences" className="scroll-mt-32 bg-ink py-16 text-ivory sm:py-20">
        <div className="container-lux">
          <SectionHeading dark eyebrow="Residences & Pricing" title={<>Choose your <em className="text-champagne">home.</em></>} />
          <div className={`mt-14 grid gap-6 ${p.units.length > 1 ? 'md:grid-cols-2' : 'md:max-w-xl'}`}>
            {p.units.map((u, k) => (
              <motion.div key={u.type} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.12, duration: 0.9, ease }}
                className="group relative overflow-hidden border border-white/10 p-8 transition-colors duration-500 hover:border-gold sm:p-10">
                <span className="absolute -right-4 -top-8 font-serif text-[10rem] leading-none text-white/[0.04] transition-colors duration-700 group-hover:text-gold/10">{u.type.split(' ')[0]}</span>
                <span className="eyebrow">Residence</span>
                <h3 className="mt-3 text-5xl text-ivory">{u.type}</h3>
                <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 text-ivory/75"><Maximize2 size={16} className="text-gold" /> {u.area}</div>
                  <div className="font-serif text-3xl text-champagne">{u.price}</div>
                </div>
                <button onClick={() => enquire('Cost Sheet')} className="btn-gold mt-8 w-full"><Calculator size={15} /><span>Get Cost Sheet</span></button>
              </motion.div>
            ))}
          </div>
          {p.offer && (
            <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 border border-gold/40 bg-gold/10 p-6 sm:flex-row sm:items-center sm:p-8">
              <div><span className="eyebrow">Current offer</span><p className="mt-2 font-serif text-3xl text-ivory">{p.offer}</p></div>
              <button onClick={() => enquire('Callback')} className="btn-outline shrink-0 border-gold text-champagne hover:bg-gold hover:text-white">Ask about this offer</button>
            </Reveal>
          )}
          <p className="mt-6 text-[11px] text-ivory/40">*Prices, offers and payment plans are indicative and subject to change. Terms &amp; conditions apply.</p>
        </div>
      </section>}

      {/* GALLERY */}
      <section id="gallery" className="scroll-mt-32 bg-ivory py-16 sm:py-20">
        <div className="container-lux">
          <SectionHeading eyebrow="Gallery" title={<>A closer <em className="text-gold">look.</em></>} />
          <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] md:grid-cols-4">
            {p.gallery.map((g, k) => (
              <motion.button key={k} onClick={() => setLb(k)} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: (k % 4) * 0.07, duration: 0.8, ease }}
                className={`group relative overflow-hidden bg-mist ${galleryClass(k, p.gallery.length)}`} aria-label={`Open image ${k + 1}`}>
                <img src={g} alt={`${p.name} gallery ${k + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition-all duration-500 group-hover:bg-ink/40 group-hover:opacity-100"><Maximize2 size={24} /></span>
              </motion.button>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-charcoal/50">Images are artistic impressions and stills from the project film.</p>
        </div>
      </section>

      {/* FILM */}
      {films.length > 0 && <section id="film" className="scroll-mt-32 bg-mist py-16 sm:py-20">
        <div className="container-lux grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={films.length > 1 ? 'Walkthrough Films' : 'Walkthrough Film'} title={<>See it <em className="text-gold">on site.</em></>} intro={`Take a guided walk through ${p.name}, filmed on location.`} />
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setPlaying(films[0])} className="btn-gold"><Play size={15} className="fill-current" /><span>Play Film</span></button>
              <button onClick={() => enquire('Site Visit')} className="btn-outline border-ink text-ink hover:bg-ink hover:text-white">Visit in Person</button>
            </Reveal>
          </div>
          <div className={`mx-auto grid w-full gap-4 ${films.length > 1 ? 'max-w-[560px] grid-cols-2' : 'max-w-[340px]'}`}>
            {films.map((f, k) => (
              <Reveal key={f.src} delay={k * 0.1}>
                <button onClick={() => setPlaying(f)} className="group relative block aspect-[9/16] w-full overflow-hidden bg-ink shadow-2xl" aria-label={`Play ${f.label}`}>
                  <img src={f.poster} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-white sm:h-20 sm:w-20">
                    <span className="absolute inset-0 animate-ping rounded-full bg-gold/50" />
                    <Play size={24} className="relative ml-1 fill-current" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-4 text-left font-serif text-xl text-white sm:text-2xl">{f.label}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>}

      {/* AMENITIES */}
      {(p.amenities.length > 0 || p.specs) && <section id="amenities" className="scroll-mt-32 bg-ivory py-16 sm:py-20">
        <div className="container-lux">
          {p.amenities.length > 0 && <SectionHeading align="center" eyebrow="Amenities" title={<>Life <em className="text-gold">within.</em></>} />}
          {p.amenities.length > 0 && <div className="mt-14 grid grid-cols-2 border-l border-t border-ink/10 sm:grid-cols-3 lg:grid-cols-4">
            {p.amenities.map((a, k) => {
              const I = iconFor(a)
              return (
                <motion.div key={a} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (k % 4) * 0.07, duration: 0.7, ease }} className="group flex flex-col items-start gap-5 border-b border-r border-ink/10 bg-ivory p-6 transition-colors duration-500 hover:bg-ink sm:p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-gold group-hover:text-white"><I size={20} strokeWidth={1.4} /></span>
                  <span className="font-serif text-xl leading-tight text-ink transition-colors group-hover:text-ivory sm:text-2xl">{a}</span>
                </motion.div>
              )
            })}
          </div>}
          {p.specs && (
            <div className={p.amenities.length ? 'mt-16' : ''}>
              <Reveal className="mb-8 flex items-center gap-4"><span className="gold-line" /><span className="eyebrow">{p.specsTitle || 'Specifications'}</span></Reveal>
              <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {p.specs.map((t, k) => (
                  <motion.li key={t} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: (k % 4) * 0.06, duration: 0.6, ease }}
                    className="flex items-start gap-3 border-b border-ink/10 pb-4 text-[15px] text-charcoal">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15"><Check size={13} className="text-gold" /></span> {t}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>}

      {/* LOCATION */}
      <section id="location" className="scroll-mt-32 bg-charcoal py-16 text-ivory sm:py-20">
        <div className="container-lux grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading dark eyebrow="Location & Connectivity" title={<>{p.location.split(',')[0]}, <em className="text-champagne">connected.</em></>} />
            {p.connectivity.length ? (
              <ul className="mt-10 space-y-5">
                {p.connectivity.map((c, k) => (
                  <motion.li key={c.place} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.1, duration: 0.7, ease }} className="flex items-center gap-5 border-b border-white/10 pb-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/50 text-gold"><Navigation size={16} /></span>
                    <span className="flex-1"><span className="block font-serif text-3xl text-ivory">{c.time}</span><span className="text-sm text-ivory/60">to {c.place}</span></span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <Reveal><p className="mt-8 max-w-md text-[15px] leading-relaxed text-ivory/70">Located in {p.location}. Ask our team for detailed connectivity information and directions to the experience centre.</p></Reveal>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => enquire('Site Visit')} className="btn-gold"><span>Get Directions &amp; Visit</span></button>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.mapQuery || p.location)}`} target="_blank" rel="noopener noreferrer" className="btn-outline border-white/25 text-ivory hover:border-gold hover:text-gold">View Area on Map <ArrowUpRight size={14} /></a>
            </div>
            <p className="mt-4 text-[11px] text-ivory/40">Travel times and distances are approximate.</p>
          </div>
          <Reveal className="relative">
            <img src={p.secondary || p.image} alt={`${p.name} surroundings`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute -bottom-5 -left-3 flex items-center gap-3 bg-gold px-5 py-4 text-white shadow-xl sm:-left-6">
              <MapPin size={20} /><span><span className="block text-[10px] uppercase tracking-[0.2em] text-white/80">Address area</span><span className="font-serif text-xl">{p.location}</span></span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ENQUIRE */}
      <section id="enquire" className="scroll-mt-32 bg-mist py-16 sm:py-20">
        <div className="container-lux grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Enquire" title={<>Interested in <em className="text-gold">{p.name}?</em></>} intro="Share your details for pricing, the cost sheet, current offers or a site visit." />
            <Reveal delay={0.2} className="mt-8 space-y-3">
              {['Detailed cost sheet & floor plans', 'Current offers & payment plans', 'Guided site visit with our team'].map((t) => (
                <p key={t} className="flex items-center gap-3 text-[15px] text-charcoal"><Check size={16} className="text-gold" /> {t}</p>
              ))}
              <a href={`tel:${PHONE}`} className="mt-6 inline-flex items-center gap-3 font-serif text-3xl text-ink hover:text-gold"><Phone size={20} className="text-gold" /> {PHONE_DISPLAY}</a>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative bg-white p-6 shadow-[0_40px_80px_-40px_rgba(17,17,17,0.25)] sm:p-10">
              <span className="absolute left-0 top-0 h-1 w-24 bg-gold" />
              <EnquiryForm idPrefix={`p-${p.id}`} defaultProject={p.id} title="Book your site visit" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* OTHER PROJECTS */}
      <section className="bg-ivory py-16 sm:py-20">
        <div className="container-lux">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="More from Sara Infra" title={<>Other <em className="text-gold">projects</em></>} />
            <Link to="projects" className="link-underline text-[12px] font-semibold uppercase tracking-[0.18em] text-ink">All projects</Link>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, k) => <ProjectCard key={o.id} p={o} index={k} />)}
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ink/10 bg-ivory md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <a href={`tel:${PHONE}`} className="flex items-center justify-center gap-2 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink"><Phone size={16} className="text-gold" /> Call</a>
        <button onClick={() => enquire('Site Visit')} className="flex items-center justify-center gap-2 bg-gold py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white"><CalendarCheck size={16} /> Book Visit</button>
      </div>

      <AnimatePresence>{lb !== null && <Lightbox images={p.gallery} index={lb} setIndex={setLb} onClose={() => setLb(null)} />}</AnimatePresence>
      <AnimatePresence>
        {playing && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-ink/95 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPlaying(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.5, ease }} className="relative" onClick={(e) => e.stopPropagation()}>
              <video key={playing.src} src={playing.src} poster={playing.poster} controls autoPlay playsInline className="max-h-[86svh] max-w-[92vw] bg-black object-contain" />
              <button onClick={() => setPlaying(null)} className="absolute right-2 top-2 grid h-11 w-11 place-items-center bg-ink/70 text-white hover:bg-gold" aria-label="Close video"><X size={20} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}