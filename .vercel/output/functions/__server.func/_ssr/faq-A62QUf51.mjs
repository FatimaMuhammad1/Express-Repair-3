import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Layout, P as PageHero, S as SectionBackdrop, B as Button, C as Card, G as GoogleMapsIcon, c as cn } from "./router-tK0G9_Rh.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { R as Reveal } from "./Reveal-B2mjcIhv.mjs";
import { w as workshopImage } from "./workshop-DxzeSnD5.mjs";
import "../_libs/sonner.mjs";
import { w as MessageCircle, x as CircleQuestionMark, W as Wrench, b as ShieldCheck, y as PoundSterling, z as Database, P as Phone, G as ChevronDown } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/radix-ui__react-collapsible.mjs";
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
const heroImage = "/assets/faq-hero-DWx2It9y.png";
const sections = [{
  title: "General",
  icon: CircleQuestionMark,
  summary: "Opening hours, location and walk-ins.",
  items: [{
    q: "What are your business hours?",
    a: "Monday to Saturday, 10:00 AM to 6:00 PM. Closed Sundays."
  }, {
    q: "Where are you located?",
    a: "6 Harefield Road, Nuneaton, CV11 4HD."
  }, {
    q: "Do you accept walk-ins?",
    a: "Yes. Walk-ins are welcome. Calling ahead on 07415 278767 helps us prepare for your visit."
  }]
}, {
  title: "Repairs",
  icon: Wrench,
  summary: "Devices, timings and common repair questions.",
  items: [{
    q: "How long do repairs take?",
    a: "Most common repairs such as screens, batteries and charging ports are completed the same day, often within 30-60 minutes."
  }, {
    q: "What devices do you repair?",
    a: "Smartphones, tablets, laptops, smartwatches and most other electronic devices."
  }, {
    q: "Will my repair void the manufacturer warranty?",
    a: "Third-party repairs may affect your manufacturer warranty, but every repair we do is backed by our own 90-day warranty."
  }]
}, {
  title: "Warranty",
  icon: ShieldCheck,
  summary: "What is covered after a repair.",
  items: [{
    q: "How long is the repair warranty?",
    a: "90 days on parts and labour for every repair we carry out."
  }, {
    q: "What does the warranty cover?",
    a: "Failure of the replaced part under normal use. Accidental damage and liquid damage are not covered."
  }, {
    q: "How do I claim warranty?",
    a: "Bring your device and the repair receipt back to our Nuneaton store and we'll take care of it."
  }]
}, {
  title: "Pricing",
  icon: PoundSterling,
  summary: "Diagnostics, quotes and payment methods.",
  items: [{
    q: "Are diagnostics free?",
    a: "Yes. Diagnostics are 100% free, with no obligation to repair."
  }, {
    q: "Are there hidden fees?",
    a: "Never. You always get a clear price before we start any work."
  }, {
    q: "What payment methods do you accept?",
    a: "Cash and all major credit/debit cards."
  }]
}, {
  title: "Data Safety",
  icon: Database,
  summary: "Privacy, backups and recovery options.",
  items: [{
    q: "Is my data safe during repair?",
    a: "Yes. We follow strict privacy protocols and do not access your personal data."
  }, {
    q: "Should I back up my device?",
    a: "We recommend a backup before any repair, although most repairs preserve all data."
  }, {
    q: "Can you recover lost data?",
    a: "Yes. We offer professional data recovery for many damaged devices."
  }]
}];
function FaqPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-[#F5F1ED] dark:bg-slate-950 section-frost dark:section-frost", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 z-0", style: {
      backgroundColor: "#F5F1ED"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { className: "min-h-[48vh] md:min-h-[56vh]", image: heroImage, overlayClassName: "bg-[linear-gradient(110deg,rgba(8,15,31,0.84)_0%,rgba(13,35,76,0.58)_38%,rgba(8,15,31,0.18)_72%,rgba(8,15,31,0.08)_100%)]", hideBottomFade: true, title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "FAQ" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-20 md:py-24 overflow-hidden bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-white/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl items-start gap-8 px-4 lg:grid-cols-[0.76fr_1.24fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "lg:sticky lg:top-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-[2rem] border border-[#0095ff]/15 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#f8fbff] shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: workshopImage, alt: "Express repair workshop", className: "h-full w-full min-h-64 object-cover", loading: "lazy" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mb-4 h-8 w-8 text-[#0095ff]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold text-[#0095ff]", children: "Need a human answer?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm leading-7 text-slate-600", children: [
                "Send a photo on ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#059669]", children: "WhatsApp" }),
                " or call the shop. We can usually point you in the right direction quickly."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://wa.me/447415278767", children: "Ask on WhatsApp" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-xl border-2 border-[#0095ff] text-[#0078d4] bg-white hover:bg-[#e0f2fe]/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+447415278767", children: "Call 07415 278767" }) })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { id: section.title.toLowerCase().replace(/\s+/g, "-"), className: "scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-[#0095ff]/15 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#f8fbff] shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-[#0095ff]/40 bg-[#e0f2fe]/50 p-6 md:p-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#0095ff]/60 bg-[#e0f2fe] text-[#0095ff]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(section.icon, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-slate-950", children: section.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-slate-600", children: section.summary })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "divide-y divide-slate-200", children: section.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: item.q, className: "border-0 px-6 md:px-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "py-5 text-left text-base font-semibold text-slate-950 hover:text-[#0095ff] hover:no-underline", children: item.q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "pb-6 text-sm leading-7 text-slate-600", children: item.a })
            ] }, item.q)) })
          ] }) }, section.title)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe]/30 to-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-[#f0f9ff]/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "relative overflow-hidden rounded-[2.5rem] border border-[#0095ff]/15 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#f8fbff] p-8 md:p-12 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]", initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          duration: 0.5
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleMapsIcon, { className: "mb-5 h-10 w-10 text-[#0095ff]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#0095ff]", children: "Still unsure?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold leading-tight text-[#0095ff] md:text-5xl", children: "Pop in or message us first." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-sm leading-7 text-slate-600", children: "Bring your device to 6 Harefield Road, Nuneaton, CV11 4HD for a free initial diagnosis, or send us the details before you visit." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", children: [
                "Contact Us ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "ml-2 h-4 w-4" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-xl border-2 border-[#0095ff] text-[#0078d4] bg-white hover:bg-[#e0f2fe]/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+447415278767", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mr-2 h-4 w-4" }),
                " 07415 278767"
              ] }) })
            ] })
          ] })
        ] }) }) })
      ] })
    ] })
  ] }) });
}
export {
  FaqPage as component
};
