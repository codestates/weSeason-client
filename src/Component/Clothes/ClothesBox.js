import axios from "axios";
import "./ClothesBox.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../const";
import ClothesItem from "./ClothesItem";
import ClothesText from "./ClothesText";
export const icons = {
  "7부바지": "clothes-item__shorts",
  니트: "clothes-item__pullover",
  "두꺼운 코트": "clothes-item__jacket-1",
  "린넨 옷": "clothes-item__shirt-3",
  목도리: "clothes-item__scarf",
  민소매: "clothes-item__basketball-jersey",
  바람막이: "clothes-item__jacket-3",
  반바지: "clothes-item__shorts-1",
  반팔: "clothes-item__polo",
  발열내의: "clothes-item__vest",
  블라우스: "clothes-item__blouse",
  셔츠: "clothes-item__shirt-1",
  "얇은 재킷": "clothes-item__jacket-2",
  원피스: "clothes-item__dress-1",
  장갑: "clothes-item__gloves",
  재킷: "clothes-item__jacket",
  "짧은 치마": "clothes-item__skirt",
  청바지: "clothes-item__jeans",
  청자켓: "clothes-item__jacket-6",
  "캐시미어 코트": "clothes-item__coat",
  트렌치코트: "clothes-item__trench-coat",
  패딩: "clothes-item__jacket-4",
  항공점퍼: "clothes-item__jacket-5",
  후드: "clothes-item__hoodie",
  면바지: "clothes-item__pants",
  스카프: "clothes-item__scarf",
  경량패딩: "clothes-item__jacket-4",
  울코트: "clothes-item__jacket-1",
  "기모 후드": "clothes-item__hoodie",
};

export default function ClothesBox({ temperature }) {
  const [clothesList, setClothesList] = useState([]);
  useEffect(() => {
    setClothesList([]);
    const source = axios.CancelToken.source();
    if (temperature !== undefined) {
      axios
        .get(`${API_URL}/clothes?temp=${parseInt(temperature)}`, {
          cancelToken: source.token,
        })
        .then(
          ({
            data: {
              data: { cloth },
            },
          }) => {
            setClothesList(cloth);
          }
        );
    }

    return () => {
      source.cancel("Component got unmounted");
    };
  }, [temperature]);
  const clothesIcons = clothesList.filter((clothes) => icons[clothes]);
  const clothesTexts = clothesList.filter((clothes) => !icons[clothes]);
  return (
    <>
      <div className="clothes-box">
        <div className="clothes-box__icons">
          {clothesIcons.length > 0 &&
            clothesIcons.map((clothes, i) => (
              <ClothesItem clothes={clothes} key={clothes} i={i} />
            ))}
        </div>
        <div className="clothes-box__else">
          {clothesTexts.length > 0 &&
            clothesTexts.map((clothes, i) => (
              <ClothesText clothes={clothes} key={clothes} i={i} />
            ))}
        </div>
      </div>
    </>
  );
}
