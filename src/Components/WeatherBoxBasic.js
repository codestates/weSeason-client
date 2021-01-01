import React, { useEffect, useState } from "react";
import WeatherItem from "./WeatherItem";
import "./WeatherBoxBasic.css";
import axios from "axios";
import { API_URL } from "../const";

const WeatherBoxBasic = ({ accessToken, lat, lon, clickWeather }) => {
  const [weatherData, setWeatherData] = useState([]);
  //lat or lon 바뀔 때마다 실행합니다.
  let weatherList;

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

  // 스크롤바 이동 버튼
  // 버튼 클릭시 현재시간 기준 3시간 후로 스크롤바 이동 구현 (state)
  // 마지막에 도착할 경우 다시 처음으로 이동한다 버튼 두개? 음

  if (accessToken) {
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
  } else {
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
  }

  return (
    <>
      <div className="WeatherBoxBasic__contain">
        {weatherData[0] ? (
          <div className="WeatherBoxBasic__current">
            현재 기온 {parseInt(weatherData[0].temp)}°C
          </div>
        ) : null}
        <div className="WeatherBoxBasic__item-box">{weatherList}</div>
      </div>
    </>
  );
};

export default WeatherBoxBasic;

//   [
//   {
//     dt: 1609416000,
//     temp: 265.88,
//     feels_like: 259.46,
//     pressure: 1026,
//     humidity: 53,
//     dew_point: 258.78,
//     uvi: 0,
//     clouds: 1,
//     visibility: 10000,
//     wind_speed: 4.34,
//     wind_deg: 303,
//     weather: [
//       { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
//     ],
//     pop: 0,
//   },
//   {
//     dt: 1609419600,
//     temp: 266.73,
//     feels_like: 260.66,
//     pressure: 1026,
//     humidity: 66,
//     dew_point: 262.01,
//     uvi: 0,
//     clouds: 7,
//     visibility: 10000,
//     wind_speed: 4.14,
//     wind_deg: 310,
//     weather: [
//       { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
//     ],
//     pop: 0.11,
//   },
//   {
//     dt: 1609423200,
//     temp: 267.11,
//     feels_like: 261.6,
//     pressure: 1027,
//     humidity: 74,
//     dew_point: 263.66,
//     uvi: 0,
//     clouds: 5,
//     visibility: 10000,
//     wind_speed: 3.51,
//     wind_deg: 309,
//     weather: [
//       { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
//     ],
//     pop: 0.11,
//   },
//   {
//     dt: 1609426800,
//     temp: 267.41,
//     feels_like: 262.21,
//     pressure: 1027,
//     humidity: 78,
//     dew_point: 264.55,
//     uvi: 0,
//     clouds: 6,
//     visibility: 10000,
//     wind_speed: 3.18,
//     wind_deg: 306,
//     weather: [
//       { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
//     ],
//     pop: 0.11,
//   },
//   {
//     dt: 1609430400,
//     temp: 267.53,
//     feels_like: 262.64,
//     pressure: 1026,
//     humidity: 79,
//     dew_point: 264.81,
//     uvi: 0,
//     clouds: 12,
//     visibility: 10000,
//     wind_speed: 2.77,
//     wind_deg: 309,
//     weather: [
//       { id: 801, main: "Clouds", description: "few clouds", icon: "02n" },
//     ],
//     pop: 0.11,
//   },
//   {
//     dt: 1609434000,
//     temp: 267.43,
//     feels_like: 263.1,
//     pressure: 1025,
//     humidity: 79,
//     dew_point: 257.92,
//     uvi: 0,
//     clouds: 19,
//     visibility: 10000,
//     wind_speed: 1.95,
//     wind_deg: 312,
//     weather: [
//       { id: 801, main: "Clouds", description: "few clouds", icon: "02n" },
//     ],
//     pop: 0.11,
//   },
//   {
//     dt: 1609437600,
//     temp: 267.34,
//     feels_like: 263.95,
//     pressure: 1025,
//     humidity: 80,
//     dew_point: 258,
//     uvi: 0,
//     clouds: 17,
//     visibility: 10000,
//     wind_speed: 0.62,
//     wind_deg: 306,
//     weather: [
//       { id: 801, main: "Clouds", description: "few clouds", icon: "02n" },
//     ],
//     pop: 0.11,
//   },
//   {
//     dt: 1609441200,
//     temp: 267.33,
//     feels_like: 264.28,
//     pressure: 1025,
//     humidity: 80,
//     dew_point: 258.08,
//     uvi: 0,
//     clouds: 4,
//     visibility: 10000,
//     wind_speed: 0.13,
//     wind_deg: 273,
//     weather: [
//       { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
//     ],
//     pop: 0.14,
//   },
//   {
//     dt: 1609444800,
//     temp: 267.26,
//     feels_like: 263.48,
//     pressure: 1025,
//     humidity: 85,
//     dew_point: 260.15,
//     uvi: 0,
//     clouds: 48,
//     visibility: 10000,
//     wind_speed: 1.27,
//     wind_deg: 312,
//     weather: [
//       {
//         id: 802,
//         main: "Clouds",
//         description: "scattered clouds",
//         icon: "03n",
//       },
//     ],
//     pop: 0.21,
//   },
// ]);
