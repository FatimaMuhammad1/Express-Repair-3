import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { buildUrl, getAuthHeaders } from "@/lib/api";
import { toast } from "sonner";

interface TradeRequestsManagerProps {
  token: string;
}

export function TradeRequestsManager({ token }: TradeRequestsManagerProps) {
  const [tradeRequests, setTradeRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [offerPrice, setOfferPrice] = useState("");

  useEffect(() => {
    fetchTradeRequests();
  }, []);

  const fetchTradeRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(buildUrl("/products/trade-requests/all"), {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTradeRequests(data.requests || []);
      }
    } catch (error) {
      console.error("Failed to fetch trade requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId: string, status: string, price?: number) => {
    try {
      const body: any = { status };
      if (price !== undefined) {
        body.offer_price = price;
      }

      const res = await fetch(buildUrl(`/products/trade-requests/${requestId}/status`), {
        method: "PUT",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(`Trade request ${status}`);
        setSelectedRequest(null);
        setOfferPrice("");
        fetchTradeRequests();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredRequests = tradeRequests.filter((request) => {
    const matchesSearch =
      request.device_model?.toLowerCase().includes(search.toLowerCase()) ||
      request.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      request.customer_phone?.includes(search);
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      case "approved":
        return <Badge className="bg-emerald-100 text-emerald-700">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-rose-100 text-rose-700">Rejected</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-700">Completed</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-700">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Trade Requests</h2>
          <p className="text-slate-400">Manage device trade-in requests from customers</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by device, name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-[#1F2235] bg-[#1A1D27] pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-600" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Requests</p>
              <p className="mt-2 text-2xl font-bold text-white">{tradeRequests.length}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Pending</p>
              <p className="mt-2 text-2xl font-bold text-amber-600">
                {tradeRequests.filter((r) => r.status === "pending").length}
              </p>
            </div>
            <div className="rounded-full bg-amber-100 p-3">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Approved</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {tradeRequests.filter((r) => r.status === "approved").length}
              </p>
            </div>
            <div className="rounded-full bg-emerald-100 p-3">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Rejected</p>
              <p className="mt-2 text-2xl font-bold text-rose-600">
                {tradeRequests.filter((r) => r.status === "rejected").length}
              </p>
            </div>
            <div className="rounded-full bg-rose-100 p-3">
              <XCircle className="h-6 w-6 text-rose-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trade Requests List */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Clock className="h-8 w-8 animate-spin text-violet-500" />
          </div>
        ) : (
          <div className="divide-y divide-[#1F2235]">
            {filteredRequests.map((request, idx) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 hover:bg-white/[0.02]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{request.device_model}</h3>
                      {getStatusBadge(request.status)}
                    </div>
                    <div className="grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Customer:</span>
                        <span>{request.customer_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Phone:</span>
                        <span>{request.customer_phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Condition:</span>
                        <span className="capitalize">{request.device_condition}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Storage:</span>
                        <span>{request.storage_capacity || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">IMEI:</span>
                        <span className="font-mono">{request.imei || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Submitted:</span>
                        <span>{new Date(request.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {request.notes && (
                      <p className="mt-2 text-sm text-slate-500">{request.notes}</p>
                    )}
                  </div>
                  <div className="ml-4 flex gap-2">
                    {request.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <DollarSign className="mr-1 h-4 w-4" />
                          Make Offer
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-rose-600 hover:text-rose-700"
                          onClick={() => handleUpdateStatus(request.id, "rejected")}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {request.status === "approved" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateStatus(request.id, "completed")}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredRequests.length === 0 && (
              <div className="py-12 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-slate-400" />
                <p className="mt-2 text-slate-500">No trade requests found</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Offer Modal */}
      {selectedRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedRequest(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Make Offer</h3>
            <div className="mb-4 space-y-2">
              <p className="text-sm text-slate-400">Device: {selectedRequest.device_model}</p>
              <p className="text-sm text-slate-400">Condition: {selectedRequest.device_condition}</p>
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-slate-300">Offer Price (£)</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="border-[#1F2235] bg-[#1A1D27]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => handleUpdateStatus(selectedRequest.id, "approved", parseFloat(offerPrice))}
                disabled={!offerPrice}
              >
                Approve & Send Offer
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
