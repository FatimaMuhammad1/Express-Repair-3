import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, AlertTriangle, Package, Calendar, MessageSquare, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildUrl, getAuthHeaders, getStoredToken } from "@/lib/api";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "booking" | "low_stock" | "repair_completed" | "message" | "error";
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  link?: string;
}

interface NotificationCenterProps {
  token: string;
}

export function NotificationCenter({ token }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(buildUrl("/notifications"), {
        headers: getAuthHeaders(token),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotifications(data.notifications || []);
        setUnreadCount((data.notifications || []).filter((n: Notification) => !n.read).length);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch(buildUrl(`/notifications/${notificationId}/read`), {
        method: "PUT",
        headers: getAuthHeaders(token),
      });
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(buildUrl("/notifications/read-all"), {
        method: "PUT",
        headers: getAuthHeaders(token),
      });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await fetch(buildUrl(`/notifications/${notificationId}`), {
        method: "DELETE",
        headers: getAuthHeaders(token),
      });
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      const deleted = notifications.find(n => n.id === notificationId);
      if (deleted && !deleted.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  const clearAllNotifications = async () => {
    try {
      await fetch(buildUrl("/notifications/clear"), {
        method: "DELETE",
        headers: getAuthHeaders(token),
      });
      setNotifications([]);
      setUnreadCount(0);
      toast.success("All notifications cleared");
    } catch (error) {
      toast.error("Failed to clear notifications");
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "low_stock":
        return <Package className="h-5 w-5 text-amber-500" />;
      case "repair_completed":
        return <Check className="h-5 w-5 text-emerald-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-violet-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-rose-500" />;
      default:
        return <Bell className="h-5 w-5 text-slate-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
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

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-12 z-50 w-96 max-h-[600px] overflow-hidden rounded-lg border border-[#1F2235] bg-transparent shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-[#1F2235] p-4">
                <h3 className="font-semibold text-white">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all read
                    </Button>
                  )}
                  {notifications.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
                      Clear all
                    </Button>
                  )}
                </div>
              </div>

              <div className="overflow-y-auto max-h-[500px]">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-violet-600" />
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-slate-300" />
                    <p className="mt-2 text-sm text-slate-500">No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {notifications.map((notification, idx) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${!notification.read ? "bg-slate-50/50 bg-[#1A1D27]" : ""}`}
                      >
                        <div className="flex gap-3">
                          <div className={`flex-shrink-0 rounded-full p-2 ${getNotificationColor(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${!notification.read ? "text-white" : "text-slate-400"}`}>
                                  {notification.title}
                                </p>
                                <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                  {new Date(notification.created_at).toLocaleDateString()} {new Date(notification.created_at).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="h-8 w-8 p-0 text-rose-500 hover:text-rose-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <div className="border-t border-[#1F2235] p-3">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setIsOpen(false)}>
                    Close
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
