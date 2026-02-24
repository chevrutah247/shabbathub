import { Redis } from '@upstash/redis';

type GuardResult = {
  allowed: boolean;
  retryAfterSec?: number;
};

type Policy = {
  maxFailures: number;
  windowSeconds: number;
  blockSeconds: number;
};

type CounterState = {
  count: number;
  expiresAt: number;
};

let redis: Redis | null = null;
const memoryCounters = new Map<string, CounterState>();

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
}

function nowSec(): number {
  return Math.floor(Date.now() / 1000);
}

function cleanupMemoryKey(key: string): void {
  const item = memoryCounters.get(key);
  if (!item) return;
  if (item.expiresAt <= nowSec()) memoryCounters.delete(key);
}

function setMemoryKey(key: string, count: number, ttlSec: number): void {
  memoryCounters.set(key, { count, expiresAt: nowSec() + ttlSec });
}

function getMemoryKey(key: string): CounterState | null {
  cleanupMemoryKey(key);
  return memoryCounters.get(key) || null;
}

function sanitizeKeyPart(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9@._:-]+/g, '_');
}

function requestIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

function loginFailKeyEmail(email: string): string {
  return `auth:login:fail:email:${sanitizeKeyPart(email)}`;
}

function loginFailKeyIp(ip: string): string {
  return `auth:login:fail:ip:${sanitizeKeyPart(ip)}`;
}

function loginBlockKeyEmail(email: string): string {
  return `auth:login:block:email:${sanitizeKeyPart(email)}`;
}

function loginBlockKeyIp(ip: string): string {
  return `auth:login:block:ip:${sanitizeKeyPart(ip)}`;
}

function signupAttemptKeyEmail(email: string): string {
  return `auth:signup:attempt:email:${sanitizeKeyPart(email)}`;
}

function signupAttemptKeyIp(ip: string): string {
  return `auth:signup:attempt:ip:${sanitizeKeyPart(ip)}`;
}

function signupBlockKeyEmail(email: string): string {
  return `auth:signup:block:email:${sanitizeKeyPart(email)}`;
}

function signupBlockKeyIp(ip: string): string {
  return `auth:signup:block:ip:${sanitizeKeyPart(ip)}`;
}

async function incrWithTtl(key: string, ttlSec: number): Promise<number> {
  const r = getRedis();
  if (r) {
    const n = await r.incr(key);
    if (n === 1) await r.expire(key, ttlSec);
    return Number(n) || 0;
  }

  const current = getMemoryKey(key);
  if (!current) {
    setMemoryKey(key, 1, ttlSec);
    return 1;
  }
  current.count += 1;
  memoryCounters.set(key, current);
  return current.count;
}

async function setBlock(key: string, blockSec: number): Promise<void> {
  const r = getRedis();
  if (r) {
    await r.set(key, 1, { ex: blockSec });
    return;
  }
  setMemoryKey(key, 1, blockSec);
}

async function getBlockTtl(key: string): Promise<number> {
  const r = getRedis();
  if (r) {
    const exists = await r.exists(key);
    if (!exists) return 0;
    const ttl = await r.ttl(key);
    return Math.max(0, Number(ttl) || 0);
  }
  const item = getMemoryKey(key);
  if (!item) return 0;
  return Math.max(0, item.expiresAt - nowSec());
}

async function delKeys(keys: string[]): Promise<void> {
  const r = getRedis();
  if (r) {
    if (keys.length > 0) await r.del(...keys);
    return;
  }
  for (const k of keys) memoryCounters.delete(k);
}

export function loginPolicy(): Policy {
  return {
    maxFailures: Number(process.env.AUTH_LOGIN_MAX_FAILURES || 3),
    windowSeconds: Number(process.env.AUTH_LOGIN_WINDOW_SECONDS || 3600),
    blockSeconds: Number(process.env.AUTH_LOGIN_BLOCK_SECONDS || 3600),
  };
}

function signupPolicy(): Policy {
  return {
    maxFailures: Number(process.env.AUTH_SIGNUP_MAX_ATTEMPTS || 5),
    windowSeconds: Number(process.env.AUTH_SIGNUP_WINDOW_SECONDS || 3600),
    blockSeconds: Number(process.env.AUTH_SIGNUP_BLOCK_SECONDS || 3600),
  };
}

export async function ensureLoginAllowed(
  email: string,
  request: Request
): Promise<GuardResult> {
  const ip = requestIp(request);
  const [emailTtl, ipTtl] = await Promise.all([
    getBlockTtl(loginBlockKeyEmail(email)),
    getBlockTtl(loginBlockKeyIp(ip)),
  ]);
  const retryAfterSec = Math.max(emailTtl, ipTtl);
  if (retryAfterSec > 0) return { allowed: false, retryAfterSec };
  return { allowed: true };
}

export async function recordLoginFailure(
  email: string,
  request: Request
): Promise<{ blocked: boolean; retryAfterSec?: number }> {
  const ip = requestIp(request);
  const policy = loginPolicy();

  const [emailCount, ipCount] = await Promise.all([
    incrWithTtl(loginFailKeyEmail(email), policy.windowSeconds),
    incrWithTtl(loginFailKeyIp(ip), policy.windowSeconds),
  ]);

  if (emailCount >= policy.maxFailures || ipCount >= policy.maxFailures) {
    await Promise.all([
      setBlock(loginBlockKeyEmail(email), policy.blockSeconds),
      setBlock(loginBlockKeyIp(ip), policy.blockSeconds),
    ]);
    return { blocked: true, retryAfterSec: policy.blockSeconds };
  }

  return { blocked: false };
}

export async function clearLoginFailures(
  email: string,
  request: Request
): Promise<void> {
  const ip = requestIp(request);
  await delKeys([
    loginFailKeyEmail(email),
    loginFailKeyIp(ip),
    loginBlockKeyEmail(email),
    loginBlockKeyIp(ip),
  ]);
}

export async function ensureSignupAllowed(
  email: string,
  request: Request
): Promise<GuardResult> {
  const ip = requestIp(request);
  const policy = signupPolicy();

  const [emailBlocked, ipBlocked] = await Promise.all([
    getBlockTtl(signupBlockKeyEmail(email)),
    getBlockTtl(signupBlockKeyIp(ip)),
  ]);
  const blockedRetry = Math.max(emailBlocked, ipBlocked);
  if (blockedRetry > 0) return { allowed: false, retryAfterSec: blockedRetry };

  const [emailCount, ipCount] = await Promise.all([
    incrWithTtl(signupAttemptKeyEmail(email), policy.windowSeconds),
    incrWithTtl(signupAttemptKeyIp(ip), policy.windowSeconds),
  ]);

  if (emailCount > policy.maxFailures || ipCount > policy.maxFailures) {
    await Promise.all([
      setBlock(signupBlockKeyEmail(email), policy.blockSeconds),
      setBlock(signupBlockKeyIp(ip), policy.blockSeconds),
    ]);
    return { allowed: false, retryAfterSec: policy.blockSeconds };
  }

  return { allowed: true };
}
