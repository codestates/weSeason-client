import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  return (
    <div id="loginPage">
      <div id="login__logo">
        <p id="logo__title">weSeason</p>
      </div>
      <div id="login__input-items">
        <div className="login__input-contain">
          <div className="login__input-title">이메일</div>
          <input
            type="text"
            className="login__input-form"
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div className="login__input-contain">
          <div className="login__input-title">비밀번호</div>
          <input
            type="password"
            className="login__input-form"
            placeholder="비밀번호(6자리 이상) 입력해주세요"
          />
        </div>
      </div>
      <button id="login__login-Btn">로그인</button>
      <div id="login__oauth-contain">
        <button id="login__oauth-btn--google">구글 로그인</button>
        <button id="login__oauth-btn--github">깃허브 로그인</button>
      </div>
      <Link to="/signup" className="login__link">
        계정이 없으신가요?
      </Link>
    </div>
  );
};

export default Login;
