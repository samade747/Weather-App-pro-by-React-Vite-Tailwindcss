// src/components/HourlyInfo.jsx
import React from 'react';
import PropTypes from 'prop-types';

// Example data structure for hourly data
const hourlyData = [
  { time: '08:00', temperature: '22°C', condition: 'Sunny' },
  { time: '09:00', temperature: '24°C', condition: 'Partly Cloudy' },
  { time: '10:00', temperature: '26°C', condition: 'Cloudy' },
  // Add more hourly data as needed
];

const HourlyInfo = () => {
  return (
    <div className="hourly-info">
      <h2>Hourly Weather</h2>
      <ul>
        {hourlyData.map((data, index) => (
          <li key={index} className="hourly-item">
            <span className="hour">{data.time}</span>
            <span className="temperature">{data.temperature}</span>
            <span className="condition">{data.condition}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

HourlyInfo.propTypes = {
  hourlyData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      temperature: PropTypes.string.isRequired,
      condition: PropTypes.string.isRequired,
    })
  ),
};

HourlyInfo.defaultProps = {
  hourlyData: [],
};

export default HourlyInfo;
