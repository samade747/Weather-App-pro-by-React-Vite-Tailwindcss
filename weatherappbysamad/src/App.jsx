import { useEffect, useState } from 'react';
import './App.css';
import TopBar from './components/Topbar';
import WeatherCast from './components/WeatherCast';
import Drizzle from './assets/mist-pic.jpg';
import Cloud from './assets/cloudImg-2.jpg';
import Halfcloud from './assets/weather-pic.jpg';
import Thunder from './assets/thunder.jpg';
import RainImg from './assets/thunder.jpg';
import ClearImg from './assets/clear.jpg';
import OvercastImg from './assets/overcast.jpg';
import HourlyInfo from './components/HourlyInfo';

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [getHour, setGetHour] = useState();

  useEffect(() => {
    const api_key = "d35a24d40f2c4023b4481203240603";

    async function getWeather(getCityName) {
      await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${getCityName ? getCityName : "Karachi"}`
      )
      .then((res) => res.json())
      .then(async (response) => {
        console.log("data", response);

        const {
          current: { condition: { text }, last_updated, cloud, feelslike_c, feelslike_f, humditiy, wind_mph },
          location: { name, country, lat, lon },
          forecast: { forecastday: { 0: {astro: { sunrise, sunset }, hour } } },
        } = response;
        
        const settingHour = hour.slice(13, 23);
        setGetHour([...settingHour]);

        const weatherInfo = {
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
        };

        setWeatherData(weatherInfo);

        // Save to MongoDB
        await fetch('http://localhost:5000/api/weather', {
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
      });
    }

    getWeather(cityName);
    console.log('ctyname', cityName);
  }, [cityName]);

  const weatherCondition = weatherData?.text;
  let bgImgMain;

  switch(weatherCondition) {
    case "Rainy": bgImgMain = RainImg; break;
    case "Sunny": bgImgMain = ClearImg; break;
    case "Patchy rain neariest": bgImgMain = Drizzle; break;
    case "Partly Cloudy": bgImgMain = Halfcloud; break;
    case "Overcast": bgImgMain = OvercastImg; break;
    case "Moderate or Heavy rain": bgImgMain = Thunder; break;
    case "Light Rain ": bgImgMain = RainImg; break;
    case "Light drizzle": bgImgMain = Drizzle; break;
    case "Mist": bgImgMain = Cloud; break;
    case "Cloudy": bgImgMain = Cloud; break;
    default: bgImgMain = Cloud;
  }

  return (
    <div className='h-screen rounded-lg p-4 bg-cover bg-center' style={{ backgroundImage: `url(${bgImgMain})` }}>
      <TopBar weatherData={weatherData} setCityName={setCityName} />
      <WeatherCast weatherData={weatherData} />
      <HourlyInfo getHour={getHour} />
    </div>
  );
}

export default App;


// import { useEffect, useState } from 'react'
// import './App.css'
// import TopBar from './components/Topbar'
// import WeatherCast from "./components/WeatherCast";


// // import Weather_pic from './weather-pic.jpg'
// import Drizzle from './assets/mist-pic.jpg'
// import Cloud from './assets/cloudImg-2.jpg'
// import Halfcloud from './assets/weather-pic.jpg'
// import Thunder from './assets/thunder.jpg'
// import RainImg from './assets/thunder.jpg'
// import ClearImg from './assets/clear.jpg'
// import OvercastImg from './assets/overcast.jpg'
// import HourlyInfo from './components/HourlyInfo';



// function App() {
//   const [cityName, setCityName] = useState("");
//   const [weatherData, SetWeatherData] = useState();
//   const [getHour, setGetHour] = useState();

//   useEffect(() => {
//     const api_key = "d35a24d40f2c4023b4481203240603";
//     async function getWeather(getCityName) {
//       await fetch(
//         `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${getCityName ? getCityName : "Karachi"}`
//       )
//       .then((res) => res.json())
//       .then((response) => {
//         console.log("data", response);


//         // destructuring the data from the response 
//         const {current: {condition: { text }, last_updated,
//                 cloud,
//                 feelslike_c,
//                 feelslike_f,
//                 humditiy,
//                 wind_mph,
//               }, location: { name, country },
//                   forecast: { forecastday: { 0: {astro: { sunrise, sunset }, hour,                   
//                 },      
//               },
//             },
//           } = response;
//           console.log(text, sunrise, sunset)
//           // Extracting hour from the respone data
//       const settingHour = hour.slice(13, 23) // settng the hour state variable 
//       setGetHour([...settingHour])

//       // setng weather data state 
//       SetWeatherData({
//         text,
//         last_updated,
//         feelslike_c,
//         feelslike_f,
//         humditiy,
//         wind_mph,
//         name,
//         country,
//         sunrise,
//         sunset,
//         cloud,
//       });
//      });
//     } 

//     getWeather(cityName); //calling the getWeather fun with cityname dependency
//     console.log('ctyname', cityName); // logging the c
//   }, [cityName]);

//   const weatherCondition = weatherData?.text;
//   let bgImgMain;
//   switch(weatherCondition){
//     case "Rainy": bgImgMain = RainImg;
//     break;
//     case "Sunny": bgImgMain = ClearImg;
//     break;
//     case "Patchy rain neariest": bgImgMain = Drizzle;
//     break;
//     case "Partly Cloudy": bgImgMain = Halfcloud;
//     break;
//     case "Overcast" : bgImgMain = OvercastImg;
//     break;
//     case "Moderate or Heavy rain" : bgImgMain = Thunder;
//     break;
//     case "Light Rain ": bgImgMain = RainImg;
//     break;
//     case "Light drizzle": bgImgMain = Drizzle;
//     break;
//     case "Mist": bgImgMain = Cloud;
//     break;
//     case "Cloudy": bgImgMain = Cloud;
//     break;     
//   default:
//       bgImgMain = Cloud;

//   }







//   return (
//     <div className='h-screen rounded-lg p-4 bg-cover bg-center' style={{ backgroundImage: `url(${bgImgMain})` }}>
//        <TopBar weatherData={weatherData} setCityName={setCityName} />
//         <WeatherCast weatherData={weatherData} />
//         <HourlyInfo getHour={getHour} />

//     </div>
//   );
  
// }

// export default App
