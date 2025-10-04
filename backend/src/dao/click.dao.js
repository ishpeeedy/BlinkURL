import Click from '../models/click.model.js';

export const createClick = async (clickData) => {
  try {
    console.log('DAO - Received click data:', JSON.stringify(clickData, null, 2));
    
    console.log('DAO - Creating new Click model instance');
    const click = new Click(clickData);
    
    console.log('DAO - Click model instance created:', click);
    console.log('DAO - Attempting to save to database...');
    
    const savedClick = await click.save();
    console.log('DAO - Click successfully saved to database:', {
      id: savedClick._id,
      shortUrl: savedClick.shortUrl,
      timestamp: savedClick.timestamp
    });
    
    return savedClick;
  } catch (error) {
    console.error('DAO - Error saving click:', {
      error: error.message,
      stack: error.stack,
      validationErrors: error.errors,
      clickData: clickData
    });
    throw error;
  }
};

export const getClicksForUrl = async (shortUrlId, { startDate, endDate } = {}) => {
  const query = { shortUrl: shortUrlId };
  
  if (startDate || endDate) {
    query.timestamp = {};
    if (startDate) query.timestamp.$gte = new Date(startDate);
    if (endDate) query.timestamp.$lte = new Date(endDate);
  }

  return await Click.find(query).sort({ timestamp: -1 });
};

export const getClickAnalytics = async (shortUrlId) => {
  const analytics = await Click.aggregate([
    { $match: { shortUrl: shortUrlId } },
    {
      $facet: {
        // Total clicks
        totalClicks: [{ $count: 'count' }],
        
        // Clicks by country
        byCountry: [
          { $group: { 
            _id: '$location.country',
            count: { $sum: 1 }
          }},
          { $sort: { count: -1 } }
        ],
        
        // Clicks by browser
        byBrowser: [
          { $group: {
            _id: '$userAgent.browser',
            count: { $sum: 1 }
          }},
          { $sort: { count: -1 } }
        ],
        
        // Clicks by device
        byDevice: [
          { $group: {
            _id: '$userAgent.device',
            count: { $sum: 1 }
          }},
          { $sort: { count: -1 } }
        ],

        // Clicks by OS
        byOS: [
          { $group: {
            _id: '$userAgent.os',
            count: { $sum: 1 }
          }},
          { $sort: { count: -1 } }
        ],

        // Unique IPs
        uniqueIPs: [
          { $group: { _id: '$ip' } },
          { $count: 'count' }
        ],

        // IP frequency (for detecting repeat visitors and suspicious activity)
        ipFrequency: [
          { $group: {
            _id: '$ip',
            count: { $sum: 1 },
            lastSeen: { $max: '$timestamp' },
            firstSeen: { $min: '$timestamp' }
          }},
          { $sort: { count: -1 } }
        ],

        // Suspicious activity (IPs with high frequency)
        suspiciousActivity: [
          { $group: {
            _id: '$ip',
            count: { $sum: 1 },
            locations: { $addToSet: '$location.country' }
          }},
          { $match: { count: { $gte: 10 } } }, // Flag IPs with 10+ clicks
          { $sort: { count: -1 } },
          { $limit: 20 } // Top 20 suspicious IPs
        ],
        
        // Clicks by day (last 30 days)
        byDay: [
          {
            $match: {
              timestamp: { 
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              }
            }
          },
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { _id: 1 } }
        ],

        // Clicks by hour of day (all time)
        byHourOfDay: [
          {
            $group: {
              _id: { $hour: '$timestamp' },
              count: { $sum: 1 }
            }
          },
          { $sort: { _id: 1 } }
        ],

        // Clicks by day of week (all time)
        byDayOfWeek: [
          {
            $group: {
              _id: { $dayOfWeek: '$timestamp' }, // 1=Sunday, 7=Saturday
              count: { $sum: 1 }
            }
          },
          { $sort: { _id: 1 } }
        ],

        // Clicks by day of week with device breakdown
        byDayOfWeekWithDevice: [
          {
            $group: {
              _id: { 
                dayOfWeek: { $dayOfWeek: '$timestamp' },
                device: '$userAgent.device'
              },
              count: { $sum: 1 }
            }
          },
          {
            $group: {
              _id: '$_id.dayOfWeek',
              devices: {
                $push: {
                  device: '$_id.device',
                  count: '$count'
                }
              },
              total: { $sum: '$count' }
            }
          },
          { $sort: { _id: 1 } }
        ],

        // Clicks over last 90 days (for trend analysis)
        clicksOverTime: [
          {
            $match: {
              timestamp: { 
                $gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
              }
            }
          },
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { _id: 1 } }
        ]
      }
    }
  ]);

  const result = analytics[0];
  result.totalClicks = result.totalClicks[0]?.count || 0;
  result.uniqueVisitors = result.uniqueIPs[0]?.count || 0;
  result.repeatVisitors = result.totalClicks - result.uniqueVisitors;
  
  return result;
};
export const deleteClicksByShortUrl = async (shortUrlId) => {
  return await Click.deleteMany({ shortUrl: shortUrlId });
};
