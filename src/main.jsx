import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NOT_FOUND_ROUTE, resolveRoute } from './routes.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

/*
 * Hydrate only when the static HTML was rendered for exactly the route React
 * is about to render:
 *  - a page file (data-prerendered="/About") on its own path, or
 *  - 404.html (data-prerendered="*"), which Vercel serves for any unknown
 *    path, when React will also render the Not Found page there.
 * Anything else renders from scratch. In `npm run dev` the root is empty,
 * so this also falls back to createRoot.
 */
const { pathname } = window.location
const marker = container.dataset.prerendered
const route = resolveRoute(pathname)
const matchesMarkup =
  marker === pathname || (marker === NOT_FOUND_ROUTE.path && route === NOT_FOUND_ROUTE)

/*
 * The current page's chunk is already in flight (prerender.js emits a
 * modulepreload for it), so awaiting it here costs no extra round trip and
 * lets hydration render synchronously, matching the static HTML.
 */
const start = async () => {
  if (container.hasChildNodes() && matchesMarkup) {
    await route.Component.preload?.()
    hydrateRoot(container, app)
  } else {
    container.textContent = ''
    createRoot(container).render(app)
  }
}

// Other pages' chunks are fetched (not executed) via <link rel="prefetch">
// tags that prerender.js adds to every page, so navigation stays instant.
start()
