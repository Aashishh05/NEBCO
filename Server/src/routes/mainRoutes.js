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
import contactRoute from "../modules/contact/route/contactRoute.js";
import projectRoute from "../modules/project/route/projectRoute.js";
import teamRoute from "../modules/team/route/teamRoute.js";
import testimonialRoute from "../modules/testimonial/route/testimonialRoute.js";
import mediaRoute from "../modules/media/route/mediaRoute.js";
import enquiryRoute from "../modules/enquiry/route/enquiryRoute.js";
import appointmentRoute from "../modules/appointment/route/appointmentRoute.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/roles", roleRoute);
router.use("/permissions", permissionRoute);
router.use("/audit", auditRoute);
router.use("/contact", contactRoute);
router.use("/projects", projectRoute);
router.use("/team", teamRoute);
router.use("/testimonials", testimonialRoute);
router.use("/media", mediaRoute);
router.use("/enquiries", enquiryRoute);
router.use("/appointments", appointmentRoute);

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
