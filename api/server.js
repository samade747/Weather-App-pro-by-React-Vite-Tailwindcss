// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

const weatherSchema = new mongoose.Schema({
  cityName: String,
  coordinates: {
    lat: Number,
    lon: Number
  },
  weatherData: Object,
}, { timestamps: true });

const Weather = mongoose.model('Weather', weatherSchema);

// Routes
app.post('/api/weather', async (req, res) => {
  const { cityName, coordinates, weatherData } = req.body;

  const newWeather = new Weather({
    cityName,
    coordinates,
    weatherData
  });

  try {
    await newWeather.save();
    res.status(201).json(newWeather);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
