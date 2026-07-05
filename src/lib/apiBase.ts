/**
 * Central API Base URL Configuration
 * 
 * Provides environment-aware API base URL:
 * - Development: http://localhost:8000/api
 * - Production: /api (relative path for Nginx proxy)
 */

export const API_BASE = import.meta.env.PROD ? "/api" : "http://localhost:8000/api";
