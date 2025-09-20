import { generateNanoid } from '../utils/helper.js';
import UrlModel from '../models/short_url.model.js';

export const createShortUrlService = async (url) => {
  const shortUrl = await generateNanoid(8);
  const newUrl = new UrlModel({
    full_url: url,
    short_url: shortUrl,
  });
  newUrl.save();
  console.log(shortUrl);
  console.log('URL saved successfully');
  return shortUrl;
};
