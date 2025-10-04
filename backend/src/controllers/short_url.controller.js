import { getShortUrl, getCustomShortUrl, deleteShortUrl } from '../dao/short_url.js';
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from '../services/short_Url.service.js';
import wrapAsync from '../utils/tryCatchWrapper.js';
import { trackClick } from '../controllers/analytics.controller.js';
import { deleteClicksByShortUrl } from '../dao/click.dao.js';
import logger from '../utils/logger.js';

export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  let shortUrl;
  if (req.user) {
    shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug);
  } else {
    shortUrl = await createShortUrlWithoutUser(data.url);
  }
  res.status(200).json({ shortUrl: `${process.env.APP_URL}${shortUrl}` });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (!url) throw new Error('Short URL not found');
  
  // Track the click asynchronously - don't wait for it to complete
  await trackClick(req, url._id);  // Changed to await to ensure tracking completes
  
  res.redirect(url.full_url);
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, customUrl } = req.body;
  const shortUrl = await createShortUrlWithoutUser(url, customUrl);
  res.status(200).json({ shortUrl: `${process.env.APP_URL}${shortUrl}` });
});

export const deleteShortUrlById = wrapAsync(async (req, res) => {
  const { id } = req.params;
  
  logger.info('Attempting to delete short URL:', id);
  
  // First, get the URL to retrieve its ObjectId
  const shortUrl = await getCustomShortUrl(id);
  if (!shortUrl) {
    logger.warn('Short URL not found for deletion:', id);
    return res.status(404).json({ message: 'URL not found' });
  }
  
  // Delete all associated clicks
  const clicksDeleted = await deleteClicksByShortUrl(shortUrl._id);
  logger.info('Deleted clicks:', clicksDeleted.deletedCount);
  
  // Delete the short URL
  await deleteShortUrl(id);
  logger.info('Short URL deleted successfully:', id);
  
  res.status(200).json({ 
    message: 'URL and associated clicks deleted successfully',
    clicksDeleted: clicksDeleted.deletedCount
  });
});
