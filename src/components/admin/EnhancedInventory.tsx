import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  History,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { buildUrl, getAuthHeaders, getStoredToken } from "@/lib/api";
import { toast } from "sonner";
import { useBranch } from "./BranchSelector";

interface EnhancedInventoryProps {
  token: string;
}

export function EnhancedInventory({ token }: EnhancedInventoryProps) {
  const branchId = useBranch();
  const [products, setProducts] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
  const [stockMovements, setStockMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    fetchInventoryData();
  }, [branchId]);

  const fetchInventoryData = async () => {
    setLoading(true);
    try {
      const [productsRes, suppliersRes, ordersRes, movementsRes] = await Promise.all([
        fetch(buildUrl(`/inventory?branch_id=${branchId === "all" ? "" : branchId}`), { headers: getAuthHeaders() }),
        fetch(buildUrl("/suppliers"), { headers: getAuthHeaders() }),
        fetch(buildUrl("/purchase-orders"), { headers: getAuthHeaders() }),
        fetch(buildUrl("/stock-movements"), { headers: getAuthHeaders() }),
      ]);

      if (productsRes.ok) {
        const data = await productsRes.json();
        setProducts(data.products || []);
      }
      if (suppliersRes.ok) {
        const data = await suppliersRes.json();
        setSuppliers(data.suppliers || []);
      }
      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setPurchaseOrders(data.orders || []);
      }
      if (movementsRes.ok) {
        const data = await movementsRes.json();
        setStockMovements(data.movements || []);
      }
    } catch (error) {
      console.error("Failed to fetch inventory data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.brand?.toLowerCase().includes(search.toLowerCase()) ||
      product.sku?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesLowStock = !lowStockOnly || product.stock_quantity < 5;
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  const handleDeductStock = async (productId: string, quantity: number, reason: string) => {
    try {
      const res = await fetch(buildUrl(`/inventory/${productId}/deduct`), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity, reason }),
      });

      if (res.ok) {
        toast.success("Stock deducted successfully");
        fetchInventoryData();
      } else {
        toast.error("Failed to deduct stock");
      }
    } catch (error) {
      toast.error("Failed to deduct stock");
    }
  };

  const handleAddStock = async (productId: string, quantity: number, reason: string) => {
    try {
      const res = await fetch(buildUrl(`/inventory/${productId}/add`), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity, reason }),
      });

      if (res.ok) {
        toast.success("Stock added successfully");
        fetchInventoryData();
      } else {
        toast.error("Failed to add stock");
      }
    } catch (error) {
      toast.error("Failed to add stock");
    }
  };

  const lowStockProducts = products.filter((p) => p.stock_quantity < 5);
  const outOfStockProducts = products.filter((p) => p.stock_quantity === 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Enhanced Inventory</h2>
          <p className="text-slate-400">Manage products, suppliers, and stock movements</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
          <Button variant="outline">
            <Truck className="mr-2 h-4 w-4" />
            New Purchase Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#1F2235] bg-[#11131E] p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Products</p>
              <p className="mt-2 text-2xl font-bold text-white">{products.length}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Package className="h-6 w-6 text-blue-600" />
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
              <p className="text-sm font-medium text-slate-400">Low Stock</p>
              <p className="mt-2 text-2xl font-bold text-amber-600">{lowStockProducts.length}</p>
            </div>
            <div className="rounded-full bg-amber-100 p-3">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
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
              <p className="text-sm font-medium text-slate-400">Out of Stock</p>
              <p className="mt-2 text-2xl font-bold text-rose-600">{outOfStockProducts.length}</p>
            </div>
            <div className="rounded-full bg-rose-100 p-3">
              <Package className="h-6 w-6 text-rose-600" />
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
              <p className="text-sm font-medium text-slate-400">Suppliers</p>
              <p className="mt-2 text-2xl font-bold text-white">{suppliers.length}</p>
            </div>
            <div className="rounded-full bg-violet-100 p-3">
              <Truck className="h-6 w-6 text-violet-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-amber-200 bg-amber-50 p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <span className="font-semibold text-amber-900">Low Stock Alerts</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStockProducts.slice(0, 5).map((product) => (
              <Badge key={product.id} variant="outline" className="bg-white">
                {product.name} ({product.stock_quantity} left)
              </Badge>
            ))}
            {lowStockProducts.length > 5 && (
              <Badge variant="outline" className="bg-white">
                +{lowStockProducts.length - 5} more
              </Badge>
            )}
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1F2235]">
        <Button
          variant={activeTab === "products" ? "default" : "ghost"}
          onClick={() => setActiveTab("products")}
        >
          <Package className="mr-2 h-4 w-4" />
          Products
        </Button>
        <Button
          variant={activeTab === "suppliers" ? "default" : "ghost"}
          onClick={() => setActiveTab("suppliers")}
        >
          <Truck className="mr-2 h-4 w-4" />
          Suppliers
        </Button>
        <Button
          variant={activeTab === "orders" ? "default" : "ghost"}
          onClick={() => setActiveTab("orders")}
        >
          <History className="mr-2 h-4 w-4" />
          Purchase Orders
        </Button>
        <Button
          variant={activeTab === "movements" ? "default" : "ghost"}
          onClick={() => setActiveTab("movements")}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Stock Movements
        </Button>
      </div>

      {/* Products Tab */}
      {activeTab === "products" && (
        <>
          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, brand, or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-[#1F2235] bg-[#1A1D27] pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-600" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-[#1F2235] bg-[#11131E] px-3 py-2 text-sm text-white"
              >
                <option value="all">All Categories</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="tablets">Tablets</option>
                <option value="accessories">Accessories</option>
              </select>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={lowStockOnly}
                  onChange={(e) => setLowStockOnly(e.target.checked)}
                  className="rounded"
                />
                Low Stock Only
              </label>
            </div>
          </div>

          {/* Products Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 border-[#1F2235] bg-[#1A1D27]">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      SKU
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Supplier
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, idx) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-[#1F2235] hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{product.name}</div>
                        <div className="text-xs text-slate-500">{product.brand}</div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{product.sku || "N/A"}</td>
                      <td className="px-6 py-4 text-slate-600">{product.supplier_name || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${product.stock_quantity === 0 ? "text-rose-600" : product.stock_quantity < 5 ? "text-amber-600" : "text-emerald-600"}`}>
                          {product.stock_quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold">£{product.price?.toFixed(2) || "0.00"}</td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            product.stock_quantity === 0
                              ? "bg-rose-100 text-rose-700"
                              : product.stock_quantity < 5
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          }
                        >
                          {product.stock_quantity === 0 ? "Out of Stock" : product.stock_quantity < 5 ? "Low Stock" : "In Stock"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleAddStock(product.id, 1, "Manual adjustment")}>
                            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeductStock(product.id, 1, "Manual adjustment")}>
                            <ArrowDownRight className="h-4 w-4 text-rose-600" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-rose-600" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Suppliers Tab */}
      {activeTab === "suppliers" && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Suppliers</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          </div>
          <div className="space-y-3">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="flex items-center justify-between rounded-lg border border-[#1F2235] p-4">
                <div>
                  <p className="font-medium text-white">{supplier.name}</p>
                  <p className="text-sm text-slate-600">{supplier.email} | {supplier.phone}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-rose-600" />
                  </Button>
                </div>
              </div>
            ))}
            {suppliers.length === 0 && (
              <p className="text-center text-slate-500">No suppliers added yet</p>
            )}
          </div>
        </Card>
      )}

      {/* Purchase Orders Tab */}
      {activeTab === "orders" && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Purchase Orders</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </div>
          <div className="space-y-3">
            {purchaseOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-lg border border-[#1F2235] p-4">
                <div>
                  <p className="font-medium text-white">PO-{order.id}</p>
                  <p className="text-sm text-slate-600">{order.supplier_name} | {order.items?.length || 0} items</p>
                </div>
                <Badge
                  className={
                    order.status === "received"
                      ? "bg-emerald-100 text-emerald-700"
                      : order.status === "pending"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }
                >
                  {order.status}
                </Badge>
              </div>
            ))}
            {purchaseOrders.length === 0 && (
              <p className="text-center text-slate-500">No purchase orders yet</p>
            )}
          </div>
        </Card>
      )}

      {/* Stock Movements Tab */}
      {activeTab === "movements" && (
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">Stock Movements</h3>
          </div>
          <div className="space-y-3">
            {stockMovements.slice(0, 20).map((movement) => (
              <div key={movement.id} className="flex items-center justify-between rounded-lg border border-[#1F2235] p-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${movement.type === "in" ? "bg-emerald-100" : "bg-rose-100"}`}>
                    {movement.type === "in" ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-rose-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{movement.product_name}</p>
                    <p className="text-sm text-slate-600">{movement.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${movement.type === "in" ? "text-emerald-600" : "text-rose-600"}`}>
                    {movement.type === "in" ? "+" : "-"}{movement.quantity}
                  </p>
                  <p className="text-xs text-slate-500">{new Date(movement.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {stockMovements.length === 0 && (
              <p className="text-center text-slate-500">No stock movements recorded</p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
