import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { L as Layout, G as GoogleMapsIcon, S as SectionBackdrop, C as Card, B as Button } from "./router-M-LHJbzv.mjs";
import { I as Input } from "./input-D4muOj1V.mjs";
import { L as Label } from "./label-gid8OMVi.mjs";
import { T as Textarea } from "./textarea-CF-Q9T4F.mjs";
import { S as Stagger, a as StaggerItem, R as Reveal } from "./Reveal-B2mjcIhv.mjs";
import { w as workshopImage } from "./workshop-DxzeSnD5.mjs";
import { P as Phone, w as MessageCircle, H as Send, C as Clock, F as Facebook, I as Instagram, J as Sparkles, K as Calendar } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
const contactChannels = [{
  icon: Phone,
  title: "Call us",
  value: "07415 278767",
  href: "tel:+447415278767",
  note: "Quotes, bookings and quick repair advice.",
  accentColor: "#F59E0B",
  accentLight: "#fef3c7",
  accentDark: "#b45309"
}, {
  icon: MessageCircle,
  title: "WhatsApp",
  value: "Send a photo",
  href: "https://wa.me/447415278767",
  note: "Fastest way to get a rough quote.",
  accentColor: "#25D366",
  accentLight: "#d1fae5",
  accentDark: "#128C7E"
}, {
  icon: GoogleMapsIcon,
  title: "Visit the shop",
  value: "6 Harefield Road",
  href: "https://www.google.com/maps/search/?api=1&query=6+Harefield+Road+Nuneaton+CV11+4HD",
  note: "Nuneaton, CV11 4HD. Walk-ins welcome.",
  accentColor: "#EC4899",
  accentLight: "#fbf1f7",
  accentDark: "#be123c"
}];
const hours = [{
  label: "Monday-Friday",
  time: "10 AM - 6 PM"
}, {
  label: "Saturday",
  time: "10 AM - 6 PM"
}, {
  label: "Sunday",
  time: "Closed"
}, {
  label: "Typical wait",
  time: "Under 15 min"
}];
const fieldClass = "h-12 rounded-lg border-[#0095ff]/60 dark:border-slate-700 bg-[#f0f9ff]/30 dark:bg-slate-900/50 px-4 shadow-none focus-visible:ring-[#0095ff] dark:text-white";
function ContactPage() {
  const [formData, setFormData] = reactExports.useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = reactExports.useState(false);
  async function handleContactSubmit(e) {
    e.preventDefault();
    const phoneRegex = /^(\+44|0)[1-9]\d{8,9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid UK phone number (e.g., 07415 278767 or +447415278767)");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/view/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      toast.error("Could not reach the server.");
    } finally {
      setIsLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-white dark:bg-slate-950 section-frost dark:section-frost", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 opacity-[0.48] dark:opacity-0", style: {
      backgroundColor: "#F5F1ED"
    }, "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-white/30 dark:bg-slate-950/30", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stagger, { className: "grid overflow-hidden rounded-[2rem] border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] md:grid-cols-3", children: contactChannels.map((channel, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: channel.href, target: channel.href.startsWith("http") ? "_blank" : void 0, rel: channel.href.startsWith("http") ? "noreferrer" : void 0, className: `group relative flex h-full min-h-44 flex-col justify-between border-slate-200 dark:border-slate-800 p-6 transition-all ${index < contactChannels.length - 1 ? "border-b md:border-b-0 md:border-r" : ""}`, style: {
        backgroundColor: `${channel.accentColor}08`
      }, onMouseEnter: (e) => e.currentTarget.style.backgroundColor = `${channel.accentColor}15`, onMouseLeave: (e) => e.currentTarget.style.backgroundColor = `${channel.accentColor}08`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-8 top-0 h-1 bg-gradient-to-r from-transparent via-[#0095ff] to-transparent opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-8 top-0 h-1", style: {
          background: `linear-gradient(90deg, transparent, ${channel.accentColor}, transparent)`,
          opacity: "0.5"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400", children: channel.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-2xl font-semibold text-slate-950 dark:text-white transition-colors", style: {
              color: channel.accentDark
            }, children: channel.value })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1", style: {
            backgroundColor: `${channel.accentColor}20`,
            color: channel.accentDark,
            borderColor: `${channel.accentColor}40`
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(channel.icon, { className: "h-6 w-6" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm leading-6 text-slate-600 dark:text-slate-400", children: channel.note })
      ] }) }, channel.title)) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-20 md:py-24 overflow-hidden bg-white dark:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl items-start gap-6 px-4 lg:grid-cols-[1.08fr_0.92fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-7 md:p-10 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#059669] via-[#d1fae5] to-[#059669]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#059669]", children: "Send a message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold leading-tight text-slate-950 dark:text-white md:text-4xl", children: "Tell us what needs fixing." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400", children: [
              "Include the device model, the issue, and any photos you can send by ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#059669] dark:text-emerald-400", children: "WhatsApp" }),
              "later. We will get back to you as soon as possible."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleContactSubmit, className: "mt-8 space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cname", className: "text-sm font-semibold text-slate-700 dark:text-slate-300", children: "Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cname", required: true, value: formData.name, onChange: (e) => setFormData({
                    ...formData,
                    name: e.target.value
                  }), className: fieldClass, placeholder: "Your name" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cphone", className: "text-sm font-semibold text-slate-700 dark:text-slate-300", children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cphone", type: "tel", value: formData.phone, onChange: (e) => setFormData({
                    ...formData,
                    phone: e.target.value
                  }), className: fieldClass, placeholder: "07xxx xxxxxx" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cemail", className: "text-sm font-semibold text-slate-700 dark:text-slate-300", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cemail", type: "email", required: true, value: formData.email, onChange: (e) => setFormData({
                    ...formData,
                    email: e.target.value
                  }), className: fieldClass, placeholder: "you@email.com" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "csubject", className: "text-sm font-semibold text-slate-700 dark:text-slate-300", children: "Subject" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "csubject", required: true, value: formData.subject, onChange: (e) => setFormData({
                    ...formData,
                    subject: e.target.value
                  }), className: fieldClass, placeholder: "Repair quote, warranty, etc." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cmsg", className: "text-sm font-semibold text-slate-700 dark:text-slate-300", children: "Message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "cmsg", required: true, rows: 6, value: formData.message, onChange: (e) => setFormData({
                  ...formData,
                  message: e.target.value
                }), className: "mt-2 rounded-lg border-[#0095ff]/60 dark:border-slate-700 bg-[#f0f9ff]/30 dark:bg-slate-900/50 px-4 py-3 shadow-none focus-visible:ring-[#0095ff] dark:text-white", placeholder: "Tell us about your device and the issue..." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", disabled: isLoading, className: "w-full rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover", children: isLoading ? "Sending..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-2 h-4 w-4" }),
                " Send Message"
              ] }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-950 dark:text-white shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: workshopImage, alt: "Express repair shop", className: "h-full w-full min-h-56 object-cover", loading: "lazy" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleMapsIcon, { className: "mb-4 h-8 w-8 text-[#059669]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-semibold text-slate-950 dark:text-white", children: "Visit our store" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-7 text-slate-600", children: "6 Harefield Road, Nuneaton, CV11 4HD" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.google.com/maps/search/?api=1&query=6+Harefield+Road+Nuneaton+CV11+4HD", target: "_blank", rel: "noreferrer", children: "Get Directions" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-xl border-2 border-[#0095ff] text-[#0078d4] dark:text-sky-300 bg-white dark:bg-slate-900/80 dark:border-sky-500 hover:bg-[#e0f2fe]/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+447415278767", children: "Call the Shop" }) })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-[1.75rem] border-[#25D366]/25 dark:border-emerald-800/50 bg-[#25D366]/[0.07] dark:bg-emerald-950/20 p-7 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center bg-[#25D366]/15 dark:bg-emerald-950/50 text-[#128C7E] dark:text-emerald-400 ring-1 ring-[#25D366]/25 dark:ring-emerald-600/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-6 w-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-2xl font-semibold text-slate-950 dark:text-white", children: [
                    "Chat on ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#059669] dark:text-emerald-400", children: "WhatsApp" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-7 text-slate-600", children: "Send photos of the damage and we can usually point you in the right direction quickly." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6 w-full rounded-sm bg-[#25D366] text-white hover:bg-[#20bd5a]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://wa.me/447415278767", children: "Open WhatsApp" }) })
            ] }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe]/30 to-white dark:bg-transparent dark:from-transparent dark:to-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-[#f0f9ff]/50 dark:bg-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "relative overflow-hidden rounded-[2.5rem] border border-[#0095ff]/15 dark:border-slate-800 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#f8fbff] dark:from-slate-900/80 dark:via-slate-900/70 dark:to-slate-950/85 p-8 md:p-12 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]", initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          duration: 0.5
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 md:grid-cols-[0.85fr_1.15fr]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mb-5 h-9 w-9 text-[#0095ff]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#0095ff]", children: "Opening hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold leading-tight text-[#0095ff] md:text-5xl", children: "Walk in when it suits." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xl text-sm leading-7 text-slate-600", children: "Bring your device in for a free initial diagnosis. Most common repairs can be handled the same day." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: hours.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-[#0095ff]/40 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.22em] text-slate-500", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-lg font-semibold text-[#0095ff] dark:text-sky-300", children: item.time })
            ] }, item.label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-3 border-t border-[#0095ff]/30 pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", children: "Book a Repair" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-xl border-2 border-[#25D366] text-[#059669] dark:text-emerald-400 bg-white dark:bg-slate-900/80 hover:bg-[#d1fae5]/40 dark:hover:bg-emerald-950/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://wa.me/447415278767", children: "Ask on WhatsApp" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "icon", variant: "outline", className: "rounded-xl border-[#0095ff] text-[#0095ff] dark:text-sky-300 bg-white dark:bg-slate-900/80 hover:bg-[#e0f2fe]/40 dark:hover:bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://facebook.com", target: "_blank", rel: "noreferrer", "aria-label": "Facebook", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "icon", variant: "outline", className: "rounded-xl border-[#0095ff] text-[#0095ff] dark:text-sky-300 bg-white dark:bg-slate-900/80 hover:bg-[#e0f2fe]/40 dark:hover:bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://instagram.com", target: "_blank", rel: "noreferrer", "aria-label": "Instagram", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }) }) })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-24 overflow-hidden bg-white dark:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-white/40 dark:bg-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-[#bfdbfe]/60 dark:border-sky-500/30 bg-[#f0f9ff] dark:bg-slate-800 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0095ff] dark:text-sky-400 shadow-sm mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleMapsIcon, { className: "h-4 w-4" }),
              "Find us"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white mt-5 mb-4", children: "Right in the heart of Nuneaton." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 dark:text-slate-400 leading-relaxed mb-6", children: "Drop by our Harefield Road workshop for a free diagnostic, friendly advice, or to browse our accessories. No appointment needed for walk-ins." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-slate-800 text-[#0095ff] dark:text-sky-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleMapsIcon, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-slate-900 dark:text-white", children: "Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-600 mt-1", children: "6 Harefield Road, Nuneaton, CV11 4HD" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.google.com/maps/search/?api=1&query=6+Harefield+Road+Nuneaton+CV11+4HD", target: "_blank", rel: "noreferrer", children: "Open in Google Maps" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-xl border-2 border-[#0095ff] text-[#0078d4] dark:text-sky-300 bg-white dark:bg-slate-900/80 hover:bg-[#e0f2fe]/40 dark:hover:bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://wa.me/447415278767", children: "Message for Directions" }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[2rem] border border-[#bfdbfe]/40 dark:border-slate-800 bg-[#f0f9ff] dark:bg-slate-900/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.5!2d-1.466!3d52.523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMxJzIyLjgiTiAxwrAyOCcwMC4wIlc!5e0!3m2!1sen!2suk!4v1", width: "100%", height: "100%", style: {
              minHeight: 400
            }, allowFullScreen: true, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", title: "Express Phone & Laptop Repair - Nuneaton Location", className: "rounded-[2rem]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-5 py-4 shadow-lg ring-1 ring-white/80 dark:ring-slate-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-purple-blue text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleMapsIcon, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-slate-950 dark:text-white", children: "Express Phone & Laptop Repair" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: "6 Harefield Road, Nuneaton, CV11 4HD" })
              ] })
            ] })
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe]/30 to-white dark:bg-transparent dark:from-transparent dark:to-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-[#f0f9ff]/50 dark:bg-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-4xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2.5rem] border border-[#0095ff]/15 dark:border-sky-600/30 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#f8fbff] dark:from-slate-900/80 dark:via-slate-900/70 dark:to-slate-950/85 p-10 md:p-14 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-[#06b6d4] mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-semibold text-[#0095ff] dark:text-sky-300 mb-6", children: "Ready to get your device fixed?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto", children: "Drop in for a free diagnostic, or book online and we'll have a slot ready for you." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover font-semibold h-12 uppercase tracking-widest text-xs px-8 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/book", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mr-2 h-4 w-4" }),
              "Book a Repair"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "rounded-xl border-2 border-[#0095ff] text-[#0078d4] dark:text-sky-300 dark:border-sky-500 bg-white dark:bg-slate-900/80 hover:bg-[#e0f2fe]/40 dark:hover:bg-slate-800 h-12 uppercase tracking-widest text-xs px-8 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+447415278767", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mr-2 h-4 w-4" }),
              "Call 07415 278767"
            ] }) })
          ] })
        ] }) }) })
      ] })
    ] })
  ] }) });
}
export {
  ContactPage as component
};
