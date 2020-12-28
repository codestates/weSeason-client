import React from "react";
import "./EditMypage.css";

const EditMypage = ({ userinfo }) => {
  return (
    <div className="EditMypage">
      <h1>Mypage</h1>
      <div className="EditMypage__contain">
        <div className="EditMypage__ul"></div>
        <ul className="EditMypage__userinfo-contain">
          <li className="EditMypage__userinfo--item">
            <div className="EditMypage__item-title">이름</div>
            <div className="EditMypage_item-info">{userinfo.name}</div>
            <div className="EditMypage__userinfo__underline"></div>
          </li>

          <li className="EditMypage__userinfo--item">
            <input
              className="EditMypage__checkbox"
              type="checkbox"
              name="nick-name"
              value="nick-name"
            ></input>
            <div className="EditMypage__item-title nick-name">닉네임</div>
            <div className="EditMypage_item-info">{userinfo.nickname}</div>
            <div className="EditMypage__userinfo__underline"></div>
          </li>
          <li className="EditMypage__userinfo--item">
            <div className="EditMypage__item-title">아이디</div>
            <div className="EditMypage_item-info">{userinfo.id}</div>
            <div className="EditMypage__userinfo__underline"></div>
          </li>
          <li className="EditMypage__userinfo--item">
            <div className="EditMypage__item-title">email</div>
            <div className="EditMypage_item-info">{userinfo.email}</div>
            <div className="EditMypage__userinfo__underline"></div>
          </li>
          <li className="EditMypage__userinfo--item">
            <input
              className="EditMypage__checkbox"
              type="checkbox"
              name="password"
              value="password"
            ></input>
            <div className="EditMypage__item-title password">비밀번호</div>
            <div className="EditMypage_item-info">
              ⚫️ ⚫️ ⚫️ ⚫️ ⚫️ ⚫️ ⚫️
            </div>
            <div className="EditMypage__userinfo__underline"></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditMypage;
