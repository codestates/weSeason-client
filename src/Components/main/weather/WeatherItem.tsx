import { useDispatch } from "react-redux";
import { setTemp } from "../../../reducers/weatherReducer";
import { WeatherInfo } from "./../../../api/weather";

export default function WeatherItem(w: WeatherInfo) {
  const dispatch = useDispatch();
  return (
    <li
      className="weather__item"
      onClick={() => {
        dispatch(setTemp(Math.floor(w.temp)));
      }}
    >
      <p className="weather__time">{getTime(w.dt)}시</p>
      <img
        className="weather__icon"
        src={`https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`}
        alt={w.weather[0].main}
      />
      <p className="weather__temp">{Math.floor(w.temp)}°C</p>
    </li>
  );
}
function getTime(dt: number) {
  return new Date(dt * 1000).getHours().toString().padStart(2, "0");
}
