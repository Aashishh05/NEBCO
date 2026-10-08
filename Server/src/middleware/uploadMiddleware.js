import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

const storage = multer.memoryStorage();

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new ApiError(400, "Only JPG, PNG and WebP images are allowed"));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
}).single("file");

export const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "nebco", ...options },
        (error, result) => (error ? reject(error) : resolve(result)),
      )
      .end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};