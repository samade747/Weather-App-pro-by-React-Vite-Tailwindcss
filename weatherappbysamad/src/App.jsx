import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, SetWeatherData] = useState();
  const [getHour, setGetHour] = useState();

  useEffect(() => {
    const api_key = "d35a24d40f2c4023b4481203240603";
    async function getWeather(getCityName) {
      await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${getCityName ? getCityName : "Karachi"}`
      )
      .then((res) => res.json())
      .then((response) => {
        console.log("data", response);

        const {
          current: {
            condition: { text },
            last_updated,
            cloud,
            feelslike_c,
            feelslike_f,
            humditiy,
            wind_mph,
          },
          location: { name, country },
            forecast: {
              forecastday: {
                0: {
                  astro: { sunrise, sunset },
                  hour,
                },      
              },
            },
          } = response;






      })
    }
  
  }, [])


  return (
    <>
       <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </>
  )
}

export default App
