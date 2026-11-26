# Page-Specific SEO Metadata — Implementation Report

Site: https://dinesh.probuilder.in
Date: 2026-11-26
Builds on: the prerendering phase (`PRERENDER_IMPLEMENTATION_REPORT.md`)

## Summary

Each of the five public routes now ships its own title, description, self-referencing canonical, robots directive, Open Graph tags and Twitter Card tags. They are present in the initial prerendered HTML, so crawlers see them without running JavaScript.

No second metadata system was added. The existing pipeline (`src/routes.jsx` → `scripts/prerender.js` + `HeadSync` in `src/App.jsx`) was extended. Every page-specific tag is now built by a single function, `headTagsFor(route)`, which both the build-time prerender step and client-side navigation use.

## Architecture

```
src/routes.jsx
  routes[]            ← title + description per route (single source of truth)
  headTagsFor(route)  ← builds the full tag list: title, canonical, 17 meta tags
        │
        ├── scripts/prerender.js   (build time) rewrites each tag in the
        │                          dist/index.html template → dist/<Route>.html
        └── App.jsx  <HeadSync>    (runtime) updates the same tags in place
                                   on client-side navigation
index.html  ← template; holds each tag exactly once, with homepage values
```

**Duplicate protection:** for every tag, `prerender.js` requires exactly one match in the template and fails the build otherwise. Duplicated tags therefore can't ship, and neither can tags missing from the template. `HeadSync` only updates existing elements; it never appends, so client navigation can't create duplicates either.

**Canonical guard:** the prerender step also fails the build if a route's canonical is not `https://dinesh.probuilder.in` + its own path.

## Files changed

| File | Change |
|---|---|
| `src/routes.jsx` | New titles and descriptions for all 5 routes. Added `SITE_NAME`, `OG_IMAGE_ALT`, `ROBOTS` and `headTagsFor()`. Removed the homepage-only custom `ogDescription`, so social text matches the requested description (the override hook is still supported). |
| `index.html` | Template updated to new homepage values. Added `robots`, `og:site_name`, `og:locale`, `og:image:width/height/alt`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`. |
| `scripts/prerender.js` | Replaces every tag from `headTagsFor()` (previously 6 hard-coded tags). Adds the canonical assertion. |
| `src/App.jsx` | `HeadSync` loops over `headTagsFor()` instead of hard-coded selectors. |
| `src/entry-server.jsx` | Re-exports `headTagsFor` and `SITE_URL` for the prerender script. |

No components, styles, routes, rewrites or behaviour changed.

## Metadata per route

| Route | Title | Canonical / og:url |
|---|---|---|
| `/` | Dinesh Chaudhari \| Full-Stack Developer in Pune | https://dinesh.probuilder.in/ |
| `/About` | About Dinesh Chaudhari \| Full-Stack Developer | https://dinesh.probuilder.in/About |
| `/Project` | Projects \| Dinesh Chaudhari – Full-Stack Developer | https://dinesh.probuilder.in/Project |
| `/Resume` | Resume \| Dinesh Chaudhari – Full-Stack Developer | https://dinesh.probuilder.in/Resume |
| `/Contact` | Contact Dinesh Chaudhari \| Developer in Pune | https://dinesh.probuilder.in/Contact |

Descriptions are exactly as specified (118–136 characters, within the ~155-character snippet limit). Titles are 44–50 characters.

Tags shared by every route (values per route where noted):

```html
<title>…</title>                                         <!-- per route -->
<meta name="description" content="…" />                  <!-- per route -->
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<link rel="canonical" href="…" />                        <!-- per route -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Dinesh Chaudhari" />
<meta property="og:locale" content="en_IN" />
<meta property="og:title" content="…" />                 <!-- per route -->
<meta property="og:description" content="…" />          <!-- per route -->
<meta property="og:url" content="…" />                  <!-- per route -->
<meta property="og:image" content="https://dinesh.probuilder.in/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Dinesh Chaudhari, Full-Stack Developer in Pune" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="…" />                <!-- per route -->
<meta name="twitter:description" content="…" />         <!-- per route -->
<meta name="twitter:image" content="https://dinesh.probuilder.in/og.png" />
<meta name="twitter:image:alt" content="Dinesh Chaudhari, Full-Stack Developer in Pune" />
```

`og.png` was checked: 1200×630, matching the declared dimensions.

## Validation

`npm run build` succeeded. A script then parsed the `<head>` of each generated file in `dist/`:

| Check | `/` | `/About` | `/Project` | `/Resume` | `/Contact` |
|---|---|---|---|---|---|
| Exactly 1 `<title>`, unique across site | ✅ | ✅ | ✅ | ✅ | ✅ |
| Exactly 1 description, unique across site | ✅ | ✅ | ✅ | ✅ | ✅ |
| Exactly 1 canonical, self-referencing | ✅ | ✅ | ✅ | ✅ | ✅ |
| og:url equals canonical | ✅ | ✅ | ✅ | ✅ | ✅ |
| Does not point to homepage (non-home routes) | n/a | ✅ | ✅ | ✅ | ✅ |
| All 17 meta tags present exactly once | ✅ | ✅ | ✅ | ✅ | ✅ |
| No `http://` URLs in `<head>` | ✅ | ✅ | ✅ | ✅ | ✅ |
| Page content prerendered in `#root` | ✅ | ✅ | ✅ | ✅ | ✅ |

Result: 0 failures. ESLint passes on all changed files.

## Notes and follow-ups

- **Unknown paths** (for example `/missing`, `/about` in lowercase) still get `index.html` through the Vercel catch-all, so they carry the homepage canonical. That consolidates them onto `/`, as before. Serving a real 404 for them would be a separate change.
- **`og:type`** is `website` on every route. `profile` would suit `/About`, but it expects extra `profile:*` tags on only some pages. A per-route `meta.ogType` override is available if that's wanted later.
- **JSON-LD** in `index.html` still says `jobTitle: "Full-Stack & Embedded Engineer"`. It was left unchanged because it's outside this task's scope; consider aligning it with the new "Full-Stack Developer" positioning.
- **After deploying**, re-run URL Inspection in Google Search Console for the five URLs. Optionally, refresh the link preview cache in LinkedIn Post Inspector for the homepage, since its title and description changed.
- **Adding a page** is still one entry in `src/routes.jsx`, one rewrite in `vercel.json` and one sitemap entry. Metadata comes for free.
