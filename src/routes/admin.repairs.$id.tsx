import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Wrench,
  User,
  Phone,
  Calendar,
  Clock,
  FileText,
  Camera,
  DollarSign,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Shield,
  History,
  Package,
  CreditCard,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InvoiceGenerator, WarrantyManager } from "@/components/admin";
import { buildUrl, getAuthHeaders, getStoredToken } from "@/lib/api";
import { toast } from "sonner";

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

function RepairDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const token = getStoredToken();
  
  const [repair, setRepair] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [technicianNote, setTechnicianNote] = useState("");
  const [internalComment, setInternalComment] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);

  useEffect(() => {
    fetchRepairDetails();
    fetchTimeline();
  }, [id]);

  const fetchRepairDetails = async () => {
    try {
      const res = await fetch(buildUrl(`/repairs/${id}`), {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRepair(data.repair);
      }
    } catch (error) {
      console.error("Failed to fetch repair details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimeline = async () => {
    try {
      const res = await fetch(buildUrl(`/repairs/${id}/timeline`), {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTimeline(data.timeline || []);
      }
    } catch (error) {
      console.error("Failed to fetch timeline:", error);
    }
  };

  const handleAddTechnicianNote = async () => {
    if (!technicianNote.trim()) return;
    try {
      const res = await fetch(buildUrl(`/repairs/${id}/notes`), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note: technicianNote, type: "technician" }),
      });
      if (res.ok) {
        toast.success("Technician note added");
        setTechnicianNote("");
        setShowAddNote(false);
        fetchTimeline();
      }
    } catch (error) {
      toast.error("Failed to add note");
    }
  };

  const handleAddInternalComment = async () => {
    if (!internalComment.trim()) return;
    try {
      const res = await fetch(buildUrl(`/repairs/${id}/comments`), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: internalComment }),
      });
      if (res.ok) {
        toast.success("Internal comment added");
        setInternalComment("");
        setShowAddComment(false);
        fetchTimeline();
      }
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Clock className="mx-auto h-8 w-8 animate-spin text-violet-500" />
          <p className="mt-2 text-slate-600">Loading repair details...</p>
        </div>
      </div>
    );
  }

  if (!repair) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-rose-500" />
          <p className="mt-2 text-slate-600">Repair not found</p>
          <Link to="/admin">
            <Button className="mt-4">Back to Admin</Button>
          </Link>
        </div>
      </div>
    );
  }

  const costBreakdown = repair.cost_breakdown || {
    labor: 0,
    parts: 0,
    diagnostic: 0,
    tax: 0,
  };
  const totalCost = costBreakdown.labor + costBreakdown.parts + costBreakdown.diagnostic + costBreakdown.tax;
  const depositPaid = repair.deposit_paid || 0;
  const remainingBalance = totalCost - depositPaid;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 border-[#1F2235] bg-[#11131E]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-white">
                  Repair #{repair.tracking_id}
                </h1>
                <p className="text-xs text-slate-500">{repair.device_model}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusStyle(repair.status)}>
                {repair.status === "collection" ? "Ready" : repair.status.charAt(0).toUpperCase() + repair.status.slice(1)}
              </Badge>
              <Button variant="outline" size="sm" onClick={handlePrintInvoice}>
                <Printer className="mr-2 h-4 w-4" />
                Invoice
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrintReceipt}>
                <Receipt className="mr-2 h-4 w-4" />
                Receipt
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer & Device Info */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Repair Information</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Customer</label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-white">{repair.customer_name}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="h-4 w-4" />
                    {repair.customer_phone}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Device</label>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-white">{repair.device_model}</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{repair.device_brand || "Unknown Brand"}</div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Issue Description</label>
                  <p className="text-sm text-slate-300">{repair.issue_description || "No description provided"}</p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Created</label>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4" />
                    {new Date(repair.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Status Timeline</h2>
                <History className="h-5 w-5 text-slate-400" />
              </div>
              <div className="space-y-4">
                {timeline.length > 0 ? (
                  timeline.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className={`h-3 w-3 rounded-full ${
                          item.type === "status" ? "bg-violet-500" :
                          item.type === "note" ? "bg-blue-500" :
                          item.type === "comment" ? "bg-amber-500" :
                          "bg-slate-500"
                        }`} />
                        {idx < timeline.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-700" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{item.title}</span>
                          <span className="text-xs text-slate-500">
                            {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                          </span>
                        </div>
                        {item.description && (
                          <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                        )}
                        {item.user && (
                          <p className="mt-1 text-xs text-slate-500">by {item.user}</p>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-sm text-slate-500">No timeline events yet</p>
                )}
              </div>
            </Card>

            {/* Technician Notes */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Technician Notes</h2>
                <Button variant="outline" size="sm" onClick={() => setShowAddNote(!showAddNote)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </div>
              
              {showAddNote && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-4 space-y-3"
                >
                  <Textarea
                    placeholder="Add a technician note..."
                    value={technicianNote}
                    onChange={(e) => setTechnicianNote(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAddNote(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleAddTechnicianNote}>
                      Save Note
                    </Button>
                  </div>
                </motion.div>
              )}

              <div className="space-y-3">
                {repair.technician_notes && repair.technician_notes.length > 0 ? (
                  repair.technician_notes.map((note: any, idx: number) => (
                    <div key={idx} className="rounded-lg bg-slate-50 bg-[#1A1D27] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{note.technician || "Unknown"}</span>
                        <span className="text-xs text-slate-500">{new Date(note.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-slate-300">{note.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-slate-500">No technician notes yet</p>
                )}
              </div>
            </Card>

            {/* Device Photos */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Device Photos</h2>
                <Camera className="h-5 w-5 text-slate-400" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Before Repair</label>
                  <div className="aspect-video rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 bg-[#1A1D27]">
                    {repair.photo_before ? (
                      <img src={repair.photo_before} alt="Before" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-center">
                        <Camera className="mx-auto h-8 w-8 text-slate-400" />
                        <p className="mt-2 text-sm text-slate-500">No photo uploaded</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">After Repair</label>
                  <div className="aspect-video rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 bg-[#1A1D27]">
                    {repair.photo_after ? (
                      <img src={repair.photo_after} alt="After" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-center">
                        <Camera className="mx-auto h-8 w-8 text-slate-400" />
                        <p className="mt-2 text-sm text-slate-500">No photo uploaded</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cost Breakdown */}
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <DollarSign className="h-5 w-5" />
                Cost Breakdown
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Labor</span>
                  <span className="font-medium">£{costBreakdown.labor.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Parts</span>
                  <span className="font-medium">£{costBreakdown.parts.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Diagnostic</span>
                  <span className="font-medium">£{costBreakdown.diagnostic.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax (20%)</span>
                  <span className="font-medium">£{costBreakdown.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>£{totalCost.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Payment Status */}
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <CreditCard className="h-5 w-5" />
                Payment Status
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Deposit Paid</span>
                  <span className="font-medium text-emerald-600">£{depositPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Remaining Balance</span>
                  <span className={`font-medium ${remainingBalance > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                    £{remainingBalance.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Payment Status</span>
                  <Badge className={remainingBalance === 0 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}>
                    {remainingBalance === 0 ? "Paid" : "Partial"}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Warranty */}
            <Card className="p-6">
              <WarrantyManager repairId={repair.id} token={getStoredToken() || ""} />
            </Card>

            {/* Invoice */}
            <Card className="p-6">
              <InvoiceGenerator repairId={repair.id} repair={repair} token={getStoredToken() || ""} />
            </Card>

            {/* Internal Comments */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Internal Comments</h2>
                <Button variant="outline" size="sm" onClick={() => setShowAddComment(!showAddComment)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
              
              {showAddComment && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-4 space-y-3"
                >
                  <Textarea
                    placeholder="Add an internal comment..."
                    value={internalComment}
                    onChange={(e) => setInternalComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAddComment(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleAddInternalComment}>
                      Add Comment
                    </Button>
                  </div>
                </motion.div>
              )}

              <div className="space-y-3">
                {repair.internal_comments && repair.internal_comments.length > 0 ? (
                  repair.internal_comments.map((comment: any, idx: number) => (
                    <div key={idx} className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-white text-sm">{comment.user || "Unknown"}</span>
                        <span className="text-xs text-slate-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-slate-300">{comment.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-slate-500">No internal comments</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin/repairs/$id")({
  component: RepairDetailsPage,
});
