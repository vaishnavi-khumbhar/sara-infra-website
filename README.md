# SARA INFRA – Website

React + Vite + Tailwind CSS + Framer Motion + Lucide.

## Run
```bash
npm install
npm run dev       # local dev at http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the build
```

## Pages & routing
Home, About, Projects, Lifestyle, Contact, plus one page per project (GPS Kewale, Project Element, Codename Upvan).
- Default: hash URLs (`/#about`, `/#gps-kewale`) – works on any static host.
- For SEO-friendly URLs (`/about`, `/projects/gps-kewale`) build with `VITE_ROUTING=path npm run build`
  and add a rewrite of all routes to `/index.html` on the host (Vercel: `vercel.json` rewrites; Netlify: `_redirects` → `/* /index.html 200`).

## Structure
- `src/pages/` – Home, About, Projects, ProjectDetail, Lifestyle, Contact
- `src/lib/router.jsx` – lightweight router (`Link`, `navigate`, `useRoute`)
- `src/components/EnquiryModal.jsx` – global enquiry popup; call `openEnquiry({ project, intent })` from any CTA
- `src/data/projects.js` – all project facts, prices, amenities, connectivity, phone & social links (single source of truth)
- `src/components/` – Navbar, Hero, About (+Marquee, Approach), Projects (+modal, at-a-glance), Films, Amenities, WhyChoose, Location, Contact, Footer (+floating actions)
- `src/lib/enquiry.js` – form submission. Set `VITE_ENQUIRY_ENDPOINT` in `.env` to POST leads to a CRM/webhook. Without it, the form opens WhatsApp pre-filled to 8691919169.
- `src/assets/` – logo (light/dark transparent), project renders, amenity stills
- `public/videos/` – compressed walkthrough films + posters

## Before going live
- Add MahaRERA registration numbers per project (footer TODO + project modal).
- Connect the enquiry endpoint and add Meta Pixel / GA4 lead events.
