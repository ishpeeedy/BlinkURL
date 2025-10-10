import { getCustomShortUrl } from '../dao/short_url.js';
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
      remoteAddress: req.connection.remoteAddress,
    });

    const location = getLocationFromIP(ip);
    logger.debug('Location data', { location });

    const userAgent = parseUserAgent(userAgentString);
    logger.debug('User agent data', { userAgent });

    const clickData = {
      shortUrl: shortUrlId,
      ip,
      location,
      userAgent,
    };

    logger.debug('Attempting to save click data', { clickData });

    const click = await createClick(clickData);
    logger.info('Click tracked successfully', {
      clickId: click._id,
      shortUrlId: click.shortUrl,
    });

    return click;
  } catch (error) {
    logger.error('Error tracking click', {
      error: error.message,
      stack: error.stack,
      shortUrlId: shortUrlId,
    });
    throw error;
  }
});

export const getUrlAnalytics = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // From authMiddleware

  logger.info('Fetching analytics for slug:', { id, userId });

  // Check if URL exists - use getCustomShortUrl to avoid incrementing clicks
  const shortUrl = await getCustomShortUrl(id);
  if (!shortUrl) {
    logger.warn('Short URL not found:', id);
    return res.status(404).json({ message: 'URL not found' });
  }

  // Check if user owns this URL
  if (shortUrl.user.toString() !== userId.toString()) {
    logger.warn('Unauthorized access attempt:', {
      urlOwner: shortUrl.user,
      requestingUser: userId,
      slug: id,
    });
    return res.status(403).json({
      message:
        'Forbidden: You do not have permission to view this URL analytics',
    });
  }

  logger.info('Found short URL:', {
    id: shortUrl._id,
    slug: shortUrl.short_url,
    fullUrl: shortUrl.full_url,
  });

  // Get analytics data
  const analytics = await getClickAnalytics(shortUrl._id);

  logger.info('Analytics data retrieved:', {
    totalClicks: analytics.totalClicks,
    uniqueVisitors: analytics.uniqueVisitors,
    browserCount: analytics.byBrowser?.length || 0,
    countryCount: analytics.byCountry?.length || 0,
  });

  res.status(200).json({
    urlId: id,
    shortUrl: shortUrl.short_url,
    originalUrl: shortUrl.full_url,
    createdAt: shortUrl.createdAt,
    ...analytics,
  });
});
