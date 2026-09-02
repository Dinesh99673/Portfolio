import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink, FiAward } from "react-icons/fi";

const ProjectCard = ({ title, description, tech, image, githubLink, liveLink, award, awardLink, featured }) => {
  return (
    <div
      className="card-enter relative flex flex-col bg-panel border border-seam rounded-md overflow-hidden hover:border-copper/70 transition-colors duration-300 group"
    >
      {award && (
        <span className="absolute top-3 right-3 z-10 font-mono bg-copper text-ink text-xs font-semibold px-2.5 py-1 rounded-sm">
          🏆 {award}
        </span>
      )}

      <div className="aspect-video overflow-hidden border-b border-seam">
        <img
          src={image}
          alt={`${title} screenshot`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className={`text-bone font-semibold mb-2 ${featured ? "text-2xl" : "text-xl"}`}>{title}</h3>
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
              <AiFillGithub className="text-lg" /> GitHub
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-ash hover:text-trace transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-trace inline-block" aria-hidden="true" /> Live <FiExternalLink />
            </a>
          )}
          {awardLink && (
            <a
              href={awardLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-ash hover:text-copper transition-colors"
            >
              <FiAward className="text-base" /> Certificate <FiExternalLink />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
