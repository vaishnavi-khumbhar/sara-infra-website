import { motion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </M>
  )
}

export function ImageReveal({ src, alt, className = '', imgClassName = '', eager = false }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.6, ease }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 origin-right bg-ivory"
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease }}
      />
    </div>
  )
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', dark = false }) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <Reveal className={`mb-5 flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
        <span className="gold-line" />
        <span className="eyebrow">{eyebrow}</span>
        {center && <span className="gold-line" />}
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[4rem] ${dark ? 'text-ivory' : ''}`}>{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p className={`mt-6 text-[15px] leading-relaxed sm:text-base ${dark ? 'text-ivory/70' : 'text-charcoal/75'} ${center ? 'mx-auto max-w-2xl' : ''}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 72
  window.scrollTo({ top, behavior: 'smooth' })
}

export function Facebook({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.5V21h3z" />
    </svg>
  )
}

export function Instagram({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Renders a large price like "₹27 Lakh*" without the asterisk (the disclaimer stays in the footer). */
export function Price({ value, className = '' }) {
  return <span className={className}>{value ? value.replace(/\*$/, '') : 'On Request'}</span>
}
