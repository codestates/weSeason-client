import React, { useState, useEffect } from "react";
import { iconList } from "./iconList";
import cloud from "../../../images/icon/cloud.png";
import "./clothesItem.css";

const ClothesItem = ({ clothes }: any) => {
  const [iconLength, setIconLength] = useState<number>(0);
  const [iconNames, setIconNames] = useState<any[]>([]);
  // const
  // 아이템 분류
  // 아이콘이 3개인 경우
  // 아이콘이 4개인 경우
  // 아이콘이 5개 이상인 경우 : 5개만 사용
  useEffect(() => {
    let validItemList = clothes
      .filter((el: any) => {
        for (let cloth of iconList) {
          if (cloth.name === el) {
            return true;
          }
        }
      })
      .map((el: any) => {
        for (let cloth of iconList) {
          if (cloth.name === el) {
            return cloth;
          }
        }
      });

    setIconLength(validItemList.length);
    setIconNames(validItemList);
  }, [clothes]);

  const clothesItemTag = iconNames.map((cloth: any, idx: any) => {
    return (
      <div
        className={`clothesItem__item clothesItem__item--length-${iconLength}`}
        key={idx}
      >
        <img className="clothesItem__cloud" src={cloud} alt="cloud"></img>
        <div
          className={`${cloth.class} clothesItem__cloth-length--${iconLength} clothesItem__cloth-${idx}`}
        ></div>
      </div>
    );
  });

  return (
    <div className={`clothesItem clothesItem-length--${iconLength}`}>
      {clothesItemTag}
    </div>
  );
};

export default ClothesItem;
