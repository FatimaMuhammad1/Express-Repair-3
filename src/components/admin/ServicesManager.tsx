import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  DollarSign,
  Clock,
  Plus,
  Edit,
  Trash2,
  Search,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { buildUrl, getAuthHeaders } from "@/lib/api";
import { toast } from "sonner";

interface ServicesManagerProps {
  token: string;
}

export function ServicesManager({ token }: ServicesManagerProps) {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    base_price: "",
    estimated_time: "",
    icon_name: "wrench",
    is_active: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(buildUrl("/services/admin"), {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setServices(data.services || []);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      base_price: parseFloat(formData.base_price),
    };

    try {
      const url = editingService 
        ? buildUrl(`/services/${editingService.id}`)
        : buildUrl("/services");
      
      const res = await fetch(url, {
        method: editingService ? "PUT" : "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingService ? "Service updated successfully" : "Service created successfully");
        setFormData({
          name: "",
          description: "",
          base_price: "",
          estimated_time: "",
          icon_name: "wrench",
          is_active: true,
        });
        setShowAddForm(false);
        setEditingService(null);
        fetchServices();
      } else {
        toast.error("Failed to save service");
      }
    } catch (error) {
      toast.error("Failed to save service");
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      base_price: service.base_price.toString(),
      estimated_time: service.estimated_time,
      icon_name: service.icon_name,
      is_active: service.is_active,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (serviceId: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    try {
      const res = await fetch(buildUrl(`/services/${serviceId}`), {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        toast.success("Service deleted successfully");
        fetchServices();
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      toast.error("Failed to delete service");
    }
  };

  const handleToggleActive = async (service: any) => {
    try {
      const res = await fetch(buildUrl(`/services/${service.id}`), {
        method: "PUT",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: !service.is_active }),
      });
      if (res.ok) {
        toast.success(`Service ${service.is_active ? "deactivated" : "activated"}`);
        fetchServices();
      } else {
        toast.error("Failed to update service status");
      }
    } catch (error) {
      toast.error("Failed to update service status");
    }
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase()) ||
    service.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Services Catalog</h2>
          <p className="text-slate-400">Manage repair services with pricing</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-[#1F2235] bg-[#1A1D27] pl-10"
        />
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
        >
          <h3 className="mb-4 text-lg font-semibold text-white">
            {editingService ? "Edit Service" : "Add New Service"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Service Name</label>
                <Input
                  placeholder="e.g., Screen Replacement"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-[#1F2235] bg-[#1A1D27]"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Base Price (£)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.base_price}
                  onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                  className="border-[#1F2235] bg-[#1A1D27]"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Estimated Time</label>
                <Input
                  placeholder="e.g., 1-2 hours"
                  value={formData.estimated_time}
                  onChange={(e) => setFormData({ ...formData, estimated_time: e.target.value })}
                  className="border-[#1F2235] bg-[#1A1D27]"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">Icon Name</label>
                <select
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  className="w-full rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-white"
                >
                  <option value="wrench">Wrench</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="laptop">Laptop</option>
                  <option value="tablet">Tablet</option>
                  <option value="battery">Battery</option>
                  <option value="cpu">CPU</option>
                  <option value="memory">Memory</option>
                  <option value="hard-drive">Hard Drive</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Description</label>
              <textarea
                placeholder="Service description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[100px] w-full rounded-lg border border-[#1F2235] bg-[#1A1D27] px-3 py-2 text-white"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="h-4 w-4"
              />
              <label htmlFor="is_active" className="text-sm text-slate-300">
                Active (visible to customers)
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingService(null);
                  setFormData({
                    name: "",
                    description: "",
                    base_price: "",
                    estimated_time: "",
                    icon_name: "wrench",
                    is_active: true,
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingService ? "Update Service" : "Create Service"}
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Services List */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Clock className="h-8 w-8 animate-spin text-violet-500" />
          </div>
        ) : (
          <div className="divide-y divide-[#1F2235]">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 hover:bg-white/[0.02]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Wrench className="h-5 w-5 text-violet-500" />
                      <h3 className="font-semibold text-white">{service.name}</h3>
                      <Badge variant={service.is_active ? "default" : "secondary"}>
                        {service.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="mb-3 text-sm text-slate-400">{service.description}</p>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1 text-emerald-400">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold">£{service.base_price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="h-4 w-4" />
                        <span>{service.estimated_time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(service)}
                    >
                      {service.is_active ? (
                        <ToggleRight className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <ToggleLeft className="h-4 w-4 text-slate-500" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="h-4 w-4 text-rose-600" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredServices.length === 0 && (
              <div className="py-12 text-center">
                <Wrench className="mx-auto mb-3 h-8 w-8 opacity-40 text-slate-400" />
                <p className="text-sm text-slate-500">No services found</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
