import React, { useState } from "react";
import SearchVillage from "../modal/SearchVillage";
import ClothesBox from "./clothes/ClothesBox";
import "./main.css";
import Weather from "./weather/Weather";

const Main = () => {
  const [clickModal, setClickModal] = useState<boolean>(false);

  const handleClickModal = () => {
    setClickModal(!clickModal);
  };

  return (
    <div id="main">
      <Weather />
      <ClothesBox />
      <button id="searchVillage__btn" onClick={handleClickModal}>
        동네 검색
      </button>
      {clickModal ? (
        <SearchVillage handleClickModal={handleClickModal} />
      ) : null}
    </div>
  );
};

export default Main;
