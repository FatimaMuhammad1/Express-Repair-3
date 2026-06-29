import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./router-Dwa750EE.mjs";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const API_CONFIG = {
  // Base URL for API calls - uses environment variable or falls back to localhost
  BASE_URL: "http://localhost:8000/api",
  // API endpoints
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      LOGIN: "/auth/login",
      SIGNUP: "/auth/signup",
      GOOGLE: "/auth/google",
      VERIFY_EMAIL: "/auth/verify-email",
      FORGOT_PASSWORD: "/auth/forgot-password",
      RESET_PASSWORD: "/auth/reset-password",
      RESEND_VERIFICATION: "/auth/resend-verification",
      ME: "/auth/me"
    },
    // Repair endpoints
    REPAIRS: {
      ALL: "/repairs/all",
      MY: "/repairs/my",
      TRACK: (id) => `/repairs/track/${id}`,
      UPDATE_STATUS: (id) => `/repairs/${id}/status`,
      DELETE: (id) => `/repairs/${id}`,
      STATS: "/repairs/stats",
      EXPORT_CSV: "/repairs/export/csv"
    },
    // Product endpoints
    PRODUCTS: {
      ALL: "/products",
      FOR_SALE: (params) => `/products${params || ""}?is_for_sale=true`,
      BY_CATEGORY: (category) => `/products?category=${category}&is_for_sale=true`
    },
    // Finance endpoints
    FINANCE: {
      STATS: "/finance/stats",
      TRANSACTIONS: "/finance/transactions",
      EXPENSES: "/finance/expenses",
      REVENUE: "/finance/revenue",
      ONLINE_SALES: "/finance/online-sales",
      INHOUSE_SALES: "/finance/inhouse-sales",
      REPORTS: "/finance/reports"
    },
    // Inventory endpoints
    INVENTORY: {
      SUPPLIERS: "/inventory/suppliers",
      STOCK_MOVEMENTS: "/inventory/stock-movements",
      IMPORT_EXCEL: "/inventory/import/excel"
    },
    // Branch endpoints
    BRANCHES: "/branches",
    // Customer endpoints
    CUSTOMERS: "/customers",
    // Contact endpoints
    CONTACT: {
      SUBMIT: "/view/contact"
    }
  },
  // Default request options
  DEFAULT_OPTIONS: {
    headers: {
      "Content-Type": "application/json"
    }
  }
};
function buildUrl(endpoint) {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}
function getAuthHeaders(token) {
  const headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}
function getStoredToken() {
  return localStorage.getItem("user_token") || localStorage.getItem("admin_token") || null;
}
export {
  API_CONFIG as A,
  Badge as B,
  getAuthHeaders as a,
  buildUrl as b,
  getStoredToken as g
};
