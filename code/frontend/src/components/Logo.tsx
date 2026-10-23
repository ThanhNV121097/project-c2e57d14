import { useContent } from "../editable";
import LogoMark from "./LogoMark";

/** The wordmark: the torii mark beside the name, set in the display face. */
export default function Logo({ className = "" }: { className?: string }) {
  const name = useContent("site.name");
  const logo = useContent("site.logo");
  if (logo) return <img src={logo} alt={name} className={`h-7 w-auto ${className}`} />;
  return (
    <span className={`inline-flex items-center gap-[var(--space-2)] ${className}`}>
      <LogoMark className="text-accent" />
      <span className="font-display text-[19px] tracking-[-0.02em] text-ink">{name}</span>
    </span>
  );
}
