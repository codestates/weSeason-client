import React, { useState } from "react";
import "./EditMypage.css";
import ErrorModal from "./ErrorModal";
import axios from "axios";
import { useHistory } from "react-router-dom";

const url = process.env.URL;

const EditMypage = ({ userinfo }) => {
  const [isNicknameChecked, setNicknameChecked] = useState(false);
  const [isPasswordChecked, setPasswordChecked] = useState(false);
  const [isNickname, setNickname] = useState("");
  const [isPassword, setPassword] = useState("");
  const [isdoublePassword, setDoublePassword] = useState("");
  const [isError, setError] = useState("");
  let history = useHistory();

  // 유효성 검사?? 필요!
  const handleModalResponse = () => {
    setError("");
  };

  const handleChangeboxCheck = (e) => {
    if (e.target.name === "nick-name") {
      setNicknameChecked(!isNicknameChecked);
    } else setPasswordChecked(!isPasswordChecked);
  };

  const handleChangeUserinfo = (e) => {
    if (e.target.name === "nick-name") {
      setNickname(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else setDoublePassword(e.target.value);
  };

  const handleSubmitUserinfo = () => {
    //유효성 통과했다고 가정
    // 1. 입력 비밀번호, 비밀번호 재확인 값이 동일해야 함
    // 1-1. 같지 않다면 또 모달창으로 알려줌
    // 2. 빈 문자열이면 안됨
    // 3. 서버로 고객 정보 전달 PATCH

    if (isNicknameChecked && !isNickname) {
      setError("닉네임을 입력해주세요.");
    } else if (isPasswordChecked && (!isPasswordChecked || !isdoublePassword)) {
      setError("비밀번호 또는 재확인 비밀번호가 일치하지 않습니다.");
    } else {
      axios
        .patch(`${url}/users`, {
          nickname: isNicknameChecked,
          password: isPassword,
        })
        .then(() => {
          //성공시 마이페이지 리디렉션
          history.push("/Mypage");
        })
        .catch((err) => {
          //실패시 EditMypage 초기화면 리디렉션
          console.log(err);
        });
    }
    // if (isPasswordChecked !== isdoublePassword) {
    //   // 비밀번호와 비밀번호 재확인이 일치하지 않는 경우
    //   // 에러 모달
    //   console.log(isPasswordChecked, isdoublePassword);
    //   setError("비밀번호 또는 재확인 비밀번호가 일치하지 않습니다.");
    // }

    // if (isNicknameChecked && !isNickname) {
    //   // 닉네임 체크 되어있으나 입력되지 않은 경우
    //   // 에러 모달
    //   setError("닉네임을 입력해주세요.");
    // } else if (isPasswordChecked && (!isPassword || !isdoublePassword)) {
    //   // 패스워드 체크 되어있으나 하나라도 입력되지 않은 경우
    //   // 에러 모달
    //   setError("비밀번호 또는 재확인 비밀번호를 입력해주세요.");
    // } else {
    //   // axios PATCH
    //   axios
    //     .patch(`${url}/users`, {
    //       nickname: isNicknameChecked,
    //       password: isPassword,
    //     })
    //     .then(() => {
    //       //성공시 마이페이지 리디렉션
    //     })
    //     .catch((err) => {
    //       //실패시 EditMypage 초기화면 리디렉션
    //     });
    // }
  };

  return (
    <div className="EditMypage">
      <h1>Mypage</h1>
      <div
        className={
          isPasswordChecked
            ? "EditMypage__contain--check"
            : "EditMypage__contain--basic"
        }
      >
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
              defaultChecked={isNicknameChecked}
              onChange={handleChangeboxCheck}
            ></input>

            <div className="EditMypage__item-title nick-name">닉네임</div>
            {isNicknameChecked ? (
              <input
                className="EditMypage__input"
                type="text"
                name="nick-name"
                onChange={handleChangeUserinfo}
              ></input>
            ) : (
              <div className="EditMypage_item-info">{userinfo.nickname}</div>
            )}

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
              defaultChecked={isPasswordChecked}
              onChange={handleChangeboxCheck}
            ></input>
            <div className="EditMypage__item-title password">비밀번호</div>
            {isPasswordChecked ? (
              <input
                className="EditMypage__input"
                type="password"
                name="password"
                onChange={handleChangeUserinfo}
              ></input>
            ) : (
              <div className="EditMypage_item-info">
                ⚫️ ⚫️ ⚫️ ⚫️ ⚫️ ⚫️ ⚫️
              </div>
            )}

            <div className="EditMypage__userinfo__underline"></div>
          </li>
          {isPasswordChecked ? (
            <li className="EditMypage__userinfo--item">
              <div className="EditMypage__item-title">비밀번호 확인</div>
              <input
                className="EditMypage__input"
                type="password"
                name="password-double-check"
                onChange={handleChangeUserinfo}
              ></input>
              <div className="EditMypage__userinfo__underline"></div>
            </li>
          ) : null}
        </ul>
      </div>
      <button
        className="EditMypage__submit-btn"
        name="submit"
        onClick={handleSubmitUserinfo}
      >
        submit
      </button>
      {isError ? (
        <ErrorModal handleModalResponse={handleModalResponse} error={isError} />
      ) : null}
    </div>
  );
};

export default EditMypage;