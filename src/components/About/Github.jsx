import { lazy } from "react";
import ClientOnly from "../ClientOnly";
import "../../App.css"

// Fetches live contribution data in the browser — never rendered at build time.
const GitHubCalendar = lazy(() => import("react-github-calendar"));

function Github() {
  return (
    <div className="calendar-container w-[100%] overflow-auto text-ash mb-12 flex flex-col justify-center items-center">
      <ClientOnly
        fallback={
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
        }
      >
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
    </div>
  );
}

export default Github;
