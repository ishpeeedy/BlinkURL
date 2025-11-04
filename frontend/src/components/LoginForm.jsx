import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('username@mail.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const handleSubmit = async () => {
    console.log('🔑 [LOGIN] Starting login process...');
    setLoading(true);
    setError('');

    try {
      console.log('🔑 [LOGIN] Calling loginUser API...');
      console.log('🔑 [LOGIN] Email:', email);
      console.log('🔑 [LOGIN] Backend URL:', import.meta.env.VITE_BACKEND_URL);

      const data = await loginUser(password, email);

      console.log('✅ [LOGIN] Login successful!', data);
      console.log('✅ [LOGIN] Dispatching user to Redux...');

      dispatch(login(data.user));

      console.log('✅ [LOGIN] Navigating to dashboard...');
      navigate({ to: '/dashboard' });

      setLoading(false);
      console.log('✅ [LOGIN] Login complete!');
    } catch (err) {
      console.error('❌ [LOGIN] Login failed!');
      console.error('❌ [LOGIN] Error object:', err);
      console.error('❌ [LOGIN] Error message:', err.message);
      console.error('❌ [LOGIN] Error response:', err.response);
      console.error('❌ [LOGIN] Error response data:', err.response?.data);
      console.error('❌ [LOGIN] Error response status:', err.response?.status);

      setLoading(false);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please check your credentials.';
      console.error('❌ [LOGIN] Setting error message:', errorMessage);

      setError(errorMessage);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="warning">
            <AlertTriangle />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        <div className="text-center">
          Don't have an account?{' '}
          <span
            onClick={() => state(false)}
            className="underline underline-offset-4 cursor-pointer"
          >
            Register
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
