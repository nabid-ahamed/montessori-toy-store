/**
 * Decorative neem sprig — a small stem with paired leaves. Inherits `currentColor`
 * so callers tint it (honey/sage) via text colour. Purely ornamental.
 */
export function NeemSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <path
        d="M32 61C32 45 32 30 32 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g fill="currentColor">
        <path d="M32 12c-4-3-8-2-9 3 5 2 8 1 9-3Z" />
        <path d="M32 12c4-3 8-2 9 3-5 2-8 1-9-3Z" />
        <path d="M32 24c-6-4-12-2-14 5 8 3 13 1 14-5Z" />
        <path d="M32 24c6-4 12-2 14 5-8 3-13 1-14-5Z" />
        <path d="M32 38c-6-4-11-2-13 5 8 3 12 1 13-5Z" />
        <path d="M32 38c6-4 11-2 13 5-8 3-12 1-13-5Z" />
      </g>
    </svg>
  );
}
