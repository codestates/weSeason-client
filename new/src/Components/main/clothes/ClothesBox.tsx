import React, { useState, useEffect } from "react";
import { getClothesByTemp } from "../../../api/clothes";
import ClothesItem from "./ClothesItem";
import ClothesList from "./ClothesList";
import "./clothesBox.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

const ClothesBox = () => {
  // temp에 맞는 데이터 가져오기
  // 가져온 데이터 중에 아이콘이 있는 것만 필터링하고, (갯수 제한?) 4~6
  // 필터링한 데이터를 array.map을 활용 ClothesItem 컴포넌트 전달
  // clothesList모든 리스트 노출
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
