import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
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
import { toast } from 'sonner';

import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';
import { queryClient } from '../main';

const UrlForm = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({ queryKey: ['userUrls'] });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Short URL copied to clipboard!');
    setCopied(true);
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>Enter the URL you want to shorten</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Enter your URL</Label>
              <Input
                type="url"
                id="url"
                value={url}
                onInput={(event) => setUrl(event.target.value)}
                placeholder="https://example.com"
                required
              />
            </div>
            {error && (
              <Alert variant="warning">
                <AlertTriangle />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        {isAuthenticated && (
          <div className="space-y-2 w-full">
            <Label htmlFor="customSlug">Custom URL (optional)</Label>
            <Input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="Enter custom slug"
            />
          </div>
        )}
        <Button type="submit" onClick={handleSubmit} className="w-full">
          Shorten URL
        </Button>
        {shortUrl && (
          <div className="space-y-2 w-full">
            Your shortened URL:
            <div className="flex">
              <Input type="text" readOnly value={shortUrl} />
              <Button
                variant="noShadow"
                onClick={handleCopy}
                className={`px-4 py-2 rounded-r-md transition-colors duration-500 ${
                  copied
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        )}
        {!isAuthenticated && (
          <div className="text-center">
            Want a custom URL?{' '}
            <Link
              to="/auth"
              className="underline underline-offset-4 cursor-pointer"
            >
              Sign up
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default UrlForm;
