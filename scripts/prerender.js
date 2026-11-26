/*
 * Static prerendering for the public routes.
 *
 * Runs after:
 *   1. `vite build`                                  → dist/ (client bundle + index.html template)
 *   2. `vite build --ssr src/entry-server.jsx ...`   → dist-ssr/entry-server.js
 *
 * For every route in src/routes.jsx (plus the Not Found page → 404.html)
 * it renders the React tree to HTML, injects it into the template's #root,
 * rewrites the page-specific <head> tags, and writes dist/<route.file>. Any template tag it cannot find
 * fails the build instead of silently shipping wrong metadata.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const serverEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, routes, NOT_FOUND_ROUTE, headTagsFor, SITE_URL } = await import(pathToFileURL(serverEntry).href);
const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

// Vercel only serves dist/About.html at /About if vercel.json rewrites it
// there. Fail early if a route was added to src/routes.jsx without its rewrite.
const vercel = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf-8"));
const rewrites = vercel.rewrites ?? [];
for (const route of routes.filter((r) => r.path !== "/")) {
  if (!rewrites.some((rw) => rw.source === route.path && rw.destination === `/${route.file}`)) {
    throw new Error(`[prerender] vercel.json needs { "source": "${route.path}", "destination": "/${route.file}" }`);
  }
}
// Unknown URLs must fall through to dist/404.html (served with a 404 status).
// A rewrite that sends them to a page would turn every typo into a soft 404.
const known = new Set(routes.map((r) => r.path));
for (const rw of rewrites) {
  if (!known.has(rw.source)) {
    throw new Error(
      `[prerender] vercel.json rewrite "${rw.source}" → "${rw.destination}" is not a public route; ` +
        `catch-all rewrites break 404 handling`
    );
  }
}

const escapeAttr = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Replace exactly one match of `pattern` or throw. */
const replaceOnce = (html, pattern, replacement, label, file) => {
  const matches = html.match(new RegExp(pattern.source, "g")) ?? [];
  if (matches.length !== 1) {
    throw new Error(`[prerender] ${file}: expected 1 "${label}" in template, found ${matches.length}`);
  }
  return html.replace(pattern, replacement);
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const metaTag = (attr, key) => new RegExp(`<meta ${attr}="${escapeRe(key)}" content="[^"]*"\\s*/?>`);

// Any path that is not a route renders the Not Found page; this one is
// guaranteed not to be a route, so the markup matches what React renders
// at every unknown URL (no active nav link, Not Found content).
const NOT_FOUND_RENDER_PATH = "/__not-found__";

for (const route of [...routes, NOT_FOUND_ROUTE]) {
  const isNotFound = route === NOT_FOUND_ROUTE;
  const head = headTagsFor(route);
  const appHtml = render(isNotFound ? NOT_FOUND_RENDER_PATH : route.path);

  if (!appHtml || appHtml.length < 500) {
    throw new Error(`[prerender] ${route.path}: rendered HTML is suspiciously small (${appHtml.length} chars)`);
  }
  // Canonical must be self-referencing, HTTPS and on the preferred host.
  // (The Not Found page has no URL of its own; it points at the homepage.)
  const expected = isNotFound || route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
  if (head.canonical !== expected || !head.canonical.startsWith("https://dinesh.probuilder.in/")) {
    throw new Error(`[prerender] ${route.path}: unexpected canonical ${head.canonical}`);
  }

  let html = template;
  const r = (pattern, replacement, label) => {
    html = replaceOnce(html, pattern, replacement, label, route.file);
  };

  r(/<title>[^<]*<\/title>/, `<title>${escapeText(head.title)}</title>`, "title");
  r(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${head.canonical}" />`, "canonical");
  for (const { attr, key, content } of head.meta) {
    // Function replacement so a "$" in content is never read as a pattern.
    r(metaTag(attr, key), () => `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`, key);
  }
  r(
    /<div id="root"><\/div>/,
    // data-prerendered tells main.jsx which route this markup belongs to
    // ("*" for 404.html, which is valid at any unknown path).
    () => `<div id="root" data-prerendered="${route.path}">${appHtml}</div>`,
    "#root"
  );

  if (isNotFound && !html.includes('<meta name="robots" content="noindex')) {
    throw new Error("[prerender] 404.html must carry a noindex robots meta tag");
  }

  fs.writeFileSync(path.join(distDir, route.file), html);
  console.log(`[prerender] ${route.path.padEnd(9)} → dist/${route.file}  (${(appHtml.length / 1024).toFixed(1)} KB of HTML)`);
}

// The server bundle is only a build tool; keep it out of the deploy.
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
