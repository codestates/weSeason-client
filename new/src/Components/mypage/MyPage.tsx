import { clickEdit, clickWithdrawal } from "../../reducers/mypageReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import Modal from "./Modal";
import ErrorContent from "./ErrorContent";
import CheckPasswordContent from "./CheckPasswordContent";
import AskWithdrawalContent from "./AskWithdrawalContent";
import { useEffect, useRef, useState } from "react";

export default function Mypage() {
  const dispatch = useDispatch();
  const isEditClick = useSelector(
    (state: RootState) => state.mypageReducer.isEditClick
  );
  const isWithdrawalClick = useSelector(
    (state: RootState) => state.mypageReducer.isWithdrawalClick
  );
  const isEditPage = useSelector(
    (state: RootState) => state.mypageReducer.isEditPage
  );
  const error = useSelector((state: RootState) => state.mypageReducer.error);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const nicknameInput = useRef<HTMLInputElement>(null!);
  const passwordInput = useRef<HTMLInputElement>(null!);
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
        <button
          className="mypage__editbtn"
          onClick={() => {
            dispatch(clickEdit());
          }}
        >
          edit
        </button>
        <form className="mypage__form">
          <div className="mypage__row">
            <label htmlFor="name">이름</label>
            <input type="text" id="name" value="soSim" readOnly />
          </div>
          <div className="mypage__row">
            {isEditPage && (
              <input
                type="checkbox"
                onChange={(e) => {
                  setIsNicknameChecked(e.target.checked);
                }}
              />
            )}
            <label htmlFor="nickname">닉네임</label>
            <input
              ref={nicknameInput}
              type="text"
              id="nickname"
              value={nickname}
              readOnly={!isNicknameChecked}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </div>
          <div className="mypage__row">
            <label htmlFor="id">아이디</label>
            <input type="text" id="id" value="weSeason" readOnly />
          </div>
          <div className="mypage__row">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value="weSeson@weseason.com"
              readOnly
            />
          </div>
          <div className="mypage__row">
            {isEditPage && (
              <input
                type="checkbox"
                onChange={(e) => {
                  setIsPasswordChecked(e.target.checked);
                }}
              />
            )}
            <label htmlFor="password">비밀번호</label>
            <input
              ref={passwordInput}
              type="password"
              id="password"
              value={password}
              readOnly={!isPasswordChecked}
              onChange={(e) => {
                setPassword(e.target.value);
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
                  setPasswordCheck(e.target.value);
                }}
              />
            </div>
          )}
        </form>
      </section>
      {isEditPage && <button onClick={() => {}}>submit</button>}
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
