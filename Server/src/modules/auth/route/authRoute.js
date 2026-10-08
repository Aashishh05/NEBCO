import { Router } from 'express';
import { login, logout, me, changePassword } from '../controller/authController.js';
import { loginSchema, changePasswordSchema } from '../validation/authValidation.js';
import { validate } from '../../../middleware/validateMiddleware.js';
import { loginLimiter } from '../../../middleware/rateLimitMiddleware.js';
import { authMiddleware } from '../../../middleware/authMiddleware.js';

const router = Router();

router.post('/login', loginLimiter, validate(loginSchema), login);
router.post('/logout', logout);
router.get('/me', authMiddleware, me);
router.put('/password', authMiddleware, validate(changePasswordSchema), changePassword);

export default router;
