import express from 'express';
import chalk from 'chalk';

import dotenv from 'dotenv';
import connectDB from './src/config/mongodb.config.js';

import short_url from './src/routes/short_Url.route.js';
import urlSchema from './src/models/short_url.model.js';

dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/create', short_url);

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const url = await urlSchema.findOne({ short_url: id });
  if (url) {
    url.clicks += 1;
    await url.save();
    console.log('Redirecting to:', url.full_url, ' Click count:', url.clicks);
    return res.redirect(url.full_url);
  }
  return res.status(404).send('URL not found');
});

app.listen(5000, () => {
  connectDB();
  console.log(
    `${chalk.bgGreen(
      chalk.bold('Server is running')
    )} on port ${chalk.yellow.underline('http://localhost:5000')}`
  );
});
