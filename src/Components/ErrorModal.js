import React, { useState } from "react";
import "./ErrorModal.css";

const ErrorModal = ({ error, handleModalResponse, accessToken }) => {
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
            <p>{error}</p>
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

export default ErrorModal;
