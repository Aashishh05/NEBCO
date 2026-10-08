import { redis } from "../config/redis.js";


const TTL = Number(process.env.CACHE_TTL_SECONDS) || 600;

const fullKey = (key) => `nebco:cache:${key}`;

export const getCache = async (key) => {
  if (!redis) return undefined;

  try {
    const raw = await redis.get(fullKey(key));
    return raw === null ? undefined : JSON.parse(raw);
  } catch {
    return undefined;
  }
};

export const setCache = async (key, value) => {
  if (!redis) return;

  try {
    await redis.set(fullKey(key), JSON.stringify(value), "EX", TTL);
  } catch {
    // a cache failure must never break the request
  }
};


export const clearCache = async (name) => {
  if (!redis) return;

  try {
    const keys = await redis.keys(`nebco:cache:${name}:*`);
    if (keys.length > 0) await redis.del(keys);
  } catch {
    // ignore
  }
};