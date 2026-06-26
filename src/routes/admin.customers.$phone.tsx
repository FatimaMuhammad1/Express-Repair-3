import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Package,
  MessageSquare,
  Clock,
  TrendingUp,
  FileText,
  Edit,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buildUrl, getAuthHeaders, getStoredToken } from "@/lib/api";
import { toast } from "sonner";

function CustomerProfilePage() {
  const { phone } = Route.useParams();
  const navigate = useNavigate();
  const token = getStoredToken();
  
  const [customer, setCustomer] = useState<any>(null);
  const [repairs, setRepairs] = useState<any[]>([]);
  const [communications, setCommunications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
  });
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchCustomerData();
  }, [phone]);

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      const [customerRes, repairsRes, commRes] = await Promise.all([
        fetch(buildUrl(`/customers/phone/${phone}`), { headers: getAuthHeaders() }),
        fetch(buildUrl(`/customers/phone/${phone}/repairs`), { headers: getAuthHeaders() }),
        fetch(buildUrl(`/customers/phone/${phone}/communications`), { headers: getAuthHeaders() }),
      ]);

      if (customerRes.ok) {
        const data = await customerRes.json();
        setCustomer(data.customer);
        setFormData({
          name: data.customer?.name || "",
          email: data.customer?.email || "",
          notes: data.customer?.notes || "",
        });
      }
      if (repairsRes.ok) {
        const data = await repairsRes.json();
        setRepairs(data.repairs || []);
      }
      if (commRes.ok) {
        const data = await commRes.json();
        setCommunications(data.communications || []);
      }
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCustomer = async () => {
    try {
      const res = await fetch(buildUrl(`/customers/${customer?.id}`), {
        method: "PUT",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Customer updated successfully");
        setEditing(false);
        fetchCustomerData();
      } else {
        toast.error("Failed to update customer");
      }
    } catch (error) {
      toast.error("Failed to update customer");
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await fetch(buildUrl(`/customers/${customer?.id}/notes`), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note: newNote }),
      });

      if (res.ok) {
        toast.success("Note added successfully");
        setNewNote("");
        fetchCustomerData();
      } else {
        toast.error("Failed to add note");
      }
    } catch (error) {
      toast.error("Failed to add note");
    }
  };

  const totalSpent = repairs.reduce((sum, r) => sum + (r.total_cost || 0), 0);
  const completedRepairs = repairs.filter(r => r.status === "collection").length;
  const lastVisit = repairs.length > 0 ? new Date(repairs[0].created_at) : null;
  const lifetimeValue = totalSpent;
  const avgRepairValue = repairs.length > 0 ? totalSpent / repairs.length : 0;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Clock className="mx-auto h-8 w-8 animate-spin text-violet-500" />
          <p className="mt-2 text-slate-600">Loading customer profile...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Customer not found</p>
          <Link to="/admin">
            <Button className="mt-4">Back to Admin</Button>
          </Link>
        </div>
      </div>
    );
  }

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
                <h1 className="text-lg font-bold text-white">{customer.name}</h1>
                <p className="text-xs text-slate-500">{customer.phone}</p>
              </div>
            </div>
            <Button onClick={() => setEditing(!editing)}>
              <Edit className="mr-2 h-4 w-4" />
              {editing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Customer Information</h2>
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">Notes</label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveCustomer}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Name</p>
                      <p className="font-medium text-white">{customer.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-medium text-white">{customer.phone}</p>
                    </div>
                  </div>
                  {customer.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Email</p>
                        <p className="font-medium text-white">{customer.email}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Last Visit</p>
                      <p className="font-medium text-white">
                        {lastVisit ? lastVisit.toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Repair History */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Repair History</h2>
              <div className="space-y-3">
                {repairs.length > 0 ? (
                  repairs.map((repair, idx) => (
                    <motion.div
                      key={repair.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between rounded-lg border border-[#1F2235] p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-violet-100 p-2">
                          <Package className="h-4 w-4 text-violet-600" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{repair.device_model}</p>
                          <p className="text-sm text-slate-600">{repair.issue_description || "No description"}</p>
                          <p className="text-xs text-slate-500">
                            {new Date(repair.created_at).toLocaleDateString()} | {repair.tracking_id}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            repair.status === "collection"
                              ? "bg-emerald-100 text-emerald-700"
                              : repair.status === "repairing"
                              ? "bg-violet-100 text-violet-700"
                              : "bg-slate-100 text-slate-700"
                          }
                        >
                          {repair.status === "collection" ? "Completed" : repair.status}
                        </Badge>
                        <p className="mt-1 text-sm font-semibold text-white">
                          £{repair.total_cost?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-slate-500">No repair history</p>
                )}
              </div>
            </Card>

            {/* Communication History */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Communication History</h2>
              <div className="space-y-3">
                {communications.length > 0 ? (
                  communications.map((comm, idx) => (
                    <motion.div
                      key={comm.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 rounded-lg border border-[#1F2235] p-4"
                    >
                      <div className={`rounded-full p-2 ${comm.type === "email" ? "bg-blue-100" : "bg-violet-100"}`}>
                        {comm.type === "email" ? (
                          <Mail className="h-4 w-4 text-blue-600" />
                        ) : (
                          <MessageSquare className="h-4 w-4 text-violet-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-white">{comm.subject || comm.type}</p>
                          <span className="text-xs text-slate-500">
                            {new Date(comm.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600">{comm.message}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-slate-500">No communication history</p>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Customer Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Repairs</span>
                  <span className="text-2xl font-bold text-white">{repairs.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Completed</span>
                  <span className="text-2xl font-bold text-emerald-600">{completedRepairs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Spent</span>
                  <span className="text-2xl font-bold text-white">£{totalSpent.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Avg. Repair</span>
                  <span className="text-2xl font-bold text-white">£{avgRepairValue.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Lifetime Value */}
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <TrendingUp className="h-5 w-5" />
                Lifetime Value
              </h2>
              <div className="text-center">
                <p className="text-4xl font-bold text-violet-600">£{lifetimeValue.toFixed(2)}</p>
                <p className="mt-2 text-sm text-slate-500">Total customer value</p>
              </div>
            </Card>

            {/* Notes */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Notes</h2>
              {customer.notes && !editing && (
                <div className="mb-4 rounded-lg bg-slate-50 bg-[#1A1D27] p-3">
                  <p className="text-sm text-slate-300">{customer.notes}</p>
                </div>
              )}
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a new note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddNote} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Repair
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin/customers/$phone")({
  component: CustomerProfilePage,
});
