import { saveShortUrl } from '../dao/short_url.js';
import { generateNanoid } from '../utils/helper.js';

export const createShortUrlServiceWithoutUser = async (url) => {
  const shortUrl = await generateNanoid(8);
  await saveShortUrl(shortUrl, url);
  return shortUrl;
};

export const createShortUrlServiceWithUser = async (url, userId) => {
  const shortUrl = await generateNanoid(8);
  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;
};
