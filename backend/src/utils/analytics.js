import geoip from 'geoip-lite';
import { UAParser } from 'ua-parser-js';

export const getLocationFromIP = (ip) => {
  // Remove IPv6 prefix if present
  const cleanIP = ip.replace(/^::ffff:/, '');
  const geo = geoip.lookup(cleanIP);
  
  if (!geo) return {
    country: 'Unknown',
    region: 'Unknown',
    city: 'Unknown'
  };

  return {
    country: geo.country || 'Unknown',
    region: geo.region || 'Unknown',
    city: geo.city || 'Unknown'
  };
};

export const parseUserAgent = (userAgentString) => {
  const parser = new UAParser(userAgentString);
  const result = parser.getResult();
  
  return {
    browser: result.browser.name || 'Unknown',
    device: result.device.type || 'Desktop', // Default to Desktop if not detected
    os: result.os.name || 'Unknown'
  };
};