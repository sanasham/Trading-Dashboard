// ─────────────────────────────────────────────────────────────────────────────
// src/api/ordersService.ts
//
// Real HTTP implementation — mirrors the same interface as mockOrdersService.
// When VITE_USE_MOCK=false this service is used automatically.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  Order,
  OrderHistoryEvent,
  OrdersQueryParams,
  PaginatedResponse,
} from '../types';
import { httpClient } from './httpClient';

/** Build a query-string from an object, skipping undefined values */
function buildQuery(params: Record<string, unknown>): string {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return qs ? `?${qs}` : '';
}

export const realOrdersService = {
  async getOrders(
    params: OrdersQueryParams = {},
  ): Promise<PaginatedResponse<Order>> {
    const qs = buildQuery(params as Record<string, unknown>);
    return httpClient.get<PaginatedResponse<Order>>(`/orders${qs}`);
  },

  async getOrderById(id: string): Promise<Order> {
    return httpClient.get<Order>(`/orders/${id}`);
  },

  async getOrderHistory(id: string): Promise<OrderHistoryEvent[]> {
    return httpClient.get<OrderHistoryEvent[]>(`/orders/${id}/history`);
  },
};
