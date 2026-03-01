// ─────────────────────────────────────────────────────────────────────────────
// src/api/mock/mockAdapter.ts
//
// Implements the same interface as the real API service but resolves data
// from the in-memory mock database.  Zero network calls are made.
//
// To swap to a real backend:
//   Set VITE_USE_MOCK=false in .env.production — the app will automatically
//   use realOrdersService (httpClient-based) instead of this file.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  Order,
  OrderHistoryEvent,
  OrdersQueryParams,
  PaginatedResponse,
} from '../../types';
import { MOCK_ORDERS, MOCK_ORDER_HISTORY, defaultHistory } from './mockDatabase';
import { mockDelay } from './mockDelay';

// ── Helpers ───────────────────────────────────────────────────────────────────

function applyFilters(orders: Order[], params: OrdersQueryParams): Order[] {
  let result = [...orders];

  if (params.instrument) {
    result = result.filter((o) => o.instrument === params.instrument);
  }
  if (params.side) {
    result = result.filter((o) => o.side === params.side);
  }
  if (params.status) {
    result = result.filter((o) => o.status === params.status);
  }
  if (params.symbol) {
    result = result.filter((o) =>
      o.symbol.toLowerCase().includes(params.symbol!.toLowerCase()),
    );
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter((o) =>
      Object.values(o).some((v) => String(v).toLowerCase().includes(q)),
    );
  }

  return result;
}

function applySort(orders: Order[], params: OrdersQueryParams): Order[] {
  if (!params.sortBy) return orders;
  const key  = params.sortBy;
  const mult = params.sortDir === 'desc' ? -1 : 1;
  return [...orders].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return cmp * mult;
  });
}

function paginate<T>(items: T[], page = 1, pageSize = 50): PaginatedResponse<T> {
  const total      = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const start      = (page - 1) * pageSize;
  const data       = items.slice(start, start + pageSize);
  return { data, total, page, pageSize, totalPages };
}

// ── Mock API methods ──────────────────────────────────────────────────────────

export const mockOrdersService = {
  /**
   * GET /orders
   * Returns a paginated, filtered, sorted list of orders.
   */
  async getOrders(
    params: OrdersQueryParams = {},
  ): Promise<PaginatedResponse<Order>> {
    await mockDelay();
    const filtered = applyFilters(MOCK_ORDERS, params);
    const sorted   = applySort(filtered, params);
    return paginate(sorted, params.page, params.pageSize);
  },

  /**
   * GET /orders/:id
   * Returns a single order by its `id` field.
   */
  async getOrderById(id: string): Promise<Order> {
    await mockDelay();
    const order = MOCK_ORDERS.find((o) => o.id === id);
    if (!order) throw new Error(`Order ${id} not found`);
    return order;
  },

  /**
   * GET /orders/:id/history
   * Returns the audit trail / event history for an order.
   */
  async getOrderHistory(id: string): Promise<OrderHistoryEvent[]> {
    await mockDelay();
    const order = MOCK_ORDERS.find((o) => o.id === id);
    if (!order) throw new Error(`Order ${id} not found`);
    const orderId = order.orderId;
    return MOCK_ORDER_HISTORY[orderId] ?? defaultHistory(order);
  },
};
