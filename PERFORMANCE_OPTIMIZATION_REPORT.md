# Performance Optimization Report

Site: https://dinesh.probuilder.in · Date: 2026-11-26 · Baseline: commit `d136bb1`

## ⚠️ Lighthouse scores: not measured

No Lighthouse score in this report was measured, and none has been estimated.

- **PageSpeed Insights API:** every request returned `Quota exceeded … Queries per day`. That is the shared quota for keyless requests.
- **Local Lighthouse CLI:** running it needs `npx` to download the `lighthouse` package, and the environment blocked a comparable package download.

Instead, both builds were measured in **headless Chrome over the DevTools Protocol**, with throttling close to Lighthouse's presets (details in §5). These are real measurements, but they are **not Lighthouse scores**. Lighthouse's default "simulated" throttling also produces different absolute numbers.

**To get Lighthouse numbers:** deploy, then run PageSpeed Insights (https://pagespeed.web.dev) on `/`, `/About`, `/Project` and `/Resume` for mobile and desktop. Alternatively, allow `npx lighthouse` and the same runs can be made locally against both builds.

## 1. Audit findings vs. what was actually in the code

| Audit finding | Status at baseline (`d136bb1`) |
|---|---|
| "Main JS bundle ≈ 842 KB" | The **entry** was 298.7 KB (104.4 KB gzip). 842 KB is roughly the sum of *all* JS chunks (entry 299 + calendar 176 + PDF viewer 375). |
| pdf.js loaded on the homepage | **Already not the case.** The PDF viewer was a lazy chunk behind `ClientOnly`. Re-verified: Home makes no pdf.js requests. |
| react-github-calendar loaded eagerly | Already a lazy chunk, but it was requested as soon as `/About` mounted. Now deferred until scrolled into view. |
| Google Fonts CSS blocks rendering | True. Replaced by self-hosted fonts. |
| Clarity blocks the main thread | Its tag was injected during HTML parsing, so it loaded and ran alongside first paint and hydration. Now deferred. |
| Lighthouse mobile 59 | Not reproducible here (see the note above). |

Bundle composition at baseline, from Rollup's rendered module sizes:

| Chunk | Rendered | Biggest contributors |
|---|---|---|
| Entry | 377 KB | react-dom 131, **app code 88**, **react-icons 69**, react-router 68 |
| GitHub calendar (lazy) | 712 KB | **date-fns 688** |
| PDF viewer (lazy) | 668 KB | pdfjs-dist 603 |

## 2. Changes

### Route-level code splitting (`React.lazy` + `Suspense`)
- **`src/lazyRoute.jsx` (new):** wraps `React.lazy` and adds a `preload()`. Client-side navigation goes through `React.lazy`/`Suspense`. Once `preload()` has resolved, the page renders synchronously. This matters because `renderToString` (prerendering) can't wait for lazy components, and hydrating a suspended tree would throw away the static HTML.
- **`routes.jsx`:** About, Projects, Resume and Contact are now separate chunks. Home (the landing page and LCP) and the tiny Not Found page stay in the entry.
- **`App.jsx`:** `<Suspense>` around `<Routes>`. React Router v7 navigates inside `startTransition`, so the current page stays visible while the next chunk loads.
- **`main.jsx`:** awaits the current page's chunk before `hydrateRoot`, so hydration matches the prerendered HTML. The chunk is already downloading thanks to the modulepreload tag (next item).
- **`scripts/prerender.js`:**
  - Preloads all page chunks before rendering.
  - Reads Vite's manifest (`build.manifest: true`) and adds `<link rel="modulepreload">` for the current page's chunk, plus `<link rel="prefetch">` for the other pages. Prefetched chunks are downloaded at idle priority and **not executed**, so navigation stays instant.
  - Deletes the manifest from `dist/` after use.
- **Resume viewer:** `ResumeViewer` now receives the PDF URL as a prop instead of importing it, which removes an unnecessary dependency between the two chunks.

### Getting the About page's icons out of the homepage bundle
`react-icons/si` is a single module. Because Home, Footer and Elsewhere imported `SiUpwork` from it, Rollup placed every `Si*` icon the About page uses (~25 brand logos) in the **entry** bundle. A local `UpworkIcon` (`src/components/UpworkIcon.jsx`) uses the same SVG and the same `GenIcon` renderer, so it looks identical. Now `react-icons/si` is imported only by the About chunk, and react-icons in the entry dropped from 69 KB to 15 KB.

### GitHub calendar
`About/Github.jsx` mounts the calendar only once its section is within 400 px of the viewport (IntersectionObserver). Until then, the prerendered fallback (a link to the GitHub profile) stays in place. The chunk is 176 KB (39 KB gzip), mostly `date-fns`.

### Microsoft Clarity
The `window.clarity` queue stub is still defined immediately, so early `clarity("event", …)` calls such as the Upwork click tracking are kept. The tag itself is injected after the `load` event, inside `requestIdleCallback` (5 s timeout), with a 2 s `setTimeout` fallback. Visits that end before the page finishes loading won't be recorded.

### Fonts
- **Self-hosted** in `public/fonts`, replacing Google Fonts. Both families are variable fonts, so 3 latin files cover every weight in use (Plex Sans normal 45 KB, italic 24 KB, JetBrains Mono 31 KB).
- **Plex `latin-ext`** (31 KB) is loaded only when a page uses characters in that range (`unicode-range`). That covers the ₹ sign on `/Project`.
- **`font-display: swap`**, and `Cache-Control: immutable` for one year.
- **Only IBM Plex Sans is preloaded.** This was decided by measurement, not by default:
  - **Without a preload**, the hero tagline is first painted in the fallback font. At 412 px wide it wraps to 3 lines in Segoe UI and 2 in Plex, so the swap moves the vertically centred hero by 45 px: **CLS 0.172** (the baseline had the same 0.172).
  - **Preloading Plex** removes that shift.
  - **JetBrains Mono** wraps identically to its fallbacks at every tested width (360–1350 px), so preloading it would only compete with the CSS.

### Images
- **WebP, resized** to about 2× their largest displayed CSS size. The original JPG/PNG files are kept in `src/assets` but are no longer imported or shipped.
  - **Portraits:** 720×900 JPG → 640×800 WebP.
  - **About illustration:** 1200×800.
  - **Project screenshots:** 1200 px wide.
  - **Total:** 1,553 KB → 475 KB (16 images).
- **Explicit `width`/`height`** on every `<img>`.
- **LCP prioritisation:**
  - **Home toon portrait** (the desktop LCP): `fetchpriority="high"`.
  - **Hidden "real" photo** (revealed on hover): `fetchpriority="low"` and `loading="lazy"`.
  - **First featured project screenshot** (the `/Project` LCP): this was `loading="lazy"` even though it is above the fold. It is now `eager` with `fetchpriority="high"`; the other cards stay lazy.
  - **Attribute spelling:** lowercase `fetchpriority` is used because React 18.3 warns about the camelCase prop. The ESLint rule is suppressed on those lines, with a comment explaining why.

### Caching (`vercel.json`)
Hashed `/assets/*` files were served with `max-age=0, must-revalidate`, so every repeat visit revalidated them. They are now `public, max-age=31536000, immutable`, as are the `/fonts/*` files.

### Re-renders
`ProjectCard` is wrapped in `React.memo`. Its props come from static data, so changing the filter only renders the cards whose props change. No other avoidable re-renders were found: the form inputs re-render the contact form by design, and the carousel and hover portrait already use refs.

### Dependency removed
`react-parallax-tilt` was confirmed unused (no references outside `package.json` and the lock file) and removed with `npm uninstall`. Every other dependency is in use.

## 3. Bundle sizes (production build)

| Chunk | Before raw / gzip | After raw / gzip | Loaded on |
|---|---|---|---|
| **Entry** (`index-*.js`) | **298.73 / 104.37 KB** | **219.85 / 73.27 KB** (−26% / −30%) | every page |
| About | in entry | 62.78 / 26.53 KB | /About |
| Projects | in entry | 12.18 / 5.13 KB | /Project |
| Contact | in entry | 4.39 / 1.77 KB | /Contact |
| Resume | in entry | 1.82 / 0.90 KB | /Resume |
| GitHub calendar | 175.95 / 39.32 KB | 175.95 / 39.32 KB | /About, now only once scrolled into view |
| PDF viewer + pdf.js | 374.55 / 111.61 KB | 374.62 / 111.64 KB | /Resume only (unchanged) |
| CSS | 22.37 / 5.19 KB | 23.68 / 5.52 KB | every page (+ `@font-face`) |
| Images shipped (16 files) | 1,553 KB | 475 KB | |

All six pages still prerender, with the same HTML sizes as before.

## 4. Measured results (headless Chrome, not Lighthouse)

Both builds were served locally with Vercel's routing, brotli and the `vercel.json` headers. Each figure is the **median of 5 cold-cache loads**.

### Mobile (4× CPU slowdown, 150 ms RTT, 1.6 Mbps, 412×823 @1.75x)

| Page | FCP ms | LCP ms | TBT ms | CLS | Transferred KB | JS KB | Image KB |
|---|---|---|---|---|---|---|---|
| `/` | 1080 → 1296 | 1100 → 1296 | 171 → 162 | **0.172 → 0** | **509 → 283** | 115 → 89 | 310 → 76 |
| `/About` | 836 → 1092 | 836 → 1092 | 172 → 118 | 0.001 → 0 | 330 → 266 | 144 → 111 | 80 → 40 |
| `/Project` | 876 → 1136 | **2576 → 1484** | 161 → 134 | 0 → 0.001 | 507 → 366 | 115 → 93 | 282 → 128 |
| `/Resume` | 688 → 876 | 688 → 876 | 234 → 301 | 0.521 → 0.457 | 687 → 696 | 207 → 182 | 1 → 1 |
| `/Contact` | 752 → 880 | 752 → 880 | 213 → 143 | 0 → 0 | 198 → 206 | 115 → 91 | 1 → 1 |

### Desktop (no CPU slowdown, 40 ms RTT, 10 Mbps, 1350×940)

| Page | FCP ms | LCP ms | TBT ms | CLS | Transferred KB |
|---|---|---|---|---|---|
| `/` | 380 → 464 | **616 → 472** | 4 → 0 | 0.015 → 0.032 | **514 → 283** |
| `/About` | 424 → 412 | 440 → 412 | 39 → 0 | 0.007 → 0.007 | 335 → 266 |
| `/Project` | 356 → 412 | **748 → 484** | 3 → 1 | 0.001 → 0 | **953 → 425** |
| `/Resume` | 272 → 336 | 272 → 336 | 13 → 0 | 0.425 → 0.425 | 693 → 695 |
| `/Contact` | 292 → 316 | 292 → 316 | 5 → 0 | 0 → 0 | 203 → 206 |

Third-party hosts contacted before first paint: `fonts.googleapis.com`, `fonts.gstatic.com` and Clarity → **none** (Clarity now starts after `load`). Console errors or hydration warnings: **0 on every page, in both builds.**

### Reading the results honestly

- **Improved:**
  - **CLS** on Home: 0.172 → 0.
  - **LCP** on `/Project`: −1.1 s mobile, −264 ms desktop.
  - **Home desktop LCP:** −144 ms.
  - **Bytes:** −45% on Home, −28% (mobile) / −55% (desktop) on `/Project`.
  - **JS transferred:** −20 to −25% on every page.
  - **TBT:** lower on 4 of 5 mobile pages.
- **Regressed: mobile FCP, +130 to +260 ms on every page.**
  - **Cause, from the request waterfalls:** the preloaded Plex Sans file (45 KB) now downloads at the same moment as the CSS, so on the throttled link the CSS finishes later (~490–550 ms vs ~395–420 ms). Before, the Google font files only started after the CSS had finished.
  - **Experiments:**
    - Dropping the preload recovers ~150 ms of FCP but brings back CLS 0.172 on Home.
    - Dropping the page-chunk `prefetch` tags made no difference.
  - **Why accept it:** Lighthouse weights CLS at 25% and FCP at 10%, and every measured FCP stays well under the 1.8 s "good" threshold. DevTools-style throttling also ignores request priority, whereas real HTTP/2 lets the CSS (VeryHigh) go ahead of the font (High), so the real-world cost should be smaller than measured here.
- **`/Resume` mobile TBT** (234 → 301 ms) is dominated by pdf.js rendering the document, which is unchanged. Individual runs ranged widely, so this difference is within noise.
- **`/Resume` CLS** (~0.43–0.52) **is unchanged and still poor.** The PDF pages replace a fixed-height spinner when they render. That is a pre-existing issue, listed under follow-ups.
- **Variance:** with 5 runs, single-page timing differences under ~150 ms are within run-to-run noise (for example, baseline Home mobile FCP ranged 680–1688 ms). Byte counts and CLS are deterministic.

## 5. Functional verification

A headless-Chrome check script ran against the optimised build. **21/21 passed:**

- Home renders; **no pdf.js / PDF viewer request**, no GitHub calendar data request, no Google Fonts request.
- Clarity tag is requested only **after the `load` event**; the `window.clarity` queue exists immediately.
- Portrait loads as a 640×800 WebP.
- In-app navigation Home → About → Projects → Contact → Home renders each lazy page and updates `document.title`.
- Project filter works (13 → 5 cards for "Embedded"), with an `h2` still ahead of the card `h3`s.
- `/About` direct load: the calendar is **not** requested before scrolling and loads after scrolling to it.
- `/Resume`: PDF pages render; the pdf.js worker loads only on this page.
- Mobile menu toggles (hidden → visible).
- Unknown URL → Not Found page.
- Zero console errors or exceptions across all of the above.

`npm run build` passes. Lint: no new errors. The only new warnings are `react-refresh/only-export-components` in `routes.jsx`, which affect dev hot-reload only. The pre-existing lint errors (prop-types, unused `React` imports, two in `AboutCard.jsx`) are unchanged.

## 6. Not done / follow-ups

- **Lighthouse scores:** pending (see the top of this report).
- **`/Resume` CLS:** reserve the PDF's height (from page count × aspect ratio) instead of a 160 px spinner.
- **`date-fns` in the calendar chunk (688 KB rendered):** pulled in whole by `react-activity-calendar`. Upgrading `react-github-calendar` / `react-activity-calendar` may tree-shake better; not done, to avoid dependency churn.
- **Font subsetting:** subsetting Plex to the glyphs the site uses would shrink the preloaded file and reduce the FCP cost. It needs `fontTools` + `brotli`, which aren't installed; a one-time step, not a project dependency.
- **The certificate PNG (512 KB)** is only opened as a link target, not displayed, so it was left as is.
- **Unused source images** in `src/assets` (e.g. `ghinli2.png` 1.4 MB, `image.png`, `home-main.svg`) are not shipped, so they have no runtime cost; they could be deleted to tidy the repo.
- **Visual check:** after deploying, spot-check the WebP images and fonts on a real phone.
