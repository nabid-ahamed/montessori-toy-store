"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BRAND_NAME } from "@/lib/config";

// ── Timing (all ms unless noted) ────────────────────────────────────────────
const MIN_VISIBLE_MS = 800; // never flash away faster than this
const MAX_TIMEOUT_MS = 4000; // hard cap: a slow network can't trap the user
const PROGRESS_SNAP_MS = 300; // progress line fills to 100% before the fade
const DRAW_S = 0.6; // sprig self-draw (stem), leaves stagger within it
const WORDMARK_DELAY_S = 0.4;
const WORDMARK_DUR_S = 0.35;
const PROGRESS_FILL_S = 0.8; // fills to 0.9 while loading
const PROGRESS_REDUCED_S = 0.3;
const FADE_OUT_S = 0.5;
const FADE_OUT_REDUCED_S = 0.25;

// ── Journal-reference tokens (self-contained; independent of the store theme) ─
const PAPER = "#F6F2E9";
const INK = "#26241C";
const NEEM = "#34513A";
const HONEY = "#B9863E";

// Sprig geometry — same paths as the brand NeemSprig, rendered as strokes so
// they can "self-draw" via pathLength. Stem draws bottom→top; leaves stagger to
// match the stem passing each pair.
const STEM = "M32 61C32 45 32 30 32 6";
const LEAVES: { d: string; delay: number }[] = [
  { d: "M32 38c-6-4-11-2-13 5 8 3 12 1 13-5Z", delay: 0.15 },
  { d: "M32 38c6-4 11-2 13 5-8 3-12 1-13-5Z", delay: 0.15 },
  { d: "M32 24c-6-4-12-2-14 5 8 3 13 1 14-5Z", delay: 0.28 },
  { d: "M32 24c6-4 12-2 14 5-8 3-13 1-14-5Z", delay: 0.28 },
  { d: "M32 12c-4-3-8-2-9 3 5 2 8 1 9-3Z", delay: 0.4 },
  { d: "M32 12c4-3 8-2 9 3-5 2-8 1-9-3Z", delay: 0.4 },
];

// Runs before first paint: on a repeat visit within the session it hides the
// overlay instantly (CSS), so it never flashes while React catches up.
const GUARD_SCRIPT = `try{if(sessionStorage.getItem('preloaderShown')){document.documentElement.classList.add('preloader-skip')}}catch(e){}`;

/**
 * Branded first-load splash. Full-screen paper overlay: a neem sprig draws
 * itself, the wordmark fades up beneath it, and a honey progress line fills as
 * the page becomes ready. Shows only once per session (sessionStorage), dismisses
 * on real readiness (window load) with an 800ms floor and 4s ceiling, then fades
 * out and unmounts. Respects reduced-motion, locks body scroll while visible, and
 * is SSR-safe (page content renders underneath, so crawlers are never blocked).
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState<"loading" | "completing">("loading");
  const overflowRef = useRef("");

  useEffect(() => {
    // Repeat visit → the guard script already hid it; unmount without running.
    let shown = false;
    try {
      shown = sessionStorage.getItem("preloaderShown") === "1";
    } catch {
      // sessionStorage unavailable (privacy mode) — treat as first visit.
    }
    if (shown) {
      setVisible(false);
      return;
    }
    try {
      sessionStorage.setItem("preloaderShown", "1");
    } catch {
      // ignore
    }

    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    // Lock body scroll while the splash is up.
    overflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let dismissed = false;
    let snapTimer = 0;

    // Exit choreography: snap progress → 1 (300ms), THEN fade the overlay out.
    const beginExit = () => {
      if (dismissed) return;
      dismissed = true;
      setPhase("completing");
      snapTimer = window.setTimeout(() => setVisible(false), PROGRESS_SNAP_MS);
    };

    // Dismiss at max(minVisible, ready).
    const tryDismiss = () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
      window.setTimeout(beginExit, wait);
    };

    const onReady = () => tryDismiss();
    if (document.readyState === "complete") tryDismiss();
    else window.addEventListener("load", onReady, { once: true });

    // Hard ceiling regardless of readiness.
    const hardMax = window.setTimeout(beginExit, MAX_TIMEOUT_MS);

    return () => {
      window.removeEventListener("load", onReady);
      window.clearTimeout(hardMax);
      window.clearTimeout(snapTimer);
    };
  }, []);

  const restoreScroll = () => {
    document.body.style.overflow = overflowRef.current;
  };

  const progressDur =
    phase === "loading" ? (reduced ? PROGRESS_REDUCED_S : PROGRESS_FILL_S) : 0.3;

  return (
    <>
      {/* pre-paint guard — must render before the overlay in the DOM */}
      <script dangerouslySetInnerHTML={{ __html: GUARD_SCRIPT }} />

      <AnimatePresence onExitComplete={restoreScroll}>
        {visible ? (
          <motion.div
            id="site-preloader"
            role="status"
            aria-live="polite"
            aria-label="Loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: reduced ? FADE_OUT_REDUCED_S : FADE_OUT_S, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5"
            style={{ backgroundColor: PAPER }}
          >
            {/* self-drawing neem sprig */}
            <svg viewBox="0 0 64 64" className="size-20" fill="none" aria-hidden>
              <motion.path
                d={STEM}
                stroke={NEEM}
                strokeWidth={2}
                strokeLinecap="round"
                {...(reduced
                  ? {}
                  : {
                      initial: { pathLength: 0 },
                      animate: { pathLength: 1 },
                      transition: { duration: DRAW_S, ease: "easeInOut" },
                    })}
              />
              {LEAVES.map((leaf, i) => (
                <motion.path
                  key={i}
                  d={leaf.d}
                  stroke={NEEM}
                  strokeWidth={1.75}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  {...(reduced
                    ? {}
                    : {
                        initial: { pathLength: 0 },
                        animate: { pathLength: 1 },
                        transition: { duration: 0.2, delay: leaf.delay, ease: "easeOut" },
                      })}
                />
              ))}
            </svg>

            {/* wordmark — Fraunces, fades up beneath the sprig */}
            <motion.p
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-fraunces)", color: INK }}
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: WORDMARK_DELAY_S, duration: WORDMARK_DUR_S, ease: "easeOut" },
                  })}
            >
              {BRAND_NAME}
            </motion.p>

            {/* honey progress line */}
            <div
              className="h-0.5 w-40 overflow-hidden rounded-full"
              style={{ backgroundColor: "rgba(38,36,28,0.12)" }}
            >
              <motion.div
                className="h-full w-full rounded-full"
                style={{ backgroundColor: HONEY, transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: phase === "loading" ? 0.9 : 1 }}
                transition={{ duration: progressDur, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
