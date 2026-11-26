/*
 * Build-time renderer. Bundled by `vite build --ssr` and called from
 * scripts/prerender.js — never shipped to the browser.
 *
 * Browser-only libraries (react-pdf / pdf.js, react-github-calendar) sit
 * behind <ClientOnly> + React.lazy, so their modules are never imported
 * here. Microsoft Clarity lives in index.html and is copied, not executed.
 */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppShell } from "./App.jsx";

export { routes, canonicalFor, OG_IMAGE } from "./routes.jsx";

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>
  );
}
