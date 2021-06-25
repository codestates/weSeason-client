import "./mypage.css";
import {
  clickEdit,
  clickNicknameCheckbox,
  clickPasswordCheckbox,
  clickWithdrawal,
  goToEditPage,
  goToMyPage,
  setError,
  setNickname,
  setPassword,
  setPasswordCheck,
  setUserinfo,
} from "../../reducers/mypageReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

import AskWithdrawalContent from "./modal/content/AskWithdrawalContent";
import { useEffect, useRef } from "react";
import { getUserInfo, updateUserInfo } from "../../api/user";
import Modal from "./modal/Modal";
import ErrorContent from "./modal/content/ErrorContent";
import CheckPasswordContent from "./modal/content/CheckPasswordContent";

export default function Mypage() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.appReducer.accessToken
  );
  const {
    isWithdrawalClick,
    error,
    isEditClick,
    isEditPage,
    isNicknameChecked,
    isPasswordChecked,
    nickname,
    password,
    passwordCheck,
    userinfo,
  } = useSelector((state: RootState) => state.mypageReducer);
  const nicknameInput = useRef<HTMLInputElement>(null!);
  const passwordInput = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    if (!accessToken) {
      dispatch(setError("로그인을 해주세요."));
    }
  }, [accessToken, dispatch]);
  useEffect(() => {
    if (accessToken && !isEditPage) {
      (async () => {
        const { name, nickname, email } = await getUserInfo(accessToken);
        dispatch(
          setUserinfo({ name, nickname, email, password: "비밀번호 ㅋㅋㅋ" })
        );
      })();
    }
  }, [accessToken, dispatch, isEditPage]);
  useEffect(() => {
    if (isNicknameChecked) {
      nicknameInput.current.focus();
    }
  }, [isNicknameChecked]);
  useEffect(() => {
    if (isPasswordChecked) {
      passwordInput.current.focus();
    }
  }, [isPasswordChecked]);
  return (
    <div className="mypage">
      <div className="mypage__container">
        <h1 className="mypage__title">
          {!isEditPage ? "마이페이지" : "내 정보 수정하기"}
        </h1>
        <section className="mypage__box">
          {!isEditPage && (
            <button
              className="mypage__editbtn"
              onClick={() => {
                dispatch(clickEdit());
              }}
            ></button>
          )}
          <section className="mypage__mobile-profile">
            <div className="mypage__pic"></div>
            <div className="mypage__info">
              <p className="mypage__nick">{userinfo.nickname}</p>
              <p className="mypage__email">{userinfo.email}</p>
            </div>
          </section>
          <form
            className={`mypage__form ${
              !isEditPage ? "mypage__form--mobile" : ""
            }`}
          >
            <div className="mypage__row mypage__row--disabled">
              <label
                htmlFor="name"
                className="mypage__label mypage__label--disabled"
              >
                이름
              </label>
              <input
                className="mypage__input mypage__input--disabled"
                type="text"
                id="name"
                value={userinfo.name}
                readOnly
              />
            </div>
            <div className="mypage__row mypage__row--disabled">
              <label
                htmlFor="email"
                className="mypage__label mypage__label--disabled"
              >
                이메일
              </label>
              <input
                className="mypage__input mypage__input--disabled"
                type="email"
                id="email"
                value={userinfo.email}
                readOnly
              />
            </div>
            <div className={`mypage__row ${nickname && "mypage__row--fill"}`}>
              {isEditPage && (
                <input
                  className="mypage__checkbox"
                  type="checkbox"
                  onChange={() => {
                    dispatch(clickNicknameCheckbox());
                  }}
                  checked={isNicknameChecked}
                />
              )}
              <label
                htmlFor="nickname"
                className={`mypage__label ${nickname && "mypage__label--fill"}`}
              >
                닉네임
              </label>
              <input
                className="mypage__input"
                ref={nicknameInput}
                type="text"
                id="nickname"
                value={!isNicknameChecked ? userinfo.nickname : nickname}
                readOnly={!isNicknameChecked}
                onChange={(e) => {
                  dispatch(setNickname(e.target.value));
                }}
              />
            </div>

            <div className={`mypage__row ${password && "mypage__row--fill"}`}>
              {isEditPage && (
                <input
                  className="mypage__checkbox"
                  type="checkbox"
                  onChange={() => {
                    dispatch(clickPasswordCheckbox());
                  }}
                  checked={isPasswordChecked}
                />
              )}
              <label
                htmlFor="password"
                className={`mypage__label ${password && "mypage__label--fill"}`}
              >
                비밀번호
              </label>
              <input
                className="mypage__input"
                ref={passwordInput}
                type="password"
                id="password"
                value={!isPasswordChecked ? userinfo.password : password}
                readOnly={!isPasswordChecked}
                onChange={(e) => {
                  dispatch(setPassword(e.target.value));
                }}
              />
            </div>
            {isPasswordChecked && (
              <div
                className={`mypage__row ${
                  passwordCheck && "mypage__row--fill"
                }`}
              >
                <label
                  htmlFor="password-check"
                  className={`mypage__label ${
                    passwordCheck && "mypage__label--fill"
                  }`}
                >
                  비밀번호확인
                </label>
                <input
                  className="mypage__input"
                  type="password"
                  id="password-check"
                  value={passwordCheck}
                  onChange={(e) => {
                    dispatch(setPasswordCheck(e.target.value));
                  }}
                />
              </div>
            )}
          </form>
        </section>
        {isEditPage && (
          <button
            className="mypage__submitbtn"
            disabled={
              (!isNicknameChecked && !isPasswordChecked) ||
              (isNicknameChecked && !nickname) ||
              (isPasswordChecked && (!password || !passwordCheck)) ||
              password !== passwordCheck
            }
            onClick={async () => {
              if (password && password.length < 6) {
                dispatch(setError("비밀번호는 6자리 이상이어야 합니다."));
              } else {
                await updateUserInfo(nickname, password, accessToken);
                dispatch(goToMyPage());
              }
            }}
          ></button>
        )}
      </div>
      {!isEditPage && (
        <button
          className="mypage__withdrawal"
          onClick={() => {
            dispatch(clickWithdrawal());
          }}
        ></button>
      )}
      {isEditClick && (
        <Modal>
          {error ? (
            <ErrorContent />
          ) : (
            <CheckPasswordContent onSuccess={goToEditPage} />
          )}
        </Modal>
      )}
      {isWithdrawalClick && (
        <Modal>
          <AskWithdrawalContent />
        </Modal>
      )}
      {isEditPage && error && (
        <Modal>
          <ErrorContent />
        </Modal>
      )}
      {!isEditClick && !isEditPage && error && (
        <Modal>
          <ErrorContent goToHome />
        </Modal>
      )}
    </div>
  );
}
