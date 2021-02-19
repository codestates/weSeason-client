import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getWeater } from "../../../api/weather";
import { RootState } from "../../../reducers";
import { setWeather } from "../../../reducers/weatherReducer";
import "./weather.css";
import WeatherBox from "./WeatherBox";

type WeatherProps = {
  lat: number;
  lon: number;
};

const Weather = ({ lat, lon }: WeatherProps) => {
  const dispatch = useDispatch();
  const weatherInfo = useSelector(
    (state: RootState) => state.weatherReducer.weatherInfo
  );
  useEffect(() => {
    (async () => {
      const data = await getWeater(lat, lon);
      // console.log(lat, lon);
      // console.log(data);
      dispatch(setWeather(data));
    })();
  }, [dispatch, lat, lon]);
  return (
    <section className="weather">
      <h1 className="weather__info">
        현재 기온 🌡 {weatherInfo && Math.floor(weatherInfo[0].temp)}°C
      </h1>
      <WeatherBox />
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return { lat: state.locationReducer.lat, lon: state.locationReducer.lon };
};

export default connect(mapStateToProps)(Weather);
