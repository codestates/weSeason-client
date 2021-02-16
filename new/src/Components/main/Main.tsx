import React from "react";
import SearchVillage from "../modal/SearchVillage";
import ClothesBox from "./clothes/ClothesBox";
import "./main.css";

const Main = () => {
  const temp: number = 10;
  return (
    <div id="main">
      <ClothesBox temp={temp} />
      <SearchVillage />
    </div>
  );
};

export default Main;
