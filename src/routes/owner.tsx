import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Wrench,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Phone,
  FileText,
  LogOut,
  Users,
  Activity,
  TrendingUp,
  DollarSign,
  ChevronDown,
  User,
  CheckCircle,
  Mail,
  Send,
  MessageCircle,
  Calendar,
  Package,
  History,
  ShoppingCart,
  Bell,
  ChevronRight,
  Truck,
  Plus,
  Upload,
  Eye,
  X,
  MoreHorizontal,
  Menu,
  Download,
} from "lucide-react";
import { API_BASE } from "../lib/apiBase";
import { toast } from "sonner";

// Date formatting utility
const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return "N/A";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "N/A";
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }) + ', ' + d.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const formatDateShort = (date: string | Date | null | undefined): string => {
  if (!date) return "N/A";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "N/A";
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Date filtering utility
const filterByDate = (items: any[], dateFilter: string, dateField: string = 'created_at'): any[] => {
  if (dateFilter === 'all') return items;
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return items.filter(item => {
    if (!item[dateField]) return false;
    const itemDate = new Date(item[dateField]);
    if (isNaN(itemDate.getTime())) return false;
    
    switch (dateFilter) {
      case 'today':
        return itemDate >= today;
      case 'last_7_days':
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return itemDate >= sevenDaysAgo;
      case 'last_30_days':
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return itemDate >= thirtyDaysAgo;
      case 'this_month':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return itemDate >= startOfMonth;
      case 'last_month':
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        return itemDate >= startOfLastMonth && itemDate <= endOfLastMonth;
      case 'this_year':
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        return itemDate >= startOfYear;
      default:
        return true;
    }
  });
};

/* -------------------- Helper Functions -------------------- */

// Safe toast wrapper for SSR
const safeToast = {
  error: (message: string) => {
    if (typeof window !== "undefined") toast.error(message);
  },
  success: (message: string) => {
    if (typeof window !== "undefined") toast.success(message);
  }
};

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

function getPriorityStyle(priority: string) {
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

/* -------------------- Dashboard -------------------- */

export const Route = createFileRoute("/owner")({
  head: () => ({ meta: [{ title: "Owner Dashboard - Express Repair" }] }),
  component: OwnerDashboard,
});

function OwnerDashboard() {
  const [repairs, setRepairs] = useState<any[]>([]);
  const [repairsSearch, setRepairsSearch] = useState("");
  const [repairsDateFilter, setRepairsDateFilter] = useState("all");

  const [sales, setSales] = useState({
    invoices: [],
    transactions: [],
    expenses: []
  });
  const [salesSearch, setSalesSearch] = useState("");
  const [salesDateFilter, setSalesDateFilter] = useState("all");

  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("repairs");

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({ OPERATIONS: true });

  // Session timeout management
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const [sessionWarning, setSessionWarning] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/login';
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let warningId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      setSessionWarning(false);
      setSessionExpired(false);

      // Warning at 25 minutes
      warningId = setTimeout(() => {
        setSessionWarning(true);
      }, SESSION_TIMEOUT - 5 * 60 * 1000);

      // Logout at 30 minutes
      timeoutId = setTimeout(() => {
        setSessionExpired(true);
        handleLogout();
      }, SESSION_TIMEOUT);
    };

    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, []);

  // Fetch Repairs
  const fetchRepairs = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token') || localStorage.getItem('user_token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE}/repairs/`, { headers });
      if (!response.ok) throw new Error('Failed to fetch repairs');
      
      const data = await response.json();
      setRepairs(data.repairs || []);
    } catch (error) {
      console.error('Error fetching repairs:', error);
      safeToast.error('Failed to load repairs');
    }
  }, []);

  // Fetch Sales Data
  const fetchSales = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token') || localStorage.getItem('user_token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const [invoicesRes, transactionsRes, expensesRes] = await Promise.all([
        fetch(`${API_BASE}/finance/invoices`, { headers }),
        fetch(`${API_BASE}/finance/transactions`, { headers }),
        fetch(`${API_BASE}/finance/expenses`, { headers }),
      ]);

      if (!invoicesRes.ok || !transactionsRes.ok || !expensesRes.ok) {
        throw new Error('Failed to fetch sales data');
      }

      const invoicesData = await invoicesRes.json();
      const transactionsData = await transactionsRes.json();
      const expensesData = await expensesRes.json();

      setSales({
        invoices: invoicesData.invoices || [],
        transactions: transactionsData.transactions || [],
        expenses: expensesData.expenses || [],
      });
    } catch (error) {
      console.error('Error fetching sales:', error);
      safeToast.error('Failed to load sales data');
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchRepairs(), fetchSales()]);
      setIsLoading(false);
    };
    fetchData();
  }, [fetchRepairs, fetchSales]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSection === "repairs") {
        fetchRepairs();
      } else {
        fetchSales();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [activeSection, fetchRepairs, fetchSales]);

  // Filtered repairs
  const filteredRepairs = useMemo(() => {
    let filtered = repairs;
    
    if (repairsSearch) {
      filtered = filtered.filter((repair: any) => {
        const searchLower = repairsSearch.toLowerCase();
        return (
          (repair.customer_name?.toLowerCase() || '').includes(searchLower) ||
          (repair.tracking_id?.toLowerCase() || '').includes(searchLower) ||
          (repair.device_model?.toLowerCase() || '').includes(searchLower)
        );
      });
    }
    
    filtered = filterByDate(filtered, repairsDateFilter);
    
    return filtered;
  }, [repairs, repairsSearch, repairsDateFilter]);

  // Filtered sales
  const filteredSales = useMemo(() => {
    let filtered = sales;
    
    if (salesSearch) {
      filtered = {
        invoices: sales.invoices.filter((item: any) => {
          const searchLower = salesSearch.toLowerCase();
          return (
            (item.customer_name?.toLowerCase() || '').includes(searchLower) ||
            (item.invoice_number?.toLowerCase() || '').includes(searchLower)
          );
        }),
        transactions: sales.transactions.filter((item: any) => {
          const searchLower = salesSearch.toLowerCase();
          return (
            (item.description?.toLowerCase() || '').includes(searchLower) ||
            (item.type?.toLowerCase() || '').includes(searchLower)
          );
        }),
        expenses: sales.expenses.filter((item: any) => {
          const searchLower = salesSearch.toLowerCase();
          return (
            (item.description?.toLowerCase() || '').includes(searchLower) ||
            (item.category?.toLowerCase() || '').includes(searchLower)
          );
        }),
      };
    }
    
    filtered = {
      invoices: filterByDate(filtered.invoices, salesDateFilter),
      transactions: filterByDate(filtered.transactions, salesDateFilter),
      expenses: filterByDate(filtered.expenses, salesDateFilter),
    };
    
    return filtered;
  }, [sales, salesSearch, salesDateFilter]);

  // Sidebar items for owner
  const sidebarGroups = [
    {
      label: "BUSINESS OVERVIEW",
      icon: LayoutDashboard,
      items: [
        { id: "repairs", icon: Wrench, label: "Repair Management", badge: repairs.length > 0 ? repairs.length : null, badgeColor: "bg-amber-500" },
        { id: "sales", icon: DollarSign, label: "Sales & Finance" },
      ]
    }
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map((row: any) => Object.values(row).join(',')).join('\n');
    const csv = headers + '\n' + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F1115]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1115] text-white">
      {/* Session Warning Modal */}
      <AnimatePresence>
        {sessionWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-[#1A1D27] p-6 rounded-lg max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-2">Session Expiring Soon</h3>
              <p className="text-gray-400 mb-4">Your session will expire in 5 minutes. Do you want to extend it?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSessionWarning(false)}
                  className="px-4 py-2 bg-[#6B46C1] text-white rounded-lg hover:bg-[#5B3A9F]"
                >
                  Extend Session
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#1A1D27] border-r border-gray-800 transition-all duration-300 z-40 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6B46C1] rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="font-bold text-lg">Express Repair</h1>
                  <p className="text-xs text-gray-400">Owner Dashboard</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {sidebarGroups.map((group, idx) => {
              const isOpen = openDropdowns[group.label];
              const hasActiveChild = group.items.some(item => item.id === activeSection);

              return (
                <div key={idx} className="mb-4">
                  <button
                    onClick={() => toggleDropdown(group.label)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isOpen || hasActiveChild
                        ? "bg-[#6B46C1] text-white shadow-sm"
                        : "text-slate-400 hover:bg-[#1A1D27] hover:text-white"
                    }`}
                  >
                    <group.icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-left">{group.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 mt-1 space-y-1">
                          {group.items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setActiveSection(item.id)}
                              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                                activeSection === item.id
                                  ? "bg-[#6B46C1] text-white"
                                  : "text-slate-400 hover:bg-[#1A1D27] hover:text-white"
                              }`}
                            >
                              <item.icon className="w-4 h-4 flex-shrink-0" />
                              {sidebarOpen && (
                                <>
                                  <span className="flex-1 text-left">{item.label}</span>
                                  {item.badge && (
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${item.badgeColor} text-white`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </>
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0F1115]/80 backdrop-blur-lg border-b border-gray-800">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-[#1A1D27] transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold">
                {activeSection === "repairs" ? "Repair Management" : "Sales & Finance"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (activeSection === "repairs") {
                    fetchRepairs();
                  } else {
                    fetchSales();
                  }
                }}
                className="p-2 rounded-lg hover:bg-[#1A1D27] transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {activeSection === "repairs" && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search repairs..."
                    value={repairsSearch}
                    onChange={(e) => setRepairsSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#1A1D27] border border-gray-700 rounded-lg focus:outline-none focus:border-[#6B46C1] text-white placeholder-gray-400"
                  />
                </div>
                <select
                  value={repairsDateFilter}
                  onChange={(e) => setRepairsDateFilter(e.target.value)}
                  className="px-4 py-2 bg-[#1A1D27] border border-gray-700 rounded-lg focus:outline-none focus:border-[#6B46C1] text-white"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="last_7_days">Last 7 Days</option>
                  <option value="last_30_days">Last 30 Days</option>
                  <option value="this_month">This Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="this_year">This Year</option>
                </select>
                <button
                  onClick={() => exportToCSV(filteredRepairs, 'repairs.csv')}
                  className="px-4 py-2 bg-[#6B46C1] text-white rounded-lg hover:bg-[#5B3A9F] transition-colors flex items-center_GAP-2"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>

              {/* Repairs Table */}
              <div className="bg-[#1A1D27] border border-gray-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0F1115]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Tracking ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Device
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Created
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {filteredRepairs.map((repair: any) => (
                        <tr key={repair.id} className="hover:bg-[#252836] transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                            {repair.tracking_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {repair.customer_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {repair.device_model}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(repair.status)}`}>
                              {repair.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityStyle(repair.priority)}`}>
                              {repair.priority || 'normal'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {formatDateShort(repair.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredRepairs.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    No repairs found
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === "sales" && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search sales..."
                    value={salesSearch}
                    onChange={(e) => setSalesSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#1A1D27] border border-gray-700 rounded-lg focus:outline-none focus:border-[#6B46C1] text-white placeholder-gray-400"
                  />
                </div>
                <select
                  value={salesDateFilter}
                  onChange={(e) => setSalesDateFilter(e.target.value)}
                  className="px-4 py-2 bg-[#1A1D27] border border-gray-700 rounded-lg focus:outline-none focus:border-[#6B46C1] text-white"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="last_7_days">Last 7 Days</option>
                  <option value="last_30_days">Last 30 Days</option>
                  <option value="this_month">This Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="this_year">This Year</option>
                </select>
              </div>

              {/* Invoices */}
              <div className="bg-[#1A1D27] border border-gray-800 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                  <h3 className="font-semibold">Invoices ({filteredSales.invoices.length})</h3>
                  <button
                    onClick={() => exportToCSV(filteredSales.invoices, 'invoices.csv')}
                    className="text-sm text-[#6B46C1] hover:text-[#5B3A9F]"
                  >
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0F1115]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Invoice #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {filteredSales.invoices.map((invoice: any) => (
                        <tr key={invoice.id} className="hover:bg-[#252836] transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                            {invoice.invoice_number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {invoice.customer_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            £{invoice.amount?.toFixed(2) || '0.00'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                              invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {formatDateShort(invoice.due_date)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Transactions */}
              <div className="bg-[#1A1D27] border border-gray-800 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                  <h3 className="font-semibold">Transactions ({filteredSales.transactions.length})</h3>
                  <button
                    onClick={() => exportToCSV(filteredSales.transactions, 'transactions.csv')}
                    className="text-sm text-[#6B46C1] hover:text-[#5B3A9F]"
                  >
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0F1115]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {filteredSales.transactions.map((txn: any) => (
                        <tr key={txn.id} className="hover:bg-[#252836] transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                            {txn.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            £{txn.amount?.toFixed(2) || '0.00'}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {txn.description || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {formatDateShort(txn.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Expenses */}
              <div className="bg-[#1A1D27] border border-gray-800 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                  <h3 className="font-semibold">Expenses ({filteredSales.expenses.length})</h3>
                  <button
                    onClick={() => exportToCSV(filteredSales.expenses, 'expenses.csv')}
                    className="text-sm text-[#6B46C1] hover:text-[#5B3A9F]"
                  >
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0F1115]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {filteredSales.expenses.map((expense: any) => (
                        <tr key={expense.id} className="hover:bg-[#252836] transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                            {expense.category}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {expense.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            £{expense.total_amount?.toFixed(2) || '0.00'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              expense.status === 'approved' ? 'bg-green-100 text-green-800' :
                              expense.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {expense.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {formatDateShort(expense.date)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
