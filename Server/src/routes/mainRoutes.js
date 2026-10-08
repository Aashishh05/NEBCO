import { Router } from 'express';
import mongoose from 'mongoose';
import { redis } from '../config/redis.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

const router = Router();

router.get(
  '/health',
  asyncHandler(async (req, res) => {
    const mongo = mongoose.connection.readyState === 1 ? 'up' : 'down';
    let cacheStatus = 'disabled';
    if (redis) {
      cacheStatus = await redis
        .ping()
        .then(() => 'up')
        .catch(() => 'down');
    }
    sendSuccess(res, { mongo, redis: cacheStatus });
  })
);

export default router;
