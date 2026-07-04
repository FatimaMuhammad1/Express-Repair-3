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
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddPurchaseOrder, setShowAddPurchaseOrder] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [newPurchaseOrder, setNewPurchaseOrder] = useState({
    supplier_id: "",
    items: [] as Array<{ product_id: string; quantity: number; unit_cost: number }>,
  });

  useEffect(() => {
    fetchInventoryData();
  }, [branchId]);

  const fetchInventoryData = async () => {
    setLoading(true);
    try {
      const [productsRes, suppliersRes, ordersRes, categoriesRes] = await Promise.all([
        fetch(buildUrl(`/api/inventory?branch_id=${branchId === "all" ? "" : branchId}`), { headers: getAuthHeaders() }),
        fetch(buildUrl("/api/suppliers"), { headers: getAuthHeaders() }),
        fetch(buildUrl("/api/purchase-orders"), { headers: getAuthHeaders() }),
        fetch(buildUrl("/api/products/categories"), { headers: getAuthHeaders() }),
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
      if (categoriesRes.ok) {
        const data = await categoriesRes.json();
        setCategories(data.categories || []);
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
      const res = await fetch(buildUrl(`/api/inventory/${productId}/deduct`), {
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
      const res = await fetch(buildUrl(`/api/inventory/${productId}/add`), {
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

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    try {
      const res = await fetch(buildUrl("/api/products/categories"), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      if (res.ok) {
        toast.success("Category added successfully");
        setNewCategory({ name: "", description: "" });
        setShowAddCategory(false);
        fetchInventoryData();
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const res = await fetch(buildUrl(`/api/products/categories/${categoryId}`), {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        toast.success("Category deleted successfully");
        fetchInventoryData();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const handleAddPurchaseOrderItem = () => {
    setNewPurchaseOrder({
      ...newPurchaseOrder,
      items: [...newPurchaseOrder.items, { product_id: "", quantity: 1, unit_cost: 0 }],
    });
  };

  const handleRemovePurchaseOrderItem = (index: number) => {
    setNewPurchaseOrder({
      ...newPurchaseOrder,
      items: newPurchaseOrder.items.filter((_, i) => i !== index),
    });
  };

  const handleUpdatePurchaseOrderItem = (index: number, field: string, value: any) => {
    const updatedItems = [...newPurchaseOrder.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewPurchaseOrder({ ...newPurchaseOrder, items: updatedItems });
  };

  const handleCreatePurchaseOrder = async () => {
    if (!newPurchaseOrder.supplier_id || newPurchaseOrder.items.length === 0) {
      toast.error("Please select a supplier and add at least one item");
      return;
    }
    try {
      const res = await fetch(buildUrl("/api/purchase-orders"), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPurchaseOrder),
      });
      if (res.ok) {
        toast.success("Purchase order created successfully");
        setNewPurchaseOrder({ supplier_id: "", items: [] });
        setShowAddPurchaseOrder(false);
        fetchInventoryData();
      } else {
        toast.error("Failed to create purchase order");
      }
    } catch (error) {
      toast.error("Failed to create purchase order");
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
          <p className="text-slate-400">Manage products, suppliers, and purchase orders</p>
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
          variant={activeTab === "categories" ? "default" : "ghost"}
          onClick={() => setActiveTab("categories")}
        >
          <Filter className="mr-2 h-4 w-4" />
          Categories
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

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <Button onClick={() => setShowAddCategory(!showAddCategory)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
          
          {showAddCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 space-y-3 rounded-lg bg-[#1A1D27] p-4"
            >
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Category Name</label>
                <Input
                  placeholder="e.g., Smartphones, Laptops"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="border-[#1F2235] bg-[#11131E]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Description</label>
                <Input
                  placeholder="Optional description..."
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="border-[#1F2235] bg-[#11131E]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowAddCategory(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddCategory}>
                  Add Category
                </Button>
              </div>
            </motion.div>
          )}

          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between rounded-lg border border-[#1F2235] p-4">
                <div>
                  <p className="font-medium text-white">{category.name}</p>
                  {category.description && (
                    <p className="text-sm text-slate-600">{category.description}</p>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                  <Trash2 className="h-4 w-4 text-rose-600" />
                </Button>
              </div>
            ))}
            {categories.length === 0 && (
              <p className="text-center text-slate-500">No categories added yet</p>
            )}
          </div>
        </Card>
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
            <Button onClick={() => setShowAddPurchaseOrder(!showAddPurchaseOrder)}>
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </div>
          
          {showAddPurchaseOrder && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 space-y-4 rounded-lg bg-[#1A1D27] p-4"
            >
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Supplier</label>
                <Select
                  value={newPurchaseOrder.supplier_id}
                  onValueChange={(value) => setNewPurchaseOrder({ ...newPurchaseOrder, supplier_id: value })}
                >
                  <SelectTrigger className="border-[#1F2235] bg-[#11131E]">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Items</label>
                  <Button variant="outline" size="sm" onClick={handleAddPurchaseOrderItem}>
                    <Plus className="mr-1 h-3 w-3" />
                    Add Item
                  </Button>
                </div>
                {newPurchaseOrder.items.map((item, index) => (
                  <div key={index} className="mb-2 grid gap-2 rounded-lg border border-[#1F2235] p-3">
                    <div className="grid gap-2 md:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-xs text-slate-500">Product</label>
                        <Select
                          value={item.product_id}
                          onValueChange={(value) => handleUpdatePurchaseOrderItem(index, "product_id", value)}
                        >
                          <SelectTrigger className="border-[#1F2235] bg-[#11131E]">
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-slate-500">Quantity</label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdatePurchaseOrderItem(index, "quantity", parseInt(e.target.value) || 1)}
                          className="border-[#1F2235] bg-[#11131E]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-slate-500">Unit Cost (£)</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={item.unit_cost}
                          onChange={(e) => handleUpdatePurchaseOrderItem(index, "unit_cost", parseFloat(e.target.value) || 0)}
                          className="border-[#1F2235] bg-[#11131E]"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePurchaseOrderItem(index)}
                      className="text-rose-600 hover:text-rose-700"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowAddPurchaseOrder(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleCreatePurchaseOrder}>
                  Create Order
                </Button>
              </div>
            </motion.div>
          )}

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

    </div>
  );
}
