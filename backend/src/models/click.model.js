import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema(
  {
    shortUrl: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShortUrl',
      required: true,
      index: true // Add index for better query performance
    },
    ip: {
      type: String,
      required: true,
    },
    location: {
      country: String,
      region: String,
      city: String,
    },
    userAgent: {
      browser: String,
      device: String,
      os: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true // Add index for better query performance
    },
  },
  { 
    timestamps: true,
    collection: 'clicks' // Explicitly set collection name
  }
);

// Create indexes for better query performance
clickSchema.index({ shortUrl: 1, timestamp: -1 });

const Click = mongoose.model('Click', clickSchema);

export default Click;