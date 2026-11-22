import "server-only";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export interface RateLimiter {
  check(key: string): RateLimitResult;
}

/**
 * In-memory sliding-window rate limiter suitable for single-instance
 * development and initial deployment. Swap with Upstash Redis or Vercel KV
 * before high-traffic production launch.
 */
const globalStore = globalThis as typeof globalThis & {
  __blacksteelRateLimitStore?: Map<string, RateLimitEntry>;
};

const store =
  globalStore.__blacksteelRateLimitStore ??
  (globalStore.__blacksteelRateLimitStore = new Map<string, RateLimitEntry>());

export function createMemoryRateLimiter(opts: {
  maxRequests: number;
  windowMs: number;
}): RateLimiter {
  return {
    check(key: string): RateLimitResult {
      const now = Date.now();
      const existing = store.get(key);

      if (!existing || existing.resetAt <= now) {
        const next: RateLimitEntry = {
          count: 1,
          resetAt: now + opts.windowMs,
        };
        store.set(key, next);
        return {
          allowed: true,
          remaining: opts.maxRequests - 1,
          resetAt: next.resetAt,
        };
      }

      if (existing.count >= opts.maxRequests) {
        return {
          allowed: false,
          remaining: 0,
          resetAt: existing.resetAt,
        };
      }

      existing.count += 1;
      store.set(key, existing);

      return {
        allowed: true,
        remaining: opts.maxRequests - existing.count,
        resetAt: existing.resetAt,
      };
    },
  };
}

export function extractClientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "local-client";
}
