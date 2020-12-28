import { useState } from "react";
import MapModal from "./MapModal";
export default function MapBtn() {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  return (
    <div>
      {open && <MapModal setOpen={setOpen} />}
      <button onClick={openModal}>동네 검색</button>
    </div>
  );
}
