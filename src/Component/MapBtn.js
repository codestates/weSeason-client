import { useState } from "react";
import MapModal from "./MapModal";
export default function MapBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      {isOpen && <MapModal closeModal={closeModal} />}
      <button onClick={onClick}>동네 검색</button>
    </div>
  );
}
