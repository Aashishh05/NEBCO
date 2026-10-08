import { ApiError } from "../utils/ApiError.js";
import { sendError } from "../utils/response.js";
import { logger } from "../utils/logger.js";

export const notFound = (req, res, next) =>
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));

export const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Something went wrong";
  let errors = err.errors;

  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  } else if (err.name === "CastError") {
    status = 400;
    message = "Invalid id";
  } else if (err.code === 11000) {
    status = 409;
    message = `${Object.keys(err.keyValue)[0]} already exists`;
  } else if (err.name === "MulterError") {
    status = 400;
  }

  if (status >= 500) {
    logger.error({ err }, "Unhandled error");
    if (process.env.NODE_ENV === "production") message = "Something went wrong";
  }
  return sendError(res, message, status, errors);
};
