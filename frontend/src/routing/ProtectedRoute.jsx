import { redirect } from '@tanstack/react-router';
import { store } from '../store/store';

/**
 * Route guard that requires authentication
 * Redirects to /auth if user is not logged in
 */
export const requireAuth = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;

  if (!isAuthenticated) {
    throw redirect({
      to: '/auth',
      search: {
        // Save the current path so we can redirect back after login
        redirect: window.location.pathname,
      },
    });
  }
};

/**
 * Route guard that redirects authenticated users away
 * Useful for login/signup pages - if already logged in, go to dashboard
 */
export const requireGuest = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;

  if (isAuthenticated) {
    throw redirect({
      to: '/dashboard',
    });
  }
};
