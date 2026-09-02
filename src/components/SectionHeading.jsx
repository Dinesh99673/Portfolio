import React from "react";

/*
 * Circuit-trace section heading — the theme's signature element.
 * A short copper trace ending in a solder pad, a mono label, and a
 * hairline running to the edge.
 */
const SectionHeading = ({ label, title, sub }) => {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4" aria-hidden="true">
        <span className="h-px w-8 bg-copper" />
        <span className="w-1.5 h-1.5 bg-copper rounded-[1px]" />
        <span className="font-mono text-copper text-xs md:text-sm tracking-[0.25em] uppercase">{label}</span>
        <span className="relative flex-1 h-px bg-seam" />
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold text-bone">{title}</h2>
      {sub && <p className="text-ash mt-2 max-w-2xl">{sub}</p>}
    </div>
  );
};

export default SectionHeading;
