import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

/*
 * Hydrate only when the static HTML was rendered for exactly the route React
 * is about to render. Vercel serves the home page's HTML for unknown or
 * differently-cased paths (e.g. /about, /missing). Even when React would
 * also render Home there, the navbar's active-link state differs, so those
 * render from scratch, exactly as before prerendering existed.
 * In `npm run dev` the root is empty, so this also falls back to createRoot.
 */
if (container.hasChildNodes() && container.dataset.prerendered === window.location.pathname) {
  hydrateRoot(container, app)
} else {
  container.textContent = ''
  createRoot(container).render(app)
}
