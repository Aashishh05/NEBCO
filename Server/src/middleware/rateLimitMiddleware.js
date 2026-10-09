import rateLimit, { MemoryStore } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redis } from "../config/redis.js";

const lazyRedisStore = (name) => {
  const memory = new MemoryStore();
  let redisStore = null;
  let initOptions;

  const pick = () => {
    if (!redis || redis.status !== "ready") return memory;
    if (!redisStore) {
      try {
        redisStore = new RedisStore({
          sendCommand: (...args) => redis.call(...args),
          prefix: `nebco:rl:${name}:`,
        });
        if (initOptions && typeof redisStore.init === "function")
          redisStore.init(initOptions);
      } catch {
        return memory;
      }
    }
    return redisStore;
  };

  return {
    localKeys: true,
    init: (options) => {
      initOptions = options;
      const store = pick();
      if (typeof store.init === "function") store.init(options);
    },
    increment: (key) => pick().increment(key),
    decrement: (key) => pick().decrement(key),
    resetKey: (key) => pick().resetKey(key),
    resetAll: () => {
      memory.resetAll();
      if (redisStore) redisStore.resetAll();
    },
  };
};

const build = (name, windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    passOnStoreError: true,
    message: { success: false, message },
    store: lazyRedisStore(name),
  });

const MIN = 60 * 1000;
const isProd = process.env.NODE_ENV === "production";

export const globalLimiter = build(
  "global",
  15 * MIN,
  isProd ? 300 : 2000,
  "Too many requests, try again later",
);
export const loginLimiter = build(
  "login",
  15 * MIN,
  isProd ? 5 : 100,
  "Too many login attempts, try again in 15 minutes",
);
export const formLimiter = build(
  "form",
  60 * MIN,
  isProd ? 5 : 100,
  "Too many submissions, try again later",
);
