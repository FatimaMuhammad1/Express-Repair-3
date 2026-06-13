import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.png";
export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 group"
      aria-label="Express Phone & Laptop Repair home"
    >
      <img
        src={logoImg}
        alt="Express Phone & Laptop Repair logo"
        className={`${compact ? "h-9" : "h-12 md:h-14"} w-auto object-contain ${light ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" : ""}`}
        width={320}
        height={180}
      />
      <span className="sr-only">Express Phone & Laptop Repair — Nuneaton</span>
    </Link>
  );
}
