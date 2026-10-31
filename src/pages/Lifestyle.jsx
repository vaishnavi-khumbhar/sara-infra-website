import Amenities from '../components/Amenities'
import Films from '../components/Films'
import { CtaBanner, PageHero } from '../components/blocks'
import pool from '../assets/amenity-pool.webp'
import upvanAerial from '../assets/upvan-aerial.webp'

export default function LifestylePage() {
  return (
    <>
      <PageHero eyebrow="Lifestyle & Amenities" title={<>Everyday life, <em className="text-champagne">elevated.</em></>} image={upvanAerial} crumbs={[{ label: 'Lifestyle' }]}
        intro="Pools, clubhouses, gardens, play zones and sports courts — the amenities that turn a residence into a community." />
      <Amenities />
      <Films />
      <CtaBanner image={pool} title={<>Experience it <em className="text-champagne">in person.</em></>} text="Walk the amenities, see the sample flats and meet our team on site." />
    </>
  )
}
