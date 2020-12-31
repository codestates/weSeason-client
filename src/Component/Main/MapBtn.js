import "./MapBtn.css";
import { useCallback, useState } from "react";
import Modal from "../Modal/Modal";
import Map from "../Map/Map";
export default function MapBtn(props) {
  const [isOpen, setIsOpen] = useState(false);

  //맵 모달 오픈
  const clickButton = useCallback(() => {
    setIsOpen(true);
  }, []);
  //맵 모달 클로스
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <>
      {isOpen && (
        <Modal closeModal={close}>
          <Map {...props} />
        </Modal>
      )}
      <button className="map-btn" onClick={clickButton}>
        동네 검색
      </button>
    </>
  );
}
