import "./ClothesItem.css";
import { icons } from "./ClothesBox";
import { useEffect, useRef } from "react";
const x = [
  [-310, -290],
  [290, 310],
  [-160, -180],
  [160, 180],
  [-70, -50],
  [50, 70],
];
const y = [-100, 100];
const rotate = ["-360deg", "360deg"];
export default function ClothesItem({ clothes, i }) {
  const circle = useRef();
  const text = useRef();
  useEffect(() => {
    let shadow;
    const rotate = setTimeout(() => {
      circle.current.style.transform = `
        translate(
          ${Math.random() * (x[i][1] - x[i][0]) + x[i][0]}px, 
          ${Math.random() * (y[1] - y[0]) + y[0]}px
        )
        rotate(360deg)
      `;
      circle.current.style.transition = "transform 1s, opacity 1s";

      // text.current.style.transform = `
      //   translate(${x[i]}px, ${-10}px)
      // `;
      // circle.current.style.opacity = 1;
      // shadow = setTimeout(() => {
      //   circle.current.style.boxShadow = "0px 3px 0px 1px #0000005c";
      //   circle.current.style.transition = "box-shadow 0.5s";
      // }, 1000);
    }, i * 300);
    return () => {
      clearTimeout(rotate);
      clearTimeout(shadow);
    };
  }, [i]);
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
