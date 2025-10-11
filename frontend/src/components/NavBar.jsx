import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/slice/authSlice';
import { toast } from 'sonner';
import axiosInstance from '../utils/axiosInstance';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

import { cn } from '@/lib/utils';

const projects = [
  {
    title: 'Musafir',
    href: 'https://github.com/ishpeeedy/Musafir',
    description: 'Travel destination sharing platform inspired by YelpCamp',
  },
  {
    title: 'SkillForge',
    href: 'https://github.com/ishpeeedy/skillForge',
    description: 'Full-featured e-commerce platform for online courses',
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    console.log('🚀 [LOGOUT] Starting logout process...');
    console.log('🔑 [LOGOUT] Current auth state:', isAuthenticated);

    try {
      console.log('🌐 [LOGOUT] Calling backend logout endpoint...');
      console.log('🌐 [LOGOUT] Backend URL:', import.meta.env.VITE_BACKEND_URL);

      const response = await axiosInstance.post('/api/auth/logout');
      console.log('✅ [LOGOUT] Backend logout successful:', response.data);

      console.log('🗃️ [LOGOUT] Dispatching Redux logout action...');
      dispatch(logoutAction());
      console.log('✅ [LOGOUT] Redux state cleared');

      console.log('🎉 [LOGOUT] Showing success toast...');
      toast.success('Logged out successfully!');

      console.log('🏠 [LOGOUT] Redirecting to home page...');
      navigate({ to: '/' });
      console.log('✅ [LOGOUT] Logout complete!');
    } catch (error) {
      console.error('❌ [LOGOUT] Logout failed!');
      console.error('❌ [LOGOUT] Error details:', error);
      console.error('❌ [LOGOUT] Error message:', error.message);
      console.error('❌ [LOGOUT] Error response:', error.response);
      console.error('❌ [LOGOUT] Error response data:', error.response?.data);
      console.error(
        '❌ [LOGOUT] Error response status:',
        error.response?.status
      );

      toast.error('Logout failed', {
        description:
          error.response?.data?.message || error.message || 'Please try again',
      });
    }
  };

  return (
    <div className="bg-main flex justify-between items-center mx-auto rounded-sm mb-4 max-w-4xl">
      {/* Left side - Navigation items */}
      <NavigationMenu className="flex-1">
        <NavigationMenuList className="flex items-center gap-1">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="border-none bg-main">
              BlinkURL
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[500px] gap-3 p-2 lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-base p-6 no-underline outline-hidden bg-gradient-to-b from-main/50 to-main"
                      href="https://github.com/ishpeeedy/BlinkURL"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="mb-2 mt-4 text-lg font-heading">
                        Github Repo
                      </div>
                      <p className="text-sm font-base leading-tight">
                        Modern URL shortener with comprehensive analytics. Track
                        clicks, monitor traffic, and gain insights into your
                        audience.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/" title="Home" internal>
                  Create and shorten URLs instantly
                </ListItem>
                <ListItem href="/dashboard" title="Dashboard" internal>
                  View and manage all your shortened URLs
                </ListItem>
                <ListItem href="/auth" title="Login / Sign Up" internal>
                  Create an account for custom URLs and analytics
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="border-none bg-main">
              More !
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-2 md:w-[500px] md:grid-cols-2 bg-main">
                {projects.map((project) => (
                  <ListItem
                    key={project.title}
                    title={project.title}
                    href={project.href}
                  >
                    {project.description}
                  </ListItem>
                ))}
                <ListItem
                  title="More Projects"
                  href="https://github.com/ishpeeedy"
                >
                  View all my projects on GitHub
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side - Auth Button */}
      {isAuthenticated ? (
        <Button
          variant="noShadow"
          onClick={handleLogout}
          className="bg-main hover:bg-main/90 text-black cursor-pointer border-none ml-4"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      ) : (
        <Link to="/auth">
          <Button
            variant="noShadow"
            className="bg-main hover:bg-main/90 text-black cursor-pointer border-none ml-4"
          >
            Login / Sign Up
          </Button>
        </Link>
      )}
    </div>
  );
}

function ListItem({ className, title, children, internal, ...props }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        {internal ? (
          <Link
            to={props.href}
            className={cn(
              'hover:bg-accent block text-main-foreground select-none space-y-1 rounded-base border-2 border-transparent p-3 leading-none no-underline outline-hidden transition-colors hover:border-border',
              className
            )}
          >
            <div className="text-base font-heading leading-none">{title}</div>
            <p className="font-base line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </Link>
        ) : (
          <a
            className={cn(
              'hover:bg-accent block text-main-foreground select-none space-y-1 rounded-base border-2 border-transparent p-3 leading-none no-underline outline-hidden transition-colors hover:border-border',
              className
            )}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            <div className="text-base font-heading leading-none">{title}</div>
            <p className="font-base line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </a>
        )}
      </NavigationMenuLink>
    </li>
  );
}
ListItem.displayName = 'ListItem';
