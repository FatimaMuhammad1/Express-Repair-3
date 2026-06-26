import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Plus,
  Wrench,
  User,
  Package,
  ArrowRight,
  Clock,
  CheckCircle2,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildUrl, getAuthHeaders, getStoredToken } from "@/lib/api";
import { useBranch } from "./BranchSelector";

interface DashboardImprovementsProps {
  token: string;
}

export function DashboardImprovements({ token }: DashboardImprovementsProps) {
  const branchId = useBranch();
  const [activityFeed, setActivityFeed] = useState<any[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [lowStockAlerts, setLowStockAlerts] = useState<any[]>([]);
  const [technicianPerformance, setTechnicianPerformance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [branchId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [activityRes, bookingsRes, stockRes, perfRes] = await Promise.all([
        fetch(buildUrl(`/dashboard/activity?branch_id=${branchId === "all" ? "" : branchId}`), { headers: getAuthHeaders() }),
        fetch(buildUrl(`/dashboard/upcoming-bookings?branch_id=${branchId === "all" ? "" : branchId}`), { headers: getAuthHeaders() }),
        fetch(buildUrl(`/dashboard/low-stock?branch_id=${branchId === "all" ? "" : branchId}`), { headers: getAuthHeaders() }),
        fetch(buildUrl(`/dashboard/technician-performance?branch_id=${branchId === "all" ? "" : branchId}`), { headers: getAuthHeaders() }),
      ]);

      if (activityRes.ok) {
        const data = await activityRes.json();
        setActivityFeed(data.activities || []);
      }
      if (bookingsRes.ok) {
        const data = await bookingsRes.json();
        setUpcomingBookings(data.bookings || []);
      }
      if (stockRes.ok) {
        const data = await stockRes.json();
        setLowStockAlerts(data.alerts || []);
      }
      if (perfRes.ok) {
        const data = await perfRes.json();
        setTechnicianPerformance(data.performance || []);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { icon: Wrench, label: "New Repair", color: "bg-violet-500", href: "/admin" },
    { icon: User, label: "Add Customer", color: "bg-blue-500", href: "/admin" },
    { icon: Calendar, label: "New Booking", color: "bg-emerald-500", href: "/admin" },
    { icon: Package, label: "Add Product", color: "bg-amber-500", href: "/admin" },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, idx) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Button
              variant="outline"
              className="h-full flex-col gap-2 py-6 border-2 hover:border-slate-300 dark:hover:border-slate-600"
            >
              <div className={`rounded-full ${action.color} p-3`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activity Feed */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {activityFeed.slice(0, 5).map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className={`rounded-full p-2 ${
                  activity.type === "repair" ? "bg-violet-100" :
                  activity.type === "booking" ? "bg-emerald-100" :
                  activity.type === "customer" ? "bg-blue-100" :
                  "bg-slate-100"
                }`}>
                  {activity.type === "repair" && <Wrench className="h-3 w-3 text-violet-600" />}
                  {activity.type === "booking" && <Calendar className="h-3 w-3 text-emerald-600" />}
                  {activity.type === "customer" && <User className="h-3 w-3 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{activity.title}</p>
                  <p className="text-xs text-slate-500 truncate">{activity.description}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(activity.created_at).toLocaleDateString()} {new Date(activity.created_at).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                  </p>
                </div>
              </motion.div>
            ))}
            {activityFeed.length === 0 && (
              <p className="text-center text-sm text-slate-500 py-4">No recent activity</p>
            )}
          </div>
        </Card>

        {/* Upcoming Bookings */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Bookings
            </h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {upcomingBookings.slice(0, 5).map((booking, idx) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between rounded-lg border border-[#1F2235] p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-100 p-2">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{booking.customer_name}</p>
                    <p className="text-sm text-slate-600">{booking.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-slate-500">{booking.time}</p>
                </div>
              </motion.div>
            ))}
            {upcomingBookings.length === 0 && (
              <p className="text-center text-sm text-slate-500 py-4">No upcoming bookings</p>
            )}
          </div>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockAlerts.length > 0 && (
        <Card className="p-6 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
          <div className="mb-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">Low Stock Alerts</h3>
            <Badge className="bg-amber-500 text-white">{lowStockAlerts.length}</Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {lowStockAlerts.slice(0, 8).map((alert, idx) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between rounded-lg bg-[#11131E] p-3 border border-amber-200 dark:border-amber-800"
              >
                <div>
                  <p className="font-medium text-white">{alert.product_name}</p>
                  <p className="text-sm text-slate-600">{alert.stock_quantity} left</p>
                </div>
                <Button variant="outline" size="sm">
                  Reorder
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {/* Technician Performance */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Technician Performance
          </h3>
          <Button variant="ghost" size="sm">View Details</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technicianPerformance.map((tech, idx) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-lg border border-[#1F2235] bg-[#11131E]/80 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white font-semibold">
                    {tech.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-white">{tech.name}</p>
                    <p className="text-xs text-slate-500">{tech.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-semibold">{tech.rating?.toFixed(1) || "4.5"}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-slate-500">Repairs</p>
                  <p className="font-semibold text-white">{tech.completed_repairs || 0}</p>
                </div>
                <div>
                  <p className="text-slate-500">Avg Time</p>
                  <p className="font-semibold text-white">{tech.avg_time || "2.5d"}</p>
                </div>
                <div>
                  <p className="text-slate-500">Revenue</p>
                  <p className="font-semibold text-white">£{tech.revenue?.toFixed(0) || "0"}</p>
                </div>
                <div>
                  <p className="text-slate-500">Efficiency</p>
                  <p className="font-semibold text-emerald-600">{tech.efficiency || "92%"}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {technicianPerformance.length === 0 && (
            <p className="text-center text-sm text-slate-500 py-4 col-span-full">No technician data available</p>
          )}
        </div>
      </Card>

      {/* Revenue Chart Placeholder */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Revenue Overview
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Week</Button>
            <Button variant="outline" size="sm">Month</Button>
            <Button variant="outline" size="sm">Year</Button>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-[#1F2235] rounded-lg">
          <div className="text-center">
            <TrendingUp className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-2 text-sm text-slate-500">Revenue chart will be rendered here</p>
            <p className="text-xs text-slate-400">Connect to analytics API for data</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
