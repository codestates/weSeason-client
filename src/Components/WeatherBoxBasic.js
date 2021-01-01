import React, { useEffect, useState } from "react";
import WeatherItem from "./WeatherItem";
import "./WeatherBoxBasic.css";
import axios from "axios";
import { API_URL } from "../const";

const WeatherBoxBasic = ({ accessToken, lat, lon, clickWeather }) => {
  const [weatherData, setWeatherData] = useState([]);

  //lat or lon 바뀔 때마다 실행합니다.
  useEffect(() => {
    if (accessToken) {
      axios
        .get(`${API_URL}/weather`, {
          params: { lat, lon },
          headers: { authorization: `Bearer ${accessToken}` },
        })
        .then((data) => {
          setWeatherData(data.data.data);
        });
    } else {
      axios.get(`${API_URL}/weather`, { params: { lat, lon } }).then((data) => {
        setWeatherData(data.data.data);
      });
    }
  }, [lat, lon, accessToken]);
  let weatherList;
  if (accessToken) {
    weatherList = weatherData.map((weather) => {
      return (
        <WeatherItem
          clickWeather={clickWeather}
          key={weather.dt.toString()}
          hour={weather.dt}
          temp={weather.temp}
          feelsLike={weather.feels_like}
          icon={weather.weather[0].icon}
        />
      );
    });
  } else {
    weatherList = weatherData.map((weather) => {
      return (
        <WeatherItem
          // 유저가 각각의 날씨아이템을 클리하면 메인에 클릭한 해당 온도 상태저장 되게 해주세요.
          key={weather.dt.toString()}
          hour={weather.dt}
          temp={weather.temp}
          icon={weather.weather[0].icon}
        />
      );
    });
  }

  return (
    <>
      <div
        className={
          !accessToken
            ? "WeatherBoxBasic__contain--basic"
            : "WeatherBoxBasic__contain--extend"
        }
      >
        {weatherData[0] ? (
          <div className="WeatherBoxBasic__current">
            현재 기온 {parseInt(weatherData[0].temp)}°C
          </div>
        ) : null}
        <div
          className={
            !accessToken
              ? "WeatherBoxBasic__item-box--basic"
              : "WeatherBoxBasic__item-box--extend"
          }
        >
          {weatherList}
        </div>
      </div>
    </>
  );
};

export default WeatherBoxBasic;
