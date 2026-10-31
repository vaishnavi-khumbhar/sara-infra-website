import kewaleTowers from '../assets/kewale-towers.webp'
import kewaleAerial from '../assets/kewale-aerial.webp'
import elementTowers from '../assets/element-towers.webp'
import upvanDay from '../assets/upvan-day.webp'
import upvanNight from '../assets/upvan-night.webp'
import upvanAerial from '../assets/upvan-aerial.webp'
import upvanCodename from '../assets/upvan-codename.webp'
import amenityPool from '../assets/amenity-pool.webp'
import amenitySports from '../assets/amenity-sports.webp'
import amenityGardens from '../assets/amenity-gardens.webp'
import amenityClubhouse from '../assets/amenity-clubhouse.webp'
import amenityFitness from '../assets/amenity-fitness.webp'
import amenityKids from '../assets/amenity-kids.webp'
import amenityJogging from '../assets/amenity-jogging.webp'
import elementAerial from '../assets/element-aerial.webp'
import elementKids from '../assets/element-kids.webp'
import elementWalk from '../assets/element-walk.webp'
import kewaleInterior from '../assets/kewale-interior.webp'
import kewaleKitchen from '../assets/kewale-kitchen.webp'
import kewaleSolar from '../assets/kewale-solar.webp'
// New projects
import swastikDusk from '../assets/projects/swastik-dusk.webp'
import swastikAerial from '../assets/projects/swastik-aerial.webp'
import swastikNightUp from '../assets/projects/swastik-night-up.webp'
import swastikCourt from '../assets/projects/swastik-court.webp'
import swastikTop from '../assets/projects/swastik-top.webp'
import swastikNight from '../assets/projects/swastik-night.webp'
import swastikNight2 from '../assets/projects/swastik-night-2.webp'
import adinathFront from '../assets/projects/adinath-front.webp'
import omkarLiving from '../assets/projects/omkar-living.webp'
import omkarKitchen from '../assets/projects/omkar-kitchen.webp'
import omkarBedroom from '../assets/projects/omkar-bedroom.webp'
import saiFront from '../assets/projects/saimannat-front.webp'
import saiEvening from '../assets/projects/saimannat-evening.webp'
import saiAerial from '../assets/projects/saimannat-aerial.webp'
import saiLifestyle from '../assets/projects/saimannat-lifestyle.webp'
import arjunFront from '../assets/projects/arjun-front.webp'
import sankalpFront from '../assets/projects/sankalp-front.webp'
import unnatiAerial from '../assets/projects/unnati-aerial.webp'

export const PHONE = '8691919169'
export const PHONE_DISPLAY = '+91 86919 19169'
export const FACEBOOK = 'https://www.facebook.com/profile.php?id=61590608940894'
export const INSTAGRAM = 'https://www.instagram.com/sara_infra?srtk=d2lrNnZqOXdjbzZ1'

export const STATUSES = [
  { id: 'under-construction', label: 'Under Construction' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'ready', label: 'Ready to Move' },
]
export const statusLabel = (id) => STATUSES.find((s) => s.id === id)?.label || ''

/** "from ₹27 Lakh" or "Price on request" – use wherever a price is shown in a sentence. */
export const fromText = (p) => (p.priceFrom ? `from ${p.priceFrom}` : 'Price on request')
export const priceOrRequest = (p) => p.priceFrom || 'On Request'

/*
 * Project data as provided by the client (brochures, creatives, WhatsApp brief).
 * Do not edit prices / configurations / offers without written confirmation.
 * Optional fields: priceFrom, towersShort, secondary, video/poster, films, connectivity, specs, offer, badge.
 */
export const projects = [
  // ─────────────── UNDER CONSTRUCTION ───────────────
  {
    id: 'project-element',
    status: 'under-construction',
    number: '01',
    name: 'Elements (तत्त्वम)',
    shortName: 'Elements',
    location: 'New Panvel',
    area: 'Panvel',
    mapQuery: 'New Panvel, Maharashtra',
    config: '2 BHK',
    priceFrom: '₹92.99 Lakh',
    towersShort: '2 Towers · 25 Floors',
    accent: '#2E3B4E',
    tagline: 'Modern 2 BHK homes with lifestyle amenities in a well-connected New Panvel location.',
    image: elementTowers,
    secondary: elementAerial,
    gallery: [elementTowers, elementAerial, amenityGardens, amenitySports, elementKids, elementWalk],
    video: 'videos/element.mp4',
    poster: 'videos/element-poster.jpg',
    highlights: [
      { label: 'Configuration', value: '2 BHK' },
      { label: 'Towers', value: '2 Towers · 25 Floors' },
      { label: 'Starting at', value: '₹92.99 Lakh' },
      { label: 'Offer', value: 'EMI Holiday*' },
    ],
    units: [{ type: '2 BHK', area: 'Carpet area on request', price: 'Starting at ₹92.99 lakh' }],
    facts: [
      ['Towers', '2 towers | 25 floors'],
      ['Offer', 'EMI holiday* | Price negotiable on site'],
    ],
    amenities: ['Swimming pool', 'Sports court', 'Club lounge', 'And more'],
    connectivity: [
      { place: 'Panvel Station', time: 'Approx. 5 min' },
      { place: 'Navi Mumbai International Airport', time: 'Approx. 10 min' },
      { place: 'Atal Setu', time: 'Approx. 15 min' },
    ],
    offer: 'EMI holiday* · Price negotiable on site',
    cta: 'Enquire About Elements',
  },
  {
    id: 'codename-upvan',
    status: 'under-construction',
    number: '02',
    name: 'Codename Upvan',
    shortName: 'Upvan',
    location: 'Progressive Upper Kharghar',
    area: 'Upper Kharghar',
    mapQuery: 'Kharghar, Navi Mumbai, Maharashtra',
    config: '1 & 2 BHK',
    priceFrom: '₹48.88 Lakh',
    towersShort: '4 Towers · G+18',
    accent: '#1F3B2C',
    badge: 'New Launch',
    tagline: 'Thoughtfully designed 1 and 2 BHK residences with lifestyle amenities in Progressive Upper Kharghar.',
    image: upvanDay,
    secondary: upvanCodename,
    gallery: [upvanDay, upvanAerial, upvanNight, amenityClubhouse, amenityFitness, amenityKids, amenityJogging],
    video: 'videos/upvan.mp4',
    poster: 'videos/upvan-poster.jpg',
    highlights: [
      { label: 'Spread', value: '4 Acres' },
      { label: 'Towers', value: '4 Towers · G+18' },
      { label: '1 BHK launch', value: '₹48.88 Lakh' },
      { label: '2 BHK launch', value: '₹70.88 Lakh' },
    ],
    units: [
      { type: '1 BHK', area: '419 sq. ft. carpet', price: 'Launch price ₹48.88 lakh' },
      { type: '2 BHK', area: '606 sq. ft. carpet', price: 'Launch price ₹70.88 lakh' },
    ],
    facts: [
      ['Project spread', '4 acres'],
      ['Towers', '4 elegant towers | G+18 storeys'],
      ['Possession', 'December 2028'],
      ['Payment plan', 'Pay 10% now, 90% at possession*'],
    ],
    amenities: ['Clubhouse', 'Swimming pool & deck', 'Fitness centre', "Children's play zone", 'Multipurpose court', 'Box cricket', 'Celebration hall', 'Party lawn', 'Jogging & walking track', 'Senior citizen sit-out', 'Amphitheatre'],
    connectivity: [],
    offer: 'Pay 10% now · 90% at possession*',
    cta: 'Enquire About Codename Upvan',
  },
  {
    id: 'gps-kewale',
    status: 'under-construction',
    number: '03',
    name: 'Rising Son (GPS)',
    shortName: 'Rising Son',
    location: 'Kewale, Panvel',
    area: 'Panvel',
    mapQuery: 'Kewale, Panvel, Maharashtra',
    config: '1 & 2 BHK',
    priceFrom: '₹27 Lakh',
    towersShort: 'G+7 Storeys',
    accent: '#8C6A43',
    tagline: 'A 3-acre residential project offering 1 and 2 BHK homes in Kewale, Panvel.',
    image: kewaleTowers,
    secondary: kewaleAerial,
    gallery: [kewaleTowers, kewaleAerial, amenityPool, kewaleInterior, kewaleKitchen, kewaleSolar],
    video: 'videos/kewale.mp4',
    poster: 'videos/kewale-poster.jpg',
    highlights: [
      { label: 'Configuration', value: '1 & 2 BHK' },
      { label: 'Towers', value: 'G+7 storeys' },
      { label: '1 BHK from', value: '₹27 Lakh' },
      { label: '2 BHK from', value: '₹48 Lakh' },
    ],
    units: [
      { type: '1 BHK', area: '350–390 sq. ft. carpet', price: 'Starting at ₹27 lakh' },
      { type: '2 BHK', area: '519–592 sq. ft. carpet', price: 'Starting at ₹48 lakh' },
    ],
    facts: [
      ['Land parcel', '3 acres'],
      ['Towers', 'G+7 storeys'],
    ],
    amenities: ['Infinity swimming pool', 'Landscaped spaces', 'Fitness & recreation areas', "Kids' play zone", 'Solar panels', 'Rainwater harvesting'],
    connectivity: [{ place: 'Panvel Station', time: 'Approx. 6 km' }],
    offer: null,
    cta: 'Enquire About Rising Son',
  },
  {
    id: 'jprime-swastik',
    status: 'under-construction',
    number: '04',
    name: 'JPrime Swastik',
    shortName: 'JPrime Swastik',
    location: 'Giravale, Palaspe, Panvel',
    area: 'Panvel',
    mapQuery: 'Giravale, Panvel, Maharashtra',
    config: '1 & 2 BHK',
    priceFrom: null,
    towersShort: 'Wing A & Wing B',
    accent: '#24324A',
    tagline: 'Twin-wing residential towers with 1 and 2 BHK homes at Giravale (Palaspe), Panvel, by JPrime Buildcon.',
    image: swastikDusk,
    secondary: swastikNight,
    gallery: [swastikDusk, swastikAerial, swastikNight, swastikNightUp, swastikCourt, swastikTop, swastikNight2],
    highlights: [
      { label: 'Configuration', value: '1 & 2 BHK' },
      { label: 'Wings', value: 'Wing A & Wing B' },
      { label: '1 BHK carpet', value: '359–401 sq. ft.' },
      { label: '2 BHK carpet', value: '563 sq. ft.' },
    ],
    units: [
      { type: '1 BHK', area: '359–401 sq. ft. carpet', price: 'Price on request' },
      { type: '2 BHK', area: '563 sq. ft. carpet', price: 'Price on request' },
    ],
    facts: [
      ['Address', 'Plot No. 138/B, Giravale, Panvel'],
      ['Developer', 'JPrime Buildcon'],
      ['Finance', 'Approved project finance from leading banks'],
    ],
    amenities: ['Sports court', 'Landscaped garden', 'Ample parking'],
    connectivity: [],
    offer: 'Approved project finance from leading banks',
    cta: 'Enquire About JPrime Swastik',
  },
  {
    id: 'adinath-crystal',
    status: 'under-construction',
    number: '05',
    name: 'Adinath Crystal',
    shortName: 'Adinath Crystal',
    location: 'Sector 03, Pushpak Nagar, Navi Mumbai',
    area: 'Pushpak Nagar',
    mapQuery: 'Pushpak Nagar, Navi Mumbai, Maharashtra',
    config: '1 & 2 BHK · Shops',
    priceFrom: null,
    towersShort: 'G+7 Storeys',
    accent: '#1E3A5F',
    tagline: 'A G+7 residential-cum-commercial project with 1 & 2 BHK flats and shops at Pushpak Nagar, 5 minutes from Navi Mumbai International Airport.',
    image: adinathFront,
    gallery: [adinathFront],
    highlights: [
      { label: 'Configuration', value: '1 & 2 BHK' },
      { label: 'Building', value: 'G+7 Storeys' },
      { label: 'Shops', value: 'Available' },
      { label: 'NMIA Airport', value: '5 min' },
    ],
    units: [
      { type: '1 BHK', area: 'Carpet area on request', price: 'Price on request' },
      { type: '2 BHK', area: 'Carpet area on request', price: 'Price on request' },
      { type: 'Shops', area: 'Ground floor', price: 'Price on request' },
    ],
    facts: [
      ['Address', 'Plot No. 422, Sector 03, Pushpak Nagar'],
      ['Plot', 'Tripartite CIDCO transfer plot'],
      ['Structure', 'Earthquake-resistant RCC design'],
      ['Home loans', 'Available from all leading banks'],
    ],
    amenities: ['Fitness centre (1st floor)', 'Stack car parking', '4-passenger lifts', 'Fire-fighting system', 'CCTV surveillance in lobby', 'Underground & overhead water tanks'],
    specs: [
      'Vitrified flooring in all rooms; anti-skid flooring in toilet & bath',
      'Granite kitchen platform with S.S. sink; water purifier point',
      'Modular main & internal doors; powder-coated aluminium sliding windows',
      'Concealed copper wiring with MCBs; ISI modular switches',
      'Putty-finish walls with acrylic distemper paint',
      'Branded sanitaryware & premium C.P. fittings',
      'Waterproofing treatment on top floor',
    ],
    connectivity: [
      { place: 'Navi Mumbai International Airport', time: '5 min' },
      { place: 'Mumbai Trans Harbour Link (MTHL)', time: '10 min' },
      { place: 'Mumbai–Pune Expressway', time: '5 min' },
      { place: 'Khandeshwar Railway Station', time: '5 min' },
      { place: 'Panvel Railway Station', time: '10 min' },
      { place: 'D Y Patil Stadium & College', time: '20 min' },
      { place: 'JNPT', time: '5 min' },
      { place: 'Hospitals, Schools & Colleges', time: '2 min' },
    ],
    offer: null,
    cta: 'Enquire About Adinath Crystal',
  },
  {
    id: 'omkar-aangan',
    status: 'under-construction',
    number: '06',
    name: 'Omkar Aangan',
    shortName: 'Omkar Aangan',
    location: 'Umroli, New Panvel',
    area: 'Panvel',
    mapQuery: 'Umroli, Panvel, Maharashtra',
    config: '1RK & 1BHK',
    priceFrom: null,
    towersShort: null,
    accent: '#7A4E2D',
    badge: 'Zero Down Payment',
    tagline: 'Compact 1RK and 1BHK homes at Umroli, New Panvel, now with zero down payment and zero stamp duty & registration.',
    image: omkarLiving,
    secondary: omkarKitchen,
    gallery: [omkarLiving, omkarKitchen, omkarBedroom],
    video: 'videos/omkar-1bhk.mp4',
    poster: 'videos/omkar-1bhk-poster.jpg',
    films: [
      { src: 'videos/omkar-1rk.mp4', poster: 'videos/omkar-1rk-poster.jpg', label: '1RK Walkthrough' },
      { src: 'videos/omkar-1bhk.mp4', poster: 'videos/omkar-1bhk-poster.jpg', label: '1BHK Walkthrough' },
    ],
    highlights: [
      { label: 'Configuration', value: '1RK & 1BHK' },
      { label: 'Down payment', value: 'ZERO' },
      { label: 'Stamp duty & registration', value: 'ZERO' },
      { label: 'Walkthroughs', value: '1RK & 1BHK' },
    ],
    units: [
      { type: '1RK', area: 'Carpet area on request', price: 'Price on request' },
      { type: '1BHK', area: 'Carpet area on request', price: 'Price on request' },
    ],
    facts: [
      ['Location', 'Umroli, New Panvel'],
      ['Offer', 'ZERO down payment, ZERO stamp duty & registration'],
    ],
    amenities: [],
    connectivity: [],
    offer: 'ZERO Down Payment · ZERO Stamp Duty & Registration',
    cta: 'Enquire About Omkar Aangan',
  },
  {
    id: 'sai-mannat',
    status: 'under-construction',
    number: '07',
    name: 'Sai Mannat Residence',
    shortName: 'Sai Mannat',
    location: 'Harigram, New Panvel',
    area: 'Panvel',
    mapQuery: 'Harigram, Panvel, Maharashtra',
    config: '1 & 2 BHK',
    priceFrom: null,
    towersShort: 'G+6 Storeys',
    accent: '#8A6A2E',
    badge: 'Semi-Furnished',
    tagline: 'A G+6 residential township on 2 acres at Harigram, New Panvel. 1 & 2 BHK homes come semi-furnished, 2 minutes from the Harigram waterfalls.',
    image: saiFront,
    secondary: saiAerial,
    gallery: [saiFront, saiEvening, saiAerial, saiLifestyle],
    video: 'videos/saimannat-sample.mp4',
    poster: 'videos/saimannat-sample-poster.jpg',
    films: [{ src: 'videos/saimannat-sample.mp4', poster: 'videos/saimannat-sample-poster.jpg', label: 'Sample Flat' }],
    highlights: [
      { label: 'Configuration', value: '1 & 2 BHK' },
      { label: 'Building', value: 'G+6 Storeys' },
      { label: 'Township', value: '2 Acres' },
      { label: 'Approved by', value: 'CIDCO NAINA' },
    ],
    units: [
      { type: '1 BHK', area: 'Semi-furnished', price: 'Price on request' },
      { type: '2 BHK', area: 'Semi-furnished', price: 'Price on request' },
    ],
    facts: [
      ['Address', 'S.N. 32/D, Harigram Village, Post Morbe, Panvel'],
      ['Plot', 'Clear title CIDCO NAINA transfer plot'],
      ['Structure', 'Earthquake-resistant RCC'],
      ['Home loans', 'From major financial institutions & banks'],
    ],
    amenities: ['Mandir in society premises', "Children's play area", 'Sand pit', 'Walking / jogging track', 'Cricket pitch', 'CCTV security', 'Yoga / meditation area', 'Senior citizen sitting area', 'Party lawn'],
    specs: [
      'False ceiling with panel lights',
      'Modular kitchen with cooktop',
      'RO water purifier',
      'Geyser',
      'Ceiling fans in living room and bedroom',
    ],
    specsTitle: 'Semi-furnished flats include',
    connectivity: [
      { place: 'Harigram Waterfalls', time: '2 min' },
      { place: 'Panvel Railway Station', time: '10 min' },
      { place: 'Virar–Alibaug Corridor', time: '10 min' },
      { place: 'Mumbai–Pune Expressway', time: '10 min' },
      { place: 'Hospitals (MGM)', time: '10 min' },
      { place: 'D Mart, Orion Mall, Imagica', time: '10 min' },
      { place: 'Navi Mumbai International Airport', time: '15 min' },
      { place: 'Education (DPS, DAV, Amity)', time: '15 min' },
      { place: 'MTHL (Atal Setu)', time: '20 min' },
      { place: 'MIDC, JNPT Ports & SEZs', time: '20 min' },
    ],
    offer: 'Semi-furnished flats: modular kitchen, RO purifier, geyser & more',
    cta: 'Enquire About Sai Mannat',
  },
  {
    id: 'shree-arjun-heights',
    status: 'under-construction',
    number: '08',
    name: 'Shree Arjun Heights',
    shortName: 'Arjun Heights',
    location: 'Ulwe, Navi Mumbai',
    area: 'Ulwe',
    mapQuery: 'Ulwe, Navi Mumbai, Maharashtra',
    config: '1 & 2 BHK · Shops',
    priceFrom: null,
    towersShort: '7-Storey Tower',
    accent: '#3B2F4A',
    tagline: 'Where the City Meets Serenity: shops and 1 & 2 BHK homes in a 7-storey tower at Ulwe, close to Navi Mumbai International Airport.',
    image: arjunFront,
    gallery: [arjunFront],
    highlights: [
      { label: 'Configuration', value: '1 & 2 BHK' },
      { label: 'Building', value: '7-Storey Tower' },
      { label: 'Shops', value: 'Available' },
      { label: 'Atal Setu', value: '5 min' },
    ],
    units: [
      { type: '1 BHK', area: 'Carpet area on request', price: 'Price on request' },
      { type: '2 BHK', area: 'Carpet area on request', price: 'Price on request' },
      { type: 'Shops', area: 'Ground floor', price: 'Price on request' },
    ],
    facts: [
      ['Plot', 'Clear title CIDCO transfer plot'],
      ['Structure', 'Earthquake-resistant'],
      ['Lobby', 'Grand air-conditioned lobby'],
      ['Power', '24x7 backup for common areas & service lift'],
    ],
    amenities: ['Landscaped recreation', 'Terrace garden & temple', 'State-of-the-art security', 'Ample parking', 'Grand AC lobby', '24x7 power backup'],
    specs: [
      "4' x 2' double-charge vitrified flooring in all rooms",
      'Asian Paints finish with acrylic emulsion & texture paint',
      'Polycab / Anchor copper wiring with modular switches, MCB & ELCB',
      'Anodized aluminium sliding windows',
      'Granite kitchen platform with stainless steel sink',
      'Anti-skid tiles in WC & bath with full-height wall tiles',
      'Branded sanitaryware with Jaquar / Cera CP fittings',
      'CCTV cable provision to each flat',
    ],
    connectivity: [
      { place: "Wilfred's School", time: '2 min' },
      { place: 'Market & Shopping Centre', time: '2 min' },
      { place: 'Atal Setu', time: '5 min' },
      { place: 'Mumbai–Pune Express / Goa Highway', time: '5 min' },
      { place: 'Bamandongari Railway Station', time: '10 min' },
      { place: 'Navi Mumbai International Airport', time: '10 min' },
    ],
    offer: null,
    cta: 'Enquire About Shree Arjun Heights',
  },

  // ─────────────── UPCOMING ───────────────
  {
    id: 'jprime-sankalp',
    status: 'upcoming',
    number: '09',
    name: 'JPrime Sankalp',
    shortName: 'JPrime Sankalp',
    location: 'Near Amity University, Panvel',
    area: 'Panvel',
    mapQuery: 'Amity University Mumbai, Panvel',
    config: 'Details on request',
    priceFrom: null,
    towersShort: 'G+22 Storey Tower',
    accent: '#2B4A6B',
    badge: 'Upcoming',
    tagline: 'A G+22 storey premium tower offering a modern lifestyle and excellent connectivity, just 2 minutes from Amity University.',
    image: sankalpFront,
    gallery: [sankalpFront],
    highlights: [
      { label: 'Tower', value: 'G+22 Storeys' },
      { label: 'Amity University', value: '2 min' },
      { label: 'Expressway', value: '5 min' },
      { label: 'Status', value: 'Upcoming' },
    ],
    units: [],
    facts: [
      ['Tower', 'G+22 storey premium tower'],
      ['Status', 'Upcoming – register for launch details'],
    ],
    amenities: [],
    connectivity: [
      { place: 'Amity University', time: '2 min' },
      { place: 'Mumbai–Pune Expressway', time: '5 min' },
      { place: 'Somatne Railway Station', time: '5 min' },
      { place: 'Panvel Railway Station', time: '12 min' },
      { place: 'Navi Mumbai International Airport', time: '15 min' },
      { place: 'Atal Setu', time: '20 min' },
    ],
    offer: null,
    cta: 'Register Interest in JPrime Sankalp',
  },

  // ─────────────── READY TO MOVE ───────────────
  {
    id: 'unnati-crest',
    status: 'ready',
    number: '10',
    name: 'Unnati Crest',
    shortName: 'Unnati Crest',
    location: 'Pushpak Nagar, Navi Mumbai',
    area: 'Pushpak Nagar',
    mapQuery: 'Pushpak Nagar, Navi Mumbai, Maharashtra',
    config: 'Details on request',
    priceFrom: null,
    towersShort: null,
    accent: '#2F5D50',
    badge: 'Ready to Move',
    tagline: 'Ready-to-move homes at Pushpak Nagar, Navi Mumbai. Contact our team for available configurations, pricing and a site visit.',
    image: unnatiAerial,
    gallery: [unnatiAerial],
    highlights: [
      { label: 'Status', value: 'Ready to Move' },
      { label: 'Location', value: 'Pushpak Nagar' },
    ],
    units: [],
    facts: [['Status', 'Ready to move']],
    amenities: [],
    connectivity: [],
    offer: null,
    cta: 'Enquire About Unnati Crest',
  },
]

/** Every walkthrough film across projects (used on Home / Lifestyle). */
export const films = projects.flatMap((p) =>
  p.films ? p.films.map((f) => ({ ...f, project: p })) : p.video ? [{ src: p.video, poster: p.poster, label: 'Site Walkthrough', project: p }] : [],
)
