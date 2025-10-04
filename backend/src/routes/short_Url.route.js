import express from 'express';
import { createShortUrl, deleteShortUrlById } from '../controllers/short_url.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', createShortUrl);
router.delete('/:id', authMiddleware, deleteShortUrlById);

export default router;
