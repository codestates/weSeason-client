import React, { useState } from "react";
import "./ErrorPasswordModal.css";

const ErrorPasswordModal = ({ handleModalResponse }) => {
  const [isErrorModalClose, setErrorModalClose] = useState(false);

  const handleChangeCloseErrorModal = () => {
    handleModalResponse();
    setErrorModalClose(true);
  };

  return (
    <>
      {isErrorModalClose ? null : (
        <div className="EditModal__background">
          <div className="EditModal__contain">
            <p>비밀번호를 재확인해주세요.</p>
            <div className="EditModal__btn-contain">
              <button
                className="EditModal__btn"
                onClick={handleChangeCloseErrorModal}
              >
                yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorPasswordModal;
