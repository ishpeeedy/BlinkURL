import { createShortUrlServiceWithoutUser } from '../services/short_Url.service.js';
import { getShortUrl } from '../dao/short_url.js';

export const createShortUrl = async (req, res) => {
  console.log(req.body, 'req.body from controller');
  const { url } = req.body;
  const shortUrl = await createShortUrlServiceWithoutUser(url);
  res.send(process.env.APP_URL + shortUrl);
};

export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (url) {
    console.log('Redirecting to:', url.full_url);
    return res.redirect(url.full_url);
  }
  return res.status(404).send('URL not found');
};
