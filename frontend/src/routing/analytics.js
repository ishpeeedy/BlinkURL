import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './routeTree';
import AnalyticsPage from '../pages/AnalyticsPage';
import { checkAuth } from '../utils/helper';

export const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/analytics/$id/charts',
  component: AnalyticsPage,
  beforeLoad: checkAuth,
});