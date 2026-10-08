import Redis from "ioredis";
import { logger } from "../utils/logger.js";

export const redis =
  process.env.CACHE_ENABLED === "false" || !process.env.REDIS_URL
    ? null
    : new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
      });

if (redis) {
  redis.on("ready", () => logger.info("Redis ready"));
  redis.on("error", (err) => logger.warn({ err: err.message }, "Redis error"));
}
