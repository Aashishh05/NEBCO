import { redis } from "../config/redis.js";

// Caches what a user can do: rbac:user:<id>
const key = (id) => `rbac:user:${id}`;

export const getCachedAccess = async (id) => {
  if (!redis) return undefined;

  try {
    const raw = await redis.get(key(id));
    return raw === null ? undefined : JSON.parse(raw);
  } catch {
    return undefined;
  }
};

export const setCachedAccess = async (id, access) => {
  if (!redis) return;

  try {
    await redis.set(key(id), JSON.stringify(access), "EX", 600);
  } catch {
    // cache problems must never break the request
  }
};

export const clearAccessCache = async (id) => {
  if (!redis) return;

  try {
    await redis.del(key(id));
  } catch {
    // ignore
  }
};
