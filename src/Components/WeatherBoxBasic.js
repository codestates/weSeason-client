import React from "react";
import WeatherItem from "./WeatherItem";
import "./WeatherBoxBasic.css";

const WeatherBoxBasic = ({ weatherData, accessToken }) => {
  let weatherList;

  if (!accessToken) {
    weatherList = weatherData.map((weather) => {
      return (
        <WeatherItem
          key={weather.dt.toString()}
          hour={weather.dt}
          temp={weather.temp}
          icon={weather.weather[0].icon}
        />
      );
    });
  } else {
    weatherList = weatherData.map((weather) => {
      return (
        <WeatherItem
          key={weather.dt.toString()}
          hour={weather.dt}
          temp={weather.temp}
          feelsLike={weather.feels_like}
          icon={weather.weather[0].icon}
        />
      );
    });
  }

  // 스크롤바 이동 버튼
  // 버튼 클릭시 현재시간 기준 3시간 후로 스크롤바 이동 구현 (state)
  // 마지막에 도착할 경우 다시 처음으로 이동한다 버튼 두개? 음
  return (
    <>
      {/* 로고 */}
      <div className="WeatherBoxBasic__contain">
        <div className="WeatherBoxBasic__current">
          현재 기온 {parseInt(weatherData[0].temp - 273.15)}°C
        </div>
        <div className="WeatherBoxBasic__item-box">{weatherList}</div>
      </div>
    </>
  );
};

export default WeatherBoxBasic;
