# 404 Handling — Implementation Report

Site: https://dinesh.probuilder.in · Date: 2026-11-26

## Problem

`vercel.json` ended with a catch-all rewrite, `{ "source": "/(.*)", "destination": "/index.html" }`. As a result, every unknown URL returned **HTTP 200 with the homepage**, a "soft 404". Checked on production before this change:

| URL | Status | HTML served |
|---|---|---|
| `/random-invalid-route` | 200 | homepage |
| `/assets/nonexistent.js` | 200 | homepage (HTML for a JS request) |
| `/about`, `/ABOUT`, `/About/` | 200 | homepage, then rendered as About client-side |

The last row also showed that **Vercel rewrite sources are case-sensitive and do not match a trailing slash**. Only exactly `/About` reached `About.html`.

## Solution

Vercel serves a static `404.html` from the output directory with an **HTTP 404 status** for any request that matches no file, no redirect and no rewrite. So:

1. Remove the catch-all rewrite.
2. Prerender the Not Found page to `dist/404.html`.
3. Make React Router resolve unknown paths to Not Found instead of Home.

### Request flow on Vercel (after)

```
request ─► redirects (lowercase / trailing-slash variants → 308 to canonical)
        ─► static file in dist/ (index.html, assets, og.png, robots.txt, sitemap.xml…) → 200
        ─► rewrites (/About → About.html, /Project, /Resume, /Contact) → 200
        ─► nothing matched → dist/404.html with status 404
```

## Changes

| File | Change |
|---|---|
| `src/components/NotFound.jsx` | **New.** Not Found page in the site's style: `SectionHeading` with label "Error 404", H1 "Page not found", a short message, a copper **"← Back to homepage"** button, and links to Projects / About / Contact. The markup does not depend on the URL, so one prerendered file is valid at every unknown path. |
| `src/routes.jsx` | Added `NOT_FOUND_ROUTE` (`file: "404.html"`, title "Page Not Found \| Dinesh Chaudhari", `robots: noindex, follow`, canonical → homepage). It is deliberately **not** in `routes`, so it gets no rewrite or sitemap entry. `resolveRoute()` now matches case-sensitively and returns `NOT_FOUND_ROUTE` instead of `HOME_ROUTE` for unknown paths. `headTagsFor()` now accepts per-route `robots` and `canonical` overrides. |
| `src/App.jsx` | `path="*"` renders `NotFound` (was Home). Route matching is `caseSensitive`, the same as Vercel, so the server and the client always agree. |
| `src/main.jsx` | Hydrates `404.html` (marked `data-prerendered="*"`) at any path that React also resolves to Not Found. Other cases render from scratch, as before. |
| `src/entry-server.jsx` | Also exports `NOT_FOUND_ROUTE`. |
| `scripts/prerender.js` | Renders the Not Found page to `dist/404.html`. New build-time guards:<br>• the build **fails** if `vercel.json` contains any rewrite that is not a public route, which keeps a catch-all from coming back;<br>• the build fails if `404.html` lacks `noindex`. |
| `vercel.json` | Removed the `/(.*)` → `/index.html` catch-all. Kept the four page rewrites. Added 14 permanent (308) redirects: `/about`, `/about/`, `/About/` → `/About`, and the same for Project (plus `/projects`, `/Projects`), Resume and Contact. They are safe from loops because Vercel matches sources case-sensitively. |

### Requirements checklist

| # | Requirement | Status |
|---|---|---|
| 1 | Visually consistent Not Found page | ✅ Same `SectionHeading`, palette, button and card styles as the rest of the site; navbar and footer included |
| 2 | Helpful message + homepage button | ✅ Message, "Back to homepage" button, three suggested links |
| 3 | Unknown routes don't render the homepage | ✅ Server sends `404.html`; client `*` route renders NotFound |
| 4 | Five public routes preserved | ✅ `/`, `/About`, `/Project`, `/Resume`, `/Contact` unchanged |
| 5 | Vercel serves the correct generated HTML | ✅ Explicit rewrites per route; no catch-all |
| 6 | Missing static assets return a real 404 | ✅ `/assets/nonexistent.js` → 404 (verified locally) |
| 7 | Generate `404.html` | ✅ Prerendered with full markup, noindex, one H1 |
| 8 | No redirecting every unknown URL to home | ✅ Only 14 known variants redirect, each to its own canonical page |

## Validation

### Production build: `npm run build`
Passed. Lint on the changed files is clean.
```
[prerender] /         → dist/index.html    (30.0 KB of HTML)
[prerender] /About    → dist/About.html    (97.0 KB of HTML)
[prerender] /Project  → dist/Project.html  (49.2 KB of HTML)
[prerender] /Resume   → dist/Resume.html   (12.3 KB of HTML)
[prerender] /Contact  → dist/Contact.html  (14.9 KB of HTML)
[prerender] *         → dist/404.html      (11.8 KB of HTML)
```

`dist/404.html` contains:
- `<title>Page Not Found | Dinesh Chaudhari</title>`
- `<meta name="robots" content="noindex, follow">`
- exactly one H1, "Page not found"
- absolute asset URLs only, so it renders correctly at nested paths like `/a/b/c`

Real pages keep `index, follow`.

### Local test against `dist/` (Vercel routing order emulated)

| URL | Status | Served |
|---|---|---|
| `/` | 200 | index.html |
| `/About` | 200 | About.html |
| `/Project` | 200 | Project.html |
| `/Resume` | 200 | Resume.html |
| `/Contact` | 200 | Contact.html |
| `/random-invalid-route` | **404** | 404.html |
| `/assets/nonexistent.js` | **404** | 404.html |
| `/a/b/c` | **404** | 404.html |
| `/about`, `/About/`, `/projects` | 308 | → canonical page |
| `/og.png`, `/robots.txt`, `/sitemap.xml` | 200 | static file |

### Production
**Not yet verified.** The changes are not deployed. Vercel deploys from pushes to `main`. After deployment, run:

```bash
for p in / /About /Project /Resume /Contact /random-invalid-route /assets/nonexistent.js /about /About/; do
  printf "%-26s " "$p"; curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "https://dinesh.probuilder.in$p"
done
```

Expected: 200 ×5, 404 ×2, 308 ×2.

## Notes and follow-ups

- **Client-side navigation** to an unknown path (only possible through a broken internal link) shows the Not Found page with `noindex` set by `HeadSync`. There is no HTTP status in that case, which is inherent to SPAs; crawlers always get the server's 404.
- **Search Console:** previously indexed junk URLs will now return 404 and drop out over time. The "Soft 404" report should clear after recrawl.
- **Pre-existing duplicates, not changed here:** `/About.html` and `/index.html` are reachable directly with 200. They carry canonical tags to the clean URLs, so the impact is low.
- **Dev server:** `npm run dev` matches case-sensitively, so `/about` shows Not Found locally. On production it redirects to `/About`.
