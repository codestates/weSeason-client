import React, { useState } from "react";
import "./BasicUserinfo.css";
import EditModal from "./EditModal";

const BasicUserinfo = ({ userinfo, handleEditResoponse }) => {
  const [isEditModal, setEditModal] = useState(false);

  const handleEditModal = () => {
    setEditModal(true);
  };

  const handleModalResponse = () => {
    setEditModal(false);
  };
  //탈퇴 라우터 연결 필요
  return (
    <>
      {isEditModal ? (
        <EditModal handleModalResponse={handleModalResponse} />
      ) : null}
      <div className="BasicUserinfo">
        <h1>Mypage</h1>
        <div className="BasicUserinfo__contain">
          <button className="BasicUserinfo__edit-btn" onClick={handleEditModal}>
            edit
          </button>
          <ul className="BasicUserinfo__userinfo-contain">
            <li className="BasicUserinfo__userinfo--item">
              <div className="BasicUserinfo__item-title">이름</div>
              <div className="BasicUserinfo_item-info">{userinfo.name}</div>
            </li>

            <li className="BasicUserinfo__userinfo--item">
              <div className="BasicUserinfo__item-title">닉네임</div>
              <div className="BasicUserinfo_item-info">{userinfo.nickname}</div>
            </li>
            <li className="BasicUserinfo__userinfo--item">
              <div className="BasicUserinfo__item-title">아이디</div>
              <div className="BasicUserinfo_item-info">{userinfo.id}</div>
            </li>
            <li className="BasicUserinfo__userinfo--item">
              <div className="BasicUserinfo__item-title">email</div>
              <div className="BasicUserinfo_item-info">{userinfo.email}</div>
            </li>
            <li className="BasicUserinfo__userinfo--item">
              <div className="BasicUserinfo__item-title">비밀번호</div>
              <div className="BasicUserinfo_item-info">
                ⚫️ ⚫️ ⚫️ ⚫️ ⚫️ ⚫️ ⚫️
              </div>
            </li>
          </ul>
        </div>
      </div>
      <button className="BasicUserinfo__Withdrawal-btn">회원 탈퇴</button>
    </>
  );
};

export default BasicUserinfo;
