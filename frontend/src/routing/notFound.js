import { createRoute } from '@tanstack/react-router';
import NotFound from '@/pages/NotFound';

export const notFoundRoute = createRoute({
  path: '*',
  component: NotFound,
});
