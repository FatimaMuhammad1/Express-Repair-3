import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Layout, B as Button, R as Reveal, H as HoverLift, S as SectionBackdrop, C as Card } from "./router-tK0G9_Rh.mjs";
import "../_libs/sonner.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { b as ShieldCheck, Z as Zap, O as Tag, d as ArrowRight, P as Phone, V as Star, am as MapPin, w as MessageCircle, C as Clock, A as Award, c as Search, an as PackageCheck, W as Wrench, s as CircleCheck, ao as Bell, K as Calendar, m as ChevronRight, S as Smartphone } from "../_libs/lucide-react.mjs";
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
const heroImage = "/assets/hero-repair-shop-DHaE5DDa.jpg";
const workshopImage = "/assets/background-DihIGWO6.png";
const headphoneImage = "/assets/headphone-grid1-BV7cw-nU.png";
const laptopImage = "/assets/mac-book-grid2-C0kMvtlR.png";
const phoneImage = "/assets/phone-grid3-B4GcNB9G.png";
const catLaptop = "/assets/cat-laptop-B2aT8hxp.jpg";
const catTablet = "/assets/cat-tablet-BC6sLp_T.jpg";
const catWatch = "/assets/cat-watch-D5UkTKjo.jpg";
const catTap = "/assets/cat-tap-CpcRlGFr.jpg";
const phoneLightning = "/assets/phone-lightning-D4tOViKy.png";
const countUpStats = [{
  value: "10,000+",
  label: "Devices Repaired"
}, {
  value: "4.9★",
  label: "Average Rating"
}, {
  value: "30 min",
  label: "Avg Repair Time"
}, {
  value: "90 days",
  label: "Warranty Included"
}];
const testimonials = [{
  name: "James W.",
  text: "Fast screen replacement and excellent service. Highly recommend."
}, {
  name: "Sophie L.",
  text: "Very professional staff and affordable pricing — couldn't be happier."
}, {
  name: "David R.",
  text: "My laptop was repaired the same day. Brilliant local service."
}, {
  name: "Emma T.",
  text: "Highly recommended local repair shop. Friendly and reliable."
}];
function HomePage() {
  const aboutImages = [headphoneImage, laptopImage, phoneImage];
  const [activeAboutImageIndex, setActiveAboutImageIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (aboutImages.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveAboutImageIndex((current) => (current + 1) % aboutImages.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [aboutImages.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-h-screen bg-[#F5F1ED] dark:bg-slate-950 section-frost dark:section-frost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex min-h-[85vh] lg:min-h-[720px] w-full items-center overflow-hidden bg-gradient-soft dark:bg-[#070e1a] transition-colors duration-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[-10%] top-0 h-full w-[45%] origin-bottom-left -skew-x-[12deg] bg-slate-200/60 dark:bg-[#0e1628] transition-colors duration-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-[20%] lg:right-0 top-0 h-full w-[110%] lg:w-[46%] origin-bottom-left -skew-x-[12deg] bg-[#0095ff]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -right-[20%] lg:right-0 top-0 h-full w-[110%] lg:w-[46%] origin-bottom-left -skew-x-[12deg] overflow-hidden translate-x-[12px] lg:translate-x-[20px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-[-20%] w-[140%] h-[140%] origin-bottom-left skew-x-[12deg] flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImage, alt: "Technician repairing a device", className: "h-full w-full object-cover filter brightness-[0.55] contrast-[1.1] saturate-100 -translate-x-[10%]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#000000]/80 via-transparent to-transparent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 bottom-0 h-[80%] w-[40%] bg-gradient-to-t from-[#0095ff]/60 to-transparent mix-blend-multiply" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent dark:from-slate-900/90 dark:via-slate-900/70 dark:to-transparent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8 py-16 lg:py-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full lg:max-w-[56%] flex flex-col items-start pt-8 md:pt-12 lg:pt-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5,
          ease: "easeOut"
        }, className: "flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-green-500/30 bg-green-50 dark:bg-green-500/10 mb-6 md:mb-8 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 dark:text-green-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs md:text-sm font-semibold text-slate-900 dark:text-slate-200", children: "Trusted by Hundreds of Customers" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.1,
          ease: "easeOut"
        }, className: "font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black uppercase leading-[1.1] md:leading-[1.05] tracking-tight text-slate-900 dark:text-white mb-4 md:mb-6", children: [
          "TRUSTED REPAIRS.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "PROFESSIONAL ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0095ff]", children: "RESULTS." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          scaleX: 0
        }, animate: {
          opacity: 1,
          scaleX: 1
        }, transition: {
          duration: 0.6,
          delay: 0.2,
          ease: "easeOut"
        }, className: "h-1 w-16 md:w-20 bg-[#0095ff] mb-6 md:mb-8 origin-left rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.2,
          ease: "easeOut"
        }, className: "text-sm md:text-base lg:text-lg text-slate-800 dark:text-slate-300 max-w-full md:max-w-[32rem] leading-relaxed mb-8 md:mb-10 font-medium", children: [
          "Expert repairs for phones, tablets, laptops and consoles.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
          "Quality parts, transparent pricing and warranty on every repair."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.3,
          ease: "easeOut"
        }, className: "grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10 w-full max-w-full md:max-w-[38rem]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 md:gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 md:w-5 md:h-5 text-[#0095ff]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-900 dark:text-white text-xs md:text-sm mb-1", children: "Fast Turnaround" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] md:text-[13px] text-slate-800 dark:text-slate-400 font-medium leading-tight", children: [
                "Same-day service",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "available"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 md:gap-3 sm:border-l border-slate-200 dark:border-slate-800 sm:pl-4 md:pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 md:w-5 md:h-5 text-green-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-900 dark:text-white text-xs md:text-sm mb-1", children: "Warranty Included" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] md:text-[13px] text-slate-800 dark:text-slate-400 font-medium leading-tight", children: [
                "Up to 12 months",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "warranty"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 md:gap-3 sm:border-l border-slate-200 dark:border-slate-800 sm:pl-4 md:pl-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 md:w-5 md:h-5 text-[#0095ff]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-900 dark:text-white text-xs md:text-sm mb-1", children: "Transparent Pricing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] md:text-[13px] text-slate-800 dark:text-slate-400 font-medium leading-tight", children: [
                "No hidden fees.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Ever."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.4,
          ease: "easeOut"
        }, className: "flex flex-col sm:flex-wrap sm:flex-row items-center gap-3 md:gap-4 mb-8 md:mb-10 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-full bg-[#0095ff] text-white hover:bg-[#0078d4] px-6 py-4 md:px-8 md:py-6 text-xs md:text-sm font-bold shadow-[0_4px_20px_rgba(0,149,255,0.3)] transition-all hover:shadow-[0_8px_30px_rgba(0,149,255,0.5)] border-0 w-full sm:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", className: "flex items-center justify-center gap-2", children: [
            "Get a Repair Quote ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 md:w-4 md:h-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-full bg-transparent border-2 border-[#0095ff]/20 text-slate-900 dark:text-white hover:bg-[#0095ff]/5 dark:hover:bg-[#0095ff]/10 px-6 py-4 md:px-8 md:py-6 text-xs md:text-sm font-bold transition-all w-full sm:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+447415278767", className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 md:w-4 md:h-4 text-[#0095ff]" }),
            " Call Us Now"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.5,
          ease: "easeOut"
        }, className: "flex flex-col sm:flex-wrap sm:flex-row items-start sm:items-center gap-3 md:gap-5 text-xs md:text-sm font-medium text-slate-800 dark:text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 md:w-4 md:h-4 fill-green-500 text-green-500" }, star)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-900 dark:text-slate-200 font-bold ml-1", children: "4.9/5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "from 500+ reviews" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block w-px h-4 md:h-5 bg-slate-300 dark:bg-slate-700" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 md:w-4 md:h-4 text-[#0095ff]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Nuneaton, CV11 4HD" })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-white dark:bg-slate-950 section-frost", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 opacity-[0.48] bg-[#F5F1ED] dark:bg-slate-950", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-white/30 dark:bg-slate-900/40", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 section-ice dark:section-ice", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#0095ff] mb-4 block pb-2 border-b-2 border-[#0095ff] inline-block", children: "About Us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-5xl md:text-6xl font-bold text-slate-950 dark:text-white leading-[1.08] tracking-tight mb-6", children: [
              "Local experts.",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              " Real repairs."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-400 leading-relaxed mb-3", children: "We're a small, independent repair shop based in Nuneaton. Our focus is simple: quality repairs, honest advice, and great customer service." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-400 leading-relaxed mb-10", children: "From cracked screens to complex board repairs, we treat every device with care as if it were our own." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-4", children: [{
              icon: ShieldCheck,
              label: "Quality Repairs",
              desc: "We use quality parts and proven techniques."
            }, {
              icon: MessageCircle,
              label: "Honest Advice",
              desc: "No pushy upsells. Just clear advice you can trust."
            }, {
              icon: Clock,
              label: "Quick Turnaround",
              desc: "Most repairs completed the same day."
            }, {
              icon: Award,
              label: "90-Day Warranty",
              desc: "All repairs come with a 90-day warranty."
            }].map((item, i) => {
              const Icon = item.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start text-left px-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-3xl bg-[#eff6ff] dark:bg-slate-800 shadow-sm shadow-slate-900/5 dark:shadow-none mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-[#0B57A1] dark:text-sky-300" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-slate-900 dark:text-white text-sm mb-2 leading-tight", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-[12rem]", children: item.desc })
              ] }, i);
            }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "relative overflow-hidden bg-white dark:bg-slate-950/95 dark:border dark:border-slate-800 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.24)] rounded-2xl min-h-[460px] md:min-h-[560px] lg:min-h-[640px]", whileHover: {
            scale: 1.03,
            rotate: 1
          }, transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1]
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: aboutImages[activeAboutImageIndex], alt: "Repair workshop interior", className: "absolute inset-0 h-full w-full object-cover", loading: "lazy", initial: {
              opacity: 0,
              scale: 1.06
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.97
            }, transition: {
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1]
            } }, activeAboutImageIndex) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 bottom-4 flex justify-center gap-3", children: aboutImages.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": `Show image ${index + 1}`, onClick: () => setActiveAboutImageIndex(index), className: `h-3 w-3 rounded-full transition-all duration-300 ${activeAboutImageIndex === index ? "bg-slate-900 scale-110" : "bg-slate-300"}` }, index)) })
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 md:py-28 section-frost dark:section-frost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.25em] text-[#0095ff] mb-3 block bg-[#e0e7ff] dark:bg-slate-800 dark:text-slate-200 inline-block px-3 py-1 rounded", children: "OUR SELECTION" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-5xl md:text-6xl font-serif font-bold tracking-tight text-slate-900 dark:text-white mb-4", children: "Premium Repair Services" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed", children: "Every device is hand-selected, professionally diagnosed, and expertly repaired to preserve peak performance and longevity." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12", children: [{
            img: catLaptop,
            t: "Laptop Repair",
            d: "Slow, broken or not booting? We bring laptops back to life with expert diagnostics and quality repairs."
          }, {
            img: catTablet,
            t: "Tablet Repair",
            d: "Cracked screens, charging issues and battery swaps — all handled with precision and care."
          }, {
            img: catWatch,
            t: "Phone Unlocking",
            d: "Network unlocking for most makes and models with fast turnaround and guaranteed results."
          }, {
            img: catTap,
            t: "Accessories",
            d: "Quality cases, chargers, cables and audio — carefully selected for durability and performance."
          }].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HoverLift, { delay: i * 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden mb-4 cursor-pointer h-72 shadow-xl shadow-black/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.img, alt: item.t, loading: "lazy", className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-2", children: item.t }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 leading-relaxed", children: item.d })
            ] })
          ] }) }, item.t)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[#f5f1ed] dark:bg-slate-900/85 dark:border dark:border-slate-800 p-10 md:p-16 text-center border border-slate-200/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-3", children: "Need Professional Repair Service?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed", children: "We handle all your device repair needs with expert care and genuine components. Contact us for a consultation today." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", className: "inline-flex items-center gap-2 px-8 py-3 bg-[#10274b] hover:bg-[#0a1a35] text-white font-semibold rounded transition-colors duration-300", children: "BOOK A REPAIR" })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-24 bg-gradient-to-b from-[#eef7ff] via-[#f8fbff] to-[#ffffff] dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 dark:bg-slate-950", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-16 lg:grid-cols-[0.95fr_1.35fr] items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#0095ff] mb-4 block pb-2 border-b-2 border-[#0095ff] inline-block", children: "Why Choose Us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold text-[#0f3b6f] dark:text-white leading-[1.15] mb-4 tracking-tight", children: [
              "Repairs you",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "can trust."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-[36ch] text-base", children: "Fast, honest repairs backed by quality parts and expert technicians. We make the process simple, clear and worry-free." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-3", children: [{
              icon: Zap,
              title: "Same Day Repairs",
              desc: "Most repairs completed the same day."
            }, {
              icon: Search,
              title: "Free Diagnostics",
              desc: "We find the issue first, so you know."
            }, {
              icon: ShieldCheck,
              title: "Genuine Quality Parts",
              desc: "Reliable parts for lasting performance."
            }, {
              icon: Award,
              title: "Expert Technicians",
              desc: "Skilled professionals you can rely on."
            }].map((f, fi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "flex items-start gap-4 py-4 rounded-lg px-4 -mx-4 hover:bg-blue-50/60 dark:hover:bg-slate-800/70 transition-colors duration-300", initial: {
              opacity: 0,
              x: -32
            }, whileInView: {
              opacity: 1,
              x: 0
            }, viewport: {
              once: true,
              margin: "-40px"
            }, transition: {
              delay: fi * 0.1,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1]
            }, whileHover: {
              x: 6
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f4ff] dark:bg-slate-800 shadow-sm text-[#0095ff] dark:text-sky-300 border border-[#b3d9ff]/30 dark:border-slate-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5", strokeWidth: 2.2 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-[#0f3b6f] dark:text-white", children: f.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-600 dark:text-slate-400 mt-1", children: f.desc })
              ] })
            ] }, f.title)) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[#b3d9ff] dark:border-slate-700 bg-gradient-to-br from-[#f0f7ff] via-[#e8f4ff] to-[#f0f7ff] dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/95 backdrop-blur-xl p-6 sm:p-8 md:p-12 flex flex-col gap-6 sm:gap-8 shadow-[0_16px_48px_-12px_rgba(0,149,255,0.15)] h-full relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#0095ff]/8 dark:bg-[#0095ff]/15 blur-3xl", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[#5bbcff]/12 dark:bg-[#5bbcff]/10 blur-3xl", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#0095ff] dark:text-sky-300", children: "Track Your Repair" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl md:text-4xl font-bold text-[#0f3b6f] dark:text-white mt-2 mb-3", children: "Track your repair" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 leading-relaxed", children: "Stay updated on your repair status in real time. We'll show you exactly where your device is in our workflow." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-300" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Enter your tracking ID (e.g. FIX-89045)", className: "w-full rounded-lg border border-[#b3d9ff] dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm pl-10 pr-4 py-3 text-sm text-slate-700 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 font-medium outline-none focus:border-[#0095ff] focus:ring-2 focus:ring-[#0095ff]/25 transition-all shadow-sm min-w-0" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full sm:w-auto rounded-lg bg-[#0095ff] hover:bg-[#0080dd] text-white px-6 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide", children: "Track Now" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 overflow-hidden py-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[2px] bg-gradient-to-r from-[#0095ff] to-slate-300" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center w-full justify-between md:justify-between gap-2 md:gap-0", children: [{
                icon: PackageCheck,
                label: "Received",
                desc: "Device logged in.",
                active: true
              }, {
                icon: Search,
                label: "Diagnosis",
                desc: "Checking the issue.",
                active: false
              }, {
                icon: Wrench,
                label: "Repairing",
                desc: "Experts are fixing.",
                active: false
              }, {
                icon: ShieldCheck,
                label: "Testing",
                desc: "Quality checks.",
                active: false
              }, {
                icon: CircleCheck,
                label: "Ready",
                desc: "Ready for pickup.",
                active: false
              }].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center text-center flex-1 md:w-[18%]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border-2 z-10 shadow-md transition-all ${step.active ? "border-[#0095ff] bg-white text-[#0095ff] shadow-[0_4px_12px_rgba(0,149,255,0.18)] dark:bg-slate-950/95 dark:text-[#7cc3ff] dark:border-slate-600" : "border-slate-300 bg-white text-slate-400 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "h-4 w-4 md:h-5 md:w-5", strokeWidth: 1.75 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wide ${step.active ? "text-[#0095ff] dark:text-sky-300" : "text-slate-600 dark:text-slate-400"}`, children: step.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 leading-tight hidden sm:block px-1 font-medium", children: step.desc })
              ] }, step.label)) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-lg border border-[#b3d9ff] dark:border-slate-700 bg-white/50 dark:bg-slate-900/70 backdrop-blur-sm px-4 py-4 transition hover:bg-white/70 dark:hover:bg-slate-900/80 shadow-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f4ff] dark:bg-slate-800 border border-[#b3d9ff] dark:border-slate-700 text-[#0095ff] dark:text-sky-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4", strokeWidth: 2 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-[#0f3b6f] dark:text-white", children: "Get Status Alerts" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-600 dark:text-slate-400 mt-1", children: "Receive SMS or email updates instantly." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs font-bold text-[#0095ff] dark:text-sky-300 hover:text-[#0080dd] dark:hover:text-sky-400 mt-2 transition", children: "Enable Alerts →" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-lg border border-[#b3d9ff] dark:border-slate-700 bg-white/50 dark:bg-slate-900/70 backdrop-blur-sm px-4 py-4 transition hover:bg-white/70 dark:hover:bg-slate-900/80 shadow-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f4ff] dark:bg-slate-800 border border-[#b3d9ff] dark:border-slate-700 text-[#0095ff] dark:text-sky-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4", strokeWidth: 2 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-[#0f3b6f] dark:text-white", children: "Lost Your ID?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-600 dark:text-slate-400 mt-1", children: "Check your email receipt or contact us." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-xs font-bold text-[#0095ff] dark:text-sky-300 hover:text-[#0080dd] dark:hover:text-sky-400 mt-2 transition", children: "Get Support →" })
                ] })
              ] })
            ] })
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-24 dark:bg-slate-950", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-white/25 dark:bg-slate-950/70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 section-gold opacity-80", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#0095ff]/14 blur-3xl orb-float" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#e0f2fe]/35 blur-3xl orb-float-reverse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5bbcff]/15 blur-3xl animate-pulse-glow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.3em] text-[#0095ff] mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-slate-950 dark:text-white leading-[1.05] max-w-3xl mx-auto", children: [
              "Trusted by thousands, ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[#0078d4] dark:text-sky-300", children: "proven daily." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-max stats-ticker-marquee hover:[animation-play-state:paused]", children: [...countUpStats, ...countUpStats].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 px-12 md:px-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight bg-gradient-to-b from-slate-900 via-[#0095ff] to-[#0095ff] bg-clip-text text-transparent whitespace-nowrap", children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400 whitespace-nowrap", children: stat.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0095ff]/35 text-2xl leading-none", "aria-hidden": true, children: "•" })
            ] }, `${stat.label}-${i}`)) }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-gradient-to-br from-[#f6faff] via-[#eff6ff] to-[#ffffff] dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950 dark:bg-slate-950 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full border border-[#dbeafe] bg-[#eff6ff] dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#0f3b6f] dark:text-slate-100 mb-4", children: "Express Service" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-5xl md:text-[3.5rem] font-bold text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-4", children: [
                "Fast Repairs.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Fair Prices."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl", children: "Same-day repairs available for most devices." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-6 mb-10", children: [{
                icon: Zap,
                title: "Same-Day Repairs",
                desc: "Get your device back today."
              }, {
                icon: ShieldCheck,
                title: "Quality Parts",
                desc: "We use trusted, genuine parts."
              }, {
                icon: Award,
                title: "Expert Technicians",
                desc: "Skilled professionals you can trust."
              }, {
                icon: Tag,
                title: "Fair Pricing",
                desc: "Honest prices. No hidden fees."
              }].map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-slate-200/80 bg-white dark:bg-slate-950/95 dark:border-slate-800 p-5 shadow-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e0e7ff] dark:bg-slate-800 text-[#0078d4] dark:text-sky-300 shadow-sm mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "h-5 w-5", strokeWidth: 2 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-slate-900 dark:text-white mb-1", children: feature.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-600 dark:text-slate-400 leading-relaxed", children: feature.desc })
              ] }, feature.title)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 rounded-xl bg-gradient-purple-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-purple-blue-hover transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
                  " Book a Repair"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#services", className: "inline-flex items-center gap-1 text-sm font-semibold text-[#0095ff] hover:underline", children: [
                  "See our services ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "relative w-full aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#eef7ff] via-white to-[#e0f2fe] dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-950/95 dark:bg-slate-950/95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7),0_30px_90px_-50px_rgba(15,23,42,0.14)] border border-white/80 dark:border-slate-700", initial: {
              opacity: 0,
              x: 48,
              rotateY: -12
            }, whileInView: {
              opacity: 1,
              x: 0,
              rotateY: 0
            }, viewport: {
              once: true,
              margin: "-80px"
            }, transition: {
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1]
            }, whileHover: {
              scale: 1.02,
              rotateY: 4
            }, style: {
              perspective: 1200
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,_rgba(255,255,255,0.55)_0%,transparent_52%)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(210,198,178,0.22)_0%,transparent_48%)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: phoneLightning, alt: "Express Repair Phone", className: "relative h-[105%] max-h-full w-auto object-contain drop-shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] animate-float-y", whileHover: {
                scale: 1.05
              }, transition: {
                duration: 0.4
              } })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 rounded-[2rem] border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950/90 p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x md:divide-slate-100 dark:divide-slate-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:px-6 first:pl-0 last:pr-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f9ff] dark:bg-slate-800 text-[#0095ff]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-6 w-6", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#0095ff]", children: "10,000+" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5", children: "Devices Repaired" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed", children: "Trusted by thousands of happy customers." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:px-6 first:pl-0 last:pr-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f9ff] dark:bg-slate-800 text-[#0095ff]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-6 w-6", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-[#0095ff]", children: [
                  "4.9",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "★" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5", children: "Average Rating" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed", children: "Based on real customer reviews." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:px-6 first:pl-0 last:pr-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f9ff] dark:bg-slate-800 text-[#0095ff]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-6 w-6", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#0095ff]", children: "30–60 Min" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5", children: "Typical Repair Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed", children: "Most repairs completed while you wait." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:px-6 first:pl-0 last:pr-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f9ff] dark:bg-slate-800 text-[#0095ff]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#0095ff]", children: "90 Days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5", children: "Warranty on Repairs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed", children: "Peace of mind with every repair we do." })
              ] })
            ] })
          ] }) })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-24 section-ice dark:section-ice dark:bg-slate-950", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-white/20 dark:bg-slate-900/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.28em] text-[#0095ff] mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white", children: "What Customers Say About Our Workshop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto", children: "Trusted local repairs that keep devices working and customers coming back." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 xl:grid-cols-4", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HoverLift, { delay: i * 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white dark:bg-slate-950/95 dark:border-slate-800 p-8 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.10)] transition-shadow duration-500 hover:shadow-[0_35px_90px_-40px_rgba(15,23,42,0.16)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-5 right-5 h-24 w-24 rounded-full bg-[#0095ff]/10 blur-2xl", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0095ff]/10 text-[#10274b] dark:text-white shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "5.0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500", children: "Rating" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl leading-none text-[#0095ff]", children: "“" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-700 dark:text-slate-200 leading-relaxed mb-8 flex-1", children: t.text }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 border-t border-slate-100 dark:border-slate-700 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-gradient-purple-blue text-white shadow-sm text-sm font-semibold", children: t.name.charAt(0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-slate-900 dark:text-white", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Verified Customer" })
            ] })
          ] }) })
        ] }) }, t.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-24 bg-white dark:bg-slate-950", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-slate-100/70 dark:bg-slate-900/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "relative overflow-hidden rounded-[2.5rem] bg-sky-50 dark:bg-slate-900/80 dark:border-slate-700 border border-slate-200/70 p-6 sm:p-8 md:p-12 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]", initial: {
        opacity: 0,
        y: 24
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        margin: "-100px"
      }, transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-10 top-12 h-40 w-40 rounded-full bg-[#c7d8ff]/30 dark:bg-[#6e7fbf]/15 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-10 bottom-14 h-48 w-48 rounded-full bg-[#e0e7ff]/40 dark:bg-[#5b8be1]/10 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-14 xl:gap-20 lg:grid-cols-[1.3fr_0.85fr] lg:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "overflow-hidden rounded-[1.75rem] bg-slate-100 dark:bg-slate-950/95 min-h-[220px] sm:min-h-[360px] md:min-h-[520px] sm:aspect-[4/3]", initial: {
            opacity: 0,
            x: -16,
            scale: 0.98
          }, whileInView: {
            opacity: 1,
            x: 0,
            scale: 1
          }, viewport: {
            once: true,
            margin: "-100px"
          }, transition: {
            delay: 0.18,
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1]
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: workshopImage, alt: "Repair workshop storefront", className: "w-full h-full object-cover", style: {
            objectPosition: "center center"
          }, loading: "lazy" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            x: 16
          }, whileInView: {
            opacity: 1,
            x: 0
          }, viewport: {
            once: true,
            margin: "-100px"
          }, transition: {
            delay: 0.1,
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1]
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.3em] text-[#5b21b6] dark:text-sky-300 mb-4", children: "Visit Our Store" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-4xl md:text-[3.5rem] font-bold tracking-tight text-slate-950 dark:text-white mb-4", children: "Come visit our workshop in Nuneaton" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed text-lg", children: "Drop in for a free diagnostic, friendly advice, or to browse our refurbished stock and accessories. Our team is ready to assess your device and get it back to perfect working order." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 mb-10 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-slate-800 text-[#0095ff] dark:text-sky-300 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-[#0095ff]", children: "Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: "6 Harefield Road, Nuneaton, CV11 4HD" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-slate-800 text-[#0095ff] dark:text-sky-300 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-[#003ea8] dark:text-sky-300", children: "Call Us" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: "07415 278767" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "flex flex-wrap gap-4", initial: {
              opacity: 0,
              y: 12
            }, whileInView: {
              opacity: 1,
              y: 0
            }, viewport: {
              once: true,
              margin: "-100px"
            }, transition: {
              delay: 0.2,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "rounded-xl bg-gradient-purple-blue hover:bg-gradient-purple-blue-hover text-white px-8 h-12 uppercase tracking-widest text-xs font-semibold shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Get Directions" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "rounded-xl border-2 border-[#0095ff] text-[#0095ff] bg-white dark:bg-slate-900/90 dark:text-white hover:bg-[#e0f2fe] dark:hover:bg-slate-800 px-8 h-12 uppercase tracking-widest text-xs font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", children: "Book a Repair" }) })
            ] })
          ] })
        ] })
      ] }) }) })
    ] })
  ] }) }) });
}
export {
  HomePage as component
};
