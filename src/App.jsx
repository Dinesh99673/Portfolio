import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import './App.css';
import { routes, NOT_FOUND_ROUTE, resolveRoute, headTagsFor } from "./routes.jsx";

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/*
 * Keeps <head> in step with client-side navigation. The prerendered HTML
 * already carries the right tags for the first page; this only matters
 * once the visitor moves between routes without a full page load.
 */
function HeadSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const head = headTagsFor(resolveRoute(pathname));
    document.title = head.title;
    setMeta('link[rel="canonical"]', "href", head.canonical);
    for (const { attr, key, content } of head.meta) {
      setMeta(`meta[${attr}="${key}"]`, "content", content);
    }
  }, [pathname]);
  return null;
}

/*
 * Everything inside the router. Shared by the browser entry (BrowserRouter)
 * and the build-time renderer (StaticRouter) so both produce identical markup.
 */
export function AppShell() {
  return (
    <div className="App min-h-screen">
      <HeadSync />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-copper focus:text-ink focus:font-semibold focus:px-4 focus:py-2 focus:rounded-sm"
      >
        Skip to content
      </a>
      <Navbar/>
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Pages other than Home are separate chunks (routes.jsx). Navigation
            runs in a transition, so the current page stays up while the next
            chunk loads; this fallback only shows on a cold load that was not
            preloaded (never on the prerendered first page). */}
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} caseSensitive element={<Component />} />
            ))}
            <Route path="*" element={<NOT_FOUND_ROUTE.Component />} />
          </Routes>
        </Suspense>
      </main>
      <Footer/>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}

export default App
