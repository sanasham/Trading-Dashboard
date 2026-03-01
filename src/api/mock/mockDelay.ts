import { ENV } from '../../config/env';

/** Simulates real network latency in the mock adapter */
export const mockDelay = (ms = ENV.MOCK_DELAY_MS): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
