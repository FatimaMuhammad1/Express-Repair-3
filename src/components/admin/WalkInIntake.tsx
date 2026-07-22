import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, Mail, Smartphone, DollarSign, FileText, CheckCircle } from "lucide-react";
import { API_BASE } from "@/lib/apiBase";

interface WalkInIntakeProps {
  token?: string;
  onSuccess?: (data: any) => void;
}

export default function WalkInIntake({ token, onSuccess }: WalkInIntakeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    device_model: "",
    device_type: "smartphone",
    issue_description: "",
    estimated_cost: "",
    notification_preference: "email",
    deposit_amount: "",
    payment_status: "pending",
    payment_method: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("admin_token");

      const payload = {
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone || null,
        customer_email: formData.customer_email || null,
        device_model: formData.device_model,
        device_type: formData.device_type,
        issue_description: formData.issue_description,
        estimated_cost: formData.estimated_cost ? parseFloat(formData.estimated_cost) : 0,
        notification_preference: formData.notification_preference,
        deposit_amount: formData.deposit_amount ? parseFloat(formData.deposit_amount) : null,
        payment_method: (formData.deposit_amount && formData.payment_method) ? formData.payment_method : undefined,
      };

      const res = await fetch(`${API_BASE}/walkin/intake`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setResult(data);
        if (onSuccess) onSuccess(data);
        
        // Notify parent to refresh repairs list
        window.dispatchEvent(new CustomEvent("walkin-success", { detail: data }));
        
        // Notify finance section to refresh
        window.dispatchEvent(new CustomEvent("finance-refresh", { detail: { type: "invoice-created" } }));
        
        // Reset form
        setFormData({
          customer_name: "",
          customer_phone: "",
          customer_email: "",
          device_model: "",
          device_type: "smartphone",
          issue_description: "",
          estimated_cost: "",
          notification_preference: "email",
          deposit_amount: "",
          payment_status: "pending",
          payment_method: "",
        });
      } else {
        console.error("Walk-in intake error:", data);
        const errorMessage = typeof data.detail === 'string' ? data.detail : data.message || "Failed to create walk-in intake";
        setError(errorMessage);
      }
    } catch (err) {
      setError("Could not reach backend");
    } finally {
      setIsLoading(false);
    }
  };

  if (success && result) {
    return (
      <div className="w-full">
        <div className="bg-[#11131E] rounded-lg border border-[#1F2235] p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Walk-in Intake Successful!</h3>
            <p className="text-slate-400 mt-2">{result.message}</p>
          </div>
          <div className="bg-[#1A1D27] rounded-lg p-4 text-left space-y-2 border border-[#1F2235]">
            <div className="flex justify-between">
              <span className="text-slate-400">Tracking ID:</span>
              <span className="font-mono font-semibold text-white">{result.tracking_id}</span>
            </div>
            {result.invoice_number && (
              <div className="flex justify-between">
                <span className="text-slate-400">Invoice Number:</span>
                <span className="font-mono font-semibold text-white">{result.invoice_number}</span>
              </div>
            )}
          </div>
          <Button onClick={() => setSuccess(false)} variant="outline" className="border-[#1F2235] text-white hover:bg-slate-50 dark:hover:bg-slate-800">
            Create Another Walk-in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div className="bg-[#11131E] rounded-lg border border-[#1F2235] p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4" />
            Customer Information
          </h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="customer_name" className="text-slate-300">Customer Name *</Label>
              <Input
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="border-[#1F2235] bg-[#1A1D27] text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer_phone" className="text-slate-300">Phone Number</Label>
                <Input
                  id="customer_phone"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  placeholder="+1234567890"
                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                />
              </div>
              <div>
                <Label htmlFor="customer_email" className="text-slate-300">Email</Label>
                <Input
                  id="customer_email"
                  name="customer_email"
                  type="email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  placeholder="customer@example.com"
                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Device Information */}
        <div className="bg-[#11131E] rounded-lg border border-[#1F2235] p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Device Information
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="device_type" className="text-slate-300">Device Type</Label>
                <Select
                  value={formData.device_type}
                  onValueChange={(value) => handleSelectChange("device_type", value)}
                >
                  <SelectTrigger className="border-[#1F2235] bg-[#1A1D27] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smartphone">Smartphone</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="console">Console</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="device_model" className="text-slate-300">Device Model *</Label>
                <Input
                  id="device_model"
                  name="device_model"
                  value={formData.device_model}
                  onChange={handleChange}
                  required
                  placeholder="iPhone 14 Pro"
                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="issue_description" className="text-slate-300">Issue Description *</Label>
              <Textarea
                id="issue_description"
                name="issue_description"
                value={formData.issue_description}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe the issue with the device"
                className="border-[#1F2235] bg-[#1A1D27] text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="estimated_cost" className="text-slate-300">Estimated Cost ($)</Label>
                <Input
                  id="estimated_cost"
                  name="estimated_cost"
                  type="number"
                  step="0.01"
                  value={formData.estimated_cost}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="border-[#1F2235] bg-[#1A1D27] text-white"
                />
              </div>
              <div>
                <Label htmlFor="notification_preference" className="text-slate-300">Notification Preference</Label>
                <Select
                  value={formData.notification_preference}
                  onValueChange={(value) => handleSelectChange("notification_preference", value)}
                >
                  <SelectTrigger className="border-[#1F2235] bg-[#1A1D27] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Deposit Payment Section */}
        <div className="bg-[#11131E] rounded-lg border border-[#1F2235] p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Payment Information
          </h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="payment_status" className="text-slate-300">Payment Status</Label>
              <Select
                value={formData.payment_status}
                onValueChange={(value) => handleSelectChange("payment_status", value)}
              >
                <SelectTrigger className="border-[#1F2235] bg-[#1A1D27] text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="partially_paid">Partially Paid</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deposit_amount" className="text-slate-300">Amount Paid (£)</Label>
                <Input
                  id="deposit_amount"
                  name="deposit_amount"
                  type="number"
                  step="0.01"
                  value={formData.payment_status === "pending" ? "" : formData.deposit_amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  disabled={formData.payment_status === "pending"}
                  className="border-[#1F2235] bg-[#1A1D27] text-white disabled:opacity-50"
                />
              </div>
              <div>
                <Label htmlFor="payment_method" className="text-slate-300">Payment Method</Label>
                <Select
                  value={formData.payment_status === "pending" ? "none" : formData.payment_method}
                  onValueChange={(value) => handleSelectChange("payment_method", value)}
                  disabled={formData.payment_status === "pending"}
                >
                  <SelectTrigger className="border-[#1F2235] bg-[#1A1D27] text-white disabled:opacity-50">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" disabled>None / Not Selected</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              {formData.payment_status === "pending" ? "Payment will be collected when customer collects the device." : "Payment will be applied to the final invoice."}
            </p>
          </div>
        </div>

        <Button type="submit" className="w-full bg-[#6B46C1] hover:bg-[#5B3A9E] text-white" disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit Walk-in Intake"}
        </Button>
      </form>
    </div>
  );
}
