import express from 'express';
import chalk from 'chalk';
import { nanoid } from 'nanoid';
import dotenv from "dotenv";
import connectDB from './src/config/mongodb.config.js';
import urlSchema from './src/models/shorturl.model.js'; 

dotenv.config({ path: "./.env" })

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/api/create', (req, res) => {
  const {url} = req.body
  const shortUrl = nanoid(8);
  const newUrl = new urlSchema({
    full_url: url,
    short_url: shortUrl,
  });
  newUrl.save()
  console.log(shortUrl);
  console.log('URL saved successfully');
  res.send(shortUrl);
})

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const url = await urlSchema.findOne({ short_url: id });
  if (url) {
    url.clicks++;
    await url.save();
    console.log('Redirecting to:', url.full_url, ' Click count:', url.clicks);
    return res.redirect(url.full_url);
  }
  return res.status(404).send('URL not found');
})

app.listen(5000, () => {
  connectDB();
  console.log(chalk.bgGreen(chalk.bold('Server is running')) + ' on port ' + chalk.yellow.underline('http://localhost:5000'));
})