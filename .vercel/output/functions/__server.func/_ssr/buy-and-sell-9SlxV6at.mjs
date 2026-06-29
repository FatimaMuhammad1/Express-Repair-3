import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Layout, R as Reveal, c as cn, B as Button, C as Card, S as SectionBackdrop } from "./router-Dwa750EE.mjs";
import { C as CARD_GRID, t as themedCard } from "./theme-card-ChYPy8sU.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { S as Smartphone, L as Laptop, T as Tablet, R as Headphones, d as ArrowRight, V as Tag, _ as BadgeDollarSign, $ as CreditCard, b as ShieldCheck, w as CircleCheck, x as Lock, a0 as Star, C as Clock, O as Sparkles, P as Phone } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
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
const heroVisual = "/assets/herosection-buy-sell-CjloN4u9.png";
const phoneImage = "/assets/smart-phone-BqZ1VyPi.png";
const laptopImage = "/assets/laptop-BG-9f7tz.png";
const tabletImage = "/assets/tablet-CQyCSvCV.png";
const accessoriesImage = "/assets/accessories-inGPZW6X.png";
const categories = [{
  title: "Smartphones",
  subtitle: "Top brands at great prices",
  img: phoneImage,
  icon: Smartphone,
  bg: "bg-orange-100",
  iconBg: "bg-orange-500",
  linkColor: "text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300",
  linkLabel: "Shop Smartphones"
}, {
  title: "Laptops",
  subtitle: "Powerful performance, better value",
  img: laptopImage,
  icon: Laptop,
  bg: "bg-green-100",
  iconBg: "bg-green-600",
  linkColor: "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300",
  linkLabel: "Shop Laptops"
}, {
  title: "Tablets",
  subtitle: "Browse all tablet deals",
  img: tabletImage,
  icon: Tablet,
  bg: "bg-blue-100",
  iconBg: "bg-blue-600",
  linkColor: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
  linkLabel: "Shop Tablets"
}, {
  title: "Accessories",
  subtitle: "Enhance your tech experience",
  img: accessoriesImage,
  icon: Headphones,
  bg: "bg-purple-100",
  iconBg: "bg-purple-600",
  linkColor: "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
  linkLabel: "Shop Accessories"
}];
const sellFeatures = [{
  label: "Free Evaluation",
  detail: "Get an instant valuation",
  icon: BadgeDollarSign
}, {
  label: "Instant Payment",
  detail: "Receive payment quickly",
  icon: CreditCard
}, {
  label: "Safe & Secure",
  detail: "Your data is always protected",
  icon: ShieldCheck
}, {
  label: "No Hidden Charges",
  detail: "100% transparent process",
  icon: CircleCheck
}];
const steps = [{
  n: "01",
  t: "Tell us what you have",
  d: "Share your device model, condition and any damage for an instant valuation."
}, {
  n: "02",
  t: "Get your quote",
  d: "Receive a fair, transparent price with no hidden fees."
}, {
  n: "03",
  t: "Visit our store",
  d: "Pop in at 6 Harefield Road for a final check before payment."
}, {
  n: "04",
  t: "Walk out happy",
  d: "Same-day cash or bank transfer when selling — ready to use when buying."
}];
const hours = [{
  day: "Monday – Friday",
  time: "10 AM – 6 PM"
}, {
  day: "Saturday",
  time: "10 AM – 6 PM"
}, {
  day: "Sunday",
  time: "Closed"
}, {
  day: "Sell payment",
  time: "Same day"
}];
const modeCopy = {
  buy: {
    headline: "Browse tested refurbished devices",
    body: "Save up to 40% vs new — every device is multi-point tested with a 12-month warranty."
  },
  sell: {
    headline: "Sell your device for the best local price",
    body: "Walk in with your phone, tablet or laptop and leave with cash the same day."
  },
  exchange: {
    headline: "Trade in and upgrade in one visit",
    body: "Put your old device value towards refurbished stock — we handle valuation and setup in store."
  }
};
function BuyAndSellPage() {
  const [products, setProducts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, []);
  const API_BASE_URL = "http://localhost:8000/api";
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products?is_for_sale=true`);
      const data = await res.json();
      if (data.success) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
  const [mode, setMode] = reactExports.useState("buy");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-[#f4f8fc] dark:bg-slate-950 section-frost dark:section-frost", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-[#dbeafe]/80 bg-gradient-to-br from-[#f0f7ff] via-white to-[#e8f4ff] dark:from-slate-900/90 dark:via-slate-950 dark:to-slate-950 dark:border-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#b3d9ff]/30 blur-3xl", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:py-16 lg:grid-cols-2 lg:gap-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0056b3]", children: "BUY" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2 text-slate-900 dark:text-white", children: "&" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#10b981]", children: "SELL" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg font-medium text-slate-600 dark:text-slate-400 md:text-xl", children: "Best Deals on New & Used Devices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap gap-3", children: ["buy", "sell", "exchange"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode(tab), className: cn("rounded-full px-7 py-2.5 text-sm font-bold uppercase tracking-wide transition-all", mode === tab ? tab === "buy" ? "bg-[#0056b3] text-white shadow-md shadow-[#0056b3]/25" : tab === "sell" ? "bg-[#10b981] text-white shadow-md shadow-[#10b981]/25" : "bg-[#64748b] text-white shadow-md shadow-[#64748b]/25" : "border border-slate-300 bg-white text-slate-800 hover:border-[#0056b3]/40 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"), children: tab.toUpperCase() }, tab)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.p, { initial: {
            opacity: 0,
            y: 8
          }, animate: {
            opacity: 1,
            y: 0
          }, className: "mt-8 max-w-lg text-slate-600 dark:text-slate-400 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold text-[#0f3b6f] dark:text-white", children: modeCopy[mode].headline }),
            modeCopy[mode].body
          ] }, mode),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-lg bg-[#0056b3] px-6 text-white hover:bg-[#004494]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: mode === "buy" ? "Browse Stock" : "Get a Quote" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-lg border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+447415278767", children: "Call 07415 278767" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.12, className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-[2rem] border border-[#b3d9ff]/50 bg-gradient-to-br from-[#e8f4ff] to-white p-4 shadow-[0_24px_60px_-30px_rgba(0,86,179,0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroVisual, alt: "Smartphones, laptop and accessories available to buy and sell", className: "h-full w-full max-h-[340px] object-contain object-center" }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-[#f8fafc] dark:bg-transparent py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1280px] px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-stretch gap-8 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[2.2rem] font-extrabold tracking-tight text-[#0f1f47] dark:text-white md:text-[2.75rem]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0056b3] dark:text-sky-400", children: "Buy" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-900 dark:text-white", children: "&" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#10b981] dark:text-emerald-400", children: "Sell" }),
              " with Confidence"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-[17px] text-slate-500 dark:text-slate-400", children: "Discover great deals on quality pre-owned devices, or sell your items quickly and securely." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2", children: categories.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.06, className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group flex h-full flex-col overflow-hidden rounded-[2rem] border-0 bg-white dark:bg-slate-900/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative h-[160px] overflow-hidden ${cat.bg} dark:bg-slate-800`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: cat.img, alt: cat.title, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg ${cat.iconBg} text-white shadow-sm`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(cat.icon, { className: "h-4 w-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-slate-900 dark:text-white", children: cat.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 flex-1 text-[13px] text-slate-500 dark:text-slate-400", children: cat.subtitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "link", className: `${cat.linkColor} mt-3 h-auto p-0 text-[13px] font-bold justify-start`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", children: [
                cat.linkLabel,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 h-3 w-3" })
              ] }) })
            ] })
          ] }) }, cat.title)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.15, className: "h-full mt-16 lg:mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex flex-col h-full overflow-hidden rounded-[2rem] border-0 bg-gradient-to-br from-[#111833] via-[#1f2660] to-[#3c4aa4] p-6 text-white shadow-[0_40px_120px_-45px_rgba(8,15,70,0.5)] md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 shadow-inner shadow-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-7 w-7 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[1.8rem] font-semibold leading-tight tracking-tight text-white", children: "Sell Your Device" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm leading-relaxed text-slate-200/85", children: "Get the best price for your pre-owned device." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-2.5", children: sellFeatures.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-[24px] bg-white/10 p-3.5 shadow-[0_20px_50px_-38px_rgba(255,255,255,0.35)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white shadow-sm shadow-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-white", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs leading-5 text-slate-200/80", children: item.detail })
            ] })
          ] }, item.label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "w-full rounded-[1rem] bg-[#7c61ff] py-4 text-sm font-semibold text-white shadow-xl shadow-[#7c61ff]/25 transition hover:bg-[#6b4cff]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", children: [
              "Get a Quote ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2.5 h-5 w-5" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-200/75", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-slate-200/80" }),
              " Secure · Fast · Trusted"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-200 dark:border-slate-800 pt-8 sm:flex-row sm:gap-4 lg:mt-24 lg:pt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-6 text-[15px] font-semibold text-slate-600 dark:text-slate-400 lg:gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Trusted by Thousands" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden h-5 w-px bg-slate-300 md:block" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "4.8/5 Average Rating" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden h-5 w-px bg-slate-300 md:block" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "h-5 w-5 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "24/7 Customer Support" })
        ] })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-20 md:py-24 bg-[#f4f8fc] dark:bg-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-[#f4f8fc]/80 dark:bg-slate-900/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-7xl px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-[0.28em] text-[#0056b3]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl font-bold text-[#0f3b6f] dark:text-white md:text-4xl", children: "How it works" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400", children: [
            "Whether you're ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#047857] dark:text-emerald-400", children: "buying, selling or exchanging" }),
            " — the whole process takes just a few minutes in store."
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${CARD_GRID} sm:grid-cols-2 lg:grid-cols-4`, children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.08, className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: themedCard(i, "rounded-2xl p-6"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#def7ec] dark:bg-slate-800 text-sm font-bold text-[#047857] dark:text-emerald-400", children: step.n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-slate-900 dark:text-white", children: step.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400", children: step.d })
        ] }) }, step.n)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-white dark:bg-transparent py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 rounded-[2rem] border border-[#b3d9ff]/50 bg-gradient-to-br from-[#f0f7ff] to-white dark:from-slate-900/80 dark:to-slate-950/95 dark:border-slate-800 p-8 md:grid-cols-2 md:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mb-4 h-9 w-9 text-[#047857] dark:text-emerald-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-[0.28em] text-[#047857] dark:text-emerald-400", children: "Opening hours" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-3xl font-bold text-[#0f3b6f] dark:text-white", children: "Visit us today" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-slate-600 dark:text-slate-400 leading-relaxed", children: "6 Harefield Road, Nuneaton, CV11 4HD — walk in for an instant valuation or to browse refurbished stock." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6 rounded-lg bg-[#0056b3] text-white hover:bg-[#004494]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Get Directions" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: hours.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-[#b3d9ff]/60 bg-white dark:bg-slate-900/80 dark:border-slate-800 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: item.day }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-lg font-semibold text-[#047857] dark:text-emerald-400", children: item.time })
      ] }) }, item.day)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden py-20 bg-[#f4f8fc] dark:bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "relative overflow-hidden rounded-[2rem] border border-[#b3d9ff]/60 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-10 text-center shadow-lg md:p-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mx-auto mb-4 h-6 w-6 text-[#10b981] dark:text-emerald-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-[#0f3b6f] dark:text-white md:text-4xl", children: "Ready to buy or sell?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400", children: "Visit our Nuneaton shop or message us for an instant quote on your device." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "rounded-lg bg-[#10b981] text-white hover:bg-[#059669]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Get a Quote" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "rounded-lg border-2 border-[#0056b3] text-[#0056b3] hover:bg-[#f0f7ff] dark:border-sky-400 dark:text-sky-300 dark:hover:bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+447415278767", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mr-2 h-4 w-4" }),
          " 07415 278767"
        ] }) })
      ] })
    ] }) }) }) })
  ] }) });
}
export {
  BuyAndSellPage as component
};
