import { Suspense, useEffect, useState } from "react";

/*
 * Renders `fallback` on the server and during hydration, then swaps in
 * `children` after mount. Pair it with React.lazy so browser-only
 * libraries are never imported during prerendering, and the first client
 * render matches the static HTML exactly.
 */
const ClientOnly = ({ children, fallback = null }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return fallback;
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default ClientOnly;
