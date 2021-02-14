import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { API_URL, REDIRECT_URL } from "../../const";
import OneBtnModal from "../modal/OneBtnModal";
import "./login.css";
import { setAccessToken } from "../../reducers/appReducer";

type LoginProps = {
  pageWidth: number;
  modifyAccessToken(token: string): void;
};

const Login = ({ pageWidth, modifyAccessToken }: LoginProps) => {
  const [resPage, setResPage] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resError, setResError] = useState<boolean>(false);
  const [webError, setWebError] = useState<boolean>(false);
  const [defaultBtnColor, setDefaultBtnColor] = useState<boolean>(true);
  const [resMessage, setResMessage] = useState<string>("");
  const [webSuccess, setWebSuccess] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    if (pageWidth < 1024) {
      setResPage(true);
    } else {
      setResPage(false);
    }

    if (email && password && password.length >= 6) {
      setDefaultBtnColor(false);
    } else {
      setDefaultBtnColor(true);
    }

    if (resError && pageWidth >= 1024) {
      setResError(false);
    } else if (webError && pageWidth < 1024) {
      setWebError(false);
    }
  }, [pageWidth, email, password, resError, webError]);

  const handleChangeLoginData = (e: any) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (targetName === "email") {
      setEmail(targetValue);
    } else {
      setPassword(targetValue);
    }
  };

  const checkEmptyInputOrFaultPassword = () => {
    if (!email && !password) {
      setErrorMessage("모든 정보를 입력해주세요");
    } else if (!email) {
      setErrorMessage("이메일을 입력해주세요");
    } else if (!password) {
      setErrorMessage("비밀번호를 입력해주세요");
    } else if (password.length < 6) {
      setErrorMessage("6자리 이상의 비밀번호를 입력해주세요");
    } else {
      setErrorMessage("");
    }
  };

  const handleFindLoginUser = async () => {
    try {
      const data = await axios.post(
        `${API_URL}/auth/local`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const accessToken = data.data.data.accessToken;

      modifyAccessToken(accessToken);

      if (pageWidth > 1024) {
        setErrorMessage("로그인 성공");
        setResMessage("메인 페이지로 이동합니다");
        setWebSuccess(true);
      } else {
        history.push("/");
      }
    } catch {
      setErrorMessage("일치하는 정보가 확인되지 않습니다");

      if (pageWidth > 1024) {
        setWebSuccess(false);
        setWebError(true);
      } else {
        setResError(true);
      }
    }
  };

  const checkPageWidthErrorConcepts = () => {
    if (pageWidth < 1024 && errorMessage) {
      setResError(true);
    } else if (pageWidth >= 1024 && errorMessage) {
      // 웹 에러 모달
      setWebError(true);
    } else if (!errorMessage && !defaultBtnColor) {
      // ajax 호출
      handleFindLoginUser();
    }
  };

  const handleFindModalClose = () => {
    setWebError(false);
    setWebSuccess(false);

    if (errorMessage) {
      setErrorMessage("");
    }
    if (resError) {
      setResError(false);
    }

    if (resMessage) {
      setResMessage("");
      history.push("/");
    }
  };

  const handleClickLogin = async () => {
    // 에러
    await checkEmptyInputOrFaultPassword();
    await checkPageWidthErrorConcepts();
  };

  return (
    <div id="loginPage">
      <div id="login__logo">
        {resPage ? (
          <p id="login__title">로그인</p>
        ) : (
          <p id="logo__title">weSeason</p>
        )}
      </div>
      <div id="login__contants">
        <div id="login__input-items">
          <div className="login__input-contain">
            <div
              className={
                !email
                  ? "login__input-title-basic"
                  : "login__input-title-extend"
              }
            >
              이메일
            </div>
            <input
              type="text"
              name="email"
              className={
                !email ? "login__input-form-basic" : "login__input-form-extend"
              }
              placeholder="이메일을 입력해주세요"
              onChange={handleChangeLoginData}
            />
          </div>
          <div className="login__input-contain">
            <div
              className={
                !password
                  ? "login__input-title-basic"
                  : "login__input-title-extend"
              }
            >
              비밀번호
            </div>
            <input
              type="password"
              name="password"
              className={
                !password
                  ? "login__input-form-basic"
                  : "login__input-form-extend"
              }
              placeholder="비밀번호(6자리 이상) 입력해주세요"
              onChange={handleChangeLoginData}
            />
          </div>
        </div>
        <button
          id={
            defaultBtnColor
              ? "login__login-Btn-basic"
              : "login__login-Btn-extend"
          }
          onClick={handleClickLogin}
        >
          로그인
        </button>
        {resError ? <div id="login__errorView">{errorMessage}</div> : null}
        <div id="login__oauth-contain">
          <button id="login__oauth-btn--google">
            <a
              href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=753726601122-kv6c6c3gihku2mv2dsqvi4fldv5mnpsh.apps.googleusercontent.com&redirect_uri=${REDIRECT_URL}/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`}
            >
              구글 로그인
            </a>
          </button>
          <button id="login__oauth-btn--github">
            <a href="https://github.com/login/oauth/authorize?client_id=8de2fdaa38d52d7dfe8c">
              깃허브 로그인
            </a>
          </button>
        </div>
        <Link id="login__link" to="/signup">
          계정이 없으신가요?
        </Link>
      </div>
      {webError ? (
        <OneBtnModal
          message={errorMessage}
          info=""
          handleFindModalClose={handleFindModalClose}
        />
      ) : null}
      {webSuccess ? (
        <OneBtnModal
          message={errorMessage}
          info={resMessage}
          handleFindModalClose={handleFindModalClose}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { pageWidth: state.pageWidth.width };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyAccessToken: (token: string) => dispatch(setAccessToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
