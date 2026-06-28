import { motion } from "framer-motion";
import {
  TrendingUp,
  ShoppingCart,
  Wrench,
  Package,
  DollarSign,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Bell,
  Search,
  Activity,
  User,
  History,
  FileText,
  RefreshCw,
  Calendar,
  MessageSquare
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useEffect, useState, useCallback } from "react";
import { buildUrl, getStoredToken } from "@/lib/api";
import { toast } from "sonner";

export default function MainDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [businessData, setBusinessData] = useState<any[]>([]);
  const [salesChannelData, setSalesChannelData] = useState<any[]>([]);
  const [repairStatusData, setRepairStatusData] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [topSellingItems, setTopSellingItems] = useState<any[]>([]);
  const [lowStockAlerts, setLowStockAlerts] = useState<any[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [branches, setBranches] = useState<any[]>([]);
  const [timePeriod, setTimePeriod] = useState<string>("all");
  const [stats, setStats] = useState({
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

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getStoredToken();
      
      // Fetch finance stats
      const financeStatsRes = await fetch(buildUrl("/finance/stats"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const financeStatsData = await financeStatsRes.json();
      
      // Fetch branches
      const branchesRes = await fetch(buildUrl("/branches"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const branchesData = await branchesRes.json();
      if (branchesData.success && branchesData.branches) {
        setBranches(branchesData.branches);
      }
      
      // Fetch repairs for status overview
      const repairsRes = await fetch(buildUrl("/repairs/stats"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const repairsData = await repairsRes.json();
      
      // Fetch products for low stock alerts
      const productsRes = await fetch(buildUrl("/products"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const productsData = await productsRes.json();
      
      // Fetch transactions for revenue data
      const transactionsRes = await fetch(buildUrl("/finance/transactions"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const transactionsData = await transactionsRes.json();
      
      // Fetch online sales
      const onlineSalesRes = await fetch(buildUrl("/finance/online-sales"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const onlineSalesData = await onlineSalesRes.json();
      
      // Fetch in-house sales
      const inhouseSalesRes = await fetch(buildUrl("/finance/inhouse-sales"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const inhouseSalesData = await inhouseSalesRes.json();
      
      // Fetch customers
      const customersRes = await fetch(buildUrl("/customers"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const customersData = await customersRes.json();
      
      // Fetch recent activities from communications
      const activitiesRes = await fetch(buildUrl("/communications/history"), {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      const activitiesData = await activitiesRes.json();
      
      // Update stats from finance data
      if (financeStatsData.success && financeStatsData.stats) {
        setStats(prev => ({
          ...prev,
          totalRevenue: financeStatsData.stats.totalRevenue || 0,
          totalProfit: financeStatsData.stats.netProfit || 0,
          totalExpenses: financeStatsData.stats.totalExpenses || 0,
        }));
      }
      
      // Process repair status data
      if (repairsData.success && repairsData.stats) {
        const statusCounts = repairsData.stats.status_breakdown || {};
        
        const statusColors = {
          'received': '#6366F1',
          'diagnosed': '#A855F7',
          'repairing': '#F59E0B',
          'testing': '#EC4899',
          'collection': '#22C55E',
          'completed': '#06B6D4'
        };
        
        setRepairStatusData(Object.entries(statusCounts).map(([name, value]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value,
          color: statusColors[name] || '#64748b'
        })));
        
        // Calculate repairs in progress (excluding collection and completed)
        const inProgressCount = Object.entries(statusCounts).reduce((sum, [status, count]) => {
          return (status !== 'collection' && status !== 'completed') ? sum + count : sum;
        }, 0);
        
        setStats(prev => ({
          ...prev,
          repairsInProgress: inProgressCount,
          completedRepairs: statusCounts.completed || 0
        }));
      }
      
      // Process low stock alerts using reorder_threshold
      if (productsData.success && productsData.products) {
        const lowStock = productsData.products
          .filter(p => p.stock_quantity <= (p.reorder_threshold || 5))
          .slice(0, 10)
          .map(p => ({
            id: p.id,
            name: p.name,
            stock: p.stock_quantity,
            reorder: p.reorder_threshold || 5
          }));
        
        setLowStockAlerts(lowStock);
        setStats(prev => ({ ...prev, lowStockCount: lowStock.length }));
      }
      
      // Process sales channel data
      if (onlineSalesData.success && inhouseSalesData.success) {
        const onlineTotal = onlineSalesData.onlineSales?.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0) || 0;
        const inhouseTotal = inhouseSalesData.inhouseSales?.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0) || 0;
        const repairTotal = transactionsData.transactions?.filter(t => t.type === 'payment').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0) || 0;
        
        const total = onlineTotal + inhouseTotal + repairTotal;
        
        setSalesChannelData([
          { name: 'Online Sales', value: onlineTotal, color: '#8B5CF6' },
          { name: 'In-House Sales', value: inhouseTotal, color: '#06B6D4' },
          { name: 'Repairs & Services', value: repairTotal, color: '#22C55E' },
        ]);
        
        setStats(prev => ({
          ...prev,
          totalRevenue: total,
          todaySales: onlineTotal + inhouseTotal
        }));
      }
      
      // Process customer count
      if (customersData.success && customersData.customers) {
        setStats(prev => ({ ...prev, totalCustomers: customersData.customers.length }));
      }
      
      // Process recent activities from communications
      if (activitiesData.success && activitiesData.communications) {
        const iconMap: Record<string, any> = {
          'email': DollarSign,
          'sms': MessageSquare,
          'broadcast': Bell,
        };
        
        const activities = activitiesData.communications.slice(0, 4).map((c: any, idx: number) => ({
          id: idx,
          title: c.type.charAt(0).toUpperCase() + c.type.slice(1),
          desc: c.subject || c.body?.substring(0, 30) + '...',
          time: new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          icon: iconMap[c.type] || Activity,
          bg: c.type === 'email' ? 'bg-emerald-500/20' : c.type === 'sms' ? 'bg-blue-500/20' : 'bg-amber-500/20',
          color: c.type === 'email' ? 'text-emerald-500' : c.type === 'sms' ? 'text-blue-500' : 'text-amber-500'
        }));
        
        setRecentActivities(activities);
      }
      
      // Process business data chart - aggregate transactions by month
      if (transactionsData.success && transactionsData.transactions) {
        const monthlyData: Record<string, { revenue: number; profit: number; expenses: number }> = {};
        
        transactionsData.transactions.forEach((t: any) => {
          if (t.type === 'payment' && t.status === 'completed') {
            const date = new Date(t.created_at);
            const monthKey = date.toLocaleString('default', { month: 'short' });
            
            if (!monthlyData[monthKey]) {
              monthlyData[monthKey] = { revenue: 0, profit: 0, expenses: 0 };
            }
            monthlyData[monthKey].revenue += parseFloat(t.amount || 0);
            monthlyData[monthKey].profit += parseFloat(t.amount || 0) * 0.7; // Assume 30% margin
          }
        });
        
        // Convert to array and sort by month
        const sortedMonths = Object.entries(monthlyData)
          .map(([name, data]) => ({ name, ...data }))
          .slice(-6); // Last 6 months
        
        setBusinessData(sortedMonths);
      }
      
      // Process inventory value
      if (productsData.success && productsData.products) {
        const inventoryValue = productsData.products.reduce((sum, p) => 
          sum + (parseFloat(p.price || 0) * (p.stock_quantity || 0)), 0
        );
        setStats(prev => ({ ...prev, totalInventoryValue: inventoryValue }));
        
        // Process top selling items (using price as proxy since transactions don't track product IDs)
        const topItems = productsData.products
          .sort((a, b) => parseFloat(b.price || 0) - parseFloat(a.price || 0))
          .slice(0, 4)
          .map((p, idx) => ({
            id: idx,
            name: p.name,
            sold: p.stock_quantity || 0, // Using stock as proxy for sales
            revenue: `£${(parseFloat(p.price || 0) * (p.stock_quantity || 0)).toFixed(2)}`,
            icon: '📱'
          }));
        
        setTopSellingItems(topItems);
      }
      
    } catch (e) {
      console.error("Failed to fetch dashboard data:", e);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
      setLastUpdated(new Date());
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Auto-refresh polling
  useEffect(() => {
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

  const handleViewAll = (section: string) => {
    // Dispatch custom event for navigation to admin panel
    window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: { section } }));
  };
  return (
    <div className="flex-1 p-6 text-slate-200">
      
      {/* Header with refresh button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Dashboard Overview</h2>
          {lastUpdated && (
            <p className="text-xs text-slate-500 mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
              {autoRefresh && ` (Auto-refresh: ${refreshInterval / 1000}s)`}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {branches.length > 0 && (
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="text-xs bg-[#1A1D27] border border-slate-800 text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500"
            >
              <option value="all">All Branches</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          )}
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="text-xs bg-[#1A1D27] border border-slate-800 text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button 
            onClick={toggleAutoRefresh}
            className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
              autoRefresh 
                ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800' 
                : 'bg-[#1A1D27] text-slate-400 border border-slate-800'
            }`}
          >
            <Activity className="h-3 w-3" />
            {autoRefresh ? 'Auto On' : 'Auto Off'}
          </button>
          <button 
            onClick={handleRefresh}
            className="text-xs text-slate-400 bg-[#1A1D27] border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#2D3142] transition-colors"
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-slate-400 text-xs mb-1">Total Revenue</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-white mb-1">£{stats.totalRevenue.toFixed(2)}</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> <span className="text-slate-500">All time</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-slate-400 text-xs mb-1">Today's Sales</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-white mb-1">£{stats.todaySales.toFixed(2)}</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> <span className="text-slate-500">Online + In-House</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <ShoppingCart className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-slate-400 text-xs mb-1">Repairs in Progress</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-white mb-1">{stats.repairsInProgress}</div>
              <div className="text-xs text-amber-500">
                Active repairs
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
              <Wrench className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-rose-500/50 transition-colors" onClick={() => handleViewAll('low_stock_alerts')}>
          <div className="text-slate-400 text-xs mb-1">Low Stock Items</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-white mb-1">{stats.lowStockCount}</div>
              <div className="text-xs text-rose-500">
                View and restock
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500">
              <Package className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-slate-400 text-xs mb-1">Total Inventory Value</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-white mb-1">£{stats.totalInventoryValue.toFixed(2)}</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> <span className="text-slate-500">Current value</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Business Overview */}
        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-sm text-white">Business Overview</h3>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="text-xs bg-[#12141D] border border-slate-800 text-slate-400 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          <div className="flex-1 min-h-[220px]">
            {isLoading || businessData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-slate-400">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={businessData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3142" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `£${val/1000}K`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1D27', borderColor: '#2D3142', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                    labelStyle={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}
                  />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3, fill: '#8B5CF6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="profit" name="Profit" stroke="#22C55E" strokeWidth={2} dot={{ r: 3, fill: '#22C55E', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={2} dot={{ r: 3, fill: '#EF4444', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="h-2 w-2 rounded-full bg-[#8B5CF6]"></div> Revenue
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="h-2 w-2 rounded-full bg-[#EF4444]"></div> Expenses
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="h-2 w-2 rounded-full bg-[#22C55E]"></div> Profit
            </div>
          </div>
        </div>

        {/* Sales Channel Breakdown */}
        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-3 flex flex-col">
          <h3 className="font-semibold text-sm text-white mb-6">Sales Channel Breakdown</h3>
          <div className="flex-1 relative flex items-center justify-center">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-slate-400">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-bold text-white">£{stats.totalRevenue.toFixed(0)}</span>
                  <span className="text-xs text-slate-400">Total</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={salesChannelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {salesChannelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
          <div className="mt-4 space-y-3">
            {salesChannelData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  {item.name}
                </div>
                <div className="text-slate-400">
                  £{item.value.toLocaleString()} <span className="text-slate-500 ml-1">({stats.totalRevenue > 0 ? ((item.value / stats.totalRevenue) * 100).toFixed(1) : 0}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-3 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-sm text-white">Recent Activities</h3>
            <button onClick={() => handleViewAll('activity')} className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              View All <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-slate-400">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            ) : recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mt-0.5 ${activity.bg} ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-200">{activity.title}</div>
                      <div className="text-[10px] text-slate-500">{activity.desc}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500">{activity.time}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                No recent activities
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Top Selling Items */}
        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-sm text-white">Top Selling Items</h3>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="text-xs bg-[#12141D] border border-slate-800 text-slate-400 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          <div className="w-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-40 text-slate-400">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            ) : topSellingItems.length > 0 ? (
              <>
                <div className="grid grid-cols-12 text-xs text-slate-500 mb-3 border-b border-slate-800 pb-2">
                  <div className="col-span-6">Item</div>
                  <div className="col-span-3 text-right">Sold</div>
                  <div className="col-span-3 text-right">Revenue</div>
                </div>
                <div className="flex flex-col gap-4">
                  {topSellingItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 items-center text-xs">
                      <div className="col-span-6 flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-[#2D3142] flex items-center justify-center text-xs">
                          {item.icon}
                        </div>
                        <span className="text-slate-300 font-medium truncate pr-2">{item.name}</span>
                      </div>
                      <div className="col-span-3 text-right text-slate-400">{item.sold}</div>
                      <div className="col-span-3 text-right text-slate-300">{item.revenue}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                No sales data available
              </div>
            )}
          </div>
        </div>

        {/* Repair Status Overview */}
        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-4 flex flex-col">
          <h3 className="font-semibold text-sm text-white mb-6">Repair Status Overview</h3>
          <div className="flex-1 flex items-center justify-between gap-4">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full text-slate-400">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <>
                <div className="relative flex items-center justify-center w-36 h-36">
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-sm text-slate-400">Total</span>
                    <span className="text-xl font-bold text-white">{repairStatusData.reduce((sum, item) => sum + item.value, 0)}</span>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={repairStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {repairStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                  {repairStatusData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        {item.name}
                      </div>
                      <div className="text-slate-400">
                        {item.value} <span className="text-slate-500 ml-1">({repairStatusData.reduce((sum, i) => sum + i.value, 0) > 0 ? ((item.value / repairStatusData.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(1) : 0}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-5 lg:col-span-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-sm text-white">Low Stock Alerts</h3>
            <button onClick={() => handleViewAll('low_stock_alerts')} className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              View All <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
            </button>
          </div>
          <div className="w-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-40 text-slate-400">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            ) : lowStockAlerts.length > 0 ? (
              <>
                <div className="grid grid-cols-12 text-xs text-slate-500 mb-3 border-b border-slate-800 pb-2">
                  <div className="col-span-6">Item</div>
                  <div className="col-span-3 text-right">Current Stock</div>
                  <div className="col-span-3 text-right">Reorder Level</div>
                </div>
                <div className="flex flex-col gap-4">
                  {lowStockAlerts.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 items-center text-xs">
                      <div className="col-span-6 text-slate-300 font-medium truncate pr-2">{item.name}</div>
                      <div className="col-span-3 text-right font-medium text-rose-500">{item.stock}</div>
                      <div className="col-span-3 text-right text-amber-500">{item.reorder}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                All items in stock
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Footer Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        
        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-violet-500/50 transition-colors" onClick={() => handleViewAll('customers')}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded bg-violet-500/20 text-violet-400 flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Total Customers</div>
              <div className="text-lg font-bold text-white">{stats.totalCustomers}</div>
            </div>
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="h-2 w-2" /> <span className="text-slate-500">Registered users</span>
          </div>
        </div>

        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-blue-500/50 transition-colors" onClick={() => handleViewAll('online_sales')}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ShoppingCart className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Total Sales Orders</div>
              <div className="text-lg font-bold text-white">{stats.totalSalesOrders}</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-500">
            Online + In-House
          </div>
        </div>

        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-amber-500/50 transition-colors" onClick={() => handleViewAll('stock_purchases')}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Total Purchases</div>
              <div className="text-lg font-bold text-white">{stats.totalPurchases}</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-500">
            Stock orders
          </div>
        </div>

        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-emerald-500/50 transition-colors" onClick={() => handleViewAll('inventory_management')}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Total Inventory Value</div>
              <div className="text-lg font-bold text-white">£{stats.totalInventoryValue.toFixed(0)}</div>
            </div>
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="h-2 w-2" /> <span className="text-slate-500">Current value</span>
          </div>
        </div>

        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-rose-500/50 transition-colors" onClick={() => handleViewAll('invoices')}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Outstanding Receivables</div>
              <div className="text-lg font-bold text-white">£{stats.outstandingReceivables.toFixed(0)}</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-500">
            Pending payments
          </div>
        </div>

        <div className="bg-[#1A1D27] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-purple-500/50 transition-colors" onClick={() => handleViewAll('expenses')}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Outstanding Payables</div>
              <div className="text-lg font-bold text-white">${stats.outstandingPayables.toFixed(0)}</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-500">
            Pending bills
          </div>
        </div>

      </div>

    </div>
  );
}
