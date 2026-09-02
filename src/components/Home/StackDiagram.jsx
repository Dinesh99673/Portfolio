import React from "react";

/*
 * The three layers named in the hero, drawn as a board: one copper rail
 * with a solder pad branching into each layer. Replaces a stock avatar
 * with something that states the actual claim.
 */
const layers = [
  {
    tier: "Interface",
    detail: "React · TypeScript · Tailwind · Capacitor",
    note: "Web and Android, one codebase",
  },
  {
    tier: "Service",
    detail: "Node · Express · Firebase · WebRTC",
    note: "APIs, payments, real-time sync",
  },
  {
    tier: "Firmware",
    detail: "ESP32 · Arduino C++ · IMU sensors",
    note: "Where the signal actually starts",
  },
];

const StackDiagram = () => {
  return (
    <div className="w-full max-w-sm">
      <div className="relative pl-8">
        {/* the rail */}
        <span
          aria-hidden="true"
          className="absolute left-[3px] top-3 bottom-3 w-px bg-copper/50"
        />

        <ul className="space-y-4">
          {layers.map(({ tier, detail, note }) => (
            <li key={tier} className="relative">
              {/* solder pad + branch into the card */}
              <span
                aria-hidden="true"
                className="absolute -left-8 top-6 w-2 h-2 rounded-[1px] bg-copper"
              />
              <span
                aria-hidden="true"
                className="absolute -left-[26px] top-[27px] h-px w-6 bg-copper/50"
              />

              <div className="bg-panel border border-seam rounded-md px-4 py-3 hover:border-copper/60 transition-colors">
                <p className="font-mono text-xs text-copper tracking-[0.2em] uppercase">
                  {tier}
                </p>
                <p className="text-bone text-sm mt-1.5">{detail}</p>
                <p className="text-ash text-xs mt-1">{note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-mono text-[11px] text-ash mt-4 pl-8 leading-relaxed">
        <span className="text-copper">//</span> most people own one of these.
        <br />
        <span className="text-copper">//</span> I like the seams between them.
      </p>
    </div>
  );
};

export default StackDiagram;
