import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/mongodb.config.js';
import short_url from './src/routes/short_Url.route.js';
import user_routes from './src/routes/user.routes.js';
import auth_routes from './src/routes/auth.routes.js';
import analytics_routes from './src/routes/analytics.routes.js';
import { redirectFromShortUrl } from './src/controllers/short_url.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import { attachUser } from './src/utils/attachUser.js';

dotenv.config('./.env');

const app = express();

// Whitelist allowed origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.APP_URL,
  'http://localhost:5173', // Local development
  'http://localhost:3000'
].filter(Boolean).map(url => url.replace(/\/$/, '')); // Remove trailing slashes

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      
      // Check if origin is in whitelist
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 600, // Cache preflight for 10 minutes
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Security headers
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(attachUser);

app.use('/api/user', user_routes);
app.use('/api/auth', auth_routes);
app.use('/api/create', short_url);
app.use('/api', analytics_routes);
app.get('/:id', redirectFromShortUrl);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

// GET - Redirection
