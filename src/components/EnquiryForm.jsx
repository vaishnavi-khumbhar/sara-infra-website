import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import { projects, PHONE, PHONE_DISPLAY } from '../data/projects'
import { submitEnquiry } from '../lib/enquiry'
import { ease } from './ui'

const INTENTS = ['Site Visit', 'Cost Sheet', 'Brochure', 'Callback']

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  const digits = v.phone.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '')
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a valid 10-digit Indian mobile number.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address.'
  if (!v.project) e.project = 'Please choose a project.'
  return e
}

function Field({ label, error, children, id }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[12px] text-red-700">{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = (err) =>
  `w-full border-0 border-b bg-transparent px-0 py-2.5 text-[15px] text-ink placeholder:text-charcoal/35 transition-colors focus:outline-none focus:ring-0 ${err ? 'border-red-600' : 'border-ink/20 focus:border-gold'}`

export default function EnquiryForm({ defaultProject = '', defaultIntent = 'Site Visit', idPrefix = 'f', title = 'Request a callback', subtitle }) {
  const empty = { name: '', phone: '', email: '', project: defaultProject, message: '', intent: defaultIntent }
  const [v, setV] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)

  useEffect(() => { setV((s) => ({ ...s, project: defaultProject || s.project, intent: defaultIntent || s.intent })) }, [defaultProject, defaultIntent])

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const er = validate(v)
    setErrors(er)
    if (Object.keys(er).length) return
    setStatus('loading')
    try {
      const projectName = projects.find((p) => p.id === v.project)?.name || 'General enquiry'
      const r = await submitEnquiry({ ...v, projectName, message: `[${v.intent}] ${v.message}`.trim() })
      setResult(r)
      setStatus('success')
      setV({ ...empty, project: defaultProject })
    } catch {
      setStatus('error')
    }
  }

  const id = (n) => `${idPrefix}-${n}`

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ ease }} className="flex min-h-[380px] flex-col items-center justify-center text-center" role="status">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}>
            <CheckCircle2 size={56} strokeWidth={1.2} className="text-gold" />
          </motion.span>
          <h3 className="mt-6 text-4xl">Thank you.</h3>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-charcoal/75">
            {result?.channel === 'whatsapp'
              ? 'WhatsApp has opened with your enquiry filled in. Tap send to reach the Sara Infra team, or call us directly.'
              : 'Your enquiry has been received. The Sara Infra team will get in touch with you shortly.'}
          </p>
          <a href={`tel:${PHONE}`} className="mt-6 text-sm font-semibold text-gold-dark">Call {PHONE_DISPLAY}</a>
          <button onClick={() => setStatus('idle')} className="link-underline mt-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink">Send another enquiry</button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <h3 className="text-3xl sm:text-4xl">{title}</h3>
            <p className="mt-2 text-sm text-charcoal/60">{subtitle || 'Fields marked * are required.'}</p>
          </div>
          <div className="sm:col-span-2">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">I'd like a</span>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Enquiry type">
              {INTENTS.map((t) => (
                <button type="button" role="radio" aria-checked={v.intent === t} key={t} onClick={() => setV((s) => ({ ...s, intent: t }))}
                  className={`border px-4 py-2 text-[12px] font-semibold transition-all duration-300 ${v.intent === t ? 'border-gold bg-gold text-white' : 'border-ink/15 text-charcoal hover:border-gold'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <Field label="Full Name *" error={errors.name} id={id('name')}>
            <input id={id('name')} autoComplete="name" value={v.name} onChange={set('name')} className={inputCls(errors.name)} placeholder="Your name" aria-invalid={!!errors.name} />
          </Field>
          <Field label="Phone Number *" error={errors.phone} id={id('phone')}>
            <input id={id('phone')} type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} className={inputCls(errors.phone)} placeholder="10-digit mobile" aria-invalid={!!errors.phone} />
          </Field>
          <Field label="Email Address *" error={errors.email} id={id('email')}>
            <input id={id('email')} type="email" autoComplete="email" value={v.email} onChange={set('email')} className={inputCls(errors.email)} placeholder="you@example.com" aria-invalid={!!errors.email} />
          </Field>
          <Field label="Project of Interest *" error={errors.project} id={id('project')}>
            <select id={id('project')} value={v.project} onChange={set('project')} className={`${inputCls(errors.project)} cursor-pointer`} aria-invalid={!!errors.project}>
              <option value="">Select a project</option>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name} – {p.location}</option>)}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Message" id={id('msg')}>
              <textarea id={id('msg')} rows={2} value={v.message} onChange={set('message')} className={`${inputCls(false)} resize-none`} placeholder="Configuration, budget, preferred visit date…" />
            </Field>
          </div>
          {status === 'error' && (
            <p className="flex items-center gap-2 text-sm text-red-700 sm:col-span-2" role="alert"><AlertCircle size={16} /> Something went wrong. Please try again or call {PHONE_DISPLAY}.</p>
          )}
          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-[11px] leading-relaxed text-charcoal/50">By submitting, you agree to be contacted by Sara Infra about your enquiry.</p>
            <button type="submit" disabled={status === 'loading'} className="btn-gold group disabled:opacity-70">
              {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
              <span>{status === 'loading' ? 'Submitting…' : 'Submit Enquiry'}</span>
              {status !== 'loading' && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
