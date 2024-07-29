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

app.post('/api/weather', async (req, res) => {
  const { cityName, coordinates, weatherData } = req.body;

  const newWeather = new Weather({
    cityName,
    coordinates,
    weatherData
  });

  try {
    const savedWeather = await newWeather.save();
    res.status(201).json(savedWeather);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
