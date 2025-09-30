import geoip from 'geoip-lite';

// Test IPs for different scenarios
const TEST_IPS = {
  US: '8.8.8.8',        // Google DNS (US)
  UK: '2.2.2.2',        // UK IP
  INDIA: '103.48.71.1', // India IP
  LOCAL: '::1',         // localhost IPv6
  LOCAL_V4: '127.0.0.1' // localhost IPv4
};

const testIP = (ip) => {
  console.log('\n--- Testing IP:', ip, '---');
  
  // Clean the IP (remove IPv6 prefix if present)
  const cleanIP = ip.replace(/^::ffff:/, '');
  console.log('Cleaned IP:', cleanIP);
  
  // Try to get location
  const geo = geoip.lookup(cleanIP);
  console.log('Raw GeoIP Result:', geo);
  
  // Format the result
  const location = geo ? {
    country: geo.country || 'Unknown',
    region: geo.region?.[0] || 'Unknown',
    city: geo.city || 'Unknown',
    timezone: geo.timezone || 'Unknown',
    coordinates: geo.ll || []
  } : {
    country: 'Unknown',
    region: 'Unknown',
    city: 'Unknown',
    timezone: 'Unknown',
    coordinates: []
  };
  
  console.log('Formatted Location:', location);
  return location;
};

// Test all IPs
console.log('=== Starting IP Resolution Tests ===');

Object.entries(TEST_IPS).forEach(([label, ip]) => {
  console.log(`\n=== Testing ${label} IP ===`);
  testIP(ip);
});

// Test current request IP (when used in the application)
const testRequestIP = (req) => {
  const ip = req.ip || req.connection.remoteAddress;
  console.log('\n=== Testing Request IP ===');
  console.log('Original Request IP:', ip);
  return testIP(ip);
};

export { testIP, testRequestIP, TEST_IPS };