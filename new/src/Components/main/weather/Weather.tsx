import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeater } from "../../../api/weather";
import { RootState } from "../../../reducers";
import { setWeather } from "../../../reducers/weatherReducer";
import "./weather.css";
import WeatherBox from "./WeatherBox";
export default function Weather() {
  const dispatch = useDispatch();
  const weatherInfo = useSelector(
    (state: RootState) => state.weatherReducer.weatherInfo
  );
  useEffect(() => {
    (async () => {
      const data = await getWeater(37.55519305862982, 126.9707879543135);
      console.log(data);
      dispatch(setWeather(data));
    })();
  }, [dispatch]);
  return (
    <section className="weather">
      <h1 className="weather__info">
        현재 기온 🌡 {weatherInfo && Math.floor(weatherInfo[0].temp)}°C
      </h1>
      <WeatherBox />
    </section>
  );
}
