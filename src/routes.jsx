import { matchPath } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About.jsx";
import Project from "./components/Project/Projects.jsx";
import Resume from "./components/Resume/Resume";
import Contact from "./components/Contact/Contact.jsx";

/*
 * Single source of truth for the public routes. Used by:
 *  - App.jsx          → builds <Routes> and keeps <head> in sync on navigation
 *  - entry-server.jsx → renders each route to static HTML at build time
 *  - scripts/prerender.js → decides which files to write and which meta to inject
 *
 * `file` is the HTML file written to dist/. vercel.json rewrites /About to
 * /About.html (the build fails if that rewrite is missing).
 * Adding a page = one entry here + one rewrite in vercel.json + sitemap.xml.
 */
export const SITE_URL = "https://dinesh.probuilder.in";
export const SITE_NAME = "Dinesh Chaudhari";
export const OG_IMAGE = `${SITE_URL}/og.png`;
export const OG_IMAGE_ALT = "Dinesh Chaudhari, Full-Stack Developer in Pune";
export const ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const routes = [
  {
    path: "/",
    file: "index.html",
    Component: Home,
    meta: {
      title: "Dinesh Chaudhari | Full-Stack Developer in Pune",
      description:
        "Full-stack developer in Pune building React, TypeScript and Node.js applications, AI-powered products and modern software solutions.",
    },
  },
  {
    path: "/About",
    file: "About.html",
    Component: About,
    meta: {
      title: "About Dinesh Chaudhari | Full-Stack Developer",
      description:
        "Learn about Dinesh Chaudhari, a full-stack developer from Pune with experience in React, Node.js, Firebase, AI and software development.",
    },
  },
  {
    path: "/Project",
    file: "Project.html",
    Component: Project,
    meta: {
      title: "Projects | Dinesh Chaudhari – Full-Stack Developer",
      description:
        "Explore Dinesh Chaudhari's software projects across full-stack development, AI, web applications and embedded systems.",
    },
  },
  {
    path: "/Resume",
    file: "Resume.html",
    Component: Resume,
    meta: {
      title: "Resume | Dinesh Chaudhari – Full-Stack Developer",
      description:
        "Explore the professional experience, technical skills, education and software development projects of Dinesh Chaudhari.",
    },
  },
  {
    path: "/Contact",
    file: "Contact.html",
    Component: Contact,
    meta: {
      title: "Contact Dinesh Chaudhari | Developer in Pune",
      description:
        "Get in touch with Dinesh Chaudhari for full-stack development, React, Node.js and AI application development opportunities.",
    },
  },
];

export const HOME_ROUTE = routes[0];

/** Absolute canonical URL for a route ("/" → "https://…/"). */
export const canonicalFor = (route) =>
  route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;

/**
 * The route React Router will actually render for a pathname. Mirrors
 * <Routes>: case-insensitive, trailing slash tolerated, and anything
 * unknown falls through to Home (the existing "*" behaviour).
 */
export const resolveRoute = (pathname) =>
  routes.find((r) => matchPath({ path: r.path, end: true }, pathname)) ?? HOME_ROUTE;

/**
 * Every page-specific <head> tag for a route, in one place. Consumed by
 * scripts/prerender.js (static HTML) and HeadSync in App.jsx (client-side
 * navigation), so the two can never drift apart.
 *
 * Each `attr="key"` pair must appear exactly once in index.html; the
 * prerender step fails the build otherwise (which also rules out duplicates).
 * Optional per-route overrides: meta.ogTitle, meta.ogDescription, meta.ogType.
 */
export const headTagsFor = (route) => {
  const { title, description, ogTitle, ogDescription, ogType } = route.meta;
  const url = canonicalFor(route);
  const socialTitle = ogTitle ?? title;
  const socialDescription = ogDescription ?? description;
  return {
    title,
    canonical: url,
    meta: [
      { attr: "name", key: "description", content: description },
      { attr: "name", key: "robots", content: ROBOTS },
      { attr: "property", key: "og:type", content: ogType ?? "website" },
      { attr: "property", key: "og:site_name", content: SITE_NAME },
      { attr: "property", key: "og:locale", content: "en_IN" },
      { attr: "property", key: "og:title", content: socialTitle },
      { attr: "property", key: "og:description", content: socialDescription },
      { attr: "property", key: "og:url", content: url },
      { attr: "property", key: "og:image", content: OG_IMAGE },
      { attr: "property", key: "og:image:width", content: "1200" },
      { attr: "property", key: "og:image:height", content: "630" },
      { attr: "property", key: "og:image:alt", content: OG_IMAGE_ALT },
      { attr: "name", key: "twitter:card", content: "summary_large_image" },
      { attr: "name", key: "twitter:title", content: socialTitle },
      { attr: "name", key: "twitter:description", content: socialDescription },
      { attr: "name", key: "twitter:image", content: OG_IMAGE },
      { attr: "name", key: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
  };
};
