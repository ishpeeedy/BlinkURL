import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from '@tanstack/react-router';
import { getUrlAnalytics } from '../api/shortUrl.api';
import { TrendingUp, ChevronDown } from "lucide-react";
import { Label, Pie, PieChart, Bar, BarChart, CartesianGrid, XAxis, Area, AreaChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UrlAnalytics = () => {
  const params = useParams({ from: '/analytics/$id' });
  const id = params?.id;
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!id) {
        setError('No URL ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching analytics for ID:', id);
        const data = await getUrlAnalytics(id);
        console.log('Received analytics data:', data);
        setAnalytics(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err.message || 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  // Transform browser data for chart
  const browserData = useMemo(() => {
    if (!analytics?.byBrowser) return [];
    
    const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
    return analytics.byBrowser.map((item, index) => ({
      browser: item._id || 'Unknown',
      visitors: item.count,
      fill: colors[index % colors.length]
    }));
  }, [analytics]);

  // Transform country data for chart
  const countryData = useMemo(() => {
    if (!analytics?.byCountry) return [];
    
    return analytics.byCountry.map((item) => ({
      country: item._id || 'Unknown',
      clicks: item.count
    }));
  }, [analytics]);

  // Transform device data for chart
  const deviceData = useMemo(() => {
    if (!analytics?.byDevice) return [];
    
    const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];
    return analytics.byDevice.map((item, index) => ({
      device: item._id || 'Unknown',
      visitors: item.count,
      fill: colors[index % colors.length]
    }));
  }, [analytics]);

  const totalClicks = useMemo(() => {
    return analytics?.totalClicks || 0;
  }, [analytics]);

  // Transform OS data for chart
  const osData = useMemo(() => {
    if (!analytics?.byOS) return [];
    
    const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
    return analytics.byOS.map((item, index) => ({
      os: item._id || 'Unknown',
      visitors: item.count,
      fill: colors[index % colors.length]
    }));
  }, [analytics]);

  // Transform unique vs repeat visitors data
  const visitorTypeData = useMemo(() => {
    if (!analytics) return [];
    
    return [
      { 
        type: 'Unique Visitors', 
        count: analytics.uniqueVisitors || 0,
        fill: "var(--chart-1)"
      },
      { 
        type: 'Repeat Visitors', 
        count: analytics.repeatVisitors || 0,
        fill: "var(--chart-2)"
      }
    ];
  }, [analytics]);

  // Suspicious activity data
  const suspiciousIPs = useMemo(() => {
    return analytics?.suspiciousActivity || [];
  }, [analytics]);

  // Clicks over time data (with timeframe filtering)
  const clicksOverTimeData = useMemo(() => {
    if (!analytics?.clicksOverTime) return [];
    
    const now = new Date();
    let daysToSubtract = 30;
    if (timeRange === "7d") daysToSubtract = 7;
    else if (timeRange === "90d") daysToSubtract = 90;
    
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    
    return analytics.clicksOverTime
      .filter(item => new Date(item._id) >= startDate)
      .map(item => ({
        date: item._id,
        clicks: item.count
      }));
  }, [analytics, timeRange]);

  // Clicks by hour of day
  const clicksByHourData = useMemo(() => {
    if (!analytics?.byHourOfDay) return [];
    
    return analytics.byHourOfDay.map(item => ({
      hour: `${item._id}:00`,
      clicks: item.count
    }));
  }, [analytics]);

  // Clicks by day of week with device breakdown
  const clicksByDayOfWeekData = useMemo(() => {
    if (!analytics?.byDayOfWeekWithDevice) return [];
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return analytics.byDayOfWeekWithDevice.map(item => {
      const dayData = {
        day: dayNames[item._id - 1] || 'Unknown',
        mobile: 0,
        desktop: 0,
        tablet: 0
      };
      
      // Aggregate counts by device type
      item.devices.forEach(deviceItem => {
        const deviceType = (deviceItem.device || 'desktop').toLowerCase();
        if (deviceType === 'mobile') {
          dayData.mobile += deviceItem.count;
        } else if (deviceType === 'tablet') {
          dayData.tablet += deviceItem.count;
        } else {
          dayData.desktop += deviceItem.count;
        }
      });
      
      return dayData;
    });
  }, [analytics]);

  const browserChartConfig = {
    visitors: { label: "Visitors" },
    chrome: { label: "Chrome", color: "var(--chart-1)" },
    safari: { label: "Safari", color: "var(--chart-2)" },
    firefox: { label: "Firefox", color: "var(--chart-3)" },
    edge: { label: "Edge", color: "var(--chart-4)" },
    other: { label: "Other", color: "var(--chart-5)" },
  };

  const countryChartConfig = {
    clicks: { label: "Clicks", color: "var(--chart-1)" },
  };

  const deviceChartConfig = {
    visitors: { label: "Visitors" },
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
    tablet: { label: "Tablet", color: "var(--chart-3)" },
  };

  const osChartConfig = {
    visitors: { label: "Visitors" },
    windows: { label: "Windows", color: "var(--chart-1)" },
    macos: { label: "macOS", color: "var(--chart-2)" },
    linux: { label: "Linux", color: "var(--chart-3)" },
    android: { label: "Android", color: "var(--chart-4)" },
    ios: { label: "iOS", color: "var(--chart-5)" },
  };

  const visitorTypeConfig = {
    count: { label: "Visitors" },
    unique: { label: "Unique", color: "var(--chart-1)" },
    repeat: { label: "Repeat", color: "var(--chart-2)" },
  };

  const timeSeriesConfig = {
    clicks: { label: "Clicks", color: "var(--chart-1)" },
  };

  const hourlyConfig = {
    clicks: { label: "Clicks", color: "var(--chart-2)" },
  };

  const weekdayConfig = {
    mobile: { label: "Mobile", color: "var(--chart-2)" },
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    tablet: { label: "Tablet", color: "var(--chart-3)" },
  };

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
      <h1 className="text-2xl font-bold mb-6">URL Analytics for: {id}</h1>
      
      {/* URL Details Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>URL Details</CardTitle>
          <CardDescription>Information about this shortened URL</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Short URL</p>
              <p className="text-sm font-mono bg-muted px-3 py-2 rounded border-2 border-black break-all">
                {import.meta.env.VITE_BACKEND_URL}/{analytics?.urlId || id}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Created</p>
              <p className="text-sm px-3 py-2">
                {analytics?.createdAt ? new Date(analytics.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'N/A'}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Original URL</p>
            <p className="text-sm font-mono bg-muted px-3 py-2 rounded border-2 border-black break-all">
              {analytics?.originalUrl || 'Loading...'}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Clicks Card */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-2">
            <CardTitle>Total Clicks</CardTitle>
            <CardDescription>All time clicks</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <p className="text-5xl font-bold text-primary">{totalClicks}</p>
          </CardContent>
        </Card>

        {/* Browser Distribution Chart */}
        {browserData.length > 0 && (
          <Card className="flex flex-col lg:col-span-2">
            <CardHeader className="items-center pb-0">
              <CardTitle>Browser Distribution</CardTitle>
              <CardDescription>Clicks by browser type</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={browserChartConfig}
                className="mx-auto aspect-square max-h-[300px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={browserData}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={2}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalClicks.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-foreground"
                              >
                                Clicks
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 leading-none font-medium">
                Browser analytics <TrendingUp className="h-4 w-4" />
              </div>
            </CardFooter>
          </Card>
        )}

        {/* Device Distribution Chart */}
        {deviceData.length > 0 && (
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Device Type</CardTitle>
              <CardDescription>Clicks by device</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={deviceChartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={deviceData}
                    dataKey="visitors"
                    nameKey="device"
                    innerRadius={50}
                    strokeWidth={2}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {/* Country Distribution Chart */}
        {countryData.length > 0 && (
          <Card className="flex flex-col lg:col-span-2">
            <CardHeader className="items-center pb-0">
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Clicks by country</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={countryChartConfig}
                className="mx-auto aspect-video max-h-[300px]"
              >
                <BarChart data={countryData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="country"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="clicks" fill="var(--chart-1)" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="text-muted-foreground leading-none">
                Top countries by click count
              </div>
            </CardFooter>
          </Card>
        )}

        {/* OS Distribution Chart */}
        {osData.length > 0 && (
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Operating Systems</CardTitle>
              <CardDescription>Clicks by OS</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={osChartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={osData}
                    dataKey="visitors"
                    nameKey="os"
                    innerRadius={50}
                    strokeWidth={2}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="text-muted-foreground leading-none">
                Operating system distribution
              </div>
            </CardFooter>
          </Card>
        )}

        {/* Unique vs Repeat Visitors Chart */}
        {visitorTypeData.length > 0 && (
          <Card className="flex flex-col lg:col-span-2">
            <CardHeader className="items-center pb-0">
              <CardTitle>Visitor Engagement</CardTitle>
              <CardDescription>Unique vs Repeat Visitors</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={visitorTypeConfig}
                className="mx-auto aspect-video max-h-[300px]"
              >
                <BarChart data={visitorTypeData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="type"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--chart-1)" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 leading-none font-medium">
                Engagement Analytics <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                {analytics?.uniqueVisitors || 0} unique visitors out of {totalClicks} total clicks
              </div>
            </CardFooter>
          </Card>
        )}

        {/* Suspicious Activity Alert */}
        {suspiciousIPs.length > 0 && (
          <Card className="flex flex-col lg:col-span-3 border-orange-500 bg-orange-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-orange-700">⚠️ Suspicious Activity Detected</CardTitle>
              <CardDescription className="text-orange-600">
                High-frequency clicks from the same IP addresses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suspiciousIPs.slice(0, 5).map((item, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-3 bg-white rounded-md border border-orange-200"
                  >
                    <div className="flex-1">
                      <span className="font-mono text-sm font-semibold">{item._id}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({item.locations?.join(', ') || 'Unknown'})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange-600">{item.count}</span>
                      <span className="text-xs text-muted-foreground">clicks</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="text-orange-600 leading-none">
                {suspiciousIPs.length} IP{suspiciousIPs.length > 1 ? 's' : ''} with 10+ clicks detected
              </div>
            </CardFooter>
          </Card>
        )}

        {/* Clicks Over Time - Interactive Area Chart */}
        {clicksOverTimeData.length > 0 && (
          <Card className="flex flex-col lg:col-span-3">
            <CardHeader className="flex items-center sm:gap-2 gap-4 space-y-0 sm:flex-row flex-col">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>Clicks Over Time</CardTitle>
                <CardDescription>
                  Traffic trends and patterns
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[160px] sm:ml-auto">
                    {timeRange === "7d" ? "Last 7 days" : timeRange === "30d" ? "Last 30 days" : "Last 90 days"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTimeRange("7d")}>
                    Last 7 days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeRange("30d")}>
                    Last 30 days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeRange("90d")}>
                    Last 90 days
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
              <ChartContainer
                config={timeSeriesConfig}
                className="aspect-auto h-[300px] w-full"
              >
                <AreaChart data={clicksOverTimeData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                        }}
                        indicator="dot"
                      />
                    }
                  />
                  <Area
                    dataKey="clicks"
                    type="natural"
                    fill="var(--chart-1)"
                    stroke="var(--chart-1)"
                    fillOpacity={0.4}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trend analysis <TrendingUp className="h-4 w-4" />
              </div>
            </CardFooter>
          </Card>
        )}

        {/* Clicks by Hour of Day */}
        {clicksByHourData.length > 0 && (
          <Card className="flex flex-col lg:col-span-1.5">
            <CardHeader className="items-center pb-0">
              <CardTitle>Peak Hours</CardTitle>
              <CardDescription>Clicks by hour of day</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={hourlyConfig}
                className="mx-auto aspect-square max-h-[300px]"
              >
                <BarChart data={clicksByHourData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="hour"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="clicks" fill="var(--chart-2)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="text-muted-foreground leading-none">
                Identify peak engagement times
              </div>
            </CardFooter>
          </Card>
        )}

        {/* Clicks by Day of Week */}
        {clicksByDayOfWeekData.length > 0 && (
          <Card className="flex flex-col lg:col-span-1.5">
            <CardHeader className="items-center pb-0">
              <CardTitle>Weekly Patterns</CardTitle>
              <CardDescription>Clicks by day of week</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={weekdayConfig}
                className="mx-auto aspect-square max-h-[300px]"
              >
                <BarChart accessibilityLayer data={clicksByDayOfWeekData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <Bar
                    dataKey="desktop"
                    stackId="a"
                    fill="var(--color-desktop)"
                    radius={[0, 0, 4, 4]}
                  />
                  <Bar
                    dataKey="mobile"
                    stackId="a"
                    fill="var(--color-mobile)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="tablet"
                    stackId="a"
                    fill="var(--color-tablet)"
                    radius={[0, 0, 0, 0]}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        hideLabel
                        className="w-[180px]"
                        formatter={(value, name, item, index) => {
                          const total = (item.payload.desktop || 0) + (item.payload.mobile || 0) + (item.payload.tablet || 0);
                          const isLastItem = index === 2; // tablet is last (index 2)
                          
                          return (
                            <>
                              <div
                                className="h-2.5 w-2.5 shrink-0 border border-border rounded-[2px] bg-(--color-bg)"
                                style={{
                                  '--color-bg': `var(--color-${name})`,
                                }}
                              />
                              {weekdayConfig[name]?.label || name}
                              <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                                {value}
                                <span className="text-muted-foreground font-normal">clicks</span>
                              </div>
                              {isLastItem && total > 0 && (
                                <div className="text-foreground mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium">
                                  Total
                                  <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                                    {total}
                                    <span className="text-muted-foreground font-normal">clicks</span>
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        }}
                      />
                    }
                    cursor={false}
                    defaultIndex={1}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="text-muted-foreground leading-none">
                Mobile vs Desktop engagement by weekday
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UrlAnalytics;