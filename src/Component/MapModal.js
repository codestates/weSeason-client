import { useEffect, useRef, useState } from "react";
import "./MapModal.css";
export default function MapModal({ closeModal }) {
  const [init, setInit] = useState(false);
  const map = useRef();
  useEffect(() => {
    setTimeout(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      new window.kakao.maps.Map(map.current, options);
      setInit(true);
    }, 250);
  }, []);
  const onClick = () => {
    setInit(false);
    setTimeout(() => {
      closeModal();
    }, 500);
  };
  return (
    <>
      <div className={`mask${init ? "" : " mask--before"}`}>
        <div className={`modal modal--map${init ? "" : " modal--before"}`}>
          <div id="map" ref={map}></div>
          <button className="modal__close-btn" onClick={onClick}>
            X
          </button>
        </div>
      </div>
    </>
  );
}
