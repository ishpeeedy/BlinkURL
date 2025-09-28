import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';
import { queryClient } from '../main';

const UrlForm = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState('');
  const { isAuthenticated } = useSelector((state) => state.auth);

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
    setCopied(true);
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="div">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardDescription>Enter the URL you want to shorten</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Enter your URL</Label>
                  <Input
                    type="url"
                    id="url"
                    value={url}
                    onInput={(event) => setUrl(event.target.value)}
                    placeholder="https://example.com"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Shorten URL
            </Button>
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            {isAuthenticated && (
              <div className="flex flex-col w-full">
                <label htmlFor="customSlug">Custom URL (optional)</label>
                <Input
                  type="text"
                  id="customSlug"
                  value={customSlug}
                  onChange={(event) => setCustomSlug(event.target.value)}
                  placeholder="Enter custom slug"
                />
              </div>
            )}
            {shortUrl && (
              <div className="flex flex-col w-full">
                Your shortened URL:
                <div className="flex items-center">
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
            {/* REQURIES A !ISAUTHENTICATED -TO ONLY BE DEISPLAAYED IF NOT LOGGED IN */}
            {!isAuthenticated && (
              <div className="mt-4 text-center text-sm">
                Want a custom URL?{' '}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UrlForm;
