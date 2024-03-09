import { useEffect, useState } from 'react'
import './App.css'

import Weather_pic from './Weather-pic.jpg'
import Drizzle from './assets/mist-pic.jpg'
import Cloud from './assets/cloudImg-2.jpg'
import Halfcloud from './assets/weather-pic.jpg'
import Thunder from './assets/thunder.jpg'
import RainImg from './assets/thunder.jpg'
import ClearImg from './assets/clear.jpg'
import OvercastImg from './assets/overcast.jpg'


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


        // destructuring the data from the response 
        const {current: {condition: { text }, last_updated,
                cloud,
                feelslike_c,
                feelslike_f,
                humditiy,
                wind_mph,
              }, location: { name, country },
                  forecast: { forecastday: { 0: {astro: { sunrise, sunset }, hour,                   
                },      
              },
            },
          } = response;
          console.log(text, sunrise, sunset)
          // Extracting hour from the respone data
      const settingHour = hour.slice(13, 23) // settng the hour state variable 
      setGetHour([...settingHour])

      // setng weather data state 
      SetWeatherData({
        text,
        last_updated,
        feelslike_c,
        feelslike_f,
        humditiy,
        wind_mph,
        name,
        country,
        sunrise,
        sunset,
        cloud,
      });
     });
    } 

    getWeather(cityName); //calling the getWeather fun with cityname dependency
    console.log('ctyname', cityName); // logging the c
  }, [cityName]);

  const weatherCondition = weatherData?.text;
  let bgImgMain;
  switch(weatherCondition){
    case "Rainy":
      bgImgMain = RainImg;
    case "Clear":
      bgImgMain = ClearImg;
    case

      break;
    default:
      bgImgMain = Cloud;

  }







  return (
    <div className='rounded-lg p-4 bg-cover bg-center' style={{ backgroundImage: `url(${bgImgMain})` }}>
       
    </div>
  )
}

export default App
