import React, { useState } from "react";
import "./OriginMypage.css";
import EditModal from "./EditModal";
import WithdrawalModal from "./WithdrawalModal";

const OriginMypage = ({ userinfo, handleChangeMypage, accessToken }) => {
  const [isEditModal, setEditModal] = useState(false);
  const [isWithdrawalModal, setWithdrawalModal] = useState(false);

  const handleWithdrawalModal = () => {
    setWithdrawalModal(true);
  };

  const handleWithdrawalModalResponse = () => {
    setWithdrawalModal(false);
  };

  const handleEditModal = () => {
    setEditModal(true);
  };

  const handleModalResponse = () => {
    setEditModal(false);
  };

  return (
    <>
      {isEditModal ? (
        <EditModal
          accessToken={accessToken}
          userinfo={userinfo}
          handleModalResponse={handleModalResponse}
          handleChangeMypage={handleChangeMypage}
        />
      ) : null}
      <div className="OriginMypage">
        <h1>Mypage</h1>
        <div className="OriginMypage__contain">
          <button className="OriginMypage__edit-btn" onClick={handleEditModal}>
            edit
          </button>
          <ul className="OriginMypage__userinfo-contain">
            <li className="OriginMypage__userinfo--item">
              <div className="OriginMypage__item-title">이름</div>
              <div className="OriginMypage_item-info">{userinfo.name}</div>
              <div className="OriginMypage__userinfo__underline"></div>
            </li>

            <li className="OriginMypage__userinfo--item">
              <div className="OriginMypage__item-title">닉네임</div>
              <div className="OriginMypage_item-info">{userinfo.nickname}</div>
              <div className="OriginMypage__userinfo__underline"></div>
            </li>
            <li className="OriginMypage__userinfo--item">
              <div className="OriginMypage__item-title">email</div>
              <div className="OriginMypage_item-info">{userinfo.email}</div>
              <div className="OriginMypage__userinfo__underline"></div>
            </li>
            <li className="OriginMypage__userinfo--item">
              <div className="OriginMypage__item-title">비밀번호</div>
              <div className="OriginMypage_item-info info-password">
                ⚫️ ⚫️ ⚫️ ⚫️ ⚫️ ⚫️ ⚫️
              </div>
              <div className="OriginMypage__userinfo__underline"></div>
            </li>
          </ul>
        </div>
      </div>

      <button
        onClick={handleWithdrawalModal}
        className="OriginMypage__Withdrawal-btn"
      >
        회원 탈퇴
      </button>
      {isWithdrawalModal ? (
        <WithdrawalModal
          handleWithdrawalModalResponse={handleWithdrawalModalResponse}
        />
      ) : null}
    </>
  );
};

export default OriginMypage;
