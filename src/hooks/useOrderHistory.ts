// ─────────────────────────────────────────────────────────────────────────────
// src/hooks/useOrderHistory.ts
//
// Fetches the event history for a single order.
// Only fires when orderId is non-null.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react';
import { ordersApi } from '../api';
import type { AsyncState, OrderHistoryEvent } from '../types';
import { extractErrorMessage } from '../utils/apiError';

export function useOrderHistory(
  orderId: string | null,
): AsyncState<OrderHistoryEvent[]> {
  const [state, setState] = useState<AsyncState<OrderHistoryEvent[]>>({
    status: 'idle',
  });

  // 1. Handle the "idle" state reset during rendering, not in an effect
  const [prevOrderId, setPrevOrderId] = useState(orderId);
  if (orderId !== prevOrderId) {
    setPrevOrderId(orderId);
    setState({ status: orderId ? 'loading' : 'idle' });
  }

  useEffect(() => {
    if (!orderId) return;

    const controller = new AbortController();
    // 2. The 'loading' state is already set above during render if the ID changed

    ordersApi
      .getOrderHistory(orderId)
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

    return () => controller.abort();
  }, [orderId]);

  return state;
}
