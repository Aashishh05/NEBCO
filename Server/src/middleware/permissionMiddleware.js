import { ApiError } from "../utils/ApiError.js";

// checkPermission("projects", "read") — allows the request only when the
// user's role has that action on that module. No database call: the
// matrix is already on req.user from authMiddleware.
export const checkPermission = (module, action) => {
  return (req, res, next) => {
    const allowed = req.user?.permissions?.[module]?.[action];

    if (!allowed) {
      return next(new ApiError(403, "Access denied"));
    }

    next();
  };
};
