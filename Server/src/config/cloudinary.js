import cloudinary from "cloudinary";
import { logger } from "../utils/logger.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Checked once at startup, never crashes the server (uploads will fail later).
export const checkCloudinary = async () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    logger.warn("Cloudinary not configured, uploads will be unavailable");
    return;
  }

  try {
    const res = await cloudinary.v2.api.ping();
    if (res.status === "ok") {
      logger.info(`Cloudinary connected successfully`);
    }
  } catch (error) {
    logger.warn(`Cloudinary connection failed: ${error.message}`);
  }
};

export default cloudinary.v2;