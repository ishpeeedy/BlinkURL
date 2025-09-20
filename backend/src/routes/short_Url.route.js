import express from 'express';
import {
  createShortUrl,
  redirectFromShortUrl,
} from '../controllers/short_url.controller.js';

const router = express.Router();

router.post('/api/create', createShortUrl);

router.get('/:id', redirectFromShortUrl);

export default router;
