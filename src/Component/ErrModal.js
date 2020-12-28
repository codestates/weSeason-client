import { useEffect, useState } from "react";
import "./ErrModal.css";
export default function ErrModal({ setError, error }) {
  const [init, setInit] = useState(true);
  const doNothing = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    setInit(false);
  }, []);
  const closeModal = () => {
    setInit(true);
    setTimeout(() => setError(""), 1000);
  };
  return (
    <div className={`mask${init ? " mask--init" : ""}`} onClick={closeModal}>
      <div className={`modal${init ? " modal--init" : ""}`} onClick={doNothing}>
        <p>{error}</p>
        <button className="modal__close-btn" onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
}
