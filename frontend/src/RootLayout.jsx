import React, { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Outlet } from '@tanstack/react-router';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import GridBackground from './components/GridBackground';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './api/user.api';
import { login, logout } from './store/slice/authSlice';

const RootLayout = () => {
  const dispatch = useDispatch();

  // Check auth status on app load
  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Update Redux store when user data is available
  useEffect(() => {
    if (isLoading) return;

    console.log('🔍 [ROOT] Auth check - user data:', user);

    if (user && user.user) {
      console.log('✅ [ROOT] User authenticated, updating Redux:', user.user);
      dispatch(login(user.user));
    } else {
      console.log('❌ [ROOT] No user found, logging out');
      dispatch(logout());
    }
  }, [user, isLoading, dispatch]);

  return (
    <>
      <GridBackground />
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
};

export default RootLayout;
