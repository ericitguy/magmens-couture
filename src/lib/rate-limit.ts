/**
 * A small in-memory rate limiter for the enquiry endpoints.
 *
 * This complements — rather than replaces — a honeypot field and a
 * minimum-time trap. It is intentionally conservative about what it claims:
 * the counter lives in the memory of a single server instance, so on a
 * multi-instance deployment it slows abuse down per instance instead of
 * enforcing a global limit. A durable store (Redis, Postgres) is the upgrade
 * path when traffic justifies it.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_ENTRIES = 5000;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= MAX_ENTRIES) {
      for (const [bucketKey, bucket] of buckets) {
        if (bucket.resetAt <= now) buckets.delete(bucketKey);
      }
      // Still full: drop the oldest entry so memory stays bounded.
      if (buckets.size >= MAX_ENTRIES) {
        const oldest = buckets.keys().next();
        if (!oldest.done) buckets.delete(oldest.value);
      }
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  const allowed = existing.count <= limit;

  return {
    allowed,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds: allowed
      ? 0
      : Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

/** A stable, non-reversible client key derived from the request headers. */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  const agent = request.headers.get("user-agent") ?? "";
  return `${ip}:${agent.slice(0, 60)}`;
}
