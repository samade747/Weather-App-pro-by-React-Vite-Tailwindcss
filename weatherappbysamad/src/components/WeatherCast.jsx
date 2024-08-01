import React from 'react';

function WeatherCast({ weatherData }) {
  if (!weatherData) return null;

  return (
    <div>
      <p>Last updated: {weatherData.last_updated}</p>
      <p>Temperature: {weatherData.feelslike_c}°C / {weatherData.feelslike_f}°F</p>
      <p>Humidity: {weatherData.humidity}%</p>
      <p>Wind: {weatherData.wind_mph} mph</p>
    </div>
  );
}

export default WeatherCast;
