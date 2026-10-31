import { PHONE } from '../data/projects'

/**
 * Enquiry submission — integration-ready.
 *
 * 1. If VITE_ENQUIRY_ENDPOINT is set (e.g. a CRM webhook, Google Apps Script,
 *    Formspree, Zapier/Make, or your own API), the enquiry is POSTed there as JSON.
 * 2. Otherwise, as an interim channel, WhatsApp opens with the enquiry pre-filled
 *    for the visitor to send to the Sara Infra number. Nothing is "silently" sent.
 *
 * Set the endpoint in a .env file at the project root:
 *   VITE_ENQUIRY_ENDPOINT=https://your-endpoint.example.com/enquiry
 */
export async function submitEnquiry(data) {
  const payload = {
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    project: data.projectName,
    message: data.message.trim(),
    source: 'sara-infra-website',
    page: typeof window !== 'undefined' ? window.location.href : '',
    submittedAt: new Date().toISOString(),
  }

  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`Enquiry failed: ${res.status}`)
    return { channel: 'api' }
  }

  const text =
    `Hello Sara Infra, I'd like to enquire about ${payload.project}.\n` +
    `Name: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}` +
    (payload.message ? `\nMessage: ${payload.message}` : '')
  await new Promise((r) => setTimeout(r, 600))
  window.open(`https://wa.me/91${PHONE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  return { channel: 'whatsapp' }
}
