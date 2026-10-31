import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HardHat, Rocket, KeyRound, LayoutGrid } from 'lucide-react'
import { projects, STATUSES } from '../data/projects'
import { CtaBanner, PageHero, ProjectCard } from '../components/blocks'
import { Reveal, ease } from '../components/ui'
import upvanAerial from '../assets/upvan-aerial.webp'
import elementTowers from '../assets/element-towers.webp'

const ICON = { all: LayoutGrid, 'under-construction': HardHat, upcoming: Rocket, ready: KeyRound }
const INTRO = {
  'under-construction': 'Projects currently being built. Book early for the best choice of units, launch pricing and offers.',
  upcoming: 'Launching soon. Register your interest to get first access to launch details and pricing.',
  ready: 'Move in without the wait. Visit, choose and make it home.',
}

function Group({ status, list }) {
  if (!list.length) return null
  const Icon = ICON[status.id]
  return (
    <section className="scroll-mt-28" id={`status-${status.id}`}>
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-5">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-gold"><Icon size={20} /></span>
          <div>
            <h2 className="text-3xl sm:text-4xl">{status.label}</h2>
            <p className="mt-1 max-w-xl text-sm text-charcoal/65">{INTRO[status.id]}</p>
          </div>
        </div>
        <span className="font-serif text-5xl text-ink/15">{String(list.length).padStart(2, '0')}</span>
      </Reveal>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, k) => <ProjectCard key={p.id} p={p} index={k % 3} />)}
      </div>
    </section>
  )
}

export default function ProjectsPage() {
  const [tab, setTab] = useState('all')
  const tabs = [{ id: 'all', label: 'All Projects' }, ...STATUSES]
  const count = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.status === id).length)
  const shown = STATUSES.filter((s) => tab === 'all' || s.id === tab)

  return (
    <>
      <PageHero eyebrow="Our Projects" title={<>Find your <em className="text-champagne">place.</em></>} image={elementTowers} crumbs={[{ label: 'Projects' }]}
        intro="Under-construction, upcoming and ready-to-move homes across New Panvel, Upper Kharghar, Ulwe and Pushpak Nagar, from 1RK to 2 BHK." />

      <section className="bg-ivory pb-16 pt-10 sm:pb-20">
        <div className="container-lux">
          <div className="sticky top-[68px] z-20 -mx-5 mb-12 overflow-x-auto border-b border-ink/10 bg-ivory/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
            <div className="flex w-max gap-2" role="tablist" aria-label="Filter projects by status">
              {tabs.map((t) => {
                const Icon = ICON[t.id]
                const on = tab === t.id
                return (
                  <button key={t.id} role="tab" aria-selected={on} onClick={() => setTab(t.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors ${on ? 'text-white' : 'text-charcoal/70 hover:text-ink'}`}>
                    {on && <motion.span layoutId="pfilter" className="absolute inset-0 bg-ink" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
                    <Icon size={15} className={`relative ${on ? 'text-gold' : ''}`} />
                    <span className="relative">{t.label}</span>
                    <span className={`relative rounded-full px-2 py-0.5 text-[10px] ${on ? 'bg-gold text-white' : 'bg-ink/10 text-ink'}`}>{count(t.id)}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease }} className="space-y-20">
              {shown.map((s) => <Group key={s.id} status={s} list={projects.filter((p) => p.status === s.id)} />)}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <CtaBanner image={upvanAerial} title={<>Not sure which home <em className="text-champagne">fits you best?</em></>} text="Tell us your budget and preferred location. Our team will help you compare projects and plan a visit." />
    </>
  )
}
