import {
  clickEdit,
  clickNicknameCheckbox,
  clickPasswordCheckbox,
  clickWithdrawal,
  goToMyPage,
  setNickname,
  setPassword,
  setPasswordCheck,
  setUserinfo,
} from "../../reducers/mypageReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import Modal from "./Modal";
import ErrorContent from "./ErrorContent";
import CheckPasswordContent from "./CheckPasswordContent";
import AskWithdrawalContent from "./AskWithdrawalContent";
import { useEffect, useRef } from "react";
import { getUserInfo, updateUserInfo } from "../../api";

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
  } = useSelector((state: RootState) => state.mypageReducer);
  const userinfo = useSelector(
    (state: RootState) => state.mypageReducer.userinfo
  );
  const nicknameInput = useRef<HTMLInputElement>(null!);
  const passwordInput = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    if (accessToken) {
      (async () => {
        const { name, nickname, email } = await getUserInfo(accessToken);
        dispatch(
          setUserinfo({ name, nickname, email, password: "비밀번호 ㅋㅋㅋ" })
        );
      })();
    }
  }, [accessToken, dispatch]);
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
      <h1 className="mypage__title">마이페이지</h1>
      <section className="mypage__box">
        {!isEditPage && (
          <button
            className="mypage__editbtn"
            onClick={() => {
              dispatch(clickEdit());
            }}
          >
            edit
          </button>
        )}
        <form className="mypage__form">
          <div className="mypage__row">
            <label htmlFor="name">이름</label>
            <input type="text" id="name" value={userinfo.name} readOnly />
          </div>
          <div className="mypage__row">
            {isEditPage && (
              <input
                type="checkbox"
                onChange={() => {
                  dispatch(clickNicknameCheckbox());
                }}
              />
            )}
            <label htmlFor="nickname">닉네임</label>
            <input
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
          <div className="mypage__row">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" value={userinfo.email} readOnly />
          </div>
          <div className="mypage__row">
            {isEditPage && (
              <input
                type="checkbox"
                onChange={() => {
                  dispatch(clickPasswordCheckbox());
                }}
              />
            )}
            <label htmlFor="password">비밀번호</label>
            <input
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
            <div className="mypage__row">
              <label htmlFor="password-check">비밀번호확인</label>
              <input
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
          disabled={
            (!isNicknameChecked && !isPasswordChecked) ||
            (isNicknameChecked && !nickname) ||
            (isPasswordChecked && (!password || !passwordCheck)) ||
            password !== passwordCheck
          }
          onClick={async () => {
            await updateUserInfo(nickname, password, accessToken);
            dispatch(goToMyPage());
          }}
        >
          submit
        </button>
      )}
      {!isEditPage && (
        <button
          onClick={() => {
            dispatch(clickWithdrawal());
          }}
        >
          탈퇴
        </button>
      )}
      {isEditClick && (
        <Modal>{error ? <ErrorContent /> : <CheckPasswordContent />}</Modal>
      )}
      {isWithdrawalClick && (
        <Modal>
          <AskWithdrawalContent />
        </Modal>
      )}
    </div>
  );
}
