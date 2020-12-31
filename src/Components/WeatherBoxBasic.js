import React, { useEffect, useState } from "react";
import WeatherItem from "./WeatherItem";
import "./WeatherBoxBasic.css";

const WeatherBoxBasic = ({ accessToken, lat, lon, clickWeather }) => {
  const [weatherData, setWeatherData] = useState([]);
  //lat or lon 바뀔 때마다 실행합니다.
  useEffect(() => {
    // 벡엔드에 lat,lon 이용해서 요청, 응답온거 weatherData 상태저장 하시고 사용합니다.
    // accessToken 없으면 header 제외하고 요청하면 벡엔드에서 체감온도 없이 옵니다.
  }, [lat, lon]);
  let weatherList;
  if (!accessToken) {
    weatherList = weatherData.map((weather) => {
      return (
        <WeatherItem
          // 유저가 각각의 날씨아이템을 클리하면 메인에 클릭한 해당 온도 상태저장 되게 해주세요.
          clickWeather={clickWeather}
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
