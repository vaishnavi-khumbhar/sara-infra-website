import { motion } from 'framer-motion'
import { Ruler, Sparkles, Sprout, Route } from 'lucide-react'
import { SectionHeading, ease } from './ui'

const reasons = [
  { icon: Ruler, title: 'Thoughtfully Planned Residences', text: '1RK, 1 BHK and 2 BHK homes laid out for how families actually live, from compact first homes to roomier upgrades.' },
  { icon: Sparkles, title: 'Lifestyle-Focused Amenities', text: 'Pools, clubhouses, fitness, play zones and green spaces planned inside the community.' },
  { icon: Sprout, title: 'Growing Neighbourhoods', text: 'Projects across New Panvel, Upper Kharghar, Ulwe and Pushpak Nagar, parts of Navi Mumbai that are actively developing.' },
  { icon: Route, title: 'Connectivity & Convenience', text: 'Locations with access to Panvel Station and major regional links like the new airport and Atal Setu.' },
]

export default function WhyChoose() {
  return (
    <section id="why" className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="container-lux grid gap-16 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <SectionHeading eyebrow="Why Sara Infra" title={<>Homes built on <em className="text-gold">intent.</em></>} intro="Every Sara Infra project begins with the same questions: how will people live here, what will they enjoy, and how will they get around?" />
        </div>
        <div className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:col-span-8">
          {reasons.map((r, k) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: k * 0.1, ease }}
              className="group relative overflow-hidden bg-ivory p-8 sm:p-10"
            >
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-luxe group-hover:scale-x-100" />
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                  <r.icon size={22} strokeWidth={1.4} />
                </span>
                <span className="font-serif text-5xl text-ink/10">0{k + 1}</span>
              </div>
              <h3 className="mt-10 text-3xl leading-tight">{r.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-charcoal/70">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
