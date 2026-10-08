import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { authService } from '../modules/auth/service/authService.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) throw new ApiError(401, 'Please log in');

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const access = await authService.getAccess(id);
    if (!access || !access.isActive) throw new ApiError(401, 'Account not available');

    req.user = access;
    next();
  } catch (err) {
    const expired = err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError';
    next(expired ? new ApiError(401, 'Session expired, please log in again') : err);
  }
};
