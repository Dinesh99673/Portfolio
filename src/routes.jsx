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
export const OG_IMAGE = `${SITE_URL}/og.png`;

export const routes = [
  {
    path: "/",
    file: "index.html",
    Component: Home,
    meta: {
      title: "Dinesh Chaudhari — Full-Stack & Embedded Engineer",
      description:
        "Full-stack developer in Pune, available for freelance projects on Upwork. Sole developer of Rabbitship, a logistics platform serving 1,000+ users. Ranked 14th of 3,000 teams at the OpenAI Codex Hackathon.",
      ogDescription:
        "I own products end to end — REST APIs, React apps shipped to Android, and the firmware underneath. Currently building Rabbitship for 1,000+ users.",
    },
  },
  {
    path: "/About",
    file: "About.html",
    Component: About,
    meta: {
      title: "About Dinesh Chaudhari — Full-Stack Developer in Pune",
      description:
        "Background, achievements, education and tech stack of Dinesh Chaudhari: full-stack developer at Innover Labs, lead developer at ProBuilder, MCA student at Manipal.",
    },
  },
  {
    path: "/Project",
    file: "Project.html",
    Component: Project,
    meta: {
      title: "Projects — Dinesh Chaudhari | Web, AI & Embedded Work",
      description:
        "Selected projects by Dinesh Chaudhari across web, AI, embedded and blockchain: Rabbitship, GhostDesk, Gesture-AI and more, with source code, live demos and videos.",
    },
  },
  {
    path: "/Resume",
    file: "Resume.html",
    Component: Resume,
    meta: {
      title: "Resume — Dinesh Chaudhari, Full-Stack & Embedded Engineer",
      description:
        "View or download the resume of Dinesh Chaudhari, a full-stack and embedded engineer in Pune working with React, Node.js, Firebase and ESP32.",
    },
  },
  {
    path: "/Contact",
    file: "Contact.html",
    Component: Contact,
    meta: {
      title: "Contact Dinesh Chaudhari — Hire a Full-Stack Developer",
      description:
        "Get in touch with Dinesh Chaudhari for freelance or full-time work. Send a message, chat on WhatsApp, or hire through Upwork.",
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
