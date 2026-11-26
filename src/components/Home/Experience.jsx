import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SectionHeading from "../SectionHeading";

const experiences = [
  {
    role: "Full Stack Developer",
    period: "Jul 2025 — Present",
    company: "Innover Labs · Pune, Maharashtra",
    product: "Rabbitship",
    productUrl: "https://rabbitship.in/",
    summary: "production multi-courier shipping and logistics platform",
    meta: "1,000+ users · in production since early 2026",
    highlights: [
      "Sole developer of the whole platform — a React 19 and TypeScript customer app shipped to Android through Capacitor, a 31-screen super-admin operations console, and a Node.js and Firebase backend serving both.",
      "Integrated three courier and delivery providers behind a single quoting and booking abstraction, with provider-specific pricing, pincode serviceability checks and Google Maps geocoding for on-demand pickups.",
      "Built the payment stack on Cashfree — checkout, wallet, refund ledgers, a coupon engine, referral cashback and partner payouts — with signature-verified, idempotent webhook handling.",
      "Designed a custom OTA update system that ships new bundles straight to installed Android devices without a Play Store release, gated by a minimum-supported-version policy so breaking changes force a native upgrade.",
      "Implemented multi-channel messaging over the WhatsApp Business API, Web Push, SMS and email, plus a support ticket system with threaded chat and media attachments.",
      "Added AI-assisted address capture: photograph a parcel label and an OpenAI vision call returns a validated, structured Indian address, reducing a multi-field form to a single tap.",
    ],
    stack: ["React 19", "TypeScript", "Capacitor", "Node.js", "Express 5", "Firebase", "Cashfree", "OpenAI API"],
  },
  {
    role: "Full Stack Developer",
    period: "Freelance",
    company: "DSigniteFitness · Hyderabad, Telangana",
    product: "DSigniteFitness",
    productUrl: "https://www.dsignitefitness.com/",
    summary: "production website and staff portal for a premium gym",
    meta: "Live in production · 14 prerendered pages",
    highlights: [
      "Built and shipped the gym's public website: 14 prerendered pages, each with its own metadata, built to rank for local searches.",
      "Built a private staff portal with separate admin, trainer and front-desk logins, each seeing only what their role needs.",
      "Let staff publish limited-time offers that go live on the site with a running countdown, without touching code.",
      "Brought every enquiry into one leads dashboard, with email alerts for new leads and Excel export.",
      "Gave the gym self-serve control of coach profiles and job openings, backed by Firebase and Cloud Functions.",
    ],
    stack: ["React", "TypeScript", "Tailwind", "Firebase", "Cloud Functions"],
  },
];

const arrowClasses =
  "w-11 h-11 shrink-0 flex items-center justify-center border border-seam bg-panel text-bone rounded-sm hover:border-copper hover:text-copper transition-colors disabled:opacity-30 disabled:pointer-events-none";

const Experience = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(null); // null until the visitor first switches cards
  const touchStartX = useRef(null);

  const goTo = (index) => {
    if (index === active || index < 0 || index >= experiences.length) return;
    setDirection(index > active ? "next" : "prev");
    setActive(index);
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    goTo(dx < 0 ? active + 1 : active - 1);
  };

  const job = experiences[active];

  return (
    <section aria-labelledby="experience-heading" className="border-t border-seam px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto">
        <SectionHeading
          id="experience-heading"
          label="Experience"
          title="Where I work"
          sub="Products I've owned end to end."
        />

        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous experience"
            className={`${arrowClasses} hidden md:flex mt-8`}
          >
            <FiChevronLeft size={22} />
          </button>

          <div
            className="flex-1 min-w-0 overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            aria-live="polite"
          >
            <article
              key={active}
              aria-labelledby="experience-role"
              className={`bg-panel border border-seam rounded-md p-6 md:p-8 ${
                direction === "next" ? "slide-from-right" : direction === "prev" ? "slide-from-left" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-1">
                <h3 id="experience-role" className="text-2xl font-semibold text-bone">{job.role}</h3>
                <p className="font-mono text-xs md:text-sm text-copper tracking-widest uppercase">
                  {job.period}
                </p>
              </div>
              <p className="text-ash mb-6">{job.company}</p>

              <div className="border-t border-seam pt-6">
                <p className="text-bone mb-1">
                  <a
                    href={job.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-copper hover:text-copper-bright underline underline-offset-4"
                  >
                    {job.product}
                  </a>{" "}
                  — {job.summary}
                </p>
                <p className="font-mono text-xs text-ash mb-6">{job.meta}</p>

                <ul className="space-y-3">
                  {job.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-ash leading-relaxed">
                      <span className="text-copper mt-2 w-1.5 h-1.5 rounded-[1px] bg-copper shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-7">
                  {job.stack.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-xs text-bone/80 border border-seam bg-ink px-2 py-1 rounded-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>

          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === experiences.length - 1}
            aria-label="Next experience"
            className={`${arrowClasses} hidden md:flex mt-8`}
          >
            <FiChevronRight size={22} />
          </button>
        </div>

        {/* Dots + mobile arrows */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous experience"
            className={`${arrowClasses} md:hidden`}
          >
            <FiChevronLeft size={22} />
          </button>
          <div className="flex items-center gap-2">
            {experiences.map((exp, i) => (
              <button
                key={exp.product}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${exp.product}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-copper" : "w-2 bg-seam hover:bg-ash"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-ash">
            {String(active + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === experiences.length - 1}
            aria-label="Next experience"
            className={`${arrowClasses} md:hidden`}
          >
            <FiChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;
