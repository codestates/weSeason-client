import { useEffect, useState } from "react";
import Loading from "./Loading";
import "./MessageModal.css";
export const useMessageModal = (openModal, closeModal, init = false) => {
  const [isOpen, setIsOpen] = useState(init);

  return [
    isOpen,
    setIsOpen,
    <MessageModal openModal={openModal} closeModal={closeModal} />,
  ];
};
export default function MessageModal({ openModal, closeModal }) {
  const [init, setInit] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      openModal(setMessage, closeModal);
      setInit(true);
    }, 250);
  }, [openModal, closeModal]);
  const onClick = () => {
    setInit(false);
    setTimeout(() => {
      closeModal(message);
    }, 500);
  };
  return (
    <>
      {!message && <Loading />}
      <div className={`mask${init && message ? "" : " mask--before"}`}>
        <div className={`modal${init && message ? "" : " modal--before"}`}>
          <p>{message}</p>
          <button className="modal__close-btn" onClick={onClick}>
            X
          </button>
        </div>
      </div>
    </>
  );
}
