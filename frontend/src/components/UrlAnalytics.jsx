import React, { useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { getUrlAnalytics } from '../api/shortUrl.api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UrlAnalytics = () => {
  const { id } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getUrlAnalytics(id);
        setAnalytics(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">URL Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Clicks */}
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
            <CardDescription>Total number of times this URL was accessed</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{analytics?.totalClicks || 0}</p>
          </CardContent>
        </Card>

        {/* Clicks by Country */}
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Click distribution by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics?.byCountry?.map((country) => (
                <div key={country._id} className="flex justify-between items-center">
                  <span>{country._id}</span>
                  <span className="font-semibold">{country.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Clicks by Browser */}
        <Card>
          <CardHeader>
            <CardTitle>Browsers</CardTitle>
            <CardDescription>Click distribution by browser</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics?.byBrowser?.map((browser) => (
                <div key={browser._id} className="flex justify-between items-center">
                  <span>{browser._id}</span>
                  <span className="font-semibold">{browser.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Clicks by Device */}
        <Card>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
            <CardDescription>Click distribution by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics?.byDevice?.map((device) => (
                <div key={device._id} className="flex justify-between items-center">
                  <span>{device._id}</span>
                  <span className="font-semibold">{device.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Clicks */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Daily Clicks</CardTitle>
            <CardDescription>Click trends over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics?.byDay?.map((day) => (
                <div key={day._id} className="flex justify-between items-center">
                  <span>{new Date(day._id).toLocaleDateString()}</span>
                  <span className="font-semibold">{day.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UrlAnalytics;