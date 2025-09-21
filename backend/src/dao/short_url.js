import UrlModel from '../models/short_url.model.js';

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  const newUrl = new UrlModel({
    full_url: longUrl,
    short_url: shortUrl,
  });
  if (userId) {
    newUrl.user_id = userId; // Associate the URL with the user
  }
  await newUrl.save();
  console.log(shortUrl, 'URL saved successfully', 'from dao');
};

export const getShortUrl = async (shortUrl) => {
  return UrlModel.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
};
