import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    redis = new Redis({ url, token });
    return redis;
  }
  return null;
}

export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60
): Promise<{ success: boolean; remaining: number }> {
  const r = getRedis();
  if (!r) return { success: true, remaining: limit };

  const key = `rate_limit:${identifier}`;
  const current = await r.incr(key);

  if (current === 1) {
    await r.expire(key, windowSeconds);
  }

  return {
    success: current <= limit,
    remaining: Math.max(0, limit - current),
  };
}
