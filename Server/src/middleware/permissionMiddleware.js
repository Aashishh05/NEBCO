import { ApiError } from "../utils/ApiError.js";

// Protects a route: the user must hold every listed permission.
export const requirePermission = (...keys) => {
  return (req, res, next) => {
    const permissions = req.user?.permissions || [];

    const allowed = keys.every((key) => permissions.includes(key));

    if (!allowed) {
      return next(new ApiError(403, "You do not have access to this action"));
    }

    next();
  };
};
