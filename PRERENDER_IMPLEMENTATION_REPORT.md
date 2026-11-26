# Prerender Implementation Report

**Date:** 2026-11-26
**Site:** https://dinesh.probuilder.in
**Stack:** React 18.3 · Vite 6 · React Router DOM v7 (library mode) · Vercel
**New dependencies:** none

---

## 1. Summary

All five public routes (`/`, `/About`, `/Project`, `/Resume`, `/Contact`) are now prerendered to static HTML at build time. Each file contains the real page content, navigation links, one correct `<h1>`, and its own title, description, canonical URL and Open Graph tags. In the browser, React **hydrates** that markup instead of replacing it.

Verification was done in a real headless Chrome against the built output, not just by checking that the build succeeds. The production build passed 55 of 55 checks, and so did a React *development* build, which reports every hydration mismatch.

| | Before | After |
|---|---|---|
| Words of body text without JS | 0 on every route | 570 · 320 · 826 · 46 · 74 |
| Internal `<a href>` links without JS | 0 | 6+ per page (navbar, logo, CTAs) |
| `<title>` / canonical | identical on all routes (canonical → `/`) | unique per route, canonical → self |
| `<h1>` | Home only | exactly one on every route |
| Main JS bundle | 842 KB, single file (per SEO audit) | 294 KB; the PDF viewer (375 KB) and GitHub calendar (176 KB) are now lazy chunks |

---

## 2. Architecture

```
            src/routes.jsx  ← single source of truth: path, component, file, meta
             │          │
   ┌─────────┘          └──────────────┐
   ▼                                   ▼
src/App.jsx  (AppShell)            src/entry-server.jsx
 • builds <Routes> from config      • <StaticRouter location={url}><AppShell/>
 • HeadSync updates <head> on       • renderToString()
   client-side navigation                   │
   │                                        ▼
   ▼                               scripts/prerender.js
src/main.jsx                        • reads dist/index.html (client build template)
 • hydrateRoot() when the served    • per route: inject HTML into #root,
   HTML belongs to this exact path    rewrite title/description/canonical/og:*
 • createRoot() otherwise           • writes dist/index.html, About.html, …
                                    • checks vercel.json has a rewrite per route
```

### Build pipeline (`npm run build`)

1. `vite build`: the normal client build into `dist/`, unchanged.
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr`: a small Node bundle of the same components. Asset imports resolve to the same hashed `/assets/…` URLs as the client build.
3. `node scripts/prerender.js`: renders each route and writes the HTML files, then deletes `dist-ssr/`, so only `dist/` is deployed.

The script **fails the build** in three cases: a `<head>` tag it needs to replace is missing from the template, a route renders suspiciously little HTML, or `vercel.json` lacks the rewrite for a route.

### Hydration safety

`#root` is written as `<div id="root" data-prerendered="/About">`. [src/main.jsx](src/main.jsx) hydrates only when `data-prerendered === location.pathname`, an exact, case-sensitive match. Every other case renders from scratch, which is exactly how the site behaved before. Those cases are:
- unknown URLs (`/missing`), where Vercel serves the Home HTML
- `/about` (wrong case) and `/About/` (trailing slash)
- `npm run dev`, where the root is empty

This rule came out of testing. The development build showed that hydrating Home markup at an unknown URL produces a NavLink `active` class mismatch, which React 18 does not repair in production.

### Browser-only dependencies

| Dependency | Handling |
|---|---|
| `react-pdf` / `pdf.js` | Moved into [ResumeViewer.jsx](src/components/Resume/ResumeViewer.jsx) and loaded with `React.lazy` inside [`<ClientOnly>`](src/components/ClientOnly.jsx). The server and the first client render both output the same spinner. The module is never imported during prerendering. |
| `react-github-calendar` | Same pattern in [Github.jsx](src/components/About/Github.jsx). The prerendered placeholder is a "Loading contributions from github.com/Dinesh99673…" link. |
| Microsoft Clarity | Stays as an inline script in `index.html`. The prerender copies the template's `<head>` and never executes it. `trackUpwork()` already guards `window`. |
| `HoverPortrait`, `Experience` carousel, `Navbar` menu, `Contact` form | Use `window`/DOM only inside event handlers, so they are safe to render on the server without changes. |
| `new Date().getFullYear()` in the footer | `suppressHydrationWarning` on that one `<p>`, for a build made in one year and served in the next. |

### Vercel routing

[vercel.json](vercel.json) rewrites `/About`, `/Project`, `/Resume` and `/Contact` to their `.html` files. `/` is served by `dist/index.html` directly. The existing `/(.*) → /index.html` catch-all stays last for unknown paths.

`cleanUrls` was considered and **rejected**: it 308-redirects every `*.html` URL, which would include the Google Search Console verification file `googlee6a1840974c6c668.html`.

---

## 3. Files created and modified

### Created
| File | Purpose |
|---|---|
| [src/routes.jsx](src/routes.jsx) | Route config: path, component, output file, per-route SEO meta; `canonicalFor()`, `resolveRoute()` |
| [src/entry-server.jsx](src/entry-server.jsx) | Build-time `render(url)` using `StaticRouter` + `renderToString` |
| [scripts/prerender.js](scripts/prerender.js) | Writes per-route HTML, injects meta, validates template and `vercel.json` |
| [src/components/ClientOnly.jsx](src/components/ClientOnly.jsx) | Renders a fallback on the server and during hydration, then the children after mount |
| [src/components/Resume/ResumeViewer.jsx](src/components/Resume/ResumeViewer.jsx) | The react-pdf viewer, moved unchanged out of `Resume.jsx` |
| [src/components/Resume/PdfSpinner.jsx](src/components/Resume/PdfSpinner.jsx) | Spinner shared by the placeholder and react-pdf's loading state |

### Modified
| File | Change |
|---|---|
| [src/App.jsx](src/App.jsx) | Exports `AppShell` (shared by browser and server); `<Routes>` built from config; `HeadSync` updates title, description, canonical and og tags on client navigation. Same DOM structure as before. |
| [src/main.jsx](src/main.jsx) | `hydrateRoot` versus `createRoot` decision |
| [src/components/Resume/Resume.jsx](src/components/Resume/Resume.jsx) | Static shell (H1, download buttons) plus lazy `ResumeViewer` |
| [src/components/About/Github.jsx](src/components/About/Github.jsx) | Calendar wrapped in `ClientOnly` + `lazy` |
| [src/components/SectionHeading.jsx](src/components/SectionHeading.jsx) | Optional `as` prop (default `h2`) |
| [AboutCard.jsx](src/components/About/AboutCard.jsx), [Projects.jsx](src/components/Project/Projects.jsx), [Contact.jsx](src/components/Contact/Contact.jsx) | First heading uses `as="h1"`. Same classes, same look. |
| [Projects.jsx](src/components/Project/Projects.jsx) | "Featured" / "More projects" labels changed from `<p>` to `<h2>` with identical classes, so H1 → H2 → H3 doesn't skip a level. Tailwind preflight resets heading styles, so there is no visual change. |
| [src/components/Footer.jsx](src/components/Footer.jsx) | `suppressHydrationWarning` on the year |
| [package.json](package.json) | `build` runs the three steps; `build:client` = plain `vite build` |
| [vercel.json](vercel.json) | Per-route rewrites ahead of the SPA catch-all |

**Not changed:** visual design, copy, animations, `index.html` (it is still the template, and its tags remain the Home defaults), `sitemap.xml`, `robots.txt`, `llms.txt`.

---

## 4. Build verification

`npm run build` output (abridged):

```
✓ built in 7.35s                                   (client)
dist-ssr/entry-server.js  74.35 kB  ✓ built in 1.80s   (server)
[prerender] /         → dist/index.html    (28.9 KB of HTML)
[prerender] /About    → dist/About.html    (95.2 KB of HTML)
[prerender] /Project  → dist/Project.html  (47.0 KB of HTML)
[prerender] /Resume   → dist/Resume.html   (11.5 KB of HTML)
[prerender] /Contact  → dist/Contact.html  (14.2 KB of HTML)
```

`dist/` contains `index.html`, `About.html`, `Project.html`, `Resume.html`, `Contact.html`, plus the untouched Google verification file. `dist-ssr/` is removed after prerendering.

The guard was tested by deleting the `/Contact` rewrite from `vercel.json`. The build failed with:
`vercel.json needs { "source": "/Contact", "destination": "/Contact.html" } before the "/(.*)" catch-all`.

Lint: `eslint .` reports 34 errors versus 35 at `HEAD`. All remaining errors are pre-existing patterns (unused `React` imports, no PropTypes); none are new.

---

## 5. HTML verification (raw files, no JavaScript)

Extracted from `dist/*.html` with scripts stripped:

| File | `<title>` | canonical / og:url | `<h1>` | Words | Headings |
|---|---|---|---|---|---|
| index.html | Dinesh Chaudhari — Full-Stack & Embedded Engineer | `/` | I build products from firmware to frontend. | 570 | 1 h1 · 3 h2 · 1 h3 |
| About.html | About Dinesh Chaudhari — Full-Stack Developer in Pune | `/About` | Background | 320 | 1 h1 · 4 h2 |
| Project.html | Projects — Dinesh Chaudhari \| Web, AI & Embedded Work | `/Project` | Selected work | 826 | 1 h1 · 2 h2 · 13 h3 |
| Resume.html | Resume — Dinesh Chaudhari, Full-Stack & Embedded Engineer | `/Resume` | Resume | 46 | 1 h1 |
| Contact.html | Contact Dinesh Chaudhari — Hire a Full-Stack Developer | `/Contact` | Get in touch | 74 | 1 h1 |

Every file contains:
- `<header>` with `<nav>`, and real `<a href>` links to `/`, `/About`, `/Project`, `/Resume`, `/Contact`. The current page carries `aria-current="page"`.
- `<footer>` with social links; `<section>` wrappers where the components already used them.
- Unique `og:title`, `og:description` and `og:url`. The `Person` JSON-LD, `og:image` and Clarity script are kept from the template.
- `data-prerendered="<path>"` on `#root`.

The Vite preview server served each route with the correct file (`curl` showed the matching `<title>` and `data-prerendered`).

---

## 6. Browser verification (headless Chrome, DevTools Protocol)

A throwaway test script (not committed) loaded the built site from `vite preview` and checked each URL. It recorded console errors and warnings, uncaught exceptions and failed network requests, and used a `MutationObserver` to detect whether React kept the server markup (hydration) or replaced it.

| Route | Result |
|---|---|
| `/` | Hydrated ✔ · mobile menu toggles ✔ · navbar click → `/About` without a page reload ✔ · `<title>` and canonical updated after navigation ✔ · Clarity loaded ✔ · 0 console errors |
| `/About` | Hydrated ✔ · GitHub calendar rendered ("1059 contributions in the last year") ✔ · 0 console errors |
| `/Project` | Hydrated ✔ · "Embedded" filter: 13 → 5 cards, `aria-pressed` updated ✔ · 0 console errors |
| `/Resume` | Hydrated ✔ · PDF viewer rendered 2 pages, 681 text-layer spans, 9 live links ✔ · 2 download buttons ✔ · 0 console errors |
| `/Contact` | Hydrated ✔ · typing updates the controlled input and the WhatsApp link ✔ · 0 console errors (the form was **not** submitted, to avoid sending a real email) |
| `/does-not-exist`, `/About/`, `/about` | Correctly *not* hydrated; rendered fresh with the right page, H1 and canonical ✔ · 0 console errors |

**Production build: 55 of 55 checks passed. React development build: 55 of 55 checks passed, with zero hydration warnings.**
`npm run dev`: all features work with 0 console errors. It uses `createRoot`, as before.

---

## 7. Known limitations

1. **The Resume page has little indexable text (46 words).** The resume content lives inside the PDF, which is rendered client-side. The prerendered page links to the PDF (`Download CV`), and Google indexes PDFs on their own. Adding an HTML summary of the resume would be a content change, so it was left out.
2. **The H1 text is the existing visible heading.** On About the H1 is "Background", and on Projects it is "Selected work". These are correct structurally but weak as keywords. Changing the copy (for example "About Dinesh Chaudhari") is a content decision.
3. **Unknown URLs still return HTTP 200** with the Home HTML (soft 404). This is unchanged from before and is a separate fix: a real 404 page plus removing the catch-all.
4. **Paths are case-sensitive on Vercel's filesystem, but the rewrite matching may not be.** `/about` gets either the Home HTML or `About.html`. Either way the client renders About correctly, because it does a fresh render rather than a hydration. Canonical tags point to `/About`.
5. **GitHub calendar and PDF are not in the static HTML.** That is by design, since both need the browser. Crawlers see a labelled placeholder and link instead.
6. **Per-route metadata lives in `src/routes.jsx`, and `index.html` holds the defaults.** When adding a route, add an entry there, a rewrite in `vercel.json` (the build enforces this), and a `sitemap.xml` entry.
7. **The Vercel routing was not run locally.** `vercel dev` was not used; local tests used `vite preview`. Check routing after deploy with the commands below.

---

## 8. Manual testing instructions

### Local
```bash
npm run build
npx vite preview            # http://localhost:4173
```
1. In Chrome, open each route, then **DevTools → Console**. There should be no errors.
2. **View Source** (Ctrl+U, not Inspect) on each route. The page text, `<h1>` and nav links should be in the raw HTML, and `<title>`/canonical should match the route.
3. Disable JavaScript (DevTools → ⌘/Ctrl+Shift+P → "Disable JavaScript") and reload each route. The content should be readable and the nav links should work as normal page loads.
4. With JS on: use the project filters, open and close the mobile menu (narrow window), fill the contact form, confirm the resume PDF renders with clickable links, and check the GitHub calendar on `/About`.
5. Hover and tap the portrait on Home, and swipe the Experience cards. The animations should be unchanged.

### After deploying to Vercel
```bash
for p in / /About /Project /Resume /Contact; do
  printf "%-9s " "$p"; curl -s "https://dinesh.probuilder.in$p" | grep -o '<title>[^<]*\|data-prerendered="[^"]*"' | tr '\n' ' '; echo
done
curl -sI https://dinesh.probuilder.in/googlee6a1840974c6c668.html | head -1   # expect 200, not a redirect
```
Each route should print its own title and a matching `data-prerendered`. Then:
- **Google Search Console → URL Inspection → Test Live URL** for each route. The rendered HTML and the user-declared canonical should match the route.
- Request re-indexing for `/About`, `/Project`, `/Resume` and `/Contact`. Their canonical previously pointed to `/`.
