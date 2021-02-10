import React from "react";
import "./signUp.css";

const SignUp = () => {
  return (
    <div id="signUpPage">
      <h1 id="signUp__ment">회원가입</h1>
      <div id="signUp__userInfo">
        <div className="userInfo__contain">
          <p className="userInfo__title">이름</p>
          <input
            type="text"
            className="userInfo__input"
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div className="userInfo__contain">
          <p className="userInfo__title">닉네임</p>
          <input
            type="text"
            className="userInfo__input"
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <div className="userInfo__contain">
          <p className="userInfo__title">이메일</p>
          <input
            type="email"
            className="userInfo__input"
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div className="userInfo__contain">
          <p className="userInfo__title">비밀번호</p>
          <input
            type="password"
            className="userInfo__input"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div className="userInfo__contain">
          <p className="userInfo__title">비밀번호 확인</p>
          <input
            type="password"
            className="userInfo__input"
            placeholder="비밀번호를 다시 입력해주세요"
          />
        </div>
      </div>
      <button id="signUp__joinBtn">가입하기</button>
    </div>
  );
};

export default SignUp;
