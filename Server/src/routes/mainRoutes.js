import { Router } from "express";
import mongoose from "mongoose";
import { redis } from "../config/redis.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import authRoute from "../modules/auth/route/authRoute.js";
import userRoute from "../modules/user/route/userRoute.js";
import roleRoute from "../modules/role/route/roleRoute.js";
import permissionRoute from "../modules/permission/route/permissionRoute.js";
import auditRoute from "../modules/audit/route/auditRoute.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/roles", roleRoute);
router.use("/permissions", permissionRoute);
router.use("/audit", auditRoute);

router.get(
  "/health",
  asyncHandler(async (req, res) => {
    const mongo = mongoose.connection.readyState === 1 ? "up" : "down";
    let cacheStatus = "disabled";
    if (redis) {
      cacheStatus = await redis
        .ping()
        .then(() => "up")
        .catch(() => "down");
    }
    sendSuccess(res, { mongo, redis: cacheStatus });
  }),
);

export default router;
