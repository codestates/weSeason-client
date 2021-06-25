import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

import WeatherItem from "./WeatherItem";

export default function WeatherBox() {
  const weatherInfo = useSelector(
    (state: RootState) => state.weatherReducer.weatherInfo
  );
  const box = useRef<HTMLUListElement>(null!);
  return (
    <div className="weather__box-container">
      <ul className="weather__box" ref={box}>
        {weatherInfo &&
          weatherInfo.map((w) => <WeatherItem key={w.dt} {...w} />)}
      </ul>
      <button
        className="weather__nextbtn"
        onClick={() => {
          const max = box.current.scrollWidth;
          const current = box.current.scrollLeft + box.current.offsetWidth;
          let to = box.current.scrollLeft + 480;
          if (current === max) {
            to = 0;
          }
          box.current.scroll({
            left: to,
            behavior: "smooth",
          });
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
}
