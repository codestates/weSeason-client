import "./SignUp.css";
import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../const";
import Modal from "../Modal/Modal";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  // signUp 버튼 클릭,엔터 시
  const signUp = useCallback(
    (e) => {
      e.preventDefault();
      //모달창이 없을때만 실행
      if (!isSuccess && !isError) {
        if (!email || !password || !passwordCheck || !name || !nickname) {
          // 모두 입력 안됐을때 에러모달 오픈
          setIsError(true);
          setError("모든 정보를 입력해주세요");
        } else if (passwordCheck !== password) {
          // 비밀번호, 비밀번호 확인이 각각 다를때
          setIsError(true);
          setError("입력하신 비밀번호가 달라요");
        } else {
          // 회원가입 요청
          axios
            .post(`${API_URL}/users`, {
              name,
              nickname,
              password,
              email,
            })
            // 성공시 성공 모달 오픈
            .then(() => {
              setIsSuccess(true);
            })
            // 실패시 오류 모달 오픈
            .catch(() => {
              setIsError(true);
              setError("존재하는 이메일입니다.");
            });
        }
      }
    },
    [email, password, passwordCheck, name, nickname, isError, isSuccess]
  );
  //에러 모달 닫기 버튼
  const closeError = useCallback(() => {
    setIsError(false);
  }, []);
  //성공 모달 닫기 버튼, 메인화면으로 이동
  const closeSuccess = useCallback(() => {
    history.push("/");
  }, [history]);
  //에러시 에러 모달,성공시 성공모달
  return (
    <>
      {isError && (
        <Modal closeModal={closeError}>
          <p>{error}</p>
        </Modal>
      )}
      {isSuccess && (
        <Modal closeModal={closeSuccess}>
          <p>회원가입 완료!</p>
        </Modal>
      )}
      <div className="sign-up">
        <h1>SignUp</h1>
        <form className="sign-up__form">
          <div className="sign-up__box">
            <h2>userinfo</h2>
            <div>
              <div className="sign-up__row">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            </div>
            <div>
              <div className="sign-up__row">
                <label htmlFor="nickname">닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  onChange={(e) => setNickname(e.target.value)}
                  value={nickname}
                />
              </div>
            </div>
            <div>
              <div className="sign-up__row">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div>
              <div className="sign-up__row">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
            <div>
              <div className="sign-up__row">
                <label htmlFor="password-check">비밀번호 확인</label>
                <input
                  type="password"
                  id="password-check"
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  value={passwordCheck}
                />
              </div>
            </div>
          </div>
          <button className="sign-up__btn" onClick={signUp}>
            SignUp
          </button>
        </form>
      </div>
    </>
  );
}
