import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import upvanDay from '../assets/upvan-day.webp'
import upvanNight from '../assets/upvan-night.webp'
import upvanAerial from '../assets/upvan-aerial.webp'
import { ease, scrollToId } from './ui'
import { navigate } from '../lib/router'
import { openEnquiry } from './EnquiryModal'
import { Magnetic } from './blocks'

const slides = [
  { src: upvanNight, alt: 'Codename Upvan towers illuminated at dusk' },
  { src: upvanDay, alt: 'Codename Upvan residential towers in daylight' },
  { src: upvanAerial, alt: 'Aerial view of Codename Upvan with pool, lawn and sports court' },
]

const lines = ['Building Homes.', 'Building Families.', 'Building Better Lives.']

export default function Hero() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 160])
  const fade = useTransform(scrollY, [0, 500], [1, 0])

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6500)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <section id="home" className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={i}
            src={slides[i].src}
            alt={slides[i].alt}
            fetchPriority={i === 0 ? 'high' : undefined}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.14 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.6, ease: 'easeInOut' }, scale: { duration: 8, ease: 'linear' } }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />

      <motion.div style={{ opacity: fade }} className="container-lux relative z-10 flex h-full flex-col justify-center pb-16 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease }} className="mb-7 flex items-center gap-4">
          <motion.span className="block h-px bg-gold" initial={{ width: 0 }} animate={{ width: 56 }} transition={{ duration: 1, delay: 0.5, ease }} />
          <span className="eyebrow !text-champagne">A leading real estate brand in Navi Mumbai</span>
        </motion.div>

        <h1 className="max-w-4xl text-[2.9rem] font-light leading-[1.02] text-white sm:text-6xl lg:text-[5.6rem]">
          {lines.map((l, k) => (
            <span key={l} className="block overflow-hidden pb-1">
              <motion.span
                className={`block ${k === 2 ? 'italic text-champagne' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.6 + k * 0.15, ease }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.2, ease }} className="mt-7 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Thoughtfully planned residences. Inspired living. A better tomorrow.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.4, ease }} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Magnetic>
            <button onClick={() => navigate('projects')} className="btn-gold group w-full sm:w-auto">
              <span>Explore Our Projects</span>
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </Magnetic>
          <button onClick={() => navigate('about')} className="btn-outline border-white/40 text-white hover:border-white hover:bg-white hover:text-ink">
            Discover Sara Infra
          </button>
          <button onClick={() => openEnquiry({ intent: 'Site Visit' })} className="btn-outline border-transparent text-champagne hover:text-white sm:px-3">
            Book a Site Visit <ArrowUpRight size={15} />
          </button>
        </motion.div>
      </motion.div>

      {/* New launch card */}
      <motion.button
        onClick={() => navigate('codename-upvan')}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.8, ease }}
        className="group absolute bottom-10 right-8 z-10 hidden w-[300px] border border-white/15 bg-ink/40 p-5 text-left backdrop-blur-md transition-colors hover:border-gold lg:block"
      >
        <span className="eyebrow">New Launch</span>
        <span className="mt-2 block font-serif text-2xl text-white">Codename Upvan</span>
        <span className="mt-1 block text-[13px] text-white/70">Progressive Upper Kharghar · 1 & 2 BHK from ₹48.88 Lakh</span>
        <span className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-champagne">
          View project <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </motion.button>

      {/* slide indicators */}
      <div className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 gap-2 sm:flex lg:left-auto lg:right-[360px] lg:translate-x-0">
        {slides.map((s, k) => (
          <button key={k} onClick={() => setI(k)} aria-label={`Show image ${k + 1}`} className="h-6 py-2.5">
            <span className={`block h-px transition-all duration-700 ${k === i ? 'w-12 bg-gold' : 'w-6 bg-white/40'}`} />
          </button>
        ))}
      </div>

      <motion.button
        onClick={() => scrollToId('home-intro')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-5 z-10 flex items-center gap-3 sm:left-8 lg:left-12"
        aria-label="Scroll to next section"
      >
        <span className="relative block h-14 w-px overflow-hidden bg-white/20">
          <span className="animate-scrollcue absolute left-0 top-0 h-1/2 w-px bg-gold" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-luxe text-white/70">Scroll</span>
      </motion.button>
    </section>
  )
}
