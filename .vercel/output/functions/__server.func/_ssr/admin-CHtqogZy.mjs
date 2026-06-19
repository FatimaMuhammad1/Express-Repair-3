import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./router-TX-3wc7z.mjs";
import { I as Input } from "./input-BghJcuY0.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { f as LayoutDashboard, q as CircleAlert, a0 as RefreshCw, W as Wrench, a1 as Users, a2 as TrendingUp, a3 as Activity, U as User, p as LogOut, a4 as FileText, z as Database, s as CircleCheck, c as Search, a5 as Funnel, P as Phone, o as Circle, a6 as Trash2 } from "../_libs/lucide-react.mjs";
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
const API_BASE_URL = "http://localhost:8000/api";
function AdminDashboard({
  token,
  onLogout
}) {
  const [repairs, setRepairs] = reactExports.useState([]);
  const [stats, setStats] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [activeSection, setActiveSection] = reactExports.useState("repairs");
  const fetchRepairs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/repairs/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) setRepairs(data.repairs || []);
      else if (res.status === 401) onLogout();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/repairs/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) setStats(data.stats);
    } catch (e) {
      console.error(e);
    }
  };
  const exportRepairsCSV = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/repairs/export/csv`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `repairs_export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (e) {
      console.error(e);
    }
  };
  reactExports.useEffect(() => {
    fetchRepairs();
    fetchStats();
  }, []);
  const updateStatus = async (trackingId, newStatus) => {
    setRepairs((prev) => prev.map((r) => r.tracking_id === trackingId ? {
      ...r,
      status: newStatus
    } : r));
    try {
      await fetch(`${API_BASE_URL}/repairs/${trackingId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus,
          notify_customer: true
        })
      });
    } catch (e) {
      console.error(e);
      setRepairs((prev) => prev.map((r) => r.tracking_id === trackingId ? {
        ...r,
        status: r.status
      } : r));
    }
  };
  const deleteRepair = async (trackingId) => {
    if (!confirm("Are you sure you want to delete this repair? This action cannot be undone.")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/repairs/${trackingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setRepairs((prev) => prev.filter((r) => r.tracking_id !== trackingId));
      }
    } catch (e) {
      console.error(e);
    }
  };
  const statuses = ["received", "diagnosed", "repairing", "testing", "collection"];
  const filtered = repairs.filter((r) => {
    const matchSearch = r.tracking_id?.toLowerCase().includes(search.toLowerCase()) || r.customer_name?.toLowerCase().includes(search.toLowerCase()) || r.customer_phone?.includes(search);
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const customers = Array.from(new Map(repairs.map((r) => [r.customer_phone, {
    name: r.customer_name,
    phone: r.customer_phone,
    repairCount: repairs.filter((rep) => rep.customer_phone === r.customer_phone).length,
    lastRepair: repairs.filter((rep) => rep.customer_phone === r.customer_phone).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]?.created_at
  }])).values()).sort((a, b) => b.repairCount - a.repairCount);
  const totalRepairs = stats?.total_repairs || repairs.length;
  const completedRepairs = stats?.status_breakdown?.collection || repairs.filter((r) => r.status === "collection").length;
  const completionRate = totalRepairs > 0 ? Math.round(completedRepairs / totalRepairs * 100) : 0;
  const inProgressRepairs = stats?.status_breakdown ? Object.values(stats.status_breakdown).reduce((a, b) => a + b, 0) - completedRepairs : repairs.filter((r) => r.status !== "collection").length;
  const totalRevenue = stats?.total_revenue || 0;
  const activityLog = repairs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 15);
  const sidebarItems = [{
    id: "repairs",
    icon: Wrench,
    label: "Repairs"
  }, {
    id: "customers",
    icon: Users,
    label: "Customers"
  }, {
    id: "analytics",
    icon: TrendingUp,
    label: "Analytics"
  }, {
    id: "activity",
    icon: Activity,
    label: "Activity"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-[#F5F1ED] dark:bg-transparent section-frost dark:section-frost", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 z-0 dark:opacity-0", style: {
      backgroundColor: "#F5F1ED"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex min-h-screen bg-[#f8fafc]/95 dark:bg-transparent backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.aside, { initial: {
        x: -280
      }, animate: {
        x: 0
      }, className: "fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col border-r border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-6 bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-5 w-5 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold tracking-wide text-slate-900 dark:text-white", children: "Fixora Admin" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-1 px-3 py-4", children: sidebarItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveSection(item.id), className: `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${activeSection === item.id ? "bg-violet-100 dark:bg-violet-900/50 text-violet-900 dark:text-violet-100 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4" }),
          item.label,
          item.id === "repairs" && repairs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto rounded-full bg-violet-200 px-2 py-0.5 text-[10px] font-bold text-violet-900", children: repairs.length })
        ] }, item.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-slate-200 dark:border-slate-800 p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/profile", className: "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
            "My Account"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onLogout, className: "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-700 dark:hover:text-red-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            "Sign Out"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-[260px] flex-1 bg-slate-50 dark:bg-transparent min-h-screen", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-8 backdrop-blur-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-lg font-bold text-slate-900 dark:text-white", children: [
            activeSection === "repairs" && "Repair Management",
            activeSection === "customers" && "Customer Management",
            activeSection === "analytics" && "Analytics & Reports",
            activeSection === "activity" && "Activity Log"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            activeSection === "repairs" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: exportRepairsCSV, className: "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-2 h-4 w-4" }),
              "Export CSV"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: fetchRepairs, disabled: isLoading, className: "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}` }),
              "Refresh"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-bold text-white", children: "A" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 bg-slate-50 dark:bg-transparent", children: [
          activeSection === "repairs" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Repairs", value: totalRepairs, icon: Database, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "In Workshop", value: inProgressRepairs, icon: Wrench, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Completed", value: completedRepairs, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Revenue", value: `£${totalRevenue.toFixed(0)}`, icon: TrendingUp, gradient: "from-amber-500 to-orange-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:flex-row sm:items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by name, phone, or tracking ID…", value: search, onChange: (e) => setSearch(e.target.value), className: "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-violet-500 h-10" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-slate-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus-outline-none focus:ring-1 focus:ring-violet-500 h-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Statuses" }),
                  statuses.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s.charAt(0).toUpperCase() + s.slice(1) }, s))
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 w-24", children: "ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600", children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600", children: "Device" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 w-20", children: "Actions" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length > 0 ? filtered.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-slate-100 dark:border-slate-800/50 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-mono text-sm text-cyan-600 font-semibold", children: r.tracking_id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-slate-900 dark:text-white", children: r.customer_name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex items-center text-xs text-slate-500", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mr-1 h-3 w-3" }),
                      r.customer_phone
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-slate-700", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-2 h-4 w-4 text-slate-400" }),
                    r.device_model
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(r.status)}`, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }),
                      r.status === "collection" ? "Ready" : r.status.charAt(0).toUpperCase() + r.status.slice(1)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: statuses.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus(r.tracking_id, s), disabled: r.status === s, className: `rounded-md border px-2.5 py-1 text-[10px] font-semibold transition-all cursor-pointer ${r.status === s ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed" : "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100 hover:border-violet-400"}`, children: s === "collection" ? "Ready" : s.charAt(0).toUpperCase() + s.slice(1) }, s)) })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-xs text-slate-500", children: new Date(r.created_at).toLocaleDateString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteRepair(r.tracking_id), className: "text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-2 rounded-lg transition-colors", title: "Delete repair", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) })
                ] }, r.id)) : null })
              ] }) }),
              filtered.length === 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No repairs found" })
              ] }),
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600", children: "Loading repairs..." })
              ] })
            ] })
          ] }),
          activeSection === "customers" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600", children: "Loading customers..." })
          ] }) : customers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: customers.map((customer, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            opacity: 0,
            y: 12
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            delay: idx * 0.05
          }, className: "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 transition-all hover:shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-900 dark:text-white text-lg", children: customer.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-slate-600 flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mr-2 h-4 w-4 text-slate-400" }),
                customer.phone
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-slate-500", children: [
                "Last Repair:",
                " ",
                customer.lastRepair ? new Date(customer.lastRepair).toLocaleDateString() : "N/A"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white font-bold text-lg", children: customer.repairCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs font-semibold text-slate-600", children: "Total Repairs" })
            ] })
          ] }) }, customer.phone)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "No customers yet" })
          ] }) }),
          activeSection === "analytics" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, className: "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Total Repairs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-bold text-slate-900 dark:text-white", children: totalRepairs }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-500", children: "All-time" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.05
              }, className: "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Completed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-bold text-emerald-600", children: completedRepairs }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-500", children: "Ready for pickup" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.1
              }, className: "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "In Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-bold text-violet-600", children: inProgressRepairs }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-500", children: "Being worked on" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.15
              }, className: "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Completion Rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-3xl font-bold text-slate-900 dark:text-white", children: [
                  completionRate,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-500", children: "Success ratio" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.2
              }, className: "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Total Customers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-bold text-slate-900 dark:text-white", children: customers.length }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-500", children: "Unique customers" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.25
              }, className: "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Avg Repairs/Customer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-bold text-slate-900 dark:text-white", children: customers.length > 0 ? (totalRepairs / customers.length).toFixed(1) : 0 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-500", children: "Per customer" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.3
              }, className: "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Estimated Revenue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-3xl font-bold text-slate-900 dark:text-white", children: [
                  "£",
                  totalRepairs * 45
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-500", children: "@£45/repair" })
              ] })
            ] })
          ] }),
          activeSection === "activity" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600", children: "Loading activity..." })
          ] }) : activityLog.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: activityLog.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            x: -12
          }, animate: {
            opacity: 1,
            x: 0
          }, transition: {
            delay: idx * 0.03
          }, className: "flex items-start gap-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 hover:shadow-md transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${r.status === "collection" ? "bg-emerald-100" : r.status === "testing" ? "bg-amber-100" : "bg-violet-100"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: `h-5 w-5 ${r.status === "collection" ? "text-emerald-600" : r.status === "testing" ? "text-amber-600" : "text-violet-600"}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-900 dark:text-white", children: r.customer_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-600 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: r.tracking_id }),
                  " • ",
                  r.device_model
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "inline h-3 w-3 mr-1" }),
                  r.customer_phone
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(r.status)}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }),
                  r.status === "collection" ? "Ready" : r.status.charAt(0).toUpperCase() + r.status.slice(1)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 mt-2", children: [
                  new Date(r.created_at).toLocaleDateString(),
                  " ",
                  new Date(r.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                ] })
              ] })
            ] }) })
          ] }, r.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "No recent activity" })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
function StatCard({
  title,
  value,
  icon: Icon,
  gradient
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0,
    y: 12
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-bold text-slate-900 dark:text-white", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} shadow-md`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-white" }) })
  ] }) });
}
function getStatusStyle(status) {
  switch (status) {
    case "received":
      return "bg-slate-100 text-slate-700 border border-slate-300";
    case "diagnosed":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    case "repairing":
      return "bg-violet-100 text-violet-700 border border-violet-300";
    case "testing":
      return "bg-amber-100 text-amber-700 border border-amber-300";
    case "collection":
      return "bg-emerald-100 text-emerald-700 border border-emerald-300";
    default:
      return "bg-slate-100 text-slate-700 border border-slate-300";
  }
}
function AdminPage() {
  const [token, setToken] = reactExports.useState(null);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loginError, setLoginError] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.user.role === "admin" || data.user.role === "technician") {
          setToken(data.token);
          localStorage.setItem("admin_token", data.token);
          localStorage.setItem("admin_user", JSON.stringify(data.user));
          window.dispatchEvent(new CustomEvent("auth-change", {
            detail: {
              type: "login",
              role: data.user.role
            }
          }));
        } else {
          setLoginError("Unauthorized — admin or technician role required.");
        }
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch {
      setLoginError("Could not reach backend.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    window.dispatchEvent(new CustomEvent("auth-change", {
      detail: {
        type: "logout",
        role: "admin"
      }
    }));
  };
  if (token) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, { token, onLogout: handleLogout });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen items-center justify-center bg-[#f8fafc] dark:bg-slate-950 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/10 blur-[128px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-600/10 blur-[128px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 20,
      scale: 0.95
    }, animate: {
      opacity: 1,
      y: 0,
      scale: 1
    }, transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }, className: "relative w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-7 w-7 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: "Admin Access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-slate-500", children: "Sign in to manage repairs" })
      ] }),
      loginError && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: -8
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0" }),
        loginError
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "admin@fixora.com", className: "h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-violet-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", className: "h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-violet-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: isLoading, className: "h-12 w-full bg-gradient-to-r from-violet-600 to-cyan-600 text-sm font-semibold uppercase tracking-widest text-white shadow-md transition-all hover:from-violet-700 hover:to-cyan-700 hover:shadow-lg", children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin" }) : null,
          "Sign In"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminPage as component
};
