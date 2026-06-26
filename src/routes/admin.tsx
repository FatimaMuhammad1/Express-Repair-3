import { createFileRoute, Link } from "@tanstack/react-router";

import { useEffect, useState, useMemo, useCallback } from "react";

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

  XCircle,

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

  Mail,

  Send,

  MessageCircle,

  Calendar,
  Package,
  DollarSign,
  History,
  ShoppingCart,
  Bell,
  ChevronRight,
  Truck,
} from "lucide-react";

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { StatCard, BackupRestore, FinanceSection, NotificationCenter, BranchSelector, GlobalSearch, AuditLogs } from "@/components/admin";
import WalkInIntake from "@/components/admin/WalkInIntake";
import MainDashboard from "@/components/admin/MainDashboard";
import RepairTimeline from "@/components/admin/RepairTimeline";
import AppointmentCalendar from "@/components/admin/AppointmentCalendar";
import ErrorBoundary from "@/components/admin/ErrorBoundary";

import { API_CONFIG, buildUrl, getAuthHeaders, getStoredToken } from "@/lib/api";
import { toast } from "sonner";

/* -------------------- Helper Functions -------------------- */

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



function AdminDashboard({

  token,

  onLogout,

}: {

  token: string;

  onLogout: () => void;

}) {

  const [repairs, setRepairs] = useState<any[]>([
    { id: "1", tracking_id: "REP-1001", customer_name: "Alice Thompson", customer_phone: "07700 100001", device_model: "iPhone 14", issue_description: "Screen cracked", status: "received", technician_id: null, estimated_cost: 89.99, created_at: new Date().toISOString() },
    { id: "2", tracking_id: "REP-1002", customer_name: "Bob Wilson", customer_phone: "07700 100002", device_model: "iPhone 13", issue_description: "Battery replacement", status: "diagnosed", technician_id: "tech1", estimated_cost: 49.99, created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: "3", tracking_id: "REP-1003", customer_name: "Carol Taylor", customer_phone: "07700 100003", device_model: "Samsung S23", issue_description: "Water damage", status: "repairing", technician_id: "tech2", estimated_cost: 129.99, created_at: new Date(Date.now() - 172800000).toISOString() },
    { id: "4", tracking_id: "REP-1004", customer_name: "David Evans", customer_phone: "07700 100004", device_model: "MacBook Pro", issue_description: "Software issue", status: "testing", technician_id: "tech1", estimated_cost: 79.99, created_at: new Date(Date.now() - 259200000).toISOString() },
    { id: "5", tracking_id: "REP-1005", customer_name: "Emma Roberts", customer_phone: "07700 100005", device_model: "iPad Pro", issue_description: "Charging port", status: "collection", technician_id: "tech2", estimated_cost: 59.99, created_at: new Date(Date.now() - 345600000).toISOString() },
  ]);

  const [stats, setStats] = useState<any>({
    total_repairs: 156,
    pending_repairs: 12,
    completed_repairs: 134,
    revenue: 12450.00,
    active_bookings: 28,
    low_stock_items: 5,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [activeSection, setActiveSection] = useState("dashboard");

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({ OPERATIONS: true });

  // Session timeout management
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const [sessionWarning, setSessionWarning] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

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
        onLogout();
      }, SESSION_TIMEOUT);
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Initial timer
    resetTimer();

    // Activity listeners
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [onLogout]);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const [timePeriod, setTimePeriod] = useState("all");

  const [products, setProducts] = useState<any[]>([
    { id: "1", name: "iPhone 14 Screen", category: "Screens", brand: "Apple", model: "iPhone 14", price: 89.99, stock_quantity: 25 },
    { id: "2", name: "iPhone 13 Screen", category: "Screens", brand: "Apple", model: "iPhone 13", price: 79.99, stock_quantity: 30 },
    { id: "3", name: "Samsung S23 Screen", category: "Screens", brand: "Samsung", model: "Galaxy S23", price: 94.99, stock_quantity: 20 },
    { id: "4", name: "iPhone Battery", category: "Batteries", brand: "Apple", model: "Universal", price: 29.99, stock_quantity: 50 },
    { id: "5", name: "USB-C Charger", category: "Accessories", brand: "Generic", model: "65W", price: 24.99, stock_quantity: 100 },
  ]);

  const [inventorySearch, setInventorySearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [showEditStaffModal, setShowEditStaffModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);

  const [staff, setStaff] = useState<any[]>([
    { id: "1", name: "John Smith", email: "john@fixora.co.uk", phone: "07700 900001", role: "technician" },
    { id: "2", name: "Sarah Johnson", email: "sarah@fixora.co.uk", phone: "07700 900002", role: "admin" },
    { id: "3", name: "Mike Williams", email: "mike@fixora.co.uk", phone: "07700 900003", role: "technician" },
  ]);

  const [staffSearch, setStaffSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("all");

  const [messages, setMessages] = useState<any[]>([]);

  const [emailsSent, setEmailsSent] = useState(0);

  const [smsSent, setSmsSent] = useState(0);

  const [showEmailModal, setShowEmailModal] = useState(false);

  const [showSmsModal, setShowSmsModal] = useState(false);

  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  const [bookings, setBookings] = useState<any[]>([
    { id: "1", customer_name: "Alice Thompson", phone: "07700 100001", branch_id: "branch1", preferred_date: new Date().toISOString().split('T')[0], preferred_time_slot: "09:00", status: "confirmed", issue_description: "Screen Repair" },
    { id: "2", customer_name: "Bob Wilson", phone: "07700 100002", branch_id: "branch1", preferred_date: new Date(Date.now() + 86400000).toISOString().split('T')[0], preferred_time_slot: "10:00", status: "pending", issue_description: "Battery Replacement" },
    { id: "3", customer_name: "Carol Taylor", phone: "07700 100003", branch_id: "branch2", preferred_date: new Date(Date.now() + 172800000).toISOString().split('T')[0], preferred_time_slot: "14:00", status: "confirmed", issue_description: "Screen Repair" },
  ]);

  const [bookingSearch, setBookingSearch] = useState("");

  const [selectedRepairs, setSelectedRepairs] = useState<Set<string>>(new Set());
  const [selectedRepairForTimeline, setSelectedRepairForTimeline] = useState<{ id: string; trackingId: string } | null>(null);
  const [showCalendarView, setShowCalendarView] = useState(false);

  // Pagination state
  const [repairsPage, setRepairsPage] = useState(1);
  const [repairsPerPage, setRepairsPerPage] = useState(10);
  const [bookingsPage, setBookingsPage] = useState(1);
  const [bookingsPerPage, setBookingsPerPage] = useState(10);
  const [inventoryPage, setInventoryPage] = useState(1);
  const [inventoryPerPage, setInventoryPerPage] = useState(10);

  const [expenses, setExpenses] = useState<any[]>([
    { id: "1", category: "Rent", description: "Monthly rent payment", amount: 1200.00, date: new Date().toISOString().split('T')[0] },
    { id: "2", category: "Utilities", description: "Electricity bill", amount: 350.00, date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
    { id: "3", category: "Supplies", description: "Office supplies", amount: 150.00, date: new Date(Date.now() - 172800000).toISOString().split('T')[0] },
  ]);
  const [expenseSearch, setExpenseSearch] = useState("");
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState("all");

  const [revenueData, setRevenueData] = useState<any[]>([
    { id: "1", source: "Repairs", description: "Screen repair revenue", amount: 2500.00, date: new Date().toISOString().split('T')[0], status: "received" },
    { id: "2", source: "Sales", description: "Accessory sales", amount: 1800.00, date: new Date(Date.now() - 86400000).toISOString().split('T')[0], status: "received" },
    { id: "3", source: "Repairs", description: "Battery replacements", amount: 1200.00, date: new Date(Date.now() - 172800000).toISOString().split('T')[0], status: "received" },
  ]);
  const [revenueSearch, setRevenueSearch] = useState("");

  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [inventoryManagementSearch, setInventoryManagementSearch] = useState("");

  const [stockMovements, setStockMovements] = useState<any[]>([]);
  const [stockMovementSearch, setStockMovementSearch] = useState("");

  const [lowStockItems, setLowStockItems] = useState<any[]>([]);

  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [supplierSearch, setSupplierSearch] = useState("");

  const [stockPurchases, setStockPurchases] = useState<any[]>([]);
  const [stockPurchaseSearch, setStockPurchaseSearch] = useState("");

  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
  const [purchaseOrderSearch, setPurchaseOrderSearch] = useState("");

  const [onlineSales, setOnlineSales] = useState<any[]>([]);
  const [onlineSaleSearch, setOnlineSaleSearch] = useState("");

  const [inhouseSales, setInhouseSales] = useState<any[]>([]);
  const [inhouseSaleSearch, setInhouseSaleSearch] = useState("");

  const [invoices, setInvoices] = useState<any[]>([]);
  const [invoiceSearch, setInvoiceSearch] = useState("");

  const [payments, setPayments] = useState<any[]>([]);
  const [paymentSearch, setPaymentSearch] = useState("");

  const [customerHistory, setCustomerHistory] = useState<any[]>([]);
  const [customerHistorySearch, setCustomerHistorySearch] = useState("");

  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [rolesSearch, setRolesSearch] = useState("");

  const [profitLoss, setProfitLoss] = useState<any[]>([]);
  const [profitLossPeriod, setProfitLossPeriod] = useState("month");

  const [cashFlow, setCashFlow] = useState<any[]>([]);
  const [cashFlowPeriod, setCashFlowPeriod] = useState("month");

  const [repairTracking, setRepairTracking] = useState<any[]>([]);
  const [repairTrackingSearch, setRepairTrackingSearch] = useState("");

  const [businessSettings, setBusinessSettings] = useState({

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

      sunday: "Closed",

    },

    taxRate: 20,

    currency: "GBP",

    notifications: {

      emailNotifications: true,

      smsNotifications: false,

      bookingReminders: true,

      statusUpdates: true,

    },

    display: {

      showPrices: true,

      showContactInfo: true,

      enableDarkMode: false,

    },

  });




  const fetchRepairs = async () => {

    setIsLoading(true);

    try {

      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.ALL), {

        headers: { Authorization: `Bearer ${token}` },

      });

      const data = await res.json();

      if (res.ok && data.success) setRepairs(data.repairs || []);

      else if (res.status === 401) onLogout();

    } catch (e) {

      console.error(e);
      toast.error("Failed to fetch repairs");

    } finally {

      setIsLoading(false);

    }

  };



  const fetchStats = async () => {

    try {

      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.STATS), {

        headers: { Authorization: `Bearer ${token}` },

      });

      const data = await res.json();

      if (res.ok && data.success) setStats(data.stats);

    } catch (e) {

      console.error(e);
      toast.error("Failed to fetch stats");

    }

  };



  const exportRepairsCSV = async () => {

    try {

      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.EXPORT_CSV), {

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
      toast.error("Failed to export repairs");

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

        buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.UPDATE_STATUS(trackingId)),

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
      toast.error("Failed to update repair status");

      // Revert on error

      setRepairs(prev => prev.map(r =>

        r.tracking_id === trackingId ? { ...r, status: r.status } : r

      ));

    }

  };

  const updatePriority = async (trackingId: string, newPriority: string) => {
    setRepairs(prev => prev.map(r =>
      r.tracking_id === trackingId ? { ...r, priority: newPriority } : r
    ));

    try {
      await fetch(
        buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.UPDATE_STATUS(trackingId)),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ priority: newPriority }),
        },
      );
    } catch (e) {
      console.error("Failed to update priority:", e);
      toast.error("Failed to update priority");
    }
  };

  const updateTechnician = async (trackingId: string, technicianId: string) => {
    setRepairs(prev => prev.map(r =>
      r.tracking_id === trackingId ? { ...r, technician_id: technicianId || null } : r
    ));

    try {
      await fetch(
        buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.UPDATE_STATUS(trackingId)),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ technician_id: technicianId || null }),
        },
      );
    } catch (e) {
      console.error("Failed to update technician:", e);
      toast.error("Failed to update technician");
    }
  };



  const deleteRepair = async (trackingId: string) => {

    if (!confirm("Are you sure you want to delete this repair? This action cannot be undone.")) return;



    try {

      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.REPAIRS.DELETE(trackingId)), {

        method: "DELETE",

        headers: { Authorization: `Bearer ${token}` },

      });

      if (res.ok) {

        setRepairs(prev => prev.filter(r => r.tracking_id !== trackingId));

      }

    } catch (e) {

      console.error(e);
      toast.error("Failed to delete repair");

    }

  };



  const statuses = [

    "received",

    "diagnosed",

    "repairing",

    "testing",

    "collection",

  ];



  // Memoized filtered repairs for performance
  const filteredRepairs = useMemo(() => {
    return repairs.filter((r) => {
      const matchSearch =
        r.tracking_id?.toLowerCase().includes(search.toLowerCase()) ||
        r.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
        r.customer_phone?.includes(search);

      const matchStatus = statusFilter === "all" || r.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [repairs, search, statusFilter]);

  // Filtered bookings for booking management
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.customer_name?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        booking.phone?.toLowerCase().includes(bookingSearch.toLowerCase());
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, bookingSearch, statusFilter]);

  // Filter repairs by time period for analytics (memoized)
  const filteredRepairsByTime = useMemo(() => {
    const now = new Date();
    return repairs.filter((r) => {
      const repairDate = new Date(r.created_at);
      if (timePeriod === "all") return true;

      if (timePeriod === "daily") {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return repairDate >= today;
      }

      if (timePeriod === "weekly") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return repairDate >= weekAgo;
      }

      if (timePeriod === "monthly") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return repairDate >= monthAgo;
      }

      return true;
    });
  }, [repairs, timePeriod]);



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



  // Analytics metrics - use backend stats if available, otherwise use filtered data

  const analyticsRepairs = activeSection === "analytics" ? filteredRepairsByTime : repairs;

  const totalRepairs = stats?.total_repairs || analyticsRepairs.length;

  const completedRepairs = stats?.status_breakdown?.collection || analyticsRepairs.filter((r) => r.status === "collection").length;

  const completionRate =

    totalRepairs > 0 ? Math.round((completedRepairs / totalRepairs) * 100) : 0;

  const inProgressRepairs = stats?.status_breakdown
    ? Object.values(stats.status_breakdown).reduce((a: number, b: number) => a + b, 0) - completedRepairs
    : analyticsRepairs.filter((r: any) => r.status !== "collection").length;

  const totalRevenue = stats?.total_revenue || 0;



  // Pagination helpers
  const paginate = (data: any[], page: number, perPage: number) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = (data: any[], perPage: number) => Math.ceil(data.length / perPage);

  // Paginated data
  const paginatedRepairs = paginate(filteredRepairs, repairsPage, repairsPerPage);
  const paginatedBookings = paginate(filteredBookings, bookingsPage, bookingsPerPage);
  const paginatedInventory = paginate(inventoryItems, inventoryPage, inventoryPerPage);



  // Chart data processing

  const repairsOverTime = analyticsRepairs.reduce((acc: any[], r) => {

    const date = new Date(r.created_at).toLocaleDateString();

    const existing = acc.find((item) => item.date === date);

    if (existing) {

      existing.count++;

    } else {

      acc.push({ date, count: 1 });

    }

    return acc;

  }, []).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());



  const repairsByStatus = analyticsRepairs.reduce((acc: any, r) => {

    const status = r.status === "collection" ? "Completed" : r.status.charAt(0).toUpperCase() + r.status.slice(1);

    acc[status] = (acc[status] || 0) + 1;

    return acc;

  }, {} as Record<string, number>);



  const statusChartData = Object.entries(repairsByStatus).map(([name, value]) => ({ name, value }));



  const deviceTypeData = analyticsRepairs.reduce((acc: any, r) => {

    const device = r.device_model?.split(" ")[0] || "Other";

    acc[device] = (acc[device] || 0) + 1;

    return acc;

  }, {} as Record<string, number>);



  const deviceChartData = Object.entries(deviceTypeData)

    .map(([name, value]) => ({ name, value: value as number }))

    .sort((a, b) => (b.value as number) - (a.value as number))

    .slice(0, 6);



  const COLORS = ["#8b5cf6", "#06b6d4", "#22c55e", "#f97316", "#ec4899", "#eab308"];



  // Activity log (sorted by date)

  const activityLog = repairs

    .sort(

      (a, b) =>

        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),

    )

    .slice(0, 15);

  // Filtered products for inventory
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) => {
        const matchesSearch =
          product.name?.toLowerCase().includes(inventorySearch.toLowerCase()) ||
          product.brand?.toLowerCase().includes(inventorySearch.toLowerCase()) ||
          product.model?.toLowerCase().includes(inventorySearch.toLowerCase());
        const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
      }
    );
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
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowEditProductModal(true);
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.PRODUCTS.ALL + `/${editingProduct.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(editingProduct)
      });
      if (res.ok) {
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
        setShowEditProductModal(false);
        setEditingProduct(null);
        toast.success("Product updated successfully");
      } else {
        toast.error("Failed to update product");
      }
    } catch (e) {
      console.error("Failed to update product:", e);
      toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.PRODUCTS.ALL + `/${productId}`), {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== productId));
      }
    } catch (e) {
      console.error("Failed to delete product:", e);
      toast.error("Failed to delete product");
    }
  };

  // Fetch products when inventory section is active
  useEffect(() => {
    if (activeSection === "inventory") {
      fetchProducts();
    }
  }, [activeSection]);

  // Filtered staff for staff management
  const filteredStaff = useMemo(() => {
    return staff.filter(
      (staffMember) => {
        const matchesSearch =
          staffMember.name?.toLowerCase().includes(staffSearch.toLowerCase()) ||
          staffMember.email?.toLowerCase().includes(staffSearch.toLowerCase()) ||
          staffMember.role?.toLowerCase().includes(staffSearch.toLowerCase());
        const matchesRole = roleFilter === "all" || staffMember.role === roleFilter;
        return matchesSearch && matchesRole;
      }
    );
  }, [staff, staffSearch, roleFilter]);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/users/staff"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStaff(data.staff || []);
      }
    } catch (e) {
      console.error("Failed to fetch staff:", e);
      toast.error("Failed to fetch staff");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditStaff = (staffMember: any) => {
    setEditingStaff(staffMember);
    setShowEditStaffModal(true);
  };

  const handleSaveStaff = async () => {
    if (!editingStaff) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/users/${editingStaff.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name: editingStaff.name,
          email: editingStaff.email,
          role: editingStaff.role
        })
      });
      if (res.ok) {
        setStaff(prev => prev.map(s => s.id === editingStaff.id ? editingStaff : s));
        setShowEditStaffModal(false);
        setEditingStaff(null);
        toast.success("Staff member updated successfully");
      } else {
        toast.error("Failed to update staff member");
      }
    } catch (e) {
      console.error("Failed to update staff:", e);
      toast.error("Failed to update staff member");
    }
  };

  const handleToggleStaffStatus = async (staffMember: any) => {
    const newStatus = !staffMember.is_active;
    if (!confirm(`Are you sure you want to ${newStatus ? "activate" : "deactivate"} this staff member?`)) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/users/${staffMember.id}/status`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ is_active: newStatus })
      });
      if (res.ok) {
        setStaff(prev => prev.map(s => s.id === staffMember.id ? { ...s, is_active: newStatus } : s));
      }
    } catch (e) {
      console.error("Failed to toggle staff status:", e);
      toast.error("Failed to toggle staff status");
    }
  };

  // Fetch staff when staff section is active
  useEffect(() => {
    if (activeSection === "staff") {
      fetchStaff();
    }
  }, [activeSection]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/bookings/all"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBookings(data.bookings || []);
      }
    } catch (e) {
      console.error("Failed to fetch bookings:", e);
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmBooking = async (booking: any) => {
    if (!confirm("Are you sure you want to confirm this booking?")) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/bookings/${booking.id}/status`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: "confirmed" })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: "confirmed" } : b));
      }
    } catch (e) {
      console.error("Failed to confirm booking:", e);
      toast.error("Failed to confirm booking");
    }
  };

  const handleCancelBooking = async (booking: any) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/bookings/${booking.id}/status`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: "cancelled" })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: "cancelled" } : b));
      }
    } catch (e) {
      console.error("Failed to cancel booking:", e);
      toast.error("Failed to cancel booking");
    }
  };

  // Fetch bookings when bookings section is active
  useEffect(() => {
    if (activeSection === "bookings") {
      fetchBookings();
    }
  }, [activeSection]);

  // Fetch roles & permissions
  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/roles"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRoles(data.roles || []);
        setPermissions(data.roles?.flatMap(r => r.permissions) || []);
      }
    } catch (e) {
      console.error("Failed to fetch roles:", e);
      toast.error("Failed to fetch roles");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profit & loss
  const fetchProfitLoss = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/financials/profit-loss?period=${profitLossPeriod}`), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProfitLoss(data.profitLoss || []);
      }
    } catch (e) {
      console.error("Failed to fetch profit & loss:", e);
      toast.error("Failed to fetch profit & loss");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch cash flow
  const fetchCashFlow = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/financials/cash-flow?period=${cashFlowPeriod}`), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCashFlow(data.cashFlow || []);
      }
    } catch (e) {
      console.error("Failed to fetch cash flow:", e);
      toast.error("Failed to fetch cash flow");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch repair tracking
  const fetchRepairTracking = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/financials/repair-tracking"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRepairTracking(data.repairTracking || []);
      }
    } catch (e) {
      console.error("Failed to fetch repair tracking:", e);
      toast.error("Failed to fetch repair tracking");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch expenses
  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/finance/expenses"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setExpenses(data.expenses || []);
      }
    } catch (e) {
      console.error("Failed to fetch expenses:", e);
      toast.error("Failed to fetch expenses");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch revenue
  const fetchRevenue = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/finance/revenue"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRevenueData(data.revenue || []);
      }
    } catch (e) {
      console.error("Failed to fetch revenue:", e);
      toast.error("Failed to fetch revenue");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch online sales
  const fetchOnlineSales = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/finance/online-sales"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOnlineSales(data.onlineSales || []);
      }
    } catch (e) {
      console.error("Failed to fetch online sales:", e);
      toast.error("Failed to fetch online sales");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch in-house sales
  const fetchInhouseSales = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/finance/inhouse-sales"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInhouseSales(data.inhouseSales || []);
      }
    } catch (e) {
      console.error("Failed to fetch in-house sales:", e);
      toast.error("Failed to fetch in-house sales");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch invoices
  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/finance/invoices"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInvoices(data.invoices || []);
      }
    } catch (e) {
      console.error("Failed to fetch invoices:", e);
      toast.error("Failed to fetch invoices");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch payments
  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/finance/transactions"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPayments(data.transactions || []);
      }
    } catch (e) {
      console.error("Failed to fetch payments:", e);
      toast.error("Failed to fetch payments");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch customer history
  const fetchCustomerHistory = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/customers"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCustomerHistory(data.customers || []);
      }
    } catch (e) {
      console.error("Failed to fetch customer history:", e);
      toast.error("Failed to fetch customer history");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch inventory items
  const fetchInventoryItems = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/products"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInventoryItems(data.products || []);
        setLowStockItems(data.products?.filter((p: any) => p.stock_quantity <= 5) || []);
      }
    } catch (e) {
      console.error("Failed to fetch inventory items:", e);
      toast.error("Failed to fetch inventory items");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch stock movements
  const fetchStockMovements = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/inventory/movements"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStockMovements(data.movements || []);
      }
    } catch (e) {
      console.error("Failed to fetch stock movements:", e);
      toast.error("Failed to fetch stock movements");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch suppliers
  const fetchSuppliers = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/suppliers"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuppliers(data.suppliers || []);
      }
    } catch (e) {
      console.error("Failed to fetch suppliers:", e);
      toast.error("Failed to fetch suppliers");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch stock purchases
  const fetchStockPurchases = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/inventory/purchases"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStockPurchases(data.purchases || []);
      }
    } catch (e) {
      console.error("Failed to fetch stock purchases:", e);
      toast.error("Failed to fetch stock purchases");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch purchase orders
  const fetchPurchaseOrders = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/inventory/orders"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPurchaseOrders(data.orders || []);
      }
    } catch (e) {
      console.error("Failed to fetch purchase orders:", e);
      toast.error("Failed to fetch purchase orders");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect hooks for data fetching
  useEffect(() => {
    if (activeSection === "roles_permissions") {
      fetchRoles();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "profit_loss") {
      fetchProfitLoss();
    }
  }, [activeSection, profitLossPeriod]);

  useEffect(() => {
    if (activeSection === "cash_flow") {
      fetchCashFlow();
    }
  }, [activeSection, cashFlowPeriod]);

  useEffect(() => {
    if (activeSection === "repair_tracking") {
      fetchRepairTracking();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "expenses") {
      fetchExpenses();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "revenue") {
      fetchRevenue();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "online_sales") {
      fetchOnlineSales();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "inhouse_sales") {
      fetchInhouseSales();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "invoices") {
      fetchInvoices();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "payments") {
      fetchPayments();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "customer_history") {
      fetchCustomerHistory();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "inventory_management") {
      fetchInventoryItems();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "stock_movements") {
      fetchStockMovements();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "supplier_management") {
      fetchSuppliers();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "stock_purchases") {
      fetchStockPurchases();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "purchase_orders") {
      fetchPurchaseOrders();
    }
  }, [activeSection]);

  // CRUD Handlers for Expenses
  const handleCreateExpense = async (expenseData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/finance/expenses"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(expenseData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setExpenses(prev => [data.expense, ...prev]);
        toast.success("Expense created successfully");
      }
    } catch (e) {
      console.error("Failed to create expense:", e);
      toast.error("Failed to create expense");
    }
  };

  const handleUpdateExpense = async (expenseId: string, expenseData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/finance/expenses/${expenseId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(expenseData)
      });
      if (res.ok) {
        setExpenses(prev => prev.map(e => e.id === expenseId ? { ...e, ...expenseData } : e));
        toast.success("Expense updated successfully");
      }
    } catch (e) {
      console.error("Failed to update expense:", e);
      toast.error("Failed to update expense");
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/finance/expenses/${expenseId}`), {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setExpenses(prev => prev.filter(e => e.id !== expenseId));
        toast.success("Expense deleted successfully");
      }
    } catch (e) {
      console.error("Failed to delete expense:", e);
      toast.error("Failed to delete expense");
    }
  };

  // CRUD Handlers for Revenue
  const handleCreateRevenue = async (revenueData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/finance/revenue"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(revenueData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRevenueData(prev => [data.revenue, ...prev]);
        toast.success("Revenue created successfully");
      }
    } catch (e) {
      console.error("Failed to create revenue:", e);
      toast.error("Failed to create revenue");
    }
  };

  // CRUD Handlers for Online Sales
  const handleCreateOnlineSale = async (saleData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/finance/online-sales"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(saleData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOnlineSales(prev => [data.onlineSale, ...prev]);
        toast.success("Online sale created successfully");
      }
    } catch (e) {
      console.error("Failed to create online sale:", e);
      toast.error("Failed to create online sale");
    }
  };

  const handleUpdateOnlineSale = async (saleId: string, saleData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/finance/online-sales/${saleId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(saleData)
      });
      if (res.ok) {
        setOnlineSales(prev => prev.map(s => s.id === saleId ? { ...s, ...saleData } : s));
        toast.success("Online sale updated successfully");
      }
    } catch (e) {
      console.error("Failed to update online sale:", e);
      toast.error("Failed to update online sale");
    }
  };

  const handleDeleteOnlineSale = async (saleId: string) => {
    if (!confirm("Are you sure you want to delete this online sale?")) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/finance/online-sales/${saleId}`), {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setOnlineSales(prev => prev.filter(s => s.id !== saleId));
        toast.success("Online sale deleted successfully");
      }
    } catch (e) {
      console.error("Failed to delete online sale:", e);
      toast.error("Failed to delete online sale");
    }
  };

  // CRUD Handlers for In-House Sales
  const handleCreateInhouseSale = async (saleData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/finance/inhouse-sales"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(saleData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInhouseSales(prev => [data.inhouseSale, ...prev]);
        toast.success("In-house sale created successfully");
      }
    } catch (e) {
      console.error("Failed to create in-house sale:", e);
      toast.error("Failed to create in-house sale");
    }
  };

  const handleUpdateInhouseSale = async (saleId: string, saleData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/finance/inhouse-sales/${saleId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(saleData)
      });
      if (res.ok) {
        setInhouseSales(prev => prev.map(s => s.id === saleId ? { ...s, ...saleData } : s));
        toast.success("In-house sale updated successfully");
      }
    } catch (e) {
      console.error("Failed to update in-house sale:", e);
      toast.error("Failed to update in-house sale");
    }
  };

  const handleDeleteInhouseSale = async (saleId: string) => {
    if (!confirm("Are you sure you want to delete this in-house sale?")) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/finance/inhouse-sales/${saleId}`), {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setInhouseSales(prev => prev.filter(s => s.id !== saleId));
        toast.success("In-house sale deleted successfully");
      }
    } catch (e) {
      console.error("Failed to delete in-house sale:", e);
      toast.error("Failed to delete in-house sale");
    }
  };

  // CRUD Handlers for Roles
  const handleCreateRole = async (roleData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/roles"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(roleData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRoles(prev => [...prev, { ...data.role, permissions: [], userCount: 0 }]);
        toast.success("Role created successfully");
      }
    } catch (e) {
      console.error("Failed to create role:", e);
      toast.error("Failed to create role");
    }
  };

  const handleUpdateRole = async (roleId: string, roleData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/roles/${roleId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(roleData)
      });
      if (res.ok) {
        setRoles(prev => prev.map(r => r.id === roleId ? { ...r, ...roleData } : r));
        toast.success("Role updated successfully");
      }
    } catch (e) {
      console.error("Failed to update role:", e);
      toast.error("Failed to update role");
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!confirm("Are you sure you want to delete this role?")) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/roles/${roleId}`), {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setRoles(prev => prev.filter(r => r.id !== roleId));
        toast.success("Role deleted successfully");
      }
    } catch (e) {
      console.error("Failed to delete role:", e);
      toast.error("Failed to delete role");
    }
  };

  const handleAddPermission = async (roleId: string, permData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/roles/${roleId}/permissions`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(permData)
      });
      if (res.ok) {
        fetchRoles();
        toast.success("Permission added successfully");
      }
    } catch (e) {
      console.error("Failed to add permission:", e);
      toast.error("Failed to add permission");
    }
  };

  const handleRemovePermission = async (roleId: string, permissionId: string) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/roles/${roleId}/permissions/${permissionId}`), {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (res.ok) {
        fetchRoles();
        toast.success("Permission removed successfully");
      }
    } catch (e) {
      console.error("Failed to remove permission:", e);
      toast.error("Failed to remove permission");
    }
  };

  const fetchCommunications = async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/communications/history"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessages(data.communications || []);
      }
    } catch (e) {
      console.error("Failed to fetch communications:", e);
      toast.error("Failed to fetch communications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeSection === "communication") {
      fetchCommunications();
    }
  }, [activeSection]);

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedRepairs.size} repairs?`)) return;
    try {
      const token = getStoredToken();
      await Promise.all(
        Array.from(selectedRepairs).map(id =>
          fetch(buildUrl(`/repairs/${id}`), {
            method: "DELETE",
            headers: {
              ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
          })
        )
      );
      setRepairs(prev => prev.filter(r => !selectedRepairs.has(r.id)));
      setSelectedRepairs(new Set());
      toast.success("Repairs deleted successfully");
    } catch (e) {
      console.error("Failed to delete repairs:", e);
      toast.error("Failed to delete repairs");
    }
  };

  const handleBulkStatusUpdate = async (status: string) => {
    if (!confirm(`Are you sure you want to mark ${selectedRepairs.size} repairs as ${status}?`)) return;
    try {
      const token = getStoredToken();
      await Promise.all(
        Array.from(selectedRepairs).map(id =>
          fetch(buildUrl(`/repairs/${id}/status`), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            body: JSON.stringify({ status })
          })
        )
      );
      setRepairs(prev => prev.map(r => selectedRepairs.has(r.id) ? { ...r, status } : r));
      setSelectedRepairs(new Set());
      toast.success(`Repairs marked as ${status}`);
    } catch (e) {
      console.error("Failed to update repairs:", e);
      toast.error("Failed to update repairs");
    }
  };



  // Get user role from localStorage
  const userRole = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("admin_user") || "{}").role : "";

  // Define sidebar items based on role
  // Define sidebar items based on role
  const sidebarGroups = [
    {
      label: "OPERATIONS",
      icon: Activity,
      items: [
        { id: "bookings", icon: Calendar, label: "Online Bookings" },
        { id: "walkin", icon: User, label: "Walk-in Bookings" },
        { id: "repairs", icon: Wrench, label: "Repair Orders", badge: repairs.length > 0 ? repairs.length : null, badgeColor: "bg-amber-500" },
        { id: "repair_tracking", icon: Activity, label: "Repair Tracking" },
      ]
    },
    {
      label: "SALES",
      icon: ShoppingCart,
      items: [
        { id: "online_sales", icon: ShoppingCart, label: "Online Sales" },
        { id: "inhouse_sales", icon: ShoppingCart, label: "In-House Sales" },
        { id: "invoices", icon: FileText, label: "Invoices" },
        { id: "payments", icon: DollarSign, label: "Payments" },
      ]
    },
    {
      label: "PURCHASING",
      icon: Truck,
      items: [
        { id: "purchase_orders", icon: FileText, label: "Purchase Orders" },
        { id: "stock_purchases", icon: Package, label: "Stock Purchases" },
        { id: "supplier_management", icon: Users, label: "Supplier Management" },
      ]
    },
    {
      label: "INVENTORY",
      icon: Database,
      items: [
        { id: "inventory", icon: Package, label: "Products" },
        { id: "inventory_management", icon: Database, label: "Inventory Management" },
        { id: "stock_movements", icon: TrendingUp, label: "Stock Movements" },
        { id: "low_stock_alerts", icon: AlertCircle, label: "Low Stock Alerts" },
      ]
    },
    {
      label: "CUSTOMERS",
      icon: Users,
      items: [
        { id: "customers", icon: Users, label: "Customers" },
        { id: "communication", icon: MessageCircle, label: "Customer Communication" },
        { id: "customer_history", icon: History, label: "Customer History" },
      ]
    },
    {
      label: "FINANCE",
      icon: DollarSign,
      items: [
        { id: "revenue", icon: TrendingUp, label: "Revenue" },
        { id: "expenses", icon: FileText, label: "Expenses" },
        { id: "finance", icon: Activity, label: "Financial Overview" },
        { id: "profit_loss", icon: TrendingUp, label: "Profit & Loss" },
        { id: "cash_flow", icon: DollarSign, label: "Cash Flow" },
      ]
    },
    {
      label: "REPORTS",
      icon: FileText,
      items: [
        { id: "analytics", icon: TrendingUp, label: "Analytics" },
        { id: "activity", icon: Activity, label: "Activity Logs" },
      ]
    },
    {
      label: "ADMINISTRATION",
      icon: ShieldCheck,
      items: [
        { id: "staff", icon: User, label: "Staff Management" },
        { id: "roles_permissions", icon: ShieldCheck, label: "Roles & Permissions" },
        { id: "audit_logs", icon: History, label: "Audit Logs" },
        { id: "settings", icon: ShieldCheck, label: "Settings" },
      ]
    }
  ];

  // Filter sidebar items based on role
  const filteredSidebarGroups = sidebarGroups.map(group => ({
    ...group,
    items: group.items.filter(item => {
      if (userRole === "STAFF") {
        return ["dashboard", "repairs", "customers", "bookings", "finance", "walkin"].includes(item.id);
      }
      return true;
    })
  })).filter(group => group.items.length > 0);



  return (

    <div className="relative min-h-screen bg-[#0B0D17] text-slate-200">

      <div className="pointer-events-none absolute inset-0 z-0 opacity-0"></div>

      <div className="relative z-10 flex min-h-screen bg-[#0B0D17]">

        {/* Sidebar */}

        <motion.aside

          initial={{ x: -280 }}

          animate={{ x: 0 }}

          className="fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col border-r border-[#1F2235] bg-[#11131E]"

        >

          <div className="flex h-16 items-center gap-3 border-b border-[#1F2235] px-6 bg-[#11131E]">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6B46C1]">

              <LayoutDashboard className="h-4 w-4 text-white" />

            </div>

            <span className="text-sm font-bold tracking-wide text-white">

              Fixora Admin

            </span>

          </div>



          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto custom-scrollbar">

            <button
              onClick={() => setActiveSection("dashboard")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all mb-4 ${activeSection === "dashboard"
                  ? "bg-[#6B46C1] text-white shadow-sm"
                  : "text-slate-400 hover:bg-[#1A1D27] hover:text-white"
                }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </button>

            {filteredSidebarGroups.map((group, idx) => {
              const isOpen = openDropdowns[group.label];
              const hasActiveChild = group.items.some(item => item.id === activeSection);

              return (
                <div key={idx} className="space-y-1 mb-2">

                  <button
                    onClick={() => toggleDropdown(group.label)}
                    className={`flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${hasActiveChild && !isOpen ? "text-white bg-[#1A1D27]" : "text-slate-300 hover:bg-[#1A1D27] hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <group.icon className={`h-4 w-4 ${hasActiveChild ? "text-[#6B46C1]" : "text-slate-400"}`} />
                      <span className="text-[11px] font-bold uppercase tracking-wider">{group.label}</span>
                    </div>
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1 pt-1 pb-2 pl-9 pr-2 border-l-2 border-[#1A1D27] ml-5">
                          {group.items.map((item) => (

                            <button

                              key={item.id}

                              onClick={() => setActiveSection(item.id)}

                              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${activeSection === item.id

                                  ? "bg-[#6B46C1] text-white shadow-sm"

                                  : "text-slate-400 hover:bg-[#1A1D27] hover:text-white"

                                }`}

                            >

                              <div className="flex items-center gap-3">
                                <span className="truncate">{item.label}</span>
                              </div>

                              {item.badge && (

                                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white ${item.badgeColor}`}>

                                  {item.badge}

                                </span>

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



          <div className="border-t border-[#1F2235] p-4 space-y-2">

            <Link

              to="/profile"

              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-[#1A1D27] hover:text-white"

            >

              <User className="h-4 w-4" />

              My Account

            </Link>

            <button

              onClick={onLogout}

              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-950/30 hover:text-rose-300"

            >

              <LogOut className="h-4 w-4" />

              Sign Out

            </button>

          </div>

        </motion.aside>



        {/* Main */}

        <div className="ml-[260px] flex-1 bg-[#0B0D17] min-h-screen">

          {/* Top Bar */}

          <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#1F2235] bg-[#11131E] px-8">

            <div className="flex items-center gap-4">

              <h1 className="text-lg font-bold text-white">

                {activeSection === "dashboard" && "Dashboard"}

                {activeSection === "repairs" && "Repair Management"}

                {activeSection === "customers" && "Customer Management"}

                {activeSection === "inventory" && "Inventory Management"}

                {activeSection === "staff" && "Staff Management"}

                {activeSection === "communication" && "Customer Communication"}

                {activeSection === "bookings" && "Appointment Bookings"}

                {activeSection === "walkin" && "Walk-in Intake"}

                {activeSection === "finance" && "Financial Overview"}

                {activeSection === "profit_loss" && "Profit & Loss"}

                {activeSection === "cash_flow" && "Cash Flow"}

                {activeSection === "repair_tracking" && "Repair Tracking"}

                {activeSection === "roles_permissions" && "Roles & Permissions"}

                {activeSection === "analytics" && "Analytics & Reports"}

                {activeSection === "activity" && "Activity Log"}

                {activeSection === "audit_logs" && "Audit Logs"}

                {activeSection === "settings" && "Business Settings"}

              </h1>

            </div>

            <div className="flex items-center gap-4">

              <BranchSelector token={token} />

              <GlobalSearch token={token} />

              <NotificationCenter token={token} />

              {activeSection === "repairs" && (

                <Button

                  variant="outline"

                  size="sm"

                  onClick={exportRepairsCSV}

                  className="border-[#2D3142] bg-[#1A1D27] text-slate-200 hover:bg-[#2D3142] hover:text-white font-medium"

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

                className="border-[#2D3142] bg-[#1A1D27] text-slate-200 hover:bg-[#2D3142] hover:text-white font-medium"

              >

                <RefreshCw

                  className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}

                />

                Refresh

              </Button>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6B46C1] text-xs font-bold text-white">

                A

              </div>

            </div>

          </div>



          {/* Content */}

          {activeSection === "dashboard" && <MainDashboard />}

          <div className={`bg-[#0B0D17] min-h-screen ${activeSection === "dashboard" ? "hidden" : "p-8"}`}>

            {activeSection === "repairs" && (

              <>

                {/* Repairs Section */}

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

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

                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by name, phone, or tracking ID"

                      value={search}

                      onChange={(e) => setSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                  <div className="flex items-center gap-2">

                    <Filter className="h-4 w-4 text-slate-600" />

                    <select

                      value={statusFilter}

                      onChange={(e) => setStatusFilter(e.target.value)}

                      className="h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"

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



                {/* Bulk Actions */}
                {selectedRepairs.size > 0 && (

                  <div className="flex items-center gap-2">

                    <span className="text-sm text-slate-600">{selectedRepairs.size} selected</span>

                    <Button

                      variant="outline"

                      size="sm"

                      onClick={handleBulkDelete}

                      className="border-rose-500 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"

                    >

                      <Trash2 className="mr-2 h-4 w-4" />

                      Delete Selected

                    </Button>

                    <Button

                      variant="outline"

                      size="sm"

                      onClick={() => handleBulkStatusUpdate("completed")}

                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"

                    >

                      <CheckCircle2 className="mr-2 h-4 w-4" />

                      Mark Complete

                    </Button>

                  </div>

                )}



                {/* Table */}

                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-12">

                            <input

                              type="checkbox"

                              checked={selectedRepairs.size === filteredRepairs.length && filteredRepairs.length > 0}

                              onChange={(e) => {

                                if (e.target.checked) {

                                  setSelectedRepairs(new Set(filteredRepairs.map(r => r.id)));

                                } else {

                                  setSelectedRepairs(new Set());

                                }

                              }}

                              className="rounded border-slate-300"

                            />

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-24">

                            ID

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Customer

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Device

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Priority

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Technician

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Date

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-20">

                            Actions

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {paginatedRepairs.length > 0 ? (

                          paginatedRepairs.map((r, idx) => (

                            <motion.tr

                              key={r.id}

                              initial={{ opacity: 0, y: 8 }}

                              animate={{ opacity: 1, y: 0 }}

                              transition={{ delay: idx * 0.03 }}

                              className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                            >

                              <td className="px-4 py-3">

                                <input

                                  type="checkbox"

                                  checked={selectedRepairs.has(r.id)}

                                  onChange={(e) => {

                                    const newSelected = new Set(selectedRepairs);

                                    if (e.target.checked) {

                                      newSelected.add(r.id);

                                    } else {

                                      newSelected.delete(r.id);

                                    }

                                    setSelectedRepairs(newSelected);

                                  }}

                                  className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 focus:ring-offset-0"

                                />

                              </td>

                              <td className="px-6 py-4 font-mono text-sm text-cyan-600 font-semibold">
                                <Link
                                  to={`/admin/repairs/${r.id}`}
                                  className="hover:underline hover:text-cyan-700"
                                >
                                  {r.tracking_id}
                                </Link>
                              </td>

                              <td className="px-4 py-3">

                                <div className="font-medium text-white">

                                  {r.customer_name || "Unknown Customer"}

                                </div>

                                <div className="mt-0.5 flex items-center text-xs text-slate-500">

                                  <Phone className="mr-1 h-3 w-3" />

                                  {r.customer_phone || "No phone"}

                                </div>

                              </td>

                              <td className="px-4 py-3">

                                <div className="flex items-center text-slate-700">

                                  <FileText className="mr-2 h-4 w-4 text-slate-400" />

                                  {r.device_model || "Unknown device"}

                                </div>

                              </td>

                              <td className="px-4 py-3">

                                <div className="flex items-center gap-2">
                                  <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(r.status)}`}
                                  >
                                    <Circle className="h-2 w-2 fill-current" />
                                    {r.status === "collection"
                                      ? "Collection"
                                      : r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                                  </span>
                                  <select
                                    value={r.status}
                                    onChange={(e) => updateStatus(r.tracking_id, e.target.value)}
                                    className="text-xs border border-[#1F2235] rounded-lg px-2 py-1 bg-[#11131E] text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                                  >
                                    {statuses.map((s) => (
                                      <option key={s} value={s} disabled={r.status === s}>
                                        {s === "collection" ? "Collection" : s.charAt(0).toUpperCase() + s.slice(1)}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                              </td>

                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <select
                                    value={r.priority || "normal"}
                                    onChange={(e) => updatePriority(r.tracking_id, e.target.value)}
                                    className={`text-xs border rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-violet-500 ${getPriorityStyle(r.priority)}`}
                                  >
                                    <option value="low">Low</option>
                                    <option value="normal">Normal</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                  </select>
                                </div>
                              </td>

                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <select
                                    value={r.technician_id || ""}
                                    onChange={(e) => updateTechnician(r.tracking_id, e.target.value)}
                                    className="text-xs border border-[#1F2235] rounded-lg px-2 py-1 bg-[#11131E] text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                                  >
                                    <option value="">Unassigned</option>
                                    {staff.map((s) => (
                                      <option key={s.id} value={s.id}>
                                        {s.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </td>

                              <td className="px-6 py-4 text-xs text-slate-500">

                                {new Date(r.created_at).toLocaleDateString()}

                              </td>

                              <td className="px-4 py-3">

                                <div className="flex items-center gap-1">

                                  <button

                                    onClick={() => setSelectedRepairForTimeline({ id: r.id, trackingId: r.tracking_id })}

                                    className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 p-2 rounded-lg transition-colors"

                                    title="View timeline"

                                  >

                                    <Clock className="h-4 w-4" />

                                  </button>

                                  <button

                                    onClick={() => deleteRepair(r.tracking_id)}

                                    className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-2 rounded-lg transition-colors"

                                    title="Delete repair"

                                  >

                                    <Trash2 className="h-4 w-4" />

                                  </button>

                                </div>

                              </td>

                            </motion.tr>

                          ))

                        ) : null}

                      </tbody>

                    </table>

                  </div>



                  {filteredRepairs.length === 0 && !isLoading && (

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

                  {/* Pagination Controls */}
                  {filteredRepairs.length > 0 && !isLoading && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-[#1F2235]">
                      <div className="text-sm text-slate-500">
                        Showing {((repairsPage - 1) * repairsPerPage) + 1} to {Math.min(repairsPage * repairsPerPage, filteredRepairs.length)} of {filteredRepairs.length} repairs
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setRepairsPage(prev => Math.max(1, prev - 1))}
                          disabled={repairsPage === 1}
                          className="px-3 py-1.5 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 hover:bg-[#1A1D27] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        <span className="text-sm text-slate-400">
                          Page {repairsPage} of {totalPages(filteredRepairs, repairsPerPage)}
                        </span>
                        <button
                          onClick={() => setRepairsPage(prev => Math.min(totalPages(filteredRepairs, repairsPerPage), prev + 1))}
                          disabled={repairsPage === totalPages(filteredRepairs, repairsPerPage)}
                          className="px-3 py-1.5 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 hover:bg-[#1A1D27] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                        <select
                          value={repairsPerPage}
                          onChange={(e) => {
                            setRepairsPerPage(Number(e.target.value));
                            setRepairsPage(1);
                          }}
                          className="ml-4 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500"
                        >
                          <option value="10">10 per page</option>
                          <option value="25">25 per page</option>
                          <option value="50">50 per page</option>
                          <option value="100">100 per page</option>
                        </select>
                      </div>
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

                        className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"

                      >

                        <div className="flex items-start justify-between">

                          <div className="flex-1">

                            <Link to={`/admin/customers/${customer.phone}`} className="hover:underline">

                              <h3 className="font-bold text-white text-lg">

                                {customer.name}

                              </h3>

                            </Link>

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



            {activeSection === "inventory" && (

              <>

                {/* Inventory Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Products"

                    value={products.length}

                    icon={Package}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="In Stock"

                    value={products.filter((p) => p.stock_quantity > 0).length}

                    icon={CheckCircle2}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="Low Stock"

                    value={products.filter((p) => p.stock_quantity > 0 && p.stock_quantity < 5).length}

                    icon={AlertCircle}

                    gradient="from-amber-500 to-orange-500"

                  />

                  <StatCard

                    title="Out of Stock"

                    value={products.filter((p) => p.stock_quantity === 0).length}

                    icon={Circle}

                    gradient="from-rose-500 to-pink-500"

                  />

                </div>

                {/* Filters */}

                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by name, brand, or model"

                      value={inventorySearch}

                      onChange={(e) => setInventorySearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                  <div className="flex items-center gap-2">

                    <Filter className="h-4 w-4 text-slate-600" />

                    <select

                      value={categoryFilter}

                      onChange={(e) => setCategoryFilter(e.target.value)}

                      className="h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"

                    >

                      <option value="all">All Categories</option>

                      <option value="smartphones">Smartphones</option>

                      <option value="laptops">Laptops</option>

                      <option value="tablets">Tablets</option>

                      <option value="accessories">Accessories</option>

                    </select>

                  </div>

                </div>

                {/* Table */}

                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Product

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Category

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Price

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Stock

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-20">

                            Actions

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {filteredProducts.length > 0 ? (

                          filteredProducts.map((product, idx) => (

                            <motion.tr

                              key={product.id}

                              initial={{ opacity: 0, y: 8 }}

                              animate={{ opacity: 1, y: 0 }}

                              transition={{ delay: idx * 0.03 }}

                              className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                            >

                              <td className="px-4 py-3">

                                <div className="font-medium text-white">

                                  {product.name || "Unnamed product"}

                                </div>

                                <div className="mt-0.5 text-xs text-slate-500">

                                  {product.brand || ""} {product.model || ""}

                                </div>

                              </td>

                              <td className="px-4 py-3">

                                <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-[#1A1D27] text-slate-300">

                                  {product.category || "Uncategorized"}

                                </span>

                              </td>

                              <td className="px-6 py-4 font-semibold text-white">

                                £{product.price.toFixed(2)}

                              </td>

                              <td className="px-4 py-3">

                                <div className="flex items-center gap-2">

                                  <span className={`font-semibold ${product.stock_quantity === 0 ? "text-rose-600" : product.stock_quantity < 5 ? "text-amber-600" : "text-emerald-600"}`}>

                                    {product.stock_quantity}

                                  </span>

                                </div>

                              </td>

                              <td className="px-4 py-3">

                                <span

                                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${product.stock_quantity === 0 ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : product.stock_quantity < 5 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`}

                                >

                                  <Circle className="h-2 w-2 fill-current" />

                                  {product.stock_quantity === 0 ? "Out of Stock" : product.stock_quantity < 5 ? "Low Stock" : "In Stock"}

                                </span>

                              </td>

                              <td className="px-4 py-3">

                                <div className="flex items-center gap-2">

                                  <button

                                    onClick={() => handleEditProduct(product)}

                                    className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 p-2 rounded-lg transition-colors"

                                    title="Edit product"

                                  >

                                    <Wrench className="h-4 w-4" />

                                  </button>

                                  <button

                                    onClick={() => handleDeleteProduct(product.id)}

                                    className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-2 rounded-lg transition-colors"

                                    title="Delete product"

                                  >

                                    <Trash2 className="h-4 w-4" />

                                  </button>

                                </div>

                              </td>

                            </motion.tr>

                          ))

                        ) : null}

                      </tbody>

                    </table>

                  </div>



                  {filteredProducts.length === 0 && !isLoading && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <Package className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No products found</p>

                    </div>

                  )}



                  {isLoading && (

                    <div className="px-6 py-16 text-center">

                      <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" />

                      <p className="text-sm text-slate-600">Loading products...</p>

                    </div>

                  )}

                </div>

                {/* Edit Product Modal */}
                <AnimatePresence>
                  {showEditProductModal && editingProduct && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowEditProductModal(false)}
                        className="fixed inset-0 z-50 bg-black/50"
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                      >
                        <div className="bg-[#11131E] rounded-lg shadow-xl max-w-md w-full p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Edit Product</h3>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm text-slate-300">Name</Label>
                              <Input
                                value={editingProduct.name || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Brand</Label>
                              <Input
                                value={editingProduct.brand || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Model</Label>
                              <Input
                                value={editingProduct.model || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, model: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Price (£)</Label>
                              <Input
                                type="number"
                                value={editingProduct.price || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Stock Quantity</Label>
                              <Input
                                type="number"
                                value={editingProduct.stock_quantity || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: parseInt(e.target.value) })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Category</Label>
                              <select
                                value={editingProduct.category || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                className="mt-1 w-full rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
                              >
                                <option value="smartphones">Smartphones</option>
                                <option value="laptops">Laptops</option>
                                <option value="tablets">Tablets</option>
                                <option value="accessories">Accessories</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex gap-3 mt-6">
                            <Button
                              onClick={() => setShowEditProductModal(false)}
                              variant="outline"
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSaveProduct}
                              className="flex-1"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

              </>

            )}



            {activeSection === "staff" && (

              <>

                {/* Staff Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Staff"

                    value={staff.length}

                    icon={Users}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="Active Staff"

                    value={staff.filter((s) => s.is_active).length}

                    icon={CheckCircle2}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="Admins"

                    value={staff.filter((s) => s.role === "admin").length}

                    icon={ShieldCheck}

                    gradient="from-violet-500 to-purple-500"

                  />

                  <StatCard

                    title="Technicians"

                    value={staff.filter((s) => s.role === "technician").length}

                    icon={Wrench}

                    gradient="from-amber-500 to-orange-500"

                  />

                </div>

                {/* Filters */}

                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by name, email, or role"

                      value={staffSearch}

                      onChange={(e) => setStaffSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                  <div className="flex items-center gap-2">

                    <Filter className="h-4 w-4 text-slate-600" />

                    <select

                      value={roleFilter}

                      onChange={(e) => setRoleFilter(e.target.value)}

                      className="h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"

                    >

                      <option value="all">All Roles</option>

                      <option value="admin">Admin</option>

                      <option value="technician">Technician</option>

                      <option value="staff">Staff</option>

                    </select>

                  </div>

                </div>

                {/* Table */}

                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Staff Member

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Email

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Role

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Joined

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-20">

                            Actions

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {filteredStaff.length > 0 ? (

                          filteredStaff.map((staffMember, idx) => (

                            <motion.tr

                              key={staffMember.id}

                              initial={{ opacity: 0, y: 8 }}

                              animate={{ opacity: 1, y: 0 }}

                              transition={{ delay: idx * 0.03 }}

                              className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                            >

                              <td className="px-4 py-3">

                                <div className="flex items-center gap-3">

                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white font-semibold">

                                    {staffMember.name?.charAt(0).toUpperCase()}

                                  </div>

                                  <div>

                                    <div className="font-medium text-white">

                                      {staffMember.name}

                                    </div>

                                    <div className="mt-0.5 text-xs text-slate-500">

                                      {staffMember.phone || "No phone"}

                                    </div>

                                  </div>

                                </div>

                              </td>

                              <td className="px-6 py-4 text-slate-400">

                                {staffMember.email}

                              </td>

                              <td className="px-4 py-3">

                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${staffMember.role === "admin" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" : staffMember.role === "technician" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-slate-100 text-slate-700 bg-[#1A1D27] dark:text-slate-300"}`}>

                                  {staffMember.role}

                                </span>

                              </td>

                              <td className="px-4 py-3">

                                <span

                                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${staffMember.is_active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`}

                                >

                                  <Circle className="h-2 w-2 fill-current" />

                                  {staffMember.is_active ? "Active" : "Inactive"}

                                </span>

                              </td>

                              <td className="px-6 py-4 text-slate-400">

                                {new Date(staffMember.created_at).toLocaleDateString()}

                              </td>

                              <td className="px-4 py-3">

                                <div className="flex items-center gap-2">

                                  <button

                                    onClick={() => handleEditStaff(staffMember)}

                                    className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 p-2 rounded-lg transition-colors"

                                    title="Edit staff"

                                  >

                                    <Wrench className="h-4 w-4" />

                                  </button>

                                  <button

                                    onClick={() => handleToggleStaffStatus(staffMember)}

                                    className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 p-2 rounded-lg transition-colors"

                                    title={staffMember.is_active ? "Deactivate" : "Activate"}

                                  >

                                    {staffMember.is_active ? <ShieldCheck className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}

                                  </button>

                                </div>

                              </td>

                            </motion.tr>

                          ))

                        ) : null}

                      </tbody>

                    </table>

                  </div>



                  {filteredStaff.length === 0 && !isLoading && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <Users className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No staff members found</p>

                    </div>

                  )}



                  {isLoading && (

                    <div className="px-6 py-16 text-center">

                      <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" />

                      <p className="text-sm text-slate-600">Loading staff...</p>

                    </div>

                  )}

                </div>

                {/* Edit Staff Modal */}
                <AnimatePresence>
                  {showEditStaffModal && editingStaff && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowEditStaffModal(false)}
                        className="fixed inset-0 z-50 bg-black/50"
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                      >
                        <div className="bg-[#11131E] rounded-lg shadow-xl max-w-md w-full p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Edit Staff Member</h3>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm text-slate-300">Name</Label>
                              <Input
                                value={editingStaff.name || ""}
                                onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Email</Label>
                              <Input
                                type="email"
                                value={editingStaff.email || ""}
                                onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Role</Label>
                              <select
                                value={editingStaff.role || ""}
                                onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                                className="mt-1 w-full rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
                              >
                                <option value="admin">Admin</option>
                                <option value="technician">Technician</option>
                                <option value="STAFF">Staff</option>
                                <option value="SUPER_ADMIN">Super Admin</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex gap-3 mt-6">
                            <Button
                              onClick={() => setShowEditStaffModal(false)}
                              variant="outline"
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSaveStaff}
                              className="flex-1"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

              </>

            )}



            {activeSection === "communication" && (

              <>

                {/* Communication Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Messages Sent"

                    value={messages.length}

                    icon={Send}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="Emails Sent"

                    value={emailsSent}

                    icon={Mail}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="SMS Sent"

                    value={smsSent}

                    icon={Phone}

                    gradient="from-violet-500 to-purple-500"

                  />

                  <StatCard

                    title="Response Rate"

                    value="92%"

                    icon={CheckCircle2}

                    gradient="from-amber-500 to-orange-500"

                  />

                </div>

                {/* Communication Actions */}

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                  <Button

                    onClick={() => setShowEmailModal(true)}

                    className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white"

                  >

                    <Mail className="mr-2 h-4 w-4" />

                    Send Email

                  </Button>

                  <Button

                    onClick={() => setShowSmsModal(true)}

                    variant="outline"

                    className="border-violet-500 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/20"

                  >

                    <Phone className="mr-2 h-4 w-4" />

                    Send SMS

                  </Button>

                  <Button

                    onClick={() => setShowBroadcastModal(true)}

                    variant="outline"

                    className="border-cyan-500 text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950/20"

                  >

                    <MessageCircle className="mr-2 h-4 w-4" />

                    Broadcast Message

                  </Button>

                </div>

                {/* Communication History */}

                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Communication History</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Type

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Recipient

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Subject

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Sent

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {messages.map((msg, idx) => (

                          <motion.tr

                            key={msg.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${msg.type === "email" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"}`}>

                                {msg.type === "email" ? <Mail className="h-3 w-3" /> : <Phone className="h-3 w-3" />}

                                {msg.type}

                              </span>

                            </td>

                            <td className="px-6 py-4 text-slate-400">

                              {msg.recipient}

                            </td>

                            <td className="px-6 py-4 text-white">

                              {msg.subject}

                            </td>

                            <td className="px-4 py-3">

                              <span

                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${msg.status === "sent" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}

                              >

                                <Circle className="h-2 w-2 fill-current" />

                                {msg.status}

                              </span>

                            </td>

                            <td className="px-6 py-4 text-slate-400">

                              {new Date(msg.sent_at).toLocaleDateString()}

                            </td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>



                  {messages.length === 0 && !isLoading && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <MessageCircle className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No communication history yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "expenses" && (

              <>

                {/* Expenses Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Expenses"

                    value={`£${expenses.reduce((sum, e) => sum + (e.amount || 0), 0).toFixed(0)}`}

                    icon={DollarSign}

                    gradient="from-rose-500 to-red-500"

                  />

                  <StatCard

                    title="This Month"

                    value={`£${expenses.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).reduce((sum, e) => sum + (e.amount || 0), 0).toFixed(0)}`}

                    icon={Calendar}

                    gradient="from-amber-500 to-orange-500"

                  />

                  <StatCard

                    title="This Week"

                    value={`£${expenses.filter(e => {
                      const now = new Date();
                      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                      return new Date(e.date) >= weekAgo;
                    }).reduce((sum, e) => sum + (e.amount || 0), 0).toFixed(0)}`}

                    icon={Activity}

                    gradient="from-violet-500 to-purple-500"

                  />

                  <StatCard

                    title="Pending"

                    value={expenses.filter(e => e.status === "pending").length}

                    icon={Clock}

                    gradient="from-blue-500 to-cyan-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by description or category"

                      value={expenseSearch}

                      onChange={(e) => setExpenseSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                  <div className="flex items-center gap-2">

                    <Filter className="h-4 w-4 text-slate-600" />

                    <select

                      value={expenseCategoryFilter}

                      onChange={(e) => setExpenseCategoryFilter(e.target.value)}

                      className="h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"

                    >

                      <option value="all">All Categories</option>

                      <option value="rent">Rent</option>

                      <option value="utilities">Utilities</option>

                      <option value="supplies">Supplies</option>

                      <option value="salaries">Salaries</option>

                      <option value="other">Other</option>

                    </select>

                  </div>

                </div>

                {/* Expenses Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Expense Tracking</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Description

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Category

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Amount

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Date

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {expenses.filter(e => {
                          const matchSearch = e.description?.toLowerCase().includes(expenseSearch.toLowerCase()) ||
                            e.category?.toLowerCase().includes(expenseSearch.toLowerCase());
                          const matchCategory = expenseCategoryFilter === "all" || e.category === expenseCategoryFilter;
                          return matchSearch && matchCategory;
                        }).map((expense, idx) => (

                          <motion.tr

                            key={expense.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{expense.description || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{expense.category || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-rose-400">£{(expense.amount || 0).toFixed(2)}</td>

                            <td className="px-4 py-3 text-slate-400">{new Date(expense.date).toLocaleDateString()}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${expense.status === "paid" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>

                                {expense.status || "pending"}

                              </span>

                            </td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {expenses.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <FileText className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No expenses recorded yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "revenue" && (

              <>

                {/* Revenue Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Revenue"

                    value={`£${(revenueData.reduce((sum, r) => sum + (r.amount || 0), 0) + totalRevenue).toFixed(0)}`}

                    icon={DollarSign}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="This Month"

                    value={`£${revenueData.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).reduce((sum, r) => sum + (r.amount || 0), 0).toFixed(0)}`}

                    icon={Calendar}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="This Week"

                    value={`£${revenueData.filter(r => {
                      const now = new Date();
                      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                      return new Date(r.date) >= weekAgo;
                    }).reduce((sum, r) => sum + (r.amount || 0), 0).toFixed(0)}`}

                    icon={Activity}

                    gradient="from-violet-500 to-purple-500"

                  />

                  <StatCard

                    title="Today"

                    value={`£${revenueData.filter(r => new Date(r.date).toDateString() === new Date().toDateString()).reduce((sum, r) => sum + (r.amount || 0), 0).toFixed(0)}`}

                    icon={Clock}

                    gradient="from-amber-500 to-orange-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by source or description"

                      value={revenueSearch}

                      onChange={(e) => setRevenueSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                </div>

                {/* Revenue Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Revenue Overview</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Source

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Description

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Amount

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Date

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {revenueData.filter(r => {
                          const matchSearch = r.source?.toLowerCase().includes(revenueSearch.toLowerCase()) ||
                            r.description?.toLowerCase().includes(revenueSearch.toLowerCase());
                          return matchSearch;
                        }).map((revenue, idx) => (

                          <motion.tr

                            key={revenue.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{revenue.source || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{revenue.description || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-emerald-400">£{(revenue.amount || 0).toFixed(2)}</td>

                            <td className="px-4 py-3 text-slate-400">{new Date(revenue.date).toLocaleDateString()}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${revenue.status === "received" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>

                                {revenue.status || "pending"}

                              </span>

                            </td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {revenueData.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <TrendingUp className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No revenue records yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "customer_history" && (

              <>

                {/* Customer History Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Customers"

                    value={customers.length}

                    icon={Users}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="Active Customers"

                    value={customers.filter(c => c.lastRepair && new Date(c.lastRepair) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}

                    icon={CheckCircle2}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="Total Repairs"

                    value={totalRepairs}

                    icon={Wrench}

                    gradient="from-violet-500 to-purple-500"

                  />

                  <StatCard

                    title="Avg Repairs/Customer"

                    value={customers.length > 0 ? (totalRepairs / customers.length).toFixed(1) : "0"}

                    icon={TrendingUp}

                    gradient="from-amber-500 to-orange-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by name or phone"

                      value={customerHistorySearch}

                      onChange={(e) => setCustomerHistorySearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                </div>

                {/* Customer History Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Customer History</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Customer

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Phone

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Total Repairs

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Last Repair

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {customers.filter(c => {
                          const matchSearch = c.name?.toLowerCase().includes(customerHistorySearch.toLowerCase()) ||
                            c.phone?.includes(customerHistorySearch);
                          return matchSearch;
                        }).map((customer, idx) => (

                          <motion.tr

                            key={customer.phone}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{customer.name || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{customer.phone || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-violet-400">{customer.repairCount || 0}</td>

                            <td className="px-4 py-3 text-slate-400">{customer.lastRepair ? new Date(customer.lastRepair).toLocaleDateString() : "N/A"}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${customer.lastRepair && new Date(customer.lastRepair) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>

                                {customer.lastRepair && new Date(customer.lastRepair) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) ? "Active" : "Inactive"}

                              </span>

                            </td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {customers.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <History className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No customer history yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "low_stock_alerts" && (

              <>

                {/* Low Stock Alerts Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Critical Items"

                    value={lowStockItems?.filter(i => i?.stock <= 0).length ?? 0}

                    icon={AlertCircle}

                    gradient="from-rose-500 to-red-500"

                  />

                  <StatCard

                    title="Low Stock"

                    value={lowStockItems?.filter(i => i?.stock > 0 && i?.stock <= 5).length ?? 0}

                    icon={Package}

                    gradient="from-amber-500 to-orange-500"

                  />

                  <StatCard

                    title="Out of Stock"

                    value={lowStockItems?.filter(i => i?.stock <= 0).length ?? 0}

                    icon={XCircle}

                    gradient="from-slate-500 to-slate-600"

                  />

                  <StatCard

                    title="Restock Orders"

                    value={lowStockItems?.filter(i => i?.restockOrdered).length ?? 0}

                    icon={FileText}

                    gradient="from-blue-500 to-cyan-500"

                  />

                </div>

                {/* Low Stock Alerts Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Low Stock Alerts</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Product

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Current Stock

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Min Level

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Action

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {lowStockItems && lowStockItems.length > 0 && lowStockItems.map((item, idx) => (

                          <motion.tr

                            key={item?.id || idx}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{item?.name || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-rose-400">{item?.stock ?? 0}</td>

                            <td className="px-4 py-3 text-slate-400">{item?.minLevel ?? 5}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${(item?.stock ?? 0) <= 0 ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : (item?.stock ?? 0) <= 5 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`}>

                                {(item?.stock ?? 0) <= 0 ? "Out of Stock" : (item?.stock ?? 0) <= 5 ? "Low Stock" : "OK"}

                              </span>

                            </td>

                            <td className="px-4 py-3">

                              <button className="text-violet-400 hover:text-violet-300 text-xs font-medium">Order Restock</button>

                            </td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {lowStockItems.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <AlertCircle className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No low stock alerts</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "stock_movements" && (

              <>

                {/* Stock Movements Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Movements"

                    value={stockMovements.length}

                    icon={TrendingUp}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="Stock In"

                    value={stockMovements.filter(m => m.type === "in").length}

                    icon={Package}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="Stock Out"

                    value={stockMovements.filter(m => m.type === "out").length}

                    icon={Package}

                    gradient="from-amber-500 to-orange-500"

                  />

                  <StatCard

                    title="Adjustments"

                    value={stockMovements.filter(m => m.type === "adjustment").length}

                    icon={Activity}

                    gradient="from-violet-500 to-purple-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by product or reference"

                      value={stockMovementSearch}

                      onChange={(e) => setStockMovementSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                </div>

                {/* Stock Movements Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Stock Movement History</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Product

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Type

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Quantity

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Reference

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Date

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {stockMovements.filter(m => {
                          const matchSearch = m.product?.toLowerCase().includes(stockMovementSearch.toLowerCase()) ||
                            m.reference?.toLowerCase().includes(stockMovementSearch.toLowerCase());
                          return matchSearch;
                        }).map((movement, idx) => (

                          <motion.tr

                            key={movement.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{movement.product || "N/A"}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${movement.type === "in" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : movement.type === "out" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"}`}>

                                {movement.type || "N/A"}

                              </span>

                            </td>

                            <td className="px-4 py-3 font-semibold text-slate-400">{movement.quantity || 0}</td>

                            <td className="px-4 py-3 text-slate-400">{movement.reference || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{new Date(movement.date).toLocaleDateString()}</td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {stockMovements.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <TrendingUp className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No stock movements recorded</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "inventory_management" && (

              <>

                {/* Inventory Management Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Items"

                    value={inventoryItems.length}

                    icon={Package}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="In Stock"

                    value={inventoryItems.filter(i => i.stock > 0).length}

                    icon={CheckCircle2}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="Low Stock"

                    value={inventoryItems.filter(i => i.stock > 0 && i.stock <= 5).length}

                    icon={AlertCircle}

                    gradient="from-amber-500 to-orange-500"

                  />

                  <StatCard

                    title="Stock Value"

                    value={`£${inventoryItems.reduce((sum, i) => sum + ((i.stock || 0) * (i.price || 0)), 0).toFixed(0)}`}

                    icon={DollarSign}

                    gradient="from-violet-500 to-purple-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by name or SKU"

                      value={inventoryManagementSearch}

                      onChange={(e) => setInventoryManagementSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                </div>

                {/* Inventory Management Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Inventory Overview</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Product

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            SKU

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Stock

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Price

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {inventoryItems.filter(i => {
                          const matchSearch = i.name?.toLowerCase().includes(inventoryManagementSearch.toLowerCase()) ||
                            i.sku?.toLowerCase().includes(inventoryManagementSearch.toLowerCase());
                          return matchSearch;
                        }).map((item, idx) => (

                          <motion.tr

                            key={item.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{item.name || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{item.sku || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-slate-400">{item.stock || 0}</td>

                            <td className="px-4 py-3 text-slate-400">£{(item.price || 0).toFixed(2)}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${item.stock <= 0 ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : item.stock <= 5 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`}>

                                {item.stock <= 0 ? "Out of Stock" : item.stock <= 5 ? "Low Stock" : "In Stock"}

                              </span>

                            </td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {inventoryItems.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <Database className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No inventory items yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "supplier_management" && (

              <>

                {/* Supplier Management Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Suppliers"

                    value={suppliers.length}

                    icon={Users}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="Active"

                    value={suppliers.filter(s => s.isActive).length}

                    icon={CheckCircle2}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="Pending Orders"

                    value={suppliers.filter(s => s.pendingOrders > 0).reduce((sum, s) => sum + s.pendingOrders, 0)}

                    icon={Clock}

                    gradient="from-amber-500 to-orange-500"

                  />

                  <StatCard

                    title="Total Orders"

                    value={suppliers.reduce((sum, s) => sum + (s.totalOrders || 0), 0)}

                    icon={FileText}

                    gradient="from-violet-500 to-purple-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by name or contact"

                      value={supplierSearch}

                      onChange={(e) => setSupplierSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                </div>

                {/* Suppliers Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Suppliers</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Supplier

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Contact

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Location

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Orders

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {suppliers.filter(s => {
                          const matchSearch = s.name?.toLowerCase().includes(supplierSearch.toLowerCase()) ||
                            s.contact?.toLowerCase().includes(supplierSearch.toLowerCase());
                          return matchSearch;
                        }).map((supplier, idx) => (

                          <motion.tr

                            key={supplier.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{supplier.name || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{supplier.contact || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{supplier.location || "N/A"}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${supplier.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>

                                {supplier.isActive ? "Active" : "Inactive"}

                              </span>

                            </td>

                            <td className="px-4 py-3 font-semibold text-slate-400">{supplier.totalOrders || 0}</td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {suppliers.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <Users className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No suppliers yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "stock_purchases" && (

              <>

                {/* Stock Purchases Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Purchases"

                    value={`£${stockPurchases.reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`}

                    icon={Package}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="This Month"

                    value={`£${stockPurchases.filter(p => new Date(p.date).getMonth() === new Date().getMonth()).reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`}

                    icon={Calendar}

                    gradient="from-violet-500 to-purple-500"

                  />

                  <StatCard

                    title="Pending"

                    value={stockPurchases.filter(p => p.status === "pending").length}

                    icon={Clock}

                    gradient="from-amber-500 to-orange-500"

                  />

                  <StatCard

                    title="Completed"

                    value={stockPurchases.filter(p => p.status === "completed").length}

                    icon={CheckCircle2}

                    gradient="from-emerald-500 to-green-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by supplier or reference"

                      value={stockPurchaseSearch}

                      onChange={(e) => setStockPurchaseSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                </div>

                {/* Stock Purchases Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Stock Purchases</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Supplier

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Reference

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Amount

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Date

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {stockPurchases.filter(p => {
                          const matchSearch = p.supplier?.toLowerCase().includes(stockPurchaseSearch.toLowerCase()) ||
                            p.reference?.toLowerCase().includes(stockPurchaseSearch.toLowerCase());
                          return matchSearch;
                        }).map((purchase, idx) => (

                          <motion.tr

                            key={purchase.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{purchase.supplier || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{purchase.reference || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-emerald-400">£{(purchase.amount || 0).toFixed(2)}</td>

                            <td className="px-4 py-3 text-slate-400">{new Date(purchase.date).toLocaleDateString()}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${purchase.status === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>

                                {purchase.status || "pending"}

                              </span>

                            </td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {stockPurchases.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <Package className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No stock purchases yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "purchase_orders" && (

              <>

                {/* Purchase Orders Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Orders"

                    value={purchaseOrders.length}

                    icon={FileText}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="Pending"

                    value={purchaseOrders.filter(o => o.status === "pending").length}

                    icon={Clock}

                    gradient="from-amber-500 to-orange-500"

                  />

                  <StatCard

                    title="In Transit"

                    value={purchaseOrders.filter(o => o.status === "in_transit").length}

                    icon={Truck}

                    gradient="from-violet-500 to-purple-500"

                  />

                  <StatCard

                    title="Received"

                    value={purchaseOrders.filter(o => o.status === "received").length}

                    icon={CheckCircle2}

                    gradient="from-emerald-500 to-green-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by order ID or supplier"

                      value={purchaseOrderSearch}

                      onChange={(e) => setPurchaseOrderSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                </div>

                {/* Purchase Orders Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Purchase Orders</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Order ID

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Supplier

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Items

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Total

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {purchaseOrders.filter(o => {
                          const matchSearch = o.orderId?.toLowerCase().includes(purchaseOrderSearch.toLowerCase()) ||
                            o.supplier?.toLowerCase().includes(purchaseOrderSearch.toLowerCase());
                          return matchSearch;
                        }).map((order, idx) => (

                          <motion.tr

                            key={order.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{order.orderId || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{order.supplier || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{order.itemCount || 0}</td>

                            <td className="px-4 py-3 font-semibold text-emerald-400">£{(order.total || 0).toFixed(2)}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${order.status === "received" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : order.status === "in_transit" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>

                                {order.status === "received" ? "Received" : order.status === "in_transit" ? "In Transit" : "Pending"}

                              </span>

                            </td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {purchaseOrders.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <FileText className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No purchase orders yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "payments" && (

              <>

                {/* Payments Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Payments"

                    value={`£${payments.reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`}

                    icon={DollarSign}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="Today"

                    value={`£${payments.filter(p => new Date(p.date).toDateString() === new Date().toDateString()).reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`}

                    icon={Calendar}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="This Week"

                    value={`£${payments.filter(p => {
                      const now = new Date();
                      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                      return new Date(p.date) >= weekAgo;
                    }).reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`}

                    icon={TrendingUp}

                    gradient="from-violet-500 to-purple-500"

                  />

                  <StatCard

                    title="This Month"

                    value={`£${payments.filter(p => new Date(p.date).getMonth() === new Date().getMonth()).reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`}

                    icon={Activity}

                    gradient="from-amber-500 to-orange-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by reference or customer"

                      value={paymentSearch}

                      onChange={(e) => setPaymentSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                </div>

                {/* Payments Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Payment Transactions</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Reference

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Customer

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Amount

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Method

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Date

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {payments.filter(p => {
                          const matchSearch = p.reference?.toLowerCase().includes(paymentSearch.toLowerCase()) ||
                            p.customer?.toLowerCase().includes(paymentSearch.toLowerCase());
                          return matchSearch;
                        }).map((payment, idx) => (

                          <motion.tr

                            key={payment.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{payment.reference || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{payment.customer || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-emerald-400">£{(payment.amount || 0).toFixed(2)}</td>

                            <td className="px-4 py-3 text-slate-400">{payment.method || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{new Date(payment.date).toLocaleDateString()}</td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {payments.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <DollarSign className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No payment transactions yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "invoices" && (

              <>

                {/* Invoices Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Invoices"

                    value={invoices.length}

                    icon={FileText}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="Outstanding"

                    value={`£${invoices.filter(i => i.status === "outstanding").reduce((sum, i) => sum + (i.amount || 0), 0).toFixed(0)}`}

                    icon={DollarSign}

                    gradient="from-amber-500 to-orange-500"

                  />

                  <StatCard

                    title="Paid"

                    value={`£${invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + (i.amount || 0), 0).toFixed(0)}`}

                    icon={CheckCircle2}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="Overdue"

                    value={invoices.filter(i => i.status === "overdue").length}

                    icon={AlertCircle}

                    gradient="from-rose-500 to-red-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by invoice number or customer"

                      value={invoiceSearch}

                      onChange={(e) => setInvoiceSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                </div>

                {/* Invoices Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Invoices</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Invoice #

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Customer

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Amount

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Due Date

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {invoices.filter(i => {
                          const matchSearch = i.invoiceNumber?.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                            i.customer?.toLowerCase().includes(invoiceSearch.toLowerCase());
                          return matchSearch;
                        }).map((invoice, idx) => (

                          <motion.tr

                            key={invoice.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{invoice.invoiceNumber || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{invoice.customer || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-emerald-400">£{(invoice.amount || 0).toFixed(2)}</td>

                            <td className="px-4 py-3 text-slate-400">{new Date(invoice.dueDate).toLocaleDateString()}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${invoice.status === "paid" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : invoice.status === "overdue" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>

                                {invoice.status || "outstanding"}

                              </span>

                            </td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {invoices.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <FileText className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No invoices yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "inhouse_sales" && (

              <>

                {/* In-House Sales Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Today's Sales"

                    value={`£${inhouseSales.filter(s => new Date(s.date).toDateString() === new Date().toDateString()).reduce((sum, s) => sum + (s.amount || 0), 0).toFixed(0)}`}

                    icon={DollarSign}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="Transactions"

                    value={inhouseSales.length}

                    icon={ShoppingCart}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="Average Order"

                    value={`£${inhouseSales.length > 0 ? (inhouseSales.reduce((sum, s) => sum + (s.amount || 0), 0) / inhouseSales.length).toFixed(0) : "0"}`}

                    icon={TrendingUp}

                    gradient="from-violet-500 to-purple-500"

                  />

                  <StatCard

                    title="Items Sold"

                    value={inhouseSales.reduce((sum, s) => sum + (s.itemCount || 0), 0)}

                    icon={Package}

                    gradient="from-amber-500 to-orange-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by customer or reference"

                      value={inhouseSaleSearch}

                      onChange={(e) => setInhouseSaleSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                </div>

                {/* In-House Sales Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">In-House Transactions</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Reference

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Customer

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Amount

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Items

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Date

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {inhouseSales.filter(s => {
                          const matchSearch = s.customer?.toLowerCase().includes(inhouseSaleSearch.toLowerCase()) ||
                            s.reference?.toLowerCase().includes(inhouseSaleSearch.toLowerCase());
                          return matchSearch;
                        }).map((sale, idx) => (

                          <motion.tr

                            key={sale.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{sale.reference || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{sale.customer || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-emerald-400">£{(sale.amount || 0).toFixed(2)}</td>

                            <td className="px-4 py-3 text-slate-400">{sale.itemCount || 0}</td>

                            <td className="px-4 py-3 text-slate-400">{new Date(sale.date).toLocaleDateString()}</td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {inhouseSales.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <ShoppingCart className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No in-house sales yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "online_sales" && (

              <>

                {/* Online Sales Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Orders"

                    value={onlineSales.length}

                    icon={ShoppingCart}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="Revenue"

                    value={`£${onlineSales.reduce((sum, s) => sum + (s.amount || 0), 0).toFixed(0)}`}

                    icon={DollarSign}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="Pending"

                    value={onlineSales.filter(s => s.status === "pending").length}

                    icon={Clock}

                    gradient="from-amber-500 to-orange-500"

                  />

                  <StatCard

                    title="Completed"

                    value={onlineSales.filter(s => s.status === "completed").length}

                    icon={CheckCircle2}

                    gradient="from-violet-500 to-purple-500"

                  />

                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by order ID or customer"

                      value={onlineSaleSearch}

                      onChange={(e) => setOnlineSaleSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                </div>

                {/* Online Sales Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="px-6 py-4 border-b border-[#1F2235]">

                    <h3 className="text-sm font-semibold text-white">Online Orders</h3>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Order ID

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Customer

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Amount

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Items

                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {onlineSales.filter(s => {
                          const matchSearch = s.orderId?.toLowerCase().includes(onlineSaleSearch.toLowerCase()) ||
                            s.customer?.toLowerCase().includes(onlineSaleSearch.toLowerCase());
                          return matchSearch;
                        }).map((sale, idx) => (

                          <motion.tr

                            key={sale.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{sale.orderId || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{sale.customer || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-emerald-400">£{(sale.amount || 0).toFixed(2)}</td>

                            <td className="px-4 py-3 text-slate-400">{sale.itemCount || 0}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${sale.status === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>

                                {sale.status || "pending"}

                              </span>

                            </td>

                          </motion.tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {onlineSales.length === 0 && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <ShoppingCart className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No online orders yet</p>

                    </div>

                  )}

                </div>

              </>

            )}



            {activeSection === "bookings" && (

              <>

                {/* Bookings Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <StatCard

                    title="Total Bookings"

                    value={bookings.length}

                    icon={Calendar}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="Pending"

                    value={bookings.filter((b) => b.status === "pending").length}

                    icon={Clock}

                    gradient="from-amber-500 to-orange-500"

                  />

                  <StatCard

                    title="Confirmed"

                    value={bookings.filter((b) => b.status === "confirmed").length}

                    icon={CheckCircle2}

                    gradient="from-emerald-500 to-green-500"

                  />

                  <StatCard

                    title="Completed"

                    value={bookings.filter((b) => b.status === "completed").length}

                    icon={Circle}

                    gradient="from-violet-500 to-purple-500"

                  />

                </div>

                {/* Filters */}

                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center flex-1">

                    <div className="relative flex-1">

                      <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                      <Input

                        placeholder="Search by customer name or phone"

                        value={bookingSearch}

                        onChange={(e) => setBookingSearch(e.target.value)}

                        className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                      />

                    </div>

                    <div className="flex items-center gap-2">

                      <Filter className="h-4 w-4 text-slate-600" />

                      <select

                        value={statusFilter}

                        onChange={(e) => setStatusFilter(e.target.value)}

                        className="h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"

                      >

                        <option value="all">All Status</option>

                        <option value="pending">Pending</option>

                        <option value="confirmed">Confirmed</option>

                        <option value="completed">Completed</option>

                        <option value="cancelled">Cancelled</option>

                      </select>

                    </div>

                  </div>

                  <button
                    onClick={() => setShowCalendarView(!showCalendarView)}
                    className="bg-[#1F2235] hover:bg-[#2D3142] text-slate-300 px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors border border-slate-700"
                  >
                    <Calendar className="h-4 w-4" />
                    {showCalendarView ? 'Table View' : 'Calendar View'}
                  </button>

                </div>

                {/* Calendar View */}
                {showCalendarView ? (
                  <AppointmentCalendar />
                ) : (
                  /* Table */

                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">

                  <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-[#1F2235] bg-[#11131E]">

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Customer

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Service

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Date & Time

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Status

                          </th>

                          <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent w-20">

                            Actions

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {paginatedBookings.length > 0 ? (

                          paginatedBookings.map((booking, idx) => (

                            <motion.tr

                              key={booking.id}

                              initial={{ opacity: 0, y: 8 }}

                              animate={{ opacity: 1, y: 0 }}

                              transition={{ delay: idx * 0.03 }}

                              className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                            >

                              <td className="px-4 py-3">

                                <div className="font-medium text-white">

                                  {booking.customer_name}

                                </div>

                                <div className="mt-0.5 text-xs text-slate-500">

                                  {booking.phone}

                                </div>

                              </td>

                              <td className="px-6 py-4 text-slate-400">

                                {booking.service}

                              </td>

                              <td className="px-6 py-4 text-white">

                                <div>{new Date(booking.date).toLocaleDateString()}</div>

                                <div className="text-xs text-slate-500">{booking.time}</div>

                              </td>

                              <td className="px-4 py-3">

                                <span

                                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${booking.status === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : booking.status === "confirmed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : booking.status === "completed" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`}

                                >

                                  <Circle className="h-2 w-2 fill-current" />

                                  {booking.status}

                                </span>

                              </td>

                              <td className="px-4 py-3">

                                <div className="flex items-center gap-2">

                                  <button

                                    onClick={() => handleConfirmBooking(booking)}

                                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 p-2 rounded-lg transition-colors"

                                    title="Confirm booking"

                                  >

                                    <CheckCircle2 className="h-4 w-4" />

                                  </button>

                                  <button

                                    onClick={() => handleCancelBooking(booking)}

                                    className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 p-2 rounded-lg transition-colors"

                                    title="Cancel booking"

                                  >

                                    <AlertCircle className="h-4 w-4" />

                                  </button>

                                </div>

                              </td>

                            </motion.tr>

                          ))

                        ) : null}

                      </tbody>

                    </table>

                  </div>



                  {filteredBookings.length === 0 && !isLoading && (

                    <div className="px-6 py-16 text-center text-slate-400">

                      <Calendar className="mx-auto mb-3 h-8 w-8 opacity-40" />

                      <p className="text-sm">No bookings found</p>

                    </div>

                  )}



                  {isLoading && (

                    <div className="px-6 py-16 text-center">

                      <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-violet-500" />

                      <p className="text-sm text-slate-600">Loading bookings...</p>

                    </div>

                  )}

                  {/* Pagination Controls */}
                  {filteredBookings.length > 0 && !isLoading && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-[#1F2235]">
                      <div className="text-sm text-slate-500">
                        Showing {((bookingsPage - 1) * bookingsPerPage) + 1} to {Math.min(bookingsPage * bookingsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setBookingsPage(prev => Math.max(1, prev - 1))}
                          disabled={bookingsPage === 1}
                          className="px-3 py-1.5 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 hover:bg-[#1A1D27] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        <span className="text-sm text-slate-400">
                          Page {bookingsPage} of {totalPages(filteredBookings, bookingsPerPage)}
                        </span>
                        <button
                          onClick={() => setBookingsPage(prev => Math.min(totalPages(filteredBookings, bookingsPerPage), prev + 1))}
                          disabled={bookingsPage === totalPages(filteredBookings, bookingsPerPage)}
                          className="px-3 py-1.5 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 hover:bg-[#1A1D27] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                        <select
                          value={bookingsPerPage}
                          onChange={(e) => {
                            setBookingsPerPage(Number(e.target.value));
                            setBookingsPage(1);
                          }}
                          className="ml-4 text-sm border border-[#1F2235] rounded-lg bg-[#11131E] text-slate-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500"
                        >
                          <option value="10">10 per page</option>
                          <option value="25">25 per page</option>
                          <option value="50">50 per page</option>
                          <option value="100">100 per page</option>
                        </select>
                      </div>
                    </div>
                  )}

                </div>
                )}
              </>

            )}



            {activeSection === "finance" && (
              <FinanceSection token={token} />
            )}



            {activeSection === "walkin" && (
              <WalkInIntake token={token} />
            )}



            {activeSection === "audit_logs" && (
              <AuditLogs token={token} />
            )}



            {activeSection === "analytics" && (

              <>

                {/* Analytics Section */}

                <div className="mb-6 flex items-center gap-2">

                  <Clock className="h-4 w-4 text-slate-600" />

                  <select

                    value={timePeriod}

                    onChange={(e) => setTimePeriod(e.target.value)}

                    className="rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500 h-10 rounded-xl"

                  >

                    <option value="all">All Time</option>

                    <option value="daily">Today</option>

                    <option value="weekly">This Week</option>

                    <option value="monthly">This Month</option>

                  </select>

                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">

                  <motion.div

                    initial={{ opacity: 0, y: 12 }}

                    animate={{ opacity: 1, y: 0 }}

                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"

                  >

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">

                      Total Repairs

                    </p>

                    <p className="mt-3 text-3xl font-bold text-white">

                      {totalRepairs}

                    </p>

                    <p className="mt-2 text-xs text-slate-500">{timePeriod === "all" ? "All-time" : timePeriod === "daily" ? "Today" : timePeriod === "weekly" ? "This Week" : "This Month"}</p>

                  </motion.div>



                  <motion.div

                    initial={{ opacity: 0, y: 12 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ delay: 0.05 }}

                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"

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

                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"

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

                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"

                  >

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">

                      Completion Rate

                    </p>

                    <p className="mt-3 text-3xl font-bold text-white">

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

                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"

                  >

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">

                      Total Customers

                    </p>

                    <p className="mt-3 text-3xl font-bold text-white">

                      {customers.length}

                    </p>

                    <p className="mt-2 text-xs text-slate-500">Unique customers</p>

                  </motion.div>



                  <motion.div

                    initial={{ opacity: 0, y: 12 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ delay: 0.25 }}

                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"

                  >

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">

                      Avg Repairs/Customer

                    </p>

                    <p className="mt-3 text-3xl font-bold text-white">

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

                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"

                  >

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">

                      Estimated Revenue

                    </p>

                    <p className="mt-3 text-3xl font-bold text-white">

                      £{totalRevenue.toFixed(0)}

                    </p>

                    <p className="mt-2 text-xs text-slate-500">@£45/repair</p>

                  </motion.div>

                </div>



                {/* Advanced Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                  {/* Revenue Trend */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
                  >
                    <h4 className="text-sm font-semibold text-white mb-4">Revenue Trend</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">This Month</span>
                        <span className="text-sm font-bold text-emerald-600">£{totalRevenue.toFixed(0)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Last Month</span>
                        <span className="text-sm font-bold text-slate-600">N/A</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">Growth</span>
                        <span className="text-sm font-bold text-slate-600">N/A</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Top Services */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
                  >
                    <h4 className="text-sm font-semibold text-white mb-4">Top Services</h4>
                    <div className="text-center py-8 text-slate-400 text-sm">
                      Service breakdown data not available
                    </div>
                  </motion.div>

                  {/* Customer Insights */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
                  >
                    <h4 className="text-sm font-semibold text-white mb-4">Customer Insights</h4>
                    <div className="text-center py-8 text-slate-400 text-sm">
                      Customer analytics data not available
                    </div>
                  </motion.div>

                </div>

                {/* Charts Section */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                  {/* Repairs Over Time Chart */}

                  <motion.div

                    initial={{ opacity: 0, y: 12 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ delay: 0.4 }}

                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"

                  >

                    <h4 className="text-sm font-semibold text-white mb-4">Repairs Over Time</h4>

                    {isLoading || repairsOverTime.length === 0 ? (
                      <div className="flex items-center justify-center h-[250px] text-slate-400">
                        <RefreshCw className="h-6 w-6 animate-spin" />
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={repairsOverTime}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                          <YAxis stroke="#64748b" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              border: "1px solid #e2e8f0",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}

                  </motion.div>



                  {/* Repairs by Status Chart */}

                  <motion.div

                    initial={{ opacity: 0, y: 12 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ delay: 0.45 }}

                    className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"

                  >

                    <h4 className="text-sm font-semibold text-white mb-4">Repairs by Status</h4>

                    {isLoading || statusChartData.length === 0 ? (
                      <div className="flex items-center justify-center h-[250px] text-slate-400">
                        <RefreshCw className="h-6 w-6 animate-spin" />
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={statusChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                          <YAxis stroke="#64748b" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              border: "1px solid #e2e8f0",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}

                  </motion.div>

                </div>



                {/* Device Types Chart */}

                <motion.div

                  initial={{ opacity: 0, y: 12 }}

                  animate={{ opacity: 1, y: 0 }}

                  transition={{ delay: 0.5 }}

                  className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6 mt-6"

                >

                  <h4 className="text-sm font-semibold text-white mb-4">Top Device Types</h4>

                  <ResponsiveContainer width="100%" height={250}>

                    <PieChart>

                      <Pie

                        data={deviceChartData}

                        cx="50%"

                        cy="50%"

                        labelLine={false}

                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}

                        outerRadius={80}

                        fill="#8884d8"

                        dataKey="value"

                      >

                        {deviceChartData.map((entry, index) => (

                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                        ))}

                      </Pie>

                      <Tooltip

                        contentStyle={{

                          backgroundColor: "rgba(255, 255, 255, 0.95)",

                          border: "1px solid #e2e8f0",

                          borderRadius: "8px",

                        }}

                      />

                    </PieChart>

                  </ResponsiveContainer>

                </motion.div>

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

                        className="flex items-start gap-4 rounded-xl border border-[#1F2235] bg-[#11131E] p-5 hover:bg-white/[0.02] transition-all"

                      >

                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${r.status === "collection"

                            ? "bg-emerald-100"

                            : r.status === "testing"

                              ? "bg-amber-100"

                              : "bg-violet-100"

                          }`}>

                          <Wrench className={`h-5 w-5 ${r.status === "collection"

                              ? "text-emerald-600"

                              : r.status === "testing"

                                ? "text-amber-600"

                                : "text-violet-600"

                            }`} />

                        </div>

                        <div className="flex-1 min-w-0">

                          <div className="flex items-center justify-between gap-4">

                            <div>

                              <p className="text-sm font-bold text-white">

                                {r.customer_name || "Unknown Customer"}

                              </p>

                              <p className="text-xs text-slate-600 mt-1">

                                <span className="font-mono">{r.tracking_id}</span> ? {r.device_model}

                              </p>

                              <p className="text-xs text-slate-500 mt-1">

                                <Phone className="inline h-3 w-3 mr-1" />

                                {r.customer_phone || "No phone"}

                              </p>

                            </div>

                            <div className="text-right flex-shrink-0">

                              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(r.status)}`}>

                                <Circle className="h-2 w-2 fill-current" />

                                {r.status === "collection" ? "Ready" : r.status.charAt(0).toUpperCase() + r.status.slice(1)}

                              </span>

                              <p className="text-xs text-slate-400 mt-2">

                                {new Date(r.created_at).toLocaleDateString() || "N/A"} {new Date(r.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}

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

            {activeSection === "roles_permissions" && (
              <>
                {/* Roles & Permissions Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total Roles"
                    value={roles.length}
                    icon={ShieldCheck}
                    gradient="from-blue-500 to-cyan-500"
                  />
                  <StatCard
                    title="Active Permissions"
                    value={permissions.length}
                    icon={CheckCircle2}
                    gradient="from-emerald-500 to-green-500"
                  />
                  <StatCard
                    title="Admin Users"
                    value={roles.filter(r => r.name === "Admin").length}
                    icon={User}
                    gradient="from-violet-500 to-purple-500"
                  />
                  <StatCard
                    title="Staff Users"
                    value={roles.filter(r => r.name === "Staff").length}
                    icon={Users}
                    gradient="from-amber-500 to-orange-500"
                  />
                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by role name"
                      value={rolesSearch}
                      onChange={(e) => setRolesSearch(e.target.value)}
                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"
                    />
                  </div>
                </div>

                {/* Roles Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">
                  <div className="px-6 py-4 border-b border-[#1F2235]">
                    <h3 className="text-sm font-semibold text-white">Roles & Permissions</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#1F2235] bg-[#11131E]">
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Role Name
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Description
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Permissions
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Users
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.filter(r => r?.name?.toLowerCase().includes(rolesSearch.toLowerCase())).map((role, idx) => (
                          <motion.tr
                            key={role?.id || idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"
                          >
                            <td className="px-4 py-3 font-medium text-white">{role?.name || "N/A"}</td>
                            <td className="px-4 py-3 text-slate-400">{role?.description || "N/A"}</td>
                            <td className="px-4 py-3 text-slate-400">{role?.permissions?.length || 0} permissions</td>
                            <td className="px-4 py-3 text-slate-400">{role?.userCount || 0}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${role?.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>
                                {role?.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {roles.length === 0 && (
                    <div className="px-6 py-16 text-center text-slate-400">
                      <ShieldCheck className="mx-auto mb-3 h-8 w-8 opacity-40" />
                      <p className="text-sm">No roles configured yet</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeSection === "profit_loss" && (
              <>
                {/* Profit & Loss Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total Revenue"
                    value={`£${profitLoss.reduce((sum, p) => sum + (p?.revenue || 0), 0).toFixed(0)}`}
                    icon={TrendingUp}
                    gradient="from-emerald-500 to-green-500"
                  />
                  <StatCard
                    title="Total Expenses"
                    value={`£${profitLoss.reduce((sum, p) => sum + (p?.expenses || 0), 0).toFixed(0)}`}
                    icon={FileText}
                    gradient="from-rose-500 to-red-500"
                  />
                  <StatCard
                    title="Net Profit"
                    value={`£${(profitLoss.reduce((sum, p) => sum + (p?.revenue || 0), 0) - profitLoss.reduce((sum, p) => sum + (p?.expenses || 0), 0)).toFixed(0)}`}
                    icon={DollarSign}
                    gradient="from-blue-500 to-cyan-500"
                  />
                  <StatCard
                    title="Profit Margin"
                    value={`${profitLoss.reduce((sum, p) => sum + (p?.revenue || 0), 0) > 0 ? ((profitLoss.reduce((sum, p) => sum + (p?.revenue || 0), 0) - profitLoss.reduce((sum, p) => sum + (p?.expenses || 0), 0)) / profitLoss.reduce((sum, p) => sum + (p?.revenue || 0), 0) * 100).toFixed(1) : 0}%`}
                    icon={Activity}
                    gradient="from-violet-500 to-purple-500"
                  />
                </div>

                {/* Period Filter */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setProfitLossPeriod("month")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${profitLossPeriod === "month" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`}
                    >
                      This Month
                    </button>
                    <button
                      onClick={() => setProfitLossPeriod("quarter")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${profitLossPeriod === "quarter" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`}
                    >
                      This Quarter
                    </button>
                    <button
                      onClick={() => setProfitLossPeriod("year")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${profitLossPeriod === "year" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`}
                    >
                      This Year
                    </button>
                  </div>
                </div>

                {/* P&L Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">
                  <div className="px-6 py-4 border-b border-[#1F2235]">
                    <h3 className="text-sm font-semibold text-white">Profit & Loss Statement</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#1F2235] bg-[#11131E]">
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Category
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Revenue
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Expenses
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Net
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Period
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {profitLoss.map((item, idx) => (
                          <motion.tr
                            key={item?.id || idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"
                          >
                            <td className="px-4 py-3 font-medium text-white">{item?.category || "N/A"}</td>
                            <td className="px-4 py-3 font-semibold text-emerald-400">£{(item?.revenue || 0).toFixed(2)}</td>
                            <td className="px-4 py-3 font-semibold text-rose-400">£{(item?.expenses || 0).toFixed(2)}</td>
                            <td className={`px-4 py-3 font-semibold ${(item?.revenue || 0) - (item?.expenses || 0) >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                              £{((item?.revenue || 0) - (item?.expenses || 0)).toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-slate-400">{item?.period || "N/A"}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {profitLoss.length === 0 && (
                    <div className="px-6 py-16 text-center text-slate-400">
                      <TrendingUp className="mx-auto mb-3 h-8 w-8 opacity-40" />
                      <p className="text-sm">No profit & loss data yet</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeSection === "cash_flow" && (
              <>
                {/* Cash Flow Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Cash In"
                    value={`£${cashFlow.filter(c => c?.type === "in").reduce((sum, c) => sum + (c?.amount || 0), 0).toFixed(0)}`}
                    icon={TrendingUp}
                    gradient="from-emerald-500 to-green-500"
                  />
                  <StatCard
                    title="Cash Out"
                    value={`£${cashFlow.filter(c => c?.type === "out").reduce((sum, c) => sum + (c?.amount || 0), 0).toFixed(0)}`}
                    icon={TrendingUp}
                    gradient="from-rose-500 to-red-500"
                  />
                  <StatCard
                    title="Net Cash Flow"
                    value={`£${(cashFlow.filter(c => c?.type === "in").reduce((sum, c) => sum + (c?.amount || 0), 0) - cashFlow.filter(c => c?.type === "out").reduce((sum, c) => sum + (c?.amount || 0), 0)).toFixed(0)}`}
                    icon={DollarSign}
                    gradient="from-blue-500 to-cyan-500"
                  />
                  <StatCard
                    title="Cash Balance"
                    value={`£${(cashFlow.filter(c => c?.type === "in").reduce((sum, c) => sum + (c?.amount || 0), 0) - cashFlow.filter(c => c?.type === "out").reduce((sum, c) => sum + (c?.amount || 0), 0)).toFixed(0)}`}
                    icon={Activity}
                    gradient="from-violet-500 to-purple-500"
                  />
                </div>

                {/* Period Filter */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCashFlowPeriod("month")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${cashFlowPeriod === "month" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`}
                    >
                      This Month
                    </button>
                    <button
                      onClick={() => setCashFlowPeriod("quarter")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${cashFlowPeriod === "quarter" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`}
                    >
                      This Quarter
                    </button>
                    <button
                      onClick={() => setCashFlowPeriod("year")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${cashFlowPeriod === "year" ? "bg-[#6B46C1] text-white" : "bg-[#1A1D27] text-slate-400 hover:text-white"}`}
                    >
                      This Year
                    </button>
                  </div>
                </div>

                {/* Cash Flow Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">
                  <div className="px-6 py-4 border-b border-[#1F2235]">
                    <h3 className="text-sm font-semibold text-white">Cash Flow Statement</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#1F2235] bg-[#11131E]">
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Description
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Category
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cashFlow.map((item, idx) => (
                          <motion.tr
                            key={item?.id || idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"
                          >
                            <td className="px-4 py-3 text-slate-400">{new Date(item?.date).toLocaleDateString()}</td>
                            <td className="px-4 py-3 font-medium text-white">{item?.description || "N/A"}</td>
                            <td className="px-4 py-3 text-slate-400">{item?.category || "N/A"}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${item?.type === "in" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`}>
                                {item?.type === "in" ? "Inflow" : "Outflow"}
                              </span>
                            </td>
                            <td className={`px-4 py-3 font-semibold ${item?.type === "in" ? "text-emerald-400" : "text-rose-400"}`}>
                              {item?.type === "in" ? "+" : "-"}£{(item?.amount || 0).toFixed(2)}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {cashFlow.length === 0 && (
                    <div className="px-6 py-16 text-center text-slate-400">
                      <DollarSign className="mx-auto mb-3 h-8 w-8 opacity-40" />
                      <p className="text-sm">No cash flow data yet</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeSection === "repair_tracking" && (
              <>
                {/* Repair Tracking Section */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total Repairs"
                    value={repairTracking.length}
                    icon={Wrench}
                    gradient="from-blue-500 to-cyan-500"
                  />
                  <StatCard
                    title="In Progress"
                    value={repairTracking.filter(r => r?.status === "in_progress").length}
                    icon={Activity}
                    gradient="from-amber-500 to-orange-500"
                  />
                  <StatCard
                    title="Completed"
                    value={repairTracking.filter(r => r?.status === "completed").length}
                    icon={CheckCircle2}
                    gradient="from-emerald-500 to-green-500"
                  />
                  <StatCard
                    title="Pending"
                    value={repairTracking.filter(r => r?.status === "pending").length}
                    icon={Clock}
                    gradient="from-violet-500 to-purple-500"
                  />
                </div>

                {/* Filters */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by tracking ID or customer"
                      value={repairTrackingSearch}
                      onChange={(e) => setRepairTrackingSearch(e.target.value)}
                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"
                    />
                  </div>
                </div>

                {/* Repair Tracking Table */}
                <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">
                  <div className="px-6 py-4 border-b border-[#1F2235]">
                    <h3 className="text-sm font-semibold text-white">Repair Lifecycle Tracking</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#1F2235] bg-[#11131E]">
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Tracking ID
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Customer
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Device
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Progress
                          </th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                            Started
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {repairTracking.filter(r => {
                          const matchSearch = r?.trackingId?.toLowerCase().includes(repairTrackingSearch.toLowerCase()) ||
                            r?.customer?.toLowerCase().includes(repairTrackingSearch.toLowerCase());
                          return matchSearch;
                        }).map((repair, idx) => (
                          <motion.tr
                            key={repair?.id || idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"
                          >
                            <td className="px-4 py-3 font-medium text-white">{repair?.trackingId || "N/A"}</td>
                            <td className="px-4 py-3 text-slate-400">{repair?.customer || "N/A"}</td>
                            <td className="px-4 py-3 text-slate-400">{repair?.device || "N/A"}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${repair?.status === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : repair?.status === "in_progress" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>
                                {repair?.status || "pending"}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-[#1F2235] rounded-full overflow-hidden">
                                  <div className="h-full bg-[#6B46C1]" style={{ width: `${repair?.progress || 0}%` }}></div>
                                </div>
                                <span className="text-xs text-slate-400">{repair?.progress || 0}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-400">{new Date(repair?.startDate).toLocaleDateString()}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {repairTracking.length === 0 && (
                    <div className="px-6 py-16 text-center text-slate-400">
                      <Activity className="mx-auto mb-3 h-8 w-8 opacity-40" />
                      <p className="text-sm">No repair tracking data yet</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeSection === "settings" && (
              <>
                <div className="max-w-4xl">
                  <div className="mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6">
                    <h2 className="mb-6 text-lg font-semibold text-white">Business Information</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">Business Name</label>
                        <Input value={businessSettings.businessName} onChange={(e) => setBusinessSettings({ ...businessSettings, businessName: e.target.value })} className="border-[#2D3142] bg-[#1A1D27]" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                        <Input value={businessSettings.email} onChange={(e) => setBusinessSettings({ ...businessSettings, email: e.target.value })} className="border-[#2D3142] bg-[#1A1D27]" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">Phone</label>
                        <Input value={businessSettings.phone} onChange={(e) => setBusinessSettings({ ...businessSettings, phone: e.target.value })} className="border-[#2D3142] bg-[#1A1D27]" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">Address</label>
                        <Input value={businessSettings.address} onChange={(e) => setBusinessSettings({ ...businessSettings, address: e.target.value })} className="border-[#2D3142] bg-[#1A1D27]" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6">
                    <h2 className="mb-6 text-lg font-semibold text-white">Opening Hours</h2>
                    <div className="grid gap-4">
                      {Object.entries(businessSettings.openingHours).map(([day, hours]) => (
                        <div key={day} className="flex items-center gap-4">
                          <span className="w-32 text-sm font-medium text-slate-300 capitalize">{day}</span>
                          <Input
                            value={hours}
                            onChange={(e) => setBusinessSettings({
                              ...businessSettings,
                              openingHours: { ...businessSettings.openingHours, [day]: e.target.value }
                            })}
                            className="border-[#2D3142] bg-[#1A1D27] flex-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6">
                    <h2 className="mb-6 text-lg font-semibold text-white">Financial Settings</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">Tax Rate (%)</label>
                        <Input
                          type="number"
                          value={businessSettings.taxRate}
                          onChange={(e) => setBusinessSettings({ ...businessSettings, taxRate: Number(e.target.value) })}
                          className="border-[#2D3142] bg-[#1A1D27]"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">Currency</label>
                        <select
                          value={businessSettings.currency}
                          onChange={(e) => setBusinessSettings({ ...businessSettings, currency: e.target.value })}
                          className="rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
                        >
                          <option value="GBP">GBP (£)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="USD">USD ($)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6">
                    <h2 className="mb-6 text-lg font-semibold text-white">Notification Settings</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-300">Email Notifications</p>
                          <p className="text-xs text-slate-500">Receive email updates for important events</p>
                        </div>
                        <button
                          onClick={() => setBusinessSettings({
                            ...businessSettings,
                            notifications: { ...businessSettings.notifications, emailNotifications: !businessSettings.notifications.emailNotifications }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.notifications.emailNotifications ? "bg-violet-600" : "bg-[#2D3142]"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.notifications.emailNotifications ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-300">SMS Notifications</p>
                          <p className="text-xs text-slate-500">Receive SMS updates for urgent matters</p>
                        </div>
                        <button
                          onClick={() => setBusinessSettings({
                            ...businessSettings,
                            notifications: { ...businessSettings.notifications, smsNotifications: !businessSettings.notifications.smsNotifications }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.notifications.smsNotifications ? "bg-violet-600" : "bg-[#2D3142]"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.notifications.smsNotifications ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-300">Booking Reminders</p>
                          <p className="text-xs text-slate-500">Send automatic reminders for upcoming appointments</p>
                        </div>
                        <button
                          onClick={() => setBusinessSettings({
                            ...businessSettings,
                            notifications: { ...businessSettings.notifications, bookingReminders: !businessSettings.notifications.bookingReminders }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.notifications.bookingReminders ? "bg-violet-600" : "bg-[#2D3142]"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.notifications.bookingReminders ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-300">Status Updates</p>
                          <p className="text-xs text-slate-500">Notify customers when repair status changes</p>
                        </div>
                        <button
                          onClick={() => setBusinessSettings({
                            ...businessSettings,
                            notifications: { ...businessSettings.notifications, statusUpdates: !businessSettings.notifications.statusUpdates }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.notifications.statusUpdates ? "bg-violet-600" : "bg-[#2D3142]"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.notifications.statusUpdates ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6">
                    <h2 className="mb-6 text-lg font-semibold text-white">Display Settings</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-300">Show Prices</p>
                          <p className="text-xs text-slate-500">Display prices on the public website</p>
                        </div>
                        <button
                          onClick={() => setBusinessSettings({
                            ...businessSettings,
                            display: { ...businessSettings.display, showPrices: !businessSettings.display.showPrices }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.display.showPrices ? "bg-violet-600" : "bg-[#2D3142]"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.display.showPrices ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-300">Show Contact Info</p>
                          <p className="text-xs text-slate-500">Display contact information publicly</p>
                        </div>
                        <button
                          onClick={() => setBusinessSettings({
                            ...businessSettings,
                            display: { ...businessSettings.display, showContactInfo: !businessSettings.display.showContactInfo }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${businessSettings.display.showContactInfo ? "bg-violet-600" : "bg-[#2D3142]"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 trtransform rounded-full bg-white transition-trtransform ${businessSettings.display.showContactInfo ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8 rounded-xl border border-[#1F2235] bg-[#11131E] p-6">
                    <h2 className="mb-6 text-lg font-semibold text-white">Data Management</h2>
                    <BackupRestore />
                  </div>
                  <Button onClick={() => toast.success("Settings saved successfully")} className="bg-violet-600 hover:bg-violet-700">
                    Save All Settings
                  </Button>
                </div>
              </>
            )}

          </div>

        </div>

      </div>

      {/* Repair Timeline Modal */}
      <AnimatePresence>
        {selectedRepairForTimeline && (
          <RepairTimeline
            repairId={selectedRepairForTimeline.id}
            trackingId={selectedRepairForTimeline.trackingId}
            onClose={() => setSelectedRepairForTimeline(null)}
          />
        )}
      </AnimatePresence>

    </div>

  );

}





/* -------------------- Route -------------------- */



export const Route = createFileRoute("/admin")({

  head: () => ({ meta: [{ title: "Admin Dashboard ? Fixora" }] }),

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

      const res = await fetch(buildUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ email, password }),

      });

      const data = await res.json();

      if (res.ok) {

        if (

          data.user.role === "admin" ||

          data.user.role === "technician" ||

          data.user.role === "SUPER_ADMIN" ||

          data.user.role === "STAFF"

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

            "Unauthorized ? admin or technician role required.",

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

      <ErrorBoundary>
        <AdminDashboard token={token} onLogout={handleLogout} />
      </ErrorBoundary>

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

        <div className="rounded-2xl border border-[#1F2235] bg-[#11131E] p-8 shadow-2xl">

          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25">

              <LayoutDashboard className="h-7 w-7 text-white" />

            </div>

            <h2 className="text-2xl font-bold text-white">

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

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">

                Email

              </label>

              <Input

                type="email"

                required

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                placeholder="admin@fixora.com"

                className="h-12 border-[#2D3142] bg-[#1A1D27] text-white placeholder:text-slate-400 focus-visible:ring-violet-500"

              />

            </div>

            <div>

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">

                Password

              </label>

              <Input

                type="password"

                required

                value={password}

                onChange={(e) => setPassword(e.target.value)}

                placeholder="••••••••"

                className="h-12 border-[#2D3142] bg-[#1A1D27] text-white placeholder:text-slate-400 focus-visible:ring-violet-500"

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

















