# ERP Admin Panel - Comprehensive Audit Report

**Date:** June 27, 2026
**Scope:** Complete end-to-end audit of ERP Admin Panel

---

## CRITICAL ISSUES

### 1. DASHBOARD CONTAINS FAKE/HARDCODED DATA - PRODUCTION BREAKING

**Severity:** CRITICAL
**Impact:** Dashboard shows fabricated numbers that don't reflect actual business data

**Location:** `src/components/admin/MainDashboard.tsx`

**Issues Found:**

#### Hardcoded Business Data (Lines 39-46)
```typescript
const [businessData, setBusinessData] = useState([
  { name: 'Jan', revenue: 15000, profit: 8000, expenses: 7000 },
  { name: 'Feb', revenue: 18000, profit: 9500, expenses: 8500 },
  { name: 'Mar', revenue: 22000, profit: 12000, expenses: 10000 },
  { name: 'Apr', revenue: 19500, profit: 10500, expenses: 9000 },
  { name: 'May', revenue: 25000, profit: 14000, expenses: 11000 },
  { name: 'Jun', revenue: 28000, profit: 15500, expenses: 12500 },
]);
```
**Problem:** Fake monthly revenue/profit data that cannot be traced to actual ERP records

#### Hardcoded Sales Channel Data (Lines 47-51)
```typescript
const [salesChannelData, setSalesChannelData] = useState([
  { name: 'Online Sales', value: 8500, color: '#8B5CF6' },
  { name: 'In-House Sales', value: 6200, color: '#06B6D4' },
  { name: 'Repairs & Services', value: 13300, color: '#22C55E' },
]);
```
**Problem:** Fake sales channel breakdown with fabricated values

#### Hardcoded Repair Status Data (Lines 52-59)
```typescript
const [repairStatusData, setRepairStatusData] = useState([
  { name: 'Received', value: 12, color: '#6366F1' },
  { name: 'Diagnosed', value: 8, color: '#A855F7' },
  { name: 'Repairing', value: 15, color: '#F59E0B' },
  { name: 'Testing', value: 6, color: '#EC4899' },
  { name: 'Collection', value: 9, color: '#22C55E' },
  { name: 'Completed', value: 106, color: '#06B6D4' },
]);
```
**Problem:** Fake repair status counts that don't match actual database records

#### Hardcoded Recent Activities (Lines 60-65)
```typescript
const [recentActivities, setRecentActivities] = useState([
  { id: 1, title: 'New Repair', desc: 'REP-1001 - iPhone 14 Screen', time: '2m ago', icon: Wrench, bg: 'bg-amber-500/20', color: 'text-amber-500' },
  { id: 2, title: 'Payment Received', desc: '£89.99 - Online Sale', time: '15m ago', icon: DollarSign, bg: 'bg-emerald-500/20', color: 'text-emerald-500' },
  { id: 3, title: 'Booking Confirmed', desc: 'Alice Thompson - 09:00', time: '1h ago', icon: Calendar, bg: 'bg-blue-500/20', color: 'text-blue-500' },
  { id: 4, title: 'Stock Alert', desc: 'iPhone 14 Screen low stock', time: '2h ago', icon: Package, bg: 'bg-rose-500/20', color: 'text-rose-500' },
]);
```
**Problem:** Fake activity log with fabricated events

#### Hardcoded Top Selling Items (Lines 66-71)
```typescript
const [topSellingItems, setTopSellingItems] = useState([
  { id: 1, name: 'iPhone 14 Screen', sold: 45, revenue: '£4,050', icon: '📱' },
  { id: 2, name: 'iPhone 13 Screen', sold: 38, revenue: '£3,040', icon: '📱' },
  { id: 3, name: 'USB-C Charger', sold: 62, revenue: '£1,550', icon: '🔌' },
  { id: 4, name: 'Lightning Cable', sold: 89, revenue: '£1,335', icon: '🔌' },
]);
```
**Problem:** Fake top-selling products with fabricated sales counts and revenue

#### Hardcoded Low Stock Alerts (Lines 72-76)
```typescript
const [lowStockAlerts, setLowStockAlerts] = useState([
  { id: 1, name: 'iPhone 14 Screen', stock: 3, reorder: 10 },
  { id: 2, name: 'Samsung S23 Screen', stock: 4, reorder: 10 },
  { id: 3, name: 'iPhone Battery', stock: 5, reorder: 15 },
]);
```
**Problem:** Fake low stock alerts that don't reflect actual inventory levels

#### Hardcoded Branches (Lines 81-85)
```typescript
const [branches, setBranches] = useState<any[]>([
  { id: '1', name: 'Nuneaton Main' },
  { id: '2', name: 'Coventry' },
  { id: '3', name: 'Leicester' },
]);
```
**Problem:** Fake branch data that may not match actual database

#### Hardcoded Stats (Lines 87-99)
```typescript
const [stats, setStats] = useState({
  totalRevenue: 28000,
  todaySales: 1470,
  repairsInProgress: 41,
  lowStockCount: 3,
  totalProfit: 15500,
  totalCustomers: 156,
  totalSalesOrders: 89,
  totalPurchases: 24,
  totalInventoryValue: 12500,
  outstandingReceivables: 3200,
  outstandingPayables: 1800
});
```
**Problem:** All dashboard KPIs are fake numbers

**Root Cause:** The component initializes with hardcoded data and only attempts to fetch real data in `fetchDashboardData()`, but the initial state shows fake data immediately on load.

**Recommendation:**
1. Initialize all state with empty arrays/objects
2. Show loading state while fetching data
3. Only display data after successful API response
4. Add proper empty states when no data exists
5. Remove all hardcoded placeholder values

---

### 2. ADMIN PANEL CONTAINS HARDCODED PLACEHOLDER DATA

**Severity:** CRITICAL
**Impact:** Admin panel shows fabricated data that doesn't reflect actual ERP records

**Location:** `src/routes/admin.tsx`

**Issues Found:**

#### Hardcoded Repairs Array (Lines 139-145)
```typescript
const [repairs, setRepairs] = useState<any[]>([
  { id: "1", tracking_id: "REP-1001", customer_name: "Alice Thompson", customer_phone: "07700 100001", device_model: "iPhone 14", issue_description: "Screen cracked", status: "received", estimated_cost: 89.99, created_at: new Date().toISOString() },
  { id: "2", tracking_id: "REP-1002", customer_name: "Bob Wilson", customer_phone: "07700 100002", device_model: "iPhone 13", issue_description: "Battery replacement", status: "diagnosed", estimated_cost: 49.99, created_at: new Date(Date.now() - 86400000).toISOString() },
  // ... more fake data
]);
```
**Problem:** Fake repair records that don't exist in database

#### Hardcoded Stats (Lines 147-154)
```typescript
const [stats, setStats] = useState<any>({
  total_repairs: 156,
  pending_repairs: 12,
  completed_repairs: 134,
  // ... more fake stats
});
```
**Problem:** Fake statistics

#### Hardcoded Products Array (Lines 222-228)
```typescript
const [products, setProducts] = useState<any[]>([
  { id: "1", name: "iPhone 14 Screen", category: "Screens", brand: "Apple", model: "iPhone 14", price: 89.99, stock_quantity: 25 },
  // ... more fake products
]);
```
**Problem:** Fake product inventory

#### Hardcoded Staff Array (Lines 240-244)
```typescript
const [staff, setStaff] = useState<any[]>([
  { id: "1", name: "John Smith", email: "john@fixora.co.uk", phone: "07700 900001", role: "staff" },
  { id: "2", name: "Sarah Johnson", email: "sarah@fixora.co.uk", phone: "07700 900002", role: "SUPER_ADMIN" },
  { id: "3", name: "Mike Williams", email: "mike@fixora.co.uk", phone: "07700 900003", role: "staff" },
]);
```
**Problem:** Fake staff members

#### Hardcoded Bookings Array (Lines 262-266)
```typescript
const [bookings, setBookings] = useState<any[]>([
  { id: "1", customer_name: "Alice Thompson", phone: "07700 100001", branch_id: "branch1", preferred_date: new Date().toISOString().split('T')[0], preferred_time_slot: "09:00", status: "confirmed", issue_description: "Screen Repair" },
  // ... more fake bookings
]);
```
**Problem:** Fake booking records

#### Hardcoded Expenses Array (Lines 282-286)
```typescript
const [expenses, setExpenses] = useState<any[]>([
  { id: "1", category: "Rent", description: "Monthly rent payment", amount: 1200.00, date: new Date().toISOString().split('T')[0] },
  // ... more fake expenses
]);
```
**Problem:** Fake expense records

#### Hardcoded Revenue Data (Lines 290-294)
```typescript
const [revenueData, setRevenueData] = useState<any[]>([
  { id: "1", source: "Repairs", description: "Screen repair revenue", amount: 2500.00, date: new Date().toISOString().split('T')[0], status: "received" },
  // ... more fake revenue
]);
```
**Problem:** Fake revenue records

**Recommendation:**
1. Initialize all state with empty arrays/objects
2. Remove all hardcoded placeholder data
3. Show loading states while fetching
4. Add proper empty states when no data exists
5. Ensure data is only displayed after successful API fetch

---

## FUNCTIONAL BUGS

### 3. Data Fetching Functions May Not Be Called Properly

**Severity:** HIGH
**Impact:** Data may not load when switching between sections

**Location:** `src/routes/admin.tsx`

**Issue:** While `useEffect` hooks exist to fetch data when sections become active, the initial state contains fake data that displays immediately before any fetch completes.

**Example (Lines 940-944):**
```typescript
useEffect(() => {
  if (activeSection === "inventory") {
    fetchProducts();
  }
}, [activeSection]);
```

**Problem:** This only fetches when switching to inventory section, but the component initializes with fake products data.

**Recommendation:**
1. Initialize with empty state
2. Fetch data on component mount for dashboard
3. Fetch data when section changes
4. Show loading indicators during fetch
5. Handle errors gracefully

---

### 4. Technician Assignment Function Does Nothing

**Severity:** HIGH
**Impact:** Technician assignment UI exists but doesn't actually update the backend

**Location:** `src/routes/admin.tsx` (Lines 588-593)

```typescript
const updateTechnician = async (trackingId: string, technicianId: string) => {
  // Technician assignment removed - simplified to staff/SUPER_ADMIN only
  setRepairs(prev => prev.map(r =>
    r.tracking_id === trackingId ? { ...r, technician_id: technicianId || null } : r
  ));
};
```

**Problem:** The function only updates local state and has a comment saying it was removed. It doesn't make any API call to the backend.

**Recommendation:**
1. Either remove the technician assignment UI entirely
2. Or restore the API call to actually update the backend
3. Update the comment to reflect current functionality
4. If keeping local-only, remove the `async` keyword

---

## API ISSUES

### 5. Missing API Endpoints

**Severity:** HIGH
**Impact:** Frontend calls endpoints that may not exist or return incorrect data

**Location:** Various

**Potential Issues:**
- `/finance/stats` - Called by MainDashboard but needs verification
- `/branches` - Called by MainDashboard but needs verification
- `/repairs/stats` - Called by MainDashboard but needs verification
- `/customers` - Called by admin.tsx but needs verification
- `/inventory/movements` - Called by admin.tsx but needs verification
- `/suppliers` - Called by admin.tsx but needs verification
- `/inventory/purchases` - Called by admin.tsx but needs verification
- `/inventory/orders` - Called by admin.tsx but needs verification
- `/communications/history` - Called by admin.tsx but needs verification
- `/financials/profit-loss` - Called by admin.tsx but needs verification
- `/financials/cash-flow` - Called by admin.tsx but needs verification
- `/financials/repair-tracking` - Called by admin.tsx but needs verification

**Recommendation:**
1. Verify each endpoint exists in backend
2. Test each endpoint returns correct data structure
3. Add error handling for missing endpoints
4. Document all available endpoints

---

## UI/UX ISSUES

### 6. No Loading States

**Severity:** MEDIUM
**Impact:** Users see fake data immediately, confusing them about what's real

**Location:** Throughout admin.tsx and MainDashboard.tsx

**Problem:** Components display fake data immediately on load without showing loading indicators.

**Recommendation:**
1. Add loading skeletons or spinners
2. Show loading state during data fetch
3. Only show data after successful fetch
4. Add error states for failed fetches

---

### 7. No Empty States

**Severity:** MEDIUM
**Impact:** When database is empty, users see fake data instead of empty states

**Location:** Throughout admin.tsx and MainDashboard.tsx

**Problem:** No empty state components when no data exists.

**Recommendation:**
1. Create empty state components
2. Show empty states when arrays are empty
3. Add helpful messages for empty states
4. Add call-to-action buttons in empty states

---

## BUSINESS LOGIC ISSUES

### 8. Dashboard Metrics Not Calculated from Real Data

**Severity:** CRITICAL
**Impact:** Business decisions made based on fake data

**Location:** `src/components/admin/MainDashboard.tsx`

**Problem:** All dashboard metrics are hardcoded and not calculated from actual ERP transactions.

**Metrics Affected:**
- Total Revenue
- Total Profit
- Total Expenses
- Today's Sales
- Repairs In Progress
- Low Stock Count
- Total Customers
- Total Sales Orders
- Total Purchases
- Total Inventory Value
- Outstanding Receivables
- Outstanding Payables

**Recommendation:**
1. Calculate all metrics from actual database records
2. Use aggregation queries for accurate totals
3. Update metrics in real-time as transactions occur
4. Add date range filtering for time-based metrics
5. Cache calculations for performance

---

### 9. Customer Data Derived Only from Repairs

**Severity:** MEDIUM
**Impact:** Customer list incomplete - missing customers who only made purchases

**Location:** `src/routes/admin.tsx` (Lines 701-741)

```typescript
const customers = Array.from(
  new Map(
    repairs.map((r) => [
      r.customer_phone,
      {
        name: r.customer_name,
        phone: r.customer_phone,
        repairCount: repairs.filter(
          (rep) => rep.customer_phone === r.customer_phone,
        ).length,
        lastRepair: repairs
          .filter((rep) => rep.customer_phone === r.customer_phone)
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )[0]?.created_at,
      },
    ]),
  ).values(),
).sort((a, b) => b.repairCount - a.repairCount);
```

**Problem:** Customers are only derived from repair records, not from sales or other customer interactions.

**Recommendation:**
1. Fetch customers from dedicated customers endpoint
2. Include customers from sales, repairs, and bookings
3. Maintain proper customer records in database
4. Link all transactions to customer records

---

## DATA INTEGRITY ISSUES

### 10. Fake Data Persists Until API Fetch Completes

**Severity:** HIGH
**Impact:** Users see fake data before real data loads

**Location:** Throughout admin.tsx and MainDashboard.tsx

**Problem:** Components initialize with fake data, which displays immediately. Only after API fetch completes (if successful) is it replaced with real data.

**Recommendation:**
1. Initialize with empty state
2. Show loading state during fetch
3. Only display data after successful fetch
4. Add error handling for failed fetches
5. Add retry mechanism for failed fetches

---

## PERFORMANCE ISSUES

### 11. Multiple useEffect Hooks Without Dependencies

**Severity:** LOW
**Impact:** Potential unnecessary re-renders

**Location:** `src/routes/admin.tsx`

**Problem:** Many useEffect hooks only depend on `activeSection`, which could cause unnecessary fetches if not properly memoized.

**Recommendation:**
1. Review all useEffect dependencies
2. Add proper dependency arrays
3. Use useCallback for fetch functions
4. Consider using React Query or SWR for data fetching

---

## RECOMMENDATIONS SUMMARY

### Immediate Actions (Critical)

1. **Remove all hardcoded/fake data** from MainDashboard.tsx and admin.tsx
2. **Initialize all state with empty arrays/objects**
3. **Add loading states** for all data fetching operations
4. **Add empty states** for when no data exists
5. **Verify all API endpoints** exist and return correct data
6. **Calculate dashboard metrics** from actual database records

### Short-term Actions (High Priority)

7. **Fix technician assignment** - either remove UI or restore API call
8. **Add error handling** for all API calls
9. **Implement proper customer management** - fetch from customers endpoint
10. **Add data validation** - ensure metrics match database records

### Long-term Actions (Medium Priority)

11. **Implement React Query or SWR** for better data fetching
12. **Add data caching** for performance
13. **Implement real-time updates** for dashboard metrics
14. **Add audit logging** for all data changes
15. **Implement proper testing** for all components

---

## CONCLUSION

The ERP Admin Panel has **CRITICAL DATA INTEGRITY ISSUES** due to extensive use of hardcoded/fake placeholder data throughout the application. The dashboard and admin panel display fabricated numbers that cannot be traced to actual ERP records, making it unsuitable for production use.

**Key Findings:**
- 10+ instances of hardcoded fake data in MainDashboard.tsx
- 8+ instances of hardcoded fake data in admin.tsx
- All dashboard KPIs are fake numbers
- No loading states or empty states
- Multiple API endpoints need verification
- Business logic incomplete (technician assignment broken)

**Priority:** CRITICAL - Must be fixed before production deployment

**Estimated Fix Time:** 4-6 hours for critical issues, 2-3 days for complete resolution
