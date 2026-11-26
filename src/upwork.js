export const UPWORK_URL = "https://www.upwork.com/freelancers/~01467adfc75e48ae91";

// Logs a Clarity custom event (e.g. "upwork_click_hero") so each placement's
// clicks can be filtered under Clarity → Filters → Custom events.
export const trackUpwork = (placement) => {
  if (typeof window !== "undefined" && typeof window.clarity === "function") {
    window.clarity("event", `upwork_click_${placement}`);
  }
};
