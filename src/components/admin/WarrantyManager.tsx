import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, Clock, Calendar, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { buildUrl, getAuthHeaders, getStoredToken } from "@/lib/api";
import { toast } from "sonner";

interface WarrantyManagerProps {
  repairId: string;
  token: string;
}

export function WarrantyManager({ repairId, token }: WarrantyManagerProps) {
  const [warranty, setWarranty] = useState<any>(null);
  const [warrantyHistory, setWarrantyHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    duration: 90,
    startDate: new Date().toISOString().split('T')[0],
    notes: "",
  });

  useEffect(() => {
    fetchWarranty();
    fetchWarrantyHistory();
  }, [repairId]);

  const fetchWarranty = async () => {
    try {
      const res = await fetch(buildUrl(`/repairs/${repairId}/warranty`), {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWarranty(data.warranty);
        if (data.warranty) {
          setFormData({
            duration: data.warranty.duration || 90,
            startDate: data.warranty.start_date || new Date().toISOString().split('T')[0],
            notes: data.warranty.notes || "",
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch warranty:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWarrantyHistory = async () => {
    try {
      const res = await fetch(buildUrl(`/repairs/${repairId}/warranty/history`), {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWarrantyHistory(data.history || []);
      }
    } catch (error) {
      console.error("Failed to fetch warranty history:", error);
    }
  };

  const calculateExpirationDate = (startDate: string, duration: number) => {
    const start = new Date(startDate);
    const expiration = new Date(start);
    expiration.setDate(expiration.getDate() + duration);
    return expiration;
  };

  const getWarrantyStatus = (expirationDate: Date) => {
    const now = new Date();
    const daysUntilExpiration = Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiration < 0) {
      return { status: "expired", color: "rose", text: "Expired" };
    } else if (daysUntilExpiration <= 30) {
      return { status: "expiring", color: "amber", text: "Expiring Soon" };
    } else {
      return { status: "active", color: "emerald", text: "Active" };
    }
  };

  const handleSaveWarranty = async () => {
    try {
      const expirationDate = calculateExpirationDate(formData.startDate, formData.duration);
      
      const res = await fetch(buildUrl(`/repairs/${repairId}/warranty`), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration: formData.duration,
          start_date: formData.startDate,
          expiration_date: expirationDate.toISOString(),
          notes: formData.notes,
        }),
      });

      if (res.ok) {
        toast.success("Warranty updated successfully");
        setEditing(false);
        fetchWarranty();
        fetchWarrantyHistory();
      } else {
        toast.error("Failed to update warranty");
      }
    } catch (error) {
      toast.error("Failed to update warranty");
    }
  };

  const handleExtendWarranty = async (additionalDays: number) => {
    if (!warranty) return;
    
    try {
      const currentExpiration = new Date(warranty.expiration_date);
      const newExpiration = new Date(currentExpiration);
      newExpiration.setDate(newExpiration.getDate() + additionalDays);
      
      const res = await fetch(buildUrl(`/repairs/${repairId}/warranty/extend`), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          additional_days: additionalDays,
          new_expiration_date: newExpiration.toISOString(),
        }),
      });

      if (res.ok) {
        toast.success(`Warranty extended by ${additionalDays} days`);
        fetchWarranty();
        fetchWarrantyHistory();
      } else {
        toast.error("Failed to extend warranty");
      }
    } catch (error) {
      toast.error("Failed to extend warranty");
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Clock className="h-6 w-6 animate-spin text-violet-500" />
        </div>
      </Card>
    );
  }

  const expirationDate = warranty ? new Date(warranty.expiration_date) : calculateExpirationDate(formData.startDate, formData.duration);
  const warrantyStatus = getWarrantyStatus(expirationDate);
  const daysUntilExpiration = Math.ceil((expirationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`rounded-full p-2 bg-${warrantyStatus.color}-100`}>
            <Shield className={`h-5 w-5 text-${warrantyStatus.color}-600`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Warranty Status</h3>
            <Badge className={`bg-${warrantyStatus.color}-100 text-${warrantyStatus.color}-700`}>
              {warrantyStatus.text}
            </Badge>
          </div>
        </div>
        {!editing && (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            Edit Warranty
          </Button>
        )}
      </div>

      {warrantyStatus.status === "expired" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4"
        >
          <AlertTriangle className="h-5 w-5 text-rose-600" />
          <div>
            <p className="font-medium text-rose-900">Warranty Expired</p>
            <p className="text-sm text-rose-700">
              This warranty expired on {expirationDate.toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      )}

      {warrantyStatus.status === "expiring" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4"
        >
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <div>
            <p className="font-medium text-amber-900">Warranty Expiring Soon</p>
            <p className="text-sm text-amber-700">
              This warranty will expire in {daysUntilExpiration} days
            </p>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {editing ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Warranty Duration (days)
                </label>
                <Select
                  value={formData.duration.toString()}
                  onValueChange={(value) => setFormData({ ...formData, duration: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="180">180 Days</SelectItem>
                    <SelectItem value="365">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Notes
              </label>
              <textarea
                className="w-full rounded-lg border border-[#1F2235] bg-[#1A1D27] p-3 text-sm"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add warranty notes or conditions..."
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveWarranty}>Save Warranty</Button>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Duration</span>
              <span className="font-medium text-white">
                {warranty?.duration || formData.duration} days
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Start Date</span>
              <span className="font-medium text-white">
                {warranty?.start_date ? new Date(warranty.start_date).toLocaleDateString() : new Date(formData.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Expiration Date</span>
              <span className={`font-medium ${warrantyStatus.status === "expired" ? "text-rose-600" : warrantyStatus.status === "expiring" ? "text-amber-600" : "text-white"}`}>
                {expirationDate.toLocaleDateString()}
              </span>
            </div>
            {warranty?.notes && (
              <div className="rounded-lg bg-[#1A1D27] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-300">Notes</span>
                </div>
                <p className="text-sm text-slate-400">{warranty.notes}</p>
              </div>
            )}

            {warranty && warrantyStatus.status !== "expired" && (
              <div className="pt-4 border-t border-[#1F2235]">
                <p className="mb-3 text-sm font-medium text-slate-300">Extend Warranty</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExtendWarranty(30)}>
                    +30 Days
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExtendWarranty(90)}>
                    +90 Days
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExtendWarranty(180)}>
                    +180 Days
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {warrantyHistory.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[#1F2235]">
          <h4 className="mb-4 text-sm font-semibold text-white">Warranty History</h4>
          <div className="space-y-2">
            {warrantyHistory.map((history, idx) => (
              <motion.div
                key={history.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between rounded-lg bg-[#1A1D27] p-3"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{history.action}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(history.created_at).toLocaleDateString()} {new Date(history.created_at).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-500">by {history.user || "System"}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
