import MapBtn from "./MapBtn";
import "./Main.css";
import WeatherBoxBasic from "../../Components/WeatherBoxBasic";
import axios from "axios";
import { API_URL } from "../../const";
import { useCallback, useEffect, useState } from "react";
import ClothesBox from "../Clothes/ClothesBox";

export default function Main({ accessToken }) {
  const [lat, setLat] = useState(37.566826);
  const [lon, setLon] = useState(126.9786567);
  const [temperature, setTemperature] = useState();
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
  // 각가의 날씨아이템 클릭하면 온도상태 변경 됩니다.
  const clickWeather = useCallback((temp) => {
    setTemperature(temp);
  }, []);

  return (
    <>
      <div className="logo">weSeason</div>
      <div className="Main">
        <WeatherBoxBasic
          accessToken={accessToken}
          lat={lat}
          lon={lon}
          clickWeather={clickWeather}
        />
        <ClothesBox temperature={-7} />
        <MapBtn lat={lat} lon={lon} setLat={setLat} setLon={setLon} />
      </div>
    </>
  );
}
