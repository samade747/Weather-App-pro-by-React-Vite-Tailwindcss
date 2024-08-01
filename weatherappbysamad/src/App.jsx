import { useEffect, useState } from 'react';
import './App.css';
import TopBar from './components/Topbar';
import WeatherCast from './components/WeatherCast';
import Drizzle from './assets/mist-pic.jpg';
import Cloud from './assets/cloudImg-2.jpg';
import Halfcloud from './assets/weather-pic.jpg';
import Thunder from './assets/thunder.jpg';
import RainImg from './assets/rain.jpg'; // Fixed duplicate assignment
import ClearImg from './assets/clear.jpg';
import OvercastImg from './assets/overcast.jpg';
import HourlyInfo from './components/HourlyInfo';

function App() {
  const [cityName, setCityName] = useState("Karachi");
  const [weatherData, setWeatherData] = useState(null);
  const [getHour, setGetHour] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);

  // Function to fetch weather data from backend API
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:5173/api/weather`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setFetchedData(data);
      console.log("Data from MongoDB:", data);

    } catch (err) {
      console.error('Error fetching data from MongoDB:', err);
      setError('Error fetching data from MongoDB');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(); // Fetch data when component mounts
  }, []); // Empty dependency array means it runs once after the first render

  useEffect(() => {
    const api_key = "d35a24d40f2c4023b4481203240603";

    async function getWeather(getCityName) {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${getCityName}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched data", data);

        const {
          current: { condition: { text }, last_updated, cloud, feelslike_c, feelslike_f, humidity, wind_mph },
          location: { name, country, lat, lon },
          forecast: { forecastday: [{ astro: { sunrise, sunset }, hour }] },
        } = data;

        const settingHour = hour.slice(13, 23);
        setGetHour([...settingHour]);

        const weatherInfo = {
          text,
          last_updated,
          feelslike_c,
          feelslike_f,
          humidity,
          wind_mph,
          name,
          country,
          sunrise,
          sunset,
          cloud,
        };

        setWeatherData(weatherInfo);

        await fetch('http://localhost:5173/api/weather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cityName: getCityName,
            coordinates: { lat, lon },
            weatherData: weatherInfo
          })
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Error fetching weather data');
        setLoading(false);
      }
    }

    getWeather(cityName);
  }, [cityName]);

  // Define bgImgMain based on weatherCondition
  let bgImgMain;

  if (weatherData) {
    const weatherCondition = weatherData.text;

    switch(weatherCondition) {
      case "Rainy": bgImgMain = RainImg; break;
      case "Sunny": bgImgMain = ClearImg; break;
      case "Patchy rain nearby": bgImgMain = Drizzle; break; // Corrected typo
      case "Partly Cloudy": bgImgMain = Halfcloud; break;
      case "Overcast": bgImgMain = OvercastImg; break;
      case "Moderate or Heavy rain": bgImgMain = Thunder; break;
      case "Light Rain": bgImgMain = RainImg; break;
      case "Light drizzle": bgImgMain = Drizzle; break;
      case "Mist": bgImgMain = Cloud; break;
      case "Cloudy": bgImgMain = Cloud; break;
      default: bgImgMain = Cloud;
    }
  } else {
    bgImgMain = Cloud; // Default background image
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='h-screen rounded-lg p-4 bg-cover bg-center' style={{ backgroundImage: `url(${bgImgMain})` }}>
      <TopBar weatherData={weatherData} setCityName={setCityName} />
      <WeatherCast weatherData={weatherData} />
      <HourlyInfo getHour={getHour} />
      <div>
        <h2>Weather Data from Database:</h2>
        {fetchedData.map(item => (
          <div key={item._id}>
            <p>City: {item.cityName}</p>
            <p>Coordinates: {item.coordinates.lat}, {item.coordinates.lon}</p>
            <p>Weather Condition: {item.weatherData.text}</p>
            <p>Temperature: {item.weatherData.feelslike_c}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
