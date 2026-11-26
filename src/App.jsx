import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import './App.css';
import { routes, HOME_ROUTE, resolveRoute, canonicalFor } from "./routes.jsx";

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
    const route = resolveRoute(pathname);
    const { title, description, ogDescription } = route.meta;
    const url = canonicalFor(route);
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", ogDescription ?? description);
    setMeta('meta[property="og:url"]', "content", url);
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
      <Navbar/>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<HOME_ROUTE.Component />} />
      </Routes>
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
