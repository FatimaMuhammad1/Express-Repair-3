import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  FileText,
  Download,
  Calendar,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "./StatCard";
import { buildUrl, getAuthHeaders, getStoredToken } from "@/lib/api";
import { toast } from "sonner";

interface FinanceSectionProps {
  token: string;
}

export function FinanceSection({ token }: FinanceSectionProps) {
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState("monthly");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    outstandingPayments: 0,
    netProfit: 0,
    totalExpenses: 0,
    paidInvoices: 0,
    pendingInvoices: 0,
  });
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    fetchFinanceData();
  }, [timePeriod]);

  useEffect(() => {
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
        fetch(buildUrl("/finance/expenses"), { headers: getAuthHeaders(token) }),
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
    const matchSearch = 
      t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredInvoices = invoices.filter((i) => {
    const matchSearch = 
      i.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleExportReport = async () => {
    try {
      const res = await fetch(buildUrl(`/finance/export?period=${timePeriod}`), {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `financial_report_${timePeriod}_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Report exported successfully");
      }
    } catch (error) {
      toast.error("Failed to export report");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Financial Management</h2>
          <p className="text-slate-400">Track revenue, expenses, and payments</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
          >
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="quarterly">This Quarter</option>
            <option value="yearly">This Year</option>
            <option value="all">All Time</option>
          </select>
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`£${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          gradient="from-emerald-500 to-green-500"
        />
        <StatCard
          title="Monthly Revenue"
          value={`£${stats.monthlyRevenue.toLocaleString()}`}
          icon={TrendingUp}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Outstanding Payments"
          value={`£${stats.outstandingPayments.toLocaleString()}`}
          icon={Clock}
          gradient="from-amber-500 to-orange-500"
        />
        <StatCard
          title="Net Profit"
          value={`£${stats.netProfit.toLocaleString()}`}
          icon={Wallet}
          gradient="from-violet-500 to-purple-500"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Expenses</p>
              <p className="mt-2 text-2xl font-bold text-white">
                £{stats.totalExpenses.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-rose-100 p-3">
              <TrendingDown className="h-6 w-6 text-rose-600" />
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
              <p className="text-sm font-medium text-slate-400">Paid Invoices</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {stats.paidInvoices}
              </p>
            </div>
            <div className="rounded-full bg-emerald-100 p-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
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
              <p className="text-sm font-medium text-slate-400">Pending Invoices</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {stats.pendingInvoices}
              </p>
            </div>
            <div className="rounded-full bg-amber-100 p-3">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search transactions or invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-[#1F2235] bg-[#1A1D27] pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-600" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 border-[#1F2235]">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 border-[#1F2235] bg-[#1A1D27]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t, idx) => (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-[#1F2235] hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(t.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {t.description}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {t.customer_name || "N/A"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      £{t.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={
                          t.status === "completed"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : t.status === "pending"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        }
                      >
                        {t.status}
                      </Badge>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-400 dark:text-slate-500">
                    <CreditCard className="mx-auto mb-3 h-8 w-8 opacity-40" />
                    <p className="text-sm">No transactions found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 border-[#1F2235]">
          <h3 className="text-lg font-semibold text-white">Invoices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 border-[#1F2235] bg-[#1A1D27]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Invoice #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv, idx) => (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-[#1F2235] hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 font-mono text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                      {inv.invoice_number}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {inv.customer_name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      £{inv.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(inv.due_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={
                          inv.status === "paid"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : inv.status === "partial"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        }
                      >
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400 dark:text-slate-500">
                    <FileText className="mx-auto mb-3 h-8 w-8 opacity-40" />
                    <p className="text-sm">No invoices found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 border-[#1F2235]">
          <h3 className="text-lg font-semibold text-white">Expenses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 border-[#1F2235] bg-[#1A1D27]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((exp, idx) => (
                  <motion.tr
                    key={exp.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-[#1F2235] hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(exp.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="dark:border-slate-700 dark:text-slate-300">{exp.category}</Badge>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {exp.description}
                    </td>
                    <td className="px-6 py-4 font-semibold text-rose-600 dark:text-rose-400">
                      -£{exp.amount.toFixed(2)}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-400 dark:text-slate-500">
                    <AlertCircle className="mx-auto mb-3 h-8 w-8 opacity-40" />
                    <p className="text-sm">No expenses recorded</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
