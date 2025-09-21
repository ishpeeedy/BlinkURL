import { createShortUrlServiceWithoutUser } from '../services/short_Url.service.js';
import { getShortUrl } from '../dao/short_url.js';
import { catchAsync, AppError } from '../utils/errorUtils.js';

export const createShortUrl = catchAsync(async (req, res, next) => {
  console.log(req.body, 'req.body from controller');
  const { url } = req.body;

  // Validate URL input
  if (!url) {
    return next(new AppError('Please provide a URL to shorten', 400));
  }
  try {
    new URL(url);
  } catch {
    return next(new AppError('Please provide a valid URL', 400));
  }

  const shortUrl = await createShortUrlServiceWithoutUser(url);

  res.status(201).json({
    status: 'success',
    data: {
      originalUrl: url,
      shortUrl: `${process.env.APP_URL}${shortUrl}`,
      shortCode: shortUrl,
    },
  });
});

export const redirectFromShortUrl = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError('Short URL ID is required', 400));
  }
  const url = await getShortUrl(id);
  if (!url) {
    return next(new AppError('Short URL not found', 404));
  }
  console.log('Redirecting to:', url.full_url);
  res.redirect(url.full_url);
});
