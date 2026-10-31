import { useSyncExternalStore } from 'react'
import { projects } from '../data/projects'

/**
 * Tiny router with two modes:
 *  - 'hash' (default): /#about, /#gps-kewale – works on any static host with zero config.
 *  - 'path' (set VITE_ROUTING=path): /about, /projects/gps-kewale – best for SEO.
 *    Requires the host to rewrite all routes to index.html (Vercel/Netlify do this with one rule).
 */
const MODE = import.meta.env.VITE_ROUTING === 'path' ? 'path' : 'hash'
const PAGES = ['home', 'about', 'projects', 'lifestyle', 'contact']
const projectIds = projects.map((p) => p.id)

export function toUrl(route) {
  if (MODE === 'hash') return route === 'home' ? '#home' : `#${route}`
  if (route === 'home') return '/'
  if (projectIds.includes(route)) return `/projects/${route}`
  return `/${route}`
}

function read() {
  let key
  if (MODE === 'hash') key = window.location.hash.replace(/^#\/?/, '')
  else key = window.location.pathname.replace(/^\/+|\/+$/g, '').replace(/^projects\//, '')
  key = key || 'home'
  return PAGES.includes(key) || projectIds.includes(key) ? key : 'home'
}

function subscribe(cb) {
  window.addEventListener('hashchange', cb)
  window.addEventListener('popstate', cb)
  window.addEventListener('sara:navigate', cb)
  return () => {
    window.removeEventListener('hashchange', cb)
    window.removeEventListener('popstate', cb)
    window.removeEventListener('sara:navigate', cb)
  }
}

export function useRoute() {
  return useSyncExternalStore(subscribe, read, () => 'home')
}

export function navigate(route) {
  if (read() === route) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  if (MODE === 'hash') window.location.hash = route === 'home' ? 'home' : route
  else { window.history.pushState({}, '', toUrl(route)); window.dispatchEvent(new Event('sara:navigate')) }
}

export function Link({ to, children, className = '', onClick, ...rest }) {
  return (
    <a
      href={toUrl(to)}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        onClick?.(e)
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

export const isProjectRoute = (r) => projectIds.includes(r)
