import { useCallback, useState } from "react";
import Modal from "../Modal/Modal";

export default function MapBtn() {
  const [isOpen, setIsOpen] = useState(false);
  // 카카오 맵 적용
  const makeMap = useCallback((ref) => {
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    new window.kakao.maps.Map(ref.current, options);
  }, []);
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
        <Modal closeModal={close} make={makeMap}>
          <div id="map"></div>
        </Modal>
      )}
      <button onClick={clickButton}>동네 검색</button>
    </>
  );
}
