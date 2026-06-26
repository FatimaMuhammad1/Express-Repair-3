/**
 * Centralized API Configuration
 * 
 * This file provides a single source of truth for API configuration
 * across the entire application. All API calls should use this config
 * to ensure consistency and easy environment management.
 */

export const API_CONFIG = {
  // Base URL for API calls - uses environment variable or falls back to localhost
  BASE_URL: import.meta.env.DEV ? "http://localhost:8000/api" : (import.meta.env.VITE_API_URL || "http://localhost:8000/api"),
  
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
      ME: "/auth/me",
    },
    
    // Repair endpoints
    REPAIRS: {
      ALL: "/repairs/all",
      MY: "/repairs/my",
      TRACK: (id: string) => `/repairs/track/${id}`,
      UPDATE_STATUS: (id: string) => `/repairs/${id}/status`,
      DELETE: (id: string) => `/repairs/${id}`,
      STATS: "/repairs/stats",
      EXPORT_CSV: "/repairs/export/csv",
    },
    
    // Product endpoints
    PRODUCTS: {
      ALL: "/products",
      FOR_SALE: (params?: string) => `/products${params || ""}?is_for_sale=true`,
      BY_CATEGORY: (category: string) => `/products?category=${category}&is_for_sale=true`,
    },
    
    // Contact endpoints
    CONTACT: {
      SUBMIT: "/view/contact",
    },
  },
  
  // Default request options
  DEFAULT_OPTIONS: {
    headers: {
      "Content-Type": "application/json",
    },
  },
} as const;

/**
 * Helper function to build full API URL
 */
export function buildUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}

/**
 * Helper function to get auth headers
 */
export function getAuthHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Helper function to get stored token
 */
export function getStoredToken(): string | null {
  return localStorage.getItem("user_token") || localStorage.getItem("admin_token") || null;
}
