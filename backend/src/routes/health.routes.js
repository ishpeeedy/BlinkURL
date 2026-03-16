import { Router } from 'express';

const healthRoutes = Router();

healthRoutes.get('/health', (req, res) => {
  res.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.status(200).json({
    ok: true,
    service: 'BlinkURL Backend',
    timestamp: new Date().toISOString(),
  });
});

healthRoutes.head('/health', (req, res) => {
  res.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.sendStatus(200);
});

export default healthRoutes;
