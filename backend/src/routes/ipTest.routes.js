import express from 'express';
import { testIP, testRequestIP, TEST_IPS } from '../utils/ipTester.js';
import getClientIP from '../utils/getClientIP.js';

const router = express.Router();

// Test endpoint that tests all sample IPs
router.get('/test-ips', (req, res) => {
  const results = {};
  
  // Test all sample IPs
  Object.entries(TEST_IPS).forEach(([label, ip]) => {
    results[label] = testIP(ip);
  });
  
  // Test the actual request IP
  const realIP = getClientIP(req);
  results.currentRequest = testIP(realIP);
  
  const forwardedIPs = req.headers['x-forwarded-for']?.split(',').map(ip => ip.trim());
  
  res.json({
    sampleResults: results,
    yourIP: realIP,
    ipDetails: {
      selectedIP: realIP,
      forwardedFor: {
        raw: req.headers['x-forwarded-for'],
        parsed: forwardedIPs,
        clientIP: forwardedIPs?.[0],
        proxyIPs: forwardedIPs?.slice(1)
      },
      renderInfo: {
        renderProxyIP: req.headers['render-proxy-ip'],
        renderForwardedFor: req.headers['render-forwarded-for']
      },
      standardHeaders: {
        xRealIP: req.headers['x-real-ip'],
        xClientIP: req.headers['x-client-ip'],
        cfConnectingIP: req.headers['cf-connecting-ip']
      },
      fallbacks: {
        reqIP: req.ip,
        socketRemote: req.socket?.remoteAddress,
        connectionRemote: req.connection?.remoteAddress
      }
    },
    allHeaders: req.headers
  });
});

// Test endpoint for a specific IP
router.get('/test-ip/:ip', (req, res) => {
  const result = testIP(req.params.ip);
  res.json({
    ip: req.params.ip,
    result
  });
});

export default router;