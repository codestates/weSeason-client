import "./ClothesItem.css";
import { icons } from "./ClothesBox";
import { useEffect, useRef } from "react";
const transform = [
  [-250, -80, -360],
  [250, -60, 360],
  [-130, 90, -360],
  [120, 80, 360],
  [-30, -30, -360],
  [100, -100, -360],
];
export default function ClothesItem({ clothes, i }) {
  const circle = useRef();
  const text = useRef();
  useEffect(() => {
    let transformId;
    let shadowId;
    const opacityId = setTimeout(() => {
      circle.current.style.transition = "opacity 1s";
      circle.current.style.opacity = "1";
      transformId = setTimeout(() => {
        circle.current.style.transition = "transform 1s";
        circle.current.style.transform = `translate(${transform[i][0]}px, ${transform[i][1]}px) rotate(${transform[i][2]}deg)`;
        text.current.style.transform = `translate(${transform[i][0]}px, ${transform[i][1]}px)`;
        shadowId = setTimeout(() => {
          circle.current.style.transition = "box-shadow .5s";
          circle.current.style.boxShadow = "0px 6px 0px 0px #00000073";
          text.current.style.transition = "opacity 0.5s";
          text.current.style.opacity = "1";
        }, 1000);
      }, 1000);
    }, i * 200);
    return () => {
      clearTimeout(opacityId);
      clearTimeout(transformId);
      clearTimeout(shadowId);
    };
  });
  return (
    <>
      <div className="clothes-item">
        <div className="clothes-item__circle" ref={circle}>
          <div className={`clothes-item__icon ${icons[clothes]}`} />
        </div>
        <div className="clothes-item__text" ref={text}>
          {clothes}
        </div>
      </div>
    </>
  );
}
