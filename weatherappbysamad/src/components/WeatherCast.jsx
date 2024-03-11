import SunPic from "../assets/sun-3.png";
import Cloud from "../assets/Cloud-emoji.png";
import SunWithCloud from "../assets/sun.png";
import Sun2 from "../assets/sun-2.png";
import React from "react";
import Umbrella from "../assets/umb.png";


const WeatherCast = ({ weatherData }) => {
    console.log("data", weatherData);
    const weatherCondition = weatherData?.text;
    let emoji;
switch (weatherCondition) {
    case "Rainy":
        emoji = Umbrella;
        break;
    case "Clouds":
        emoji = Cloud;
        break;
    case "Sunny":
        emoji = Sun2;
        break;
    case "Patchy rain nearby":
        emoji = Umbrella;
        break;
    case "Partly Cloudy":
        emoji = SunWithCloud;
        break;
    case "Overcast":
        emoji = Cloud;
        break;
    case "Moderate or heavy rain in area with thunder":
        emoji = Umbrella;
        break;
    case "Mist":
        emoji = Cloud;
        break;
    default:
        emoji = SunWithCloud   
}
    return(
        <div className="w-full lg:w-1/2 xl:w-1/3 bg-opacity-50">
            <div className="flex justify-evenly rounded-lg bg-black bg-opacity-20 text-white flex-col p-2">
                <div className="text-center">
                <p style={{fontSize: "20px", marginBottom: "5px", fontWeight: "bold"}}>{weatherData?.humidity}</p>
                <p className="m-0">Humidity</p>
                </div>
            
            <div className="text-center">
                <p> {weatherData?.feelslike_c} °C </p>
                <p className="m-0">Feels like</p>
            </div>

            <div className="text-center">
                <p> {weatherData?.wind_mph} mph </p>
                <p className="m-0">wind</p>
            </div>

            <div className="text-center">
              <p>{weatherData?.cloud < 10? "10%" : weatherData?.cloud + "%"}</p>
              <p>{weatherData?.cloud < 40? "Sunny":"Rain"}</p>
            </div>


            <div className="text-center">
                <p> {weatherData?.sunrise}  </p>
                <p className="m-0">Sunrise</p>
            </div>

            <div className="text-center">
                <p> {weatherData?.sunset}  </p>
                <p className="m-0">Sunset</p>
            </div>


            </div>        




        </div>

    )
}

export default WeatherCast;