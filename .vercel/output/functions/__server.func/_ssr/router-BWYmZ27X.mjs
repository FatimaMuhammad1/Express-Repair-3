import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { R as Root2, T as Trigger, P as Portal2, C as Content2, I as Item2, S as SubTrigger2, a as SubContent2, b as CheckboxItem2, c as ItemIndicator2, d as RadioItem2, L as Label2, e as Separator2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { S as Smartphone, L as Laptop, T as Tablet, M as MonitorSmartphone, B as Battery, D as Droplets, a as Bug, b as ShieldCheck, c as Search, W as Wrench, Z as Zap, A as Award, d as ArrowRight, e as Truck, C as Clock, P as Phone, f as LayoutDashboard, U as User, g as LogIn, X, h as Menu, F as Facebook, I as Instagram, i as Twitter, Y as Youtube, j as Sun, k as Moon, l as Monitor, m as ChevronRight, n as Check, o as Circle } from "../_libs/lucide-react.mjs";
import { u as useScroll, a as useTransform, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const appCss = "/assets/styles-msOImV8W.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const initialState = {
  theme: "system",
  setTheme: () => null
};
const ThemeProviderContext = reactExports.createContext(initialState);
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = reactExports.useState(() => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") return defaultTheme;
    try {
      return localStorage.getItem(storageKey) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    const applyTheme = (nextTheme) => {
      root.classList.remove("light", "dark");
      if (nextTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
        return;
      }
      root.classList.add(nextTheme);
    };
    applyTheme(theme);
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = (event) => {
        applyTheme(event.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener?.("change", onChange);
      return () => mediaQuery.removeEventListener?.("change", onChange);
    }
  }, [theme]);
  const value = {
    theme,
    setTheme: (theme2) => {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        try {
          localStorage.setItem(storageKey, theme2);
        } catch {
        }
      }
      setTheme(theme2);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProviderContext.Provider, { ...props, value, children });
}
const useTheme = () => {
  const context = reactExports.useContext(ThemeProviderContext);
  if (context === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$b = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fixora — Smart Device Repair in Luton & Nuneaton" },
      {
        name: "description",
        content: "Fast, reliable repairs for phones, laptops, tablets and more in Luton and Nuneaton. Free diagnostics, 90-day warranty, same-day service."
      },
      { property: "og:title", content: "Fixora — Smart Device Repair in Luton & Nuneaton" },
      {
        property: "og:description",
        content: "Fast, reliable repairs for phones, laptops, tablets and more in Luton and Nuneaton. 90-day warranty."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "relative overflow-x-hidden bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 -z-20 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full opacity-10 bg-[#F5F1ED] dark:bg-slate-950" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-slate-50/80 dark:bg-slate-950/70" })
      ] }),
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  reactExports.useEffect(() => {
    async function checkAuth() {
      const userToken = localStorage.getItem("user_token");
      const adminToken = localStorage.getItem("admin_token");
      const token = adminToken || userToken;
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.success && data.user) {
          if (data.user.role === "admin" || data.user.role === "technician") {
            localStorage.setItem("admin_user", JSON.stringify(data.user));
            if (!adminToken && userToken) {
              localStorage.setItem("admin_token", userToken);
              localStorage.removeItem("user_token");
            }
          } else {
            localStorage.setItem("current_user", JSON.stringify(data.user));
          }
          window.dispatchEvent(new CustomEvent("auth-change", { detail: { type: "refresh", role: data.user.role } }));
        } else {
          localStorage.removeItem("user_token");
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");
          localStorage.removeItem("current_user");
          window.dispatchEvent(new CustomEvent("auth-change", { detail: { type: "logout" } }));
        }
      } catch (err) {
        console.error("Auth check failed", err);
      }
    }
    checkAuth();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$9 = () => import("./terms-CtS1bImy.mjs");
const Route$a = createFileRoute("/terms")({
  head: () => ({
    meta: [{
      title: "Terms & Conditions - Express Phone & Laptop Repair"
    }, {
      name: "description",
      content: "Terms & Conditions for Express Phone & Laptop Repair. Read our service terms and conditions."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const logoImg = "/assets/logo-Dw0dWWsg.png";
const darkLogo = "/assets/dark-logo-CUE5ruAY.png";
function Logo({
  light = false,
  compact = false,
  dark = false
}) {
  const { theme } = useTheme();
  const [resolvedDark, setResolvedDark] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const resolve = () => {
      if (dark) {
        setResolvedDark(true);
        return;
      }
      if (theme === "dark") return setResolvedDark(true);
      if (theme === "light") return setResolvedDark(false);
      const isSystemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedDark(Boolean(isSystemDark));
    };
    resolve();
  }, [theme, dark]);
  const src = resolvedDark ? darkLogo : logoImg;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", "aria-label": "Express Phone & Laptop Repair home", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt: "Express Phone & Laptop Repair logo",
        className: `${compact ? "h-9" : "h-12 md:h-14"} w-auto object-contain ${light ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" : ""}`,
        width: 320,
        height: 180
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Express Phone & Laptop Repair — Nuneaton" })
  ] });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 btn-raise",
  {
    variants: {
      variant: {
        default: "bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-90 bg-gradient-brand-hover",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function ModeToggle() {
  const { theme, setTheme } = reactExports.useContext(ThemeProviderContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "icon", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Toggle theme" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => setTheme("light"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Light" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => setTheme("dark"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Dark" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => setTheme("system"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "System" })
      ] })
    ] })
  ] });
}
const tickerItems = [
  { icon: ShieldCheck, text: "90-Day Warranty" },
  { icon: Clock, text: "Same-Day Repairs" },
  { icon: Zap, text: "Free Diagnostics" },
  { icon: Phone, text: "07415 278767", href: "tel:+447415278767" }
];
const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/accessories", label: "Accessories" },
  { to: "/buy-and-sell", label: "Buy & Sell" },
  // FAQ moved to footer; keep it out of header nav
  { to: "/contact", label: "Contact" }
];
function useScrollToHash() {
  const router2 = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (hash, onDone) => {
    const scroll = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      onDone?.();
    };
    if (pathname === "/") {
      scroll();
    } else {
      router2.navigate({ to: "/" }).then(() => setTimeout(scroll, 50));
    }
  };
}
function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = reactExports.useState(false);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const updateAuthState = () => {
      const token = localStorage.getItem("user_token");
      const adminToken = localStorage.getItem("admin_token");
      const adminUser = localStorage.getItem("admin_user");
      if (adminToken && adminUser) {
        setIsLoggedIn(true);
        try {
          const user = JSON.parse(adminUser);
          setIsAdmin(user.role === "admin" || user.role === "technician");
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
    updateAuthState();
    const onStorage = () => updateAuthState();
    const onAuthChange = () => updateAuthState();
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-change", onAuthChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-change", onAuthChange);
    };
  }, []);
  return { isLoggedIn, isAdmin };
}
function Header() {
  const [open, setOpen] = reactExports.useState(false);
  const scrollTo = useScrollToHash();
  const { isLoggedIn, isAdmin } = useAuth();
  const renderLink = (item, onClick, mobile = false) => {
    const baseClass2 = mobile ? "py-2.5 px-3 rounded-md text-sm font-medium text-[#10274b] hover:bg-[#eff6ff] hover:text-[#0d3b68] text-left dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100" : "px-3 py-2 text-sm font-medium text-[#10274b] hover:bg-[#eff6ff] hover:text-[#0d3b68] transition-colors rounded-md dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100";
    if ("hash" in item && item.hash) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            scrollTo(item.hash, onClick);
          },
          className: baseClass2,
          children: item.label
        },
        item.label
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: item.to,
        onClick,
        className: baseClass2,
        activeProps: {
          className: mobile ? "py-2.5 px-3 rounded-md text-sm font-semibold text-[#10274b] text-left dark:text-white" : "px-3 py-2 text-sm font-semibold text-[#10274b] rounded-md dark:text-white"
        },
        children: item.label
      },
      item.label
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { scale: 0.96, opacity: 0, y: -8 },
        animate: { scale: 1, opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        className: "relative overflow-hidden border-b border-white/10 text-primary-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[#ef4444] dark:bg-[#991b1b]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_-40%,rgba(255,255,255,0.28),transparent)] dark:bg-[radial-gradient(ellipse_80%_100%_at_50%_-40%,rgba(255,255,255,0.1),transparent)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 header-ticker-shimmer pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative py-3.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-max header-ticker-marquee hover:[animation-play-state:paused]", children: [...tickerItems, ...tickerItems].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-5 w-5 shrink-0 opacity-90" }),
            item.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: item.href,
                className: "text-sm md:text-base font-bold uppercase tracking-[0.2em] hover:underline",
                children: item.text
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm md:text-base font-bold uppercase tracking-[0.2em]", children: item.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 text-lg", "aria-hidden": true, children: "•" })
          ] }, i)) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#ffffff]/90 backdrop-blur-lg border-b border-border dark:bg-slate-950/95 dark:border-slate-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-1", children: navItems.map((item) => renderLink(item)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-2", children: [
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/admin",
              title: "Admin Dashboard",
              className: "flex items-center justify-center h-9 w-9 rounded-lg border border-[#0095ff]/30 bg-[#f0f9ff] text-[#0095ff] transition-colors hover:bg-[#e0f2fe] dark:border-sky-500/30 dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-slate-700",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" })
            }
          ),
          isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/profile",
              className: "flex items-center gap-1.5 text-sm font-medium text-[#0095ff] hover:text-[#0078d4] px-3 dark:text-sky-400 dark:hover:text-sky-300",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                "My Account"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/profile",
              className: "flex items-center gap-1.5 text-sm font-medium text-[#0095ff] hover:text-[#0078d4] px-3 dark:text-sky-400 dark:hover:text-sky-300",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
                "Login"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ModeToggle, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white shadow-sm",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", children: "Book a Repair" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "lg:hidden p-2",
            onClick: () => setOpen(!open),
            "aria-label": "Menu",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, {})
          }
        )
      ] }),
      open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden border-t border-border bg-[#ffffff]/95 dark:bg-slate-950/95", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex flex-col gap-1", children: [
        navItems.map(
          (item) => renderLink(item, () => setOpen(false), true)
        ),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/admin",
            onClick: () => setOpen(false),
            className: "flex items-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium text-[#0095ff] hover:bg-[#f0f9ff] dark:text-sky-400 dark:hover:bg-slate-800",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" }),
              "Admin Panel"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium text-[#10274b] dark:text-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ModeToggle, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Theme" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/profile",
            onClick: () => setOpen(false),
            className: "flex items-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium text-[#0095ff] hover:bg-[#f0f9ff] hover:text-[#0078d4] dark:text-sky-400 dark:hover:bg-slate-800 dark:hover:text-sky-300",
            children: isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
              " My Account"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
              " Login"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            className: "bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white mt-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", onClick: () => setOpen(false), children: "Book a Repair" })
          }
        )
      ] }) })
    ] })
  ] });
}
const googleMapsPin = "/assets/google-maps-pin-DghFLVBM.jpg";
function GoogleMapsIcon({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: googleMapsPin,
      alt: "Google Maps pin",
      className: `inline-block align-middle object-contain ${className ?? ""}`.trim(),
      ...props
    }
  );
}
const baseClass = {
  hero: "bg-gradient-hero",
  brand: "bg-gradient-brand",
  card: "bg-gradient-card-blue",
  soft: "bg-gradient-soft",
  footer: "bg-gradient-footer-blue"
};
function GradientBackdrop({
  variant = "hero",
  className
}) {
  const showOrbs = variant === "hero" || variant === "card" || variant === "brand";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("absolute inset-0 overflow-hidden pointer-events-none", className),
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("absolute inset-0", baseClass[variant]) }),
        variant === "hero" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(255,255,255,0.22),transparent_55%)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_90%_80%,rgba(94,224,255,0.35),transparent_50%)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(67,56,202,0.25),transparent_45%)]" })
        ] }),
        variant === "card" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_45%)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(34,211,238,0.2),transparent_50%)]" })
        ] }),
        variant === "footer" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_60%)]" }) }),
        variant === "brand" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(255,255,255,0.2),transparent_50%)]" }),
        showOrbs && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-glow/25 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" })
        ] })
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative overflow-hidden text-primary-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GradientBackdrop, { variant: "footer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 py-8 grid gap-10 md:grid-cols-2 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { dark: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/75 max-w-sm", children: "Professional same-day repairs for phones, laptops, tablets and electronic devices in Nuneaton. Fast service, quality parts, fair prices." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: [Facebook, Instagram, Twitter, Youtube].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#",
            className: "w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-white/20 transition-colors",
            "aria-label": "Social link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
          },
          i
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-4 text-white", children: "Quick Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-white/75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-white", children: "Home" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "hover:text-white", children: "Services" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/accessories", className: "hover:text-white", children: "Accessories" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/buy-and-sell", className: "hover:text-white", children: "Buy & Sell" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", className: "hover:text-white", children: "Book Repair" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-white", children: "Contact" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-4 text-white", children: "Our Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-white/75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Phone Repair" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Laptop Repair" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Tablet Repair" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Phone Unlocking" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Accessories" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-4 text-white", children: "Contact Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm text-white/75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 mt-0.5 shrink-0" }),
            " 07415 278767"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleMapsIcon, { className: "w-5 h-5 mt-0.5 shrink-0" }),
            " 6 Harefield Road, Nuneaton, CV11 4HD"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10 mt-4 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-3 text-xs text-white flex items-center justify-between flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "© 2026 Express Phone & Laptop Repair. All rights reserved." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { "aria-label": "Footer legal links", className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", "aria-label": "Privacy Policy", className: "hover:text-white", children: "Privacy Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", "aria-label": "Terms and Conditions", className: "hover:text-white", children: "Terms" })
      ] })
    ] }) })
  ] });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen flex flex-col bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "Hero background",
  actions,
  aside,
  className,
  overlayClassName,
  eyebrowClassName,
  hideBottomFade,
  imageClassName,
  imageScaleStart = 1.05,
  imageScaleEnd = 1.15
}) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroScale = useTransform(scrollY, [0, 600], [imageScaleStart, imageScaleEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: cn("relative text-white overflow-hidden min-h-[65vh] flex items-center", className), children: [
    image && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.img,
      {
        src: image,
        alt: imageAlt,
        className: cn("absolute inset-0 w-full h-full object-cover", imageClassName),
        style: { y: heroY, scale: heroScale }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.35)_40%,transparent_75%)]", overlayClassName) }),
    !hideBottomFade && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-7xl mx-auto px-4 pt-16 pb-24 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] items-center", !aside && "lg:grid-cols-1"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm text-[11px] uppercase tracking-[0.24em] text-primary-glow font-semibold mb-8",
              eyebrowClassName
            ),
            children: eyebrow
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.h1,
          {
            initial: { opacity: 0, x: -72, scale: 0.98 },
            animate: { opacity: 1, x: 0, scale: 1 },
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            className: "font-serif text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-normal leading-[0.98] tracking-tight mb-6 drop-shadow-[0_25px_45px_rgba(0,0,0,0.18)]",
            children: title
          }
        ),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
            className: "text-base md:text-lg text-white/90 max-w-2xl leading-relaxed mb-8",
            children: subtitle
          }
        ),
        actions && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "flex flex-wrap gap-4",
            initial: { opacity: 0, y: 32, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] },
            children: actions
          }
        )
      ] }),
      aside && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: aside })
    ] }) })
  ] });
}
const variants = {
  hidden: {
    opacity: 0,
    y: 64,
    scale: 0.88,
    rotateX: 14,
    filter: "blur(10px)"
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
};
function Reveal({
  children,
  delay = 0,
  className,
  as = "div"
}) {
  const Comp = motion[as];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      className,
      style: { perspective: 1200 },
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true, margin: "-60px" },
      variants,
      transition: { delay },
      children
    }
  );
}
function HoverLift({
  children,
  className,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className,
      style: { perspective: 1e3 },
      initial: { opacity: 0, y: 56, scale: 0.9, rotateY: -10 },
      whileInView: { opacity: 1, y: 0, scale: 1, rotateY: 0 },
      whileHover: {
        y: -14,
        scale: 1.03,
        rotateY: 4,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
      },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
      children
    }
  );
}
function SectionBackdrop({ wash = "bg-white/30 dark:bg-slate-900/30" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "pointer-events-none absolute inset-0 opacity-[0.48]",
        style: {
          backgroundColor: "var(--background)"
        },
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-white/40 dark:bg-slate-950/40", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `pointer-events-none absolute inset-0 ${wash}`, "aria-hidden": true })
  ] });
}
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn(
        "rounded-xl border border-[#7c3aed]/15 bg-gradient-to-br from-[#eef2ff] via-[#e0ccff] to-[#f8fbff] text-slate-950 shadow-[0_24px_70px_-48px_rgba(99,102,241,0.18)] backdrop-blur-sm transition-shadow dark:border-slate-700 dark:bg-slate-950/95 dark:text-slate-100 dark:shadow-none",
        className
      ),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const heroImage = "/assets/services-hero-section-DZBk88Il.png";
const svcMobileRepair = "/assets/svc-mobile-repair-C1HpVjcd.jpg";
const svcLaptopRepair = "/assets/svc-laptop-repair-BwdiZYj7.jpg";
const svcTabletRepair = "/assets/svc-tablet-repair-D4ZZVFhk.jpg";
const svcScreenReplacement = "/assets/svc-screen-replacement-BK29BkFH.jpg";
const svcBatteryReplacement = "/assets/svc-battery-replacement-DMveX_HT.jpg";
const svcWaterDamage = "/assets/svc-water-damage-BBRs9Ddw.jpg";
const svcSoftwareIssues = "/assets/svc-software-issues-D8VVbutI.jpg";
const svcPhoneUnlocking = "/assets/svc-phone-unlocking-BevjCjn1.jpg";
const svcChargingPort = "/assets/svc-charging-port-LpIWdeRk.jpg";
const svcChargingPortRepair = "/assets/charging-port-repair-BmuLNjs8.png";
const svcDeviceDiagnostics = "/assets/Device-Diagnostics-E6G6ph8k.png";
const svcComponentUpgrade = "/assets/Component-Upgrade-DgSiZvcM.png";
const svcFastChargingFix = "/assets/Fast-Charging-Fix-OiJIDK6Y.png";
const svcWarrantyCheck = "/assets/Warranty-Check-B__wNfn8.png";
const svcSecurityTuneUp = "/assets/Security-Tune-Up-CzrDrOh9.png";
const svcDisplayUpgrade = "/assets/Display-Upgrade-CpytQNX6.png";
const Route$9 = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Repair Services - Express Phone & Laptop Repair Nuneaton" },
      { name: "description", content: "Professional phone, laptop, and tablet repair services in Nuneaton. Same-day repairs, free diagnostics, quality parts, 90-day warranty." }
    ]
  }),
  component: ServicesPage
});
const serviceCategories = [
  { icon: Smartphone, img: svcMobileRepair, title: "Mobile Phone Repair", items: ["Screen replacement", "Charging port repair", "Speaker & microphone", "Camera repair", "Software issues"] },
  { icon: Laptop, img: svcLaptopRepair, title: "Laptop Repair", items: ["Keyboard replacement", "Battery replacement", "Overheating & fan", "SSD / RAM upgrades", "Screen repair"] },
  { icon: Tablet, img: svcTabletRepair, title: "Tablet Repair", items: ["Display repair", "Charging repair", "Software troubleshooting", "Battery replacement"] },
  { icon: MonitorSmartphone, img: svcScreenReplacement, title: "Screen Replacement", items: ["All major brands", "Same-day service", "Original-quality displays", "90-day warranty"], wip: false },
  { icon: Battery, img: svcBatteryReplacement, title: "Battery Replacement", items: ["Fast-draining batteries", "Swollen batteries", "Quality cells", "30-minute swap"], wip: false },
  { icon: Droplets, img: svcWaterDamage, title: "Water Damage", items: ["Free diagnostics", "Ultrasonic cleaning", "Component-level repair", "Emergency support"], wip: false },
  { icon: Bug, img: svcSoftwareIssues, title: "Software Issues", items: ["Device lag", "Virus removal", "OS installation", "Data backup & recovery"], wip: false },
  { icon: ShieldCheck, img: svcPhoneUnlocking, title: "Phone Unlocking", items: ["Network unlocking", "iCloud assistance", "Most makes & models", "Fast turnaround"], wip: false },
  { icon: Smartphone, img: svcChargingPortRepair, title: "Charging Port Repair", items: ["iPhone & Android", "Loose connections", "Genuine parts", "Same-day fix"], wip: false },
  { icon: Search, img: svcDeviceDiagnostics, title: "Device Diagnostics", items: ["Hardware testing", "Software analysis", "Performance check", "Free consultation"], wip: false },
  { icon: Wrench, img: svcComponentUpgrade, title: "Component Upgrade", items: ["RAM upgrades", "SSD installation", "GPU replacement", "Thermal pasting"], wip: false },
  { icon: Zap, img: svcFastChargingFix, title: "Fast Charging Fix", items: ["Charger diagnostics", "Cable replacement", "Power adapter repair", "Quick fix available"], wip: false },
  { icon: Award, img: svcWarrantyCheck, title: "Warranty Check", items: ["Service verification", "Repair history", "Part coverage", "Certification review"], wip: false },
  { icon: Smartphone, img: svcChargingPort, title: "Camera Repair", items: ["Front camera fix", "Rear lens replacement", "Focus & blur issues", "Same-day service"], wip: false },
  { icon: ShieldCheck, img: svcSecurityTuneUp, title: "Security Tune-Up", items: ["Malware removal", "System hardening", "Backup setup", "Performance boost"], wip: false },
  { icon: MonitorSmartphone, img: svcDisplayUpgrade, title: "Display Upgrade", items: ["Higher-res screens", "Anti-glare coating", "Touch sensitivity", "Premium glass"], wip: false }
];
const pricing = [
  { label: "Screen Repair", price: "from £39" },
  { label: "Battery Replacement", price: "from £29" },
  { label: "Charging Port", price: "from £25" },
  { label: "Water Damage", price: "from £49" },
  { label: "Software Fix", price: "from £19" },
  { label: "Laptop Service", price: "from £39" }
];
function ServicesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHero,
      {
        image: heroImage,
        imageAlt: "Phone, laptop and tablet repair services at Express workshop",
        overlayClassName: "bg-[linear-gradient(110deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.14)_45%,rgba(0,0,0,0.04)_80%,transparent_100%)]",
        className: "min-h-[52vh]",
        title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Repair Services" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-white dark:bg-slate-950 section-frost dark:section-frost", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.25em] text-[#0095ff] mb-3", children: "Our Services" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white", children: "Repair solutions for phones, tablets and laptops." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#0f3b6f] dark:text-slate-300 mt-4 max-w-2xl", children: "Trusted repairs with honest advice, transparent pricing and expert support from our Nuneaton workshop." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "self-start rounded-lg bg-[#0095ff] hover:bg-[#0080dd] text-white px-8 h-12 uppercase tracking-widest text-xs font-semibold shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", children: "Book a Repair" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: serviceCategories.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i % 4 * 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group relative flex flex-col rounded-[1.5rem] border border-slate-300 bg-white dark:bg-slate-950/95 dark:border-slate-800 overflow-hidden h-full shadow-sm hover:shadow-lg hover:border-slate-400 transition-all duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-slate-100 flex-shrink-0", children: [
            c.wip ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[#e8f4ff] text-[#0095ff] text-3xl font-bold tracking-[0.24em] uppercase", children: "WIP" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.img, alt: c.title, loading: "lazy", className: "w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `absolute top-3 left-3 flex h-12 w-12 items-center justify-center rounded-full shadow-md text-white`,
                style: {
                  backgroundColor: [
                    "#0066cc",
                    // blue
                    "#22c55e",
                    // green
                    "#f97316",
                    // orange
                    "#ec4899",
                    // pink
                    "#a855f7",
                    // purple
                    "#06b6d4",
                    // cyan
                    "#eab308",
                    // yellow
                    "#14b8a6"
                    // teal
                  ][i % 8]
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "w-6 h-6" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-grow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-slate-900 dark:text-white mb-2 leading-tight", children: c.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex-grow", children: c.items.slice(0, 2).join(", ") })
          ] })
        ] }) }, c.title)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/85 dark:to-slate-950/95 dark:border-slate-800 shadow-xl px-8 py-16 mt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.25em] text-[#0095ff] mb-4", children: "Transparent Pricing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-4xl md:text-5xl font-bold text-[#0f3b6f] dark:text-white mb-4", children: "Fair Prices. No Hidden Fees." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto", children: "Free diagnostics. Final price confirmed before any repair." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 gap-4", children: pricing.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i % 3 * 0.06, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group p-6 flex items-center justify-between rounded-[1.5rem] border border-[#b3d9ff] bg-white dark:bg-slate-900/80 dark:border-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#0095ff]/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-900 dark:text-white", children: p.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0095ff] font-bold text-lg", children: p.price })
          ] }) }, p.label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "rounded-lg bg-[#0095ff] hover:bg-[#0080dd] text-white px-8 h-12 uppercase tracking-widest text-xs font-semibold shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/book", children: [
            "Book Repair Now ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
          ] }) }) })
        ] }) }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-28 bg-gradient-to-b from-[#f0f7ff] to-white dark:from-slate-950 dark:to-slate-950 dark:bg-slate-950", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.25em] text-[#0095ff] mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-5xl md:text-6xl font-serif font-bold text-[#0f3b6f] dark:text-white mb-6", children: "Quality You Can Trust" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto", children: "Fast, honest repairs backed by quality parts and expert technicians. We make the process simple, clear and worry-free." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", children: [
        { icon: ShieldCheck, t: "Expert Technicians", d: "Skilled professionals certified in device repair." },
        { icon: Zap, t: "Same Day Repairs", d: "Most repairs completed quickly without delays." },
        { icon: Award, t: "Quality Parts", d: "Genuine components for lasting performance." },
        { icon: Truck, t: "Fast Service", d: "Quick turnaround without cutting corners." }
      ].map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f4ff] dark:bg-slate-800 text-[#0095ff] dark:text-sky-300 mb-6 shadow-sm border border-[#b3d9ff]/50 dark:border-slate-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-10 w-10 stroke-[1.5]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#0f3b6f] dark:text-white text-lg mb-2", children: f.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-400 text-sm leading-relaxed", children: f.d })
      ] }) }, f.t)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-24 bg-[#f0f7ff] dark:bg-slate-950", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-[#f0f7ff]/70 dark:bg-slate-900/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#b3d9ff]/40 dark:bg-[#5b8be1]/15 blur-3xl", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/80 dark:bg-slate-800/30 blur-3xl", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mx-auto max-w-4xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "relative overflow-hidden rounded-[2.5rem] border border-[#b3d9ff]/70 dark:border-slate-700 bg-white dark:bg-slate-900/80 p-10 text-center shadow-[0_30px_90px_-40px_rgba(0,149,255,0.18)] md:p-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#0095ff] to-transparent", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#0095ff]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-4xl font-bold text-[#0f3b6f] dark:text-white md:text-5xl", children: "Ready to get your device fixed?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mb-8 max-w-2xl text-lg text-slate-600 dark:text-slate-400", children: "Drop in for a free diagnostic or book a repair online. We'll handle the rest." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "h-12 rounded-lg bg-[#0095ff] px-8 text-xs font-semibold uppercase tracking-widest text-white shadow-md hover:bg-[#0080dd]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", children: "Book a Repair" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "h-12 rounded-lg border-2 border-[#0095ff] bg-white dark:bg-slate-900/90 dark:text-white px-8 text-xs font-semibold uppercase tracking-widest text-[#0095ff] hover:bg-[#f0f7ff] dark:hover:bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Visit the Shop" }) })
        ] })
      ] }) }) })
    ] })
  ] });
}
const $$splitComponentImporter$8 = () => import("./profile-CB4_p26o.mjs");
const Route$8 = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "My Account - Fixora Repair"
    }, {
      name: "description",
      content: "Track your repairs and manage your account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./privacy-DMF44gXV.mjs");
const Route$7 = createFileRoute("/privacy")({
  head: () => ({
    meta: [{
      title: "Privacy Policy - Express Phone & Laptop Repair"
    }, {
      name: "description",
      content: "Privacy Policy for Express Phone & Laptop Repair. Learn how we collect, use, and protect your information."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./faq-CDhh6TBX.mjs");
const Route$6 = createFileRoute("/faq")({
  head: () => ({
    meta: [{
      title: "FAQ - Express Phone & Laptop Repair Nuneaton"
    }, {
      name: "description",
      content: "Answers to common questions about phone and laptop repairs, warranty, pricing and data safety in Nuneaton."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./contact-B4E3Wxx1.mjs");
const Route$5 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact - Express Phone & Laptop Repair Nuneaton"
    }, {
      name: "description",
      content: "Contact Express Phone & Laptop Repair in Nuneaton. Call 07415 278767, visit 6 Harefield Road, CV11 4HD, or send us a message. Free diagnostics, same-day repairs."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./buy-and-sell-qlf3Thf8.mjs");
const Route$4 = createFileRoute("/buy-and-sell")({
  head: () => ({
    meta: [{
      title: "Buy & Sell Devices - Express Phone & Laptop Repair Nuneaton"
    }, {
      name: "description",
      content: "Buy refurbished phones, laptops and tablets or sell your device for fair value in Nuneaton. Instant quotes, certified data wipe, 12-month warranty on refurbished stock."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./book-BMFUqXk6.mjs");
const Route$3 = createFileRoute("/book")({
  head: () => ({
    meta: [{
      title: "Book a Repair — Express Phone & Laptop Repair Nuneaton"
    }, {
      name: "description",
      content: "Book your phone, laptop or tablet repair in Nuneaton. Free diagnostics, same-day service, 90-day warranty."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin-Bq8lZIk_.mjs");
const Route$2 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin Dashboard — Fixora"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./accessories-Dtf-YNKf.mjs");
const Route$1 = createFileRoute("/accessories")({
  head: () => ({
    meta: [{
      title: "Phone, Laptop & Tablet Accessories - Express Phone & Laptop Repair Nuneaton"
    }, {
      name: "description",
      content: "Quality accessories for phones, laptops, tablets and more. Cases, chargers, cables, screen protectors & more in stock. Visit our Nuneaton store."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DbFQu9Yn.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Express Phone & Laptop Repair — Nuneaton | Repairs, Trade-In & Accessories"
    }, {
      name: "description",
      content: "Same-day phone, laptop & tablet repairs in Nuneaton. Sell or buy refurbished devices, browse accessories. Free diagnostics, 90-day warranty. Call 07415 278767."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TermsRoute = Route$a.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$b
});
const ServicesRoute = Route$9.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$b
});
const ProfileRoute = Route$8.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$b
});
const PrivacyRoute = Route$7.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$b
});
const FaqRoute = Route$6.update({
  id: "/faq",
  path: "/faq",
  getParentRoute: () => Route$b
});
const ContactRoute = Route$5.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$b
});
const BuyAndSellRoute = Route$4.update({
  id: "/buy-and-sell",
  path: "/buy-and-sell",
  getParentRoute: () => Route$b
});
const BookRoute = Route$3.update({
  id: "/book",
  path: "/book",
  getParentRoute: () => Route$b
});
const AdminRoute = Route$2.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$b
});
const AccessoriesRoute = Route$1.update({
  id: "/accessories",
  path: "/accessories",
  getParentRoute: () => Route$b
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  AccessoriesRoute,
  AdminRoute,
  BookRoute,
  BuyAndSellRoute,
  ContactRoute,
  FaqRoute,
  PrivacyRoute,
  ProfileRoute,
  ServicesRoute,
  TermsRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  Card as C,
  GoogleMapsIcon as G,
  HoverLift as H,
  Layout as L,
  PageHero as P,
  Reveal as R,
  SectionBackdrop as S,
  cn as c,
  router as r
};
