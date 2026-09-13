const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { uploadDir } = require('./config/storage');

const { notFound, errorHandler } = require('./middleware/error.middleware');

const authRoutes = require('./routes/auth.routes');
const fuelRoutes = require('./routes/fuelRoutes');
const settingRoutes = require('./routes/settingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const valetRoutes = require('./routes/valetRoutes');
const jobRoutes = require('./routes/jobRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Allow requests from both the customer frontend and the admin app
const normalizeOrigin = (url) => (url ? url.trim().replace(/\/+$/, '') : null);

const allowedOrigins = [
  normalizeOrigin(process.env.CLIENT_URL),
  normalizeOrigin(process.env.ADMIN_URL),
  'http://localhost:5173',
  'http://localhost:5174',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, healthcheck)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.trim().replace(/\/+$/, '');
      if (allowedOrigins.includes(cleanOrigin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files (resumes, forecourt images) statically
app.use('/uploads', express.static(uploadDir));

// Rate limiting on auth endpoints (skip /me, /refresh, /logout to prevent 429 lockouts)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 10000 : 300,
  skip: (req) =>
    process.env.NODE_ENV === 'development' ||
    req.path === '/me' ||
    req.path === '/refresh' ||
    req.path === '/logout',
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth', authLimiter);

// Health check
app.get('/api/health', (req, res) =>
  res.json({
    status: 'ok',
    app: 'S&B UK Petroleum & Forecourt Services API',
    timestamp: new Date().toISOString(),
  })
);

// Petroleum & Forecourt Routes
app.use('/api/auth', authRoutes);
app.use('/api/fuel-prices', fuelRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/valet-bookings', valetRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

