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

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set('trust proxy', 1);
app.use(
  helmet({
    // The API is consumed cross-origin by the React app.
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: false,
  }),
);
app.use(
  cors({
    origin(origin, callback) {
      // Allowed: no origin, a configured origin, localhost, or any Vercel preview.
      const isAllowed =
        !origin ||
        allowedOrigins.includes(origin) ||
        /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
        /^https:\/\/[a-z0-9.-]+\.vercel\.app$/i.test(origin);

      return callback(null, Boolean(isAllowed));
    },
    credentials: true,
  }),
);
app.use(pinoHttp({ logger }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use('/api', globalLimiter, mainRoutes);

// Friendly root so opening the backend URL shows a clean response.
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'NEBCO API is running',
    data: { health: '/api/health' },
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
