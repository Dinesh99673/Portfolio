# Domain Redirect Report

Preferred domain: **https://dinesh.probuilder.in**
Old domain: `https://dinesh-portfolio-gilt.vercel.app`
Date: 2026-11-26 · Commit: `314d386`

## Status

| Item | Status |
|---|---|
| Old domain → 308 to preferred domain (path + query kept) | ✅ Live for every path **except `/`** |
| `/` on the old domain | ⚠️ Still answers **200 from a stale Vercel edge-cache entry**. Needs a one-time cache purge in the dashboard (steps below). |
| README updated | ✅ |
| Existing routing, 404 handling, prerendering | ✅ Unchanged and verified |

## 1. What was there before

- `vercel.json` had page rewrites and case/trailing-slash redirects, but nothing host-specific.
- The old domain is attached to the **same Vercel project** and served a full duplicate of the site:

| URL | Before |
|---|---|
| `https://dinesh-portfolio-gilt.vercel.app/` | 200 (duplicate content) |
| `https://dinesh-portfolio-gilt.vercel.app/About?x=1` | 200 |
| `http://dinesh-portfolio-gilt.vercel.app/` | 308 → https on the **same** old host |
| `http://dinesh.probuilder.in/` | 308 → `https://dinesh.probuilder.in/` |

## 2. Can it be done in `vercel.json`?

**Yes.** Vercel redirects support a `has` condition on the request `host`. A rule that matches only the old hostname can send it to an absolute URL on the custom domain. This is versioned in the repo and covered by every deploy.

The other option is **Dashboard → Project → Settings → Domains → `dinesh-portfolio-gilt.vercel.app` → Edit → "Redirect to" `dinesh.probuilder.in` (308)**. That works too. The repo rule was chosen because it is visible in code review. Using both is harmless, because the domain-level redirect would simply act first.

## 3. Change

```json
"redirects": [
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
- **Query kept:** Vercel appends the incoming query string to the redirect destination (verified below).
- **No loops:** the rule only fires when the host is exactly `dinesh-portfolio-gilt.vercel.app`, and the destination host is different, so it can never match itself. Requests to `dinesh.probuilder.in` are unaffected.
- **HTTPS:** the destination is hard-coded `https://`. Plain-HTTP requests are upgraded by Vercel first.
- **Order:** the rule comes first, so on the old host it wins over the case-variant redirects.
- **Preview deployments** (`dinesh-portfolio-<hash>-….vercel.app`) use other hostnames and are not redirected, so previews keep working.

`README.md`: the "My personal portfolio" link now points to `https://dinesh.probuilder.in/` instead of the old domain. No other repo file referenced it, apart from the historical `SEO_AUDIT_REPORT.md`, which was left as a record.

## 4. Verification on production (after deploy)

`npm run build` passed and the GitHub commit status was "Vercel — Deployment has completed".

| Request | Result |
|---|---|
| `https://dinesh-portfolio-gilt.vercel.app/About` | **308** → `https://dinesh.probuilder.in/About` |
| `…/Project` | **308** → `https://dinesh.probuilder.in/Project` |
| `…/Resume` | **308** → `https://dinesh.probuilder.in/Resume` |
| `…/Contact` | **308** → `https://dinesh.probuilder.in/Contact` |
| `…/Project?utm_source=x&a=1` | **308** → `https://dinesh.probuilder.in/Project?utm_source=x&a=1` ✅ query kept |
| `…/random-invalid-route` | **308** → same path on new domain, which then returns 404 |
| `…/assets/nonexistent.js`, `/og.png`, `/sitemap.xml`, `/index.html` | **308** → same path on new domain |
| `http://dinesh-portfolio-gilt.vercel.app/About?x=1` | 308 → https (old host) → 308 → new domain |
| `…/about?x=1` (full chain) | 308 → `https://dinesh.probuilder.in/about?x=1` → 308 → `/About?x=1` → **200** (no loop) |
| `https://dinesh-portfolio-gilt.vercel.app/` | ⚠️ **200**, `X-Vercel-Cache: HIT`, `Age: 331` |
| `https://dinesh.probuilder.in/`, `/About` | 200 ✅ |
| `https://dinesh.probuilder.in/random-invalid-route` | 404 ✅ |

### Why `/` still returns 200

`/` on **both** hostnames returned the exact same cache entry (`X-Vercel-Cache: HIT`, identical `Age`). That entry was created a few minutes **before** the redirect deployed. The generated `index.html` was byte-identical across the two deployments, so Vercel's CDN kept serving the cached response, and a cache hit is answered before the new redirect rule is evaluated. No other path had a cached entry, which is why all of them redirect.

## 5. Required dashboard step: purge the CDN cache (one-time)

This can't be done from the repository. In the Vercel dashboard:

1. Open **vercel.com → your team → the portfolio project**.
2. Go to **Settings → Caches** (labelled "Data Cache" / "CDN Cache" depending on the dashboard version).
3. Click **Purge CDN Cache** (or "Purge Everything") and confirm.
4. Re-test:
   ```bash
   curl -sI https://dinesh-portfolio-gilt.vercel.app/ | grep -iE "^(HTTP|location)"
   # expected: HTTP/1.1 308 Permanent Redirect
   #           Location: https://dinesh.probuilder.in/
   ```

If you can't find a purge control, either of these also fixes it:
- **Settings → Domains →** `dinesh-portfolio-gilt.vercel.app` **→ Edit → Redirect to** `dinesh.probuilder.in`, **308 Permanent**. A domain-level redirect is applied ahead of the project's cache.
- Wait for the next deployment that changes `index.html`, for example any change to the JS/CSS bundle.

## 6. Follow-ups

- **Google Search Console:** if the old `vercel.app` host was ever verified, you can file a **Change of Address** to `dinesh.probuilder.in`. Otherwise Google consolidates through the 308s on recrawl.
- **External links** (LinkedIn, Upwork, résumé PDF, GitHub profile README): update any that still use the old domain. They keep working through the redirect, but a direct link avoids the extra hop.
