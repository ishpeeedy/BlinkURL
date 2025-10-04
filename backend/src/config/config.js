export const cookieOptions = {
  httpOnly: true, // Prevents XSS attacks
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // CSRF protection
  maxAge: 1000 * 60 * 60, // 1 hour
  path: '/', // Cookie available across all routes
  domain: process.env.NODE_ENV === 'production' 
    ? process.env.COOKIE_DOMAIN // Set in .env for production
    : undefined, // No domain restriction for localhost
};
