import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Layout, S as SectionBackdrop, R as Reveal, C as Card, B as Button } from "./router-D7NyTOTi.mjs";
import { I as Input } from "./input-aJbd79JO.mjs";
import { L as Label } from "./label-BzgUJ4Mz.mjs";
import { T as Textarea } from "./textarea-CAYTt4Ve.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-jw1ahAuz.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { w as CircleCheck, a1 as Upload } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
function BookPage() {
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [trackingId, setTrackingId] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    device_type: "",
    device_model: "",
    issue_description: "",
    preferred_date: ""
  });
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  reactExports.useEffect(() => {
    try {
      const userStr = localStorage.getItem("current_user") || localStorage.getItem("admin_user");
      if (userStr) {
        const user = JSON.parse(userStr);
        setFormData((prev) => ({
          ...prev,
          customer_name: user.name || "",
          customer_phone: user.phone || "",
          customer_email: user.email || ""
        }));
      }
    } catch (e) {
      console.error("Failed to parse user data", e);
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const phoneRegex = /^(\+44|0)[1-9]\d{8,9}$/;
    if (formData.customer_phone && !phoneRegex.test(formData.customer_phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid UK phone number (e.g., 07415 278767 or +447415278767)");
      return;
    }
    setIsLoading(true);
    const payload = {
      ...formData,
      preferred_time_slot: "Any time"
    };
    try {
      const token = localStorage.getItem("user_token") || localStorage.getItem("admin_token");
      const headers = {
        "Content-Type": "application/json"
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      let imageUrl = "";
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("file", selectedFile);
        const uploadRes = await fetch("http://localhost:8000/api/uploads/", {
          method: "POST",
          body: fileData
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          imageUrl = uploadData.file_url;
        }
      }
      if (imageUrl) {
        payload.issue_description += `

Image Attachment: ${imageUrl}`;
      }
      const res = await fetch("http://localhost:8000/api/bookings/create", {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        setTrackingId(data.tracking_id || "");
        setSubmitted(true);
        toast.success("Booking received! Your tracking ID is: " + (data.tracking_id || "pending"));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to submit booking.");
      }
    } catch (err) {
      toast.error("Could not reach the server.");
    } finally {
      setIsLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-[#f5fbff] dark:bg-transparent section-frost dark:section-frost", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#d9f2ff] via-[#effaf5] to-transparent dark:from-slate-900/30 dark:via-slate-900/10 dark:to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-white dark:bg-transparent ring-1 ring-[#10b981]/10 dark:ring-slate-800/30 shadow-[0_30px_80px_-50px_rgba(16,185,129,0.15)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative z-10 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-10 text-center rounded-[2rem] border border-transparent bg-white dark:bg-slate-900/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] ring-1 ring-inset ring-[#22c55e]/10 dark:ring-slate-700/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-[#ddf8f0] grid place-items-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-[#059669]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2 text-slate-950 dark:text-white", children: "Booking Confirmed!" }),
        trackingId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 p-4 bg-[#f0f9ff] dark:bg-slate-800/50 rounded-lg border border-[#0095ff]/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 mb-1", children: "Your Tracking ID:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0095ff] dark:text-sky-300 font-mono", children: trackingId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2", children: "Use this to track your repair progress" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 dark:text-slate-400 mb-6", children: "We'll be in touch shortly on 07415 278767 to confirm your repair slot." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
          setSubmitted(false);
          setTrackingId("");
        }, variant: "outline", className: "rounded-sm border-[#0095ff] text-[#0095ff] dark:text-sky-300 dark:border-sky-500 hover:bg-[#f0f9ff] dark:hover:bg-slate-800", children: "Book Another Repair" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 md:p-10 rounded-[2rem] border border-transparent dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] ring-1 ring-inset ring-[#0ea5e9]/10 dark:ring-slate-700/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.22em] text-[#0b69d7] mb-3", children: "Repair Request" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-slate-950 dark:text-white mb-6", children: "Tell us about your device" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", required: true, value: formData.customer_name, onChange: (e) => setFormData({
              ...formData,
              customer_name: e.target.value
            }), placeholder: "John Doe", className: "mt-1.5 rounded-xl border-slate-200" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "phone", children: [
              "Phone Number ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", type: "tel", value: formData.customer_phone, onChange: (e) => setFormData({
              ...formData,
              customer_phone: e.target.value
            }), placeholder: "+447415278767", pattern: "^\\+[1-9]\\d{6,14}$", title: "International format required (e.g. +447415278767)", className: "mt-1.5 rounded-xl border-slate-200" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: formData.customer_email, onChange: (e) => setFormData({
              ...formData,
              customer_email: e.target.value
            }), placeholder: "you@example.com", className: "mt-1.5 rounded-xl border-slate-200" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Device Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: formData.device_type, onValueChange: (v) => setFormData({
              ...formData,
              device_type: v
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1.5 rounded-xl border-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose device" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "mobile", children: "Mobile Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "laptop", children: "Laptop" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tablet", children: "Tablet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "watch", children: "Smartwatch" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Brand / Model" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "e.g. iPhone 13, Samsung S21", required: true, value: formData.device_model, onChange: (e) => setFormData({
              ...formData,
              device_model: e.target.value
            }), className: "mt-1.5 rounded-xl border-slate-200" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "problem", children: "Problem Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "problem", required: true, value: formData.issue_description, onChange: (e) => setFormData({
              ...formData,
              issue_description: e.target.value
            }), placeholder: "Describe what's wrong with your device...", rows: 4, className: "mt-1.5 rounded-xl border-slate-200" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", children: "Preferred Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "date", type: "date", required: true, value: formData.preferred_date, onChange: (e) => setFormData({
              ...formData,
              preferred_date: e.target.value
            }), className: "mt-1.5 rounded-xl border-slate-200" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Upload Image (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-1.5 border-2 border-dashed border-[#0ea5e9]/40 dark:border-slate-700 rounded-[1.25rem] bg-[#effaff] dark:bg-slate-900/50 p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-[#10b981]/50 hover:bg-[#ecfff5] dark:hover:border-slate-500 dark:hover:bg-slate-800/80 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-[#0b69d7] dark:text-sky-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: selectedFile ? selectedFile.name : "Click to upload device photos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => setSelectedFile(e.target.files?.[0] || null) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "sm:col-span-2 rounded-full bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] to-[#10b981] text-white h-12 uppercase tracking-widest text-xs font-semibold shadow-lg shadow-[#10b981]/20", children: "Confirm Booking" })
        ] })
      ] }) }) }) })
    ] }) })
  ] }) });
}
export {
  BookPage as component
};
