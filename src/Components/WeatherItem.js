import React from "react";
import "./WeatherItem.css";

const WeatherItem = ({ hour, temp, icon, feelsLike }) => {
  const timestamp = hour * 1000;
  const transDate = new Date(timestamp);
  const hourDate = JSON.stringify(transDate).substring(12, 14); // ex) "11"
  const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <>
      <div className={`WeatherItem__contain ${hourDate}`}>
        <div className="WeatherItem__flex-form">
          <div className="WeatherItem__date">{hourDate}시</div>
          <img className="WeatherItem__icon" alt="icon" src={weatherIcon}></img>
          {/* <div className="WeatherItem__temp">{parseInt(temp - 273.15)}°C</div> */}
          {feelsLike ? (
            <div className="WeatherItem__feelsLike">
              체감 {parseInt(feelsLike - 273.15)}°C
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default WeatherItem;
