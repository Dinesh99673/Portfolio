import React from "react";

import SectionHeading from "../SectionHeading";
import StackDiagram from "./StackDiagram";

const Introduction = () => {
  return (
    <div className="border-t border-seam px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-3/5 w-full">
          <SectionHeading label="Introduction" title="What I actually build" />
          <div className="text-lg text-bone/90 leading-relaxed space-y-5">
            <p>
              I&apos;m a full-stack developer at{" "}
              <b className="text-copper">Innover Labs</b> in Pune, and the sole
              developer on <b className="text-copper">Rabbitship</b> — a
              multi-courier shipping platform that has been in production since
              2025 and now serves <b className="text-copper">350+ active users</b>.
            </p>
            <p>
              That one product covers most of what I do. A React and TypeScript app
              shipped to Android through Capacitor, a 31-screen operations console
              behind it, and a Node and Firebase backend serving both. Three courier
              providers sit behind a single booking abstraction, so pricing,
              serviceability and refunds behave the same no matter who actually
              carries the parcel. Payments run on Cashfree with signature-verified,
              idempotent webhooks — a ledger that double-credits once is a ledger
              nobody trusts again.
            </p>
            <p>
              The rest of my time goes to things that don&apos;t fit in a browser.
              <b className="text-copper"> GhostDesk</b> holds an entire collaborative
              workspace in RAM and destroys it thirty seconds after the last person
              leaves. <b className="text-copper">Gesture-AI</b> is a glove that reads
              letters you write in mid-air — 6,480 training samples, a stacked LSTM,
              an ESP32 sampling at 50 Hz.
            </p>
            <p>
              If a problem needs an API, an interface, and something soldered
              underneath, that&apos;s the kind I like most.
            </p>
          </div>
        </div>
        <div className="md:w-2/5 w-full flex justify-center">
          <StackDiagram />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
