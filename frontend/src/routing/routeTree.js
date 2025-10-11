import { createRootRoute, createRoute } from '@tanstack/react-router';
import RootLayout from '../RootLayout';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import NotFound from '../pages/NotFound';
import { checkAuth } from '../utils/helper';

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

// Define all routes here to avoid circular dependencies
const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
  beforeLoad: checkAuth,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/analytics/$id',
  component: AnalyticsPage,
  beforeLoad: checkAuth,
});

export const routeTree = rootRoute.addChildren([
  homePageRoute,
  authRoute,
  dashboardRoute,
  analyticsRoute,
]);
