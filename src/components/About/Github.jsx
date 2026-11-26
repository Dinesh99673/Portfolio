import { lazy, useEffect, useRef, useState } from "react";
import ClientOnly from "../ClientOnly";
import "../../App.css"

// Fetches live contribution data in the browser — never rendered at build time.
const GitHubCalendar = lazy(() => import("react-github-calendar"));

/*
 * The calendar sits at the bottom of /About and its chunk is large (mostly
 * date-fns), so it is only requested once the section is within ~400px of
 * the viewport. Until then the prerendered fallback (a link to the profile)
 * stays in place.
 */
const useNearViewport = (ref) => {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, near]);
  return near;
};

function Github() {
  const ref = useRef(null);
  const near = useNearViewport(ref);

  const fallback = (
    <p className="font-mono text-sm text-ash py-10">
      Loading contributions from{" "}
      <a
        href="https://github.com/Dinesh99673"
        target="_blank"
        rel="noopener noreferrer"
        className="text-copper hover:underline"
      >
        github.com/Dinesh99673
      </a>
      …
    </p>
  );

  return (
    <div ref={ref} className="calendar-container w-[100%] overflow-auto text-ash mb-12 flex flex-col justify-center items-center">
      {near ? (
        <ClientOnly fallback={fallback}>
          <GitHubCalendar
            username="Dinesh99673"
            blockSize={15}
            blockMargin={5}
            fontSize={10}
            theme={{
              dark: ["#1c1c21", "#5a3d24", "#8a5a2f", "#c07f42", "#EDAD72"],
            }}
            colorScheme="dark"
          />
        </ClientOnly>
      ) : (
        fallback
      )}
    </div>
  );
}

export default Github;
