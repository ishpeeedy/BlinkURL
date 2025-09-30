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
        ]
      }
    }
  ]);

  const result = analytics[0];
  result.totalClicks = result.totalClicks[0]?.count || 0;
  
  return result;
};