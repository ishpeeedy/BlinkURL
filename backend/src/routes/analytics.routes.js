import express from 'express';
import { getUrlAnalytics } from '../controllers/analytics.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get analytics for a specific URL - protected route
router.get('/:id/analytics', authMiddleware, getUrlAnalytics);

export default router;