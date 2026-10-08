import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import pinoHttp from 'pino-http';
import mainRoutes from './routes/mainRoutes.js';
import { globalLimiter } from './middleware/rateLimitMiddleware.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { logger } from './utils/logger.js';

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(pinoHttp({ logger }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use('/api', globalLimiter, mainRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
