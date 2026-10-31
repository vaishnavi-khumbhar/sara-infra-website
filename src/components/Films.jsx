import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, X, Volume2 } from 'lucide-react'
import { films as allFilms } from '../data/projects'

// The 5 films shown in this section (in this order). Edit this list to swap films.
const SHOWCASE = ['videos/upvan.mp4', 'videos/element.mp4', 'videos/kewale.mp4', 'videos/saimannat-sample.mp4', 'videos/omkar-1bhk.mp4']
const films = SHOWCASE.map((src) => allFilms.find((f) => f.src === src)).filter(Boolean)
import { Reveal, SectionHeading, ease } from './ui'

function FilmCard({ f, onPlay, index }) {
  const p = f.project
  const ref = useRef(null)
  const preview = () => { const v = ref.current; if (v && window.matchMedia('(hover: hover)').matches) { v.muted = true; v.play().catch(() => {}) } }
  const stop = () => { const v = ref.current; if (v) { v.pause(); v.currentTime = 0 } }
  return (
    <Reveal delay={(index % 4) * 0.1} className={index % 2 === 1 ? 'lg:mt-12' : ''}>
      <button
        onClick={() => onPlay(f)}
        onMouseEnter={preview}
        onMouseLeave={stop}
        className="group relative block aspect-[9/16] w-full overflow-hidden bg-charcoal"
        aria-label={`Play ${p.name} – ${f.label}`}
      >
        <video ref={ref} src={f.src} poster={f.poster} muted playsInline loop preload="none" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-ink/30 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold">
          <Play size={24} className="ml-1 fill-current" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5 text-left">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">{p.location}</span>
          <span className="mt-1.5 block font-serif text-2xl leading-tight text-white sm:text-[1.7rem]">{p.shortName || p.name}</span>
          <span className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/65"><Volume2 size={13} /> {f.label}</span>
        </div>
      </button>
    </Reveal>
  )
}

export default function Films() {
  const [playing, setPlaying] = useState(null)
  useEffect(() => {
    if (!playing) return
    const onKey = (e) => e.key === 'Escape' && setPlaying(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [playing])

  return (
    <section id="films" className="grain relative overflow-hidden bg-ink py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="container-lux relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading dark eyebrow="Walkthrough Films" title={<>See the homes <em className="text-champagne">before you visit.</em></>} />
          </div>
          <Reveal delay={0.2} className="lg:col-span-5">
            <p className="text-[15px] leading-relaxed text-ivory/65">Step inside the sample flats, experience centres and amenities of Sara Infra projects, filmed on site.</p>
          </Reveal>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {films.map((f, k) => <FilmCard key={f.src} f={f} index={k} onPlay={setPlaying} />)}
        </div>
      </div>

      <AnimatePresence>
        {playing && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-ink/95 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPlaying(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.5, ease }} className="relative" onClick={(e) => e.stopPropagation()}>
              <video key={playing.src} src={playing.src} poster={playing.poster} controls autoPlay playsInline className="max-h-[86svh] max-w-[92vw] bg-black object-contain" />
              <button onClick={() => setPlaying(null)} className="absolute -top-3 right-0 grid h-11 w-11 -translate-y-full place-items-center bg-white/10 text-white hover:bg-gold sm:-right-14 sm:top-0 sm:translate-y-0" aria-label="Close video">
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
