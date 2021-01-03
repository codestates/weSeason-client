import { useEffect, useRef } from "react";
import "./ClothesText.css";
export default function ClothesText({ clothes, i }) {
  const text = useRef();
  useEffect(() => {
    const opacityId = setTimeout(() => {
      text.current.style.transition = "opacity 2s";
      text.current.style.opacity = "1";
    }, (i + 1) * 400);
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
