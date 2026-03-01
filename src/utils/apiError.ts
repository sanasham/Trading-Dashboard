export class ApiError extends Error {
  // 1. Explicitly declare properties
  public readonly statusCode: number;
  public readonly raw?: unknown;

  constructor(
    statusCode: number, // 2. Remove 'public readonly' from parameters
    message: string,
    raw?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';

    // 3. Manually assign the values
    this.statusCode = statusCode;
    this.raw = raw;
  }
}

/** Converts any thrown value into a human-readable string */
export function extractErrorMessage(err: unknown): string {
  if (err instanceof ApiError) return `[${err.statusCode}] ${err.message}`;
  if (err instanceof Error) return err.message;
  return 'An unexpected error occurred';
}
