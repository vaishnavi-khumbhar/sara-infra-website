import { Phone, MapPin, Clock } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import Location from '../components/Location'
import { PageHero } from '../components/blocks'
import { Reveal, Facebook, Instagram } from '../components/ui'
import { PHONE, PHONE_DISPLAY, FACEBOOK, INSTAGRAM } from '../data/projects'
import upvanNight from '../assets/upvan-night.webp'

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact & Enquiry" title={<>Let's Find <em className="text-champagne">Your Home.</em></>} image={upvanNight} crumbs={[{ label: 'Contact' }]}
        intro="Have a question about a Sara Infra project? Contact the team to enquire about configurations, pricing, offers or site visits." />
      <section className="bg-ivory py-16 sm:py-20">
        <div className="container-lux grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="space-y-6 lg:col-span-4">
            <Reveal>
              <a href={`tel:${PHONE}`} className="group flex items-center gap-5 border-b border-ink/10 pb-6">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-gold transition-colors group-hover:bg-gold group-hover:text-white"><Phone size={20} /></span>
                <span><span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/55">Call us</span><span className="font-serif text-3xl text-ink">{PHONE_DISPLAY}</span></span>
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex items-center gap-5 border-b border-ink/10 pb-6">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-ink/15 text-gold"><MapPin size={20} /></span>
                <span><span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/55">Location</span><span className="font-serif text-2xl text-ink">Panvel, Maharashtra</span></span>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="flex items-center gap-5 border-b border-ink/10 pb-6">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-ink/15 text-gold"><Clock size={20} /></span>
                <span><span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/55">Site visits</span><span className="text-[15px] text-ink">By appointment — call or book online</span></span>
              </div>
            </Reveal>
            <Reveal delay={0.16} className="flex gap-3 pt-2">
              <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Sara Infra on Facebook" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"><Facebook /></a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Sara Infra on Instagram" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"><Instagram /></a>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="relative bg-white p-6 shadow-[0_40px_80px_-40px_rgba(17,17,17,0.25)] sm:p-10 lg:p-14">
              <span className="absolute left-0 top-0 h-1 w-24 bg-gold" />
              <EnquiryForm idPrefix="c" />
            </div>
          </Reveal>
        </div>
      </section>
      <Location />
    </>
  )
}
