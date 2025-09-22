import express from 'express';
import chalk from 'chalk';
import cors from 'cors';

import dotenv from 'dotenv';
import connectDB from './src/config/mongodb.config.js';
import shortUrlRouter from './src/routes/short_Url.route.js';
import globalErrorHandler from './src/middleware/errorHandler.js';
import { AppError } from './src/utils/errorUtils.js';

dotenv.config({ path: './.env' });

const app = express();

// CORS configuration for frontend communication
app.use(
  cors({
    origin: 'http://localhost:5173', // Vite dev server default port
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', shortUrlRouter);
app.use('/', shortUrlRouter);

// Handle undefined routes - catch-all middleware
app.use((req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(err);
});

// Global error handling middleware (must be last)
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(
    `${chalk.bgGreen(
      chalk.bold('Server is running')
    )} on port ${chalk.yellow.underline(`http://localhost:${process.env.PORT}`)}`
  );
});
