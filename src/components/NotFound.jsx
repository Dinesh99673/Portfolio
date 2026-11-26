import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";

/*
 * Rendered for any URL that is not a public route. Prerendered to
 * dist/404.html, which Vercel serves with an HTTP 404 status.
 * Markup must not depend on the requested path: the same prerendered HTML
 * is hydrated at every unknown URL.
 */
const suggestions = [
  { to: "/Project", label: "Projects", note: "Things I've built" },
  { to: "/About", label: "About", note: "Background and skills" },
  { to: "/Contact", label: "Contact", note: "Get in touch" },
];

const NotFound = () => {
  return (
    <div className="py-16 px-6 md:px-16 flex min-h-screen justify-center items-center">
      <div className="w-full max-w-2xl mt-14">
        <SectionHeading
          as="h1"
          label="Error 404"
          title="Page not found"
          sub="The page you're looking for doesn't exist or has moved. Check the address, or head back to the homepage."
        />

        <p className="font-mono text-sm text-ash mb-10" aria-hidden="true">
          <span className="text-copper">{"//"}</span> no route matched this path.
        </p>

        <Link
          to="/"
          className="inline-block bg-copper hover:bg-copper-bright text-ink font-semibold px-6 py-3 rounded-sm transition-colors"
        >
          ← Back to homepage
        </Link>

        <nav aria-labelledby="notfound-suggestions" className="mt-14">
          <h2
            id="notfound-suggestions"
            className="font-mono text-copper text-xs tracking-[0.25em] uppercase mb-4"
          >
            Or try one of these
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {suggestions.map(({ to, label, note }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="block bg-panel border border-seam rounded-md px-4 py-3 hover:border-copper/70 transition-colors"
                >
                  <span className="block text-bone font-semibold">{label}</span>
                  <span className="block text-ash text-sm mt-0.5">{note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NotFound;
