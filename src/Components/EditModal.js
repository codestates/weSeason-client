import React, { useState } from "react";
import "./EditModal.css";
import axios from "axios";
import ErrorPasswordModal from "./ErrorPasswordModal";

const EditModal = ({ handleModalResponse }) => {
  const [isCloseModal, setCloseModal] = useState(false);
  const [isPassword, setPassword] = useState("");
  const [isFalsyPassword, setFalsyPassword] = useState(false);

  const handleEditModalClose = () => {
    setCloseModal(true);
    handleModalResponse();
  };

  // POST /auth/check
  // req > { password : '1234' }
  // res > { message : 'ok' }
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const checkPassword = () => {
    axios
      .post("https://localhost:3000/auth/check", { password: isPassword })
      .then((data) => {
        // 성공시 활성화된 수정 페이지로 이동, 렌더링
      })
      .catch((err) => {
        // 실패시 오류 모달 노출
        setFalsyPassword(true);
        setCloseModal(true);
      });
  };

  return (
    <>
      {!isCloseModal ? (
        <div className="EditModal__background">
          <div className="EditModal__contain">
            <p>본인확인을 위해 비밀번호를 입력해주세요.</p>
            <input
              className="EditModal__input-password"
              type="password"
              name="password"
              placeholder="비밀번호 입력"
              onChange={changePassword}
            ></input>
            <div className="EditModal__btn-contain">
              <button className="EditModal__btn" onClick={checkPassword}>
                yes
              </button>
              <button className="EditModal__btn" onClick={handleEditModalClose}>
                no
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {isFalsyPassword ? (
        <ErrorPasswordModal handleModalResponse={handleModalResponse} />
      ) : null}
    </>
  );
};

export default EditModal;
