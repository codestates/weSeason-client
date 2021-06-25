import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./WithdrawalModal.css";

const WithdrawalModal = ({ handleWithdrawalModalResponse }) => {
  const [isModalClose, setModalClose] = useState(false);

  const handleChangeCloseModal = () => {
    handleWithdrawalModalResponse();
    setModalClose(true);
  };

  return (
    <>
      {isModalClose ? null : (
        <div className="WithdrawalModal__background">
          <div className="WithdrawalModal__contain">
            <p>정말 회원탈퇴를 하시겠습니까?</p>
            <div className="WithdrawalModal__btn-contain">
              <Link to="/Withdrawal">
                <button className="WithdrawalModal__btn--yes">yes</button>
              </Link>
              <button
                className="WithdrawalModal__btn--no"
                onClick={handleChangeCloseModal}
              >
                no
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawalModal;
