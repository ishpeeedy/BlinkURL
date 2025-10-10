import { redirect } from '@tanstack/react-router';
import { getCurrentUser } from '../api/user.api';
import { login } from '../store/slice/authSlice';
import { getAuthStatus } from './authCache';

/**
 * Authentication utility for protected routes
 * Uses intelligent caching to prevent race conditions and duplicate API calls
 */

/**
 * Check authentication for protected routes
 * - Used in route `beforeLoad` to protect routes that require authentication
 * - Redirects to /auth if user is not authenticated
 * - Updates Redux store with user data if authenticated
 * - Uses auth cache to prevent duplicate API calls
 *
 * @param {Object} context - Router context with queryClient and store
 * @returns {boolean|redirect} - True if authenticated, redirect to /auth otherwise
 */
export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;

    console.log('🔒 [ROUTE GUARD] Checking authentication...');

    // Use cached auth check to prevent race conditions
    const user = await getAuthStatus(queryClient, getCurrentUser);

    if (!user || !user.data) {
      console.log('❌ [ROUTE GUARD] No user found, redirecting to /auth');
      return redirect({ to: '/auth' });
    }

    console.log('✅ [ROUTE GUARD] User authenticated:', user.data);
    store.dispatch(login(user.data));

    const { isAuthenticated } = store.getState().auth;

    if (!isAuthenticated) {
      console.log('❌ [ROUTE GUARD] Not authenticated, redirecting to /auth');
      return redirect({ to: '/auth' });
    }

    return true;
  } catch (error) {
    console.error('❌ [ROUTE GUARD] Error during auth check:', error);
    return redirect({ to: '/auth' });
  }
};
