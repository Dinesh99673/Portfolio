import React, { useRef } from "react";
import toon from "../../assets/me-toon.jpg";
import real from "../../assets/me-real.jpg";

const SPREAD_MS = 1100;
const DRAIN_MS = 850;
/* Liquid easing: a gentle push off the start, then a long settle. Sharper
   curves (easeOutExpo and friends) finish ~95% in the first 120ms, which
   reads as a snap rather than something spreading. */
const LIQUID = "cubic-bezier(0.37, 0.01, 0.18, 1)";

/*
 * Toon portrait that the real photo washes over on hover.
 * The reveal opens as a circle at the point the cursor entered and
 * drains back to the point it left, so the motion always follows the
 * pointer instead of fading in place.
 */
const HoverPortrait = () => {
  const frameRef = useRef(null);
  const overlayRef = useRef(null);
  const photoRef = useRef(null);
  const rippleRef = useRef(null);
  const revealedRef = useRef(false);
  const touchRef = useRef(false);

  const reduceMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Pointer position within the frame, plus the radius that reaches its
  // furthest corner — so the circle always finishes covering the photo.
  // Clamped to the frame: pointerleave reports the first position outside
  // it, and draining to a point off in space misses the exit edge.
  const measure = (e) => {
    const rect = frameRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height);
    const r = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y)
    );
    return { x, y, r };
  };

  const clipTo = (x, y, r, ms) => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.transition = ms ? `clip-path ${ms}ms ${LIQUID}` : "none";
    el.style.clipPath = `circle(${r}px at ${x}px ${y}px)`;
  };

  const splash = (x, y) => {
    const el = rippleRef.current;
    if (!el) return;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.classList.remove("drop-ripple--run");
    void el.offsetWidth; // restart the keyframes
    el.classList.add("drop-ripple--run");
  };

  const open = (e) => {
    const { x, y, r } = measure(e);
    const ms = reduceMotion() ? 0 : SPREAD_MS;

    // Seed the circle closed at the entry point, commit it, then grow —
    // otherwise it would slide over from wherever the last exit was.
    clipTo(x, y, 0, 0);
    void overlayRef.current.offsetWidth;
    clipTo(x, y, r, ms);

    if (photoRef.current) {
      photoRef.current.style.transition = ms ? `transform ${ms + 300}ms ${LIQUID}` : "none";
      photoRef.current.style.transform = "scale(1)";
    }
    if (!reduceMotion()) splash(x, y);
    revealedRef.current = true;
  };

  const close = (e) => {
    const { x, y } = measure(e);
    // Centre and radius animate together, so the circle drains toward the
    // exit point rather than collapsing where it started.
    clipTo(x, y, 0, reduceMotion() ? 0 : DRAIN_MS);
    if (photoRef.current) photoRef.current.style.transform = "scale(1.05)";
    revealedRef.current = false;
  };

  const handleEnter = (e) => {
    if (e.pointerType === "touch") return;
    open(e);
  };

  const handleLeave = (e) => {
    if (e.pointerType === "touch") return;
    close(e);
  };

  // Touch has no hover — tap toggles from wherever the finger landed.
  const handlePointerDown = (e) => {
    if (e.pointerType !== "touch") return;
    touchRef.current = true;
    revealedRef.current ? close(e) : open(e);
  };

  // Keyboard reveal opens from the middle, the only sensible origin.
  const fromCenter = (opening) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = rect.width / 2;
    const y = rect.height / 2;
    const r = Math.hypot(rect.width, rect.height) / 2;
    const ms = reduceMotion() ? 0 : opening ? SPREAD_MS : DRAIN_MS;
    if (opening) {
      clipTo(x, y, 0, 0);
      void overlayRef.current.offsetWidth;
      clipTo(x, y, r, ms);
      if (!reduceMotion()) splash(x, y);
    } else {
      clipTo(x, y, 0, ms);
    }
    revealedRef.current = opening;
  };

  return (
    <button
      type="button"
      ref={frameRef}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onPointerDown={handlePointerDown}
      onFocus={() => !touchRef.current && fromCenter(true)}
      onBlur={() => fromCenter(false)}
      onClick={(e) => e.preventDefault()}
      aria-label="Reveal the real photo of Dinesh Chaudhari"
      className="group relative block w-64 md:w-80 aspect-[4/5] border border-seam bg-panel p-2 cursor-pointer"
    >
      {/* copper corner ticks — schematic frame */}
      <span aria-hidden="true" className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-copper" />
      <span aria-hidden="true" className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-copper" />
      <span aria-hidden="true" className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-copper" />
      <span aria-hidden="true" className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-copper" />

      <div className="relative w-full h-full overflow-hidden">
        <img
          src={toon}
          alt="Cartoon portrait of Dinesh Chaudhari"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{ clipPath: "circle(0px at 50% 50%)", willChange: "clip-path" }}
        >
          <img
            ref={photoRef}
            src={real}
            alt="Dinesh Chaudhari"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "scale(1.05)", willChange: "transform" }}
          />
        </div>
        <span ref={rippleRef} className="drop-ripple" aria-hidden="true" />
      </div>
    </button>
  );
};

export default HoverPortrait;
