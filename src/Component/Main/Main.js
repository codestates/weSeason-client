import MapBtn from "./MapBtn";
import "./Main.css";
import WeatherBoxBasic from "../../Components/WeatherBoxBasic";
import axios from "axios";
import { API_URL } from "../../const";
import { useEffect, useState } from "react";

export default function Main({ accessToken }) {
  const [lat, setLat] = useState(37.566826);
  const [lon, setLon] = useState(126.9786567);
  useEffect(() => {
    let id;
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      const success = (position) => {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        setLat(lat);
        setLon(lon);
      };
      id = navigator.geolocation.watchPosition(success);
    }
    return () => {
      if (id) {
        navigator.geolocation.clearWatch(id);
      }
    };
  }, []);

  // html geolocation api 호출

  //  navigator.geolocation.getCurrentPosition((position) => {
  // doSomething(position.coords.latitude, position.coords.longitude);
  // }); 이런 느낌

  // const test = () => {
  //   axios.get(`${API_URL}/weather`);
  // };
  // const a = ;

  // let data = JSON.parse(a);

  const [isWeatherData, setWeatherData] = useState([
    {
      dt: 1609416000,
      temp: 265.88,
      feels_like: 259.46,
      pressure: 1026,
      humidity: 53,
      dew_point: 258.78,
      uvi: 0,
      clouds: 1,
      visibility: 10000,
      wind_speed: 4.34,
      wind_deg: 303,
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
      ],
      pop: 0,
    },
    {
      dt: 1609419600,
      temp: 266.73,
      feels_like: 260.66,
      pressure: 1026,
      humidity: 66,
      dew_point: 262.01,
      uvi: 0,
      clouds: 7,
      visibility: 10000,
      wind_speed: 4.14,
      wind_deg: 310,
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
      ],
      pop: 0.11,
    },
    {
      dt: 1609423200,
      temp: 267.11,
      feels_like: 261.6,
      pressure: 1027,
      humidity: 74,
      dew_point: 263.66,
      uvi: 0,
      clouds: 5,
      visibility: 10000,
      wind_speed: 3.51,
      wind_deg: 309,
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
      ],
      pop: 0.11,
    },
    {
      dt: 1609426800,
      temp: 267.41,
      feels_like: 262.21,
      pressure: 1027,
      humidity: 78,
      dew_point: 264.55,
      uvi: 0,
      clouds: 6,
      visibility: 10000,
      wind_speed: 3.18,
      wind_deg: 306,
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
      ],
      pop: 0.11,
    },
    {
      dt: 1609430400,
      temp: 267.53,
      feels_like: 262.64,
      pressure: 1026,
      humidity: 79,
      dew_point: 264.81,
      uvi: 0,
      clouds: 12,
      visibility: 10000,
      wind_speed: 2.77,
      wind_deg: 309,
      weather: [
        { id: 801, main: "Clouds", description: "few clouds", icon: "02n" },
      ],
      pop: 0.11,
    },
    {
      dt: 1609434000,
      temp: 267.43,
      feels_like: 263.1,
      pressure: 1025,
      humidity: 79,
      dew_point: 257.92,
      uvi: 0,
      clouds: 19,
      visibility: 10000,
      wind_speed: 1.95,
      wind_deg: 312,
      weather: [
        { id: 801, main: "Clouds", description: "few clouds", icon: "02n" },
      ],
      pop: 0.11,
    },
    {
      dt: 1609437600,
      temp: 267.34,
      feels_like: 263.95,
      pressure: 1025,
      humidity: 80,
      dew_point: 258,
      uvi: 0,
      clouds: 17,
      visibility: 10000,
      wind_speed: 0.62,
      wind_deg: 306,
      weather: [
        { id: 801, main: "Clouds", description: "few clouds", icon: "02n" },
      ],
      pop: 0.11,
    },
    {
      dt: 1609441200,
      temp: 267.33,
      feels_like: 264.28,
      pressure: 1025,
      humidity: 80,
      dew_point: 258.08,
      uvi: 0,
      clouds: 4,
      visibility: 10000,
      wind_speed: 0.13,
      wind_deg: 273,
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
      ],
      pop: 0.14,
    },
    {
      dt: 1609444800,
      temp: 267.26,
      feels_like: 263.48,
      pressure: 1025,
      humidity: 85,
      dew_point: 260.15,
      uvi: 0,
      clouds: 48,
      visibility: 10000,
      wind_speed: 1.27,
      wind_deg: 312,
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03n",
        },
      ],
      pop: 0.21,
    },
  ]);

  return (
    <>
      <div className="Main">
        <WeatherBoxBasic
          weatherData={isWeatherData}
          accessToken={accessToken}
        />
        <MapBtn lat={lat} lon={lon} setLat={setLat} setLon={setLon} />
      </div>
    </>
  );
}
