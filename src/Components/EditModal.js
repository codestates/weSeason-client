import React, { useState } from "react";
import "./EditModal.css";

const EditModal = ({ handleModalResponse }) => {
  const [isCloseModal, setCloseModal] = useState(true);

  const handleEditModalClose = () => {
    setCloseModal(false);
    handleModalResponse();
  };
  return (
    <>
      {isCloseModal ? (
        <div className="EditModal__background">
          <div className="EditModal__contain">
            <p>본인확인을 위해 비밀번호를 입력해주세요.</p>
            <input
              className="EditModal__input-password"
              type="password"
              name="password"
              placeholder="비밀번호 입력"
            ></input>
            <div className="EditModal__btn-contain">
              <button className="EditModal__btn">yes</button>
              <button className="EditModal__btn" onClick={handleEditModalClose}>
                no
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditModal;
