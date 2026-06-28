import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, FileText, X, ChevronRight, CheckCircle2, AlertCircle, Wrench, Package } from "lucide-react";
import { buildUrl, getStoredToken } from "@/lib/api";
import { toast } from "sonner";

interface RepairTimelineProps {
  repairId: string;
  trackingId: string;
  onClose: () => void;
}

interface TimelineEvent {
  id: string;
  type: string;
  title: string;
  description: string;
  user_id?: string;
  created_at: string;
}

interface RepairDetail {
  id: string;
  tracking_id: string;
  customer_name: string;
  customer_phone: string;
  device_model: string;
  status: string;
  priority: string;
  technician_id?: string;
  technician_name?: string;
  status_notes: string;
  estimated_cost: number;
  created_at: string;
  updated_at: string;
}

export default function RepairTimeline({ repairId, trackingId, onClose }: RepairTimelineProps) {
  const [repair, setRepair] = useState<RepairDetail | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
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
        const repairDetail = data.repairs.find((r: any) => r.id === repairId);
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
      // If endpoint doesn't exist, create mock timeline from repair status
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ note: newNote }),
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-slate-500" />;
      case "received":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "diagnosed":
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
      case "repairing":
        return <Wrench className="h-5 w-5 text-orange-500" />;
      case "testing":
        return <CheckCircle2 className="h-5 w-5 text-amber-500" />;
      case "collection":
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-slate-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      low: "bg-slate-100 text-slate-700 border-slate-300",
      normal: "bg-blue-100 text-blue-700 border-blue-300",
      high: "bg-orange-100 text-orange-700 border-orange-300",
      urgent: "bg-red-100 text-red-700 border-red-300",
    };
    return colors[priority as keyof typeof colors] || colors.normal;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#11131E] rounded-2xl p-8 text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading repair details...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#11131E] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1F2235]">
          <div>
            <h2 className="text-xl font-bold text-white">Repair Details</h2>
            <p className="text-sm text-slate-400 mt-1">Tracking ID: {trackingId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#1F2235] rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {repair && (
            <>
              {/* Repair Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    <User className="h-4 w-4" />
                    Customer
                  </div>
                  <p className="text-white font-medium">{repair.customer_name}</p>
                  <p className="text-slate-400 text-sm">{repair.customer_phone || "No phone"}</p>
                </div>

                <div className="bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    <FileText className="h-4 w-4" />
                    Device
                  </div>
                  <p className="text-white font-medium">{repair.device_model}</p>
                  <p className="text-slate-400 text-sm">Est. Cost: £{repair.estimated_cost}</p>
                </div>

                <div className="bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    Status & Priority
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(repair.status)}
                    <span className="text-white font-medium capitalize">{repair.status}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityBadge(repair.priority)}`}>
                      {repair.priority?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    <User className="h-4 w-4" />
                    Technician
                  </div>
                  <p className="text-white font-medium">
                    {repair.technician_name || "Unassigned"}
                  </p>
                </div>
              </div>

              {/* Status Notes */}
              {repair.status_notes && (
                <div className="bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235] mb-6">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    <FileText className="h-4 w-4" />
                    Status Notes
                  </div>
                  <p className="text-white">{repair.status_notes}</p>
                </div>
              )}

              {/* Timeline */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Repair Timeline</h3>
                <div className="space-y-4">
                  {timeline.length > 0 ? (
                    timeline.map((event, idx) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-violet-500 mt-1.5"></div>
                          {idx < timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-[#1F2235] mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 bg-[#0B0D17] rounded-lg p-4 border border-[#1F2235]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white capitalize">
                              {event.title || event.type.replace(/_/g, " ")}
                            </span>
                            <span className="text-xs text-slate-500">
                              {new Date(event.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-slate-300 text-sm">{event.description}</p>
                          {event.user_id && (
                            <p className="text-xs text-slate-500 mt-2">
                              User ID: {event.user_id}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm">No timeline events recorded</p>
                  )}
                </div>
              </div>

              {/* Add Note */}
              <div className="bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]">
                <h3 className="text-lg font-semibold text-white mb-4">Add Note</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter a note..."
                    className="flex-1 bg-[#11131E] border border-[#1F2235] rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                  <button
                    onClick={addNote}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
