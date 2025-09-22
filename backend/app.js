import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/mongodb.config.js';
import short_url from './src/routes/short_Url.route.js';
import user_routes from './src/routes/user.routes.js';
import auth_routes from './src/routes/auth.routes.js';
import { redirectFromShortUrl } from './src/controllers/short_url.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import { attachUser } from './src/utils/attachUser.js';

dotenv.config('./.env');

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(attachUser);

app.use('/api/user', user_routes);
app.use('/api/auth', auth_routes);
app.use('/api/create', short_url);
app.get('/:id', redirectFromShortUrl);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

// GET - Redirection
