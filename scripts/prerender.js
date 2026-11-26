/*
 * Static prerendering for the public routes.
 *
 * Runs after:
 *   1. `vite build`                                  → dist/ (client bundle + index.html template)
 *   2. `vite build --ssr src/entry-server.jsx ...`   → dist-ssr/entry-server.js
 *
 * For every route in src/routes.jsx it renders the React tree to HTML,
 * injects it into the template's #root, rewrites the page-specific <head>
 * tags, and writes dist/<route.file>. Any template tag it cannot find
 * fails the build instead of silently shipping wrong metadata.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const serverEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, routes, canonicalFor } = await import(pathToFileURL(serverEntry).href);
const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

// Vercel only serves dist/About.html at /About if vercel.json rewrites it
// there (ahead of the SPA catch-all). Fail early if a route was added to
// src/routes.jsx without its rewrite.
const vercel = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf-8"));
for (const route of routes.filter((r) => r.path !== "/")) {
  const idx = vercel.rewrites.findIndex((rw) => rw.source === route.path && rw.destination === `/${route.file}`);
  const catchAll = vercel.rewrites.findIndex((rw) => rw.source === "/(.*)");
  if (idx === -1 || (catchAll !== -1 && idx > catchAll)) {
    throw new Error(
      `[prerender] vercel.json needs { "source": "${route.path}", "destination": "/${route.file}" } before the "/(.*)" catch-all`
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

const metaTag = (attr, key) => new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);

for (const route of routes) {
  const { title, description, ogDescription } = route.meta;
  const url = canonicalFor(route);
  const appHtml = render(route.path);

  if (!appHtml || appHtml.length < 500) {
    throw new Error(`[prerender] ${route.path}: rendered HTML is suspiciously small (${appHtml.length} chars)`);
  }

  let html = template;
  const r = (pattern, replacement, label) => {
    html = replaceOnce(html, pattern, replacement, label, route.file);
  };

  r(/<title>[^<]*<\/title>/, `<title>${escapeText(title)}</title>`, "title");
  r(metaTag("name", "description"), `<meta name="description" content="${escapeAttr(description)}" />`, "meta description");
  r(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, "canonical");
  r(metaTag("property", "og:title"), `<meta property="og:title" content="${escapeAttr(title)}" />`, "og:title");
  r(
    metaTag("property", "og:description"),
    `<meta property="og:description" content="${escapeAttr(ogDescription ?? description)}" />`,
    "og:description"
  );
  r(metaTag("property", "og:url"), `<meta property="og:url" content="${url}" />`, "og:url");
  r(
    /<div id="root"><\/div>/,
    // data-prerendered tells main.jsx which route this markup belongs to.
    () => `<div id="root" data-prerendered="${route.path}">${appHtml}</div>`,
    "#root"
  );

  fs.writeFileSync(path.join(distDir, route.file), html);
  console.log(`[prerender] ${route.path.padEnd(9)} → dist/${route.file}  (${(appHtml.length / 1024).toFixed(1)} KB of HTML)`);
}

// The server bundle is only a build tool; keep it out of the deploy.
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
