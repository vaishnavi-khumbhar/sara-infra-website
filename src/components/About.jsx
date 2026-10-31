import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LayoutPanelTop, Trees, MapPinned } from 'lucide-react'
import upvanNight from '../assets/upvan-night.webp'
import upvanAerial from '../assets/upvan-aerial.webp'
import { projects } from '../data/projects'
import { ImageReveal, Reveal, SectionHeading } from './ui'

export function Marquee() {
  const items = [...projects.map((p) => `${p.shortName || p.name} · ${p.area}`), 'Spaces That Matter']
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink py-5" aria-hidden>
      <div className="animate-marquee flex w-max gap-14 whitespace-nowrap">
        {[...row, ...row].map((t, k) => (
          <span key={k} className="flex items-center gap-14 font-serif text-2xl italic text-ivory/80 sm:text-3xl">
            {t}
            <svg width="22" height="10" viewBox="0 0 22 10" className="text-gold"><path d="M1 9 C7 2, 14 0, 21 5" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
          </span>
        ))}
      </div>
    </div>
  )
}

const pillars = [
  { icon: LayoutPanelTop, title: 'How spaces are planned', text: 'Homes laid out around the rhythm of everyday life.' },
  { icon: Trees, title: 'What residents enjoy', text: 'Amenities within the community, steps from your door.' },
  { icon: MapPinned, title: 'How it connects', text: 'Locations chosen for links to the wider neighbourhood.' },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="container-lux grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6 lg:pr-8">
          <SectionHeading
            eyebrow="About Sara Infra"
            title={<>Creating Spaces <em className="text-gold">That Matter</em></>}
          />
          <Reveal delay={0.2} className="mt-8 space-y-5 text-[15px] leading-[1.85] text-charcoal/80 sm:text-base">
            <p>
              Sara Infra offers residential projects for people looking to make a home in Navi Mumbai and its growing neighbourhoods.
            </p>
            <p>
              Our projects offer a range of home configurations, lifestyle amenities and location advantages to suit different needs. From{' '}
              <strong className="font-semibold text-ink">Elements</strong> and <strong className="font-semibold text-ink">Sai Mannat</strong> in New Panvel to{' '}
              <strong className="font-semibold text-ink">Codename Upvan</strong> in Upper Kharghar, <strong className="font-semibold text-ink">Shree Arjun Heights</strong> in Ulwe and ready-to-move homes at Pushpak Nagar, each project offers a distinct way to find your place.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-12 grid grid-cols-3 border-t border-ink/10 pt-8">
            {[[String(projects.length), 'Residential projects'], ['1RK–2', 'BHK configurations'], ['04', 'Growing micro-markets']].map(([n, l]) => (
              <div key={l} className="pr-3">
                <div className="font-serif text-4xl text-ink sm:text-5xl">{n}</div>
                <div className="mt-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-charcoal/60">{l}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative lg:col-span-6">
          <ImageReveal src={upvanNight} alt="Sara Infra residential tower lit at dusk" className="aspect-[4/5] w-full sm:aspect-[5/5] lg:ml-auto lg:w-[86%]" />
          <motion.div style={{ y }} className="absolute -bottom-10 left-0 w-[52%] border-[6px] border-ivory shadow-2xl sm:w-[46%] lg:-left-6">
            <ImageReveal src={upvanAerial} alt="Aerial view of a Sara Infra community with pool and lawns" className="aspect-[4/3]" />
          </motion.div>
          <div className="absolute -right-2 top-10 hidden rotate-90 origin-right text-[10px] font-semibold uppercase tracking-luxe text-charcoal/40 lg:block">
            Navi Mumbai · Maharashtra
          </div>
        </div>
      </div>

      {/* Our approach */}
      <div className="container-lux mt-16 lg:mt-20">
        <div className="grid gap-12 bg-ink px-6 py-14 text-ivory sm:px-12 lg:grid-cols-12 lg:px-16 lg:py-20">
          <div className="lg:col-span-5">
            <Reveal className="mb-5 flex items-center gap-4"><span className="gold-line" /><span className="eyebrow">Our Approach</span></Reveal>
            <Reveal delay={0.08}>
              <h3 className="text-4xl leading-tight text-ivory sm:text-5xl">A home should work for <em className="text-champagne">everyday life.</em></h3>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-[15px] leading-[1.85] text-ivory/70">
                We believe a home should work for everyday life. That means paying attention to how spaces are planned, what residents can enjoy within the community and how a location connects with the wider neighbourhood.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-px bg-white/10 sm:grid-cols-3 lg:col-span-7">
            {pillars.map((p, k) => (
              <Reveal key={p.title} delay={0.1 + k * 0.1} className="group bg-ink p-7 transition-colors duration-500 hover:bg-charcoal">
                <p.icon size={28} strokeWidth={1.2} className="text-gold" />
                <div className="mt-8 font-sans text-[11px] text-gold">0{k + 1}</div>
                <h4 className="mt-2 text-2xl leading-snug text-ivory">{p.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-ivory/60">{p.text}</p>
                <span className="mt-6 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
