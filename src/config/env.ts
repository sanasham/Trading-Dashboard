// ─────────────────────────────────────────────────────────────────────────────
// src/config/env.ts
//
// Single place to manage environment-specific values.
// Vite exposes variables prefixed with VITE_ from .env files.
//
// To switch to a real API:
//   1. Create a `.env.production` file at the project root
//   2. Set:  VITE_API_BASE_URL=https://your-api.example.com/api/v1
//            VITE_USE_MOCK=false
// ─────────────────────────────────────────────────────────────────────────────

export const ENV = {
  /** Base URL for all API requests. Falls back to empty string (relative) */
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? '',

  /** When true, all API calls resolve against the mock adapter instead of
   *  making real network requests. Defaults to true in development. */
  USE_MOCK: (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true',

  /** Simulated network latency in milliseconds (only used by mock adapter) */
  MOCK_DELAY_MS: Number(import.meta.env.VITE_MOCK_DELAY_MS ?? 400),

  /** Whether we are running in production mode */
  IS_PROD: import.meta.env.PROD,
} as const;
