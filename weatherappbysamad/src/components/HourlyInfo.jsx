import React from "react";

import ForecastCard from "./ForecastCard";

const gridStyle = {
    width: "10",
    height: "10",
    textAlign: "center",
};

const HourlyInfo = ({getHour}) => {
    console.log("data", getHour)
    return(
        <div style={{margin: "0"}}>
            <p>Forecest</p>
            {
                getHour && getHour?.map((weatherVal, ind) => <ForecastCard key={ind} weatherVal={weatherVal} index={ind}  />)
            }

        </div>
    )
}

