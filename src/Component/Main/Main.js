import MapBtn from "./MapBtn";
import "./Main.css";
import WeatherBoxBasic from "../../Components/WeatherBoxBasic";
import { useCallback, useEffect, useState } from "react";
import ClothesBox from "../Clothes/ClothesBox";
import Loading from "../Loading/Loading";

export default function Main({ accessToken }) {
  const [isLoading, setIsLoading] = useState(true);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [temperature, setTemperature] = useState();
  const success = useCallback((position) => {
    const lat = position.coords.latitude; // 위도
    const lon = position.coords.longitude; // 경도
    setLat(lat);
    setLon(lon);
    setIsLoading(false);
  }, []);
  const error = useCallback(() => {
    setLat(37.566826);
    setLon(126.9786567);
    setIsLoading(false);
  }, []);
  useEffect(() => {
    let id;
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      id = navigator.geolocation.watchPosition(success, error);
    }
    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, [error, success]);
  // 각가의 날씨아이템 클릭하면 온도상태 변경 됩니다.
  const clickWeather = useCallback((temp) => {
    setTemperature(temp);
  }, []);
  return (
    <>
      <div className="logo">weSeason</div>
      <div className="Main">
        {isLoading ? (
          <Loading>위치정보 불러오는중...</Loading>
        ) : (
          <>
            <WeatherBoxBasic
              accessToken={accessToken}
              lat={lat}
              lon={lon}
              clickWeather={clickWeather}
            />
            <ClothesBox temperature={10} />
            <MapBtn lat={lat} lon={lon} setLat={setLat} setLon={setLon} />
          </>
        )}
      </div>
    </>
  );
}
