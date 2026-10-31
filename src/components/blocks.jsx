import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin, Phone, CalendarCheck, ChevronRight, BadgePercent } from 'lucide-react'
import { Link } from '../lib/router'
import { PHONE, PHONE_DISPLAY, statusLabel, priceOrRequest } from '../data/projects'
import { openEnquiry } from './EnquiryModal'
import { ease } from './ui'

/** Inner-page banner with breadcrumb, parallax image and animated title. */
export function PageHero({ eyebrow, title, intro, image, crumbs = [], children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  return (
    <section ref={ref} className="grain relative flex min-h-[72svh] items-end overflow-hidden bg-ink pb-16 pt-36 sm:pb-20">
      <motion.img style={{ y }} src={image} alt="" className="absolute inset-0 h-[120%] w-full object-cover" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
      <div className="container-lux relative">
        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
          <Link to="home" className="hover:text-champagne">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight size={12} />
              {c.to ? <Link to={c.to} className="hover:text-champagne">{c.label}</Link> : <span className="text-champagne">{c.label}</span>}
            </span>
          ))}
        </motion.nav>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8, ease }} className="mb-5 flex items-center gap-4">
          <span className="gold-line" /><span className="eyebrow !text-champagne">{eyebrow}</span>
        </motion.div>
        <h1 className="max-w-4xl overflow-hidden text-5xl font-light leading-[1.02] text-white sm:text-6xl lg:text-[5.2rem]">
          <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.45, ease }}>{title}</motion.span>
        </h1>
        {intro && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8, ease }} className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{intro}</motion.p>
        )}
        {children && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease }}>{children}</motion.div>}
      </div>
    </section>
  )
}

/** Big dark CTA band reused across pages. */
export function CtaBanner({ title = <>Your new address is <em className="text-champagne">one visit away.</em></>, text = 'See the sample flats, walk the site and get current pricing and offers from our team.', project = '', image }) {
  return (
    <section className="relative overflow-hidden border-y border-white/30 bg-ink py-20 sm:py-28">
      {image && <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      <motion.div aria-hidden className="absolute -left-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-gold/20 blur-[120px]" animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="container-lux relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="max-w-2xl">
          <div className="mb-5 flex items-center gap-4"><span className="gold-line" /><span className="eyebrow">Schedule a visit</span></div>
          <h2 className="text-4xl leading-tight text-ivory sm:text-5xl lg:text-6xl">{title}</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ivory/65 sm:text-base">{text}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15, ease }} className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Magnetic>
            <button onClick={() => openEnquiry({ project, intent: 'Site Visit' })} className="btn-gold group w-full">
              <CalendarCheck size={16} /><span>Book a Site Visit</span>
            </button>
          </Magnetic>
          <a href={`tel:${PHONE}`} className="btn-outline border-white/30 text-ivory hover:border-gold hover:bg-gold hover:text-white">
            <Phone size={16} /> {PHONE_DISPLAY}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/** Gentle magnetic hover for primary CTAs (pointer devices only). */
export function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className="inline-block"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

/** Count-up number that animates once in view. Non-numeric values render as-is. */
export function Counter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.8, ease, onUpdate: setN })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref}>{prefix}{n.toFixed(decimals)}{suffix}</span>
}

/** Project card used on Home, Projects and "other projects". Whole card links to the project page. */
export function ProjectCard({ p, index = 0, tall = false }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay: index * 0.12, ease }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        style={{ rotateX: srx, rotateY: sry }}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = ref.current.getBoundingClientRect()
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 6)
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6)
        }}
        onPointerLeave={() => { rx.set(0); ry.set(0) }}
        className="group relative bg-white shadow-[0_30px_60px_-35px_rgba(17,17,17,0.35)]"
      >
        <Link to={p.id} className="block" aria-label={`View ${p.name}`}>
          <div className={`relative overflow-hidden ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
            <img src={p.image} alt={`${p.name}, ${p.location}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <span className="absolute left-5 top-5 font-serif text-5xl text-white/90">{p.number}</span>
            <div className="absolute right-4 top-4 flex flex-col items-end gap-1.5">
              <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur ${p.status === 'ready' ? 'bg-emerald-700/90' : p.status === 'upcoming' ? 'bg-[#2B4A6B]/90' : 'bg-ink/70'}`}>{statusLabel(p.status)}</span>
              {p.badge && p.badge !== statusLabel(p.status) && <span className="animate-pulse bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">{p.badge}</span>}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-champagne"><MapPin size={12} /> {p.location}</span>
              <h3 className="mt-1.5 text-3xl text-white sm:text-4xl">{p.name}</h3>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-ink/10 border-b border-ink/10 text-center">
            {[['Homes', p.config], ['Building', p.towersShort || '—'], ['From', priceOrRequest(p)]].map(([k, v]) => (
              <div key={k} className="px-2 py-4">
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-charcoal/50">{k}</div>
                <div className="mt-1 text-[13px] font-semibold leading-tight text-ink sm:text-sm">{v}</div>
              </div>
            ))}
          </div>
          {p.offer && (
            <div className="flex items-center gap-2 border-b border-ink/10 bg-champagne/25 px-4 py-2.5 text-[12px] font-semibold text-ink">
              <BadgePercent size={15} className="shrink-0 text-gold" /> <span className="line-clamp-1">{p.offer}</span>
            </div>
          )}
        </Link>
        <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
          <Link to={p.id} className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink">
            <span className="link-underline">View Project</span>
            <ArrowRight size={14} className="text-gold transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
          <button onClick={() => openEnquiry({ project: p.id, intent: 'Cost Sheet' })} className="flex items-center gap-1.5 bg-ink px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-gold">
            Cost Sheet <ArrowUpRight size={13} />
          </button>
        </div>
      </motion.div>
    </motion.article>
  )
}
