import { useState } from 'react';
import ProjectCard from './ProjectCard.jsx';
import ProjectData from './ProjectData.jsx';
import SectionHeading from '../SectionHeading.jsx';

const FILTERS = ["All", "Web", "AI", "Embedded", "Blockchain"];

const Projects = () => {
  const [active, setActive] = useState("All");

  const visible = active === "All"
    ? ProjectData
    : ProjectData.filter((p) => p.categories?.includes(active));
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-16 px-6 md:px-16 min-h-screen">
      <div className="max-w-screen-xl mx-auto mt-14">
        <SectionHeading
          label="Projects"
          title="Selected work"
          sub="From soldered prototypes to deployed products — a few things I've built recently."
        />

        <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter projects by category">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`font-mono text-xs md:text-sm tracking-widest uppercase px-4 py-2 rounded-sm border transition-colors ${
                active === f
                  ? "border-copper bg-copper text-ink font-semibold"
                  : "border-seam text-ash hover:border-copper/60 hover:text-bone"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {featured.length > 0 && (
          <>
            <p className="font-mono text-copper text-xs tracking-[0.25em] uppercase mb-6">Featured</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featured.map((project) => (
                <ProjectCard key={project.title} {...project} featured />
              ))}
            </div>
          </>
        )}

        {rest.length > 0 && (
          <>
            {featured.length > 0 && (
              <p className="font-mono text-copper text-xs tracking-[0.25em] uppercase mb-6">More projects</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </>
        )}

        {visible.length === 0 && (
          <p className="text-ash font-mono">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
