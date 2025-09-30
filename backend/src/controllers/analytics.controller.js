import mongoose from 'mongoose';
import { getShortUrl } from '../dao/short_url.js';
import { createClick, getClickAnalytics } from '../dao/click.dao.js';
import { getLocationFromIP, parseUserAgent } from '../utils/analytics.js';
import wrapAsync from '../utils/tryCatchWrapper.js';

export const trackClick = wrapAsync(async (req, shortUrlId) => {
  try {
    console.log('Starting click tracking...'); // Debug log
    console.log('ShortURL ID received:', shortUrlId); // Log the ID we received

    const ip = req.ip || req.connection.remoteAddress;
    const userAgentString = req.headers['user-agent'];

    console.log('Request details:', { 
      ip, 
      userAgent: userAgentString,
      shortUrlId,
      headers: req.headers,
      remoteAddress: req.connection.remoteAddress
    });

    const location = getLocationFromIP(ip);
    console.log('Location data:', location);

    const userAgent = parseUserAgent(userAgentString);
    console.log('User agent data:', userAgent);

    // Create click data without converting ID (it should already be an ObjectId)
    const clickData = {
      shortUrl: shortUrlId,
      ip,
      location,
      userAgent
    };

    console.log('Attempting to save click data:', clickData);

    const click = await createClick(clickData);
    console.log('Click successfully saved to database:', click);

    return click;
  } catch (error) {
    console.error('Error in trackClick:', {
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