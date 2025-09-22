import express from 'express';
import {
  createShortUrl,
  redirectFromShortUrl,
} from '../controllers/short_url.controller.js';

const router = express.Router();

// POST /api/create -> createShortUrl (since it's mounted at /api)
router.post('/create', createShortUrl);

router.get('/:id', redirectFromShortUrl);

export default router;
