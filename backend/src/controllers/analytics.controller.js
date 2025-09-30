import mongoose from 'mongoose';
import { getShortUrl } from '../dao/short_url.js';
import { createClick, getClickAnalytics } from '../dao/click.dao.js';
import { getLocationFromIP, parseUserAgent } from '../utils/analytics.js';
import wrapAsync from '../utils/tryCatchWrapper.js';
import logger from '../utils/logger.js';
import getClientIP from '../utils/getClientIP.js';

export const trackClick = wrapAsync(async (req, shortUrlId) => {
  try {
    logger.info('Starting click tracking', { shortUrlId });

    const ip = getClientIP(req);
    const userAgentString = req.headers['user-agent'];

    logger.debug('Request details', { 
      ip, 
      userAgent: userAgentString,
      shortUrlId,
      headers: req.headers,
      remoteAddress: req.connection.remoteAddress
    });

    const location = getLocationFromIP(ip);
    logger.debug('Location data', { location });

    const userAgent = parseUserAgent(userAgentString);
    logger.debug('User agent data', { userAgent });

    const clickData = {
      shortUrl: shortUrlId,
      ip,
      location,
      userAgent
    };

    logger.debug('Attempting to save click data', { clickData });

    const click = await createClick(clickData);
    logger.info('Click tracked successfully', { 
      clickId: click._id,
      shortUrlId: click.shortUrl
    });

    return click;
  } catch (error) {
    logger.error('Error tracking click', {
      error: error.message,
      stack: error.stack,
      shortUrlId: shortUrlId
    });
    throw error;
  }
});

export const getUrlAnalytics = wrapAsync(async (req, res) => {
  const { id } = req.params;
  
  // Check if URL exists
  const shortUrl = await getShortUrl(id);
  if (!shortUrl) {
    return res.status(404).json({ message: 'URL not found' });
  }

  // Get analytics data
  const analytics = await getClickAnalytics(shortUrl._id);
  
  res.status(200).json({
    urlId: id,
    originalUrl: shortUrl.full_url,
    ...analytics
  });
});