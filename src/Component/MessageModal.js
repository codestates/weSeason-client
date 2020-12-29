import { useState } from "react";
import Loading from "./Loading";
import "./MessageModal.css";
export default function MessageModal({ message, closeModal }) {
  const [init, setInit] = useState(false);
  useState(() => {
    setInit(true);
  }, []);
  const onClick = () => {
    setInit(false);
    closeModal();
  };
  return (
    <>
      {!message && <Loading />}
      <div className={`mask${message && init ? "" : " mask--init"}`}>
        <div className={`modal${message && init ? "" : " modal--init"}`}>
          <p>{message}</p>
          <button className="modal__close-btn" onClick={onClick}>
            X
          </button>
        </div>
      </div>
    </>
  );
}
