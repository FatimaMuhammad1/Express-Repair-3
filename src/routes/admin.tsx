import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Database,
  LayoutDashboard,
  Wrench,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  AlertCircle,
  Phone,
  FileText,
  LogOut,
  Users,
  Activity,
  TrendingUp,
  Trash2,
  Clock,
  ChevronDown,
  User,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/* ──────────────────── Dashboard ──────────────────── */

function AdminDashboard({
  token,
  onLogout,
}: {
  token: string;
  onLogout: () => void;
}) {
  const [repairs, setRepairs] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("repairs");

  const fetchRepairs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/repairs/all`, {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `repairs_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRepairs();
    fetchStats();
  }, []);

  const updateStatus = async (trackingId: string, newStatus: string) => {
    // Optimistic update - update local state immediately
    setRepairs(prev => prev.map(r => 
      r.tracking_id === trackingId ? { ...r, status: newStatus } : r
    ));
    
    try {
      await fetch(
        `${API_BASE_URL}/repairs/${trackingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus, notify_customer: true }),
        },
      );
    } catch (e) {
      console.error(e);
      // Revert on error
      setRepairs(prev => prev.map(r => 
        r.tracking_id === trackingId ? { ...r, status: r.status } : r
      ));
    }
  };

  const deleteRepair = async (trackingId: string) => {
    if (!confirm("Are you sure you want to delete this repair? This action cannot be undone.")) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/repairs/${trackingId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setRepairs(prev => prev.filter(r => r.tracking_id !== trackingId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const statuses = [
    "received",
    "diagnosed",
    "repairing",
    "testing",
    "collection",
  ];

  const filtered = repairs.filter((r) => {
    const matchSearch =
      r.tracking_id?.toLowerCase().includes(search.toLowerCase()) ||
      r.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.customer_phone?.includes(search);
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Compute unique customers with their data
  const customers = Array.from(
    new Map(
      repairs.map((r) => [
        r.customer_phone,
        {
          name: r.customer_name,
          phone: r.customer_phone,
          repairCount: repairs.filter(
            (rep) => rep.customer_phone === r.customer_phone,
          ).length,
          lastRepair: repairs
            .filter((rep) => rep.customer_phone === r.customer_phone)
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
            )[0]?.created_at,
        },
      ]),
    ).values(),
  ).sort((a, b) => b.repairCount - a.repairCount);

  // Analytics metrics - use backend stats if available
  const totalRepairs = stats?.total_repairs || repairs.length;
  const completedRepairs = stats?.status_breakdown?.collection || repairs.filter((r) => r.status === "collection").length;
  const completionRate =
    totalRepairs > 0 ? Math.round((completedRepairs / totalRepairs) * 100) : 0;
  const inProgressRepairs = stats?.status_breakdown ? 
    Object.values(stats.status_breakdown).reduce((a: number, b: number) => a + b, 0) - completedRepairs :
    repairs.filter((r) => r.status !== "collection").length;
  const totalRevenue = stats?.total_revenue || 0;

  // Activity log (sorted by date)
  const activityLog = repairs
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 15);

  const sidebarItems = [
    { id: "repairs", icon: Wrench, label: "Repairs" },
    { id: "customers", icon: Users, label: "Customers" },
    { id: "analytics", icon: TrendingUp, label: "Analytics" },
    { id: "activity", icon: Activity, label: "Activity" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F5F1ED] dark:bg-transparent section-frost dark:section-frost">
      <div className="pointer-events-none absolute inset-0 z-0 dark:opacity-0" style={{ backgroundColor: "#F5F1ED" }}></div>
      <div className="relative z-10 flex min-h-screen bg-[#f8fafc]/95 dark:bg-transparent backdrop-blur-sm">
        {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col border-r border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl"
      >
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-6 bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-bold tracking-wide text-slate-900 dark:text-white">
            Fixora Admin
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                activeSection === item.id
                  ? "bg-violet-100 dark:bg-violet-900/50 text-violet-900 dark:text-violet-100 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.id === "repairs" && repairs.length > 0 && (
                <span className="ml-auto rounded-full bg-violet-200 px-2 py-0.5 text-[10px] font-bold text-violet-900">
                  {repairs.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-slate-200 dark:border-slate-800 p-4 space-y-2">
          <Link
            to="/profile"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
          >
            <User className="h-4 w-4" />
            My Account
          </Link>
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-700 dark:hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="ml-[260px] flex-1 bg-slate-50 dark:bg-transparent min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-8 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              {activeSection === "repairs" && "Repair Management"}
              {activeSection === "customers" && "Customer Management"}
              {activeSection === "analytics" && "Analytics & Reports"}
              {activeSection === "activity" && "Activity Log"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {activeSection === "repairs" && (
              <Button
                variant="outline"
                size="sm"
                onClick={exportRepairsCSV}
                className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white font-medium"
              >
                <FileText className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRepairs}
              disabled={isLoading}
              className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white font-medium"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-bold text-white">
              A
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 bg-slate-50 dark:bg-transparent">
          {activeSection === "repairs" && (
            <>
              {/* Repairs Section */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Repairs"
              value={totalRepairs}
              icon={Database}
              gradient="from-blue-500 to-cyan-500"
            />
            <StatCard
              title="In Workshop"
              value={inProgressRepairs}
              icon={Wrench}
              gradient="from-violet-500 to-purple-500"
            />
            <StatCard
              title="Completed"
              value={completedRepairs}
              icon={CheckCircle2}
              gradient="from-emerald-500 to-green-500"
            />
            <StatCard
              title="Total Revenue"
              value={`£${totalRevenue.toFixed(0)}`}
              icon={TrendingUp}
              gradient="from-amber-500 to-orange-500"
            />
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, phone, or tracking ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-violet-500 h-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus-outline-none focus:ring-1 focus:ring-violet-500 h-10"
              >
                <option value="all">All Statuses</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 w-24">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Device
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 w-20">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((r, idx) => (
                      <motion.tr
                        key={r.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="border-b border-slate-100 dark:border-slate-800/50 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="px-6 py-4 font-mono text-sm text-cyan-600 font-semibold">
                          {r.tracking_id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900 dark:text-white">
                            {r.customer_name}
                          </div>
                          <div className="mt-0.5 flex items-center text-xs text-slate-500">
                            <Phone className="mr-1 h-3 w-3" />
                            {r.customer_phone}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-slate-700">
                            <FileText className="mr-2 h-4 w-4 text-slate-400" />
                            {r.device_model}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(r.status)}`}
                            >
                              <Circle className="h-2 w-2 fill-current" />
                              {r.status === "collection"
                                ? "Ready"
                                : r.status.charAt(0).toUpperCase() +
                                  r.status.slice(1)}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {statuses.map((s) => (
                                <button
                                  key={s}
                                  onClick={() => updateStatus(r.tracking_id, s)}
                                  disabled={r.status === s}
                                  className={`rounded-md border px-2.5 py-1 text-[10px] font-semibold transition-all cursor-pointer ${
                                    r.status === s
                                      ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                                      : "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100 hover:border-violet-400"
                                  }`}
                                >
                                  {s === "collection"
                                    ? "Ready"
                                    : s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                          {new Date(r.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteRepair(r.tracking_id)}
                            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-2 rounded-lg transition-colors"
                            title="Delete repair"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : null}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && !isLoading && (
              <div className="px-6 py-16 text-center text-slate-400">
                <Database className="mx-auto mb-3 h-8 w-8 opacity-40" />
                <p className="text-sm">No repairs found</p>
              </div>
            )}

            {isLoading && (
              <div className="px-6 py-16 text-center">
                <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" />
                <p className="text-sm text-slate-600">Loading repairs...</p>
              </div>
            )}
          </div>
            </>
          )}

          {activeSection === "customers" && (
            <>
              {/* Customers Section */}
              {isLoading ? (
                <div className="text-center py-16">
                  <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" />
                  <p className="text-slate-600">Loading customers...</p>
                </div>
              ) : customers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {customers.map((customer, idx) => (
                    <motion.div
                      key={customer.phone}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 transition-all hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                            {customer.name}
                          </h3>
                          <p className="mt-2 text-sm text-slate-600 flex items-center">
                            <Phone className="mr-2 h-4 w-4 text-slate-400" />
                            {customer.phone}
                          </p>
                          <p className="mt-3 text-xs text-slate-500">
                            Last Repair:{" "}
                            {customer.lastRepair
                              ? new Date(customer.lastRepair).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white font-bold text-lg">
                            {customer.repairCount}
                          </div>
                          <p className="mt-2 text-xs font-semibold text-slate-600">
                            Total Repairs
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Users className="mx-auto mb-3 h-8 w-8 opacity-40" />
                  <p className="text-slate-400">No customers yet</p>
                </div>
              )}
            </>
          )}

          {activeSection === "analytics" && (
            <>
              {/* Analytics Section */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Total Repairs
                  </p>
                  <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                    {totalRepairs}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">All-time</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Completed
                  </p>
                  <p className="mt-3 text-3xl font-bold text-emerald-600">
                    {completedRepairs}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">Ready for pickup</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    In Progress
                  </p>
                  <p className="mt-3 text-3xl font-bold text-violet-600">
                    {inProgressRepairs}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">Being worked on</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Completion Rate
                  </p>
                  <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                    {completionRate}%
                  </p>
                  <p className="mt-2 text-xs text-slate-500">Success ratio</p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Total Customers
                  </p>
                  <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                    {customers.length}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">Unique customers</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Avg Repairs/Customer
                  </p>
                  <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                    {customers.length > 0
                      ? (totalRepairs / customers.length).toFixed(1)
                      : 0}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">Per customer</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Estimated Revenue
                  </p>
                  <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                    £{totalRepairs * 45}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">@£45/repair</p>
                </motion.div>
              </div>
            </>
          )}

          {activeSection === "activity" && (
            <>
              {/* Activity Section */}
              {isLoading ? (
                <div className="text-center py-16">
                  <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" />
                  <p className="text-slate-600">Loading activity...</p>
                </div>
              ) : activityLog.length > 0 ? (
                <div className="space-y-3">
                  {activityLog.map((r, idx) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-start gap-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 hover:shadow-md transition-all"
                    >
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                        r.status === "collection"
                          ? "bg-emerald-100"
                          : r.status === "testing"
                          ? "bg-amber-100"
                          : "bg-violet-100"
                      }`}>
                        <Wrench className={`h-5 w-5 ${
                          r.status === "collection"
                            ? "text-emerald-600"
                            : r.status === "testing"
                            ? "text-amber-600"
                            : "text-violet-600"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {r.customer_name}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">
                              <span className="font-mono">{r.tracking_id}</span> • {r.device_model}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              <Phone className="inline h-3 w-3 mr-1" />
                              {r.customer_phone}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(r.status)}`}>
                              <Circle className="h-2 w-2 fill-current" />
                              {r.status === "collection" ? "Ready" : r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                            </span>
                            <p className="text-xs text-slate-400 mt-2">
                              {new Date(r.created_at).toLocaleDateString()} {new Date(r.created_at).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Activity className="mx-auto mb-3 h-8 w-8 opacity-40" />
                  <p className="text-slate-400">No recent activity</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

/* ──────────────────── Helpers ──────────────────── */

function StatCard({
  title,
  value,
  icon: Icon,
  gradient,
}: {
  title: string;
  value: number;
  icon: any;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            {title}
          </p>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} shadow-md`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function getStatusStyle(status: string) {
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

/* ──────────────────── Route ──────────────────── */

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Fixora" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (
          data.user.role === "admin" ||
          data.user.role === "technician"
        ) {
          setToken(data.token);
          localStorage.setItem("admin_token", data.token);
          localStorage.setItem(
            "admin_user",
            JSON.stringify(data.user),
          );
          // notify other parts of the app that auth state changed
          window.dispatchEvent(new CustomEvent("auth-change", { detail: { type: "login", role: data.user.role } }));
        } else {
          setLoginError(
            "Unauthorized — admin or technician role required.",
          );
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
    // notify other parts of the app that admin logged out
    window.dispatchEvent(new CustomEvent("auth-change", { detail: { type: "logout", role: "admin" } }));
  };

  if (token) {
    return (
      <AdminDashboard token={token} onLogout={handleLogout} />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] dark:bg-slate-950 p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/10 blur-[128px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-600/10 blur-[128px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25">
              <LayoutDashboard className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Admin Access
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Sign in to manage repairs
            </p>
          </div>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {loginError}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Email
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fixora.com"
                className="h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-violet-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Password
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-violet-500"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full bg-gradient-to-r from-violet-600 to-cyan-600 text-sm font-semibold uppercase tracking-widest text-white shadow-md transition-all hover:from-violet-700 hover:to-cyan-700 hover:shadow-lg"
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Sign In
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
