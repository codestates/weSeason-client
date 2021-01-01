import "./SignIn.css";
import { useCallback, useState } from "react";
import axios from "axios";
import { API_URL } from "../../const";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";

export default function SignIn({ setAccessToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [temp, setTemp] = useState("");
  // 로그인 버튼 클릭,엔터 시
  const signIn = (e) => {
    e.preventDefault();
    //모달창이 없을때만 실행
    if (!isError && !isSuccess) {
      if (!email || !password) {
        // 입력 안했을때
        setIsError(true);
        setError("모든 정보를 입력해주세요");
      } else {
        axios
          .post(
            `${API_URL}/auth/signin`,
            { email, password },
            { withCredentials: true }
          )
          //로그인 성공시 성공 모달, 토큰 임시저장
          .then(
            ({
              data: {
                data: { accessToken },
              },
            }) => {
              setIsSuccess(true);
              setTemp(accessToken);
            }
          )
          //실패시
          .catch(() => {
            setIsError(true);
            setError("입력정보를 확인해주세요.");
          });
      }
    }
  };

  //에러 모달 닫기 버튼
  const closeError = useCallback(() => {
    setIsError(false);
  }, []);
  //성공 모달 닫기 버튼, 메인화면으로 이동
  const closeSuccess = useCallback(() => {
    setAccessToken(temp);
  }, [setAccessToken, temp]);
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
          <p>안녕하세요! 날씨가 많이 쌀쌀하네요.</p>
        </Modal>
      )}
      <div className="sign-in">
        <h1 className="sign-in__logo">weSeason</h1>
        <form>
          <div className="sign-in__form">
            <div>
              <label htmlFor="email">이메일</label>
              <input
                className="sign-in__input"
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                className="sign-in__input"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button className="sign-in__btn" onClick={signIn}>
              Login
            </button>
          </div>
        </form>
        <Link to="/signup">
          <div className="sign-in__sign-up-btn">계정이 없으신가요?</div>
        </Link>
      </div>
    </>
  );
}
