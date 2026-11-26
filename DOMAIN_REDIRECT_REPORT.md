# Domain Redirect Report

Preferred domain: **https://dinesh.probuilder.in**
Old domain: `https://dinesh-portfolio-gilt.vercel.app`
Date: 2026-11-26 · Commits: `314d386` (redirect + README), `1be3958` (explicit root rule)

## Status

| Item | Status |
|---|---|
| Old domain → **308** to preferred domain, every path including `/` | ✅ Live, verified on production |
| Path and query string kept | ✅ |
| No redirect loops; HTTPS throughout | ✅ |
| README updated | ✅ |
| Existing routing, 404 handling, prerendering | ✅ Unchanged and verified |
| Vercel dashboard changes needed | **None** |

## 1. What was there before

- `vercel.json` had page rewrites and case/trailing-slash redirects, but nothing host-specific.
- The old domain is attached to the **same Vercel project** and served a full duplicate of the site:

| URL | Before |
|---|---|
| `https://dinesh-portfolio-gilt.vercel.app/` | 200 (duplicate content) |
| `https://dinesh-portfolio-gilt.vercel.app/About?x=1` | 200 |
| `http://dinesh-portfolio-gilt.vercel.app/` | 308 → https on the **same** old host |

## 2. Can it be done in `vercel.json`?

**Yes.** Vercel redirects support a `has` condition on the request `host`. A rule that matches only the old hostname can send it to an absolute URL on the custom domain. This is versioned in the repo and applied on every deploy, so no dashboard configuration is required.

(Equivalent alternative, not needed: **Dashboard → Project → Settings → Domains → `dinesh-portfolio-gilt.vercel.app` → Edit → Redirect to `dinesh.probuilder.in`, 308.** Using both would be harmless.)

## 3. Change

```json
"redirects": [
  {
    "source": "/",
    "has": [{ "type": "host", "value": "dinesh-portfolio-gilt.vercel.app" }],
    "destination": "https://dinesh.probuilder.in/",
    "permanent": true
  },
  {
    "source": "/:path*",
    "has": [{ "type": "host", "value": "dinesh-portfolio-gilt.vercel.app" }],
    "destination": "https://dinesh.probuilder.in/:path*",
    "permanent": true
  },
  …existing case/trailing-slash redirects…
]
```

- **308 permanent:** `"permanent": true`.
- **Path kept:** `/:path*` → `/:path*`.
- **Query kept:** Vercel appends the incoming query string to the destination automatically.
- **Why an explicit `/` rule?** The first deploy had only the `/:path*` rule. It redirected every path except the bare root, which still returned 200 with the homepage. On Vercel, `/:path*` did not catch `/`. Adding the explicit `/` rule fixed it immediately; this was verified, not assumed.
- **No loops:** both rules fire only when the host is exactly `dinesh-portfolio-gilt.vercel.app`. The destination is a different host, so neither rule can match its own output. Requests to `dinesh.probuilder.in` are unaffected.
- **HTTPS:** the destination is hard-coded `https://`. Plain-HTTP requests are upgraded by Vercel first.
- **Order:** these rules come first, so on the old host they win over the case-variant redirects.
- **Preview deployments** (`dinesh-portfolio-<hash>-….vercel.app`) use other hostnames and are not redirected, so previews keep working.

`README.md`: the "My personal portfolio" link now points to `https://dinesh.probuilder.in/` instead of the old domain. No other repo file referenced it, apart from the historical `SEO_AUDIT_REPORT.md`, which was left as a record.

## 4. Verification on production

`npm run build` passed, and the GitHub commit status for `1be3958` was "Vercel — Deployment has completed".

**Old domain**

| Request | Result |
|---|---|
| `https://dinesh-portfolio-gilt.vercel.app/` | **308** → `https://dinesh.probuilder.in/` |
| `…/?utm_source=t&x=1` | **308** → `https://dinesh.probuilder.in/?utm_source=t&x=1` |
| `…/About` | **308** → `https://dinesh.probuilder.in/About` |
| `…/Project` | **308** → `https://dinesh.probuilder.in/Project` |
| `…/Resume` | **308** → `https://dinesh.probuilder.in/Resume` |
| `…/Contact` | **308** → `https://dinesh.probuilder.in/Contact` |
| `…/Project?utm_source=x&a=1` | **308** → `https://dinesh.probuilder.in/Project?utm_source=x&a=1` |
| `…/random-invalid-route` | **308** → same path on new domain, which then returns 404 |
| `…/og.png` | **308** → `https://dinesh.probuilder.in/og.png` |
| `http://dinesh-portfolio-gilt.vercel.app/` (full chain) | 308 → `https://…gilt.vercel.app/` → 308 → `https://dinesh.probuilder.in/` → **200** |

**Preferred domain (regression check)**

| Request | Result |
|---|---|
| `/`, `/About`, `/Project`, `/Resume`, `/Contact` | 200 |
| `/random-invalid-route` | 404 |
| `/about` | 308 → `/About` |

## 5. Follow-ups (optional)

- **Google Search Console:** if the old `vercel.app` host was ever verified, you can file a **Change of Address** to `dinesh.probuilder.in`. Otherwise Google consolidates through the 308s on recrawl.
- **External links** (LinkedIn, Upwork, résumé PDF, GitHub profile README): update any that still use the old domain. They keep working through the redirect, but a direct link avoids the extra hop.
