import React from 'react';

function TopBar({ weatherData, setCityName }) {
  const handleCityChange = (e) => {
    setCityName(e.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter city name" 
        onChange={handleCityChange}
      />
      <div>
        <p>{weatherData?.name}</p>
        <p>{weatherData?.country}</p>
        <p>{weatherData?.feelslike_c}°C</p>
      </div>
    </div>
  );
}

export default TopBar;
