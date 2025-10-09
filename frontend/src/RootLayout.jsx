import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Outlet } from '@tanstack/react-router';
import Navbar from './components/NavBar';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
    </>
  );
};

export default RootLayout;
