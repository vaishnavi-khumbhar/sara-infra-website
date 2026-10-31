import { motion } from 'framer-motion'
import { ArrowRight, Phone, MapPin, CalendarCheck, Calculator, FileText, PhoneCall } from 'lucide-react'
import Hero from '../components/Hero'
import { Marquee } from '../components/About'
import Films from '../components/Films'
import WhyChoose from '../components/WhyChoose'
import EnquiryForm from '../components/EnquiryForm'
import { openEnquiry } from '../components/EnquiryModal'
import { CtaBanner, Counter } from '../components/blocks'
import { HomeProjects, OffersSection } from '../components/ProjectShowcase'
import { ImageReveal, Reveal, SectionHeading, ease } from '../components/ui'
import { Link } from '../lib/router'
import { projects, PHONE, PHONE_DISPLAY } from '../data/projects'
import upvanNight from '../assets/upvan-night.webp'
import upvanAerial from '../assets/upvan-aerial.webp'
import pool from '../assets/amenity-pool.webp'
import clubhouse from '../assets/amenity-clubhouse.webp'
import kids from '../assets/amenity-kids.webp'
import gardens from '../assets/amenity-gardens.webp'

const quick = [
  { icon: CalendarCheck, label: 'Book a Site Visit', intent: 'Site Visit' },
  { icon: Calculator, label: 'Get Cost Sheet', intent: 'Cost Sheet' },
  { icon: FileText, label: 'Request Brochure', intent: 'Brochure' },
  { icon: PhoneCall, label: 'Request Callback', intent: 'Callback' },
]

const amen = [
  { t: 'Swimming Pool', img: pool, at: 'Rising Son (GPS)' },
  { t: 'Clubhouse', img: clubhouse, at: 'Codename Upvan' },
  { t: 'Landscaped Gardens', img: gardens, at: 'Elements' },
  { t: "Children's Play", img: kids, at: 'Codename Upvan' },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* Quick action bar */}
      <div className="relative z-10 bg-ink">
        <div className="container-lux grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
          {quick.map((q, k) => (
            <motion.button
              key={q.label}
              onClick={() => openEnquiry({ intent: q.intent })}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.08, duration: 0.7, ease }}
              className="group flex items-center gap-3 bg-ink px-3 py-5 text-left transition-colors duration-500 hover:bg-gold sm:gap-4 sm:px-6 sm:py-7"
            >
              <q.icon size={22} strokeWidth={1.4} className="shrink-0 text-gold transition-colors group-hover:text-white" />
              <span className="text-[12px] font-semibold uppercase leading-snug tracking-[0.12em] text-ivory sm:text-[13px]">{q.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      <Marquee />

      {/* About teaser */}
      <section id="home-intro" className="bg-ivory py-16 sm:py-20">
        <div className="container-lux grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <ImageReveal src={upvanNight} alt="Sara Infra residential tower lit at dusk" className="aspect-[4/5] w-[86%]" />
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4, ease }} className="absolute -bottom-8 right-0 w-[48%] border-[6px] border-ivory shadow-2xl">
              <img src={upvanAerial} alt="Aerial view of a Sara Infra community" loading="lazy" className="aspect-square w-full object-cover" />
            </motion.div>
            <motion.div initial={{ scale: 0, rotate: -20 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.6 }}
              className="absolute -top-6 right-[8%] grid h-28 w-28 place-items-center rounded-full bg-gold text-center text-white shadow-xl sm:h-32 sm:w-32">
              <span><span className="block font-serif text-4xl leading-none">{projects.length}</span><span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em]">Projects</span></span>
            </motion.div>
          </div>
          <div>
            <SectionHeading eyebrow="About Sara Infra" title={<>Creating Spaces <em className="text-gold">That Matter</em></>} />
            <Reveal delay={0.15}>
              <p className="mt-7 text-[15px] leading-[1.85] text-charcoal/80 sm:text-base">
                Sara Infra offers residential projects for people looking to make a home in Navi Mumbai and its growing neighbourhoods — under-construction, upcoming and ready-to-move projects across New Panvel, Upper Kharghar, Ulwe and Pushpak Nagar.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-8">
              <div><div className="font-serif text-4xl text-ink sm:text-5xl">₹<Counter value={27} /> Lakh</div><div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/55">Homes starting from</div></div>
              <div><div className="font-serif text-4xl text-ink sm:text-5xl">1RK–2</div><div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/55">BHK configurations</div></div>
              <div><div className="font-serif text-4xl text-ink sm:text-5xl"><Counter value={10} />:<Counter value={90} /></div><div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/55">Payment plan at Upvan</div></div>
              <div><div className="font-serif text-4xl text-ink sm:text-5xl"><Counter value={projects.length} /></div><div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/55">Projects across Navi Mumbai</div></div>
            </Reveal>
            <Reveal delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="about" className="btn-outline group border-ink text-ink hover:bg-ink hover:text-white">Our Story <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
              <button onClick={() => openEnquiry({ intent: 'Site Visit' })} className="btn-gold"><span>Book a Site Visit</span></button>
            </Reveal>
          </div>
        </div>
      </section>

      <HomeProjects />
      <OffersSection />

      <Films />

      {/* Amenities teaser */}
      <section className="bg-ivory py-16 sm:py-20">
        <div className="container-lux">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Lifestyle & Amenities" title={<>Everyday life, <em className="text-gold">elevated.</em></>} />
            <Reveal delay={0.2}><Link to="lifestyle" className="btn-outline group border-ink text-ink hover:bg-ink hover:text-white">Explore Lifestyle <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link></Reveal>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {amen.map((a, k) => (
              <motion.div key={a.t} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.1, duration: 0.9, ease }} className={`group relative overflow-hidden ${k % 2 ? 'md:mt-12' : ''}`}>
                <img src={a.img} alt={`${a.t} at ${a.at}`} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="block h-px w-6 bg-gold transition-all duration-500 group-hover:w-12" />
                  <span className="mt-2 block font-serif text-xl text-white sm:text-2xl">{a.t}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-champagne">{a.at}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyChoose />
      <CtaBanner image={upvanAerial} />

      {/* Quick enquiry */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-lux grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Contact & Enquiry" title={<>Let's Find <em className="text-gold">Your Home</em></>} intro="Have a question about a Sara Infra project? Contact the team to enquire about configurations, pricing, offers or site visits." />
            <Reveal delay={0.2} className="mt-10 space-y-5">
              <a href={`tel:${PHONE}`} className="group flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-gold transition-colors group-hover:bg-gold group-hover:text-white"><Phone size={20} /></span>
                <span><span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/55">Call us</span><span className="font-serif text-3xl text-ink">{PHONE_DISPLAY}</span></span>
              </a>
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-ink/15 text-gold"><MapPin size={20} /></span>
                <span><span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/55">Location</span><span className="font-serif text-2xl text-ink">Panvel, Maharashtra</span></span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative bg-white p-6 shadow-[0_40px_80px_-40px_rgba(17,17,17,0.25)] sm:p-10">
              <span className="absolute left-0 top-0 h-1 w-24 bg-gold" />
              <EnquiryForm idPrefix="home" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}