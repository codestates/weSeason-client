import { useEffect, useRef, useState } from "react";
import "./MapModal.css";
export default function MapModal({ setOpen }) {
  const [init, setInit] = useState(true);
  const map = useRef();
  const doNothing = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    setInit(false);
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    new window.kakao.maps.Map(map.current, options);
  }, []);
  const closeModal = () => {
    setInit(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };
  return (
    <div className={`mask${init ? " mask--init" : ""}`} onClick={closeModal}>
      <div
        className={`modal--map modal${init ? " modal--init" : ""}`}
        onClick={doNothing}
      >
        <div id="map" ref={map}></div>
        <button className="modal__close-btn" onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
}
