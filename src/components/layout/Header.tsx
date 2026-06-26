import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Clock,
  ShieldCheck,
  Zap,
  LogIn,
  LayoutDashboard,
  User,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";

type TickerItem = { icon: LucideIcon; text: string; href?: string };

const tickerItems: TickerItem[] = [
  { icon: ShieldCheck, text: "90-Day Warranty" },
  { icon: Clock, text: "Same-Day Repairs" },
  { icon: Zap, text: "Free Diagnostics" },
  { icon: Phone, text: "07415 278767", href: "tel:+447415278767" },
];

type NavItem = { label: string } & (
  | { to: string; hash?: never }
  | { hash: string; to?: never }
);

const navItems: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/accessories", label: "Accessories" },
  { to: "/buy-and-sell", label: "Buy & Sell" },
    // FAQ moved to footer; keep it out of header nav
  { to: "/contact", label: "Contact" },
];

function useScrollToHash() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (hash: string, onDone?: () => void) => {
    const scroll = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      onDone?.();
    };
    if (pathname === "/") {
      scroll();
    } else {
      router.navigate({ to: "/" }).then(() => setTimeout(scroll, 50));
    }
  };
}

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const updateAuthState = () => {
      const token = localStorage.getItem("user_token");
      const adminToken = localStorage.getItem("admin_token");
      const adminUser = localStorage.getItem("admin_user");

      if (adminToken && adminUser) {
        setIsLoggedIn(true);
        try {
          const user = JSON.parse(adminUser);
          setIsAdmin(user.role === "admin" || user.role === "technician" || user.role === "SUPER_ADMIN" || user.role === "STAFF");
        } catch {
          setIsAdmin(false);
        }
      } else if (token) {
        setIsLoggedIn(true);
        setIsAdmin(false);
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    // run once on mount
    updateAuthState();

    // listen for cross-tab storage changes
    const onStorage = () => updateAuthState();
    // listen for in-app custom auth-change events
    const onAuthChange = () => updateAuthState();

    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-change", onAuthChange as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-change", onAuthChange as EventListener);
    };
  }, []);

  return { isLoggedIn, isAdmin };
}

export function Header() {
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollToHash();
  const { isLoggedIn, isAdmin } = useAuth();

  const renderLink = (item: NavItem, onClick?: () => void, mobile = false) => {
    const baseClass = mobile
      ? "py-2.5 px-3 rounded-md text-sm font-medium text-[#10274b] hover:bg-[#eff6ff] hover:text-[#0d3b68] text-left dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      : "px-3 py-2 text-sm font-medium text-[#10274b] hover:bg-[#eff6ff] hover:text-[#0d3b68] transition-colors rounded-md dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100";
    if ("hash" in item && item.hash) {
      return (
        <button
          key={item.label}
          onClick={() => {
            scrollTo(item.hash!, onClick);
          }}
          className={baseClass}
        >
          {item.label}
        </button>
      );
    }
    return (
      <Link
        key={item.label}
        to={item.to!}
        onClick={onClick}
        className={baseClass}
        activeProps={{
          className: mobile
            ? "py-2.5 px-3 rounded-md text-sm font-semibold text-[#10274b] text-left dark:text-white"
            : "px-3 py-2 text-sm font-semibold text-[#10274b] rounded-md dark:text-white",
        }}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="relative">
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: -8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden border-b border-white/10 text-primary-foreground"
      >
        <div className="absolute inset-0 bg-[#ef4444] dark:bg-[#991b1b]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_-40%,rgba(255,255,255,0.28),transparent)] dark:bg-[radial-gradient(ellipse_80%_100%_at_50%_-40%,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute inset-0 header-ticker-shimmer pointer-events-none" />
        <div className="relative py-3.5 overflow-hidden">
          <div className="flex w-max header-ticker-marquee hover:[animation-play-state:paused]">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-10">
                <item.icon className="h-5 w-5 shrink-0 opacity-90" />
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm md:text-base font-bold uppercase tracking-[0.2em] hover:underline"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em]">
                    {item.text}
                  </span>
                )}
                <span className="text-white/40 text-lg" aria-hidden>
                  •
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="bg-[#ffffff]/90 backdrop-blur-lg border-b border-border dark:bg-slate-950/95 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => renderLink(item))}
          </nav>
          <div className="hidden lg:flex items-center gap-2">
            {/* Admin Icon button — only when admin is logged in */}
            {isAdmin && (
              <Link
                to="/admin"
                title="Admin Dashboard"
                className="flex items-center justify-center h-9 w-9 rounded-lg border border-[#0095ff]/30 bg-[#f0f9ff] text-[#0095ff] transition-colors hover:bg-[#e0f2fe] dark:border-sky-500/30 bg-[#1A1D27] dark:text-sky-400 dark:hover:bg-slate-700"
              >
                <LayoutDashboard className="h-4 w-4" />
              </Link>
            )}

            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center gap-1.5 text-sm font-medium text-[#0095ff] hover:text-[#0078d4] px-3 dark:text-sky-400 dark:hover:text-sky-300"
              >
                <User className="h-4 w-4" />
                My Account
              </Link>
            ) : (
              <Link
                to="/profile"
                className="flex items-center gap-1.5 text-sm font-medium text-[#0095ff] hover:text-[#0078d4] px-3 dark:text-sky-400 dark:hover:text-sky-300"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}

            <ModeToggle />

            <Button
              asChild
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white shadow-sm"
            >
              <Link to="/book">Book a Repair</Link>
            </Button>
          </div>
          <button
            className="lg:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-[#ffffff]/95 dark:bg-slate-950/95">
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) =>
                renderLink(item, () => setOpen(false), true),
              )}

              {/* Admin link in mobile */}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium text-[#0095ff] hover:bg-[#f0f9ff] dark:text-sky-400 dark:hover:bg-slate-800"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}

              {/* Dark/Light mode toggle in mobile */}
              <div className="flex items-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium text-[#10274b] dark:text-slate-100">
                <ModeToggle />
                <span>Theme</span>
              </div>

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium text-[#0095ff] hover:bg-[#f0f9ff] hover:text-[#0078d4] dark:text-sky-400 dark:hover:bg-slate-800 dark:hover:text-sky-300"
              >
                {isLoggedIn ? (
                  <>
                    <User className="h-4 w-4" /> My Account
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" /> Login
                  </>
                )}
              </Link>
              <Button
                asChild
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white mt-2"
              >
                <Link to="/book" onClick={() => setOpen(false)}>
                  Book a Repair
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
