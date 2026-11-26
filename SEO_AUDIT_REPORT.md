# SEO Audit Report — dinesh.probuilder.in

**Audit date:** 2026-11-26
**Scope:** Full repository (`main` @ `a778ee7` + working tree) and the live production site
**Method:** Source code review, production build analysis (`vite build`), live HTTP checks with `curl`, and local Lighthouse 12 runs (headless Chrome) against production
**Changes made to source code:** None. This is an audit only.

---

## How to read this report

Every finding is tagged with how it was verified:

| Tag | Meaning |
|---|---|
| **[CODE]** | Found by reading the source code |
| **[LIVE]** | Confirmed on the live site (HTTP response, served HTML, or Lighthouse run against production) |
| **[EXTERNAL]** | Can't be confirmed from here. Needs Google Search Console, Bing Webmaster Tools, or field data |

The live site is running the current code. The production JS bundle hash (`index-CpdalKiO.js`) matches a local build of this working tree, so code findings apply directly to production.

---

## 1. Project overview

| Item | Finding |
|---|---|
| Framework | React 18.3 + Vite 6 ([package.json](package.json)) |
| Routing | `react-router-dom` v7 in library mode with `BrowserRouter` ([src/App.jsx:18-29](src/App.jsx#L18-L29)) |
| Rendering | **Client-side rendering only.** [index.html:48](index.html#L48) ships an empty `<div id="root"></div>`. No SSR, SSG or prerendering. |
| Styling | Tailwind 3 + Google Fonts (IBM Plex Sans, JetBrains Mono) |
| Hosting | Vercel. [vercel.json](vercel.json) rewrites every path to `/index.html`. |
| Public routes | `/`, `/About`, `/Project`, `/Resume`, `/Contact`. A catch-all `*` renders Home ([src/App.jsx:26](src/App.jsx#L26)). |
| Existing SEO | Static title, description, canonical, Open Graph and Twitter tags, `Person` JSON-LD ([index.html:7-34](index.html#L7-L34)); [robots.txt](public/robots.txt), [sitemap.xml](public/sitemap.xml), [llms.txt](public/llms.txt), Google verification file |
| Analytics | Microsoft Clarity inline in `<head>` ([index.html:38-45](index.html#L38-L45)) |
| Third-party runtime calls | Google Fonts, Clarity, Web3Forms (contact form), YouTube embeds (no-cookie), GitHub contributions API (via `react-github-calendar`) |

**The root cause behind most findings:** all five routes are served the *same* `index.html`. The title, description, canonical, `og:url` and JSON-LD come from that one static file, and the page body is empty until JavaScript runs. Fixing this one architectural point (prerendering with per-route metadata) resolves or reduces about half the issues below.

---

## 2. Executive summary

The **content is strong**: specific, technical, measurable, and written in a clear human voice. Rabbitship, GhostDesk and Gesture-AI are described with real engineering detail: idempotent webhooks, CRDT sync, LSTM sample counts. There is no keyword stuffing. Crawler access is open, HTTPS is correct, and a sitemap and Person schema exist.

The **delivery of that content to crawlers is the problem**:

1. **Every page tells Google it is a duplicate of the homepage.** All routes serve `<link rel="canonical" href="https://dinesh.probuilder.in/">`, so Google is being asked to drop `/About`, `/Project`, `/Resume` and `/Contact` from the index in favour of `/`. Confirmed live; Lighthouse flags it on `/Project`.
2. **Every page has the same title and description.**
3. **Without JavaScript, every page has 0 words of body text and 0 links.** Googlebot renders JavaScript, so Google can still read the content, though more slowly. Most AI crawlers, including OAI-SearchBot, GPTBot, ClaudeBot and PerplexityBot, are widely reported not to execute JavaScript. They see only the `<head>` metadata.
4. **Every URL returns HTTP 200**, including ones that don't exist, which produces soft 404s.
5. **Mobile performance is mediocre** (Lighthouse mobile 59): render-blocking Google Fonts, a single 842 KB JS bundle that includes the PDF viewer on every page, and Clarity blocking the main thread.

**Overall SEO health: 61 / 100.** Solid foundations and good content, held back by a client-side-only architecture and a site-wide canonical bug.

---

## 3. SEO scorecard

**Scoring method.** Each category starts at 100. Each issue that affects it deducts points by severity: **Critical −25, High −12, Medium −6, Low −2**. An issue can count in more than one category when it genuinely harms both; for example, empty HTML hurts both AI search and crawlability. Performance uses measured Lighthouse data instead, weighted 70% mobile and 30% desktop because Google indexes mobile-first.

| Category | Score | Deductions |
|---|---|---|
| Technical SEO | **51** | Site-wide root canonical (−25), soft 404s / catch-all 200 (−12), duplicate `*.vercel.app` host (−6), case-variant URLs return 200 (−2), missing security headers (−2), missing assets return HTML 200 (−2) |
| On-page SEO | **47** | Identical title and description on all routes (−25), no H1 on 4 of 5 pages (−12), title doesn't match the target role or location (−6), `og:url` always points to root (−6), description ~205 chars (−2), no `<main>` / weak semantic structure (−2) |
| Content SEO | **76** | Second experience entry missing from the DOM (−6), Resume page is a canvas-rendered PDF with almost no HTML text (−6), "firmware to frontend" positioning vs. full-stack targets (−6), thin Contact page (−2), some generic paragraphs (−2), DSigniteFitness entry has no dates (−2) |
| Structured Data | **76** | No `WebSite` (−6), no `ProfilePage` (−6), missing `worksFor`/`alumniOf`/`addressRegion` (−6), `image` is a social card, not a photo (−2), no `@id` entity linking (−2), `jobTitle` inconsistent with the target role (−2) |
| AI Search Optimization | **51** | No body content without JS (−25), identical per-page metadata (−12), experience entry hidden (−6), identity inconsistency (−6) |
| Performance | **70** | Measured: mobile 59, desktop 96 → 0.7×59 + 0.3×96 ≈ 70 |
| Local SEO | **72** | Content invisible to non-JS crawlers (−12), location missing from title (−6), services and availability not stated in text (−6), no `addressRegion` (−2), Contact page has no location or working-mode line (−2) |
| Crawlability & Indexability | **43** | Root canonical on every page (−25), empty HTML body (−12), soft 404s (−12), duplicate `*.vercel.app` host (−6), case-variant duplicates (−2) |
| **Overall (mean)** | **61** | |

---

## 4. Measured data (Lighthouse 12, local, against production)

These are **lab measurements** from single runs on this machine with Lighthouse's default throttling. They are not Core Web Vitals field data. PageSpeed Insights' public API was over its daily quota during the audit, so local Lighthouse was used instead. Results vary between runs; re-check on [pagespeed.web.dev](https://pagespeed.web.dev).

| Metric | Mobile `/` | Desktop `/` |
|---|---|---|
| Performance | **59** | 96 |
| Accessibility | 100 | — |
| Best Practices | 79 | — |
| SEO | 100 (`/Project`: **92**, canonical failure) | 100 |
| First Contentful Paint | 3.6 s | 0.8 s |
| Largest Contentful Paint | **4.4 s** (H1 text) | 1.3 s (toon portrait image) |
| Total Blocking Time (INP proxy) | 400 ms | 10 ms |
| Cumulative Layout Shift | **0.176** (badge row) | 0.015 |
| Time to Interactive | 5.4 s | — |
| Render-blocking savings | 1,110 ms (Google Fonts CSS) | 300 ms |
| Unused JS on Home | 157 KiB | 157 KiB |
| Image savings available | ~285 KiB | ~271 KiB |

**INP** can't be measured in the lab. TBT is a rough proxy. Real INP needs CrUX field data. A low-traffic personal site may not have enough CrUX data to report any.

Lighthouse's SEO score of 100 on the homepage **does not mean SEO is fine**. Lighthouse runs a small set of checks after rendering JavaScript. It doesn't test per-route metadata or non-JS crawlers, and it only flags the canonical problem on non-root pages.

---

## 5. Issues found

### Critical

#### C1. Every page declares the homepage as its canonical URL — [LIVE] [CODE]
- **File:** [index.html:9](index.html#L9), also `og:url` at [index.html:32](index.html#L32)
- **Evidence:** `curl https://dinesh.probuilder.in/About` returns `<link rel="canonical" href="https://dinesh.probuilder.in/">`. Lighthouse on `/Project`: *"Points to the domain's root URL (the homepage), instead of an equivalent page of content."*
- **Why it matters:** A canonical tag tells Google which URL is the real version of a page. Google treats it as a strong signal, so `/About`, `/Project`, `/Resume` and `/Contact` are likely to be folded into `/` and not indexed separately. The Projects page, your strongest evidence of expertise, may never appear in search results on its own. This is probably the cause of any "Duplicate, Google chose different canonical" or "Alternate page with proper canonical tag" statuses in GSC.
- **Fix:** Each route must serve its own self-referencing canonical, e.g. `https://dinesh.probuilder.in/Project`. The robust fix is prerendering (see P0-1). A JS-injected canonical is a weaker fallback: Google processes canonicals from rendered HTML but recommends having them in the initial HTML.

#### C2. Identical title and meta description on every route — [LIVE] [CODE]
- **File:** [index.html:7-8](index.html#L7-L8). There is no `document.title` or head management anywhere in `src/`.
- **Why it matters:** Search results show the same "Dinesh Chaudhari — Full-Stack & Embedded Engineer" for five different pages. Google may rewrite them, and AI crawlers that read only HTML can't tell the pages apart.
- **Fix:** Per-route `<title>`, `<meta name="description">`, canonical and `og:*` tags, written into each prerendered HTML file. Suggested values are in [§8](#8-suggested-per-page-metadata).

#### C3. No body content or links without JavaScript — [LIVE] [CODE]
- **File:** [index.html:48](index.html#L48), [vercel.json:3-5](vercel.json#L3-L5)
- **Evidence:** Served HTML for `/Project` has **0 visible words and 0 `<a>` links** in `<body>`.
- **Why it matters:**
  - **Googlebot** renders JavaScript, so Google sees the content, but rendering is queued and can lag the initial crawl.
  - **Bingbot** renders JavaScript, but less reliably and less often.
  - **OAI-SearchBot, GPTBot, ClaudeBot and PerplexityBot** are widely reported (e.g. Vercel/MERJ crawler research, 2024) to fetch raw HTML without executing JavaScript. They see your name, a 205-character description and the JSON-LD, and none of your experience, projects or skills.

  This is the single biggest barrier to AI search discoverability.
- **Fix:** Prerender all five routes to static HTML at build time (P0-1). This needs no server, and Vercel serves the files as-is.

### High

#### H1. Soft 404s: every URL returns HTTP 200 with the homepage — [LIVE] [CODE]
- **Files:** [src/App.jsx:26](src/App.jsx#L26) (`path="*"` renders `<Home />`), [vercel.json:4](vercel.json#L4) (rewrites everything)
- **Evidence:** `/does-not-exist` → 200 with the home page. `/assets/nope.js` → 200 `text/html`.
- **Why it matters:** Google classifies these as soft 404s. Any mistyped or stale link creates another duplicate of the homepage. Missing JS or CSS files return HTML instead of a 404, which makes broken deploys harder to diagnose.
- **Fix:** Add a real Not Found route that renders a small "Page not found" page with links home. Once routes are prerendered, remove the catch-all rewrite and add `404.html` to the build output; Vercel serves it with a real 404 status.

#### H2. No `<h1>` on About, Projects, Resume or Contact — [CODE]
- **File:** [src/components/SectionHeading.jsx:17](src/components/SectionHeading.jsx#L17) always renders `<h2>`. Only Home has an H1 ([Home.jsx:19-23](src/components/Home/Home.jsx#L19-L23)).
- **Why it matters:** The H1 is the main topic signal for a page. "Background", "Selected work", "Resume" and "Get in touch" are all H2s, and no page says in a heading what it is about, e.g. "Projects by Dinesh Chaudhari".
- **Fix:** Add an `as="h1"` prop to `SectionHeading` and use it for the first heading on each page. Make the text descriptive, e.g. "Projects — web, AI and embedded work", without changing the visual design.

#### H3. Mobile performance: LCP 4.4 s, render-blocking fonts, single 842 KB bundle — [LIVE] [CODE]
- Detailed under Performance ([§7](#7-performance-and-core-web-vitals)). The highest-impact causes:
  - The Google Fonts stylesheet blocks rendering ([index.html:35-37](index.html#L35-L37)): 845 ms on mobile.
  - All routes are statically imported ([App.jsx:6-13](src/App.jsx#L6-L13)), so `react-pdf`/pdf.js and `react-github-calendar` load on the homepage. The result is one 842 KB chunk (254 KB gzip), with 157 KiB unused on Home.
  - Clarity blocks the main thread for 340 ms on mobile ([index.html:38-45](index.html#L38-L45)).
  - The LCP is the H1 text, which can't paint until JS runs. Prerendering would let it paint from HTML.

### Medium

#### M1. The second experience entry (DSigniteFitness) isn't in the DOM — [CODE]
- **File:** [src/components/Home/Experience.jsx:68](src/components/Home/Experience.jsx#L68): `const job = experiences[active];` renders only one card.
- **Why it matters:** Even after rendering, crawlers see only Rabbitship. The DSigniteFitness freelance experience appears in search only through the Projects page.
- **Fix:** Render all entries in the HTML and hide inactive ones visually with CSS. Alternatively, drop the carousel for a vertical list. With only two entries, a list is simpler and better for scanning and for SEO.

#### M2. The `*.vercel.app` domain serves a full duplicate of the site — [LIVE]
- **Evidence:** `https://dinesh-portfolio-gilt.vercel.app/` → 200, identical bundle (`index-CpdalKiO.js`), no redirect, no `X-Robots-Tag`. [README.md:24](README.md#L24) still links to it, which helps crawlers discover it.
- **Why it matters:** This is duplicate content on a second host. The canonical tag mitigates it for `/` only, and that same tag is broken for every other page (C1).
- **Fix:** In Vercel → Project → Domains, set `dinesh-portfolio-gilt.vercel.app` to **redirect (308)** to `dinesh.probuilder.in`. Update the README link.

#### M3. Title and positioning don't match the searches you want to rank for — [CODE]
- **Files:** [index.html:7](index.html#L7), [index.html:17](index.html#L17), [Home.jsx:19-23](src/components/Home/Home.jsx#L19-L23)
- **Detail:** Your targets are "full-stack developer Pune", "React developer Pune", "Node.js developer India" and "AI application developer". The title says *"Full-Stack & Embedded Engineer"*, the H1 says *"I build products from firmware to frontend"*, and neither names Pune, React or Node.js. Your actual role ([Experience.jsx:7](src/components/Home/Experience.jsx#L7)) is "Full Stack Developer".
- **Why it matters:** Titles and H1s are among the strongest on-page relevance signals. The embedded work is a real differentiator, but leading with it dilutes the full-stack positioning you are targeting.
- **Fix:** Lead with "Full-Stack Developer in Pune" and React/Node.js in the title, and keep "embedded" as the differentiator in the description and body. Keep the creative H1 if you like it, but add the role in plain text close to it, e.g. change the eyebrow at [Home.jsx:16-18](src/components/Home/Home.jsx#L16-L18) to "Dinesh Chaudhari · Full-Stack Developer · Pune, India".

#### M4. Structured data is incomplete — [CODE]
- **File:** [index.html:10-28](index.html#L10-L28)
- **Validation:** The JSON-LD parses as valid JSON with a valid `Person` type. Missing:
  - `@id` for entity linking, e.g. `https://dinesh.probuilder.in/#person`
  - `worksFor` (Innover Labs is stated on the site) and `alumniOf` (Manipal University Jaipur; Modern College, Pune, stated in [Credentials.jsx:10-13](src/components/About/Credentials.jsx#L10-L13))
  - `address.addressRegion: "Maharashtra"`
  - `image` points to `og.png`, a 1200×630 social card. Use a real headshot at a stable URL instead.
  - `jobTitle` ("Full-Stack & Embedded Engineer") differs from the role on the page ("Full Stack Developer").
  - No `WebSite` node and no `ProfilePage` node.
- **Fix:** See the recommended JSON-LD in [§9](#9-recommended-structured-data).

#### M5. The Resume page is a canvas-rendered PDF with a hashed URL — [CODE]
- **File:** [src/components/Resume/Resume.jsx:3](src/components/Resume/Resume.jsx#L3) imports the PDF through Vite, so it is served at `/assets/Dinesh-Chaudhari-Resume-CG3Wmw0x.pdf`.
- **Why it matters:**
  - The page's own HTML holds only a heading and a download button. The resume text lives in a pdf.js text layer.
  - The hash changes every time the PDF changes, so any indexed or shared PDF URL breaks.
  - The page pulls in pdf.js (1.37 MB worker plus a large chunk of the main bundle).
- **Fix:** Move the PDF to `public/Dinesh-Chaudhari-Resume.pdf` for a stable URL. Add a short HTML summary above the viewer: current role, key skills, education, availability. Lazy-load the viewer.

#### M6. Layout shift on mobile (CLS 0.176) — [LIVE]
- **Element:** the badge row `div.flex.flex-wrap.items-stretch.gap-3.mt-8` at [Home.jsx:30](src/components/Home/Home.jsx#L30)
- **Likely cause:** The web font swaps in (`display=swap`), and the badges and hero text reflow to a different width and wrap. The 🏆 emoji badge is wide on small screens.
- **Fix:** Self-host the fonts and preload the main weight. Add a metric-matched fallback with `size-adjust`, or use `font-display: optional`. Re-measure after prerendering, because the layout timing changes.

#### M7. The homepage contact path is thin, and there are no location or availability statements in body text — [CODE]
- **File:** [src/components/Contact/Contact.jsx:70-74](src/components/Contact/Contact.jsx#L70-L74)
- **Detail:** The Contact page has one heading and a form. It doesn't say where you are, what you take on, or how you work (remote, on-site in Pune, time zone).
- **Fix:** Add one or two factual lines, e.g. "Based in Pune, Maharashtra (IST). Available for freelance full-stack, React/Node.js and AI-integration work, remote or on-site in Pune. Open to full-time roles." Only state what is true.

### Low

| # | Issue | Location | Fix |
|---|---|---|---|
| L1 | Meta description is ~205 characters; Google truncates around 155–160 | [index.html:8](index.html#L8) | Shorten. Front-load role + location. |
| L2 | No `<main>` landmark. Home sections are `<div>`s. | [App.jsx:17-29](src/App.jsx#L17-L29), [Home.jsx:13](src/components/Home/Home.jsx#L13) | Wrap `<Routes>` in `<main>`. Use `<section aria-labelledby>` for Home sections. |
| L3 | Case variants return 200 (`/about` renders About, because React Router matching is case-insensitive) | [App.jsx:22-25](src/App.jsx#L22-L25) | After prerendering, add 308 redirects from lowercase variants to the canonical paths in `vercel.json` |
| L4 | Missing OG and Twitter detail: `og:site_name`, `og:locale` (`en_IN`), `og:image:width/height/alt` | [index.html:29-34](index.html#L29-L34) | Add them. `twitter:title`/`description` fall back to OG, so they're optional. |
| L5 | Only an SVG favicon. No `apple-touch-icon` or PNG fallback. No `theme-color`. | [index.html:5](index.html#L5) | Add a 180×180 PNG `apple-touch-icon` and a 48×48 PNG/ICO fallback |
| L6 | Hashed assets served with `Cache-Control: public, max-age=0, must-revalidate` | Live `/assets/index-*.js` | Add a `headers` rule in `vercel.json`: `/assets/(.*)` → `public, max-age=31536000, immutable` |
| L7 | Security headers missing: only HSTS is present | Live response headers | Add `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`), `Permissions-Policy`. Start CSP as Report-Only (see [§10](#10-security-and-configuration)). |
| L8 | The certificate file is named `openai-codex-hackathon-winner.png`, but the claim is "Ranked 14th" | [ProjectData.jsx:14](src/components/Project/ProjectData.jsx#L14), [Home.jsx:9](src/components/Home/Home.jsx#L9) | Rename it to e.g. `openai-codex-hackathon-certificate.png` so the URL doesn't overstate the result. This is a credibility point. |
| L9 | DSigniteFitness experience has no dates (`period: "Freelance"`) | [Experience.jsx:26](src/components/Home/Experience.jsx#L26) | Add real dates, e.g. "Freelance · 2025". Only you know these. |
| L10 | A few passages read generic next to the rest of the site | [AboutCard.jsx:23-31](src/components/About/AboutCard.jsx#L23-L31), Schedula and Structify descriptions [ProjectData.jsx:83](src/components/Project/ProjectData.jsx#L83), [:137](src/components/Project/ProjectData.jsx#L137) | Rewrite in the same concrete style as GhostDesk and Rabbitship: what you built and which decision mattered |
| L11 | Real photo (137 KB) loads eagerly even though it stays hidden until hover | [HoverPortrait.jsx:156-162](src/components/Home/HoverPortrait.jsx#L156-L162) | `loading="lazy"` + `decoding="async"`, or load it on the first pointer or focus event |
| L12 | Social links lack `rel="me"` | [Footer.jsx](src/components/Footer.jsx), [Elsewhere.jsx](src/components/Home/Elsewhere.jsx) | Add `rel="me noopener noreferrer"` to profile links. This is a lightweight identity-verification signal. |
| L13 | Unused files in the repo (not bundled, just clutter): `ghinli2.png` (1.4 MB), `image.png`, `Readme-png.png`, `home-main.svg`, `avatar.svg`, `About-pic.avif`, `home-pic.avif`, 4 unused project images, `public/vite.svg` | `src/assets/`, `public/` | Delete them. `public/vite.svg` is publicly served. |

---

## 6. Search engine and AI crawler access

### robots.txt — [LIVE] ✅
[public/robots.txt](public/robots.txt) returns 200 and allows everything. It references the sitemap. It has no syntax errors. The explicit per-bot `Allow` groups duplicate `User-agent: *`. That is harmless and documents your intent.

### Crawler access matrix

| Crawler | Purpose | Allowed? | Executes JS? | What it currently sees |
|---|---|---|---|---|
| **Googlebot** | Google Search indexing | ✅ | Yes, in a deferred render queue | Full content after rendering. **But** a root canonical on every page. |
| **Bingbot** | Bing index; also feeds Microsoft Copilot | ✅ | Yes, less consistently | Full content if rendered, same canonical issue |
| **OAI-SearchBot** | Builds the index ChatGPT search uses to surface and cite sites | ✅ | Widely reported: **no** | `<head>` only: title, description, JSON-LD |
| **ChatGPT-User** | Fetches a page live when a ChatGPT user's request triggers it | ✅ | Reported: no | `<head>` only |
| **GPTBot** | Collects data for **training** OpenAI models | ✅ | Reported: no | `<head>` only |
| **ClaudeBot / PerplexityBot** | Training / answer-engine index | ✅ | Reported: no | `<head>` only |
| **Google-Extended** | Not a crawler. A robots.txt token that controls whether Googlebot-crawled content may be used for Gemini training and grounding. | ✅ | n/a | n/a |

### Search indexing crawlers vs. AI training crawlers
- **Search and retrieval crawlers** (Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot) build indexes that are queried **at answer time**. Being in these indexes is what lets an engine *surface and cite* your page when someone asks "React developers in Pune". This is where the near-term discoverability benefit is.
- **Training crawlers** (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended) collect content that may go into **future model training**. Allowing them may help a model "know" about you eventually, but it is indirect, delayed, and not controllable.
- Allowing all of them is a reasonable choice for a public portfolio, and you've already made it. **None of this guarantees that ChatGPT or any other assistant will recommend you.** AI answers depend on the engine's own retrieval and ranking, on corroboration from other sources (LinkedIn, GitHub, Upwork, mentions elsewhere), and on query context. Crawlable, specific, consistent content is necessary but not sufficient.

### sitemap.xml — [LIVE] ✅ (with notes)
- Returns 200, `application/xml`, valid, and lists all 5 routes with `lastmod`.
- `priority` and `changefreq` are ignored by Google. They are harmless.
- Once each route has its own canonical, the sitemap and canonicals will agree. Right now they contradict each other: the sitemap says `/Project` is canonical, and the page itself says `/` is.
- Your earlier notes say GSC showed "Couldn't fetch" and you resubmitted as `sitemap.xml?v=2`. The file is valid, so that was a GSC display issue.

### llms.txt — [LIVE] ✅ (low expected benefit)
[public/llms.txt](public/llms.txt) exists, is accurate, and links the key pages. Be realistic about it: `llms.txt` is a proposed convention, and no major AI search provider has publicly committed to using it for ranking or retrieval. It costs nothing to keep, and it is currently the only plain-text summary of your experience that non-JS crawlers can read. Once prerendering ships, your real pages will do this job better. Suggested light edits:
- Use "Pune, Maharashtra, India" and "Full-Stack Developer" to match the updated title.
- Add a short skills line (React, TypeScript, Node.js, Express, Firebase, OpenAI API, Capacitor, ESP32).
- Add the DSigniteFitness freelance engagement and education (MCA, Manipal University Jaipur; B.Sc. CS, Modern College, Pune).

### Internal linking — [CODE] ✅ (after render)
Navigation uses real `<a href>` elements (`NavLink`), so links are crawlable once rendered. Home links to `/Project` and `/Resume`. No broken internal links were found. Before rendering there are zero links (C3). The footer has no internal links, which is acceptable for a 5-page site.

### Redirects — [LIVE] ✅
- `http://` → `https://` is a single **308**. ✅
- `www.dinesh.probuilder.in` has no DNS record. That is fine for a subdomain site; no action is needed.
- No redirect chains were found.

---

## 7. Performance and Core Web Vitals

| Area | Finding | Recommendation |
|---|---|---|
| **LCP** (mobile 4.4 s) | The LCP element is the H1 *text*, delayed ~1.3 s by JS render. On desktop the LCP is the toon portrait (179 KB JPEG, discovered late). | Prerender so the H1 paints from HTML. Give the toon `<img>` `fetchpriority="high"`, explicit `width`/`height`, and convert it to AVIF/WebP (~40–60 KB). |
| **Render-blocking** | The Google Fonts CSS blocks first paint (845 ms mobile). It loads 5 IBM Plex styles + 3 JetBrains Mono weights. | Self-host the fonts (e.g. `@fontsource`) or download the woff2 files into `public/`. Preload the regular weight and trim unused weights/italics. This also removes two third-party origins. |
| **JS bundle** | One chunk: 842 KB minified / 254 KB gzip. `react-pdf` (pdf.js) and `react-github-calendar` are in it because all routes are imported eagerly ([App.jsx:6-13](src/App.jsx#L6-L13)). 157 KiB unused on Home. | Route-level `React.lazy()` for `Resume`, `About` and `Project`. This should roughly halve the Home JS. |
| **INP / TBT** (mobile 400 ms) | Clarity adds 340 ms of main-thread blocking. The rest is React hydration and the bundle. | Load Clarity after `load` or idle (`requestIdleCallback`), or only after consent. Code splitting reduces the rest. |
| **CLS** (mobile 0.176) | Badge row reflow, most likely from the font swap (M6) | Font metric fallback or `font-display: optional`. Re-measure. |
| **Images** | ~285 KiB of savings flagged. Portraits are 720×900 JPEGs displayed at 256–320 px. `BioPrint-AI.png` is 287 KB at 1915 px wide. Project images already use `loading="lazy"`. ✅ | Convert to AVIF/WebP, resize to about 2× display width, add `width`/`height`. Defer the hidden real photo (L11). |
| **Caching** | Hashed assets are `max-age=0, must-revalidate`, so every repeat visit pays a revalidation round trip per file | `immutable` 1-year rule for `/assets/*` (L6) |
| **Compression** | HTML and JS served with **Brotli** ✅ | — |
| **Third parties** | Clarity sets 8 third-party cookies (Clarity + Bing). This is why Best Practices is 79. | Acceptable if you want session recordings. Consider deferring, and add a short privacy note. |
| **Unnecessary deps** | `react-parallax-tilt` is in `package.json` but not imported anywhere in `src/` | Remove it from `package.json` |

---

## 8. Suggested per-page metadata

These are drafts. They only use facts already on your site; adjust the wording to taste.

| Route | `<title>` (≤ 60 chars) | `<meta description>` (≤ 155 chars) | H1 |
|---|---|---|---|
| `/` | Dinesh Chaudhari — Full-Stack Developer in Pune (React, Node.js) | Full-stack developer in Pune building React, TypeScript and Node.js products end to end. Sole developer of Rabbitship (1,000+ users). Open to freelance. | Keep current H1; add the role in plain text near it (M3) |
| `/About` | About Dinesh Chaudhari — Full-Stack Developer, Pune | Background, skills and education of Dinesh Chaudhari: React, Node.js, Firebase, OpenAI API and embedded systems. MCA, Manipal University Jaipur. | About Dinesh Chaudhari |
| `/Project` | Projects — Web, AI & Embedded Work · Dinesh Chaudhari | GhostDesk (ranked 14th of 3,000 at the OpenAI Codex Hackathon), DSigniteFitness, Gesture AI and more, with stack details, source code and live demos. | Projects |
| `/Resume` | Resume — Dinesh Chaudhari, Full-Stack Developer | Resume of Dinesh Chaudhari, a full-stack developer in Pune: experience at Innover Labs, projects, skills and education. Download the PDF. | Resume |
| `/Contact` | Contact & Hire — Dinesh Chaudhari, Pune | Hire Dinesh Chaudhari for full-stack React and Node.js work: message via the contact form or WhatsApp, or hire on Upwork. Based in Pune, India. | Contact |

---

## 9. Recommended structured data

**Only use what accurately describes the site.** Recommended: `Person`, `WebSite`, and `ProfilePage` (on `/` or `/About`).

**Not recommended:**
- `BreadcrumbList`: the site is flat, one level deep, so breadcrumbs add nothing.
- `Article`: there are no articles or blog posts.
- `SoftwareSourceCode` / `CreativeWork` for projects: technically accurate, but optional (P3). They have no Google rich result and only a marginal entity-understanding benefit.

Draft for the homepage (fill in the photo URL; remove anything you don't want public):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://dinesh.probuilder.in/#website",
      "url": "https://dinesh.probuilder.in/",
      "name": "Dinesh Chaudhari",
      "inLanguage": "en",
      "publisher": { "@id": "https://dinesh.probuilder.in/#person" }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://dinesh.probuilder.in/#profilepage",
      "url": "https://dinesh.probuilder.in/",
      "isPartOf": { "@id": "https://dinesh.probuilder.in/#website" },
      "mainEntity": { "@id": "https://dinesh.probuilder.in/#person" }
    },
    {
      "@type": "Person",
      "@id": "https://dinesh.probuilder.in/#person",
      "name": "Dinesh Chaudhari",
      "givenName": "Dinesh",
      "familyName": "Chaudhari",
      "url": "https://dinesh.probuilder.in/",
      "image": "https://dinesh.probuilder.in/<stable-headshot>.jpg",
      "jobTitle": "Full Stack Developer",
      "worksFor": { "@type": "Organization", "name": "Innover Labs" },
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Manipal University Jaipur" },
        { "@type": "CollegeOrUniversity", "name": "Modern College, Shivajinagar, Pune" }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "description": "Full-stack developer in Pune, India. Builds React, TypeScript and Node.js products end to end, plus embedded firmware.",
      "knowsAbout": ["React", "TypeScript", "Node.js", "Express", "Firebase", "REST APIs", "Capacitor", "OpenAI API", "WebRTC", "ESP32", "Embedded systems"],
      "award": "Ranked 14th of 3,000 teams, OpenAI Codex Hackathon (2026)",
      "sameAs": [
        "https://www.upwork.com/freelancers/~01467adfc75e48ae91",
        "https://github.com/Dinesh99673",
        "https://www.linkedin.com/in/dinesh7821/",
        "https://www.instagram.com/dineshdchoudhari"
      ]
    }
  ]
}
```

Notes:
- Don't add `Organization`/`LocalBusiness` for yourself. You're an individual, and a business-location schema would be a misleading claim.
- If Innover Labs has an official URL, add it as `worksFor.url`.
- Keep `jobTitle` consistent with the visible page and LinkedIn.

---

## 10. Security and configuration

| Check | Status |
|---|---|
| HTTPS + HSTS (`max-age=63072000`) | ✅ [LIVE] |
| HTTP → HTTPS (308, single hop) | ✅ [LIVE] |
| External links use `noopener`/`noreferrer` | ✅ [CODE]. All `target="_blank"` links have it. |
| Secrets in the repo | ✅ None found. `.env.example` is empty, and `.gitignore` excludes `*.local`. |
| Web3Forms key in the bundle ([Contact.jsx:12-13](src/components/Contact/Contact.jsx#L12-L13)) | Acceptable. Web3Forms access keys are designed to be public. |
| Clarity project ID in HTML | Acceptable. It is public by design. |
| Personal phone number and email in the JS bundle | Intentional contact info, but scrapers will harvest it. If spam becomes a problem, rely on the form and the `wa.me` link and drop the plain email from the error message. |
| Security headers | ⚠️ Only HSTS. See L7. |
| CSP | ⚠️ None. If you add one, start with `Content-Security-Policy-Report-Only`. Allow-list `'self'`, `fonts.googleapis.com`, `fonts.gstatic.com` (or drop both after self-hosting), `*.clarity.ms`, `c.bing.com`, `api.web3forms.com`, `www.youtube-nocookie.com` (frame), and the GitHub-contributions API host used by `react-github-calendar`. The inline Clarity snippet needs a hash or must move to a file. |
| `Access-Control-Allow-Origin: *` on HTML | Vercel default for static files. Harmless for a public static site. |
| Old `*.vercel.app` alias | ⚠️ See M2 |

---

## 11. Content SEO review

### What works well
- **Specific, verifiable detail:** "31-screen super-admin console", "three courier providers behind a single booking abstraction", "signature-verified, idempotent webhook handling", "6,480 training samples, a stacked LSTM, an ESP32 sampling at 50 Hz". This is exactly the kind of expertise evidence that both search engines and AI systems reward.
- **No keyword stuffing.** The voice is distinctive and reads as human, e.g. *"a ledger that double-credits once is a ledger nobody trusts again"*.
- Achievements carry numbers and dates ([Credentials.jsx:3-8](src/components/About/Credentials.jsx#L3-L8)).
- Clear calls to action: Upwork, form, WhatsApp.

### Improvements by section (no invented facts)
- **Homepage:** Put the role and location in plain text near the H1 (M3). The hero paragraph is good; consider naming "React, TypeScript and Node.js" explicitly in it, since those are the queries you target.
- **About:** The second paragraph ([AboutCard.jsx:23-31](src/components/About/AboutCard.jsx#L23-L31)) is the most generic text on the site. Replace it with one concrete sentence about how you work, e.g. how you handle a client project from first call to support, which you already say about ProBuilder. Name your specialisms once in prose: full-stack web apps, React → Android via Capacitor, payment integrations, AI features with the OpenAI API, ESP32 firmware.
- **Experience:** Render both entries (M1) and add dates to DSigniteFitness (L9). If accurate, add one line on scope or outcome for DSigniteFitness, like the "1,000+ users" metric on Rabbitship.
- **Skills:** Skills appear only as icon tiles with tiny labels. That is crawlable, but it carries no context. A one-line description per group would strengthen relevance, e.g. "Backend & real-time — Node.js/Express 5 APIs, Socket.IO and WebRTC (used in GhostDesk)".
- **Projects:** Strong overall. Rewrite Schedula and Structify in the same concrete style (L10). Optionally (P3), give the 2–3 flagship projects their own pages, e.g. `/Project/ghostdesk`, with a short case study covering the problem, architecture, your decisions and the result. That is the most effective long-term way to rank for specific technical queries and to give AI engines citable pages.
- **Contact:** Add location, working mode and the kinds of engagements you take (M7).

### Consistency check
| Signal | Value |
|---|---|
| `<title>` / JSON-LD `jobTitle` | Full-Stack & Embedded Engineer |
| Experience role | Full Stack Developer |
| Home badge | Full Stack Developer · Innover Labs |
| llms.txt heading | Full-Stack & Embedded Engineer |

Pick one primary title, ideally "Full-Stack Developer", and use it everywhere, including LinkedIn, Upwork and GitHub bios. Consistent identity signals across sources help search engines and AI systems resolve "Dinesh Chaudhari" to one entity.

---

## 12. Local SEO (Pune)

**Already present:** "Pune, IN" in the hero eyebrow, "Innover Labs · Pune, Maharashtra" in Experience, Pune in the About text and meta description, and `addressLocality: "Pune"` in JSON-LD.

**Recommendations, without misleading business-location claims:**
1. Put "Pune" in the homepage `<title>` (§8).
2. Add `addressRegion: "Maharashtra"` to JSON-LD.
3. Add a plain-text availability line on Home or Contact: "Based in Pune, Maharashtra (IST) — available for freelance projects remotely or on-site in Pune, and open to full-time roles."
4. **Don't** create a Google Business Profile for yourself as an individual unless you meet Google's eligibility rules: in-person contact during stated hours, or a service-area business. ProBuilder may qualify as a business; your personal portfolio is not one.
5. Keep the location identical across LinkedIn, Upwork and GitHub ("Pune, Maharashtra, India").

---

## 13. Positive findings

- ✅ HTTPS with HSTS. A single-hop 308 from HTTP.
- ✅ `lang="en"` and a correct viewport meta tag.
- ✅ A unique, descriptive homepage title and description exist; they just need to be per-route.
- ✅ Valid `Person` JSON-LD with `sameAs` links to GitHub, LinkedIn, Upwork and Instagram.
- ✅ Open Graph and `summary_large_image` Twitter card with a correctly sized 1200×630 `og.png`.
- ✅ robots.txt allows all major search and AI crawlers and references the sitemap.
- ✅ A valid sitemap covering all routes. Google verification file is in place. Submitted to GSC and Bing on 2026-11-26.
- ✅ Navigation uses real `<a href>` links. No broken internal links.
- ✅ Good heading order on Home (H1 → H2 → H3).
- ✅ Descriptive `alt` text on images. Project images are lazy-loaded. YouTube uses the no-cookie domain with `loading="lazy"`.
- ✅ Accessibility 100 (Lighthouse mobile). ARIA on the carousel, filters and menu.
- ✅ Brotli compression on HTML and JS.
- ✅ Strong, specific, credible content with no keyword stuffing.
- ✅ All external `target="_blank"` links are safe.
- ✅ No secrets exposed.

---

## 14. Prioritized action plan

### P0 — Critical (do first)

1. **Prerender all 5 routes, each with its own head tags.** This one change fixes C1, C2 and C3 and most of the LCP problem. Two simple options:
   - **(a) Small custom prerender step.** Keep Vite and the current router. Add an SSR entry that renders each route with `StaticRouter`/`renderToString`, then write `dist/<route>/index.html` with the route's title, description, canonical, `og:*` and JSON-LD. Swap `createRoot` for `hydrateRoot`. This needs no new runtime dependency.
   - **(b) React Router v7 framework mode with `prerender: ["/", "/About", ...]`.** This is officially supported but a larger migration.

   **Caveat:** `react-pdf` touches browser APIs at import time ([Resume.jsx:9-12](src/components/Resume/Resume.jsx#L9-L12)), so lazy-load it or exclude it from the server render. For head tags, React 19 renders `<title>`/`<meta>`/`<link>` natively, and `react-pdf@9` and `react-github-calendar@4` both list React 19 as a supported peer. Alternatively, inject the tags from a route table in the prerender script.
2. **Self-referencing canonical and `og:url` on every page.** This comes with P0-1.
3. **Unique title, description and H1 per page** (§8, H2).

### P1 — High

4. Real 404 handling: a Not Found route, `404.html`, and no catch-all rewrite (H1).
5. 308-redirect `dinesh-portfolio-gilt.vercel.app` to the custom domain, and fix the README link (M2).
6. Route-level code splitting with `React.lazy` (H3).
7. Self-host the fonts, defer Clarity, and optimize the portraits with `fetchpriority` on the LCP image (H3, §7).
8. Render both experience entries in the DOM (M1).
9. Align the title, H1-adjacent text and JSON-LD `jobTitle` to "Full-Stack Developer · Pune" (M3).
10. Expand the JSON-LD into a `Person` + `WebSite` + `ProfilePage` graph (M4, §9).

### P2 — Medium

11. Move the resume PDF to `public/` for a stable URL, add an HTML summary to `/Resume`, and lazy-load the viewer (M5).
12. Fix the CLS from the font swap (M6).
13. Add location, availability and services text to Contact and Home (M7, §12).
14. Add the immutable cache header for `/assets/*` and the basic security headers (L6, L7).
15. Rewrite the generic paragraphs and add context lines to the skill groups (L10, §11).
16. Update `llms.txt` to match the new positioning (§6).

### P3 — Optional

17. Case-study pages for 2–3 flagship projects.
18. `ItemList` of `SoftwareSourceCode` for the projects.
19. `rel="me"` on profile links. `apple-touch-icon`, `og:site_name`/`og:locale`/`og:image:alt`.
20. Lowercase-variant redirects, `<main>` landmark, removing unused assets and `react-parallax-tilt`.
21. Rename the certificate file (L8). Add a short privacy note for Clarity.

---

## 15. External verification checklist

### Google Search Console
- [ ] **Pages → "Why pages aren't indexed":** look for "Duplicate, Google chose different canonical than user", "Alternate page with proper canonical tag" (expected for `/About`, `/Project`, `/Resume`, `/Contact` given C1), and "Soft 404".
- [ ] **URL Inspection** on each of the 5 URLs: compare "User-declared canonical" with "Google-selected canonical". Use **View crawled page → HTML** to confirm the rendered content.
- [ ] After deploying fixes: **Test live URL** → confirm the canonical per page → **Request indexing** for all 5.
- [ ] Sitemaps: confirm `sitemap.xml?v=2` shows "Success" with 5 discovered URLs.
- [ ] Core Web Vitals report: likely "not enough data" on a low-traffic site. Check again after a few weeks.
- [ ] Performance report: track impressions for queries containing "Dinesh Chaudhari", "full stack developer pune", "react developer pune".

### Google PageSpeed Insights ([pagespeed.web.dev](https://pagespeed.web.dev))
- [ ] Run mobile and desktop for `/` and `/Project`. The PSI API quota was exhausted during this audit, so these were not run via PSI.
- [ ] Check whether the **field data (CrUX)** section has data. If it does, those are your real LCP/INP/CLS.
- [ ] Re-run after P0/P1 changes. Expect large gains in mobile FCP and LCP from prerendering and font self-hosting.

### Bing Webmaster Tools
- [ ] URL Inspection on all 5 pages. Check the indexed status and the canonical Bing chose.
- [ ] Site Scan: duplicate titles and descriptions (expected before the fix), missing H1s.
- [ ] Consider **IndexNow** after deploying fixes to notify Bing quickly. It's free and Vercel-compatible.
- [ ] Confirm the sitemap is processed (your earlier notes say 5 URLs were read).

### Schema Markup Validator ([validator.schema.org](https://validator.schema.org))
- [ ] Validate each page's JSON-LD after the change. Expect 0 errors and 0 warnings for `Person`, `WebSite` and `ProfilePage`.

### Rich Results Test ([search.google.com/test/rich-results](https://search.google.com/test/rich-results))
- [ ] Test `/` (and `/About` if `ProfilePage` goes there). `ProfilePage` is a supported rich result type. `Person` alone has no rich result, and that's expected.

### Other
- [ ] Vercel → Domains: confirm `dinesh-portfolio-gilt.vercel.app` redirects (M2).
- [ ] [securityheaders.com](https://securityheaders.com) after adding headers.
- [ ] Ask ChatGPT (search on), Perplexity and Copilot "Who is Dinesh Chaudhari, full-stack developer in Pune?" before and after the fixes. This is anecdotal and doesn't measure ranking, but it shows whether the engines can retrieve and describe the site.

---

## 16. Final answers

### 1. Overall SEO health score
**61 / 100.** The foundations and content are good. The architecture (client-only rendering with a single static head) and the site-wide canonical bug hold it back.

### 2. Top 10 problems affecting discoverability
1. Every page's canonical points to the homepage, so subpages are likely excluded from Google's index (C1).
2. All 5 pages have the same title and description (C2).
3. Raw HTML has 0 words and 0 links, so non-JS AI crawlers see nothing but `<head>` (C3).
4. Every URL returns 200, producing soft 404s and infinite homepage duplicates (H1).
5. No H1 on About, Projects, Resume or Contact (H2).
6. Mobile LCP of 4.4 s, render-blocking fonts, and an 842 KB single bundle (H3).
7. The old `*.vercel.app` host serves an unredirected duplicate of the site (M2).
8. The title and H1 don't name your target role or location ("Full-Stack Developer, Pune, React/Node.js") (M3).
9. The DSigniteFitness experience is missing from the DOM (carousel) (M1).
10. JSON-LD lacks `WebSite`, `ProfilePage`, `worksFor`, `alumniOf` and `@id` linking (M4).

### 3. Top 10 recommended improvements
1. Prerender all 5 routes to static HTML.
2. Per-route self-referencing canonical and `og:url`.
3. Per-route title, meta description and H1.
4. A real 404 page and status, and remove the catch-all rewrite.
5. 308-redirect the `*.vercel.app` domain.
6. Code-split routes, which removes pdf.js and the GitHub calendar from Home.
7. Self-host fonts, defer Clarity, and compress and prioritize the hero portrait.
8. Render all experience entries in the HTML.
9. Unify positioning on "Full-Stack Developer · Pune" across the title, JSON-LD, llms.txt and external profiles.
10. Upgrade JSON-LD to a `Person` + `WebSite` + `ProfilePage` graph with accurate `worksFor` and `alumniOf`.

### 4. Is the site technically ready for Google indexing?
**Partially.** Google can crawl and render it, and the homepage is indexable. But the site-wide root canonical tells Google to treat the other four pages as duplicates of `/`, so **only the homepage is reliably indexable today**. After C1–C2 and H1 are fixed, it will be ready.

### 5. Is the site technically ready for AI search crawlers?
**No.** Access is allowed in robots.txt, but crawlers that don't execute JavaScript, which reportedly includes OAI-SearchBot, GPTBot, ClaudeBot and PerplexityBot, receive an empty body. They get only the meta description, the JSON-LD and `llms.txt`. Prerendering (P0-1) is the fix. Even then, crawlability makes you *eligible* to be surfaced. It doesn't guarantee any AI assistant will recommend you.

### 6. What to fix first
**Prerender the five routes with per-route head tags (P0-1).** It resolves the canonical bug, the duplicate metadata and the empty-HTML problem in one change, and it is the largest single improvement to mobile LCP. Then do the 404 handling and the `*.vercel.app` redirect, which take about 15 minutes in `vercel.json` and the Vercel dashboard. Finally, request re-indexing of all 5 URLs in GSC and Bing.
