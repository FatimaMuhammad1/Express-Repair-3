import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  History,
  Search,
  Filter,
  Download,
  Trash2,
  Shield,
  User as UserIcon,
  Clock,
  FileText,
  Wrench,
  Package,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { buildUrl, getAuthHeaders, getStoredToken } from "@/lib/api";
import { toast } from "sonner";

interface AuditLog {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  entity: string;
  entity_id: string;
  previous_value: any;
  new_value: any;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

interface AuditLogsProps {
  token: string;
}

export function AuditLogs({ token }: AuditLogsProps) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [entityFilter, setEntityFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [dateRange, setDateRange] = useState("7");

  useEffect(() => {
    fetchAuditLogs();
  }, [dateRange]);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(buildUrl(`/audit-logs?days=${dateRange}`), {
        headers: getAuthHeaders(),
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
    const matchSearch =
      log.user_name?.toLowerCase().includes(search.toLowerCase()) ||
      log.action?.toLowerCase().includes(search.toLowerCase()) ||
      log.entity?.toLowerCase().includes(search.toLowerCase()) ||
      log.entity_id?.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === "all" || log.action === actionFilter;
    const matchEntity = entityFilter === "all" || log.entity === entityFilter;
    const matchUser = userFilter === "all" || log.user_id === userFilter;
    return matchSearch && matchAction && matchEntity && matchUser;
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case "login":
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case "logout":
        return <XCircle className="h-4 w-4 text-slate-400" />;
      case "create":
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case "update":
        return <Wrench className="h-4 w-4 text-blue-600" />;
      case "delete":
        return <Trash2 className="h-4 w-4 text-rose-600" />;
      case "status_change":
        return <Calendar className="h-4 w-4 text-violet-600" />;
      case "inventory_change":
        return <Package className="h-4 w-4 text-amber-600" />;
      default:
        return <History className="h-4 w-4 text-slate-400" />;
    }
  };

  const getActionColor = (action: string) => {
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

  const getEntityIcon = (entity: string) => {
    switch (entity) {
      case "repair":
        return <Wrench className="h-4 w-4" />;
      case "customer":
        return <UserIcon className="h-4 w-4" />;
      case "product":
        return <Package className="h-4 w-4" />;
      case "booking":
        return <Calendar className="h-4 w-4" />;
      case "staff":
        return <UserIcon className="h-4 w-4" />;
      case "invoice":
        return <FileText className="h-4 w-4" />;
      default:
        return <History className="h-4 w-4" />;
    }
  };

  const handleExportLogs = async () => {
    try {
      const res = await fetch(buildUrl(`/audit-logs/export?days=${dateRange}`), {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audit_logs_${new Date().toISOString().split("T")[0]}.csv`;
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
        headers: getAuthHeaders(),
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
    name: logs.find((l) => l.user_id === id)?.user_name || "Unknown",
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Audit Logs</h2>
          <p className="text-slate-400">Track all system actions and changes</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExportLogs}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handleClearLogs} className="text-rose-600 hover:text-rose-700">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Logs
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Logs</p>
              <p className="mt-2 text-2xl font-bold text-white">{logs.length}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <History className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Today</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {logs.filter((l) => new Date(l.created_at).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
            <div className="rounded-full bg-emerald-100 p-3">
              <Clock className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Unique Users</p>
              <p className="mt-2 text-2xl font-bold text-white">{uniqueUsers.length}</p>
            </div>
            <div className="rounded-full bg-violet-100 p-3">
              <UserIcon className="h-6 w-6 text-violet-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Actions</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {new Set(logs.map((l) => l.action)).size}
              </p>
            </div>
            <div className="rounded-full bg-amber-100 p-3">
              <Shield className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-[#1F2235] bg-[#1A1D27] pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-600" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
          >
            <option value="1">Last 24 hours</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
          >
            <option value="all">All Actions</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="status_change">Status Change</option>
            <option value="inventory_change">Inventory Change</option>
          </select>
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
          >
            <option value="all">All Entities</option>
            <option value="repair">Repairs</option>
            <option value="customer">Customers</option>
            <option value="product">Products</option>
            <option value="booking">Bookings</option>
            <option value="staff">Staff</option>
            <option value="invoice">Invoices</option>
          </select>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <Card className="overflow-hidden border-[#1F2235] bg-[#11131E]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1F2235] bg-[#1A1D27]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Entity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Entity ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  IP Address
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, idx) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="border-b border-[#1F2235] hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(log.created_at).toLocaleDateString()} {new Date(log.created_at).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-slate-100 p-1">
                          <UserIcon className="h-3 w-3 text-slate-600" />
                        </div>
                        <span className="font-medium text-white">{log.user_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getActionColor(log.action)}>
                        <div className="flex items-center gap-1">
                          {getActionIcon(log.action)}
                          {log.action}
                        </div>
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        {getEntityIcon(log.entity)}
                        <span className="capitalize">{log.entity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{log.entity_id}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">{log.ip_address}</td>
                    <td className="px-6 py-4">
                      {(log.previous_value || log.new_value) && (
                        <div className="max-w-xs">
                          {log.previous_value && (
                            <div className="mb-1">
                              <span className="text-xs text-rose-600 dark:text-rose-400">Before:</span>
                              <p className="text-xs text-slate-400 truncate">{JSON.stringify(log.previous_value)}</p>
                            </div>
                          )}
                          {log.new_value && (
                            <div>
                              <span className="text-xs text-emerald-600 dark:text-emerald-400">After:</span>
                              <p className="text-xs text-slate-400 truncate">{JSON.stringify(log.new_value)}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-slate-400">
                    <History className="mx-auto mb-3 h-8 w-8 opacity-40" />
                    <p className="text-sm">No audit logs found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
