import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import chalk from 'chalk';
import User from './src/models/user.model.js';
import UrlModel from './src/models/short_url.model.js';
import Click from './src/models/click.model.js';

dotenv.config();

// Seed data configuration
const SEED_USER = {
  name: 'Admin User',
  email: 'admin@blinkurl.com',
  password: 'Admin123!', // Will be hashed
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
};

const COUNTRIES = [
  { country: 'United States', region: 'California', city: 'San Francisco' },
  { country: 'United States', region: 'New York', city: 'New York' },
  { country: 'United States', region: 'Texas', city: 'Austin' },
  { country: 'United Kingdom', region: 'England', city: 'London' },
  { country: 'United Kingdom', region: 'Scotland', city: 'Edinburgh' },
  { country: 'Canada', region: 'Ontario', city: 'Toronto' },
  { country: 'Canada', region: 'British Columbia', city: 'Vancouver' },
  { country: 'Germany', region: 'Bavaria', city: 'Munich' },
  { country: 'Germany', region: 'Berlin', city: 'Berlin' },
  { country: 'France', region: 'Île-de-France', city: 'Paris' },
  { country: 'France', region: 'Provence', city: 'Marseille' },
  { country: 'Spain', region: 'Catalonia', city: 'Barcelona' },
  { country: 'Spain', region: 'Madrid', city: 'Madrid' },
  { country: 'Italy', region: 'Lazio', city: 'Rome' },
  { country: 'Italy', region: 'Lombardy', city: 'Milan' },
  { country: 'Netherlands', region: 'North Holland', city: 'Amsterdam' },
  { country: 'Belgium', region: 'Brussels', city: 'Brussels' },
  { country: 'Sweden', region: 'Stockholm', city: 'Stockholm' },
  { country: 'Norway', region: 'Oslo', city: 'Oslo' },
  { country: 'Denmark', region: 'Copenhagen', city: 'Copenhagen' },
  { country: 'India', region: 'Maharashtra', city: 'Mumbai' },
  { country: 'India', region: 'Karnataka', city: 'Bangalore' },
  { country: 'India', region: 'Delhi', city: 'New Delhi' },
  { country: 'Japan', region: 'Tokyo', city: 'Tokyo' },
  { country: 'Japan', region: 'Osaka', city: 'Osaka' },
  { country: 'South Korea', region: 'Seoul', city: 'Seoul' },
  { country: 'China', region: 'Beijing', city: 'Beijing' },
  { country: 'China', region: 'Shanghai', city: 'Shanghai' },
  { country: 'Australia', region: 'New South Wales', city: 'Sydney' },
  { country: 'Australia', region: 'Victoria', city: 'Melbourne' },
  { country: 'Brazil', region: 'São Paulo', city: 'São Paulo' },
  { country: 'Brazil', region: 'Rio de Janeiro', city: 'Rio de Janeiro' },
  { country: 'Mexico', region: 'Mexico City', city: 'Mexico City' },
  { country: 'Argentina', region: 'Buenos Aires', city: 'Buenos Aires' },
  { country: 'South Africa', region: 'Gauteng', city: 'Johannesburg' },
  { country: 'Egypt', region: 'Cairo', city: 'Cairo' },
  { country: 'Nigeria', region: 'Lagos', city: 'Lagos' },
  { country: 'Singapore', region: 'Singapore', city: 'Singapore' },
  { country: 'Malaysia', region: 'Kuala Lumpur', city: 'Kuala Lumpur' },
  { country: 'Thailand', region: 'Bangkok', city: 'Bangkok' },
  { country: 'Indonesia', region: 'Jakarta', city: 'Jakarta' },
  { country: 'Philippines', region: 'Metro Manila', city: 'Manila' },
  { country: 'Vietnam', region: 'Hanoi', city: 'Hanoi' },
  { country: 'Poland', region: 'Mazovia', city: 'Warsaw' },
  { country: 'Russia', region: 'Moscow', city: 'Moscow' },
  { country: 'Turkey', region: 'Istanbul', city: 'Istanbul' },
  { country: 'UAE', region: 'Dubai', city: 'Dubai' },
  { country: 'Saudi Arabia', region: 'Riyadh', city: 'Riyadh' },
  { country: 'Israel', region: 'Tel Aviv', city: 'Tel Aviv' },
  { country: 'New Zealand', region: 'Auckland', city: 'Auckland' },
];

const BROWSERS = [
  'Chrome',
  'Firefox',
  'Safari',
  'Edge',
  'Opera',
  'Brave',
  'Samsung Internet',
  'UC Browser',
];

const DEVICES = [
  'Desktop',
  'Mobile',
  'Tablet',
  'Desktop',
  'Mobile',
  'Desktop', // More desktop traffic
];

const OS_LIST = [
  'Windows 11',
  'Windows 10',
  'macOS Sonoma',
  'macOS Ventura',
  'Ubuntu 22.04',
  'Android 14',
  'Android 13',
  'iOS 17',
  'iOS 16',
  'Linux',
];

const SHORT_URLS = [
  {
    full_url: 'https://github.com/torvalds/linux',
    short_url: 'gh-linux',
    clickCount: 3200, // Main URL with 3k+ hits
  },
  {
    full_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    short_url: 'yt-music',
    clickCount: 850,
  },
  {
    full_url: 'https://www.amazon.com/deals',
    short_url: 'amz-deals',
    clickCount: 1240,
  },
  {
    full_url: 'https://docs.google.com/presentation/d/1abc123xyz789',
    short_url: 'gdoc-pres',
    clickCount: 420,
  },
  {
    full_url: 'https://www.wikipedia.org/wiki/Artificial_intelligence',
    short_url: 'wiki-ai',
    clickCount: 680,
  },
  {
    full_url: 'https://www.reddit.com/r/programming',
    short_url: 'r-prog',
    clickCount: 920,
  },
  {
    full_url: 'https://stackoverflow.com/questions/tagged/javascript',
    short_url: 'so-js',
    clickCount: 1560,
  },
  {
    full_url: 'https://www.netflix.com/browse',
    short_url: 'nf-browse',
    clickCount: 340,
  },
  {
    full_url: 'https://www.linkedin.com/jobs/search',
    short_url: 'li-jobs',
    clickCount: 780,
  },
  {
    full_url: 'https://twitter.com/elonmusk',
    short_url: 'tw-elon',
    clickCount: 1120,
  },
];

// Helper functions
const randomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const generateIP = () => {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
};

const getRandomDate = (daysBack) => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysBack);
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  return new Date(
    now.getTime() -
      randomDays * 24 * 60 * 60 * 1000 -
      randomHours * 60 * 60 * 1000 -
      randomMinutes * 60 * 1000
  );
};

const generateClicks = (shortUrlId, count, daysBack = 90) => {
  const clicks = [];

  for (let i = 0; i < count; i++) {
    const location = randomElement(COUNTRIES);
    clicks.push({
      shortUrl: shortUrlId,
      ip: generateIP(),
      location: {
        country: location.country,
        region: location.region,
        city: location.city,
      },
      userAgent: {
        browser: randomElement(BROWSERS),
        device: randomElement(DEVICES),
        os: randomElement(OS_LIST),
      },
      timestamp: getRandomDate(daysBack),
      createdAt: getRandomDate(daysBack),
      updatedAt: getRandomDate(daysBack),
    });
  }

  return clicks;
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log(chalk.blue('Connecting to MongoDB...'));
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.green('✓ MongoDB connected'));

    // Clear existing data
    console.log(chalk.yellow('\nClearing existing data...'));
    await User.deleteMany({});
    await UrlModel.deleteMany({});
    await Click.deleteMany({});
    console.log(chalk.green('✓ Existing data cleared'));

    // Create user
    console.log(chalk.blue('\nCreating user...'));
    const hashedPassword = await bcrypt.hash(SEED_USER.password, 10);
    const user = await User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hashedPassword,
      avatar: SEED_USER.avatar,
    });
    console.log(chalk.green(`✓ User created: ${user.email}`));

    // Create short URLs
    console.log(chalk.blue('\nCreating short URLs...'));
    const urlIds = [];

    for (const urlData of SHORT_URLS) {
      const shortUrl = await UrlModel.create({
        full_url: urlData.full_url,
        short_url: urlData.short_url,
        clicks: urlData.clickCount,
        user: user._id,
        createdAt: getRandomDate(120),
        updatedAt: new Date(),
      });
      urlIds.push({
        id: shortUrl._id,
        clickCount: urlData.clickCount,
        short_url: urlData.short_url,
      });
      console.log(
        chalk.gray(
          `  - Created: ${urlData.short_url} (${urlData.clickCount} clicks planned)`
        )
      );
    }
    console.log(chalk.green(`✓ ${SHORT_URLS.length} short URLs created`));

    // Generate clicks for each URL
    console.log(chalk.blue('\nGenerating click data...'));
    let totalClicks = 0;

    for (const urlInfo of urlIds) {
      console.log(
        chalk.gray(
          `  - Generating ${urlInfo.clickCount} clicks for ${urlInfo.short_url}...`
        )
      );
      const clicks = generateClicks(urlInfo.id, urlInfo.clickCount);

      // Insert clicks in batches to avoid memory issues
      const batchSize = 500;
      for (let i = 0; i < clicks.length; i += batchSize) {
        const batch = clicks.slice(i, i + batchSize);
        await Click.insertMany(batch);
        totalClicks += batch.length;

        if (clicks.length > 1000 && (i + batchSize) % 1000 === 0) {
          console.log(
            chalk.gray(
              `    ${i + batchSize}/${clicks.length} clicks inserted...`
            )
          );
        }
      }

      console.log(
        chalk.green(
          `  ✓ ${urlInfo.clickCount} clicks created for ${urlInfo.short_url}`
        )
      );
    }

    console.log(chalk.green(`✓ Total ${totalClicks} clicks generated`));

    // Summary
    console.log(
      chalk.bgGreen(chalk.black('\n========== SEED COMPLETE =========='))
    );
    console.log(chalk.cyan('\n📊 Database seeded successfully!\n'));
    console.log(chalk.white('Login Credentials:'));
    console.log(chalk.yellow(`  Email:    ${SEED_USER.email}`));
    console.log(chalk.yellow(`  Password: ${SEED_USER.password}`));
    console.log(chalk.white('\nStatistics:'));
    console.log(chalk.gray(`  Users:      1`));
    console.log(chalk.gray(`  Short URLs: ${SHORT_URLS.length}`));
    console.log(chalk.gray(`  Total Clicks: ${totalClicks}`));
    console.log(chalk.gray(`  Countries:  ${COUNTRIES.length}`));
    console.log(chalk.white('\nHighest traffic URL:'));
    console.log(
      chalk.gray(
        `  ${SHORT_URLS[0].short_url} - ${SHORT_URLS[0].clickCount} clicks`
      )
    );
    console.log(chalk.gray(`  Full URL: ${SHORT_URLS[0].full_url}\n`));
  } catch (error) {
    console.error(chalk.red('Error seeding database:'), error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log(chalk.blue('MongoDB connection closed'));
  }
};

// Run the seed
seedDatabase()
  .then(() => {
    console.log(chalk.green('\n✓ Seed script completed successfully'));
    process.exit(0);
  })
  .catch((error) => {
    console.error(chalk.red('\n✗ Seed script failed:'), error);
    process.exit(1);
  });
