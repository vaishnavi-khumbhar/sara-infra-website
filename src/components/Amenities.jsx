import { motion } from 'framer-motion'
import pool from '../assets/amenity-pool.webp'
import clubhouse from '../assets/amenity-clubhouse.webp'
import fitness from '../assets/amenity-fitness.webp'
import gardens from '../assets/amenity-gardens.webp'
import kids from '../assets/amenity-kids.webp'
import sports from '../assets/amenity-sports.webp'
import jogging from '../assets/amenity-jogging.webp'
import community from '../assets/upvan-aerial.webp'
import { SectionHeading, ease } from './ui'

// `at` = the project whose film/render the image comes from (keeps imagery honest).
const items = [
  { title: 'Swimming Pool', img: pool, at: 'Rising Son (GPS)', span: 'md:col-span-2 md:row-span-2' },
  { title: 'Clubhouse', img: clubhouse, at: 'Codename Upvan' },
  { title: 'Fitness Centre', img: fitness, at: 'Codename Upvan' },
  { title: 'Landscaped Gardens', img: gardens, at: 'Elements', span: 'md:col-span-2' },
  { title: "Children's Play Area", img: kids, at: 'Codename Upvan' },
  { title: 'Sports & Recreation', img: sports, at: 'Elements' },
  { title: 'Walking & Jogging Tracks', img: jogging, at: 'Codename Upvan', span: 'md:col-span-2' },
  { title: 'Community Spaces', img: community, at: 'Codename Upvan', span: 'col-span-2 md:col-span-4 md:row-span-2', pos: 'object-[center_88%]' },
]

export default function Amenities() {
  return (
    <section id="amenities" className="bg-mist py-16 sm:py-20 lg:py-24">
      <div className="container-lux">
        <SectionHeading
          align="center"
          eyebrow="Lifestyle & Amenities"
          title={<>Everyday life, <em className="text-gold">elevated.</em></>}
          intro="Pools, clubhouses, gardens and play spaces — the amenities that turn a residence into a community."
        />
        <div className="mt-16 grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] md:grid-cols-4 md:gap-4">
          {items.map((it, k) => (
            <motion.figure
              key={it.title}
              className={`group relative overflow-hidden bg-charcoal ${it.span || ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: (k % 4) * 0.08, ease }}
            >
              <img src={it.img} alt={`${it.title} at ${it.at}`} loading="lazy" className={`h-full w-full object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-110 ${it.pos || ''}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent transition-opacity duration-500 group-hover:from-ink/90" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <span className="block h-px w-6 bg-gold transition-all duration-500 group-hover:w-12" />
                <span className="mt-3 block font-serif text-xl leading-tight text-white sm:text-3xl">{it.title}</span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-champagne/90">{it.at}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
