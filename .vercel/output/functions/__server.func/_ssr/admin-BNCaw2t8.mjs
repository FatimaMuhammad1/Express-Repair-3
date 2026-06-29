import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as Button, C as Card } from "./router-Dwa750EE.mjs";
import { I as Input } from "./input-WcTK30Lj.mjs";
import { L as Label } from "./label-piS77Q_7.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getStoredToken, b as buildUrl, A as API_CONFIG, a as getAuthHeaders, B as Badge } from "./api-BGwTvpdW.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CJXNBrao.mjs";
import { T as Textarea } from "./textarea-D2lrPbio.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { f as LayoutDashboard, u as CircleAlert, a2 as RefreshCw, Q as Calendar, U as User, W as Wrench, a3 as Activity, a4 as ShoppingCart, a5 as FileText, a6 as DollarSign, v as Package, a7 as Users, e as Truck, J as Database, a8 as TrendingUp, j as MessageCircle, a9 as History, b as ShieldCheck, K as ChevronDown, o as ChevronRight, t as LogOut, w as CircleCheck, c as Search, aa as Funnel, ab as Trash2, P as Phone, s as Circle, C as Clock, ac as Plus, a1 as Upload, N as Send, z as Mail, ad as CircleX, ae as Building2, X, d as ArrowRight, af as Bell, r as Check, ag as MessageSquare, ah as ArrowUpRight, ai as ChevronLeft, aj as Download, ak as Wallet, al as TrendingDown, $ as CreditCard, am as CircleCheckBig, S as Smartphone, an as Shield } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Line, B as BarChart, b as Bar, P as PieChart, c as Pie, d as Cell } from "../_libs/recharts.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function StatCard({ title, value, icon: Icon, gradient }) {
  let colorClass = "text-blue-500 bg-blue-500/10";
  if (gradient.includes("emerald") || gradient.includes("green")) colorClass = "text-emerald-500 bg-emerald-500/10";
  else if (gradient.includes("amber") || gradient.includes("orange")) colorClass = "text-amber-500 bg-amber-500/10";
  else if (gradient.includes("rose") || gradient.includes("red")) colorClass = "text-rose-500 bg-rose-500/10";
  else if (gradient.includes("violet") || gradient.includes("purple")) colorClass = "text-violet-500 bg-violet-500/10";
  else if (gradient.includes("slate") || gradient.includes("gray")) colorClass = "text-slate-400 bg-slate-500/10";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "rounded-xl bg-[#11131E] p-5 transition-all flex items-center gap-4",
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-xl ${colorClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5", strokeWidth: 2.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-400 mb-0.5", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-white tracking-tight", children: value })
        ] })
      ]
    }
  );
}
function BackupRestore() {
  const handleBackup = () => {
    const data = {
      repairs: JSON.parse(localStorage.getItem("repairs") || "[]"),
      inventory: JSON.parse(localStorage.getItem("inventory") || "[]"),
      staff: JSON.parse(localStorage.getItem("staff") || "[]"),
      settings: JSON.parse(localStorage.getItem("businessSettings") || "{}")
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Backup created successfully");
  };
  const handleRestore = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result);
        if (data.repairs) localStorage.setItem("repairs", JSON.stringify(data.repairs));
        if (data.inventory) localStorage.setItem("inventory", JSON.stringify(data.inventory));
        if (data.staff) localStorage.setItem("staff", JSON.stringify(data.staff));
        if (data.settings) localStorage.setItem("businessSettings", JSON.stringify(data.settings));
        toast.success("Data restored successfully");
        window.location.reload();
      } catch (error) {
        toast.error("Failed to restore data");
      }
    };
    reader.readAsText(file);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleBackup, variant: "outline", className: "border-[#1F2235]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
      "Backup Data"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "file",
          accept: ".json",
          onChange: handleRestore,
          className: "hidden",
          id: "restore-input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => document.getElementById("restore-input")?.click(),
          variant: "outline",
          className: "border-[#1F2235]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mr-2 h-4 w-4" }),
            "Restore Data"
          ]
        }
      )
    ] })
  ] });
}
function FinanceSection({ token }) {
  const [loading, setLoading] = reactExports.useState(true);
  const [timePeriod, setTimePeriod] = reactExports.useState("monthly");
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [stats, setStats] = reactExports.useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    outstandingPayments: 0,
    netProfit: 0,
    totalExpenses: 0,
    paidInvoices: 0,
    pendingInvoices: 0
  });
  const [transactions, setTransactions] = reactExports.useState([]);
  const [invoices, setInvoices] = reactExports.useState([]);
  const [expenses, setExpenses] = reactExports.useState([]);
  reactExports.useEffect(() => {
    fetchFinanceData();
  }, [timePeriod]);
  reactExports.useEffect(() => {
    const handleFinanceRefresh = () => {
      fetchFinanceData();
    };
    window.addEventListener("finance-refresh", handleFinanceRefresh);
    return () => window.removeEventListener("finance-refresh", handleFinanceRefresh);
  }, [timePeriod]);
  const fetchFinanceData = async () => {
    setLoading(true);
    try {
      const [statsRes, transRes, invRes, expRes] = await Promise.all([
        fetch(buildUrl(`/finance/stats?period=${timePeriod}`), { headers: getAuthHeaders(token) }),
        fetch(buildUrl("/finance/transactions"), { headers: getAuthHeaders(token) }),
        fetch(buildUrl("/finance/invoices"), { headers: getAuthHeaders(token) }),
        fetch(buildUrl("/finance/expenses"), { headers: getAuthHeaders(token) })
      ]);
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats || stats);
      }
      if (transRes.ok) {
        const data = await transRes.json();
        setTransactions(data.transactions || []);
      }
      if (invRes.ok) {
        const data = await invRes.json();
        setInvoices(data.invoices || []);
      }
      if (expRes.ok) {
        const data = await expRes.json();
        setExpenses(data.expenses || []);
      }
    } catch (error) {
      console.error("Failed to fetch finance data:", error);
    } finally {
      setLoading(false);
    }
  };
  const filteredTransactions = transactions.filter((t) => {
    const matchSearch = t.description?.toLowerCase().includes(searchTerm.toLowerCase()) || t.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || t.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const filteredInvoices = invoices.filter((i) => {
    const matchSearch = i.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || i.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || i.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const handleExportReport = async () => {
    try {
      const res = await fetch(buildUrl(`/finance/export?period=${timePeriod}`), {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `financial_report_${timePeriod}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Report exported successfully");
      }
    } catch (error) {
      toast.error("Failed to export report");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Financial Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "Track revenue, expenses, and payments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: timePeriod,
            onChange: (e) => setTimePeriod(e.target.value),
            className: "rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "daily", children: "Today" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "weekly", children: "This Week" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "monthly", children: "This Month" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "quarterly", children: "This Quarter" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "yearly", children: "This Year" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Time" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleExportReport, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
          "Export Report"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Total Revenue",
          value: `£${stats.totalRevenue.toLocaleString()}`,
          icon: DollarSign,
          gradient: "from-emerald-500 to-green-500"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Monthly Revenue",
          value: `£${stats.monthlyRevenue.toLocaleString()}`,
          icon: TrendingUp,
          gradient: "from-blue-500 to-cyan-500"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Outstanding Payments",
          value: `£${stats.outstandingPayments.toLocaleString()}`,
          icon: Clock,
          gradient: "from-amber-500 to-orange-500"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Net Profit",
          value: `£${stats.netProfit.toLocaleString()}`,
          icon: Wallet,
          gradient: "from-violet-500 to-purple-500"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-400", children: "Total Expenses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-2xl font-bold text-white", children: [
                "£",
                stats.totalExpenses.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-rose-100 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-6 w-6 text-rose-600" }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-400", children: "Paid Invoices" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold text-white", children: stats.paidInvoices })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-emerald-100 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6 text-emerald-600" }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-400", children: "Pending Invoices" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold text-white", children: stats.pendingInvoices })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-amber-100 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-6 w-6 text-amber-600" }) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search transactions or invoices...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "border-[#1F2235] bg-[#1A1D27] pl-10"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-slate-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: statusFilter,
            onChange: (e) => setStatusFilter(e.target.value),
            className: "rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "Completed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "failed", children: "Failed" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-slate-200 border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white", children: "Recent Transactions" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-200 border-[#1F2235] bg-[#1A1D27]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredTransactions.length > 0 ? filteredTransactions.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.tr,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: idx * 0.05 },
            className: "border-b border-[#1F2235] hover:bg-white/[0.02]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400", children: new Date(t.created_at).toLocaleDateString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-medium text-white", children: t.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400", children: t.customer_name || "N/A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 font-semibold text-white", children: [
                "£",
                t.amount.toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: t.status === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : t.status === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
                  children: t.status
                }
              ) })
            ]
          },
          t.id
        )) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 5, className: "px-6 py-16 text-center text-slate-400 dark:text-slate-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No transactions found" })
        ] }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-slate-200 border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white", children: "Invoices" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-200 border-[#1F2235] bg-[#1A1D27]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Invoice #" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Due Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredInvoices.length > 0 ? filteredInvoices.map((inv, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.tr,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: idx * 0.05 },
            className: "border-b border-[#1F2235] hover:bg-white/[0.02]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-mono text-sm font-semibold text-cyan-600 dark:text-cyan-400", children: inv.invoice_number }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400", children: inv.customer_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 font-semibold text-white", children: [
                "£",
                inv.amount.toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400", children: new Date(inv.due_date).toLocaleDateString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: inv.status === "paid" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : inv.status === "partial" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
                  children: inv.status
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }) })
              ] }) })
            ]
          },
          inv.id
        )) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 6, className: "px-6 py-16 text-center text-slate-400 dark:text-slate-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No invoices found" })
        ] }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-slate-200 border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white", children: "Expenses" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-200 border-[#1F2235] bg-[#1A1D27]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: expenses.length > 0 ? expenses.map((exp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.tr,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: idx * 0.05 },
            className: "border-b border-[#1F2235] hover:bg-white/[0.02]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400", children: new Date(exp.created_at).toLocaleDateString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "dark:border-slate-700 dark:text-slate-300", children: exp.category }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-white", children: exp.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 font-semibold text-rose-600 dark:text-rose-400", children: [
                "-£",
                exp.amount.toFixed(2)
              ] })
            ]
          },
          exp.id
        )) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 4, className: "px-6 py-16 text-center text-slate-400 dark:text-slate-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No expenses recorded" })
        ] }) }) })
      ] }) })
    ] })
  ] });
}
function NotificationCenter({ token }) {
  const [notifications, setNotifications] = reactExports.useState([]);
  const [unreadCount, setUnreadCount] = reactExports.useState(0);
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 3e4);
    return () => clearInterval(interval);
  }, []);
  const fetchNotifications = async () => {
    try {
      const res = await fetch(buildUrl("/notifications"), {
        headers: getAuthHeaders(token)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotifications(data.notifications || []);
        setUnreadCount((data.notifications || []).filter((n) => !n.read).length);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };
  const markAsRead = async (notificationId) => {
    try {
      await fetch(buildUrl(`/notifications/${notificationId}/read`), {
        method: "PUT",
        headers: getAuthHeaders(token)
      });
      setNotifications(
        (prev) => prev.map((n) => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };
  const markAllAsRead = async () => {
    try {
      await fetch(buildUrl("/notifications/read-all"), {
        method: "PUT",
        headers: getAuthHeaders(token)
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };
  const deleteNotification = async (notificationId) => {
    try {
      await fetch(buildUrl(`/notifications/${notificationId}`), {
        method: "DELETE",
        headers: getAuthHeaders(token)
      });
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      const deleted = notifications.find((n) => n.id === notificationId);
      if (deleted && !deleted.read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };
  const clearAllNotifications = async () => {
    try {
      await fetch(buildUrl("/notifications/clear"), {
        method: "DELETE",
        headers: getAuthHeaders(token)
      });
      setNotifications([]);
      setUnreadCount(0);
      toast.success("All notifications cleared");
    } catch (error) {
      toast.error("Failed to clear notifications");
    }
  };
  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-blue-500" });
      case "low_stock":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-amber-500" });
      case "repair_completed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5 text-emerald-500" });
      case "message":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5 text-violet-500" });
      case "error":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-rose-500" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5 text-slate-500" });
    }
  };
  const getNotificationColor = (type) => {
    switch (type) {
      case "booking":
        return "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800";
      case "low_stock":
        return "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800";
      case "repair_completed":
        return "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800";
      case "message":
        return "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800";
      case "error":
        return "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800";
      default:
        return "bg-[#1A1D27] border-[#1F2235]";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: () => setIsOpen(!isOpen),
        className: "relative",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }),
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500", children: unreadCount > 9 ? "9+" : unreadCount })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setIsOpen(false),
          className: "fixed inset-0 z-40 bg-black/20"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -10, scale: 0.95 },
          className: "absolute right-0 top-12 z-50 w-96 max-h-[600px] overflow-hidden rounded-lg border border-[#1F2235] bg-transparent shadow-xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-[#1F2235] p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white", children: "Notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: markAllAsRead, children: "Mark all read" }),
                notifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: clearAllNotifications, children: "Clear all" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto max-h-[500px]", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-violet-600" }) }) : notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-12 w-12 text-slate-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-slate-500", children: "No notifications yet" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-slate-200 dark:divide-slate-700", children: notifications.map((notification, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: idx * 0.05 },
                className: `p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${!notification.read ? "bg-slate-50/50 bg-[#1A1D27]" : ""}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-shrink-0 rounded-full p-2 ${getNotificationColor(notification.type)}`, children: getNotificationIcon(notification.type) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm font-medium ${!notification.read ? "text-white" : "text-slate-400"}`, children: notification.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-slate-500 line-clamp-2", children: notification.message }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-slate-400", children: [
                        new Date(notification.created_at).toLocaleDateString(),
                        " ",
                        new Date(notification.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      !notification.read && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          onClick: () => markAsRead(notification.id),
                          className: "h-8 w-8 p-0",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          onClick: () => deleteNotification(notification.id),
                          className: "h-8 w-8 p-0 text-rose-500 hover:text-rose-600",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                        }
                      )
                    ] })
                  ] }) })
                ] })
              },
              notification.id
            )) }) }),
            notifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-[#1F2235] p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "w-full", onClick: () => setIsOpen(false), children: "Close" }) })
          ]
        }
      )
    ] }) })
  ] });
}
function BranchSelector({ onBranchChange, token }) {
  const [branches, setBranches] = reactExports.useState([]);
  const [selectedBranch, setSelectedBranch] = reactExports.useState("all");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchBranches();
    const savedBranch = localStorage.getItem("selected_branch");
    if (savedBranch) {
      setSelectedBranch(savedBranch);
    }
  }, []);
  const fetchBranches = async () => {
    try {
      const res = await fetch(buildUrl("/branches"), {
        headers: getAuthHeaders(token)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBranches(data.branches || []);
      }
    } catch (error) {
      console.error("Failed to fetch branches:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleBranchChange = (branchId) => {
    setSelectedBranch(branchId);
    localStorage.setItem("selected_branch", branchId);
    onBranchChange?.(branchId);
    window.dispatchEvent(new CustomEvent("branch-change", { detail: { branchId } }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Branch:" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedBranch, onValueChange: handleBranchChange, disabled: loading, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Branches" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Branches" }),
        branches.map((branch) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: branch.id, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: branch.name }),
          !branch.is_active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400", children: "(Inactive)" })
        ] }) }, branch.id))
      ] })
    ] })
  ] });
}
function GlobalSearch({ token }) {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  reactExports.useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);
  const performSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const res = await fetch(buildUrl(`/search?q=${encodeURIComponent(searchQuery)}`), {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResults(data.results || []);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const getResultIcon = (type) => {
    switch (type) {
      case "repair":
        return Wrench;
      case "customer":
        return User;
      case "product":
        return Package;
      case "staff":
        return Users;
      case "booking":
        return Calendar;
      default:
        return Search;
    }
  };
  const getResultColor = (type) => {
    switch (type) {
      case "repair":
        return "bg-violet-100 text-violet-700";
      case "customer":
        return "bg-blue-100 text-blue-700";
      case "product":
        return "bg-emerald-100 text-emerald-700";
      case "staff":
        return "bg-amber-100 text-amber-700";
      case "booking":
        return "bg-cyan-100 text-cyan-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };
  const handleResultClick = (result) => {
    navigate({ to: result.url });
    setIsOpen(false);
    setQuery("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        onClick: () => setIsOpen(true),
        className: "relative w-64 justify-start text-slate-500",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4" }),
          "Search...",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("kbd", { className: "ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⌘" }),
            "K"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setIsOpen(false),
          className: "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -10, scale: 0.95 },
          className: "fixed left-1/2 top-[20%] z-50 w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-xl border border-[#1F2235] bg-transparent shadow-2xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-b border-[#1F2235] p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-3 h-5 w-5 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  ref: inputRef,
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  placeholder: "Search repairs, customers, inventory, staff, bookings...",
                  className: "flex-1 border-none bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0",
                  autoFocus: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => {
                    setIsOpen(false);
                    setQuery("");
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[500px] overflow-y-auto p-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-violet-600" }) }) : query.length < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mx-auto h-12 w-12 text-slate-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-slate-500", children: "Type at least 2 characters to search" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap justify-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "cursor-pointer hover:bg-slate-100", children: "Repairs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "cursor-pointer hover:bg-slate-100", children: "Customers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "cursor-pointer hover:bg-slate-100", children: "Inventory" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "cursor-pointer hover:bg-slate-100", children: "Staff" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "cursor-pointer hover:bg-slate-100", children: "Bookings" })
              ] })
            ] }) : results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mx-auto h-12 w-12 text-slate-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-slate-500", children: [
                'No results found for "',
                query,
                '"'
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: results.map((result, idx) => {
              const Icon = getResultIcon(result.type);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  initial: { opacity: 0, x: -20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: idx * 0.05 },
                  onClick: () => handleResultClick(result),
                  className: "flex w-full items-center gap-3 rounded-lg p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-full p-2 ${getResultColor(result.type)}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-white", children: result.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 truncate", children: result.subtitle })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-slate-400" })
                  ]
                },
                result.id
              );
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-[#1F2235] p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-slate-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "↑" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "↓" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "to navigate" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "↵" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "to select" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "esc" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "to close" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                results.length,
                " results"
              ] })
            ] }) })
          ]
        }
      )
    ] }) })
  ] });
}
function AuditLogs({ token }) {
  const [logs, setLogs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [actionFilter, setActionFilter] = reactExports.useState("all");
  const [entityFilter, setEntityFilter] = reactExports.useState("all");
  const [userFilter, setUserFilter] = reactExports.useState("all");
  const [dateRange, setDateRange] = reactExports.useState("7");
  reactExports.useEffect(() => {
    fetchAuditLogs();
  }, [dateRange]);
  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(buildUrl(`/audit-logs?days=${dateRange}`), {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLogs(data.logs || []);
      }
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
    } finally {
      setLoading(false);
    }
  };
  const filteredLogs = logs.filter((log) => {
    const matchSearch = log.user_name?.toLowerCase().includes(search.toLowerCase()) || log.action?.toLowerCase().includes(search.toLowerCase()) || log.entity?.toLowerCase().includes(search.toLowerCase()) || log.entity_id?.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === "all" || log.action === actionFilter;
    const matchEntity = entityFilter === "all" || log.entity === entityFilter;
    const matchUser = userFilter === "all" || log.user_id === userFilter;
    return matchSearch && matchAction && matchEntity && matchUser;
  });
  const getActionIcon = (action) => {
    switch (action) {
      case "login":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-600" });
      case "logout":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-slate-400" });
      case "create":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-600" });
      case "update":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4 text-blue-600" });
      case "delete":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-rose-600" });
      case "status_change":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-violet-600" });
      case "inventory_change":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-amber-600" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4 text-slate-400" });
    }
  };
  const getActionColor = (action) => {
    switch (action) {
      case "login":
        return "bg-emerald-100 text-emerald-700";
      case "logout":
        return "bg-slate-100 text-slate-700";
      case "create":
        return "bg-emerald-100 text-emerald-700";
      case "update":
        return "bg-blue-100 text-blue-700";
      case "delete":
        return "bg-rose-100 text-rose-700";
      case "status_change":
        return "bg-violet-100 text-violet-700";
      case "inventory_change":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };
  const getEntityIcon = (entity) => {
    switch (entity) {
      case "repair":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4" });
      case "customer":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" });
      case "product":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" });
      case "booking":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" });
      case "staff":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" });
      case "invoice":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4" });
    }
  };
  const handleExportLogs = async () => {
    try {
      const res = await fetch(buildUrl(`/audit-logs/export?days=${dateRange}`), {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audit_logs_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Audit logs exported successfully");
      }
    } catch (error) {
      toast.error("Failed to export audit logs");
    }
  };
  const handleClearLogs = async () => {
    if (!confirm("Are you sure you want to clear audit logs? This action cannot be undone.")) return;
    try {
      const res = await fetch(buildUrl("/audit-logs/clear"), {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (res.ok) {
        toast.success("Audit logs cleared successfully");
        fetchAuditLogs();
      } else {
        toast.error("Failed to clear audit logs");
      }
    } catch (error) {
      toast.error("Failed to clear audit logs");
    }
  };
  const uniqueUsers = Array.from(new Set(logs.map((l) => l.user_id))).map((id) => ({
    id,
    name: logs.find((l) => l.user_id === id)?.user_name || "Unknown"
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Audit Logs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "Track all system actions and changes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleExportLogs, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
          "Export"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleClearLogs, className: "text-rose-600 hover:text-rose-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
          "Clear Logs"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-400", children: "Total Logs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold text-white", children: logs.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-blue-100 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-6 w-6 text-blue-600" }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-400", children: "Today" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold text-white", children: logs.filter((l) => new Date(l.created_at).toDateString() === (/* @__PURE__ */ new Date()).toDateString()).length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-emerald-100 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-6 w-6 text-emerald-600" }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-400", children: "Unique Users" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold text-white", children: uniqueUsers.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-violet-100 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-6 w-6 text-violet-600" }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.3 },
          className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-400", children: "Actions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold text-white", children: new Set(logs.map((l) => l.action)).size })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-amber-100 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-6 w-6 text-amber-600" }) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search logs...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "border-[#1F2235] bg-[#1A1D27] pl-10"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-slate-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: dateRange,
            onChange: (e) => setDateRange(e.target.value),
            className: "rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "Last 24 hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7", children: "Last 7 days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30", children: "Last 30 days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "90", children: "Last 90 days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "365", children: "Last year" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: actionFilter,
            onChange: (e) => setActionFilter(e.target.value),
            className: "rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Actions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "login", children: "Login" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "logout", children: "Logout" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "create", children: "Create" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "update", children: "Update" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "delete", children: "Delete" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "status_change", children: "Status Change" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inventory_change", children: "Inventory Change" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: entityFilter,
            onChange: (e) => setEntityFilter(e.target.value),
            className: "rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Entities" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "repair", children: "Repairs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "customer", children: "Customers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "product", children: "Products" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "booking", children: "Bookings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "staff", children: "Staff" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "invoice", children: "Invoices" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: userFilter,
            onChange: (e) => setUserFilter(e.target.value),
            className: "rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Users" }),
              uniqueUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: user.id, children: user.name }, user.id))
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden border-[#1F2235] bg-[#11131E]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#1A1D27]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Timestamp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Action" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Entity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Entity ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "IP Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Details" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredLogs.length > 0 ? filteredLogs.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.tr,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: idx * 0.02 },
          className: "border-b border-[#1F2235] hover:bg-white/[0.02]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 text-slate-400", children: [
              new Date(log.created_at).toLocaleDateString(),
              " ",
              new Date(log.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-slate-100 p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3 text-slate-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: log.user_name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: getActionColor(log.action), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              getActionIcon(log.action),
              log.action
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-400", children: [
              getEntityIcon(log.entity),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: log.entity })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-mono text-xs text-slate-400", children: log.entity_id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-xs text-slate-400", children: log.ip_address }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: (log.previous_value || log.new_value) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs", children: [
              log.previous_value && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-rose-600 dark:text-rose-400", children: "Before:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 truncate", children: JSON.stringify(log.previous_value) })
              ] }),
              log.new_value && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-emerald-600 dark:text-emerald-400", children: "After:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 truncate", children: JSON.stringify(log.new_value) })
              ] })
            ] }) })
          ]
        },
        log.id
      )) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 7, className: "px-6 py-16 text-center text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No audit logs found" })
      ] }) }) })
    ] }) }) })
  ] });
}
function WalkInIntake({ token, onSuccess }) {
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    device_model: "",
    device_type: "smartphone",
    issue_description: "",
    estimated_cost: "",
    notification_preference: "email",
    create_invoice: false,
    invoice_amount: "",
    tax_rate: "0",
    deposit_amount: "",
    payment_method: "",
    due_date: ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleCheckboxChange = (checked) => {
    const isChecked = checked === true;
    setFormData({ ...formData, create_invoice: isChecked });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const apiUrl = "http://localhost:8000/api";
      const token2 = localStorage.getItem("admin_token");
      const payload = {
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone || null,
        customer_email: formData.customer_email || null,
        device_model: formData.device_model,
        device_type: formData.device_type,
        issue_description: formData.issue_description,
        estimated_cost: formData.estimated_cost ? parseFloat(formData.estimated_cost) : 0,
        notification_preference: formData.notification_preference,
        create_invoice: formData.create_invoice,
        invoice_amount: formData.create_invoice && formData.invoice_amount ? parseFloat(formData.invoice_amount) : null,
        tax_rate: formData.create_invoice && formData.tax_rate ? parseFloat(formData.tax_rate) / 100 : 0,
        deposit_amount: formData.create_invoice && formData.deposit_amount ? parseFloat(formData.deposit_amount) : null,
        payment_method: formData.create_invoice && formData.deposit_amount ? formData.payment_method : null,
        due_date: formData.create_invoice && formData.due_date ? formData.due_date : null
      };
      const res = await fetch(`${apiUrl}/walkin/intake`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token2}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setResult(data);
        if (onSuccess) onSuccess(data);
        window.dispatchEvent(new CustomEvent("finance-refresh", { detail: { type: "invoice-created" } }));
        setFormData({
          customer_name: "",
          customer_phone: "",
          customer_email: "",
          device_model: "",
          device_type: "smartphone",
          issue_description: "",
          estimated_cost: "",
          notification_preference: "email",
          create_invoice: false,
          invoice_amount: "",
          tax_rate: "0",
          deposit_amount: "",
          payment_method: "",
          due_date: ""
        });
      } else {
        console.error("Walk-in intake error:", data);
        setError(data.message || data.detail || "Failed to create walk-in intake");
      }
    } catch (err) {
      setError("Could not reach backend");
    } finally {
      setIsLoading(false);
    }
  };
  if (success && result) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#11131E] rounded-lg border border-[#1F2235] p-8 text-center space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-green-600 dark:text-green-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-white", children: "Walk-in Intake Successful!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 mt-2", children: result.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] rounded-lg p-4 text-left space-y-2 border border-[#1F2235]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Tracking ID:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-white", children: result.tracking_id })
        ] }),
        result.invoice_number && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Invoice Number:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-white", children: result.invoice_number })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setSuccess(false), variant: "outline", className: "border-[#1F2235] text-white hover:bg-slate-50 dark:hover:bg-slate-800", children: "Create Another Walk-in" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#11131E] rounded-lg border border-[#1F2235] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-white mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
          "Customer Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customer_name", className: "text-slate-300", children: "Customer Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "customer_name",
                name: "customer_name",
                value: formData.customer_name,
                onChange: handleChange,
                required: true,
                placeholder: "John Doe",
                className: "border-[#1F2235] bg-[#1A1D27] text-white"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customer_phone", className: "text-slate-300", children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "customer_phone",
                  name: "customer_phone",
                  value: formData.customer_phone,
                  onChange: handleChange,
                  placeholder: "+1234567890",
                  className: "border-[#1F2235] bg-[#1A1D27] text-white"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customer_email", className: "text-slate-300", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "customer_email",
                  name: "customer_email",
                  type: "email",
                  value: formData.customer_email,
                  onChange: handleChange,
                  placeholder: "customer@example.com",
                  className: "border-[#1F2235] bg-[#1A1D27] text-white"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#11131E] rounded-lg border border-[#1F2235] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-white mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4" }),
          "Device Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "device_type", className: "text-slate-300", children: "Device Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.device_type,
                  onValueChange: (value) => handleSelectChange("device_type", value),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "border-[#1F2235] bg-[#1A1D27] text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "smartphone", children: "Smartphone" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "laptop", children: "Laptop" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tablet", children: "Tablet" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "console", children: "Console" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "device_model", className: "text-slate-300", children: "Device Model *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "device_model",
                  name: "device_model",
                  value: formData.device_model,
                  onChange: handleChange,
                  required: true,
                  placeholder: "iPhone 14 Pro",
                  className: "border-[#1F2235] bg-[#1A1D27] text-white"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "issue_description", className: "text-slate-300", children: "Issue Description *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "issue_description",
                name: "issue_description",
                value: formData.issue_description,
                onChange: handleChange,
                required: true,
                rows: 3,
                placeholder: "Describe the issue with the device",
                className: "border-[#1F2235] bg-[#1A1D27] text-white"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "estimated_cost", className: "text-slate-300", children: "Estimated Cost ($)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "estimated_cost",
                  name: "estimated_cost",
                  type: "number",
                  step: "0.01",
                  value: formData.estimated_cost,
                  onChange: handleChange,
                  placeholder: "0.00",
                  className: "border-[#1F2235] bg-[#1A1D27] text-white"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notification_preference", className: "text-slate-300", children: "Notification Preference" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.notification_preference,
                  onValueChange: (value) => handleSelectChange("notification_preference", value),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "border-[#1F2235] bg-[#1A1D27] text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "email", children: "Email" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "whatsapp", children: "WhatsApp" })
                    ] })
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#11131E] rounded-lg border border-[#1F2235] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "create_invoice",
              checked: formData.create_invoice,
              onChange: (e) => handleCheckboxChange(e.target.checked),
              className: "h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "create_invoice", className: "font-semibold text-white flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
            "Create Invoice"
          ] })
        ] }),
        formData.create_invoice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pl-6 border-l-2 border-[#1F2235]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invoice_amount", className: "text-slate-300", children: "Invoice Amount ($)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "invoice_amount",
                  name: "invoice_amount",
                  type: "number",
                  step: "0.01",
                  value: formData.invoice_amount,
                  onChange: handleChange,
                  placeholder: "0.00",
                  className: "border-[#1F2235] bg-[#1A1D27] text-white"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tax_rate", className: "text-slate-300", children: "Tax Rate (%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "tax_rate",
                  name: "tax_rate",
                  type: "number",
                  step: "0.1",
                  value: formData.tax_rate,
                  onChange: handleChange,
                  placeholder: "0",
                  className: "border-[#1F2235] bg-[#1A1D27] text-white"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "deposit_amount", className: "text-slate-300", children: "Deposit Amount ($)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "deposit_amount",
                  name: "deposit_amount",
                  type: "number",
                  step: "0.01",
                  value: formData.deposit_amount,
                  onChange: handleChange,
                  placeholder: "0.00",
                  className: "border-[#1F2235] bg-[#1A1D27] text-white"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "payment_method", className: "text-slate-300", children: "Payment Method" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.payment_method,
                  onValueChange: (value) => handleSelectChange("payment_method", value),
                  disabled: !formData.deposit_amount,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "border-[#1F2235] bg-[#1A1D27] text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select method" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cash", children: "Cash" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "card", children: "Card" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bank_transfer", children: "Bank Transfer" })
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "due_date", className: "text-slate-300", children: "Due Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "due_date",
                name: "due_date",
                type: "date",
                value: formData.due_date,
                onChange: handleChange,
                className: "border-[#1F2235] bg-[#1A1D27] text-white"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? "Processing..." : "Submit Walk-in Intake" })
    ] })
  ] });
}
function MainDashboard() {
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [businessData, setBusinessData] = reactExports.useState([]);
  const [salesChannelData, setSalesChannelData] = reactExports.useState([]);
  const [repairStatusData, setRepairStatusData] = reactExports.useState([]);
  const [recentActivities, setRecentActivities] = reactExports.useState([]);
  const [topSellingItems, setTopSellingItems] = reactExports.useState([]);
  const [lowStockAlerts, setLowStockAlerts] = reactExports.useState([]);
  const [autoRefresh, setAutoRefresh] = reactExports.useState(true);
  const [refreshInterval, setRefreshInterval] = reactExports.useState(3e4);
  const [lastUpdated, setLastUpdated] = reactExports.useState(null);
  const [selectedBranch, setSelectedBranch] = reactExports.useState("all");
  const [branches, setBranches] = reactExports.useState([]);
  const [timePeriod, setTimePeriod] = reactExports.useState("all");
  const [stats, setStats] = reactExports.useState({
    totalRevenue: 0,
    todaySales: 0,
    repairsInProgress: 0,
    lowStockCount: 0,
    totalProfit: 0,
    totalCustomers: 0,
    totalSalesOrders: 0,
    totalPurchases: 0,
    totalInventoryValue: 0,
    outstandingReceivables: 0,
    outstandingPayables: 0
  });
  const fetchDashboardData = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const financeStatsRes = await fetch(buildUrl("/finance/stats"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const financeStatsData = await financeStatsRes.json();
      const branchesRes = await fetch(buildUrl("/branches"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const branchesData = await branchesRes.json();
      if (branchesData.success && branchesData.branches) {
        setBranches(branchesData.branches);
      }
      const repairsRes = await fetch(buildUrl("/repairs/stats"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const repairsData = await repairsRes.json();
      const productsRes = await fetch(buildUrl("/products"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const productsData = await productsRes.json();
      const transactionsRes = await fetch(buildUrl("/finance/transactions"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const transactionsData = await transactionsRes.json();
      const onlineSalesRes = await fetch(buildUrl("/finance/online-sales"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const onlineSalesData = await onlineSalesRes.json();
      const inhouseSalesRes = await fetch(buildUrl("/finance/inhouse-sales"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const inhouseSalesData = await inhouseSalesRes.json();
      const customersRes = await fetch(buildUrl("/customers"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const customersData = await customersRes.json();
      const activitiesRes = await fetch(buildUrl("/communications/history"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const activitiesData = await activitiesRes.json();
      if (financeStatsData.success && financeStatsData.stats) {
        setStats((prev) => ({
          ...prev,
          totalRevenue: financeStatsData.stats.totalRevenue || 0,
          totalProfit: financeStatsData.stats.netProfit || 0,
          totalExpenses: financeStatsData.stats.totalExpenses || 0
        }));
      }
      if (repairsData.success && repairsData.stats) {
        const statusCounts = repairsData.stats.status_breakdown || {};
        const statusColors = {
          "received": "#6366F1",
          "diagnosed": "#A855F7",
          "repairing": "#F59E0B",
          "testing": "#EC4899",
          "collection": "#22C55E",
          "completed": "#06B6D4"
        };
        setRepairStatusData(Object.entries(statusCounts).map(([name, value]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value,
          color: statusColors[name] || "#64748b"
        })));
        const inProgressCount = Object.entries(statusCounts).reduce((sum, [status, count]) => {
          return status !== "collection" && status !== "completed" ? sum + count : sum;
        }, 0);
        setStats((prev) => ({
          ...prev,
          repairsInProgress: inProgressCount,
          completedRepairs: statusCounts.completed || 0
        }));
      }
      if (productsData.success && productsData.products) {
        const lowStock = productsData.products.filter((p) => p.stock_quantity <= (p.reorder_threshold || 5)).slice(0, 10).map((p) => ({
          id: p.id,
          name: p.name,
          stock: p.stock_quantity,
          reorder: p.reorder_threshold || 5
        }));
        setLowStockAlerts(lowStock);
        setStats((prev) => ({ ...prev, lowStockCount: lowStock.length }));
      }
      if (onlineSalesData.success && inhouseSalesData.success) {
        const onlineTotal = onlineSalesData.onlineSales?.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0) || 0;
        const inhouseTotal = inhouseSalesData.inhouseSales?.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0) || 0;
        const repairTotal = transactionsData.transactions?.filter((t) => t.type === "payment").reduce((sum, t) => sum + parseFloat(t.amount || 0), 0) || 0;
        const total = onlineTotal + inhouseTotal + repairTotal;
        setSalesChannelData([
          { name: "Online Sales", value: onlineTotal, color: "#8B5CF6" },
          { name: "In-House Sales", value: inhouseTotal, color: "#06B6D4" },
          { name: "Repairs & Services", value: repairTotal, color: "#22C55E" }
        ]);
        setStats((prev) => ({
          ...prev,
          totalRevenue: total,
          todaySales: onlineTotal + inhouseTotal
        }));
      }
      if (customersData.success && customersData.customers) {
        setStats((prev) => ({ ...prev, totalCustomers: customersData.customers.length }));
      }
      if (activitiesData.success && activitiesData.communications) {
        const iconMap = {
          "email": DollarSign,
          "sms": MessageSquare,
          "broadcast": Bell
        };
        const activities = activitiesData.communications.slice(0, 4).map((c, idx) => ({
          id: idx,
          title: c.type.charAt(0).toUpperCase() + c.type.slice(1),
          desc: c.subject || c.body?.substring(0, 30) + "...",
          time: new Date(c.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          icon: iconMap[c.type] || Activity,
          bg: c.type === "email" ? "bg-emerald-500/20" : c.type === "sms" ? "bg-blue-500/20" : "bg-amber-500/20",
          color: c.type === "email" ? "text-emerald-500" : c.type === "sms" ? "text-blue-500" : "text-amber-500"
        }));
        setRecentActivities(activities);
      }
      if (transactionsData.success && transactionsData.transactions) {
        const monthlyData = {};
        transactionsData.transactions.forEach((t) => {
          if (t.type === "payment" && t.status === "completed") {
            const date = new Date(t.created_at);
            const monthKey = date.toLocaleString("default", { month: "short" });
            if (!monthlyData[monthKey]) {
              monthlyData[monthKey] = { revenue: 0, profit: 0, expenses: 0 };
            }
            monthlyData[monthKey].revenue += parseFloat(t.amount || 0);
            monthlyData[monthKey].profit += parseFloat(t.amount || 0) * 0.7;
          }
        });
        const sortedMonths = Object.entries(monthlyData).map(([name, data]) => ({ name, ...data })).slice(-6);
        setBusinessData(sortedMonths);
      }
      if (productsData.success && productsData.products) {
        const inventoryValue = productsData.products.reduce(
          (sum, p) => sum + parseFloat(p.price || 0) * (p.stock_quantity || 0),
          0
        );
        setStats((prev) => ({ ...prev, totalInventoryValue: inventoryValue }));
        const topItems = productsData.products.sort((a, b) => parseFloat(b.price || 0) - parseFloat(a.price || 0)).slice(0, 4).map((p, idx) => ({
          id: idx,
          name: p.name,
          sold: p.stock_quantity || 0,
          // Using stock as proxy for sales
          revenue: `£${(parseFloat(p.price || 0) * (p.stock_quantity || 0)).toFixed(2)}`,
          icon: "📱"
        }));
        setTopSellingItems(topItems);
      }
    } catch (e) {
      console.error("Failed to fetch dashboard data:", e);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
      setLastUpdated(/* @__PURE__ */ new Date());
    }
  }, []);
  reactExports.useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  reactExports.useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchDashboardData();
    }, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchDashboardData]);
  const handleRefresh = () => {
    fetchDashboardData();
    toast.success("Dashboard refreshed");
  };
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    toast.success(autoRefresh ? "Auto-refresh disabled" : "Auto-refresh enabled");
  };
  const handleViewAll = (section) => {
    window.dispatchEvent(new CustomEvent("navigate-to-section", { detail: { section } }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-6 text-slate-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-white", children: "Dashboard Overview" }),
        lastUpdated && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 mt-1", children: [
          "Last updated: ",
          lastUpdated.toLocaleTimeString(),
          autoRefresh && ` (Auto-refresh: ${refreshInterval / 1e3}s)`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        branches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: selectedBranch,
            onChange: (e) => setSelectedBranch(e.target.value),
            className: "text-xs bg-[#1A1D27] border border-slate-800 text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Branches" }),
              branches.map((branch) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: branch.id, children: branch.name }, branch.id))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: timePeriod,
            onChange: (e) => setTimePeriod(e.target.value),
            className: "text-xs bg-[#1A1D27] border border-slate-800 text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "today", children: "Today" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "week", children: "This Week" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "month", children: "This Month" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "quarter", children: "This Quarter" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "year", children: "This Year" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: toggleAutoRefresh,
            className: `text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${autoRefresh ? "bg-emerald-900/30 text-emerald-400 border border-emerald-800" : "bg-[#1A1D27] text-slate-400 border border-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3 w-3" }),
              autoRefresh ? "Auto On" : "Auto Off"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleRefresh,
            className: "text-xs text-slate-400 bg-[#1A1D27] border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#2D3142] transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-3 w-3 ${isLoading ? "animate-spin" : ""}` }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-xs mb-1", children: "Total Revenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold text-white mb-1", children: [
              "£",
              stats.totalRevenue.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-emerald-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "All time" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-xs mb-1", children: "Today's Sales" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold text-white mb-1", children: [
              "£",
              stats.todaySales.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-emerald-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Online + In-House" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-xs mb-1", children: "Repairs in Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-white mb-1", children: stats.repairsInProgress }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-amber-500", children: "Active repairs" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-5 w-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-rose-500/50 transition-colors", onClick: () => handleViewAll("low_stock_alerts"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-xs mb-1", children: "Low Stock Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-white mb-1", children: stats.lowStockCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-rose-500", children: "View and restock" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 text-xs mb-1", children: "Total Inventory Value" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold text-white mb-1", children: [
              "£",
              stats.totalInventoryValue.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-emerald-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Current value" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-6 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-white", children: "Business Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: timePeriod,
              onChange: (e) => setTimePeriod(e.target.value),
              className: "text-xs bg-[#12141D] border border-slate-800 text-slate-400 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "today", children: "Today" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "week", children: "This Week" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "month", children: "This Month" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-[220px]", children: isLoading || businessData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: businessData, margin: { top: 5, right: 10, left: -20, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#2D3142", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", stroke: "#64748b", fontSize: 10, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#64748b", fontSize: 10, tickLine: false, axisLine: false, tickFormatter: (val) => `£${val / 1e3}K` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: { backgroundColor: "#1A1D27", borderColor: "#2D3142", borderRadius: "8px" },
              itemStyle: { fontSize: "12px" },
              labelStyle: { color: "#94a3b8", fontSize: "12px", marginBottom: "4px" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "revenue", name: "Revenue", stroke: "#8B5CF6", strokeWidth: 2, dot: { r: 3, fill: "#8B5CF6", strokeWidth: 0 }, activeDot: { r: 5 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "profit", name: "Profit", stroke: "#22C55E", strokeWidth: 2, dot: { r: 3, fill: "#22C55E", strokeWidth: 0 }, activeDot: { r: 5 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "expenses", name: "Expenses", stroke: "#EF4444", strokeWidth: 2, dot: { r: 3, fill: "#EF4444", strokeWidth: 0 }, activeDot: { r: 5 } })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-[#8B5CF6]" }),
            " Revenue"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-[#EF4444]" }),
            " Expenses"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-[#22C55E]" }),
            " Profit"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-3 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-white mb-6", children: "Sales Channel Breakdown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative flex items-center justify-center", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold text-white", children: [
              "£",
              stats.totalRevenue.toFixed(0)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400", children: "Total" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PieChart, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: salesChannelData,
              cx: "50%",
              cy: "50%",
              innerRadius: 60,
              outerRadius: 80,
              paddingAngle: 2,
              dataKey: "value",
              stroke: "none",
              children: salesChannelData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, `cell-${index}`))
            }
          ) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: salesChannelData.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full", style: { backgroundColor: item.color } }),
            item.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-slate-400", children: [
            "£",
            item.value.toLocaleString(),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500 ml-1", children: [
              "(",
              stats.totalRevenue > 0 ? (item.value / stats.totalRevenue * 100).toFixed(1) : 0,
              "%)"
            ] })
          ] })
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-3 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-white", children: "Recent Activities" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleViewAll("activity"), className: "text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1", children: [
            "View All ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 rotate-[-90deg]" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col gap-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 animate-spin" }) }) : recentActivities.length > 0 ? recentActivities.map((activity) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-8 w-8 rounded-full flex items-center justify-center mt-0.5 ${activity.bg} ${activity.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(activity.icon, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-slate-200", children: activity.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500", children: activity.desc })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500", children: activity.time })
        ] }, activity.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-slate-400 text-xs", children: "No recent activities" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-white", children: "Top Selling Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: timePeriod,
              onChange: (e) => setTimePeriod(e.target.value),
              className: "text-xs bg-[#12141D] border border-slate-800 text-slate-400 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "today", children: "Today" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "week", children: "This Week" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "month", children: "This Month" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-40 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 animate-spin" }) }) : topSellingItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 text-xs text-slate-500 mb-3 border-b border-slate-800 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-6", children: "Item" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right", children: "Sold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right", children: "Revenue" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: topSellingItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 items-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 rounded bg-[#2D3142] flex items-center justify-center text-xs", children: item.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300 font-medium truncate pr-2", children: item.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right text-slate-400", children: item.sold }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right text-slate-300", children: item.revenue })
          ] }, item.id)) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-slate-400 text-xs", children: "No sales data available" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-4 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-white mb-6", children: "Repair Status Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-between gap-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-full h-full text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center w-36 h-36", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-400", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-white", children: repairStatusData.reduce((sum, item) => sum + item.value, 0) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PieChart, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pie,
              {
                data: repairStatusData,
                cx: "50%",
                cy: "50%",
                innerRadius: 45,
                outerRadius: 65,
                paddingAngle: 2,
                dataKey: "value",
                stroke: "none",
                children: repairStatusData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, `cell-${index}`))
              }
            ) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-3", children: repairStatusData.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full", style: { backgroundColor: item.color } }),
              item.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-slate-400", children: [
              item.value,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500 ml-1", children: [
                "(",
                repairStatusData.reduce((sum, i) => sum + i.value, 0) > 0 ? (item.value / repairStatusData.reduce((sum, i) => sum + i.value, 0) * 100).toFixed(1) : 0,
                "%)"
              ] })
            ] })
          ] }, idx)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-white", children: "Low Stock Alerts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleViewAll("low_stock_alerts"), className: "text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1", children: [
            "View All ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 rotate-[-90deg]" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-40 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 animate-spin" }) }) : lowStockAlerts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 text-xs text-slate-500 mb-3 border-b border-slate-800 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-6", children: "Item" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right", children: "Current Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right", children: "Reorder Level" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: lowStockAlerts.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 items-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-6 text-slate-300 font-medium truncate pr-2", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right font-medium text-rose-500", children: item.stock }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right text-amber-500", children: item.reorder })
          ] }, item.id)) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-slate-400 text-xs", children: "All items in stock" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-6 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-violet-500/50 transition-colors", onClick: () => handleViewAll("customers"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded bg-violet-500/20 text-violet-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400", children: "Total Customers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-white", children: stats.totalCustomers })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-emerald-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-2 w-2" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Registered users" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-blue-500/50 transition-colors", onClick: () => handleViewAll("online_sales"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400", children: "Total Sales Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-white", children: stats.totalSalesOrders })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500", children: "Online + In-House" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-amber-500/50 transition-colors", onClick: () => handleViewAll("stock_purchases"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded bg-amber-500/20 text-amber-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400", children: "Total Purchases" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-white", children: stats.totalPurchases })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500", children: "Stock orders" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-emerald-500/50 transition-colors", onClick: () => handleViewAll("inventory_management"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400", children: "Total Inventory Value" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-bold text-white", children: [
              "£",
              stats.totalInventoryValue.toFixed(0)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-emerald-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-2 w-2" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Current value" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-rose-500/50 transition-colors", onClick: () => handleViewAll("invoices"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded bg-rose-500/20 text-rose-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400", children: "Outstanding Receivables" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-bold text-white", children: [
              "£",
              stats.outstandingReceivables.toFixed(0)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500", children: "Pending payments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-purple-500/50 transition-colors", onClick: () => handleViewAll("expenses"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400", children: "Outstanding Payables" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-bold text-white", children: [
              "$",
              stats.outstandingPayables.toFixed(0)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500", children: "Pending bills" })
      ] })
    ] })
  ] });
}
function RepairTimeline({ repairId, trackingId, onClose }) {
  const [repair, setRepair] = reactExports.useState(null);
  const [timeline, setTimeline] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [newNote, setNewNote] = reactExports.useState("");
  reactExports.useEffect(() => {
    fetchRepairDetails();
    fetchTimeline();
  }, [repairId]);
  const fetchRepairDetails = async () => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/repairs/all`), {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (data.success && data.repairs) {
        const repairDetail = data.repairs.find((r) => r.id === repairId);
        if (repairDetail) {
          setRepair(repairDetail);
        }
      }
    } catch (e) {
      console.error("Failed to fetch repair details:", e);
    }
  };
  const fetchTimeline = async () => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/repair-details/${repairId}/timeline`), {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (data.success && data.timeline) {
        setTimeline(data.timeline);
      }
    } catch (e) {
      console.error("Failed to fetch timeline:", e);
      if (repair) {
        setTimeline([{
          id: repair.id,
          type: "status_change",
          title: "Status Change",
          description: `Repair created with status: ${repair.status}`,
          user_id: repair.technician_id,
          created_at: repair.created_at
        }]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const addNote = async () => {
    if (!newNote.trim()) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/repair-details/${repairId}/notes`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ note: newNote })
      });
      if (res.ok) {
        toast.success("Note added successfully");
        setNewNote("");
        fetchTimeline();
      }
    } catch (e) {
      console.error("Failed to add note:", e);
      toast.error("Failed to add note");
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-slate-500" });
      case "received":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-blue-500" });
      case "diagnosed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-purple-500" });
      case "repairing":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-5 w-5 text-orange-500" });
      case "testing":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-amber-500" });
      case "collection":
      case "completed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-green-500" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-slate-500" });
    }
  };
  const getPriorityBadge = (priority) => {
    const colors = {
      low: "bg-slate-100 text-slate-700 border-slate-300",
      normal: "bg-blue-100 text-blue-700 border-blue-300",
      high: "bg-orange-100 text-orange-700 border-orange-300",
      urgent: "bg-red-100 text-red-700 border-red-300"
    };
    return colors[priority] || colors.normal;
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#11131E] rounded-2xl p-8 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-slate-400", children: "Loading repair details..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.95, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.95, opacity: 0 },
          className: "bg-[#11131E] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-[#1F2235]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-white", children: "Repair Details" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-400 mt-1", children: [
                  "Tracking ID: ",
                  trackingId
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  className: "p-2 hover:bg-[#1F2235] rounded-lg transition-colors text-slate-400 hover:text-white",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 overflow-y-auto max-h-[calc(90vh-200px)]", children: repair && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-400 text-sm mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                    "Customer"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium", children: repair.customer_name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: repair.customer_phone || "No phone" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-400 text-sm mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
                    "Device"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium", children: repair.device_model }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400 text-sm", children: [
                    "Est. Cost: £",
                    repair.estimated_cost
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-slate-400 text-sm mb-2", children: "Status & Priority" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    getStatusIcon(repair.status),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium capitalize", children: repair.status }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityBadge(repair.priority)}`, children: repair.priority?.toUpperCase() })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-400 text-sm mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                    "Technician"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium", children: repair.technician_name || "Unassigned" })
                ] })
              ] }),
              repair.status_notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235] mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-400 text-sm mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
                  "Status Notes"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white", children: repair.status_notes })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Repair Timeline" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: timeline.length > 0 ? timeline.map((event, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -20 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: idx * 0.1 },
                    className: "flex gap-4",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-violet-500 mt-1.5" }),
                        idx < timeline.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0.5 h-full bg-[#1F2235] mt-2" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-[#0B0D17] rounded-lg p-4 border border-[#1F2235]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white capitalize", children: event.title || event.type.replace(/_/g, " ") }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500", children: new Date(event.created_at).toLocaleString() })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm", children: event.description }),
                        event.user_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 mt-2", children: [
                          "User ID: ",
                          event.user_id
                        ] })
                      ] })
                    ]
                  },
                  event.id
                )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: "No timeline events recorded" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Add Note" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: newNote,
                      onChange: (e) => setNewNote(e.target.value),
                      placeholder: "Enter a note...",
                      className: "flex-1 bg-[#11131E] border border-[#1F2235] rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: addNote,
                      className: "bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors",
                      children: "Add"
                    }
                  )
                ] })
              ] })
            ] }) })
          ]
        }
      )
    }
  );
}
function AppointmentCalendar({ onNewAppointment }) {
  const [currentDate, setCurrentDate] = reactExports.useState(/* @__PURE__ */ new Date());
  const [appointments, setAppointments] = reactExports.useState([]);
  const [selectedDate, setSelectedDate] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchAppointments();
  }, [currentDate]);
  const fetchAppointments = async () => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/bookings"), {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (data.success && data.bookings) {
        setAppointments(data.bookings);
      }
    } catch (e) {
      console.error("Failed to fetch appointments:", e);
    } finally {
      setIsLoading(false);
    }
  };
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth2 = lastDay.getDate();
    const startDayOfWeek2 = firstDay.getDay();
    return { daysInMonth: daysInMonth2, startDayOfWeek: startDayOfWeek2 };
  };
  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.appointment_date).toISOString().split("T")[0];
      return aptDate === dateStr;
    });
  };
  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };
  const { daysInMonth, startDayOfWeek } = getDaysInMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const renderCalendarGrid = () => {
    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(/* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-[#0B0D17]" }, `empty-${i}`));
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayAppointments = getAppointmentsForDate(date);
      const isToday = (/* @__PURE__ */ new Date()).toDateString() === date.toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      days.push(
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            whileHover: { scale: 1.02 },
            onClick: () => setSelectedDate(date),
            className: `h-24 p-2 border border-[#1F2235] rounded-lg cursor-pointer transition-colors ${isToday ? "bg-violet-900/20 border-violet-500" : "bg-[#0B0D17]"} ${isSelected ? "ring-2 ring-violet-500" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm font-medium ${isToday ? "text-violet-400" : "text-slate-300"}`, children: day }),
              dayAppointments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 space-y-1", children: [
                dayAppointments.slice(0, 2).map((apt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-xs bg-violet-600/20 text-violet-300 px-1 py-0.5 rounded truncate",
                    title: `${apt.customer_name} - ${apt.appointment_time}`,
                    children: apt.customer_name
                  },
                  idx
                )),
                dayAppointments.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-500", children: [
                  "+",
                  dayAppointments.length - 2,
                  " more"
                ] })
              ] })
            ]
          },
          day
        )
      );
    }
    return days;
  };
  const renderSelectedDayAppointments = () => {
    if (!selectedDate) return null;
    const dayAppointments = getAppointmentsForDate(selectedDate);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mt-6 bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-white mb-4", children: [
            "Appointments for ",
            selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
          ] }),
          dayAppointments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: "No appointments scheduled" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: dayAppointments.map((apt) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#11131E] rounded-lg p-3 border border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-white font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-slate-400" }),
                apt.customer_name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-400 text-sm mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
                apt.customer_phone
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-400 text-sm mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                apt.appointment_time
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-slate-500 text-sm mt-1", children: [
                "Device: ",
                apt.device_model
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 rounded-full text-xs font-semibold ${apt.status === "confirmed" ? "bg-emerald-900/30 text-emerald-400" : apt.status === "pending" ? "bg-amber-900/30 text-amber-400" : "bg-slate-800 text-slate-400"}`, children: apt.status })
          ] }) }, apt.id)) })
        ]
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#11131E] rounded-xl p-6 border border-[#1F2235]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-violet-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-white", children: "Appointment Calendar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => navigateMonth(-1),
            className: "p-2 hover:bg-[#1F2235] rounded-lg transition-colors text-slate-400 hover:text-white",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-medium min-w-[150px] text-center", children: [
          monthNames[currentDate.getMonth()],
          " ",
          currentDate.getFullYear()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => navigateMonth(1),
            className: "p-2 hover:bg-[#1F2235] rounded-lg transition-colors text-slate-400 hover:text-white",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
          }
        ),
        onNewAppointment && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: onNewAppointment,
            className: "ml-4 bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "New Appointment"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-2 mb-2", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-sm font-medium text-slate-500 py-2", children: day }, day)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-2", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-7 text-center py-12 text-slate-500", children: "Loading appointments..." }) : renderCalendarGrid() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedDate && renderSelectedDayAppointments() })
  ] });
}
class ErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#0B0D17] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full bg-[#11131E] rounded-xl border border-[#1F2235] p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-16 w-16 text-rose-500 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-white mb-2", children: "Something went wrong" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 mb-4", children: this.state.error?.message || "An unexpected error occurred" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: this.handleReset,
            className: "inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
              "Try Again"
            ]
          }
        )
      ] }) });
    }
    return this.props.children;
  }
}
const safeToast = {
  error: (message) => {
    if (typeof window !== "undefined") toast.error(message);
  },
  success: (message) => {
    if (typeof window !== "undefined") toast.success(message);
  }
};
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
function getPriorityStyle(priority) {
  switch (priority) {
    case "low":
      return "bg-slate-100 text-slate-700 border border-slate-300";
    case "normal":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    case "high":
      return "bg-orange-100 text-orange-700 border border-orange-300";
    case "urgent":
      return "bg-red-100 text-red-700 border border-red-300";
    default:
      return "bg-slate-100 text-slate-700 border border-slate-300";
  }
}
function AdminDashboard({
  token,
  onLogout
}) {
  const [repairs, setRepairs] = reactExports.useState([]);
  const [stats, setStats] = reactExports.useState({
    total_repairs: 0,
    pending_repairs: 0,
    completed_repairs: 0,
    revenue: 0,
    active_bookings: 0,
    low_stock_items: 0
  });
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [activeSection, setActiveSection] = reactExports.useState("dashboard");
  reactExports.useEffect(() => {
    const userRole2 = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("admin_user") || "{}").role : "";
    if (userRole2 === "staff") {
      setActiveSection("walkin");
    }
  }, []);
  reactExports.useEffect(() => {
    const userRole2 = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("admin_user") || "{}").role : "";
    const staffAllowedSections = ["walkin", "inhouse_sales"];
    if (userRole2 === "staff" && !staffAllowedSections.includes(activeSection)) {
      setActiveSection("walkin");
      if (typeof window !== "undefined") {
        safeToast.error("Access denied. Staff can only access Walk-in Bookings and In-House Sales.");
      }
    }
  }, [activeSection]);
  const [openDropdowns, setOpenDropdowns] = reactExports.useState({
    OPERATIONS: true
  });
  const SESSION_TIMEOUT = 30 * 60 * 1e3;
  const [sessionWarning, setSessionWarning] = reactExports.useState(false);
  const [sessionExpired, setSessionExpired] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let timeoutId;
    let warningId;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      setSessionWarning(false);
      setSessionExpired(false);
      warningId = setTimeout(() => {
        setSessionWarning(true);
      }, SESSION_TIMEOUT - 5 * 60 * 1e3);
      timeoutId = setTimeout(() => {
        setSessionExpired(true);
        onLogout();
      }, SESSION_TIMEOUT);
    };
    const handleActivity = () => {
      resetTimer();
    };
    resetTimer();
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);
    const handleNavigation = (e) => {
      const section = e.detail.section;
      const sectionMap = {
        "activity": "communications",
        "low_stock_alerts": "inventory",
        "customers": "customers",
        "online_sales": "financials",
        "stock_purchases": "stock_purchases",
        "inventory_management": "inventory",
        "invoices": "financials",
        "expenses": "financials"
      };
      setActiveSection(sectionMap[section] || section);
    };
    window.addEventListener("navigate-to-section", handleNavigation);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("navigate-to-section", handleNavigation);
    };
  }, [onLogout]);
  const toggleDropdown = (label) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };
  const [timePeriod, setTimePeriod] = reactExports.useState("all");
  const [products, setProducts] = reactExports.useState([]);
  const [inventorySearch, setInventorySearch] = reactExports.useState("");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [showEditProductModal, setShowEditProductModal] = reactExports.useState(false);
  const [editingProduct, setEditingProduct] = reactExports.useState(null);
  const [showAddProductModal, setShowAddProductModal] = reactExports.useState(false);
  const [showImportModal, setShowImportModal] = reactExports.useState(false);
  const [importFile, setImportFile] = reactExports.useState(null);
  const [repairPartsInventory, setRepairPartsInventory] = reactExports.useState([]);
  const [repairPartsSearch, setRepairPartsSearch] = reactExports.useState("");
  const [repairPartsTypeFilter, setRepairPartsTypeFilter] = reactExports.useState("all");
  const [showAddRepairPartModal, setShowAddRepairPartModal] = reactExports.useState(false);
  const [showEditRepairPartModal, setShowEditRepairPartModal] = reactExports.useState(false);
  const [editingRepairPart, setEditingRepairPart] = reactExports.useState(null);
  const [newRepairPart, setNewRepairPart] = reactExports.useState({
    name: "",
    description: "",
    part_type: "screen",
    brand: "",
    model: "",
    sku: "",
    supplier: "",
    unit_cost: "",
    stock_quantity: "",
    min_stock_level: "5",
    location: "",
    notes: ""
  });
  const [newProduct, setNewProduct] = reactExports.useState({
    name: "",
    description: "",
    category: "smartphones",
    brand: "",
    model: "",
    condition: "new",
    price: "",
    stock_quantity: "",
    image_url: ""
  });
  const [showEditStaffModal, setShowEditStaffModal] = reactExports.useState(false);
  const [editingStaff, setEditingStaff] = reactExports.useState(null);
  const [staff, setStaff] = reactExports.useState([]);
  const [staffSearch, setStaffSearch] = reactExports.useState("");
  const [roleFilter, setRoleFilter] = reactExports.useState("all");
  const [messages, setMessages] = reactExports.useState([]);
  const [emailsSent, setEmailsSent] = reactExports.useState(0);
  const [smsSent, setSmsSent] = reactExports.useState(0);
  const [showEmailModal, setShowEmailModal] = reactExports.useState(false);
  const [showSmsModal, setShowSmsModal] = reactExports.useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = reactExports.useState(false);
  const [bookings, setBookings] = reactExports.useState([]);
  const [bookingSearch, setBookingSearch] = reactExports.useState("");
  const [selectedRepairs, setSelectedRepairs] = reactExports.useState(/* @__PURE__ */ new Set());
  const [selectedRepairForTimeline, setSelectedRepairForTimeline] = reactExports.useState(null);
  const [showCalendarView, setShowCalendarView] = reactExports.useState(false);
  const [repairsPage, setRepairsPage] = reactExports.useState(1);
  const [repairsPerPage, setRepairsPerPage] = reactExports.useState(10);
  const [bookingsPage, setBookingsPage] = reactExports.useState(1);
  const [bookingsPerPage, setBookingsPerPage] = reactExports.useState(10);
  const [inventoryPage, setInventoryPage] = reactExports.useState(1);
  const [inventoryPerPage, setInventoryPerPage] = reactExports.useState(10);
  const [expenses, setExpenses] = reactExports.useState([]);
  const [expenseSearch, setExpenseSearch] = reactExports.useState("");
  const [expenseCategoryFilter, setExpenseCategoryFilter] = reactExports.useState("all");
  const [revenueData, setRevenueData] = reactExports.useState([]);
  const [revenueSearch, setRevenueSearch] = reactExports.useState("");
  const [inventoryItems, setInventoryItems] = reactExports.useState([]);
  const [inventoryManagementSearch, setInventoryManagementSearch] = reactExports.useState("");
  const [stockMovements, setStockMovements] = reactExports.useState([]);
  const [stockMovementSearch, setStockMovementSearch] = reactExports.useState("");
  const [lowStockItems, setLowStockItems] = reactExports.useState([]);
  const [suppliers, setSuppliers] = reactExports.useState([]);
  const [supplierSearch, setSupplierSearch] = reactExports.useState("");
  const [showAddSupplierModal, setShowAddSupplierModal] = reactExports.useState(false);
  const [newSupplier, setNewSupplier] = reactExports.useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [stockPurchases, setStockPurchases] = reactExports.useState([]);
  const [stockPurchaseSearch, setStockPurchaseSearch] = reactExports.useState("");
  const [showAddPurchaseModal, setShowAddPurchaseModal] = reactExports.useState(false);
  const [newPurchaseOrder, setNewPurchaseOrder] = reactExports.useState({
    supplier_id: "",
    branch_id: "",
    reference: "",
    total_amount: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    status: "pending",
    notes: ""
  });
  const [purchaseOrders, setPurchaseOrders] = reactExports.useState([]);
  const [purchaseOrderSearch, setPurchaseOrderSearch] = reactExports.useState("");
  const [onlineSales, setOnlineSales] = reactExports.useState([]);
  const [onlineSaleSearch, setOnlineSaleSearch] = reactExports.useState("");
  const [inhouseSales, setInhouseSales] = reactExports.useState([]);
  const [inhouseSaleSearch, setInhouseSaleSearch] = reactExports.useState("");
  const [showAddInhouseSaleModal, setShowAddInhouseSaleModal] = reactExports.useState(false);
  const [newInhouseSale, setNewInhouseSale] = reactExports.useState({
    reference: "",
    customer_name: "",
    customer_phone: "",
    amount: "",
    item_count: "",
    payment_method: "cash"
  });
  const [invoices, setInvoices] = reactExports.useState([]);
  const [invoiceSearch, setInvoiceSearch] = reactExports.useState("");
  const [payments, setPayments] = reactExports.useState([]);
  const [paymentSearch, setPaymentSearch] = reactExports.useState("");
  const [customerHistory, setCustomerHistory] = reactExports.useState([]);
  const [customerHistorySearch, setCustomerHistorySearch] = reactExports.useState("");
  const [roles, setRoles] = reactExports.useState([]);
  const [permissions, setPermissions] = reactExports.useState([]);
  const [rolesSearch, setRolesSearch] = reactExports.useState("");
  const [profitLoss, setProfitLoss] = reactExports.useState([]);
  const [profitLossPeriod, setProfitLossPeriod] = reactExports.useState("month");
  const [cashFlow, setCashFlow] = reactExports.useState([]);
  const [cashFlowPeriod, setCashFlowPeriod] = reactExports.useState("month");
  const [repairTracking, setRepairTracking] = reactExports.useState([]);
  const [repairTrackingSearch, setRepairTrackingSearch] = reactExports.useState("");
  const [businessSettings, setBusinessSettings] = reactExports.useState({
    businessName: "Fixora Repair Shop",
    email: "info@fixora.com",
    phone: "+44 123 456 7890",
    address: "123 High Street, Nuneaton, CV11 6AA",
    openingHours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    },
    taxRate: 20,
    currency: "GBP",
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      bookingReminders: true,
      statusUpdates: true
    },
    display: {
      showPrices: true,
      showContactInfo: true,
      enableDarkMode: false
    }
  });
  const fetchRepairs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.ALL), {
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
    setIsLoading(true);
    try {
      const res = await fetch(buildUrl("/repairs/stats"), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        console.log("Stats data:", data.stats);
        setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const exportRepairsCSV = async () => {
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/repairs/export/csv"), {
        headers: token2 ? {
          Authorization: `Bearer ${token2}`
        } : {}
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
  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/users/staff"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStaff(data.staff || []);
      }
    } catch (e) {
      console.error("Failed to fetch staff:", e);
      safeToast.error("Failed to fetch staff");
    } finally {
      setIsLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchRepairs();
    fetchStats();
    fetchStaff();
  }, []);
  const updateStatus = async (trackingId, newStatus) => {
    setRepairs((prev) => prev.map((r) => r.tracking_id === trackingId ? {
      ...r,
      status: newStatus
    } : r));
    try {
      await fetch(buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.UPDATE_STATUS(trackingId)), {
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
      fetchStats();
    } catch (e) {
      console.error(e);
      setRepairs((prev) => prev.map((r) => r.tracking_id === trackingId ? {
        ...r,
        status: r.status
      } : r));
    }
  };
  const updatePriority = async (trackingId, newPriority) => {
    const repair = repairs.find((r) => r.tracking_id === trackingId);
    if (!repair) return;
    setRepairs((prev) => prev.map((r) => r.tracking_id === trackingId ? {
      ...r,
      priority: newPriority
    } : r));
    try {
      await fetch(buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.UPDATE_STATUS(trackingId)), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: repair.status,
          priority: newPriority
        })
      });
    } catch (e) {
      console.error("Failed to update priority:", e);
      if (typeof window !== "undefined") safeToast.error("Failed to update priority");
    }
  };
  const updateTechnician = async (trackingId, technicianId) => {
    const repair = repairs.find((r) => r.tracking_id === trackingId);
    if (!repair) return;
    setRepairs((prev) => prev.map((r) => r.tracking_id === trackingId ? {
      ...r,
      technician_id: technicianId || null
    } : r));
    try {
      await fetch(buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.UPDATE_STATUS(trackingId)), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: repair.status,
          technician_id: technicianId || null
        })
      });
    } catch (e) {
      console.error("Failed to update technician:", e);
      if (typeof window !== "undefined") safeToast.error("Failed to update technician");
    }
  };
  const deleteRepair = async (trackingId) => {
    if (!confirm("Are you sure you want to delete this repair? This action cannot be undone.")) return;
    try {
      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.DELETE(trackingId)), {
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
  const filteredRepairs = reactExports.useMemo(() => {
    return repairs.filter((r) => {
      const matchSearch = r.tracking_id?.toLowerCase().includes(search.toLowerCase()) || r.customer_name?.toLowerCase().includes(search.toLowerCase()) || r.customer_phone?.includes(search);
      const matchStatus = statusFilter === "all" || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [repairs, search, statusFilter]);
  const filteredBookings = reactExports.useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch = booking.customer_name?.toLowerCase().includes(bookingSearch.toLowerCase()) || booking.phone?.toLowerCase().includes(bookingSearch.toLowerCase());
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, bookingSearch, statusFilter]);
  const filteredRepairsByTime = reactExports.useMemo(() => {
    const now = /* @__PURE__ */ new Date();
    return repairs.filter((r) => {
      const repairDate = new Date(r.created_at);
      if (timePeriod === "all") return true;
      if (timePeriod === "daily") {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return repairDate >= today;
      }
      if (timePeriod === "weekly") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
        return repairDate >= weekAgo;
      }
      if (timePeriod === "monthly") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
        return repairDate >= monthAgo;
      }
      return true;
    });
  }, [repairs, timePeriod]);
  const customers = Array.from(new Map(repairs.map((r) => [r.customer_phone, {
    name: r.customer_name,
    phone: r.customer_phone,
    repairCount: repairs.filter((rep) => rep.customer_phone === r.customer_phone).length,
    lastRepair: repairs.filter((rep) => rep.customer_phone === r.customer_phone).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]?.created_at
  }])).values()).sort((a, b) => b.repairCount - a.repairCount);
  const analyticsRepairs = activeSection === "analytics" ? filteredRepairsByTime : repairs;
  const totalRepairs = stats?.total_repairs || analyticsRepairs.length;
  const completedRepairs = stats?.status_breakdown?.collection || analyticsRepairs.filter((r) => r.status === "collection").length;
  const completionRate = totalRepairs > 0 ? Math.round(completedRepairs / totalRepairs * 100) : 0;
  const inProgressRepairs = repairs.filter((r) => r.status !== "collection" && r.status !== "completed").length;
  const totalRevenue = stats?.total_revenue || 0;
  const paginate = (data, page, perPage) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  };
  const totalPages = (data, perPage) => Math.ceil(data.length / perPage);
  const paginatedRepairs = paginate(filteredRepairs, repairsPage, repairsPerPage);
  const paginatedBookings = paginate(filteredBookings, bookingsPage, bookingsPerPage);
  paginate(inventoryItems, inventoryPage, inventoryPerPage);
  const repairsOverTime = analyticsRepairs.reduce((acc, r) => {
    const date = new Date(r.created_at).toLocaleDateString();
    const existing = acc.find((item) => item.date === date);
    if (existing) {
      existing.count++;
    } else {
      acc.push({
        date,
        count: 1
      });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const repairsByStatus = analyticsRepairs.reduce((acc, r) => {
    const status = r.status === "collection" ? "Completed" : r.status.charAt(0).toUpperCase() + r.status.slice(1);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  const statusChartData = Object.entries(repairsByStatus).map(([name, value]) => ({
    name,
    value
  }));
  const deviceTypeData = analyticsRepairs.reduce((acc, r) => {
    const device = r.device_model?.split(" ")[0] || "Other";
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {});
  const deviceChartData = Object.entries(deviceTypeData).map(([name, value]) => ({
    name,
    value
  })).sort((a, b) => b.value - a.value).slice(0, 6);
  const COLORS = ["#8b5cf6", "#06b6d4", "#22c55e", "#f97316", "#ec4899", "#eab308"];
  const activityLog = repairs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 15);
  const filteredProducts = reactExports.useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name?.toLowerCase().includes(inventorySearch.toLowerCase()) || product.brand?.toLowerCase().includes(inventorySearch.toLowerCase()) || product.model?.toLowerCase().includes(inventorySearch.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, inventorySearch, categoryFilter]);
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.PRODUCTS.ALL));
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error("Failed to fetch products:", e);
      safeToast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowEditProductModal(true);
  };
  const handleSaveProduct = async () => {
    if (!editingProduct) return;
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.PRODUCTS.ALL + `/${editingProduct.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify(editingProduct)
      });
      if (res.ok) {
        setProducts((prev) => prev.map((p) => p.id === editingProduct.id ? editingProduct : p));
        setShowEditProductModal(false);
        setEditingProduct(null);
        safeToast.success("Product updated successfully");
      } else {
        safeToast.error("Failed to update product");
      }
    } catch (e) {
      console.error("Failed to update product:", e);
      safeToast.error("Failed to update product");
    }
  };
  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.PRODUCTS.ALL + `/${productId}`), {
        method: "DELETE",
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      }
    } catch (e) {
      console.error("Failed to delete product:", e);
      safeToast.error("Failed to delete product");
    }
  };
  reactExports.useEffect(() => {
    if (activeSection === "inventory") {
      fetchProducts();
    }
  }, [activeSection]);
  const filteredStaff = reactExports.useMemo(() => {
    return staff.filter((staffMember) => {
      const matchesSearch = staffMember.name?.toLowerCase().includes(staffSearch.toLowerCase()) || staffMember.email?.toLowerCase().includes(staffSearch.toLowerCase()) || staffMember.role?.toLowerCase().includes(staffSearch.toLowerCase());
      const matchesRole = roleFilter === "all" || staffMember.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [staff, staffSearch, roleFilter]);
  const handleEditStaff = (staffMember) => {
    setEditingStaff(staffMember);
    setShowEditStaffModal(true);
  };
  const handleSaveStaff = async () => {
    if (!editingStaff) return;
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl(`/users/${editingStaff.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify({
          name: editingStaff.name,
          email: editingStaff.email,
          role: editingStaff.role
        })
      });
      if (res.ok) {
        setStaff((prev) => prev.map((s) => s.id === editingStaff.id ? editingStaff : s));
        setShowEditStaffModal(false);
        setEditingStaff(null);
        safeToast.success("Staff member updated successfully");
      } else {
        safeToast.error("Failed to update staff member");
      }
    } catch (e) {
      console.error("Failed to update staff:", e);
      safeToast.error("Failed to update staff member");
    }
  };
  const handleToggleStaffStatus = async (staffMember) => {
    const newStatus = !staffMember.is_active;
    if (!confirm(`Are you sure you want to ${newStatus ? "activate" : "deactivate"} this staff member?`)) return;
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl(`/users/${staffMember.id}/status`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify({
          is_active: newStatus
        })
      });
      if (res.ok) {
        setStaff((prev) => prev.map((s) => s.id === staffMember.id ? {
          ...s,
          is_active: newStatus
        } : s));
      }
    } catch (e) {
      console.error("Failed to toggle staff status:", e);
      safeToast.error("Failed to toggle staff status");
    }
  };
  reactExports.useEffect(() => {
    if (activeSection === "staff") {
      fetchStaff();
    }
  }, [activeSection]);
  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/bookings/all"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBookings(data.bookings || []);
      }
    } catch (e) {
      console.error("Failed to fetch bookings:", e);
      safeToast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };
  const handleConfirmBooking = async (booking) => {
    if (!confirm("Are you sure you want to confirm this booking?")) return;
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl(`/bookings/${booking.id}/status`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify({
          status: "confirmed"
        })
      });
      if (res.ok) {
        setBookings((prev) => prev.map((b) => b.id === booking.id ? {
          ...b,
          status: "confirmed"
        } : b));
      }
    } catch (e) {
      console.error("Failed to confirm booking:", e);
      safeToast.error("Failed to confirm booking");
    }
  };
  const handleCancelBooking = async (booking) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl(`/bookings/${booking.id}/status`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify({
          status: "cancelled"
        })
      });
      if (res.ok) {
        setBookings((prev) => prev.map((b) => b.id === booking.id ? {
          ...b,
          status: "cancelled"
        } : b));
      }
    } catch (e) {
      console.error("Failed to cancel booking:", e);
      safeToast.error("Failed to cancel booking");
    }
  };
  reactExports.useEffect(() => {
    if (activeSection === "bookings") {
      fetchBookings();
    }
  }, [activeSection]);
  const fetchRoles = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/roles"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRoles(data.roles || []);
        setPermissions(data.roles?.flatMap((r) => r.permissions) || []);
      }
    } catch (e) {
      console.error("Failed to fetch roles:", e);
      safeToast.error("Failed to fetch roles");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchProfitLoss = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl(`/financials/profit-loss?period=${profitLossPeriod}`), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProfitLoss(data.profitLoss || []);
      }
    } catch (e) {
      console.error("Failed to fetch profit & loss:", e);
      safeToast.error("Failed to fetch profit & loss");
    } finally {
      setIsLoading(false);
    }
  }, [profitLossPeriod]);
  const fetchCashFlow = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl(`/financials/cash-flow?period=${cashFlowPeriod}`), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCashFlow(data.cashFlow || []);
      }
    } catch (e) {
      console.error("Failed to fetch cash flow:", e);
      safeToast.error("Failed to fetch cash flow");
    } finally {
      setIsLoading(false);
    }
  }, [cashFlowPeriod]);
  const fetchRepairTracking = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/financials/repair-tracking"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      console.log("Repair tracking data:", data);
      if (res.ok && data.success) {
        setRepairTracking(data.repairTracking || []);
      }
    } catch (e) {
      console.error("Failed to fetch repair tracking:", e);
      safeToast.error("Failed to fetch repair tracking");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchExpenses = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/finance/expenses"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setExpenses(data.expenses || []);
      }
    } catch (e) {
      console.error("Failed to fetch expenses:", e);
      safeToast.error("Failed to fetch expenses");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchRevenue = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/finance/revenue"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRevenueData(data.revenue || []);
      }
    } catch (e) {
      console.error("Failed to fetch revenue:", e);
      safeToast.error("Failed to fetch revenue");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchOnlineSales = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/finance/online-sales"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOnlineSales(data.onlineSales || []);
      }
    } catch (e) {
      console.error("Failed to fetch online sales:", e);
      safeToast.error("Failed to fetch online sales");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchInhouseSales = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/finance/inhouse-sales"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInhouseSales(data.inhouseSales || []);
      }
    } catch (e) {
      console.error("Failed to fetch in-house sales:", e);
      safeToast.error("Failed to fetch in-house sales");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchInvoices = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/finance/invoices"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInvoices(data.invoices || []);
      }
    } catch (e) {
      console.error("Failed to fetch invoices:", e);
      safeToast.error("Failed to fetch invoices");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchPayments = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/finance/transactions"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPayments(data.transactions || []);
      }
    } catch (e) {
      console.error("Failed to fetch payments:", e);
      safeToast.error("Failed to fetch payments");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchCustomerHistory = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/customers"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCustomerHistory(data.customers || []);
      }
    } catch (e) {
      console.error("Failed to fetch customer history:", e);
      safeToast.error("Failed to fetch customer history");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchInventoryItems = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/products"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInventoryItems(data.products || []);
        setLowStockItems(data.products?.filter((p) => p.stock_quantity <= 5) || []);
      }
    } catch (e) {
      console.error("Failed to fetch inventory items:", e);
      safeToast.error("Failed to fetch inventory items");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchRepairPartsInventory = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/repairs/inventory"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      console.log("Repair parts inventory data:", data);
      if (res.ok && data.success) {
        setRepairPartsInventory(data.parts || []);
      }
    } catch (e) {
      console.error("Failed to fetch repair parts inventory:", e);
      safeToast.error("Failed to fetch repair parts inventory");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchStockMovements = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/inventory/stock-movements"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      console.log("Stock movements response:", res.status);
      const data = await res.json();
      if (res.ok && data.success) {
        setStockMovements(data.movements || []);
      }
    } catch (e) {
      console.error("Failed to fetch stock movements:", e);
      safeToast.error("Failed to fetch stock movements");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchSuppliers = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/suppliers"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuppliers(data.suppliers || []);
      }
    } catch (e) {
      console.error("Failed to fetch suppliers:", e);
      safeToast.error("Failed to fetch suppliers");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleCreateSupplier = async () => {
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/suppliers"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify(newSupplier)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuppliers((prev) => [data.supplier, ...prev]);
        setShowAddSupplierModal(false);
        setNewSupplier({
          name: "",
          contact: "",
          email: "",
          phone: "",
          address: "",
          notes: ""
        });
        safeToast.success("Supplier created successfully");
      } else {
        safeToast.error(data.detail || "Failed to create supplier");
      }
    } catch (e) {
      console.error("Failed to create supplier:", e);
      safeToast.error("Failed to create supplier");
    }
  };
  const fetchStockPurchases = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/inventory/purchases"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStockPurchases(data.purchases || []);
      }
    } catch (e) {
      console.error("Failed to fetch stock purchases:", e);
      safeToast.error("Failed to fetch stock purchases");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchPurchaseOrders = reactExports.useCallback(async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/inventory/orders"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPurchaseOrders(data.orders || []);
      }
    } catch (e) {
      console.error("Failed to fetch purchase orders:", e);
      safeToast.error("Failed to fetch purchase orders");
    } finally {
      setIsLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    if (activeSection === "roles_permissions") {
      fetchRoles();
    }
  }, [activeSection, fetchRoles]);
  reactExports.useEffect(() => {
    if (activeSection === "profit_loss") {
      fetchProfitLoss();
    }
  }, [activeSection, fetchProfitLoss]);
  reactExports.useEffect(() => {
    if (activeSection === "cash_flow") {
      fetchCashFlow();
    }
  }, [activeSection, fetchCashFlow]);
  reactExports.useEffect(() => {
    if (activeSection === "repair_tracking") {
      fetchRepairTracking();
    }
  }, [activeSection, fetchRepairTracking]);
  reactExports.useEffect(() => {
    if (activeSection === "expenses") {
      fetchExpenses();
    }
  }, [activeSection, fetchExpenses]);
  reactExports.useEffect(() => {
    if (activeSection === "revenue") {
      fetchRevenue();
    }
  }, [activeSection, fetchRevenue]);
  reactExports.useEffect(() => {
    if (activeSection === "online_sales") {
      fetchOnlineSales();
    }
  }, [activeSection, fetchOnlineSales]);
  reactExports.useEffect(() => {
    if (activeSection === "inhouse_sales") {
      fetchInhouseSales();
    }
  }, [activeSection, fetchInhouseSales]);
  reactExports.useEffect(() => {
    if (activeSection === "invoices") {
      fetchInvoices();
    }
  }, [activeSection, fetchInvoices]);
  reactExports.useEffect(() => {
    if (activeSection === "payments") {
      fetchPayments();
    }
  }, [activeSection, fetchPayments]);
  reactExports.useEffect(() => {
    if (activeSection === "customer_history") {
      fetchCustomerHistory();
    }
  }, [activeSection, fetchCustomerHistory]);
  reactExports.useEffect(() => {
    if (activeSection === "inventory_management") {
      fetchInventoryItems();
    }
  }, [activeSection, fetchInventoryItems]);
  reactExports.useEffect(() => {
    if (activeSection === "stock_movements") {
      fetchStockMovements();
    }
  }, [activeSection, fetchStockMovements]);
  reactExports.useEffect(() => {
    if (activeSection === "supplier_management") {
      fetchSuppliers();
    }
  }, [activeSection, fetchSuppliers]);
  reactExports.useEffect(() => {
    if (activeSection === "stock_purchases") {
      fetchStockPurchases();
    }
  }, [activeSection, fetchStockPurchases]);
  const handleCreateInhouseSale = async () => {
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/finance/inhouse-sales"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify({
          reference: newInhouseSale.reference || `SALE-${Date.now()}`,
          customer_name: newInhouseSale.customer_name,
          customer_phone: newInhouseSale.customer_phone,
          amount: parseFloat(newInhouseSale.amount),
          item_count: parseInt(newInhouseSale.item_count),
          payment_method: newInhouseSale.payment_method
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInhouseSales((prev) => [{
          id: data.sale.id,
          reference: data.sale.reference,
          customer_name: data.sale.customer_name,
          amount: data.sale.amount,
          date: data.sale.created_at,
          payment_method: data.sale.payment_method,
          status: "completed"
        }, ...prev]);
        setShowAddInhouseSaleModal(false);
        setNewInhouseSale({
          reference: "",
          customer_name: "",
          customer_phone: "",
          amount: "",
          item_count: "",
          payment_method: "cash"
        });
        safeToast.success("In-house sale recorded successfully");
      } else {
        safeToast.error(data.detail || "Failed to record sale");
      }
    } catch (e) {
      console.error("Failed to create in-house sale:", e);
      safeToast.error("Failed to record sale");
    }
  };
  const handleCreateProduct = async () => {
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/products"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          category: newProduct.category,
          brand: newProduct.brand,
          model: newProduct.model,
          condition: newProduct.condition,
          price: parseFloat(newProduct.price),
          stock_quantity: parseInt(newProduct.stock_quantity),
          image_url: newProduct.image_url || null
        })
      });
      const data = await res.json();
      if (res.ok) {
        setProducts((prev) => [data, ...prev]);
        setShowAddProductModal(false);
        setNewProduct({
          name: "",
          description: "",
          category: "smartphones",
          brand: "",
          model: "",
          condition: "new",
          price: "",
          stock_quantity: "",
          image_url: ""
        });
        safeToast.success("Product created successfully");
      } else {
        safeToast.error(data.detail || "Failed to create product");
      }
    } catch (e) {
      console.error("Failed to create product:", e);
      safeToast.error("Failed to create product");
    }
  };
  const handleImportProducts = async () => {
    if (!importFile) {
      safeToast.error("Please select a file to import");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", importFile);
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/products/import"), {
        method: "POST",
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {},
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success) {
        safeToast.success(`Successfully imported ${data.imported_count} products`);
        fetchProducts();
        setShowImportModal(false);
        setImportFile(null);
      } else {
        safeToast.error(data.detail || "Failed to import products");
      }
    } catch (e) {
      console.error("Failed to import products:", e);
      safeToast.error("Failed to import products");
    }
  };
  const handleCreateRepairPart = async () => {
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/repairs/inventory"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify({
          name: newRepairPart.name,
          description: newRepairPart.description,
          part_type: newRepairPart.part_type,
          brand: newRepairPart.brand,
          model: newRepairPart.model,
          sku: newRepairPart.sku,
          supplier: newRepairPart.supplier,
          unit_cost: parseFloat(newRepairPart.unit_cost),
          stock_quantity: parseInt(newRepairPart.stock_quantity),
          min_stock_level: parseInt(newRepairPart.min_stock_level),
          location: newRepairPart.location,
          notes: newRepairPart.notes
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRepairPartsInventory((prev) => [data.part, ...prev]);
        setShowAddRepairPartModal(false);
        setNewRepairPart({
          name: "",
          description: "",
          part_type: "screen",
          brand: "",
          model: "",
          sku: "",
          supplier: "",
          unit_cost: "",
          stock_quantity: "",
          min_stock_level: "5",
          location: "",
          notes: ""
        });
        safeToast.success("Repair part added successfully");
      } else {
        safeToast.error(data.detail || "Failed to add repair part");
      }
    } catch (e) {
      console.error("Failed to create repair part:", e);
      safeToast.error("Failed to add repair part");
    }
  };
  const handleUpdateRepairPart = async () => {
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl(`/repairs/inventory/${editingRepairPart.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify(editingRepairPart)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRepairPartsInventory((prev) => prev.map((p) => p.id === editingRepairPart.id ? data.part : p));
        setShowEditRepairPartModal(false);
        setEditingRepairPart(null);
        safeToast.success("Repair part updated successfully");
      } else {
        safeToast.error(data.detail || "Failed to update repair part");
      }
    } catch (e) {
      console.error("Failed to update repair part:", e);
      safeToast.error("Failed to update repair part");
    }
  };
  const handleDeleteRepairPart = async (partId) => {
    if (!confirm("Are you sure you want to delete this repair part?")) return;
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl(`/repairs/inventory/${partId}`), {
        method: "DELETE",
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      if (res.ok) {
        setRepairPartsInventory((prev) => prev.filter((p) => p.id !== partId));
        safeToast.success("Repair part deleted successfully");
      }
    } catch (e) {
      console.error("Failed to delete repair part:", e);
      safeToast.error("Failed to delete repair part");
    }
  };
  const handleCreatePurchaseOrder = async () => {
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/purchase-orders"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify({
          supplier_id: newPurchaseOrder.supplier_id || null,
          branch_id: newPurchaseOrder.branch_id || null,
          total_amount: parseFloat(newPurchaseOrder.total_amount),
          notes: newPurchaseOrder.notes
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStockPurchases((prev) => [{
          id: data.order.id,
          supplier: suppliers.find((s) => s.id === newPurchaseOrder.supplier_id)?.name || "New Supplier",
          reference: newPurchaseOrder.reference || data.order.order_number,
          amount: data.order.total_amount,
          date: newPurchaseOrder.date,
          status: newPurchaseOrder.status
        }, ...prev]);
        setShowAddPurchaseModal(false);
        setNewPurchaseOrder({
          supplier_id: "",
          branch_id: "",
          reference: "",
          total_amount: "",
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          status: "pending",
          notes: ""
        });
        safeToast.success("Purchase order created successfully");
      } else {
        safeToast.error(data.message || "Failed to create purchase order");
      }
    } catch (e) {
      console.error("Failed to create purchase order:", e);
      safeToast.error("Failed to create purchase order");
    }
  };
  reactExports.useEffect(() => {
    if (activeSection === "purchase_orders") {
      fetchPurchaseOrders();
    }
  }, [activeSection, fetchPurchaseOrders]);
  const fetchCommunications = async () => {
    setIsLoading(true);
    try {
      const token2 = getStoredToken();
      const res = await fetch(buildUrl("/communications/history"), {
        headers: token2 ? {
          "Authorization": `Bearer ${token2}`
        } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessages(data.communications || []);
      }
    } catch (e) {
      console.error("Failed to fetch communications:", e);
    } finally {
      setIsLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (activeSection === "communication") {
      fetchCommunications();
    }
  }, [activeSection]);
  reactExports.useEffect(() => {
    if (activeSection === "repair_parts_inventory") {
      fetchRepairPartsInventory();
    }
  }, [activeSection, fetchRepairPartsInventory]);
  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedRepairs.size} repairs?`)) return;
    try {
      const token2 = getStoredToken();
      await Promise.all(Array.from(selectedRepairs).map((id) => fetch(buildUrl(`/api/repairs/${id}`), {
        method: "DELETE",
        headers: {
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        }
      })));
      setRepairs((prev) => prev.filter((r) => !selectedRepairs.has(r.id)));
      setSelectedRepairs(/* @__PURE__ */ new Set());
      safeToast.success("Repairs deleted successfully");
    } catch (e) {
      console.error("Failed to delete repairs:", e);
      safeToast.error("Failed to delete repairs");
    }
  };
  const handleBulkStatusUpdate = async (status) => {
    if (!confirm(`Are you sure you want to mark ${selectedRepairs.size} repairs as ${status}?`)) return;
    try {
      const token2 = getStoredToken();
      await Promise.all(Array.from(selectedRepairs).map((id) => fetch(buildUrl(`/repairs/${id}/status`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...token2 ? {
            "Authorization": `Bearer ${token2}`
          } : {}
        },
        body: JSON.stringify({
          status
        })
      })));
      setRepairs((prev) => prev.map((r) => selectedRepairs.has(r.id) ? {
        ...r,
        status
      } : r));
      setSelectedRepairs(/* @__PURE__ */ new Set());
      safeToast.success(`Repairs marked as ${status}`);
    } catch (e) {
      console.error("Failed to update repairs:", e);
      safeToast.error("Failed to update repairs");
    }
  };
  const userRole = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("admin_user") || "{}").role : "";
  const sidebarGroups = [{
    label: "OPERATIONS",
    icon: Activity,
    items: [{
      id: "bookings",
      icon: Calendar,
      label: "Online Bookings"
    }, {
      id: "walkin",
      icon: User,
      label: "Walk-in Bookings"
    }, {
      id: "repairs",
      icon: Wrench,
      label: "Repair Orders",
      badge: repairs.length > 0 ? repairs.length : null,
      badgeColor: "bg-amber-500"
    }, {
      id: "repair_tracking",
      icon: Activity,
      label: "Repair Tracking"
    }]
  }, {
    label: "SALES",
    icon: ShoppingCart,
    items: [{
      id: "online_sales",
      icon: ShoppingCart,
      label: "Online Sales"
    }, {
      id: "inhouse_sales",
      icon: ShoppingCart,
      label: "In-House Sales"
    }, {
      id: "invoices",
      icon: FileText,
      label: "Invoices"
    }, {
      id: "payments",
      icon: DollarSign,
      label: "Payments"
    }]
  }, {
    label: "PURCHASING",
    icon: Truck,
    items: [{
      id: "purchase_orders",
      icon: FileText,
      label: "Purchase Orders"
    }, {
      id: "stock_purchases",
      icon: Package,
      label: "Stock Purchases"
    }, {
      id: "supplier_management",
      icon: Users,
      label: "Supplier Management"
    }]
  }, {
    label: "INVENTORY",
    icon: Database,
    items: [{
      id: "inventory",
      icon: Package,
      label: "Products"
    }, {
      id: "repair_parts_inventory",
      icon: Wrench,
      label: "Repair Parts"
    }, {
      id: "inventory_management",
      icon: Database,
      label: "Inventory Management"
    }, {
      id: "stock_movements",
      icon: TrendingUp,
      label: "Stock Movements"
    }, {
      id: "low_stock_alerts",
      icon: CircleAlert,
      label: "Low Stock Alerts"
    }]
  }, {
    label: "CUSTOMERS",
    icon: Users,
    items: [{
      id: "customers",
      icon: Users,
      label: "Customers"
    }, {
      id: "communication",
      icon: MessageCircle,
      label: "Customer Communication"
    }, {
      id: "customer_history",
      icon: History,
      label: "Customer History"
    }]
  }, {
    label: "FINANCE",
    icon: DollarSign,
    items: [{
      id: "revenue",
      icon: TrendingUp,
      label: "Revenue"
    }, {
      id: "expenses",
      icon: FileText,
      label: "Expenses"
    }, {
      id: "finance",
      icon: Activity,
      label: "Financial Overview"
    }, {
      id: "profit_loss",
      icon: TrendingUp,
      label: "Profit & Loss"
    }, {
      id: "cash_flow",
      icon: DollarSign,
      label: "Cash Flow"
    }]
  }, {
    label: "REPORTS",
    icon: FileText,
    items: [{
      id: "analytics",
      icon: TrendingUp,
      label: "Analytics"
    }, {
      id: "activity",
      icon: Activity,
      label: "Activity Logs"
    }]
  }, {
    label: "ADMINISTRATION",
    icon: ShieldCheck,
    items: [{
      id: "staff",
      icon: User,
      label: "Staff Management"
    }, {
      id: "roles_permissions",
      icon: ShieldCheck,
      label: "Roles & Permissions"
    }, {
      id: "audit_logs",
      icon: History,
      label: "Audit Logs"
    }, {
      id: "settings",
      icon: ShieldCheck,
      label: "Settings"
    }]
  }];
  const filteredSidebarGroups = sidebarGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      if (userRole === "staff") {
        return ["walkin", "inhouse_sales"].includes(item.id);
      }
      return true;
    })
  })).filter((group) => group.items.length > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-[#0B0D17] text-slate-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 z-0 opacity-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex min-h-screen bg-[#0B0D17]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.aside, { initial: {
        x: -280
      }, animate: {
        x: 0
      }, className: "fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col border-r border-[#1F2235] bg-[#11131E]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center gap-3 border-b border-[#1F2235] px-6 bg-[#11131E]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[#6B46C1]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold tracking-wide text-white", children: "Fixora Admin" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 space-y-1 px-3 py-4 overflow-y-auto custom-scrollbar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveSection("dashboard"), className: `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all mb-4 ${activeSection === "dashboard" ? "bg-[#6B46C1] text-white shadow-sm" : "text-slate-400 hover:bg-[#1A1D27] hover:text-white"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" }),
            "Dashboard"
          ] }),
          filteredSidebarGroups.map((group, idx) => {
            const isOpen = openDropdowns[group.label];
            const hasActiveChild = group.items.some((item) => item.id === activeSection);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleDropdown(group.label), className: `flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${hasActiveChild && !isOpen ? "text-white bg-[#1A1D27]" : "text-slate-300 hover:bg-[#1A1D27] hover:text-white"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(group.icon, { className: `h-4 w-4 ${hasActiveChild ? "text-[#6B46C1]" : "text-slate-400"}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider", children: group.label })
                ] }),
                isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-slate-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-slate-500" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
                height: 0,
                opacity: 0
              }, animate: {
                height: "auto",
                opacity: 1
              }, exit: {
                height: 0,
                opacity: 0
              }, transition: {
                duration: 0.2
              }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 pt-1 pb-2 pl-9 pr-2 border-l-2 border-[#1A1D27] ml-5", children: group.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                console.log("Sidebar clicked, setting activeSection to:", item.id);
                setActiveSection(item.id);
              }, className: `flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-xs font-medium transition-all ${activeSection === item.id ? "bg-[#6B46C1] text-white shadow-sm" : "text-slate-400 hover:bg-[#1A1D27] hover:text-white"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap overflow-hidden text-ellipsis", children: item.label }) }),
                item.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white ${item.badgeColor}`, children: item.badge })
              ] }, item.id)) }) }) })
            ] }, idx);
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-[#1F2235] p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/profile", className: "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-[#1A1D27] hover:text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
            "My Account"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onLogout, className: "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-950/30 hover:text-rose-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            "Sign Out"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-[260px] flex-1 bg-[#0B0D17] min-h-screen", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#1F2235] bg-[#11131E] px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-lg font-bold text-white", children: [
            activeSection === "dashboard" && "Dashboard",
            activeSection === "repairs" && "Repair Management",
            activeSection === "customers" && "Customer Management",
            activeSection === "inventory" && "Inventory Management",
            activeSection === "staff" && "Staff Management",
            activeSection === "communication" && "Customer Communication",
            activeSection === "bookings" && "Appointment Bookings",
            activeSection === "walkin" && "Walk-in Intake",
            activeSection === "finance" && "Financial Overview",
            activeSection === "profit_loss" && "Profit & Loss",
            activeSection === "cash_flow" && "Cash Flow",
            activeSection === "repair_tracking" && "Repair Tracking",
            activeSection === "roles_permissions" && "Roles & Permissions",
            activeSection === "analytics" && "Analytics & Reports",
            activeSection === "activity" && "Activity Log",
            activeSection === "audit_logs" && "Audit Logs",
            activeSection === "settings" && "Business Settings"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BranchSelector, { token }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalSearch, { token }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationCenter, { token }),
            activeSection === "repairs" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: exportRepairsCSV, className: "border-[#2D3142] bg-[#1A1D27] text-slate-200 hover:bg-[#2D3142] hover:text-white font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-2 h-4 w-4" }),
              "Export CSV"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: fetchRepairs, disabled: isLoading, className: "border-[#2D3142] bg-[#1A1D27] text-slate-200 hover:bg-[#2D3142] hover:text-white font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}` }),
              "Refresh"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#6B46C1] text-xs font-bold text-white", children: "A" })
          ] })
        ] }),
        activeSection === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsx(MainDashboard, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-[#0B0D17] min-h-screen ${activeSection === "dashboard" ? "hidden" : "p-8"}`, children: [
          activeSection === "repairs" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Repairs", value: totalRepairs, icon: Database, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "In Workshop", value: inProgressRepairs, icon: Wrench, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Completed", value: completedRepairs, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Revenue", value: `£${totalRevenue.toFixed(0)}`, icon: TrendingUp, gradient: "from-amber-500 to-orange-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by name, phone, or tracking ID", value: search, onChange: (e) => setSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-slate-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Statuses" }),
                  statuses.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s.charAt(0).toUpperCase() + s.slice(1) }, s))
                ] })
              ] })
            ] }),
            selectedRepairs.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-slate-600", children: [
                selectedRepairs.size,
                " selected"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleBulkDelete, className: "border-rose-500 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                "Delete Selected"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleBulkStatusUpdate("completed"), className: "border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mr-2 h-4 w-4" }),
                "Mark Complete"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: selectedRepairs.size === filteredRepairs.length && filteredRepairs.length > 0, onChange: (e) => {
                    if (e.target.checked) {
                      setSelectedRepairs(new Set(filteredRepairs.map((r) => r.id)));
                    } else {
                      setSelectedRepairs(/* @__PURE__ */ new Set());
                    }
                  }, className: "rounded border-slate-300" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-24", children: "ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Device" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Priority" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Assigned Staff" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-20", children: "Actions" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginatedRepairs.length > 0 ? paginatedRepairs.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: selectedRepairs.has(r.id), onChange: (e) => {
                    const newSelected = new Set(selectedRepairs);
                    if (e.target.checked) {
                      newSelected.add(r.id);
                    } else {
                      newSelected.delete(r.id);
                    }
                    setSelectedRepairs(newSelected);
                  }, className: "h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 focus:ring-offset-0" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-mono text-sm text-cyan-600 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/admin/repairs/${r.id}`, className: "hover:underline hover:text-cyan-700", children: r.tracking_id }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-white", children: r.customer_name || "Unknown Customer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex items-center text-xs text-slate-500", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mr-1 h-3 w-3" }),
                      r.customer_phone || "No phone"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-slate-700", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-2 h-4 w-4 text-slate-400" }),
                    r.device_model || "Unknown device"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(r.status)}`, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }),
                      r.status === "collection" ? "Collection" : r.status.charAt(0).toUpperCase() + r.status.slice(1)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: r.status, onChange: (e) => updateStatus(r.tracking_id, e.target.value), className: "text-xs border border-[#1F2235] rounded-lg px-2 py-1 bg-[#11131E] text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: statuses.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, disabled: r.status === s, children: s === "collection" ? "Collection" : s.charAt(0).toUpperCase() + s.slice(1) }, s)) })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: r.priority || "normal", onChange: (e) => updatePriority(r.tracking_id, e.target.value), className: `text-xs border rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-violet-500 ${getPriorityStyle(r.priority)}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Low" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "normal", children: "Normal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "High" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "urgent", children: "Urgent" })
                  ] }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: r.technician_id || "", onChange: (e) => updateTechnician(r.tracking_id, e.target.value), className: "text-xs border border-[#1F2235] rounded-lg px-2 py-1 bg-[#11131E] text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Unassigned" }),
                    staff.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id, children: s.name }, s.id))
                  ] }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-xs text-slate-500", children: new Date(r.created_at).toLocaleDateString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedRepairForTimeline({
                      id: r.id,
                      trackingId: r.tracking_id
                    }), className: "text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 p-2 rounded-lg transition-colors", title: "View timeline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteRepair(r.tracking_id), className: "text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-2 rounded-lg transition-colors", title: "Delete repair", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
                  ] }) })
                ] }, r.id)) : null })
              ] }) }),
              filteredRepairs.length === 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No repairs found" })
              ] }),
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600", children: "Loading repairs..." })
              ] }),
              filteredRepairs.length > 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-t border-[#1F2235]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-slate-500", children: [
                  "Showing ",
                  (repairsPage - 1) * repairsPerPage + 1,
                  " to ",
                  Math.min(repairsPage * repairsPerPage, filteredRepairs.length),
                  " of ",
                  filteredRepairs.length,
                  " repairs"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRepairsPage((prev) => Math.max(1, prev - 1)), disabled: repairsPage === 1, className: "px-3 py-1.5 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 hover:bg-[#1A1D27] disabled:opacity-50 disabled:cursor-not-allowed", children: "Previous" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-slate-400", children: [
                    "Page ",
                    repairsPage,
                    " of ",
                    totalPages(filteredRepairs, repairsPerPage)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRepairsPage((prev) => Math.min(totalPages(filteredRepairs, repairsPerPage), prev + 1)), disabled: repairsPage === totalPages(filteredRepairs, repairsPerPage), className: "px-3 py-1.5 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 hover:bg-[#1A1D27] disabled:opacity-50 disabled:cursor-not-allowed", children: "Next" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: repairsPerPage, onChange: (e) => {
                    setRepairsPerPage(Number(e.target.value));
                    setRepairsPage(1);
                  }, className: "ml-4 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10", children: "10 per page" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "25", children: "25 per page" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "50", children: "50 per page" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "100", children: "100 per page" })
                  ] })
                ] })
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
          }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/admin/customers/${customer.phone}`, className: "hover:underline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-white text-lg", children: customer.name }) }),
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
          activeSection === "inventory" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Products", value: products.length, icon: Package, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "In Stock", value: products.filter((p) => p.stock_quantity > 0).length, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Low Stock", value: products.filter((p) => p.stock_quantity > 0 && p.stock_quantity < 5).length, icon: CircleAlert, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Out of Stock", value: products.filter((p) => p.stock_quantity === 0).length, icon: Circle, gradient: "from-rose-500 to-pink-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by name, brand, or model", value: inventorySearch, onChange: (e) => setInventorySearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-slate-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), className: "h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Categories" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "smartphones", children: "Smartphones" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "laptops", children: "Laptops" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tablets", children: "Tablets" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "accessories", children: "Accessories" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowAddProductModal(true), className: "bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                  "Add Product"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowImportModal(true), variant: "outline", className: "border-[#1F2235] text-white hover:bg-slate-800", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2" }),
                  "Import CSV/Excel"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Product" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Stock" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-20", children: "Actions" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredProducts.length > 0 ? filteredProducts.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-white", children: product.name || "Unnamed product" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-xs text-slate-500", children: [
                      product.brand || "",
                      " ",
                      product.model || ""
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-[#1A1D27] text-slate-300", children: product.category || "Uncategorized" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 font-semibold text-white", children: [
                    "£",
                    product.price.toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-semibold ${product.stock_quantity === 0 ? "text-rose-600" : product.stock_quantity < 5 ? "text-amber-600" : "text-emerald-600"}`, children: product.stock_quantity }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${product.stock_quantity === 0 ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : product.stock_quantity < 5 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }),
                    product.stock_quantity === 0 ? "Out of Stock" : product.stock_quantity < 5 ? "Low Stock" : "In Stock"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEditProduct(product), className: "text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 p-2 rounded-lg transition-colors", title: "Edit product", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDeleteProduct(product.id), className: "text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-2 rounded-lg transition-colors", title: "Delete product", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
                  ] }) })
                ] }, product.id)) : null })
              ] }) }),
              filteredProducts.length === 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No products found" })
              ] }),
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600", children: "Loading products..." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAddProductModal && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, exit: {
              opacity: 0
            }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", onClick: () => setShowAddProductModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              scale: 0.95
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.95
            }, className: "bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Add New Product" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Product Name *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newProduct.name, onChange: (e) => setNewProduct({
                    ...newProduct,
                    name: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newProduct.category, onChange: (e) => setNewProduct({
                    ...newProduct,
                    category: e.target.value
                  }), className: "w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "smartphones", children: "Smartphones" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "laptops", children: "Laptops" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tablets", children: "Tablets" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "accessories", children: "Accessories" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Brand" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newProduct.brand, onChange: (e) => setNewProduct({
                      ...newProduct,
                      brand: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Model" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newProduct.model, onChange: (e) => setNewProduct({
                      ...newProduct,
                      model: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Condition" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newProduct.condition, onChange: (e) => setNewProduct({
                    ...newProduct,
                    condition: e.target.value
                  }), className: "w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "New" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "refurbished", children: "Refurbished" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "used", children: "Used" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Price (£) *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: newProduct.price, onChange: (e) => setNewProduct({
                      ...newProduct,
                      price: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Stock Quantity *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: newProduct.stock_quantity, onChange: (e) => setNewProduct({
                      ...newProduct,
                      stock_quantity: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newProduct.description, onChange: (e) => setNewProduct({
                    ...newProduct,
                    description: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", placeholder: "Optional description..." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Image URL" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newProduct.image_url, onChange: (e) => setNewProduct({
                    ...newProduct,
                    image_url: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", placeholder: "Optional image URL..." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowAddProductModal(false), variant: "outline", className: "flex-1 border-[#1F2235] text-white hover:bg-slate-800", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCreateProduct, className: "flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: "Add Product" })
                ] })
              ] })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showImportModal && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, exit: {
              opacity: 0
            }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", onClick: () => setShowImportModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              scale: 0.95
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.95
            }, className: "bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Import Products" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "CSV/Excel File" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: ".csv,.xlsx,.xls", onChange: (e) => setImportFile(e.target.files?.[0] || null), className: "border-[#1F2235] bg-[#1A1D27] text-white mt-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Supported formats: CSV, Excel (.xlsx, .xls)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D27] rounded-lg p-4 border border-[#1F2235]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 mb-2", children: "Expected CSV columns:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs text-slate-300 block", children: "name, description, category, brand, model, condition, price, stock_quantity, image_url" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowImportModal(false), variant: "outline", className: "flex-1 border-[#1F2235] text-white hover:bg-slate-800", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleImportProducts, className: "flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: "Import" })
                ] })
              ] })
            ] }) }) })
          ] }),
          activeSection === "repair_parts_inventory" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-6 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-1", children: "Repair Parts Inventory" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-violet-100", children: "Manage your repair parts stock efficiently" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowAddRepairPartModal(true), className: "bg-white text-violet-600 hover:bg-violet-50 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                "Add New Part"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Parts", value: repairPartsInventory.length, icon: Wrench, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "In Stock", value: repairPartsInventory.filter((p) => p.stock_quantity > 0).length, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Low Stock", value: repairPartsInventory.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= p.min_stock_level).length, icon: CircleAlert, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Out of Stock", value: repairPartsInventory.filter((p) => p.stock_quantity === 0).length, icon: Circle, gradient: "from-rose-500 to-pink-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by name, SKU, or brand", value: repairPartsSearch, onChange: (e) => setRepairPartsSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-slate-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: repairPartsTypeFilter, onChange: (e) => setRepairPartsTypeFilter(e.target.value), className: "h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Types" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "screen", children: "Screens" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "battery", children: "Batteries" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tool", children: "Tools" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cable", children: "Cables" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowAddRepairPartModal(true), className: "bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                  "Add Part"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Part" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "SKU" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Stock" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Unit Cost" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Location" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Actions" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: repairPartsInventory.filter((part) => {
                  const matchesSearch = part.name.toLowerCase().includes(repairPartsSearch.toLowerCase()) || part.sku && part.sku.toLowerCase().includes(repairPartsSearch.toLowerCase()) || part.brand && part.brand.toLowerCase().includes(repairPartsSearch.toLowerCase());
                  const matchesType = repairPartsTypeFilter === "all" || part.part_type === repairPartsTypeFilter;
                  return matchesSearch && matchesType;
                }).map((part) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-white", children: part.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-400", children: [
                      part.brand,
                      " ",
                      part.model
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 capitalize", children: part.part_type }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-300", children: part.sku || "-" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium ${part.stock_quantity <= part.min_stock_level ? "text-amber-500" : "text-white"}`, children: part.stock_quantity }),
                    part.stock_quantity <= part.min_stock_level && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-amber-500" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 text-slate-300", children: [
                    "£",
                    part.unit_cost ? parseFloat(part.unit_cost).toFixed(2) : "0.00"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-300", children: part.location || "-" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
                      setEditingRepairPart(part);
                      setShowEditRepairPartModal(true);
                    }, className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => handleDeleteRepairPart(part.id), className: "text-slate-400 hover:text-red-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
                  ] }) })
                ] }, part.id)) })
              ] }) }),
              repairPartsInventory.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-12 text-center text-slate-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "mx-auto h-12 w-12 mb-4 opacity-50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No repair parts found" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAddRepairPartModal && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, exit: {
              opacity: 0
            }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", onClick: () => setShowAddRepairPartModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              scale: 0.95
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.95
            }, className: "bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Add Repair Part" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newRepairPart.name, onChange: (e) => setNewRepairPart({
                    ...newRepairPart,
                    name: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Part Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newRepairPart.part_type, onChange: (e) => setNewRepairPart({
                    ...newRepairPart,
                    part_type: e.target.value
                  }), className: "w-full rounded-xl border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-white", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "screen", children: "Screen" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "battery", children: "Battery" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tool", children: "Tool" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cable", children: "Cable" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Brand" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newRepairPart.brand, onChange: (e) => setNewRepairPart({
                      ...newRepairPart,
                      brand: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Model" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newRepairPart.model, onChange: (e) => setNewRepairPart({
                      ...newRepairPart,
                      model: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "SKU" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newRepairPart.sku, onChange: (e) => setNewRepairPart({
                    ...newRepairPart,
                    sku: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Supplier" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newRepairPart.supplier, onChange: (e) => setNewRepairPart({
                    ...newRepairPart,
                    supplier: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Unit Cost (£)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: newRepairPart.unit_cost, onChange: (e) => setNewRepairPart({
                      ...newRepairPart,
                      unit_cost: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true, min: "0", step: "0.01" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Stock Quantity" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: newRepairPart.stock_quantity, onChange: (e) => setNewRepairPart({
                      ...newRepairPart,
                      stock_quantity: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true, min: "0" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Min Stock Level" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: newRepairPart.min_stock_level, onChange: (e) => setNewRepairPart({
                      ...newRepairPart,
                      min_stock_level: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true, min: "0" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Location" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newRepairPart.location, onChange: (e) => setNewRepairPart({
                      ...newRepairPart,
                      location: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newRepairPart.notes, onChange: (e) => setNewRepairPart({
                    ...newRepairPart,
                    notes: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowAddRepairPartModal(false), variant: "outline", className: "flex-1 border-[#1F2235] text-white hover:bg-slate-800", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCreateRepairPart, className: "flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: "Add Part" })
                ] })
              ] })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showEditRepairPartModal && editingRepairPart && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, exit: {
              opacity: 0
            }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", onClick: () => setShowEditRepairPartModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              scale: 0.95
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.95
            }, className: "bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Edit Repair Part" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editingRepairPart.name, onChange: (e) => setEditingRepairPart({
                    ...editingRepairPart,
                    name: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Part Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editingRepairPart.part_type, onChange: (e) => setEditingRepairPart({
                    ...editingRepairPart,
                    part_type: e.target.value
                  }), className: "w-full rounded-xl border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-white", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "screen", children: "Screen" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "battery", children: "Battery" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tool", children: "Tool" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cable", children: "Cable" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Brand" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editingRepairPart.brand, onChange: (e) => setEditingRepairPart({
                      ...editingRepairPart,
                      brand: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Model" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editingRepairPart.model, onChange: (e) => setEditingRepairPart({
                      ...editingRepairPart,
                      model: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "SKU" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editingRepairPart.sku, onChange: (e) => setEditingRepairPart({
                    ...editingRepairPart,
                    sku: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Supplier" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editingRepairPart.supplier, onChange: (e) => setEditingRepairPart({
                    ...editingRepairPart,
                    supplier: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Unit Cost (£)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: editingRepairPart.unit_cost, onChange: (e) => setEditingRepairPart({
                      ...editingRepairPart,
                      unit_cost: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true, min: "0", step: "0.01" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Stock Quantity" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: editingRepairPart.stock_quantity, onChange: (e) => setEditingRepairPart({
                      ...editingRepairPart,
                      stock_quantity: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true, min: "0" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Min Stock Level" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: editingRepairPart.min_stock_level, onChange: (e) => setEditingRepairPart({
                      ...editingRepairPart,
                      min_stock_level: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true, min: "0" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Location" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editingRepairPart.location, onChange: (e) => setEditingRepairPart({
                      ...editingRepairPart,
                      location: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editingRepairPart.notes, onChange: (e) => setEditingRepairPart({
                    ...editingRepairPart,
                    notes: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowEditRepairPartModal(false), variant: "outline", className: "flex-1 border-[#1F2235] text-white hover:bg-slate-800", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleUpdateRepairPart, className: "flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: "Update" })
                ] })
              ] })
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showEditProductModal && editingProduct && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, exit: {
              opacity: 0
            }, onClick: () => setShowEditProductModal(false), className: "fixed inset-0 z-50 bg-black/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0,
              scale: 0.95
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.95
            }, className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#11131E] rounded-lg shadow-xl max-w-md w-full p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Edit Product" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-slate-300", children: "Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editingProduct.name || "", onChange: (e) => setEditingProduct({
                    ...editingProduct,
                    name: e.target.value
                  }), className: "mt-1", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-slate-300", children: "Brand" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editingProduct.brand || "", onChange: (e) => setEditingProduct({
                    ...editingProduct,
                    brand: e.target.value
                  }), className: "mt-1", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-slate-300", children: "Model" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editingProduct.model || "", onChange: (e) => setEditingProduct({
                    ...editingProduct,
                    model: e.target.value
                  }), className: "mt-1", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-slate-300", children: "Price (£)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: editingProduct.price || "", onChange: (e) => setEditingProduct({
                    ...editingProduct,
                    price: parseFloat(e.target.value) || 0
                  }), className: "mt-1", required: true, min: "0", step: "0.01" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-slate-300", children: "Stock Quantity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: editingProduct.stock_quantity || "", onChange: (e) => setEditingProduct({
                    ...editingProduct,
                    stock_quantity: parseInt(e.target.value) || 0
                  }), className: "mt-1", required: true, min: "0" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-slate-300", children: "Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editingProduct.category || "", onChange: (e) => setEditingProduct({
                    ...editingProduct,
                    category: e.target.value
                  }), className: "mt-1 w-full rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "smartphones", children: "Smartphones" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "laptops", children: "Laptops" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tablets", children: "Tablets" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "accessories", children: "Accessories" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowEditProductModal(false), variant: "outline", className: "flex-1", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSaveProduct, className: "flex-1", children: "Save Changes" })
              ] })
            ] }) })
          ] }) }),
          activeSection === "staff" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Staff", value: staff.length, icon: Users, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Active Staff", value: staff.filter((s) => s.is_active).length, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Staff", value: staff.filter((s) => s.role === "staff").length, icon: ShieldCheck, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Super Admin", value: staff.filter((s) => s.role === "SUPER_ADMIN").length, icon: Wrench, gradient: "from-amber-500 to-orange-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by name, email, or role", value: staffSearch, onChange: (e) => setStaffSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-slate-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: roleFilter, onChange: (e) => setRoleFilter(e.target.value), className: "h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Roles" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SUPER_ADMIN", children: "Super Admin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "staff", children: "Staff" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "customer", children: "Customer" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Staff Member" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Role" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Joined" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-20", children: "Actions" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredStaff.length > 0 ? filteredStaff.map((staffMember, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white font-semibold", children: staffMember.name?.charAt(0).toUpperCase() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-white", children: staffMember.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-xs text-slate-500", children: staffMember.phone || "No phone" })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400", children: staffMember.email }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${staffMember.role === "SUPER_ADMIN" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" : staffMember.role === "staff" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-slate-100 text-slate-700 bg-[#1A1D27] dark:text-slate-300"}`, children: staffMember.role }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${staffMember.is_active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }),
                    staffMember.is_active ? "Active" : "Inactive"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400", children: new Date(staffMember.created_at).toLocaleDateString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEditStaff(staffMember), className: "text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 p-2 rounded-lg transition-colors", title: "Edit staff", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleToggleStaffStatus(staffMember), className: "text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 p-2 rounded-lg transition-colors", title: staffMember.is_active ? "Deactivate" : "Activate", children: staffMember.is_active ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }) })
                  ] }) })
                ] }, staffMember.id)) : null })
              ] }) }),
              filteredStaff.length === 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No staff members found" })
              ] }),
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600", children: "Loading staff..." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showEditStaffModal && editingStaff && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
                opacity: 0
              }, animate: {
                opacity: 1
              }, exit: {
                opacity: 0
              }, onClick: () => setShowEditStaffModal(false), className: "fixed inset-0 z-50 bg-black/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
                opacity: 0,
                scale: 0.95
              }, animate: {
                opacity: 1,
                scale: 1
              }, exit: {
                opacity: 0,
                scale: 0.95
              }, className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#11131E] rounded-lg shadow-xl max-w-md w-full p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Edit Staff Member" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-slate-300", children: "Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editingStaff.name || "", onChange: (e) => setEditingStaff({
                      ...editingStaff,
                      name: e.target.value
                    }), className: "mt-1", required: true })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-slate-300", children: "Email" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: editingStaff.email || "", onChange: (e) => setEditingStaff({
                      ...editingStaff,
                      email: e.target.value
                    }), className: "mt-1", required: true })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-slate-300", children: "Role" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editingStaff.role || "", onChange: (e) => setEditingStaff({
                      ...editingStaff,
                      role: e.target.value
                    }), className: "mt-1 w-full rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SUPER_ADMIN", children: "Super Admin" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "staff", children: "Staff" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "customer", children: "Customer" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowEditStaffModal(false), variant: "outline", className: "flex-1", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSaveStaff, className: "flex-1", children: "Save Changes" })
                ] })
              ] }) })
            ] }) })
          ] }),
          activeSection === "communication" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Messages Sent", value: messages.length, icon: Send, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Emails Sent", value: emailsSent, icon: Mail, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "SMS Sent", value: smsSent, icon: Phone, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Response Rate", value: "92%", icon: CircleCheck, gradient: "from-amber-500 to-orange-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowEmailModal(true), className: "bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mr-2 h-4 w-4" }),
                "Send Email"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowSmsModal(true), variant: "outline", className: "border-violet-500 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mr-2 h-4 w-4" }),
                "Send SMS"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowBroadcastModal(true), variant: "outline", className: "border-cyan-500 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
                "Broadcast Message"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Communication History" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Recipient" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Subject" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Sent" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: messages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${msg.type === "email" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"}`, children: [
                    msg.type === "email" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
                    msg.type
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400", children: msg.recipient }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-white", children: msg.subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${msg.status === "sent" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }),
                    msg.status
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400", children: new Date(msg.sent_at).toLocaleDateString() })
                ] }, msg.id)) })
              ] }) }),
              messages.length === 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No communication history yet" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showEmailModal && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, exit: {
              opacity: 0
            }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", onClick: () => setShowEmailModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              scale: 0.95
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.95
            }, className: "bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Send Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Recipient Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", placeholder: "customer@example.com", className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Subject" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Email subject", className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Message" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: "Your message...", className: "w-full h-32 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowEmailModal(false), variant: "outline", className: "flex-1 border-[#1F2235] text-white hover:bg-slate-800", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
                    setShowEmailModal(false);
                    setEmailsSent((prev) => prev + 1);
                    safeToast.success("Email sent successfully");
                  }, className: "flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: "Send Email" })
                ] })
              ] })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showSmsModal && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, exit: {
              opacity: 0
            }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", onClick: () => setShowSmsModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              scale: 0.95
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.95
            }, className: "bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Send SMS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Phone Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "tel", placeholder: "+44 7415 278767", className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Message" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: "Your SMS message...", className: "w-full h-32 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowSmsModal(false), variant: "outline", className: "flex-1 border-[#1F2235] text-white hover:bg-slate-800", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
                    setShowSmsModal(false);
                    setSmsSent((prev) => prev + 1);
                    safeToast.success("SMS sent successfully");
                  }, className: "flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: "Send SMS" })
                ] })
              ] })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showBroadcastModal && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, exit: {
              opacity: 0
            }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", onClick: () => setShowBroadcastModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              scale: 0.95
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.95
            }, className: "bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Broadcast Message" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Recipient Group" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all_customers", children: "All Customers" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active_repairs", children: "Customers with Active Repairs" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "recent_purchases", children: "Recent Purchases" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Channel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "email", children: "Email" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sms", children: "SMS" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "both", children: "Both Email & SMS" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Message" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: "Your broadcast message...", className: "w-full h-32 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowBroadcastModal(false), variant: "outline", className: "flex-1 border-[#1F2235] text-white hover:bg-slate-800", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
                    setShowBroadcastModal(false);
                    safeToast.success("Broadcast sent successfully");
                  }, className: "flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: "Send Broadcast" })
                ] })
              ] })
            ] }) }) })
          ] }),
          activeSection === "expenses" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Expenses", value: `£${expenses.reduce((sum, e) => sum + (e.amount || 0), 0).toFixed(0)}`, icon: DollarSign, gradient: "from-rose-500 to-red-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "This Month", value: `£${expenses.filter((e) => new Date(e.date).getMonth() === (/* @__PURE__ */ new Date()).getMonth()).reduce((sum, e) => sum + (e.amount || 0), 0).toFixed(0)}`, icon: Calendar, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "This Week", value: `£${expenses.filter((e) => {
                const now = /* @__PURE__ */ new Date();
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
                return new Date(e.date) >= weekAgo;
              }).reduce((sum, e) => sum + (e.amount || 0), 0).toFixed(0)}`, icon: Activity, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Pending", value: expenses.filter((e) => e.status === "pending").length, icon: Clock, gradient: "from-blue-500 to-cyan-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by description or category", value: expenseSearch, onChange: (e) => setExpenseSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-slate-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: expenseCategoryFilter, onChange: (e) => setExpenseCategoryFilter(e.target.value), className: "h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Categories" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rent", children: "Rent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "utilities", children: "Utilities" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "supplies", children: "Supplies" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "salaries", children: "Salaries" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Expense Tracking" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: expenses.filter((e) => {
                  const matchSearch = e.description?.toLowerCase().includes(expenseSearch.toLowerCase()) || e.category?.toLowerCase().includes(expenseSearch.toLowerCase());
                  const matchCategory = expenseCategoryFilter === "all" || e.category === expenseCategoryFilter;
                  return matchSearch && matchCategory;
                }).map((expense, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: expense.description || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: expense.category || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-rose-400", children: [
                    "£",
                    (expense.amount || 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: new Date(expense.date).toLocaleDateString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${expense.status === "paid" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`, children: expense.status || "pending" }) })
                ] }, expense.id)) })
              ] }) }),
              expenses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No expenses recorded yet" })
              ] })
            ] })
          ] }),
          activeSection === "revenue" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Revenue", value: `£${(revenueData.reduce((sum, r) => sum + (r.amount || 0), 0) + totalRevenue).toFixed(0)}`, icon: DollarSign, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "This Month", value: `£${revenueData.filter((r) => new Date(r.date).getMonth() === (/* @__PURE__ */ new Date()).getMonth()).reduce((sum, r) => sum + (r.amount || 0), 0).toFixed(0)}`, icon: Calendar, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "This Week", value: `£${revenueData.filter((r) => {
                const now = /* @__PURE__ */ new Date();
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
                return new Date(r.date) >= weekAgo;
              }).reduce((sum, r) => sum + (r.amount || 0), 0).toFixed(0)}`, icon: Activity, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Today", value: `£${revenueData.filter((r) => new Date(r.date).toDateString() === (/* @__PURE__ */ new Date()).toDateString()).reduce((sum, r) => sum + (r.amount || 0), 0).toFixed(0)}`, icon: Clock, gradient: "from-amber-500 to-orange-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by source or description", value: revenueSearch, onChange: (e) => setRevenueSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Revenue Overview" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Source" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: revenueData.filter((r) => {
                  const matchSearch = r.source?.toLowerCase().includes(revenueSearch.toLowerCase()) || r.description?.toLowerCase().includes(revenueSearch.toLowerCase());
                  return matchSearch;
                }).map((revenue, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: revenue.source || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: revenue.description || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-emerald-400", children: [
                    "£",
                    (revenue.amount || 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: new Date(revenue.date).toLocaleDateString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${revenue.status === "received" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`, children: revenue.status || "pending" }) })
                ] }, revenue.id)) })
              ] }) }),
              revenueData.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No revenue records yet" })
              ] })
            ] })
          ] }),
          activeSection === "customer_history" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Customers", value: customers.length, icon: Users, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Active Customers", value: customers.filter((c) => c.lastRepair && new Date(c.lastRepair) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3)).length, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Repairs", value: totalRepairs, icon: Wrench, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Avg Repairs/Customer", value: customers.length > 0 ? (totalRepairs / customers.length).toFixed(1) : "0", icon: TrendingUp, gradient: "from-amber-500 to-orange-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by name or phone", value: customerHistorySearch, onChange: (e) => setCustomerHistorySearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Customer History" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Total Repairs" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Last Repair" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: customers.filter((c) => {
                  const matchSearch = c.name?.toLowerCase().includes(customerHistorySearch.toLowerCase()) || c.phone?.includes(customerHistorySearch);
                  return matchSearch;
                }).map((customer, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: customer.name || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: customer.phone || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-violet-400", children: customer.repairCount || 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: customer.lastRepair ? new Date(customer.lastRepair).toLocaleDateString() : "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${customer.lastRepair && new Date(customer.lastRepair) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3) ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`, children: customer.lastRepair && new Date(customer.lastRepair) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3) ? "Active" : "Inactive" }) })
                ] }, customer.phone)) })
              ] }) }),
              customers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No customer history yet" })
              ] })
            ] })
          ] }),
          activeSection === "low_stock_alerts" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Critical Items", value: lowStockItems?.filter((i) => i?.stock <= 0).length ?? 0, icon: CircleAlert, gradient: "from-rose-500 to-red-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Low Stock", value: lowStockItems?.filter((i) => i?.stock > 0 && i?.stock <= 5).length ?? 0, icon: Package, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Out of Stock", value: lowStockItems?.filter((i) => i?.stock <= 0).length ?? 0, icon: CircleX, gradient: "from-slate-500 to-slate-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Restock Orders", value: lowStockItems?.filter((i) => i?.restockOrdered).length ?? 0, icon: FileText, gradient: "from-blue-500 to-cyan-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Low Stock Alerts" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Product" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Current Stock" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Min Level" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Action" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: lowStockItems && lowStockItems.length > 0 && lowStockItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: item?.name || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-rose-400", children: item?.stock ?? 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: item?.minLevel ?? 5 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${(item?.stock ?? 0) <= 0 ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : (item?.stock ?? 0) <= 5 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`, children: (item?.stock ?? 0) <= 0 ? "Out of Stock" : (item?.stock ?? 0) <= 5 ? "Low Stock" : "OK" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-violet-400 hover:text-violet-300 text-xs font-medium", children: "Order Restock" }) })
                ] }, item?.id || idx)) })
              ] }) }),
              lowStockItems.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No low stock alerts" })
              ] })
            ] })
          ] }),
          activeSection === "stock_movements" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Movements", value: stockMovements.length, icon: TrendingUp, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Stock In", value: stockMovements.filter((m) => m.type === "in").length, icon: Package, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Stock Out", value: stockMovements.filter((m) => m.type === "out").length, icon: Package, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Adjustments", value: stockMovements.filter((m) => m.type === "adjustment").length, icon: Activity, gradient: "from-violet-500 to-purple-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by product or reference", value: stockMovementSearch, onChange: (e) => setStockMovementSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Stock Movement History" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Product" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Quantity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Reference" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Date" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: stockMovements.filter((m) => {
                  const matchSearch = m.product?.toLowerCase().includes(stockMovementSearch.toLowerCase()) || m.reference?.toLowerCase().includes(stockMovementSearch.toLowerCase());
                  return matchSearch;
                }).map((movement, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: movement.product || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${movement.type === "in" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : movement.type === "out" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"}`, children: movement.type || "N/A" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-slate-400", children: movement.quantity || 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: movement.reference || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: new Date(movement.date).toLocaleDateString() })
                ] }, movement.id)) })
              ] }) }),
              stockMovements.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No stock movements recorded" })
              ] })
            ] })
          ] }),
          activeSection === "inventory_management" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Items", value: inventoryItems.length, icon: Package, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "In Stock", value: inventoryItems.filter((i) => i.stock > 0).length, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Low Stock", value: inventoryItems.filter((i) => i.stock > 0 && i.stock <= 5).length, icon: CircleAlert, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Stock Value", value: `£${inventoryItems.reduce((sum, i) => sum + (i.stock || 0) * (i.price || 0), 0).toFixed(0)}`, icon: DollarSign, gradient: "from-violet-500 to-purple-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by name or SKU", value: inventoryManagementSearch, onChange: (e) => setInventoryManagementSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Inventory Overview" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Product" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "SKU" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Stock" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: inventoryItems.filter((i) => {
                  const matchSearch = i.name?.toLowerCase().includes(inventoryManagementSearch.toLowerCase()) || i.sku?.toLowerCase().includes(inventoryManagementSearch.toLowerCase());
                  return matchSearch;
                }).map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: item.name || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: item.sku || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-slate-400", children: item.stock || 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-slate-400", children: [
                    "£",
                    (item.price || 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${item.stock <= 0 ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : item.stock <= 5 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`, children: item.stock <= 0 ? "Out of Stock" : item.stock <= 5 ? "Low Stock" : "In Stock" }) })
                ] }, item.id)) })
              ] }) }),
              inventoryItems.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No inventory items yet" })
              ] })
            ] })
          ] }),
          activeSection === "supplier_management" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Suppliers", value: suppliers.length, icon: Users, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Active", value: suppliers.filter((s) => s.isActive).length, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Pending Orders", value: suppliers.filter((s) => s.pendingOrders > 0).reduce((sum, s) => sum + s.pendingOrders, 0), icon: Clock, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Orders", value: suppliers.reduce((sum, s) => sum + (s.totalOrders || 0), 0), icon: FileText, gradient: "from-violet-500 to-purple-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by name or contact", value: supplierSearch, onChange: (e) => setSupplierSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowAddSupplierModal(true), className: "bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                "Add Supplier"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Suppliers" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Supplier" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Contact" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Location" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Orders" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: suppliers.filter((s) => {
                  const matchSearch = s.name?.toLowerCase().includes(supplierSearch.toLowerCase()) || s.contact?.toLowerCase().includes(supplierSearch.toLowerCase());
                  return matchSearch;
                }).map((supplier, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: supplier.name || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: supplier.contact || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: supplier.location || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${supplier.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`, children: supplier.isActive ? "Active" : "Inactive" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-slate-400", children: supplier.totalOrders || 0 })
                ] }, supplier.id)) })
              ] }) }),
              suppliers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No suppliers yet" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAddSupplierModal && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, exit: {
              opacity: 0
            }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", onClick: () => setShowAddSupplierModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              scale: 0.95
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.95
            }, className: "bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Add New Supplier" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Supplier Name *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newSupplier.name, onChange: (e) => setNewSupplier({
                    ...newSupplier,
                    name: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Contact Person *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newSupplier.contact, onChange: (e) => setNewSupplier({
                    ...newSupplier,
                    contact: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: newSupplier.email, onChange: (e) => setNewSupplier({
                    ...newSupplier,
                    email: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newSupplier.phone, onChange: (e) => setNewSupplier({
                    ...newSupplier,
                    phone: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newSupplier.address, onChange: (e) => setNewSupplier({
                    ...newSupplier,
                    address: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newSupplier.notes, onChange: (e) => setNewSupplier({
                    ...newSupplier,
                    notes: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", placeholder: "Optional notes..." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowAddSupplierModal(false), variant: "outline", className: "flex-1 border-[#1F2235] text-white hover:bg-slate-800", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCreateSupplier, className: "flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: "Add Supplier" })
                ] })
              ] })
            ] }) }) })
          ] }),
          activeSection === "stock_purchases" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Purchases", value: `£${stockPurchases.reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`, icon: Package, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "This Month", value: `£${stockPurchases.filter((p) => new Date(p.date).getMonth() === (/* @__PURE__ */ new Date()).getMonth()).reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`, icon: Calendar, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Pending", value: stockPurchases.filter((p) => p.status === "pending").length, icon: Clock, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Completed", value: stockPurchases.filter((p) => p.status === "completed").length, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by supplier or reference", value: stockPurchaseSearch, onChange: (e) => setStockPurchaseSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowAddPurchaseModal(true), className: "bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                "Add Purchase Order"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Stock Purchases" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Supplier" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Reference" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: stockPurchases.filter((p) => {
                  const matchSearch = p.supplier?.toLowerCase().includes(stockPurchaseSearch.toLowerCase()) || p.reference?.toLowerCase().includes(stockPurchaseSearch.toLowerCase());
                  return matchSearch;
                }).map((purchase, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: purchase.supplier || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: purchase.reference || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-emerald-400", children: [
                    "£",
                    (purchase.amount || 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: new Date(purchase.date).toLocaleDateString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${purchase.status === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`, children: purchase.status || "pending" }) })
                ] }, purchase.id)) })
              ] }) }),
              stockPurchases.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No stock purchases yet" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAddPurchaseModal && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, exit: {
              opacity: 0
            }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", onClick: () => setShowAddPurchaseModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              scale: 0.95
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.95
            }, className: "bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Create Purchase Order" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Supplier" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newPurchaseOrder.supplier_id, onChange: (e) => setNewPurchaseOrder({
                    ...newPurchaseOrder,
                    supplier_id: e.target.value
                  }), className: "w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select supplier..." }),
                    suppliers.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id, children: s.name }, s.id))
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Reference" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newPurchaseOrder.reference, onChange: (e) => setNewPurchaseOrder({
                    ...newPurchaseOrder,
                    reference: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", placeholder: "PO-001 or leave blank for auto" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Total Amount (£)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: newPurchaseOrder.total_amount, onChange: (e) => setNewPurchaseOrder({
                      ...newPurchaseOrder,
                      total_amount: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: newPurchaseOrder.date, onChange: (e) => setNewPurchaseOrder({
                      ...newPurchaseOrder,
                      date: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newPurchaseOrder.status, onChange: (e) => setNewPurchaseOrder({
                    ...newPurchaseOrder,
                    status: e.target.value
                  }), className: "w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "approved", children: "Approved" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "in_transit", children: "In Transit" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "Completed" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newPurchaseOrder.notes, onChange: (e) => setNewPurchaseOrder({
                    ...newPurchaseOrder,
                    notes: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", placeholder: "Optional notes..." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowAddPurchaseModal(false), variant: "outline", className: "flex-1 border-[#1F2235] text-white hover:bg-slate-800", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCreatePurchaseOrder, className: "flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: "Create Order" })
                ] })
              ] })
            ] }) }) })
          ] }),
          activeSection === "purchase_orders" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Orders", value: purchaseOrders.length, icon: FileText, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Pending", value: purchaseOrders.filter((o) => o.status === "pending").length, icon: Clock, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "In Transit", value: purchaseOrders.filter((o) => o.status === "in_transit").length, icon: Truck, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Received", value: purchaseOrders.filter((o) => o.status === "received").length, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by order ID or supplier", value: purchaseOrderSearch, onChange: (e) => setPurchaseOrderSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Purchase Orders" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Order ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Supplier" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Items" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: purchaseOrders.filter((o) => {
                  const matchSearch = o.orderId?.toLowerCase().includes(purchaseOrderSearch.toLowerCase()) || o.supplier?.toLowerCase().includes(purchaseOrderSearch.toLowerCase());
                  return matchSearch;
                }).map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: order.orderId || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: order.supplier || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: order.itemCount || 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-emerald-400", children: [
                    "£",
                    (order.total || 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${order.status === "received" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : order.status === "in_transit" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`, children: order.status === "received" ? "Received" : order.status === "in_transit" ? "In Transit" : "Pending" }) })
                ] }, order.id)) })
              ] }) }),
              purchaseOrders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No purchase orders yet" })
              ] })
            ] })
          ] }),
          activeSection === "payments" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Payments", value: `£${payments.reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`, icon: DollarSign, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Today", value: `£${payments.filter((p) => new Date(p.created_at).toDateString() === (/* @__PURE__ */ new Date()).toDateString()).reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`, icon: Calendar, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "This Week", value: `£${payments.filter((p) => {
                const now = /* @__PURE__ */ new Date();
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
                return new Date(p.created_at) >= weekAgo;
              }).reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`, icon: TrendingUp, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "This Month", value: `£${payments.filter((p) => new Date(p.created_at).getMonth() === (/* @__PURE__ */ new Date()).getMonth()).reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`, icon: Activity, gradient: "from-amber-500 to-orange-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by reference or customer", value: paymentSearch, onChange: (e) => setPaymentSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Payment Transactions" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Reference" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Method" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Date" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: payments.filter((p) => {
                  const matchSearch = p.invoice_number?.toLowerCase().includes(paymentSearch.toLowerCase()) || p.customer_name?.toLowerCase().includes(paymentSearch.toLowerCase());
                  return matchSearch;
                }).map((payment, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: payment.invoice_number || payment.description || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: payment.customer_name || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-emerald-400", children: [
                    "£",
                    (payment.amount || 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: payment.payment_method || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: new Date(payment.created_at).toLocaleDateString() })
                ] }, payment.id)) })
              ] }) }),
              payments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No payment transactions yet" })
              ] })
            ] })
          ] }),
          activeSection === "invoices" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Invoices", value: invoices.length, icon: FileText, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Outstanding", value: `£${invoices.filter((i) => i.status === "outstanding").reduce((sum, i) => sum + (i.amount || 0), 0).toFixed(0)}`, icon: DollarSign, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Paid", value: `£${invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + (i.amount || 0), 0).toFixed(0)}`, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Overdue", value: invoices.filter((i) => i.status === "overdue").length, icon: CircleAlert, gradient: "from-rose-500 to-red-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by invoice number or customer", value: invoiceSearch, onChange: (e) => setInvoiceSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Invoices" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Invoice #" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Due Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Actions" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoices.filter((i) => {
                  const matchSearch = i.invoice_number?.toLowerCase().includes(invoiceSearch.toLowerCase()) || i.customer_name?.toLowerCase().includes(invoiceSearch.toLowerCase());
                  return matchSearch;
                }).map((invoice, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: invoice.invoice_number || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: invoice.customer_name || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-emerald-400", children: [
                    "£",
                    (invoice.amount || 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${invoice.status === "paid" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : invoice.status === "overdue" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`, children: invoice.status || "outstanding" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => safeToast.success(`Invoice ${invoice.invoice_number} marked as paid`), className: "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 p-2 rounded-lg transition-colors", title: "Mark as paid", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => safeToast.success(`Invoice ${invoice.invoice_number} sent to customer`), className: "text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 p-2 rounded-lg transition-colors", title: "Send invoice", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => safeToast.success(`Invoice ${invoice.invoice_number} downloaded`), className: "text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 p-2 rounded-lg transition-colors", title: "Download PDF", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) })
                  ] }) })
                ] }, invoice.id)) })
              ] }) }),
              invoices.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No invoices yet" })
              ] })
            ] })
          ] }),
          activeSection === "inhouse_sales" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Today's Sales", value: `£${inhouseSales.filter((s) => new Date(s.date).toDateString() === (/* @__PURE__ */ new Date()).toDateString()).reduce((sum, s) => sum + (s.amount || 0), 0).toFixed(0)}`, icon: DollarSign, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Transactions", value: inhouseSales.length, icon: ShoppingCart, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Average Order", value: `£${inhouseSales.length > 0 ? (inhouseSales.reduce((sum, s) => sum + (s.amount || 0), 0) / inhouseSales.length).toFixed(0) : "0"}`, icon: TrendingUp, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Items Sold", value: inhouseSales.reduce((sum, s) => sum + (s.itemCount || 0), 0), icon: Package, gradient: "from-amber-500 to-orange-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by customer or reference", value: inhouseSaleSearch, onChange: (e) => setInhouseSaleSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowAddInhouseSaleModal(true), className: "bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                "Add Sale"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "In-House Transactions" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Reference" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Items" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Date" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: inhouseSales.filter((s) => {
                  const matchSearch = s.customer?.toLowerCase().includes(inhouseSaleSearch.toLowerCase()) || s.reference?.toLowerCase().includes(inhouseSaleSearch.toLowerCase());
                  return matchSearch;
                }).map((sale, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: sale.reference || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: sale.customer || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-emerald-400", children: [
                    "£",
                    (sale.amount || 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: sale.itemCount || 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: new Date(sale.date).toLocaleDateString() })
                ] }, sale.id)) })
              ] }) }),
              inhouseSales.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No in-house sales yet" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAddInhouseSaleModal && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, exit: {
              opacity: 0
            }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", onClick: () => setShowAddInhouseSaleModal(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              scale: 0.95
            }, animate: {
              opacity: 1,
              scale: 1
            }, exit: {
              opacity: 0,
              scale: 0.95
            }, className: "bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Record In-House Sale" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Reference" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newInhouseSale.reference, onChange: (e) => setNewInhouseSale({
                    ...newInhouseSale,
                    reference: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", placeholder: "SALE-001 or leave blank for auto" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Customer Name *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newInhouseSale.customer_name, onChange: (e) => setNewInhouseSale({
                    ...newInhouseSale,
                    customer_name: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Customer Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newInhouseSale.customer_phone, onChange: (e) => setNewInhouseSale({
                    ...newInhouseSale,
                    customer_phone: e.target.value
                  }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Amount (£) *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", value: newInhouseSale.amount, onChange: (e) => setNewInhouseSale({
                      ...newInhouseSale,
                      amount: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white", required: true })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Items Count" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: newInhouseSale.item_count, onChange: (e) => setNewInhouseSale({
                      ...newInhouseSale,
                      item_count: e.target.value
                    }), className: "border-[#1F2235] bg-[#1A1D27] text-white" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-slate-300", children: "Payment Method" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newInhouseSale.payment_method, onChange: (e) => setNewInhouseSale({
                    ...newInhouseSale,
                    payment_method: e.target.value
                  }), className: "w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cash", children: "Cash" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "card", children: "Card" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bank_transfer", children: "Bank Transfer" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowAddInhouseSaleModal(false), variant: "outline", className: "flex-1 border-[#1F2235] text-white hover:bg-slate-800", children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCreateInhouseSale, className: "flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white", children: "Record Sale" })
                ] })
              ] })
            ] }) }) })
          ] }),
          activeSection === "online_sales" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Orders", value: onlineSales.length, icon: ShoppingCart, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Revenue", value: `£${onlineSales.reduce((sum, s) => sum + (s.amount || 0), 0).toFixed(0)}`, icon: DollarSign, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Pending", value: onlineSales.filter((s) => s.status === "pending").length, icon: Clock, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Completed", value: onlineSales.filter((s) => s.status === "completed").length, icon: CircleCheck, gradient: "from-violet-500 to-purple-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by order ID or customer", value: onlineSaleSearch, onChange: (e) => setOnlineSaleSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Online Orders" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Order ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Items" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: onlineSales.filter((s) => {
                  const matchSearch = s.orderId?.toLowerCase().includes(onlineSaleSearch.toLowerCase()) || s.customer?.toLowerCase().includes(onlineSaleSearch.toLowerCase());
                  return matchSearch;
                }).map((sale, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: sale.orderId || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: sale.customer || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-emerald-400", children: [
                    "£",
                    (sale.amount || 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: sale.itemCount || 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${sale.status === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`, children: sale.status || "pending" }) })
                ] }, sale.id)) })
              ] }) }),
              onlineSales.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No online orders yet" })
              ] })
            ] })
          ] }),
          activeSection === "bookings" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Bookings", value: bookings.length, icon: Calendar, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Pending", value: bookings.filter((b) => b.status === "pending").length, icon: Clock, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Completed", value: bookings.filter((b) => b.status === "completed").length, icon: Circle, gradient: "from-violet-500 to-purple-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by customer name or phone", value: bookingSearch, onChange: (e) => setBookingSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-slate-600" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "confirmed", children: "Confirmed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "Completed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "Cancelled" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowCalendarView(!showCalendarView), className: "bg-[#1F2235] hover:bg-[#2D3142] text-slate-300 px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors border border-slate-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
                showCalendarView ? "Table View" : "Calendar View"
              ] })
            ] }),
            showCalendarView ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppointmentCalendar, {}) : (
              /* Table */
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Customer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Service" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Date & Time" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-20", children: "Actions" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginatedBookings.length > 0 ? paginatedBookings.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                    opacity: 0,
                    y: 8
                  }, animate: {
                    opacity: 1,
                    y: 0
                  }, transition: {
                    delay: idx * 0.03
                  }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-white", children: booking.customer_name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-xs text-slate-500", children: booking.phone })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400", children: booking.service }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 text-white", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: new Date(booking.date).toLocaleDateString() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500", children: booking.time })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${booking.status === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : booking.status === "confirmed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : booking.status === "completed" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }),
                      booking.status
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleConfirmBooking(booking), className: "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 p-2 rounded-lg transition-colors", title: "Confirm booking", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleCancelBooking(booking), className: "text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-2 rounded-lg transition-colors", title: "Cancel booking", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }) })
                    ] }) })
                  ] }, booking.id)) : null })
                ] }) }),
                filteredBookings.length === 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No bookings found" })
                ] }),
                isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600", children: "Loading bookings..." })
                ] }),
                filteredBookings.length > 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-t border-[#1F2235]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-slate-500", children: [
                    "Showing ",
                    (bookingsPage - 1) * bookingsPerPage + 1,
                    " to ",
                    Math.min(bookingsPage * bookingsPerPage, filteredBookings.length),
                    " of ",
                    filteredBookings.length,
                    " bookings"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBookingsPage((prev) => Math.max(1, prev - 1)), disabled: bookingsPage === 1, className: "px-3 py-1.5 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 hover:bg-[#1A1D27] disabled:opacity-50 disabled:cursor-not-allowed", children: "Previous" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-slate-400", children: [
                      "Page ",
                      bookingsPage,
                      " of ",
                      totalPages(filteredBookings, bookingsPerPage)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBookingsPage((prev) => Math.min(totalPages(filteredBookings, bookingsPerPage), prev + 1)), disabled: bookingsPage === totalPages(filteredBookings, bookingsPerPage), className: "px-3 py-1.5 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 hover:bg-[#1A1D27] disabled:opacity-50 disabled:cursor-not-allowed", children: "Next" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: bookingsPerPage, onChange: (e) => {
                      setBookingsPerPage(Number(e.target.value));
                      setBookingsPage(1);
                    }, className: "ml-4 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10", children: "10 per page" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "25", children: "25 per page" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "50", children: "50 per page" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "100", children: "100 per page" })
                    ] })
                  ] })
                ] })
              ] })
            )
          ] }),
          activeSection === "finance" && /* @__PURE__ */ jsxRuntimeExports.jsx(FinanceSection, { token }),
          activeSection === "walkin" && /* @__PURE__ */ jsxRuntimeExports.jsx(WalkInIntake, { token }),
          activeSection === "audit_logs" && /* @__PURE__ */ jsxRuntimeExports.jsx(AuditLogs, { token }),
          activeSection === "analytics" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-slate-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: timePeriod, onChange: (e) => setTimePeriod(e.target.value), className: "rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500 h-10 rounded-xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "daily", children: "Today" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "weekly", children: "This Week" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "monthly", children: "This Month" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Total Repairs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-bold text-white", children: totalRepairs }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-500", children: timePeriod === "all" ? "All-time" : timePeriod === "daily" ? "Today" : timePeriod === "weekly" ? "This Week" : "This Month" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.05
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
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
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
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
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Completion Rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-3xl font-bold text-white", children: [
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
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Total Customers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-bold text-white", children: customers.length }),
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
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Avg Repairs/Customer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-bold text-white", children: customers.length > 0 ? (totalRepairs / customers.length).toFixed(1) : 0 }),
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
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Estimated Revenue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-3xl font-bold text-white", children: [
                  "£",
                  totalRevenue.toFixed(0)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-slate-500", children: "@£45/repair" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.5
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white mb-4", children: "Revenue Trend" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-600", children: "This Month" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-emerald-600", children: [
                      "£",
                      totalRevenue.toFixed(0)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-600", children: "Last Month" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-slate-600", children: "N/A" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-600", children: "Growth" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-slate-600", children: "N/A" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.55
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white mb-4", children: "Top Services" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-slate-400 text-sm", children: "Service breakdown data not available" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.6
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white mb-4", children: "Customer Insights" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-slate-400 text-sm", children: "Customer analytics data not available" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.4
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white mb-4", children: "Repairs Over Time" }),
                isLoading || repairsOverTime.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-[250px] text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: repairsOverTime, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", stroke: "#64748b", fontSize: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#64748b", fontSize: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px"
                  } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "count", stroke: "#8b5cf6", strokeWidth: 2, dot: {
                    fill: "#8b5cf6",
                    strokeWidth: 2
                  }, activeDot: {
                    r: 6
                  } })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
                opacity: 0,
                y: 12
              }, animate: {
                opacity: 1,
                y: 0
              }, transition: {
                delay: 0.45
              }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white mb-4", children: "Repairs by Status" }),
                isLoading || statusChartData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-[250px] text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-6 w-6 animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: statusChartData, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", stroke: "#64748b", fontSize: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#64748b", fontSize: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px"
                  } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", fill: "#06b6d4", radius: [4, 4, 0, 0] })
                ] }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              y: 12
            }, animate: {
              opacity: 1,
              y: 0
            }, transition: {
              delay: 0.5
            }, className: "rounded-xl border border-[#1F2235] bg-[#11131E] p-6 mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white mb-4", children: "Top Device Types" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: deviceChartData, cx: "50%", cy: "50%", labelLine: false, label: ({
                  name,
                  percent
                }) => `${name} ${(percent * 100).toFixed(0)}%`, outerRadius: 80, fill: "#8884d8", dataKey: "value", children: deviceChartData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px"
                } })
              ] }) })
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
          }, className: "flex items-start gap-4 rounded-xl border border-[#1F2235] bg-[#11131E] p-5 hover:bg-white/[0.02] transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${r.status === "collection" ? "bg-emerald-100" : r.status === "testing" ? "bg-amber-100" : "bg-violet-100"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: `h-5 w-5 ${r.status === "collection" ? "text-emerald-600" : r.status === "testing" ? "text-amber-600" : "text-violet-600"}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white", children: r.customer_name || "Unknown Customer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-600 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: r.tracking_id }),
                  " ? ",
                  r.device_model
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "inline h-3 w-3 mr-1" }),
                  r.customer_phone || "No phone"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(r.status)}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }),
                  r.status === "collection" ? "Ready" : r.status.charAt(0).toUpperCase() + r.status.slice(1)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 mt-2", children: [
                  new Date(r.created_at).toLocaleDateString() || "N/A",
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
          ] }) }),
          activeSection === "roles_permissions" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Roles", value: roles.length, icon: ShieldCheck, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Active Permissions", value: permissions.length, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Admin Users", value: roles.filter((r) => r.name === "Admin").length, icon: User, gradient: "from-violet-500 to-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Staff Users", value: roles.filter((r) => r.name === "Staff").length, icon: Users, gradient: "from-amber-500 to-orange-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by role name", value: rolesSearch, onChange: (e) => setRolesSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Roles & Permissions" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Role Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Permissions" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Users" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: roles.filter((r) => r?.name?.toLowerCase().includes(rolesSearch.toLowerCase())).map((role, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: role?.name || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: role?.description || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-slate-400", children: [
                    role?.permissions?.length || 0,
                    " permissions"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: role?.userCount || 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${role?.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`, children: role?.isActive ? "Active" : "Inactive" }) })
                ] }, role?.id || idx)) })
              ] }) }),
              roles.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No roles configured yet" })
              ] })
            ] })
          ] }),
          activeSection === "profit_loss" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Revenue", value: `£${profitLoss.reduce((sum, p) => sum + (p?.revenue || 0), 0).toFixed(0)}`, icon: TrendingUp, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Expenses", value: `£${profitLoss.reduce((sum, p) => sum + (p?.expenses || 0), 0).toFixed(0)}`, icon: FileText, gradient: "from-rose-500 to-red-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Net Profit", value: `£${(profitLoss.reduce((sum, p) => sum + (p?.revenue || 0), 0) - profitLoss.reduce((sum, p) => sum + (p?.expenses || 0), 0)).toFixed(0)}`, icon: DollarSign, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Profit Margin", value: `${profitLoss.reduce((sum, p) => sum + (p?.revenue || 0), 0) > 0 ? ((profitLoss.reduce((sum, p) => sum + (p?.revenue || 0), 0) - profitLoss.reduce((sum, p) => sum + (p?.expenses || 0), 0)) / profitLoss.reduce((sum, p) => sum + (p?.revenue || 0), 0) * 100).toFixed(1) : 0}%`, icon: Activity, gradient: "from-violet-500 to-purple-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setProfitLossPeriod("month"), className: `px-4 py-2 rounded-lg text-sm font-medium ${profitLossPeriod === "month" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`, children: "This Month" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setProfitLossPeriod("quarter"), className: `px-4 py-2 rounded-lg text-sm font-medium ${profitLossPeriod === "quarter" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`, children: "This Quarter" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setProfitLossPeriod("year"), className: `px-4 py-2 rounded-lg text-sm font-medium ${profitLossPeriod === "year" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`, children: "This Year" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Profit & Loss Statement" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Revenue" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Expenses" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Net" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Period" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: profitLoss.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: item?.category || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-emerald-400", children: [
                    "£",
                    (item?.revenue || 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-rose-400", children: [
                    "£",
                    (item?.expenses || 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: `px-4 py-3 font-semibold ${(item?.revenue || 0) - (item?.expenses || 0) >= 0 ? "text-emerald-400" : "text-rose-400"}`, children: [
                    "£",
                    ((item?.revenue || 0) - (item?.expenses || 0)).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: item?.period || "N/A" })
                ] }, item?.id || idx)) })
              ] }) }),
              profitLoss.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No profit & loss data yet" })
              ] })
            ] })
          ] }),
          activeSection === "cash_flow" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Cash In", value: `£${cashFlow.filter((c) => c?.type === "in").reduce((sum, c) => sum + (c?.amount || 0), 0).toFixed(0)}`, icon: TrendingUp, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Cash Out", value: `£${cashFlow.filter((c) => c?.type === "out").reduce((sum, c) => sum + (c?.amount || 0), 0).toFixed(0)}`, icon: TrendingUp, gradient: "from-rose-500 to-red-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Net Cash Flow", value: `£${(cashFlow.filter((c) => c?.type === "in").reduce((sum, c) => sum + (c?.amount || 0), 0) - cashFlow.filter((c) => c?.type === "out").reduce((sum, c) => sum + (c?.amount || 0), 0)).toFixed(0)}`, icon: DollarSign, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Cash Balance", value: `£${(cashFlow.filter((c) => c?.type === "in").reduce((sum, c) => sum + (c?.amount || 0), 0) - cashFlow.filter((c) => c?.type === "out").reduce((sum, c) => sum + (c?.amount || 0), 0)).toFixed(0)}`, icon: Activity, gradient: "from-violet-500 to-purple-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCashFlowPeriod("month"), className: `px-4 py-2 rounded-lg text-sm font-medium ${cashFlowPeriod === "month" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`, children: "This Month" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCashFlowPeriod("quarter"), className: `px-4 py-2 rounded-lg text-sm font-medium ${cashFlowPeriod === "quarter" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`, children: "This Quarter" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCashFlowPeriod("year"), className: `px-4 py-2 rounded-lg text-sm font-medium ${cashFlowPeriod === "year" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`, children: "This Year" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Cash Flow Statement" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Amount" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: cashFlow.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                  opacity: 0,
                  y: 8
                }, animate: {
                  opacity: 1,
                  y: 0
                }, transition: {
                  delay: idx * 0.03
                }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: new Date(item?.date).toLocaleDateString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: item?.description || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: item?.category || "N/A" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${item?.type === "in" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`, children: item?.type === "in" ? "Inflow" : "Outflow" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: `px-4 py-3 font-semibold ${item?.type === "in" ? "text-emerald-400" : "text-rose-400"}`, children: [
                    item?.type === "in" ? "+" : "-",
                    "£",
                    (item?.amount || 0).toFixed(2)
                  ] })
                ] }, item?.id || idx)) })
              ] }) }),
              cashFlow.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No cash flow data yet" })
              ] })
            ] })
          ] }),
          activeSection === "repair_tracking" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Total Repairs", value: repairs.length, icon: Wrench, gradient: "from-blue-500 to-cyan-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "In Progress", value: repairs.filter((r) => r?.status !== "collection" && r?.status !== "completed").length, icon: Activity, gradient: "from-amber-500 to-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Completed", value: repairs.filter((r) => r?.status === "completed").length, icon: CircleCheck, gradient: "from-emerald-500 to-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Pending", value: repairs.filter((r) => r?.status === "pending").length, icon: Clock, gradient: "from-violet-500 to-purple-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-3.5 h-4 w-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by tracking ID or customer", value: repairTrackingSearch, onChange: (e) => setRepairTrackingSearch(e.target.value), className: "h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#1F2235]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Repair Lifecycle Tracking" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#1F2235] bg-[#11131E]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Tracking ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Device" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Progress" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent", children: "Started" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: repairs.filter((r) => {
                  const matchSearch = r?.tracking_id?.toLowerCase().includes(repairTrackingSearch.toLowerCase()) || r?.customer_name?.toLowerCase().includes(repairTrackingSearch.toLowerCase());
                  return matchSearch;
                }).map((repair, idx) => {
                  const progress = repair?.progress_percentage || 0;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: {
                    opacity: 0,
                    y: 8
                  }, animate: {
                    opacity: 1,
                    y: 0
                  }, transition: {
                    delay: idx * 0.03
                  }, className: "border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-white", children: repair?.tracking_id || "N/A" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: repair?.customer_name || "N/A" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: repair?.device_model || "N/A" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${repair?.status === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : repair?.status === "in_progress" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`, children: repair?.status || "pending" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-[#1F2235] rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-[#6B46C1]", style: {
                        width: `${progress}%`
                      } }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-400", children: [
                        progress,
                        "%"
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-slate-400", children: new Date(repair?.created_at).toLocaleDateString() })
                  ] }, repair?.id || idx);
                }) })
              ] }) }),
              repairs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No repair tracking data yet" })
              ] })
            ] })
          ] }),
          activeSection === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-6 text-lg font-semibold text-white", children: "Business Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "Business Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: businessSettings.businessName, onChange: (e) => setBusinessSettings({
                    ...businessSettings,
                    businessName: e.target.value
                  }), className: "border-[#2D3142] bg-[#1A1D27]" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: businessSettings.email, onChange: (e) => setBusinessSettings({
                    ...businessSettings,
                    email: e.target.value
                  }), className: "border-[#2D3142] bg-[#1A1D27]" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: businessSettings.phone, onChange: (e) => setBusinessSettings({
                    ...businessSettings,
                    phone: e.target.value
                  }), className: "border-[#2D3142] bg-[#1A1D27]" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: businessSettings.address, onChange: (e) => setBusinessSettings({
                    ...businessSettings,
                    address: e.target.value
                  }), className: "border-[#2D3142] bg-[#1A1D27]" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-6 text-lg font-semibold text-white", children: "Opening Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: Object.entries(businessSettings.openingHours).map(([day, hours]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-32 text-sm font-medium text-slate-300 capitalize", children: day }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: hours, onChange: (e) => setBusinessSettings({
                  ...businessSettings,
                  openingHours: {
                    ...businessSettings.openingHours,
                    [day]: e.target.value
                  }
                }), className: "border-[#2D3142] bg-[#1A1D27] flex-1" })
              ] }, day)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-6 text-lg font-semibold text-white", children: "Financial Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "Tax Rate (%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: businessSettings.taxRate, onChange: (e) => setBusinessSettings({
                    ...businessSettings,
                    taxRate: Number(e.target.value)
                  }), className: "border-[#2D3142] bg-[#1A1D27]" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "Currency" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: businessSettings.currency, onChange: (e) => setBusinessSettings({
                    ...businessSettings,
                    currency: e.target.value
                  }), className: "rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "GBP", children: "GBP (£)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "EUR", children: "EUR (€)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "USD", children: "USD ($)" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-6 text-lg font-semibold text-white", children: "Notification Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-300", children: "Email Notifications" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Receive email updates for important events" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBusinessSettings({
                    ...businessSettings,
                    notifications: {
                      ...businessSettings.notifications,
                      emailNotifications: !businessSettings.notifications.emailNotifications
                    }
                  }), className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.notifications.emailNotifications ? "bg-violet-600" : "bg-[#2D3142]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.notifications.emailNotifications ? "translate-x-6" : "translate-x-1"}` }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-300", children: "SMS Notifications" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Receive SMS updates for urgent matters" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBusinessSettings({
                    ...businessSettings,
                    notifications: {
                      ...businessSettings.notifications,
                      smsNotifications: !businessSettings.notifications.smsNotifications
                    }
                  }), className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.notifications.smsNotifications ? "bg-violet-600" : "bg-[#2D3142]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.notifications.smsNotifications ? "translate-x-6" : "translate-x-1"}` }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-300", children: "Booking Reminders" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Send automatic reminders for upcoming appointments" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBusinessSettings({
                    ...businessSettings,
                    notifications: {
                      ...businessSettings.notifications,
                      bookingReminders: !businessSettings.notifications.bookingReminders
                    }
                  }), className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.notifications.bookingReminders ? "bg-violet-600" : "bg-[#2D3142]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.notifications.bookingReminders ? "translate-x-6" : "translate-x-1"}` }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-300", children: "Status Updates" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Notify customers when repair status changes" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBusinessSettings({
                    ...businessSettings,
                    notifications: {
                      ...businessSettings.notifications,
                      statusUpdates: !businessSettings.notifications.statusUpdates
                    }
                  }), className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.notifications.statusUpdates ? "bg-violet-600" : "bg-[#2D3142]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.notifications.statusUpdates ? "translate-x-6" : "translate-x-1"}` }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-6 text-lg font-semibold text-white", children: "Display Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-300", children: "Show Prices" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Display prices on the public website" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBusinessSettings({
                    ...businessSettings,
                    display: {
                      ...businessSettings.display,
                      showPrices: !businessSettings.display.showPrices
                    }
                  }), className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.display.showPrices ? "bg-violet-600" : "bg-[#2D3142]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.display.showPrices ? "translate-x-6" : "translate-x-1"}` }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-300", children: "Show Contact Info" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Display contact information publicly" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBusinessSettings({
                    ...businessSettings,
                    display: {
                      ...businessSettings.display,
                      showContactInfo: !businessSettings.display.showContactInfo
                    }
                  }), className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.display.showContactInfo ? "bg-violet-600" : "bg-[#2D3142]"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.display.showContactInfo ? "translate-x-6" : "translate-x-1"}` }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-6 text-lg font-semibold text-white", children: "Data Management" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BackupRestore, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => safeToast.success("Settings saved successfully"), className: "bg-violet-600 hover:bg-violet-700", children: "Save All Settings" })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedRepairForTimeline && /* @__PURE__ */ jsxRuntimeExports.jsx(RepairTimeline, { repairId: selectedRepairForTimeline.id, trackingId: selectedRepairForTimeline.trackingId, onClose: () => setSelectedRepairForTimeline(null) }) })
  ] });
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
      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {
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
      if (res.ok) {
        if (data.user.role === "admin" || data.user.role === "technician" || data.user.role === "SUPER_ADMIN" || data.user.role === "STAFF") {
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
          setLoginError("Unauthorized ? admin or technician role required.");
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, { token, onLogout: handleLogout }) });
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
    }, className: "relative w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[#1F2235] bg-[#11131E] p-8 shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-7 w-7 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Admin Access" }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "admin@fixora.com", className: "h-12 border-[#2D3142] bg-[#1A1D27] text-white placeholder:text-slate-400 focus-visible:ring-violet-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", className: "h-12 border-[#2D3142] bg-[#1A1D27] text-white placeholder:text-slate-400 focus-visible:ring-violet-500" })
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
