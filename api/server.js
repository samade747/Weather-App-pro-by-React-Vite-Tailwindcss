// server.js or app.js

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const weatherSchema = new mongoose.Schema({
  cityName: String,
  coordinates: {
    lat: Number,
    lon: Number
  },
  weatherData: Object,
}, { timestamps: true });

const Weather = mongoose.model('Weather', weatherSchema);

app.get('/api/weather', async (req, res) => {
  try {
    const data = await Weather.find();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching weather data from MongoDB:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
