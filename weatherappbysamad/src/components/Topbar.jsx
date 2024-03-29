import { useState, useEffect } from "react";

// function for top bar
const TopBar = ({ weatherData, setCityName }) => {
// state var for store currne date value
const [currentDateVal, setCurrentDateVal ] = useState();

// extracting current date from the weather data
const currentDate = weatherData?.last_updated.slice(0,weatherData?.last_updated.indexOf(" "))


// Array of days 
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Array of Months 
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Creating a Date object from the extracted current date 
const date = new Date(currentDate);

// getting day month & current date 
const day = days[date.getDay()];
const month = months[date.getMonth()];
const getCurrentDate = date.getDate();


console.log(day)
console.log(month)
console.log(getCurrentDate)

const todayDate = `${day} ${month} ${getCurrentDate}`;
console.log(todayDate)

return(
    <div>
        <div className="" style={{color: "white", fontSize: "20px"}}>
            <p>Weather App by Samad</p>
        </div>
        <div className="rounded py-2 ">
            <input className="rounded text-red-500 shadow-2xl" type="text" onChange={(e) => setCityName(e.target.value)} />
        </div>
        <div className="m-2 p-3 ">
            <h1>{weatherData?.name},
                {weatherData?.country}
             </h1>
             <p>{todayDate}</p>
        </div>


    </div>
)


}

export default TopBar;