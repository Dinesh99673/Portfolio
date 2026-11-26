import { lazy } from "react";

/*
 * A route component whose code lives in its own chunk.
 *
 *  - Client-side navigation before the chunk has loaded goes through
 *    React.lazy, so the nearest <Suspense> boundary (App.jsx) handles it.
 *  - Once `preload()` has resolved, the component renders synchronously.
 *    The prerenderer awaits it before renderToString (which cannot wait
 *    for lazy components), and main.jsx awaits it before hydrateRoot, so
 *    hydration never suspends and never throws away the static HTML.
 *
 * `preload()` is idempotent: every caller shares one import() promise.
 */
export function lazyRoute(load) {
  let Loaded = null;
  let pending = null;

  const preload = () =>
    (pending ??= load().then((module) => {
      Loaded = module.default;
      return module;
    }));

  const Lazy = lazy(preload);

  function LazyRoute(props) {
    return Loaded ? <Loaded {...props} /> : <Lazy {...props} />;
  }
  LazyRoute.preload = preload;
  return LazyRoute;
}
