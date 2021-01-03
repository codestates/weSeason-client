import "./SignIn.css";
import { useCallback, useState } from "react";
import axios from "axios";
import { API_URL } from "../../const";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";

export default function SignIn({ setAccessToken, setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [temp, setTemp] = useState();
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
            `${API_URL}/auth/local`,
            { email, password },
            { withCredentials: true }
          )
          //로그인 성공시 성공 모달, 토큰 임시저장
          .then(
            ({
              data: {
                data: { accessToken, auth },
              },
            }) => {
              setIsSuccess(true);
              setTemp({ accessToken, auth });
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
    setAccessToken(temp.accessToken);
    setAuth(temp.auth);
  }, [setAccessToken, temp, setAuth]);
  //에러시 에러 모달,성공시 성공모달
  return (
    <>
      {isError && <Modal closeModal={closeError}>{error}</Modal>}
      {isSuccess && (
        <Modal closeModal={closeSuccess}>
          안녕하세요! 날씨가 많이 쌀쌀하네요.
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
            <div className="sign-in__oauth">
              <a
                className="sign-in__btn sign-in__btn--google sign-in__btn__oauth"
                href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=753726601122-kv6c6c3gihku2mv2dsqvi4fldv5mnpsh.apps.googleusercontent.com&redirect_uri=https://localhost:3000/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline`}
              >
                Google Login
              </a>
              <a
                className="sign-in__btn sign-in__btn--github sign-in__btn__oauth"
                href="https://github.com/login/oauth/authorize?client_id=8de2fdaa38d52d7dfe8c"
              >
                GitHub Login
              </a>
            </div>
          </div>
        </form>
        <Link to="/signup">
          <div className="sign-in__sign-up-btn">계정이 없으신가요?</div>
        </Link>
      </div>
    </>
  );
}
