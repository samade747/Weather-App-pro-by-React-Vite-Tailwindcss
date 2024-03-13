// useState hook
import { useState } from "react";

// Importing image assests 
import Cloud from "../assets/Cloud-emoji.png"; 
import SunWithCloud from "../assets/sun.png";
import Sun2 from "../assets/sun-2.png";
import Umbrella from "../assets/umb.png";
import SunPic from "../assets/sun-3.png";

const ForecastCard = ({weatherVal, index}) => {
        console.log('hourly data', weatherVal);
        const [forcastlive, setForcastlive] = useState()
        const forCastTime = weatherVal?.time.slice(weatherVal.time.lastIndexOf(" ") + 1 )
        const temp_c = weatherVal?.temp_c;
        const cloudInfo = weatherVal.cloud;
        console.log('cloud info', cloudInfo);

        const weatherCondition = weatherVal?.condition.text;
        console.log(weatherCondition)
        let emoji;
        if(weatherCondition === "sunny"){
                emoji = '☀️';                
        } else if(weatherCondition === "Patchy rain nearby"){
                emoji = '🌧️';
        } else if (weatherCondition === "Partyly Cloudy" || "Cloudy"){
                emoji = '⛅️';
        } else if (weatherCondition === "Overcast"){
                emoji = '☁️';
        } else if (weatherCondition === "light rain shower"){
                emoji = '🌧️';
        } else if (weatherCondition === "Light Drizzle"){
                emoji = '🌫️';
        } else if (weatherCondition === "Light Drizzle"){
                emoji = '🌫️';
        } else{
                emoji = '☁️';
        }
        


        return (
                <div className="w-[150px] h-[150px] flex flex-col items-center justify-center gap-2">
                        <p>{forCastTime < "12:00"? forCastTime + "AM":forCastTime + "PM" }</p>
                        <h1>{emoji}</h1>
                        <p>{temp_c}</p>


                </div>
                
        )


}

export default ForecastCard;