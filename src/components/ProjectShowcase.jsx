import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BadgePercent, MapPin } from 'lucide-react'
import { projects, STATUSES, statusLabel } from '../data/projects'
import { Link } from '../lib/router'
import { openEnquiry } from './EnquiryModal'
import { ProjectCard } from './blocks'
import { Reveal, SectionHeading, ease } from './ui'
import { STATUS_ICONS } from '../lib/statusIcons'

const LIMIT = 6

/** Home page: projects grouped by status with animated tabs. */
export function HomeProjects() {
  const [tab, setTab] = useState(STATUSES[0].id)
  const list = projects.filter((p) => p.status === tab)
  return (
    <section className="bg-mist py-16 sm:py-20">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Our Projects" title={<>{projects.length} addresses. <em className="text-gold">One standard.</em></>}
            intro="From 1RK to 2 BHK across New Panvel, Upper Kharghar, Ulwe and Pushpak Nagar. Tap a project to see its homes, prices, gallery and films." />
          <Reveal delay={0.2}>
            <Link to="projects" className="btn-outline group border-ink text-ink hover:bg-ink hover:text-white">View All Projects <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-2 md:flex md:flex-wrap" role="tablist" aria-label="Project status">
          {STATUSES.map((st) => {
            const on = tab === st.id
            const n = projects.filter((p) => p.status === st.id).length
            const Icon = STATUS_ICONS[st.id]
            return (
              <button key={st.id} role="tab" aria-selected={on} onClick={() => setTab(st.id)}
                className={`group relative flex flex-col items-center gap-1.5 overflow-hidden border px-2 py-3 text-center transition-colors duration-300 md:flex-row md:gap-2.5 md:px-4 md:py-2.5 md:text-left ${on ? 'border-ink text-white' : 'border-ink/10 bg-white text-ink hover:border-gold'}`}>
                {on && <motion.span layoutId="hometab" className="absolute inset-0 bg-ink" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
                <span className={`relative grid h-8 w-8 place-items-center rounded-full transition-colors ${on ? 'bg-gold text-white' : 'bg-gold/15 text-gold-dark group-hover:bg-gold group-hover:text-white'}`}>
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <span className="relative text-[10px] font-semibold uppercase leading-tight tracking-[0.06em] sm:text-[11px] md:text-[12px] md:tracking-[0.12em]">{st.label}</span>
                <span className={`relative rounded-full px-2 py-0.5 text-[10px] font-bold ${on ? 'bg-gold text-white' : 'bg-ink/10 text-ink'}`}>{n}</span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease }}
            className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {list.slice(0, LIMIT).map((p, k) => <ProjectCard key={p.id} p={p} index={k % 3} />)}
          </motion.div>
        </AnimatePresence>

        {list.length > LIMIT && (
          <Reveal className="mt-12 text-center">
            <Link to="projects" className="btn-gold"><span>See all {list.length} {statusLabel(tab).toLowerCase()} projects</span><ArrowRight size={15} /></Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}

/** Home page: every project that currently has an offer. */
export function OffersSection() {
  const offers = projects.filter((p) => p.offer)
  if (!offers.length) return null
  return (
    <section className="grain relative overflow-hidden bg-ink py-16 text-ivory sm:py-20">
      <motion.div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-gold/15 blur-[130px]"
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="container-lux relative">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading dark eyebrow="Current Offers" title={<>Offers worth <em className="text-champagne">acting on.</em></>}
            intro="Limited-period offers across Sara Infra projects. Ask our team for details and eligibility." />
          <Reveal delay={0.2}>
            <button onClick={() => openEnquiry({ intent: 'Callback' })} className="btn-gold"><span>Get Offer Details</span><ArrowRight size={15} /></button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((p, k) => (
            <motion.article key={p.id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: (k % 3) * 0.1, duration: 0.8, ease }}
              className="group relative flex overflow-hidden border border-white/10 bg-white/[0.03] transition-colors duration-500 hover:border-gold/60">
              <Link to={p.id} className="relative w-32 shrink-0 overflow-hidden sm:w-40" aria-label={`View ${p.name}`}>
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/40" />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <span className="inline-flex items-center gap-1.5 self-start bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                  Offer
                </span>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-ivory">{p.name}</h3>
                <span className="mt-1 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-ivory/50"><MapPin size={11} /> {p.location}</span>
                <p className="mt-3 flex items-start gap-2 text-[14px] font-semibold leading-snug text-champagne">
                  <BadgePercent size={17} className="mt-0.5 shrink-0 text-gold" /> {p.offer}
                </p>
                <div className="mt-auto flex items-center gap-4 pt-4">
                  <button onClick={() => openEnquiry({ project: p.id, intent: 'Callback' })} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold hover:text-white">Claim Offer →</button>
                  <Link to={p.id} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/60 hover:text-white">View Project</Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-6 text-[11px] text-ivory/40">Offers are subject to change and to terms & conditions of the respective project.</p>
      </div>
    </section>
  )
}