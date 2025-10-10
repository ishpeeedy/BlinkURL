import { redirect } from '@tanstack/react-router';
import { getCurrentUser } from '../api/user.api';
import { login } from '../store/slice/authSlice';

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const data = await queryClient.ensureQueryData({
      queryKey: ['currentUser'],
      queryFn: getCurrentUser,
    });

    console.log('🔒 [CHECK AUTH] Response data:', data);

    if (!data || !data.user) {
      console.log('❌ [CHECK AUTH] No user found');
      return redirect({ to: '/auth' });
    }

    console.log('✅ [CHECK AUTH] User found, dispatching to Redux:', data.user);
    store.dispatch(login(data.user));

    const { isAuthenticated } = store.getState().auth;

    if (!isAuthenticated) {
      console.log('❌ [CHECK AUTH] Not authenticated after dispatch');
      return redirect({ to: '/auth' });
    }

    console.log('✅ [CHECK AUTH] User authenticated successfully');
    return true;
  } catch (error) {
    console.error('❌ [CHECK AUTH] Error:', error);
    return redirect({ to: '/auth' });
  }
};
