/**
 * Tabimarket's mark: a torii seen head on, drawn as three strokes — the two
 * posts and the lintel that curves. The same shape is public/favicon.svg.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" className={className}>
      <path d="M2.5 4.2 12 2.6l9.5 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3.6 7.4h16.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6.4 4.6v16.8M17.6 4.6v16.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
