import React from "react";
import ClothesBox from "./clothes/ClothesBox";
import "./main.css";
import Weather from "./weather/Weather";

const Main = () => {
  const temp: number = 20;
  return (
    <div id="main">
      <Weather />
      <ClothesBox temp={temp} />
    </div>
  );
};

export default Main;
