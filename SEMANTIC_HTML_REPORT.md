# Semantic HTML & Heading Structure Report

Site: https://dinesh.probuilder.in · Date: 2026-11-26

## Summary

| Route | Primary H1 (before) | Primary H1 (after) |
|---|---|---|
| `/` | I build products from firmware to frontend. | **Dinesh Chaudhari – Full-Stack Developer in Pune** |
| `/About` | Background | **About Dinesh Chaudhari** |
| `/Project` | Selected work | **Software Development Projects by Dinesh Chaudhari** |
| `/Resume` | Resume | **Dinesh Chaudhari – Professional Resume** |
| `/Contact` | Get in touch | **Contact Dinesh Chaudhari** |

Each route already had exactly one H1, but the H1 texts were generic and said nothing about who the page belongs to. Now every route has one descriptive H1, the heading outline has no skipped levels, the routed content sits inside a single `<main>` landmark, and every `<section>` / `<article>` is named with `aria-labelledby`.

## Audit findings (before)

1. **No `<main>` landmark.** Page content sat directly between `<header>` and `<footer>`.
2. **Generic H1s.** None of the H1s named the person or the page topic.
3. **Headings marked up as `<p>`.** "Away from the keyboard", "Achievements", "Education" and the tech-stack group labels ("Languages", "Frontend", …) work as headings but were paragraphs.
4. **Unnamed regions.** Whole pages were wrapped in one unlabelled `<section>`, while the real sub-sections were plain `<div>`s.
5. **Heading gap on filtered Projects.** When a filter left no featured projects, the "More projects" H2 was not rendered, so card H3s sat directly under the H1.
6. **Mobile menu reachable while closed.** It was hidden only with `opacity-0`/`pointer-events-none`, so its links stayed in the tab order and the accessibility tree.
7. **Icon-only links** (GitHub, Upwork, LinkedIn, Instagram, logo "DC.") relied on `title` for their names.
8. **Form result not announced.** The Contact success and error messages mounted without a live region.

## Changes

### Reusable components
- **`SectionHeading.jsx`**: already had an `as` prop (default `h2`). Added an `id` prop so wrapping sections can use `aria-labelledby`, and documented that only a page passes `as="h1"`. No reusable component defaults to H1.
- **`App.jsx`**: wrapped `<Routes>` in `<main id="main-content">` and added a "Skip to content" link. The link is visually hidden until it gets keyboard focus.
- **`Navbar.jsx`**: the desktop `<nav aria-label="Primary">`; the mobile dropdown is now `<nav id="mobile-menu" aria-label="Mobile">` with `aria-controls` on the toggle. When closed it is `invisible`. Visibility switches after the fade, so the animation is unchanged. Added `aria-label`s to the logo and the GitHub links.
- **`Footer.jsx`**: social links are grouped in `<nav aria-label="Social">`, each with an `aria-label`.

### Home (`/`)
- The eyebrow line ("Dinesh Chaudhari · Pune, IN") is now the H1 and reads "Dinesh Chaudhari – Full-Stack Developer in Pune". Its styling (mono, copper, uppercase) is unchanged.
- The large tagline "I build products from firmware to frontend." keeps its exact styling but is now a `<p>`, because it is a slogan, not a title.
- The hero, Introduction, Experience and Elsewhere blocks are now `<section aria-labelledby>`. The experience card is an `<article>`.

### About (`/About`)
- H1 title: "Background" → "About Dinesh Chaudhari".
- The page root is now a `<div>`. AboutCard, Credentials, Skillset, Toolbox and Activity are each a labelled `<section>`.
- `<p>` → `<h2>` for "Away from the keyboard". `<p>` → `<h3>` for "Achievements", "Education" and the six tech-stack groups.
- Decorative icons are marked `aria-hidden`.

### Projects (`/Project`)
- H1 title: "Selected work" → "Software Development Projects by Dinesh Chaudhari".
- "Featured" and "More projects" groups are labelled `<section>`s, and each project card is an `<article>` labelled by its H3.
- The second-group H2 now always renders. When no featured group precedes it, it uses `sr-only` (e.g. "Embedded projects"), so the visible layout matches the old behaviour and the outline never skips a level.
- Alt text: "`{title}` screenshot" → "Screenshot of `{title}`". Decorative link icons are `aria-hidden`.

### Resume (`/Resume`)
- H1 title: "Resume" → "Dinesh Chaudhari – Professional Resume".
- The PDF loading spinner now has `role="status"` and `aria-label="Loading resume"`.

### Contact (`/Contact`)
- H1 title: "Get in touch" → "Contact Dinesh Chaudhari". The intro sentence below it is kept.
- The `<form>` is labelled by the H1. The honeypot is `aria-hidden`. Success and error messages are inside an always-mounted `role="status"` live region.

### Images
All `<img>` elements have meaningful alt text: two portrait images, the About illustration and 11 project screenshots. Icon SVGs inside links that also have visible text are `aria-hidden`.

## Visual impact
- Fonts, sizes, colours, spacing, animations and responsive layouts are unchanged. Tailwind's preflight resets heading size and weight, so a `<p>` changed to `<h2>`/`<h3>` with the same classes renders identically.
- **Visible copy did change** in five places, because those are the H1s: the home eyebrow line and the four interior page titles listed above. On mobile, the longer home eyebrow and Projects title wrap onto two lines.

## Validation

### `npm run build`
Passed. The client build, SSR build and prerender all succeeded, and all five routes were written to `dist/`.

### Prerendered HTML audit
A script checked each `dist/*.html` for the H1 count, skipped heading levels, the landmark count, `aria-labelledby` targets that do not exist, duplicate ids, `<img>` alt text and unnamed `<section>`s. **Result: 0 problems.**

```
/          h1 Dinesh Chaudhari – Full-Stack Developer in Pune
             h2 What I actually build
             h2 Where I work
               h3 Full Stack Developer
             h2 Elsewhere
           main=1 section=4 article=1 · 2 images, all with alt

/About     h1 About Dinesh Chaudhari
             h2 Away from the keyboard
             h2 Achievements & education → h3 Achievements, h3 Education
             h2 What I build with → h3 × 6 groups
             h2 Daily drivers
             h2 Commit history
           main=1 section=5 · 1 image, with alt

/Project   h1 Software Development Projects by Dinesh Chaudhari
             h2 Featured → h3 × 4 projects
             h2 More projects → h3 × 9 projects
           main=1 section=2 article=13 · 11 images, all with alt

/Resume    h1 Dinesh Chaudhari – Professional Resume
           main=1

/Contact   h1 Contact Dinesh Chaudhari
           main=1 · form labelled by h1
```

On every route: exactly 1 `<header>`, 1 `<main>`, 1 `<footer>` and 3 `<nav>` (primary, mobile, social).

### Lint
`npx eslint src` reports 35 errors, all in rule categories the codebase already had:
- `react/prop-types`: the project does not use PropTypes. The new `id` prop on `SectionHeading` adds one more of these.
- Unused `React` imports.
- Pre-existing `'` and `//` text in AboutCard and StackDiagram.

None of them affects behaviour.

### Not verified here
- Screen-reader and visual checks in a real browser.
- Client-side filter states on `/Project`. The static audit covers only the default "All" view; the hidden-heading logic for other filters was checked by reading the code.

Recommended follow-up: run Lighthouse Accessibility and the WAVE extension on the deployed preview, and do a quick visual pass on mobile.
