import About from '../components/About'
import WhyChoose from '../components/WhyChoose'
import { CtaBanner, PageHero } from '../components/blocks'
import upvanDay from '../assets/upvan-day.webp'
import upvanNight from '../assets/upvan-night.webp'

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Sara Infra" title={<>Spaces <em className="text-champagne">That Matter.</em></>} image={upvanDay} crumbs={[{ label: 'About Us' }]}
        intro="Residential projects for people looking to make a home in Navi Mumbai and its growing neighbourhoods." />
      <About />
      <WhyChoose />
      <CtaBanner image={upvanNight} />
    </>
  )
}
