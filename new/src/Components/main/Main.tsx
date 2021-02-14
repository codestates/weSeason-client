import React from "react";
import ClothesBox from "./clothes/ClothesBox";
import "./main.css";

const Main = () => {
  const temp: number = 20;
  return (
    <div id="main">
      <ClothesBox temp={temp} />
    </div>
  );
};

export default Main;
