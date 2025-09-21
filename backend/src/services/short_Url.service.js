import { saveShortUrl } from '../dao/short_url.js';
import { generateNanoid } from '../utils/helper.js';
import { AppError } from '../utils/errorUtils.js';

export const createShortUrlServiceWithoutUser = async (url) => {
  try {
    const shortUrl = await generateNanoid(8);

    if (!shortUrl) {
      throw new AppError('Failed to generate short URL code', 500);
    }

    await saveShortUrl(shortUrl, url);
    return shortUrl;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to create short URL', 500);
  }
};

export const createShortUrlServiceWithUser = async (url, userId) => {
  try {
    const shortUrl = await generateNanoid(8);

    if (!shortUrl) {
      throw new AppError('Failed to generate short URL code', 500);
    }

    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to create short URL', 500);
  }
};
