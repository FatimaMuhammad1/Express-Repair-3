import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { SectionBackdrop } from "@/components/SectionBackdrop";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Upload } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Repair — Express Phone & Laptop Repair Nuneaton" },
      {
        name: "description",
        content:
          "Book your phone, laptop or tablet repair in Nuneaton. Free diagnostics, same-day service, 90-day warranty.",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    device_type: "",
    device_model: "",
    issue_description: "",
    preferred_date: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Attempt to load user data to prefill form
    try {
      const userStr = localStorage.getItem("current_user") || localStorage.getItem("admin_user");
      if (userStr) {
        const user = JSON.parse(userStr);
        setFormData(prev => ({
          ...prev,
          customer_name: user.name || "",
          customer_phone: user.phone || "",
          customer_email: user.email || ""
        }));
      }
    } catch (e) {
      console.error("Failed to parse user data", e);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Phone validation
    const phoneRegex = /^(\+44|0)[1-9]\d{8,9}$/;
    if (formData.customer_phone && !phoneRegex.test(formData.customer_phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid UK phone number (e.g., 07415 278767 or +447415278767)");
      return;
    }
    
    setIsLoading(true);
    
    // Default time slot since it's required by the schema but not in the UI
    const payload = {
      ...formData,
      preferred_time_slot: "Any time",
    };

    try {
      const token = localStorage.getItem("user_token") || localStorage.getItem("admin_token");
      const headers: any = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      let imageUrl = "";
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("file", selectedFile);
        const uploadRes = await fetch("http://localhost:8000/api/uploads/", {
          method: "POST",
          body: fileData
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          imageUrl = uploadData.file_url;
        }
      }

      if (imageUrl) {
        payload.issue_description += `\n\nImage Attachment: ${imageUrl}`;
      }

      const res = await fetch("http://localhost:8000/api/bookings/create", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setTrackingId(data.tracking_id || "");
        setSubmitted(true);
        toast.success("Booking received! Your tracking ID is: " + (data.tracking_id || "pending"));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to submit booking.");
      }
    } catch (err) {
      toast.error("Could not reach the server.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
        <div className="relative min-h-screen bg-[#f5fbff] dark:bg-transparent section-frost dark:section-frost">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#d9f2ff] via-[#effaf5] to-transparent dark:from-slate-900/30 dark:via-slate-900/10 dark:to-transparent" />
        <div className="relative z-10">
          <div className="relative overflow-hidden bg-white dark:bg-transparent ring-1 ring-[#10b981]/10 dark:ring-slate-800/30 shadow-[0_30px_80px_-50px_rgba(16,185,129,0.15)]">
        <SectionBackdrop />
        <section className="relative z-10 py-24">
          <div className="max-w-4xl mx-auto px-4">
            <Reveal>
              {submitted ? (
                <Card className="p-10 text-center rounded-[2rem] border border-transparent bg-white dark:bg-slate-900/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] ring-1 ring-inset ring-[#22c55e]/10 dark:ring-slate-700/50">
                  <div className="w-16 h-16 rounded-full bg-[#ddf8f0] grid place-items-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#059669]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-slate-950 dark:text-white">Booking Confirmed!</h2>
                  {trackingId && (
                    <div className="my-6 p-4 bg-[#f0f9ff] dark:bg-slate-800/50 rounded-lg border border-[#0095ff]/30">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Your Tracking ID:</p>
                      <p className="text-2xl font-bold text-[#0095ff] dark:text-sky-300 font-mono">{trackingId}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Use this to track your repair progress</p>
                    </div>
                  )}
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    We'll be in touch shortly on 07415 278767 to confirm your repair slot.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setTrackingId("");
                    }}
                    variant="outline"
                    className="rounded-sm border-[#0095ff] text-[#0095ff] dark:text-sky-300 dark:border-sky-500 hover:bg-[#f0f9ff] dark:hover:bg-slate-800"
                  >
                    Book Another Repair
                  </Button>
                </Card>
              ) : (
                <Card className="p-6 md:p-10 rounded-[2rem] border border-transparent dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] ring-1 ring-inset ring-[#0ea5e9]/10 dark:ring-slate-700/50">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0b69d7] mb-3">
                    Repair Request
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-950 dark:text-white mb-6">
                    Tell us about your device
                  </h2>
                  <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        required
                        value={formData.customer_name}
                        onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                        placeholder="John Doe"
                        className="mt-1.5 rounded-xl border-slate-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number <span className="text-xs text-slate-500">(optional)</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.customer_phone}
                        onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                        placeholder="+447415278767"
                        pattern="^\+[1-9]\d{6,14}$"
                        title="International format required (e.g. +447415278767)"
                        className="mt-1.5 rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.customer_email}
                        onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                        placeholder="you@example.com"
                        className="mt-1.5 rounded-xl border-slate-200"
                      />
                    </div>
                    <div>
                      <Label>Device Type</Label>
                      <Select value={formData.device_type} onValueChange={(v) => setFormData({ ...formData, device_type: v })}>
                        <SelectTrigger className="mt-1.5 rounded-xl border-slate-200">
                          <SelectValue placeholder="Choose device" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mobile">Mobile Phone</SelectItem>
                          <SelectItem value="laptop">Laptop</SelectItem>
                          <SelectItem value="tablet">Tablet</SelectItem>
                          <SelectItem value="watch">Smartwatch</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Brand / Model</Label>
                      <Input
                        placeholder="e.g. iPhone 13, Samsung S21"
                        required
                        value={formData.device_model}
                        onChange={(e) => setFormData({ ...formData, device_model: e.target.value })}
                        className="mt-1.5 rounded-xl border-slate-200"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="problem">Problem Description</Label>
                      <Textarea
                        id="problem"
                        required
                        value={formData.issue_description}
                        onChange={(e) => setFormData({ ...formData, issue_description: e.target.value })}
                        placeholder="Describe what's wrong with your device..."
                        rows={4}
                        className="mt-1.5 rounded-xl border-slate-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        required
                        value={formData.preferred_date}
                        onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                        className="mt-1.5 rounded-xl border-slate-200" 
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Upload Image (optional)</Label>
                      <label className="mt-1.5 border-2 border-dashed border-[#0ea5e9]/40 dark:border-slate-700 rounded-[1.25rem] bg-[#effaff] dark:bg-slate-900/50 p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-[#10b981]/50 hover:bg-[#ecfff5] dark:hover:border-slate-500 dark:hover:bg-slate-800/80 transition-colors">
                        <Upload className="w-6 h-6 text-[#0b69d7] dark:text-sky-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {selectedFile ? selectedFile.name : "Click to upload device photos"}
                        </span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        />
                      </label>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="sm:col-span-2 rounded-full bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] to-[#10b981] text-white h-12 uppercase tracking-widest text-xs font-semibold shadow-lg shadow-[#10b981]/20"
                    >
                      Confirm Booking
                    </Button>
                  </form>
                </Card>
              )}
            </Reveal>
          </div>
        </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
