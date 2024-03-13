// useState hook
import { useState } from "react";

// Importing image assests 
import Cloud from "../assets/Cloud-emoji.png"; 
import SunWithCloud from "../assets/sun.png";
import Sun2 from "../assets/sun-2.png";
import Umbrella from "../assets/umb.png";
import SunPic from "../assets/sun-3.png";

const ForecastCard = ({weatherVal, index}) => {

        const { time, temp_c, condition, cloud } = weatherVal;

        console.log('hourly data', weatherVal);

        const [forecastLive, setForecastLive] = useState()

        const forecastTime = time.slice(time.lastIndexOf(" ") + 1 );

        let emoji;
        switch(condition) {
          case "sunny":
            emoji = '☀️';                
            break;
          case "Patchy rain nearby":
          case "light rain shower": // Combine conditions if they have the same emoji
            emoji = '🌧️';
            break;
          case "Partly Cloudy":
          case "Cloudy":
            emoji = '⛅️';
            break;
          case "Overcast":
            emoji = '☁️';
            break;
          case "Light Drizzle":
            emoji = '🌫️';
            break;
          default:
            emoji = '☁️';
        }              
        
        // let emoji;
        // if(weatherCondition === "sunny"){
        //         emoji = '☀️';                
        // } else if(weatherCondition === "Patchy rain nearby"){
        //         emoji = '🌧️';
        // } else if (weatherCondition === "Partyly Cloudy" || "Cloudy"){
        //         emoji = '⛅️';
        // } else if (weatherCondition === "Overcast"){
        //         emoji = '☁️';
        // } else if (weatherCondition === "light rain shower"){
        //         emoji = '🌧️';
        // } else if (weatherCondition === "Light Drizzle"){
        //         emoji = '🌫️';
        // } else if (weatherCondition === "Light Drizzle"){
        //         emoji = '🌫️';
        // } else{
        //         emoji = '☁️';
        // }
        


        return (
                <div className="flex flex-col rounded-lg items-center justify-center gap-2 bg-white" style={{flexDirection: 'column', display: 'inline-block', margin: '10px', width: '80px', height: '100px' }}>
                        <p>{forecastTime  < "12:00"? forecastTime  + "AM":forecastTime  + "PM" }</p>
                        <h1>{emoji}</h1>
                        <p>{temp_c}</p>


                </div>
                
        )


}

export default ForecastCard;