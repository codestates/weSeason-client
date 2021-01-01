import { useEffect, useRef } from "react";
import "./ClothesText.css";
export default function ClothesText({ clothes, i }) {
  const text = useRef();
  useEffect(() => {
    text.current.style.opacity = "0";
    const opacityId = setTimeout(() => {
      text.current.style.transition = "opacity 1s";
      text.current.style.opacity = "1";
    }, (i + 1) * 300);
    return () => {
      clearTimeout(opacityId);
    };
  });
  return (
    <>
      <span className="clothes-text" ref={text}>
        {clothes}
      </span>
    </>
  );
}
