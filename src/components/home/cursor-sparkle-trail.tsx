"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type ParticleKind = "wood" | "neem" | "cream" | "spark";
type BurstShape = "circle" | "dot" | "leaf";

type Particle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  delay: number;
  variant: "trail" | "burst";
  kind?: ParticleKind; // trail styling
  shape?: BurstShape; // burst styling
  color?: string; // burst brand hex
};

type TrailPattern = {
  kind: ParticleKind;
  dx: number;
  dy: number;
  size: number;
  delay: number;
};

const TRAIL_DURATION_MS = 760;
const BURST_DURATION_MS = 2000; // matches the CSS animation (smooth drift)
const MIN_DISTANCE = 22;
const MAX_PARTICLES = 32;

// ---- Trail (unchanged) --------------------------------------------------
const trailPattern = [
  { kind: "wood", dx: -4, dy: 8, size: 7, delay: 0 },
  { kind: "neem", dx: 6, dy: 4, size: 5, delay: 0.03 },
  { kind: "cream", dx: -7, dy: -3, size: 4, delay: 0.01 },
  { kind: "spark", dx: 5, dy: -7, size: 3, delay: 0.04 },
] as const satisfies readonly TrailPattern[];

const particleClassName: Record<ParticleKind, string> = {
  wood: "rounded-[45%] bg-wood-light shadow-[0_0_8px_rgba(138,90,59,0.18)]",
  neem: "rounded-full bg-neem-soft shadow-[0_0_8px_rgba(94,124,74,0.18)]",
  cream: "rounded-full border border-cream-300 bg-paper",
  spark: "rounded-[2px] bg-mustard shadow-[0_0_10px_rgba(232,184,75,0.35)]",
};

// ---- Click burst (upgraded) --------------------------------------------
// Brand palette (exact hex): Neem, Sage, Warm Cream, Soft Wood Brown.
const BURST_COLORS = ["#5E7C4A", "#9CAF88", "#F5EFE6", "#A9744F"] as const;
const BURST_SHAPES: BurstShape[] = ["circle", "dot", "leaf"];
const BURST_COUNT = 10; // within the 8–12 range

// Leaf uses an asymmetric radius for a subtle leaf silhouette.
const burstShapeClass: Record<BurstShape, string> = {
  circle: "rounded-full",
  dot: "rounded-full",
  leaf: "rounded-[0_100%_0_100%]",
};

// Static circular burst: particles evenly spaced around a ring, mixing shapes
// and brand colors, with slight radius variation for a natural feel.
const burstPattern = Array.from({ length: BURST_COUNT }, (_, i) => {
  const angle = (i / BURST_COUNT) * Math.PI * 2;
  const radius = 110 + (i % 3) * 30; // 110 / 140 / 170 — very wide spread
  const shape = BURST_SHAPES[i % BURST_SHAPES.length];
  return {
    dx: Math.round(Math.cos(angle) * radius),
    dy: Math.round(Math.sin(angle) * radius),
    size: shape === "dot" ? 5 : shape === "leaf" ? 10 : 7,
    delay: (i % 4) * 0.012,
    shape,
    color: BURST_COLORS[i % BURST_COLORS.length],
  };
});

export function CursorSparkleTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextIdRef = useRef(0);
  const patternIndexRef = useRef(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const pendingPointRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number | null>(null);
  const timeoutRefs = useRef<number[]>([]);

  useEffect(() => {
    const canAnimate =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canAnimate) return;

    const removeParticleLater = (id: number, duration: number) => {
      const timeout = window.setTimeout(() => {
        setParticles((current) => current.filter((particle) => particle.id !== id));
      }, duration);
      timeoutRefs.current.push(timeout);
    };

    const addParticle = (particle: Omit<Particle, "id">, duration: number) => {
      const id = nextIdRef.current;
      nextIdRef.current += 1;

      setParticles((current) => [
        ...current.slice(-(MAX_PARTICLES - 1)),
        { ...particle, id },
      ]);

      removeParticleLater(id, duration);
    };

    const drawTrail = () => {
      frameRef.current = null;

      const point = pendingPointRef.current;
      if (!point) return;

      const lastPoint = lastPointRef.current;
      const distance = lastPoint
        ? Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y)
        : MIN_DISTANCE;

      if (distance < MIN_DISTANCE) return;

      lastPointRef.current = point;
      const pattern = trailPattern[patternIndexRef.current % trailPattern.length];
      patternIndexRef.current += 1;
      addParticle(
        {
          x: point.x,
          y: point.y,
          dx: pattern.dx,
          dy: pattern.dy,
          size: pattern.size,
          delay: pattern.delay,
          variant: "trail",
          kind: pattern.kind,
        },
        TRAIL_DURATION_MS,
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      pendingPointRef.current = { x: event.clientX, y: event.clientY };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(drawTrail);
      }
    };

    // Left-click only → circular brand-colored burst at the cursor.
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;

      const x = event.clientX;
      const y = event.clientY;
      burstPattern.forEach((pattern) =>
        addParticle(
          {
            x,
            y,
            dx: pattern.dx,
            dy: pattern.dy,
            size: pattern.size,
            delay: pattern.delay,
            variant: "burst",
            shape: pattern.shape,
            color: pattern.color,
          },
          BURST_DURATION_MS + 120,
        ),
      );
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      timeoutRefs.current.forEach((timeout) => window.clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  if (!particles.length) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] overflow-hidden"
    >
      {particles.map((particle) =>
        particle.variant === "burst" ? (
          <span
            key={particle.id}
            className={cn(
              "absolute left-0 top-0 animate-cursor-burst",
              burstShapeClass[particle.shape ?? "circle"],
            )}
            style={
              {
                "--sparkle-x": `${particle.dx}px`,
                "--sparkle-y": `${particle.dy}px`,
                animationDelay: `${particle.delay}s`,
                height: `${particle.size}px`,
                width: `${particle.size}px`,
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 6px ${particle.color}66`,
              } as CSSProperties
            }
          />
        ) : (
          <span
            key={particle.id}
            className={cn(
              "absolute left-0 top-0 motion-safe:animate-cursor-sparkle",
              particleClassName[particle.kind ?? "spark"],
            )}
            style={
              {
                "--sparkle-x": `${particle.dx}px`,
                "--sparkle-y": `${particle.dy}px`,
                animationDelay: `${particle.delay}s`,
                height: `${particle.size}px`,
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
              } as CSSProperties
            }
          />
        ),
      )}
    </div>
  );
}
