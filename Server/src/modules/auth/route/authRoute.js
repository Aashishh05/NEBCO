import { Router } from 'express';
import { authController } from '../controller/authController.js';
import { loginSchema, changePasswordSchema } from '../validation/authValidation.js';
import { validate } from '../../../middleware/validateMiddleware.js';
import { loginLimiter } from '../../../middleware/rateLimitMiddleware.js';
import { authMiddleware } from '../../../middleware/authMiddleware.js';

const router = Router();

router.post('/login', loginLimiter, validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.me);
router.put('/password', authMiddleware, validate(changePasswordSchema), authController.changePassword);

export default router;
