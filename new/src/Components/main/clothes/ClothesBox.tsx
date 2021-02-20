import React, { useState, useEffect } from "react";
import { getClothesByTemp } from "../../../api/clothes";
import ClothesItem from "./ClothesItem";
import ClothesList from "./ClothesList";
import "./clothesBox.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

const ClothesBox = () => {
  const [clothes, setClothes] = useState<string[]>([]);
  const temp = useSelector((state: RootState) => state.weatherReducer.temp);
  useEffect(() => {
    (async () => {
      try {
        if (temp) {
          const data = await getClothesByTemp(temp);
          setClothes(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [temp]);

  return (
    <div id="clothesBox">
      <div id="clothestBox__header">오늘은?</div>
      <ClothesItem clothes={clothes} />
      <ClothesList clothes={clothes} />
    </div>
  );
};

export default ClothesBox;
