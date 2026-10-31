import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, User, Phone, ArrowRight, Loader2, Check, MapPin, Sparkles, FileText, BadgePercent, CalendarCheck } from 'lucide-react'
import { projects, PHONE, PHONE_DISPLAY } from '../data/projects'
import { submitEnquiry } from '../lib/enquiry'
import logoDark from '../assets/logo-dark.png'
import { ease } from './ui'

const DELAY_MS = 6000
const SNOOZE_HOURS = 24
const SLIDE_MS = 4000
const KEY = 'sara_lead_popup'
const clean = (s) => (s ? s.replace(/\*/g, '') : 'On Request')
const FEATURED_IDS = ['codename-upvan', 'project-element', 'gps-kewale', 'jprime-swastik', 'sai-mannat', 'omkar-aangan', 'jprime-sankalp']
const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean)

function shouldShow() {
  // While developing (npm run dev) always show it, so it can be tested on every reload.
  // Add ?popup to the URL to force it on the live site too.
  if (import.meta.env.DEV || window.location.search.includes('popup')) return true
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (!v) return true
    if (v.submitted) return false
    return Date.now() - v.closedAt > SNOOZE_HOURS * 3600 * 1000
  } catch { return true }
}
function remember(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)) } catch { /* storage blocked */ }
}

const perks = [
  { icon: FileText, t: 'Detailed cost sheet' },
  { icon: BadgePercent, t: 'Current offers & payment plans' },
  { icon: CalendarCheck, t: 'Priority site visit' },
]

/** Input with a label that floats up on focus / when filled. */
function FloatField({ id, label, icon: Icon, prefix, error, ...props }) {
  const [focus, setFocus] = useState(false)
  const up = focus || props.value
  return (
    <div>
      <div className={`relative flex items-center gap-3 rounded-sm border bg-white px-4 transition-all duration-300 ${error ? 'border-red-500' : focus ? 'border-gold shadow-[0_0_0_4px_rgba(181,138,82,0.15)]' : 'border-ink/10'}`}>
        <Icon size={18} className={`shrink-0 transition-colors ${focus ? 'text-gold' : 'text-charcoal/40'}`} />
        <div className="relative flex flex-1 items-center pt-5 pb-2">
          <label htmlFor={id} className={`pointer-events-none absolute left-0 transition-all duration-300 ${up ? 'top-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold' : 'top-1/2 -translate-y-1/2 text-[15px] text-charcoal/45'}`}>{label}</label>
          {prefix && up && <span className="mr-1.5 text-[15px] text-charcoal/60">{prefix}</span>}
          <input id={id} {...props} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className="w-full border-0 bg-transparent p-0 text-[15px] text-ink focus:outline-none focus:ring-0" aria-invalid={!!error} />
        </div>
        {!error && props.valid && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="grid h-5 w-5 place-items-center rounded-full bg-emerald-600"><Check size={12} className="text-white" /></motion.span>}
      </div>
      <AnimatePresence>{error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-[12px] text-red-600">{error}</motion.p>}</AnimatePresence>
    </div>
  )
}

/** Gold confetti burst for the success state. */
function Confetti() {
  const bits = Array.from({ length: 28 })
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((_, i) => {
        const angle = (i / bits.length) * Math.PI * 2
        const dist = 120 + (i % 5) * 30
        return (
          <motion.span key={i}
            className="absolute left-1/2 top-[38%] block h-2 w-1 rounded-sm"
            style={{ background: i % 3 === 0 ? '#B58A52' : i % 3 === 1 ? '#D9C5A5' : '#111111' }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist + 80, opacity: 0, rotate: 360 + i * 20 }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 0.1 }} />
        )
      })}
    </div>
  )
}

export default function LeadPopup() {
  const [open, setOpen] = useState(false)
  const [slide, setSlide] = useState(0)
  const [v, setV] = useState({ name: '', phone: '', project: 'codename-upvan' })
  const [err, setErr] = useState({})
  const [status, setStatus] = useState('idle')
  const [channel, setChannel] = useState(null)
  const timer = useRef(null)

  useEffect(() => {
    if (!shouldShow()) return
    const tryOpen = () => {
      if (document.body.style.overflow === 'hidden') { timer.current = setTimeout(tryOpen, 4000); return }
      setOpen(true)
    }
    timer.current = setTimeout(tryOpen, DELAY_MS)
    return () => clearTimeout(timer.current)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    const t = setInterval(() => setSlide((s) => (s + 1) % featured.length), SLIDE_MS)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); clearInterval(t) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const close = () => {
    setOpen(false)
    if (status !== 'success') remember({ closedAt: Date.now() })
  }

  const digits = v.phone.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '')
  const phoneOk = /^[6-9]\d{9}$/.test(digits)
  const nameOk = v.name.trim().length >= 2

  const submit = async (e) => {
    e.preventDefault()
    const er = {}
    if (!nameOk) er.name = 'Please enter your name.'
    if (!phoneOk) er.phone = 'Enter a valid 10-digit mobile number.'
    setErr(er)
    if (Object.keys(er).length) return
    setStatus('loading')
    try {
      const p = projects.find((x) => x.id === v.project)
      const r = await submitEnquiry({ name: v.name, phone: v.phone, email: '', message: '[Popup] Price & offers request', projectName: p?.name || 'General enquiry' })
      setChannel(r.channel)
      setStatus('success')
      remember({ submitted: true })
    } catch {
      setStatus('error')
    }
  }

  const p = featured[slide]
  const selected = projects.find((x) => x.id === v.project)
  const set = (k) => (e) => { setV((s) => ({ ...s, [k]: e.target.value })); setErr((x) => ({ ...x, [k]: undefined })) }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-end justify-center bg-ink/75 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          onClick={close}
        >
          {/* ambient gold glow behind the card */}
          <motion.div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-[140px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 140, opacity: 0, scale: 0.94, rotateX: 8 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ y: 90, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ transformPerspective: 1200 }}
            className="relative w-full max-w-[940px] sm:p-[2px]"
          >
            {/* animated gold border (desktop/tablet) */}
            <div aria-hidden className="absolute inset-0 hidden overflow-hidden sm:block">
              <div className="animate-spin-slow absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
                style={{ background: 'conic-gradient(from 0deg, transparent 0deg, #B58A52 60deg, #F3E3C3 90deg, #B58A52 120deg, transparent 180deg, transparent 240deg, #B58A52 300deg, transparent 360deg)' }} />
            </div>

            <div role="dialog" aria-modal="true" aria-labelledby="lead-title"
              className="relative grid max-h-[94svh] overflow-y-auto bg-ivory shadow-[0_60px_140px_-30px_rgba(0,0,0,0.7)] md:grid-cols-[1.05fr_1fr]">

              <button onClick={close} aria-label="Close" className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-ink/60 text-white backdrop-blur transition-all duration-300 hover:rotate-90 hover:bg-gold md:bg-ink">
                <X size={18} />
              </button>

              {/* LEFT – visual */}
              <div className="relative h-52 overflow-hidden bg-ink sm:h-60 md:h-auto md:min-h-[540px]">
                <AnimatePresence initial={false}>
                  <motion.img key={p.id} src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.18 }} animate={{ opacity: 1, scale: 1.02 }} exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 1.1 }, scale: { duration: SLIDE_MS / 1000 + 1, ease: 'linear' } }} />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5" />

                {/* logo curve – draws itself */}
                <svg aria-hidden viewBox="0 0 200 60" className="absolute -right-6 top-16 hidden w-64 opacity-70 md:block">
                  <motion.path d="M5 55 C 50 50, 80 8, 120 10 S 180 30, 195 40" fill="none" stroke="#D9C5A5" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 0.6, ease: 'easeInOut' }} />
                </svg>

                <motion.span initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, ease }}
                  className="absolute left-7 top-7 hidden items-center gap-1.5 bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-lg md:flex">
                  <Sparkles size={12} className="animate-pulse" /> Exclusive for website visitors
                </motion.span>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div key={p.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.55, ease }}>
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-champagne"><MapPin size={12} /> {p.location}</span>
                      <p className="mt-1 font-serif text-3xl leading-tight text-white md:text-[2.6rem]">{p.name}</p>
                      <div className="mt-2 flex items-end gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">{p.priceFrom ? 'Starting from' : 'Pricing'}</span>
                        <span className="font-serif text-2xl leading-none text-champagne md:text-3xl">{clean(p.priceFrom)}</span>
                      </div>
                      <span className="mt-2 hidden border border-white/25 px-2.5 py-1 text-[11px] text-white/80 sm:inline-block">{p.config}{p.towersShort ? ` · ${p.towersShort}` : ''}</span>
                    </motion.div>
                  </AnimatePresence>

                  {/* slide progress */}
                  <div className="mt-4 flex gap-1.5">
                    {featured.map((x, k) => (
                      <button key={x.id} onClick={() => setSlide(k)} aria-label={`Show ${x.name}`} className="relative h-1 w-8 overflow-hidden bg-white/25">
                        {k === slide && <motion.span key={slide} className="absolute inset-y-0 left-0 bg-gold" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }} />}
                        {k < slide && <span className="absolute inset-0 bg-gold/70" />}
                      </button>
                    ))}
                  </div>

                  <ul className="mt-5 hidden space-y-2 md:block">
                    {perks.map(({ icon: I, t }, k) => (
                      <motion.li key={t} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + k * 0.12, ease }}
                        className="flex items-center gap-3 text-[13px] text-white/90">
                        <span className="grid h-7 w-7 place-items-center rounded-full border border-gold/60 bg-gold/20 text-champagne backdrop-blur"><I size={13} /></span> {t}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT – form */}
              <div className="relative overflow-hidden p-6 sm:p-8 md:px-9 md:py-8">
                {/* soft corner ornament */}
                <svg aria-hidden viewBox="0 0 120 120" className="pointer-events-none absolute -right-10 -top-10 w-40 text-gold/10"><circle cx="60" cy="60" r="58" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="1" /></svg>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative flex h-full min-h-[400px] flex-col items-center justify-center text-center" role="status">
                      <Confetti />
                      <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                        className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold to-[#8C6A43] text-white shadow-xl">
                        <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
                        <Check size={38} strokeWidth={2.5} className="relative" />
                      </motion.span>
                      <h3 className="mt-6 text-4xl">Thank you, {v.name.trim().split(' ')[0]}!</h3>
                      <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-charcoal/75">
                        {channel === 'whatsapp'
                          ? `WhatsApp has opened with your request for ${selected?.name}. Tap send and our team will share the details.`
                          : `Our team will call you shortly with pricing and offers for ${selected?.name}.`}
                      </p>
                      <button onClick={() => setOpen(false)} className="btn-gold mt-8"><span>Continue Exploring</span></button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={submit} noValidate initial="hidden" animate="show" exit={{ opacity: 0 }} className="relative"
                      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}>
                      {[
                        <img key="logo" src={logoDark} alt="SARA INFRA" className="hidden h-10 w-auto md:block" />,
                        <div key="head" className="md:mt-5">
                          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-gold" /></span>
                            Limited-period pricing
                          </span>
                          <h2 id="lead-title" className="mt-2 text-[2rem] leading-[1.02] sm:text-[2.3rem]">
                            Get today's prices{' '}
                            <em className="text-shimmer whitespace-nowrap">&amp; offers</em>
                          </h2>
                          <p className="mt-3 text-[14px] leading-relaxed text-charcoal/70">Share your number and our team will send the cost sheet and current offers for your chosen project.</p>
                        </div>,
                        <fieldset key="proj" className="mt-5">
                          <legend className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">Choose a project</legend>
                          <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
                            {projects.map((x) => {
                              const on = v.project === x.id
                              return (
                                <motion.button type="button" key={x.id} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} onClick={() => setV((s) => ({ ...s, project: x.id }))} aria-pressed={on}
                                  className={`group relative w-[104px] shrink-0 snap-start overflow-hidden rounded-sm border-2 bg-white text-left transition-[border-color,box-shadow,opacity] duration-300 sm:w-[112px] ${on ? 'border-gold shadow-[0_12px_30px_-12px_rgba(181,138,82,0.7)]' : 'border-transparent opacity-75 hover:opacity-100'}`}>
                                  <img src={x.image} alt="" className="h-14 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-16" />
                                  <span className="block truncate px-1.5 pt-1.5 text-[10px] font-semibold leading-tight text-ink sm:text-[11px]">{x.shortName || x.name}</span>
                                  <span className="block truncate px-1.5 pb-1.5 text-[10px] text-gold-dark">{x.priceFrom ? clean(x.priceFrom) : x.config}</span>
                                  {on && <motion.span layoutId="leadpick" className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-gold shadow"><Check size={12} className="text-white" /></motion.span>}
                                </motion.button>
                              )
                            })}
                          </div>
                        </fieldset>,
                        <div key="name" className="mt-5">
                          <FloatField id="lp-name" label="Your name" icon={User} autoComplete="name" value={v.name} onChange={set('name')} error={err.name} valid={nameOk} />
                        </div>,
                        <div key="phone" className="mt-3">
                          <FloatField id="lp-phone" label="Mobile number" icon={Phone} prefix="+91" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={14} value={v.phone} onChange={set('phone')} error={err.phone} valid={phoneOk} />
                        </div>,
                        <div key="cta" className="mt-5">
                          {status === 'error' && <p className="mb-3 text-[13px] text-red-600" role="alert">Something went wrong. Please try again or call {PHONE_DISPLAY}.</p>}
                          <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} type="submit" disabled={status === 'loading'}
                            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-sm bg-gradient-to-r from-[#9A7342] via-gold to-[#C9A16B] px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_-14px_rgba(181,138,82,0.9)] disabled:opacity-70">
                            <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 animate-shine bg-white/30" />
                            {status === 'loading' ? <Loader2 size={17} className="relative animate-spin" /> : null}
                            <span className="relative">{status === 'loading' ? 'Sending…' : 'Get Price & Offers'}</span>
                            {status !== 'loading' && <ArrowRight size={17} className="relative transition-transform duration-300 group-hover:translate-x-1.5" />}
                          </motion.button>
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[12px] text-charcoal/60">
                            <a href={`tel:${PHONE}`} className="group flex items-center gap-2 font-semibold text-ink">
                              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-gold transition-colors group-hover:bg-gold group-hover:text-white"><Phone size={14} /></span>
                              {PHONE_DISPLAY}
                            </a>
                            <button type="button" onClick={close} className="underline-offset-4 hover:text-ink hover:underline">Maybe later</button>
                          </div>
                          <p className="mt-3 text-[11px] text-charcoal/45">Your details are shared only with the Sara Infra team.</p>
                        </div>,
                      ].map((child) => (
                        <motion.div key={child.key} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}>
                          {child}
                        </motion.div>
                      ))}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
