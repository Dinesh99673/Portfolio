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
const matchesMarkup =
  marker === pathname ||
  (marker === NOT_FOUND_ROUTE.path && resolveRoute(pathname) === NOT_FOUND_ROUTE)

if (container.hasChildNodes() && matchesMarkup) {
  hydrateRoot(container, app)
} else {
  container.textContent = ''
  createRoot(container).render(app)
}
