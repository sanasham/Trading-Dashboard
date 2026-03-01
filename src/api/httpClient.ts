// ─────────────────────────────────────────────────────────────────────────────
// src/api/httpClient.ts
//
// Lightweight fetch wrapper that handles:
//   • Base URL injection
//   • Auth token attachment (Bearer)
//   • Unified error parsing
//   • Request / response interceptors (extensible)
//   • AbortController support for cancellation
// ─────────────────────────────────────────────────────────────────────────────

import { ENV } from '../config/env';
import { ApiError } from '../utils/apiError';

// ── Token store (swap out for your auth provider) ────────────────────────────
let authToken: string | null = null;
export const setAuthToken  = (token: string) => { authToken = token; };
export const clearAuthToken = ()              => { authToken = null;  };

// ── Request options ───────────────────────────────────────────────────────────
export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /** If provided, the request will be aborted when the signal fires */
  signal?: AbortSignal;
}

// ── Core request function ─────────────────────────────────────────────────────
async function request<T>(
  method: string,
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, signal, headers: extraHeaders, ...rest } = options;

  const url = `${ENV.API_BASE_URL}${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept:         'application/json',
    ...(extraHeaders as Record<string, string>),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body:   body !== undefined ? JSON.stringify(body) : undefined,
    signal,
    ...rest,
  });

  // Parse body regardless of status (server may return error JSON)
  let json: unknown;
  try {
    json = await response.json();
  } catch {
    json = null;
  }

  if (!response.ok) {
    const message =
      (json as { message?: string })?.message ??
      response.statusText ??
      'Unknown error';
    throw new ApiError(response.status, message, json);
  }

  return json as T;
}

// ── HTTP verb helpers ─────────────────────────────────────────────────────────
export const httpClient = {
  get: <T>(path: string, opts?: RequestOptions)                      => request<T>('GET',    path, opts),
  post:<T>(path: string, body?: unknown, opts?: RequestOptions)      => request<T>('POST',   path, { ...opts, body }),
  put: <T>(path: string, body?: unknown, opts?: RequestOptions)      => request<T>('PUT',    path, { ...opts, body }),
  patch:<T>(path: string, body?: unknown, opts?: RequestOptions)     => request<T>('PATCH',  path, { ...opts, body }),
  delete:<T>(path: string, opts?: RequestOptions)                    => request<T>('DELETE', path, opts),
};
