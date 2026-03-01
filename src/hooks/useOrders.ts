// ─────────────────────────────────────────────────────────────────────────────
// src/hooks/useOrders.ts
//
// Custom hook that wraps ordersApi.getOrders().
// Handles: loading state, error state, cancellation, refresh.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from 'react';
import { ordersApi } from '../api';
import type {
  AsyncState,
  Order,
  OrdersQueryParams,
  PaginatedResponse,
} from '../types';
import { extractErrorMessage } from '../utils/apiError';

interface UseOrdersResult {
  state: AsyncState<PaginatedResponse<Order>>;
  refresh: () => void;
}

export function useOrders(params: OrdersQueryParams): UseOrdersResult {
  const [state, setState] = useState<AsyncState<PaginatedResponse<Order>>>({
    status: 'idle',
  });

  const [tick, setTick] = useState(0);
  const refresh = useCallback(() => setTick((n) => n + 1), []);

  // 1. Track the last "trigger" (params + tick) to detect changes during render
  const currentTrigger = JSON.stringify(params) + tick;
  const [prevTrigger, setPrevTrigger] = useState(currentTrigger);

  // 2. Adjust state synchronously DURING render to avoid the effect-induced cascade
  if (currentTrigger !== prevTrigger) {
    setPrevTrigger(currentTrigger);
    setState({ status: 'loading' });
  }

  useEffect(() => {
    const controller = new AbortController();

    ordersApi
      .getOrders(params)
      .then((data) => {
        if (!controller.signal.aborted) {
          setState({ status: 'success', data });
        }
      })
      .catch((err: unknown) => {
        if (!controller.signal.aborted) {
          setState({ status: 'error', error: extractErrorMessage(err) });
        }
      });

    // ✅ Correct: Return cleanup from the top level of useEffect
    return () => {
      controller.abort();
    };
  }, [currentTrigger]);

  return { state, refresh };
}
