import React from "react";
import SectionHeading from "../SectionHeading";

const highlights = [
  "Sole developer of the whole platform — a React 19 and TypeScript customer app shipped to Android through Capacitor, a 31-screen super-admin operations console, and a Node.js and Firebase backend serving both.",
  "Integrated three courier and delivery providers behind a single quoting and booking abstraction, with provider-specific pricing, pincode serviceability checks and Google Maps geocoding for on-demand pickups.",
  "Built the payment stack on Cashfree — checkout, wallet, refund ledgers, a coupon engine, referral cashback and partner payouts — with signature-verified, idempotent webhook handling.",
  "Designed a custom OTA update system that ships new bundles straight to installed Android devices without a Play Store release, gated by a minimum-supported-version policy so breaking changes force a native upgrade.",
  "Implemented multi-channel messaging over the WhatsApp Business API, Web Push, SMS and email, plus a support ticket system with threaded chat and media attachments.",
  "Added AI-assisted address capture: photograph a parcel label and an OpenAI vision call returns a validated, structured Indian address, reducing a multi-field form to a single tap.",
];

const stack = [
  "React 19",
  "TypeScript",
  "Capacitor",
  "Node.js",
  "Express 5",
  "Firebase",
  "Cashfree",
  "OpenAI API",
];

const Experience = () => {
  return (
    <div className="border-t border-seam px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto">
        <SectionHeading
          label="Experience"
          title="Where I work"
          sub="One product, owned end to end."
        />

        <div className="bg-panel border border-seam rounded-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-1">
            <h3 className="text-2xl font-semibold text-bone">Full Stack Developer</h3>
            <p className="font-mono text-xs md:text-sm text-copper tracking-widest uppercase">
              Jul 2025 — Present
            </p>
          </div>
          <p className="text-ash mb-6">Innover Labs · Pune, Maharashtra</p>

          <div className="border-t border-seam pt-6">
            <p className="text-bone mb-1">
              <a
                href="https://rabbitship.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-copper hover:text-copper-bright underline underline-offset-4"
              >
                Rabbitship
              </a>{" "}
              — production multi-courier shipping and logistics platform
            </p>
            <p className="font-mono text-xs text-ash mb-6">350+ active users</p>

            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-ash leading-relaxed">
                  <span className="text-copper mt-2 w-1.5 h-1.5 rounded-[1px] bg-copper shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-7">
              {stack.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs text-bone/80 border border-seam bg-ink px-2 py-1 rounded-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
