import MapBtn from "./MapBtn";
import "./Main.css";
import { useEffect, useState } from "react";

export default function Main() {
  const [lat, setLat] = useState(37.566826);
  const [lon, setLon] = useState(126.9786567);
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        setLat(lat);
        setLon(lon);
      });
    }
  }, []);
  return (
    <>
      <div className="Main">
        <MapBtn lat={lat} lon={lon} setLat={setLat} setLon={setLon} />
      </div>
    </>
  );
}
