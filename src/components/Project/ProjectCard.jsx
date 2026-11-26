import { memo } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink, FiAward, FiYoutube } from "react-icons/fi";

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const ProjectCard = ({ title, description, tech, image, githubLink, liveLink, award, awardLink, videoId, featured, priority = false }) => {
  const headingId = `project-${slug(title)}`;
  return (
    <article
      aria-labelledby={headingId}
      className="card-enter relative flex flex-col bg-panel border border-seam rounded-md overflow-hidden hover:border-copper/70 transition-colors duration-300 group"
    >
      {award && (
        <span className="absolute top-3 right-3 z-10 font-mono bg-copper text-ink text-xs font-semibold px-2.5 py-1 rounded-sm">
          🏆 {award}
        </span>
      )}

      <div className="relative aspect-video overflow-hidden border-b border-seam bg-ink">
        {videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&rel=0`}
            title={`${title} demo video`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <img
            src={image}
            alt={`Screenshot of ${title}`}
            // Every source is 1200px wide; 16:9 matches the aspect-video frame.
            width={1200}
            height={675}
            // The first featured card is above the fold and usually the LCP.
            loading={priority ? "eager" : "lazy"}
            // React 18 only passes the lowercase attribute through (fetchPriority warns).
            // eslint-disable-next-line react/no-unknown-property
            fetchpriority={priority ? "high" : "auto"}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 id={headingId} className={`text-bone font-semibold mb-2 ${featured ? "text-2xl" : "text-xl"}`}>{title}</h3>
        <p className="text-ash text-sm leading-relaxed mb-4 flex-1">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {tech.map((item, idx) => (
            <span key={idx} className="font-mono text-xs text-bone/80 border border-seam bg-ink px-2 py-1 rounded-sm">
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 font-mono text-sm">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-ash hover:text-copper transition-colors"
            >
              <AiFillGithub className="text-lg" aria-hidden="true" /> GitHub
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-ash hover:text-trace transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-trace inline-block" aria-hidden="true" /> Live <FiExternalLink aria-hidden="true" />
            </a>
          )}
          {videoId && (
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-ash hover:text-copper transition-colors"
            >
              <FiYoutube className="text-base" aria-hidden="true" /> Demo <FiExternalLink aria-hidden="true" />
            </a>
          )}
          {awardLink && (
            <a
              href={awardLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-ash hover:text-copper transition-colors"
            >
              <FiAward className="text-base" aria-hidden="true" /> Certificate <FiExternalLink aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

// Cards get static props from ProjectData, so filtering only re-renders
// the cards whose props actually change.
export default memo(ProjectCard);
