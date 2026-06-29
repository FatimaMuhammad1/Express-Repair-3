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
  Plus,
  Upload,
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



function AdminDashboard({

  token,

  onLogout,

}: {

  token: string;

  onLogout: () => void;

}) {

  const [repairs, setRepairs] = useState<any[]>([]);

  const [stats, setStats] = useState<any>({
    total_repairs: 0,
    pending_repairs: 0,
    completed_repairs: 0,
    revenue: 0,
    active_bookings: 0,
    low_stock_items: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [activeSection, setActiveSection] = useState("dashboard");

  // Redirect staff to walk-in bookings by default
  useEffect(() => {
    const userRole = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("admin_user") || "{}").role : "";
    if (userRole === "staff") {
      setActiveSection("walkin");
    }
  }, []);

  // Prevent staff from accessing admin-only sections
  useEffect(() => {
    const userRole = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("admin_user") || "{}").role : "";
    const staffAllowedSections = ["walkin", "inhouse_sales"];
    
    if (userRole === "staff" && !staffAllowedSections.includes(activeSection)) {
      setActiveSection("walkin");
      // Only show toast in browser environment
      if (typeof window !== "undefined") {
        safeToast.error("Access denied. Staff can only access Walk-in Bookings and In-House Sales.");
      }
    }
  }, [activeSection]);

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

    // Navigation event listener from MainDashboard
    const handleNavigation = (e: CustomEvent) => {
      const section = e.detail.section;
      // Map section names to activeSection values
      const sectionMap: Record<string, string> = {
        'activity': 'communications',
        'low_stock_alerts': 'inventory',
        'customers': 'customers',
        'online_sales': 'financials',
        'stock_purchases': 'stock_purchases',
        'inventory_management': 'inventory',
        'invoices': 'financials',
        'expenses': 'financials'
      };
      setActiveSection(sectionMap[section] || section);
    };

    window.addEventListener('navigate-to-section', handleNavigation as EventListener);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('navigate-to-section', handleNavigation as EventListener);
    };
  }, [onLogout]);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const [timePeriod, setTimePeriod] = useState("all");

  const [products, setProducts] = useState<any[]>([]);

  const [inventorySearch, setInventorySearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

  // Repair Parts Inventory
  const [repairPartsInventory, setRepairPartsInventory] = useState<any[]>([]);
  const [repairPartsSearch, setRepairPartsSearch] = useState("");
  const [repairPartsTypeFilter, setRepairPartsTypeFilter] = useState("all");
  const [showAddRepairPartModal, setShowAddRepairPartModal] = useState(false);
  const [showEditRepairPartModal, setShowEditRepairPartModal] = useState(false);
  const [editingRepairPart, setEditingRepairPart] = useState<any>(null);
  const [newRepairPart, setNewRepairPart] = useState({
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

  const [newProduct, setNewProduct] = useState({
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

  const [showEditStaffModal, setShowEditStaffModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);

  const [staff, setStaff] = useState<any[]>([]);

  const [staffSearch, setStaffSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("all");

  const [messages, setMessages] = useState<any[]>([]);

  const [emailsSent, setEmailsSent] = useState(0);

  const [smsSent, setSmsSent] = useState(0);

  const [showEmailModal, setShowEmailModal] = useState(false);

  const [showSmsModal, setShowSmsModal] = useState(false);

  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  const [bookings, setBookings] = useState<any[]>([]);

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

  const [expenses, setExpenses] = useState<any[]>([]);
  const [expenseSearch, setExpenseSearch] = useState("");
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState("all");

  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [revenueSearch, setRevenueSearch] = useState("");

  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [inventoryManagementSearch, setInventoryManagementSearch] = useState("");

  const [stockMovements, setStockMovements] = useState<any[]>([]);
  const [stockMovementSearch, setStockMovementSearch] = useState("");

  const [lowStockItems, setLowStockItems] = useState<any[]>([]);

  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [supplierSearch, setSupplierSearch] = useState("");
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });

  const [stockPurchases, setStockPurchases] = useState<any[]>([]);
  const [stockPurchaseSearch, setStockPurchaseSearch] = useState("");
  const [showAddPurchaseModal, setShowAddPurchaseModal] = useState(false);
  const [newPurchaseOrder, setNewPurchaseOrder] = useState({
    supplier_id: "",
    branch_id: "",
    reference: "",
    total_amount: "",
    date: new Date().toISOString().split('T')[0],
    status: "pending",
    notes: ""
  });

  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
  const [purchaseOrderSearch, setPurchaseOrderSearch] = useState("");

  const [onlineSales, setOnlineSales] = useState<any[]>([]);
  const [onlineSaleSearch, setOnlineSaleSearch] = useState("");

  const [inhouseSales, setInhouseSales] = useState<any[]>([]);
  const [inhouseSaleSearch, setInhouseSaleSearch] = useState("");
  const [showAddInhouseSaleModal, setShowAddInhouseSaleModal] = useState(false);
  const [newInhouseSale, setNewInhouseSale] = useState({
    reference: "",
    customer_name: "",
    customer_phone: "",
    amount: "",
    item_count: "",
    payment_method: "cash"
  });

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

    } finally {

      setIsLoading(false);

    }

  };



  const fetchStats = async () => {

    setIsLoading(true);

    try {

      const res = await fetch(buildUrl("/repairs/stats"), {

        headers: { Authorization: `Bearer ${token}` },

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
      const token = getStoredToken();
      const res = await fetch(buildUrl("/repairs/export/csv"), {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
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
      safeToast.error("Failed to fetch staff");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairs();
    fetchStats();
    fetchStaff();
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
      // Refetch stats to update dashboard counts
      fetchStats();
    } catch (e) {
      console.error(e);
      // Revert on error
      setRepairs(prev => prev.map(r =>
        r.tracking_id === trackingId ? { ...r, status: r.status } : r
      ));
    }
  };

  const updatePriority = async (trackingId: string, newPriority: string) => {
    const repair = repairs.find(r => r.tracking_id === trackingId);
    if (!repair) return;

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
          body: JSON.stringify({ status: repair.status, priority: newPriority }),
        },
      );
    } catch (e) {
      console.error("Failed to update priority:", e);
      if (typeof window !== "undefined") safeToast.error("Failed to update priority");
    }
  };

  const updateTechnician = async (trackingId: string, technicianId: string) => {
    const repair = repairs.find(r => r.tracking_id === trackingId);
    if (!repair) return;

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
          body: JSON.stringify({ status: repair.status, technician_id: technicianId || null }),
        },
      );
    } catch (e) {
      console.error("Failed to update technician:", e);
      if (typeof window !== "undefined") safeToast.error("Failed to update technician");
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

  const inProgressRepairs = repairs.filter((r: any) => r.status !== "collection" && r.status !== "completed").length;

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
      safeToast.error("Failed to fetch products");
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
        safeToast.success("Product updated successfully");
      } else {
        safeToast.error("Failed to update product");
      }
    } catch (e) {
      console.error("Failed to update product:", e);
      safeToast.error("Failed to update product");
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
      safeToast.error("Failed to delete product");
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
        safeToast.success("Staff member updated successfully");
      } else {
        safeToast.error("Failed to update staff member");
      }
    } catch (e) {
      console.error("Failed to update staff:", e);
      safeToast.error("Failed to update staff member");
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
      safeToast.error("Failed to toggle staff status");
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
      safeToast.error("Failed to fetch bookings");
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
      safeToast.error("Failed to confirm booking");
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
      safeToast.error("Failed to cancel booking");
    }
  };

  // Fetch bookings when bookings section is active
  useEffect(() => {
    if (activeSection === "bookings") {
      fetchBookings();
    }
  }, [activeSection]);

  // Fetch roles & permissions
  const fetchRoles = useCallback(async () => {
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
      safeToast.error("Failed to fetch roles");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch profit & loss
  const fetchProfitLoss = useCallback(async () => {
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
      safeToast.error("Failed to fetch profit & loss");
    } finally {
      setIsLoading(false);
    }
  }, [profitLossPeriod]);

  // Fetch cash flow
  const fetchCashFlow = useCallback(async () => {
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
      safeToast.error("Failed to fetch cash flow");
    } finally {
      setIsLoading(false);
    }
  }, [cashFlowPeriod]);

  // Fetch repair tracking
  const fetchRepairTracking = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/financials/repair-tracking"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
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

  // Fetch expenses
  const fetchExpenses = useCallback(async () => {
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
      safeToast.error("Failed to fetch expenses");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch revenue
  const fetchRevenue = useCallback(async () => {
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
      safeToast.error("Failed to fetch revenue");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch online sales
  const fetchOnlineSales = useCallback(async () => {
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
      safeToast.error("Failed to fetch online sales");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch in-house sales
  const fetchInhouseSales = useCallback(async () => {
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
      safeToast.error("Failed to fetch in-house sales");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch invoices
  const fetchInvoices = useCallback(async () => {
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
      safeToast.error("Failed to fetch invoices");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch payments
  const fetchPayments = useCallback(async () => {
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
      safeToast.error("Failed to fetch payments");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch customer history
  const fetchCustomerHistory = useCallback(async () => {
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
      safeToast.error("Failed to fetch customer history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch inventory items
  const fetchInventoryItems = useCallback(async () => {
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
      safeToast.error("Failed to fetch inventory items");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch repair parts inventory
  const fetchRepairPartsInventory = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/repairs/inventory"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
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

  // Fetch stock movements
  const fetchStockMovements = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/inventory/stock-movements"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
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

  // Fetch suppliers
  const fetchSuppliers = useCallback(async () => {
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
      safeToast.error("Failed to fetch suppliers");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handler for creating supplier
  const handleCreateSupplier = async () => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/suppliers"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(newSupplier)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuppliers(prev => [data.supplier, ...prev]);
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

  // Fetch stock purchases
  const fetchStockPurchases = useCallback(async () => {
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
      safeToast.error("Failed to fetch stock purchases");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch purchase orders
  const fetchPurchaseOrders = useCallback(async () => {
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
      safeToast.error("Failed to fetch purchase orders");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect hooks for data fetching
  useEffect(() => {
    if (activeSection === "roles_permissions") {
      fetchRoles();
    }
  }, [activeSection, fetchRoles]);

  useEffect(() => {
    if (activeSection === "profit_loss") {
      fetchProfitLoss();
    }
  }, [activeSection, fetchProfitLoss]);

  useEffect(() => {
    if (activeSection === "cash_flow") {
      fetchCashFlow();
    }
  }, [activeSection, fetchCashFlow]);

  useEffect(() => {
    if (activeSection === "repair_tracking") {
      fetchRepairTracking();
    }
  }, [activeSection, fetchRepairTracking]);

  useEffect(() => {
    if (activeSection === "expenses") {
      fetchExpenses();
    }
  }, [activeSection, fetchExpenses]);

  useEffect(() => {
    if (activeSection === "revenue") {
      fetchRevenue();
    }
  }, [activeSection, fetchRevenue]);

  useEffect(() => {
    if (activeSection === "online_sales") {
      fetchOnlineSales();
    }
  }, [activeSection, fetchOnlineSales]);

  useEffect(() => {
    if (activeSection === "inhouse_sales") {
      fetchInhouseSales();
    }
  }, [activeSection, fetchInhouseSales]);

  useEffect(() => {
    if (activeSection === "invoices") {
      fetchInvoices();
    }
  }, [activeSection, fetchInvoices]);

  useEffect(() => {
    if (activeSection === "payments") {
      fetchPayments();
    }
  }, [activeSection, fetchPayments]);

  useEffect(() => {
    if (activeSection === "customer_history") {
      fetchCustomerHistory();
    }
  }, [activeSection, fetchCustomerHistory]);

  useEffect(() => {
    if (activeSection === "inventory_management") {
      fetchInventoryItems();
    }
  }, [activeSection, fetchInventoryItems]);

  useEffect(() => {
    if (activeSection === "stock_movements") {
      fetchStockMovements();
    }
  }, [activeSection, fetchStockMovements]);

  useEffect(() => {
    if (activeSection === "supplier_management") {
      fetchSuppliers();
    }
  }, [activeSection, fetchSuppliers]);

  useEffect(() => {
    if (activeSection === "stock_purchases") {
      fetchStockPurchases();
    }
  }, [activeSection, fetchStockPurchases]);

  // Handler for creating in-house sale
  const handleCreateInhouseSale = async () => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/finance/inhouse-sales"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
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
        setInhouseSales(prev => [{
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

  // Handler for creating product
  const handleCreateProduct = async () => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/products"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
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
        setProducts(prev => [data, ...prev]);
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

  // Handler for importing products from CSV/Excel
  const handleImportProducts = async () => {
    if (!importFile) {
      safeToast.error("Please select a file to import");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", importFile);

      const token = getStoredToken();
      const res = await fetch(buildUrl("/products/import"), {
        method: "POST",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
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

  // Handler for creating repair part
  const handleCreateRepairPart = async () => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/repairs/inventory"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
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
        setRepairPartsInventory(prev => [data.part, ...prev]);
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

  // Handler for updating repair part
  const handleUpdateRepairPart = async () => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/repairs/inventory/${editingRepairPart.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(editingRepairPart)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRepairPartsInventory(prev => prev.map(p => p.id === editingRepairPart.id ? data.part : p));
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

  // Handler for deleting repair part
  const handleDeleteRepairPart = async (partId: string) => {
    if (!confirm("Are you sure you want to delete this repair part?")) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/repairs/inventory/${partId}`), {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setRepairPartsInventory(prev => prev.filter(p => p.id !== partId));
        safeToast.success("Repair part deleted successfully");
      }
    } catch (e) {
      console.error("Failed to delete repair part:", e);
      safeToast.error("Failed to delete repair part");
    }
  };

  // Handler for creating purchase order
  const handleCreatePurchaseOrder = async () => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/purchase-orders"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
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
        setStockPurchases(prev => [{
          id: data.order.id,
          supplier: suppliers.find(s => s.id === newPurchaseOrder.supplier_id)?.name || "New Supplier",
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
          date: new Date().toISOString().split('T')[0],
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

  useEffect(() => {
    if (activeSection === "purchase_orders") {
      fetchPurchaseOrders();
    }
  }, [activeSection, fetchPurchaseOrders]);

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
        safeToast.success("Expense created successfully");
      }
    } catch (e) {
      console.error("Failed to create expense:", e);
      safeToast.error("Failed to create expense");
    }
  };

  const handleUpdateExpense = async (expenseId: string, expenseData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/api/finance/expenses/${expenseId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(expenseData)
      });
      if (res.ok) {
        setExpenses(prev => prev.map(e => e.id === expenseId ? { ...e, ...expenseData } : e));
        safeToast.success("Expense updated successfully");
      }
    } catch (e) {
      console.error("Failed to update expense:", e);
      safeToast.error("Failed to update expense");
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/api/finance/expenses/${expenseId}`), {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setExpenses(prev => prev.filter(e => e.id !== expenseId));
        safeToast.success("Expense deleted successfully");
      }
    } catch (e) {
      console.error("Failed to delete expense:", e);
      safeToast.error("Failed to delete expense");
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
        safeToast.success("Revenue created successfully");
      }
    } catch (e) {
      console.error("Failed to create revenue:", e);
      safeToast.error("Failed to create revenue");
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
        safeToast.success("Online sale created successfully");
      }
    } catch (e) {
      console.error("Failed to create online sale:", e);
      safeToast.error("Failed to create online sale");
    }
  };

  const handleUpdateOnlineSale = async (saleId: string, saleData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/api/finance/online-sales/${saleId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(saleData)
      });
      if (res.ok) {
        setOnlineSales(prev => prev.map(s => s.id === saleId ? { ...s, ...saleData } : s));
        safeToast.success("Online sale updated successfully");
      }
    } catch (e) {
      console.error("Failed to update online sale:", e);
      safeToast.error("Failed to update online sale");
    }
  };

  const handleDeleteOnlineSale = async (saleId: string) => {
    if (!confirm("Are you sure you want to delete this online sale?")) return;
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/api/finance/online-sales/${saleId}`), {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setOnlineSales(prev => prev.filter(s => s.id !== saleId));
        safeToast.success("Online sale deleted successfully");
      }
    } catch (e) {
      console.error("Failed to delete online sale:", e);
      safeToast.error("Failed to delete online sale");
    }
  };

  const handleUpdateInhouseSale = async (saleId: string, saleData: any) => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl(`/api/finance/inhouse-sales/${saleId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(saleData)
      });
      if (res.ok) {
        setInhouseSales(prev => prev.map(s => s.id === saleId ? { ...s, ...saleData } : s));
        safeToast.success("In-house sale updated successfully");
      }
    } catch (e) {
      console.error("Failed to update in-house sale:", e);
      safeToast.error("Failed to update in-house sale");
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeSection === "communication") {
      fetchCommunications();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "repair_parts_inventory") {
      fetchRepairPartsInventory();
    }
  }, [activeSection, fetchRepairPartsInventory]);

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedRepairs.size} repairs?`)) return;
    try {
      const token = getStoredToken();
      await Promise.all(
        Array.from(selectedRepairs).map(id =>
          fetch(buildUrl(`/api/repairs/${id}`), {
            method: "DELETE",
            headers: {
              ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
          })
        )
      );
      setRepairs(prev => prev.filter(r => !selectedRepairs.has(r.id)));
      setSelectedRepairs(new Set());
      safeToast.success("Repairs deleted successfully");
    } catch (e) {
      console.error("Failed to delete repairs:", e);
      safeToast.error("Failed to delete repairs");
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
      safeToast.success(`Repairs marked as ${status}`);
    } catch (e) {
      console.error("Failed to update repairs:", e);
      safeToast.error("Failed to update repairs");
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
        { id: "repair_parts_inventory", icon: Wrench, label: "Repair Parts" },
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
      if (userRole === "staff") {
        // Staff can only access walk-in bookings and in-house sales (buy & sell)
        return ["walkin", "inhouse_sales"].includes(item.id);
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

                              onClick={() => {
                                console.log("Sidebar clicked, setting activeSection to:", item.id);
                                setActiveSection(item.id);
                              }}

                              className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-xs font-medium transition-all ${activeSection === item.id

                                  ? "bg-[#6B46C1] text-white shadow-sm"

                                  : "text-slate-400 hover:bg-[#1A1D27] hover:text-white"

                                }`}

                            >

                              <div className="flex items-center gap-2 min-w-0">
                                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>
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

                            Assigned Staff

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

                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">

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

                    <Button
                      onClick={() => setShowAddProductModal(true)}
                      className="bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>

                    <Button
                      onClick={() => setShowImportModal(true)}
                      variant="outline"
                      className="border-[#1F2235] text-white hover:bg-slate-800"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import CSV/Excel
                    </Button>

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

                {/* Add Product Modal */}
                <AnimatePresence>
                  {showAddProductModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                      onClick={() => setShowAddProductModal(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">Add New Product</h3>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-slate-300">Product Name *</Label>
                            <Input
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Category</Label>
                            <select
                              value={newProduct.category}
                              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                              className="w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            >
                              <option value="smartphones">Smartphones</option>
                              <option value="laptops">Laptops</option>
                              <option value="tablets">Tablets</option>
                              <option value="accessories">Accessories</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-slate-300">Brand</Label>
                              <Input
                                value={newProduct.brand}
                                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                                className="border-[#1F2235] bg-[#1A1D27] text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-slate-300">Model</Label>
                              <Input
                                value={newProduct.model}
                                onChange={(e) => setNewProduct({ ...newProduct, model: e.target.value })}
                                className="border-[#1F2235] bg-[#1A1D27] text-white"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-slate-300">Condition</Label>
                            <select
                              value={newProduct.condition}
                              onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}
                              className="w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            >
                              <option value="new">New</option>
                              <option value="refurbished">Refurbished</option>
                              <option value="used">Used</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-slate-300">Price (£) *</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                className="border-[#1F2235] bg-[#1A1D27] text-white"
                                required
                              />
                            </div>
                            <div>
                              <Label className="text-slate-300">Stock Quantity *</Label>
                              <Input
                                type="number"
                                value={newProduct.stock_quantity}
                                onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: e.target.value })}
                                className="border-[#1F2235] bg-[#1A1D27] text-white"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-slate-300">Description</Label>
                            <Input
                              value={newProduct.description}
                              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                              placeholder="Optional description..."
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Image URL</Label>
                            <Input
                              value={newProduct.image_url}
                              onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                              placeholder="Optional image URL..."
                            />
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={() => setShowAddProductModal(false)}
                              variant="outline"
                              className="flex-1 border-[#1F2235] text-white hover:bg-slate-800"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleCreateProduct}
                              className="flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                            >
                              Add Product
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Import Products Modal */}
                <AnimatePresence>
                  {showImportModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                      onClick={() => setShowImportModal(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">Import Products</h3>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-slate-300">CSV/Excel File</Label>
                            <Input
                              type="file"
                              accept=".csv,.xlsx,.xls"
                              onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                              className="border-[#1F2235] bg-[#1A1D27] text-white mt-1"
                            />
                            <p className="text-xs text-slate-500 mt-1">Supported formats: CSV, Excel (.xlsx, .xls)</p>
                          </div>
                          <div className="bg-[#1A1D27] rounded-lg p-4 border border-[#1F2235]">
                            <p className="text-sm text-slate-400 mb-2">Expected CSV columns:</p>
                            <code className="text-xs text-slate-300 block">name, description, category, brand, model, condition, price, stock_quantity, image_url</code>
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={() => setShowImportModal(false)}
                              variant="outline"
                              className="flex-1 border-[#1F2235] text-white hover:bg-slate-800"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleImportProducts}
                              className="flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                            >
                              Import
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </>

            )}

            {/* Repair Parts Inventory Section */}
            {activeSection === "repair_parts_inventory" && (
              <>
                    {/* CTA Section */}
                    <div className="mb-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Repair Parts Inventory</h3>
                        <p className="text-sm text-violet-100">Manage your repair parts stock efficiently</p>
                      </div>
                      <Button
                        onClick={() => setShowAddRepairPartModal(true)}
                        className="bg-white text-violet-600 hover:bg-violet-50 font-medium"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Part
                      </Button>
                    </div>

                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <StatCard
                        title="Total Parts"
                        value={repairPartsInventory.length}
                        icon={Wrench}
                        gradient="from-blue-500 to-cyan-500"
                      />
                      <StatCard
                        title="In Stock"
                        value={repairPartsInventory.filter((p) => p.stock_quantity > 0).length}
                        icon={CheckCircle2}
                        gradient="from-emerald-500 to-green-500"
                      />
                      <StatCard
                        title="Low Stock"
                        value={repairPartsInventory.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= p.min_stock_level).length}
                        icon={AlertCircle}
                        gradient="from-amber-500 to-orange-500"
                      />
                      <StatCard
                        title="Out of Stock"
                        value={repairPartsInventory.filter((p) => p.stock_quantity === 0).length}
                        icon={Circle}
                        gradient="from-rose-500 to-pink-500"
                      />
                    </div>

                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search by name, SKU, or brand"
                          value={repairPartsSearch}
                          onChange={(e) => setRepairPartsSearch(e.target.value)}
                          className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-slate-600" />
                        <select
                          value={repairPartsTypeFilter}
                          onChange={(e) => setRepairPartsTypeFilter(e.target.value)}
                          className="h-10 rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                        >
                          <option value="all">All Types</option>
                          <option value="screen">Screens</option>
                          <option value="battery">Batteries</option>
                          <option value="tool">Tools</option>
                          <option value="cable">Cables</option>
                          <option value="other">Other</option>
                        </select>
                        <Button
                          onClick={() => setShowAddRepairPartModal(true)}
                          className="bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Part
                        </Button>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-[#1F2235] bg-[#11131E] shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-[#1F2235] bg-[#11131E]">
                              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                                Part
                              </th>
                              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                                Type
                              </th>
                              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                                SKU
                              </th>
                              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                                Stock
                              </th>
                              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                                Unit Cost
                              </th>
                              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                                Location
                              </th>
                              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {repairPartsInventory
                              .filter((part) => {
                                const matchesSearch = 
                                  part.name.toLowerCase().includes(repairPartsSearch.toLowerCase()) ||
                                  (part.sku && part.sku.toLowerCase().includes(repairPartsSearch.toLowerCase())) ||
                                  (part.brand && part.brand.toLowerCase().includes(repairPartsSearch.toLowerCase()));
                                const matchesType = repairPartsTypeFilter === "all" || part.part_type === repairPartsTypeFilter;
                                return matchesSearch && matchesType;
                              })
                              .map((part) => (
                                <tr key={part.id} className="border-b border-[#1F2235] hover:bg-[#1A1D27] transition-colors">
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="font-medium text-white">{part.name}</div>
                                      <div className="text-xs text-slate-400">{part.brand} {part.model}</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 capitalize">
                                      {part.part_type}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-slate-300">{part.sku || "-"}</td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                      <span className={`font-medium ${part.stock_quantity <= part.min_stock_level ? "text-amber-500" : "text-white"}`}>
                                        {part.stock_quantity}
                                      </span>
                                      {part.stock_quantity <= part.min_stock_level && (
                                        <AlertCircle className="h-4 w-4 text-amber-500" />
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-slate-300">£{part.unit_cost ? parseFloat(part.unit_cost).toFixed(2) : "0.00"}</td>
                                  <td className="px-6 py-4 text-slate-300">{part.location || "-"}</td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                          setEditingRepairPart(part);
                                          setShowEditRepairPartModal(true);
                                        }}
                                        className="text-slate-400 hover:text-white"
                                      >
                                        <Wrench className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDeleteRepairPart(part.id)}
                                        className="text-slate-400 hover:text-red-500"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      {repairPartsInventory.length === 0 && (
                        <div className="px-6 py-12 text-center text-slate-500">
                          <Wrench className="mx-auto h-12 w-12 mb-4 opacity-50" />
                          <p>No repair parts found</p>
                        </div>
                      )}
                    </div>

                    {/* Add Repair Part Modal */}
                    <AnimatePresence>
                      {showAddRepairPartModal && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                          onClick={() => setShowAddRepairPartModal(false)}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <h3 className="text-lg font-semibold text-white mb-4">Add Repair Part</h3>
                            <div className="space-y-4">
                              <div>
                                <Label className="text-slate-300">Name</Label>
                                <Input
                                  value={newRepairPart.name}
                                  onChange={(e) => setNewRepairPart({ ...newRepairPart, name: e.target.value })}
                                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                                  required
                                />
                              </div>
                              <div>
                                <Label className="text-slate-300">Part Type</Label>
                                <select
                                  value={newRepairPart.part_type}
                                  onChange={(e) => setNewRepairPart({ ...newRepairPart, part_type: e.target.value })}
                                  className="w-full rounded-xl border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-white"
                                >
                                  <option value="screen">Screen</option>
                                  <option value="battery">Battery</option>
                                  <option value="tool">Tool</option>
                                  <option value="cable">Cable</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-slate-300">Brand</Label>
                                  <Input
                                    value={newRepairPart.brand}
                                    onChange={(e) => setNewRepairPart({ ...newRepairPart, brand: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                  />
                                </div>
                                <div>
                                  <Label className="text-slate-300">Model</Label>
                                  <Input
                                    value={newRepairPart.model}
                                    onChange={(e) => setNewRepairPart({ ...newRepairPart, model: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="text-slate-300">SKU</Label>
                                <Input
                                  value={newRepairPart.sku}
                                  onChange={(e) => setNewRepairPart({ ...newRepairPart, sku: e.target.value })}
                                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                                />
                              </div>
                              <div>
                                <Label className="text-slate-300">Supplier</Label>
                                <Input
                                  value={newRepairPart.supplier}
                                  onChange={(e) => setNewRepairPart({ ...newRepairPart, supplier: e.target.value })}
                                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-slate-300">Unit Cost (£)</Label>
                                  <Input
                                    type="number"
                                    value={newRepairPart.unit_cost}
                                    onChange={(e) => setNewRepairPart({ ...newRepairPart, unit_cost: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                    required
                                    min="0"
                                    step="0.01"
                                  />
                                </div>
                                <div>
                                  <Label className="text-slate-300">Stock Quantity</Label>
                                  <Input
                                    type="number"
                                    value={newRepairPart.stock_quantity}
                                    onChange={(e) => setNewRepairPart({ ...newRepairPart, stock_quantity: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                    required
                                    min="0"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-slate-300">Min Stock Level</Label>
                                  <Input
                                    type="number"
                                    value={newRepairPart.min_stock_level}
                                    onChange={(e) => setNewRepairPart({ ...newRepairPart, min_stock_level: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                    required
                                    min="0"
                                  />
                                </div>
                                <div>
                                  <Label className="text-slate-300">Location</Label>
                                  <Input
                                    value={newRepairPart.location}
                                    onChange={(e) => setNewRepairPart({ ...newRepairPart, location: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="text-slate-300">Notes</Label>
                                <Input
                                  value={newRepairPart.notes}
                                  onChange={(e) => setNewRepairPart({ ...newRepairPart, notes: e.target.value })}
                                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                                />
                              </div>
                              <div className="flex gap-3 pt-4">
                                <Button
                                  onClick={() => setShowAddRepairPartModal(false)}
                                  variant="outline"
                                  className="flex-1 border-[#1F2235] text-white hover:bg-slate-800"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleCreateRepairPart}
                                  className="flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                                >
                                  Add Part
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Edit Repair Part Modal */}
                    <AnimatePresence>
                      {showEditRepairPartModal && editingRepairPart && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                          onClick={() => setShowEditRepairPartModal(false)}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <h3 className="text-lg font-semibold text-white mb-4">Edit Repair Part</h3>
                            <div className="space-y-4">
                              <div>
                                <Label className="text-slate-300">Name</Label>
                                <Input
                                  value={editingRepairPart.name}
                                  onChange={(e) => setEditingRepairPart({ ...editingRepairPart, name: e.target.value })}
                                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                                  required
                                />
                              </div>
                              <div>
                                <Label className="text-slate-300">Part Type</Label>
                                <select
                                  value={editingRepairPart.part_type}
                                  onChange={(e) => setEditingRepairPart({ ...editingRepairPart, part_type: e.target.value })}
                                  className="w-full rounded-xl border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-white"
                                >
                                  <option value="screen">Screen</option>
                                  <option value="battery">Battery</option>
                                  <option value="tool">Tool</option>
                                  <option value="cable">Cable</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-slate-300">Brand</Label>
                                  <Input
                                    value={editingRepairPart.brand}
                                    onChange={(e) => setEditingRepairPart({ ...editingRepairPart, brand: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                  />
                                </div>
                                <div>
                                  <Label className="text-slate-300">Model</Label>
                                  <Input
                                    value={editingRepairPart.model}
                                    onChange={(e) => setEditingRepairPart({ ...editingRepairPart, model: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="text-slate-300">SKU</Label>
                                <Input
                                  value={editingRepairPart.sku}
                                  onChange={(e) => setEditingRepairPart({ ...editingRepairPart, sku: e.target.value })}
                                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                                />
                              </div>
                              <div>
                                <Label className="text-slate-300">Supplier</Label>
                                <Input
                                  value={editingRepairPart.supplier}
                                  onChange={(e) => setEditingRepairPart({ ...editingRepairPart, supplier: e.target.value })}
                                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-slate-300">Unit Cost (£)</Label>
                                  <Input
                                    type="number"
                                    value={editingRepairPart.unit_cost}
                                    onChange={(e) => setEditingRepairPart({ ...editingRepairPart, unit_cost: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                    required
                                    min="0"
                                    step="0.01"
                                  />
                                </div>
                                <div>
                                  <Label className="text-slate-300">Stock Quantity</Label>
                                  <Input
                                    type="number"
                                    value={editingRepairPart.stock_quantity}
                                    onChange={(e) => setEditingRepairPart({ ...editingRepairPart, stock_quantity: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                    required
                                    min="0"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-slate-300">Min Stock Level</Label>
                                  <Input
                                    type="number"
                                    value={editingRepairPart.min_stock_level}
                                    onChange={(e) => setEditingRepairPart({ ...editingRepairPart, min_stock_level: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                    required
                                    min="0"
                                  />
                                </div>
                                <div>
                                  <Label className="text-slate-300">Location</Label>
                                  <Input
                                    value={editingRepairPart.location}
                                    onChange={(e) => setEditingRepairPart({ ...editingRepairPart, location: e.target.value })}
                                    className="border-[#1F2235] bg-[#1A1D27] text-white"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="text-slate-300">Notes</Label>
                                <Input
                                  value={editingRepairPart.notes}
                                  onChange={(e) => setEditingRepairPart({ ...editingRepairPart, notes: e.target.value })}
                                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                                />
                              </div>
                              <div className="flex gap-3 pt-4">
                                <Button
                                  onClick={() => setShowEditRepairPartModal(false)}
                                  variant="outline"
                                  className="flex-1 border-[#1F2235] text-white hover:bg-slate-800"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleUpdateRepairPart}
                                  className="flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                                >
                                  Update
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
              </>
            )}

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
                                required
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Brand</Label>
                              <Input
                                value={editingProduct.brand || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                                className="mt-1"
                                required
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Model</Label>
                              <Input
                                value={editingProduct.model || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, model: e.target.value })}
                                className="mt-1"
                                required
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Price (£)</Label>
                              <Input
                                type="number"
                                value={editingProduct.price || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                                className="mt-1"
                                required
                                min="0"
                                step="0.01"
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Stock Quantity</Label>
                              <Input
                                type="number"
                                value={editingProduct.stock_quantity || ""}
                                onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: parseInt(e.target.value) || 0 })}
                                className="mt-1"
                                required
                                min="0"
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

                    title="Staff"

                    value={staff.filter((s) => s.role === "staff").length}

                    icon={ShieldCheck}

                    gradient="from-violet-500 to-purple-500"

                  />

                  <StatCard

                    title="Super Admin"

                    value={staff.filter((s) => s.role === "SUPER_ADMIN").length}

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

                      <option value="SUPER_ADMIN">Super Admin</option>

                      <option value="staff">Staff</option>

                      <option value="customer">Customer</option>

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

                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${staffMember.role === "SUPER_ADMIN" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" : staffMember.role === "staff" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-slate-100 text-slate-700 bg-[#1A1D27] dark:text-slate-300"}`}>

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
                                required
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Email</Label>
                              <Input
                                type="email"
                                value={editingStaff.email || ""}
                                onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                                className="mt-1"
                                required
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-slate-300">Role</Label>
                              <select
                                value={editingStaff.role || ""}
                                onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                                className="mt-1 w-full rounded-xl border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
                              >
                                <option value="SUPER_ADMIN">Super Admin</option>
                                <option value="staff">Staff</option>
                                <option value="customer">Customer</option>
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

                {/* Email Modal */}
                <AnimatePresence>
                  {showEmailModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                      onClick={() => setShowEmailModal(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">Send Email</h3>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-slate-300">Recipient Email</Label>
                            <Input
                              type="email"
                              placeholder="customer@example.com"
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Subject</Label>
                            <Input
                              placeholder="Email subject"
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Message</Label>
                            <textarea
                              placeholder="Your message..."
                              className="w-full h-32 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            />
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={() => setShowEmailModal(false)}
                              variant="outline"
                              className="flex-1 border-[#1F2235] text-white hover:bg-slate-800"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => { setShowEmailModal(false); setEmailsSent(prev => prev + 1); safeToast.success("Email sent successfully"); }}
                              className="flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                            >
                              Send Email
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SMS Modal */}
                <AnimatePresence>
                  {showSmsModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                      onClick={() => setShowSmsModal(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">Send SMS</h3>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-slate-300">Phone Number</Label>
                            <Input
                              type="tel"
                              placeholder="+44 7415 278767"
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Message</Label>
                            <textarea
                              placeholder="Your SMS message..."
                              className="w-full h-32 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            />
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={() => setShowSmsModal(false)}
                              variant="outline"
                              className="flex-1 border-[#1F2235] text-white hover:bg-slate-800"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => { setShowSmsModal(false); setSmsSent(prev => prev + 1); safeToast.success("SMS sent successfully"); }}
                              className="flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                            >
                              Send SMS
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Broadcast Modal */}
                <AnimatePresence>
                  {showBroadcastModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                      onClick={() => setShowBroadcastModal(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">Broadcast Message</h3>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-slate-300">Recipient Group</Label>
                            <select
                              className="w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            >
                              <option value="all_customers">All Customers</option>
                              <option value="active_repairs">Customers with Active Repairs</option>
                              <option value="recent_purchases">Recent Purchases</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-slate-300">Channel</Label>
                            <select
                              className="w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            >
                              <option value="email">Email</option>
                              <option value="sms">SMS</option>
                              <option value="both">Both Email & SMS</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-slate-300">Message</Label>
                            <textarea
                              placeholder="Your broadcast message..."
                              className="w-full h-32 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            />
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={() => setShowBroadcastModal(false)}
                              variant="outline"
                              className="flex-1 border-[#1F2235] text-white hover:bg-slate-800"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => { setShowBroadcastModal(false); safeToast.success("Broadcast sent successfully"); }}
                              className="flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                            >
                              Send Broadcast
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by name or contact"

                      value={supplierSearch}

                      onChange={(e) => setSupplierSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                  <Button
                    onClick={() => setShowAddSupplierModal(true)}
                    className="bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Supplier
                  </Button>

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

                {/* Add Supplier Modal */}
                <AnimatePresence>
                  {showAddSupplierModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                      onClick={() => setShowAddSupplierModal(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">Add New Supplier</h3>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-slate-300">Supplier Name *</Label>
                            <Input
                              value={newSupplier.name}
                              onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Contact Person *</Label>
                            <Input
                              value={newSupplier.contact}
                              onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Email</Label>
                            <Input
                              type="email"
                              value={newSupplier.email}
                              onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Phone</Label>
                            <Input
                              value={newSupplier.phone}
                              onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Address</Label>
                            <Input
                              value={newSupplier.address}
                              onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Notes</Label>
                            <Input
                              value={newSupplier.notes}
                              onChange={(e) => setNewSupplier({ ...newSupplier, notes: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                              placeholder="Optional notes..."
                            />
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={() => setShowAddSupplierModal(false)}
                              variant="outline"
                              className="flex-1 border-[#1F2235] text-white hover:bg-slate-800"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleCreateSupplier}
                              className="flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                            >
                              Add Supplier
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by supplier or reference"

                      value={stockPurchaseSearch}

                      onChange={(e) => setStockPurchaseSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                  <Button
                    onClick={() => setShowAddPurchaseModal(true)}
                    className="bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Purchase Order
                  </Button>

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

                {/* Add Purchase Order Modal */}
                <AnimatePresence>
                  {showAddPurchaseModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                      onClick={() => setShowAddPurchaseModal(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">Create Purchase Order</h3>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-slate-300">Supplier</Label>
                            <select
                              value={newPurchaseOrder.supplier_id}
                              onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, supplier_id: e.target.value })}
                              className="w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            >
                              <option value="">Select supplier...</option>
                              {suppliers.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <Label className="text-slate-300">Reference</Label>
                            <Input
                              value={newPurchaseOrder.reference}
                              onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, reference: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                              placeholder="PO-001 or leave blank for auto"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-slate-300">Total Amount (£)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={newPurchaseOrder.total_amount}
                                onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, total_amount: e.target.value })}
                                className="border-[#1F2235] bg-[#1A1D27] text-white"
                                required
                              />
                            </div>
                            <div>
                              <Label className="text-slate-300">Date</Label>
                              <Input
                                type="date"
                                value={newPurchaseOrder.date}
                                onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, date: e.target.value })}
                                className="border-[#1F2235] bg-[#1A1D27] text-white"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-slate-300">Status</Label>
                            <select
                              value={newPurchaseOrder.status}
                              onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, status: e.target.value })}
                              className="w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="in_transit">In Transit</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-slate-300">Notes</Label>
                            <Input
                              value={newPurchaseOrder.notes}
                              onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, notes: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                              placeholder="Optional notes..."
                            />
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={() => setShowAddPurchaseModal(false)}
                              variant="outline"
                              className="flex-1 border-[#1F2235] text-white hover:bg-slate-800"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleCreatePurchaseOrder}
                              className="flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                            >
                              Create Order
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

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

                    value={`£${payments.filter(p => new Date(p.created_at).toDateString() === new Date().toDateString()).reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`}

                    icon={Calendar}

                    gradient="from-blue-500 to-cyan-500"

                  />

                  <StatCard

                    title="This Week"

                    value={`£${payments.filter(p => {
                      const now = new Date();
                      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                      return new Date(p.created_at) >= weekAgo;
                    }).reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`}

                    icon={TrendingUp}

                    gradient="from-violet-500 to-purple-500"

                  />

                  <StatCard

                    title="This Month"

                    value={`£${payments.filter(p => new Date(p.created_at).getMonth() === new Date().getMonth()).reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(0)}`}

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
                          const matchSearch = p.invoice_number?.toLowerCase().includes(paymentSearch.toLowerCase()) ||
                            p.customer_name?.toLowerCase().includes(paymentSearch.toLowerCase());
                          return matchSearch;
                        }).map((payment, idx) => (

                          <motion.tr

                            key={payment.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{payment.invoice_number || payment.description || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{payment.customer_name || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-emerald-400">£{(payment.amount || 0).toFixed(2)}</td>

                            <td className="px-4 py-3 text-slate-400">{payment.payment_method || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{new Date(payment.created_at).toLocaleDateString()}</td>

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

                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-transparent">

                            Actions

                          </th>

                        </tr>

                      </thead>

                      <tbody>
                        {invoices.filter(i => {
                          const matchSearch = i.invoice_number?.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                            i.customer_name?.toLowerCase().includes(invoiceSearch.toLowerCase());
                          return matchSearch;
                        }).map((invoice, idx) => (

                          <motion.tr

                            key={invoice.id}

                            initial={{ opacity: 0, y: 8 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.03 }}

                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"

                          >

                            <td className="px-4 py-3 font-medium text-white">{invoice.invoice_number || "N/A"}</td>

                            <td className="px-4 py-3 text-slate-400">{invoice.customer_name || "N/A"}</td>

                            <td className="px-4 py-3 font-semibold text-emerald-400">£{(invoice.amount || 0).toFixed(2)}</td>

                            <td className="px-4 py-3 text-slate-400">{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "N/A"}</td>

                            <td className="px-4 py-3">

                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${invoice.status === "paid" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : invoice.status === "overdue" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>

                                {invoice.status || "outstanding"}

                              </span>

                            </td>

                            <td className="px-4 py-3">

                              <div className="flex gap-2">

                                <button

                                  onClick={() => safeToast.success(`Invoice ${invoice.invoice_number} marked as paid`)}

                                  className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 p-2 rounded-lg transition-colors"

                                  title="Mark as paid"

                                >

                                  <CheckCircle2 className="h-4 w-4" />

                                </button>

                                <button

                                  onClick={() => safeToast.success(`Invoice ${invoice.invoice_number} sent to customer`)}

                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 p-2 rounded-lg transition-colors"

                                  title="Send invoice"

                                >

                                  <Send className="h-4 w-4" />

                                </button>

                                <button

                                  onClick={() => safeToast.success(`Invoice ${invoice.invoice_number} downloaded`)}

                                  className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 p-2 rounded-lg transition-colors"

                                  title="Download PDF"

                                >

                                  <FileText className="h-4 w-4" />

                                </button>

                              </div>

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
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">

                  <div className="relative flex-1">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <Input

                      placeholder="Search by customer or reference"

                      value={inhouseSaleSearch}

                      onChange={(e) => setInhouseSaleSearch(e.target.value)}

                      className="h-10 border border-[#1F2235] bg-[#11131E] pl-10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 rounded-xl"

                    />

                  </div>

                  <Button
                    onClick={() => setShowAddInhouseSaleModal(true)}
                    className="bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sale
                  </Button>

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

                {/* Add In-House Sale Modal */}
                <AnimatePresence>
                  {showAddInhouseSaleModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                      onClick={() => setShowAddInhouseSaleModal(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#11131E] border border-[#1F2235] rounded-xl p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">Record In-House Sale</h3>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-slate-300">Reference</Label>
                            <Input
                              value={newInhouseSale.reference}
                              onChange={(e) => setNewInhouseSale({ ...newInhouseSale, reference: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                              placeholder="SALE-001 or leave blank for auto"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Customer Name *</Label>
                            <Input
                              value={newInhouseSale.customer_name}
                              onChange={(e) => setNewInhouseSale({ ...newInhouseSale, customer_name: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Customer Phone</Label>
                            <Input
                              value={newInhouseSale.customer_phone}
                              onChange={(e) => setNewInhouseSale({ ...newInhouseSale, customer_phone: e.target.value })}
                              className="border-[#1F2235] bg-[#1A1D27] text-white"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-slate-300">Amount (£) *</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={newInhouseSale.amount}
                                onChange={(e) => setNewInhouseSale({ ...newInhouseSale, amount: e.target.value })}
                                className="border-[#1F2235] bg-[#1A1D27] text-white"
                                required
                              />
                            </div>
                            <div>
                              <Label className="text-slate-300">Items Count</Label>
                              <Input
                                type="number"
                                value={newInhouseSale.item_count}
                                onChange={(e) => setNewInhouseSale({ ...newInhouseSale, item_count: e.target.value })}
                                className="border-[#1F2235] bg-[#1A1D27] text-white"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-slate-300">Payment Method</Label>
                            <select
                              value={newInhouseSale.payment_method}
                              onChange={(e) => setNewInhouseSale({ ...newInhouseSale, payment_method: e.target.value })}
                              className="w-full h-10 rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            >
                              <option value="cash">Cash</option>
                              <option value="card">Card</option>
                              <option value="bank_transfer">Bank Transfer</option>
                            </select>
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={() => setShowAddInhouseSaleModal(false)}
                              variant="outline"
                              className="flex-1 border-[#1F2235] text-white hover:bg-slate-800"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleCreateInhouseSale}
                              className="flex-1 bg-[#6B46C1] hover:bg-[#5B3A9E] text-white"
                            >
                              Record Sale
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
                    value={repairs.length}
                    icon={Wrench}
                    gradient="from-blue-500 to-cyan-500"
                  />
                  <StatCard
                    title="In Progress"
                    value={repairs.filter(r => r?.status !== "collection" && r?.status !== "completed").length}
                    icon={Activity}
                    gradient="from-amber-500 to-orange-500"
                  />
                  <StatCard
                    title="Completed"
                    value={repairs.filter(r => r?.status === "completed").length}
                    icon={CheckCircle2}
                    gradient="from-emerald-500 to-green-500"
                  />
                  <StatCard
                    title="Pending"
                    value={repairs.filter(r => r?.status === "pending").length}
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
                        {repairs.filter(r => {
                          const matchSearch = r?.tracking_id?.toLowerCase().includes(repairTrackingSearch.toLowerCase()) ||
                            r?.customer_name?.toLowerCase().includes(repairTrackingSearch.toLowerCase());
                          return matchSearch;
                        }).map((repair, idx) => {
                          const progress = repair?.progress_percentage || 0;
                          return (
                          <motion.tr
                            key={repair?.id || idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="border-b border-[#1F2235] bg-[#11131E] hover:bg-[#1A1D27] transition-colors"
                          >
                            <td className="px-4 py-3 font-medium text-white">{repair?.tracking_id || "N/A"}</td>
                            <td className="px-4 py-3 text-slate-400">{repair?.customer_name || "N/A"}</td>
                            <td className="px-4 py-3 text-slate-400">{repair?.device_model || "N/A"}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${repair?.status === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : repair?.status === "in_progress" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>
                                {repair?.status || "pending"}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-[#1F2235] rounded-full overflow-hidden">
                                  <div className="h-full bg-[#6B46C1]" style={{ width: `${progress}%` }}></div>
                                </div>
                                <span className="text-xs text-slate-400">{progress}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-400">{new Date(repair?.created_at).toLocaleDateString()}</td>
                          </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {repairs.length === 0 && (
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
                  <Button onClick={() => safeToast.success("Settings saved successfully")} className="bg-violet-600 hover:bg-violet-700">
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

















