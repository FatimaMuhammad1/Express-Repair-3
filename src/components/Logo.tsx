import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.png";
import darkLogo from "@/assets/dark-logo.png";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export function Logo({
  light = false,
  compact = false,
  dark = false,
}: { light?: boolean; compact?: boolean; dark?: boolean }) {
  const { theme } = useTheme();
  const [resolvedDark, setResolvedDark] = useState(false);

  useEffect(() => {
    const resolve = () => {
      if (dark) {
        setResolvedDark(true);
        return;
      }
      if (theme === "dark") return setResolvedDark(true);
      if (theme === "light") return setResolvedDark(false);
      // system
      if (typeof window !== "undefined" && window.matchMedia) {
        const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setResolvedDark(Boolean(isSystemDark));
      } else {
        setResolvedDark(false);
      }
    };
    resolve();
  }, [theme, dark]);

  const src = resolvedDark ? darkLogo : logoImg;

  return (
    <Link to="/" className="flex items-center gap-2 group translate-y-1.5" aria-label="Express Phone & Laptop Repair home">
      <img
        src={src}
        alt="Express Phone & Laptop Repair logo"
        className={`${compact ? "w-32" : "w-48 md:w-72"} h-auto max-h-14 md:max-h-16 object-contain origin-left ${!resolvedDark ? "scale-[2.5] -translate-x-28 md:-translate-x-56" : "scale-[3] -translate-x-40 md:-translate-x-72 translate-y-1"} ${light ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" : ""}`}
      />
      <span className="sr-only">Express Phone & Laptop Repair — Nuneaton</span>
    </Link>
  );
}
