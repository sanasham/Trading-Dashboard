// ─────────────────────────────────────────────────────────────────────────────
// src/api/index.ts  ← ONLY file the rest of the app imports from
//
// Reads VITE_USE_MOCK from the environment and exports the correct
// implementation.  No other file in the codebase ever imports from
// mockAdapter or ordersService directly.
//
// ┌─────────────────────────────────────────────────────────────────┐
// │  VITE_USE_MOCK=true  →  mockOrdersService  (local, no network)  │
// │  VITE_USE_MOCK=false →  realOrdersService  (real HTTP calls)    │
// └─────────────────────────────────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────

import { ENV } from '../config/env';
import { mockOrdersService } from './mock/mockAdapter';
import { realOrdersService } from './ordersService';

export const ordersApi = ENV.USE_MOCK ? mockOrdersService : realOrdersService;

// Re-export everything needed by consumers
export type { OrdersQueryParams, PaginatedResponse } from '../types';
export { httpClient, setAuthToken, clearAuthToken } from './httpClient';
