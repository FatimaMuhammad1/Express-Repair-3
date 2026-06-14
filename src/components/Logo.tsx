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
      const isSystemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedDark(Boolean(isSystemDark));
    };
    resolve();
  }, [theme, dark]);

  const src = resolvedDark ? darkLogo : logoImg;

  return (
    <Link to="/" className="flex items-center gap-2 group" aria-label="Express Phone & Laptop Repair home">
      <img
        src={src}
        alt="Express Phone & Laptop Repair logo"
        className={`${compact ? "h-9" : "h-12 md:h-14"} w-auto object-contain ${light ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" : ""}`}
        width={320}
        height={180}
      />
      <span className="sr-only">Express Phone & Laptop Repair — Nuneaton</span>
    </Link>
  );
}
