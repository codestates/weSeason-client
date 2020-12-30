import axios from "axios";
import { useCallback, useState } from "react";
import "./SignUp.css";
import { API_URL } from "../const";
import MessageModal from "./MessageModal";
import { useHistory } from "react-router-dom";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(
    (setMessage) => {
      if (!email || !password || !passwordCheck || !name || !nickname) {
        setMessage("모든 정보를 입력해주세요");
      } else if (passwordCheck !== password) {
        setMessage("입력하신 비밀번호가 달라요");
      } else {
        axios
          .post(`${API_URL}/users`, {
            name,
            nickname,
            password,
            email,
          })
          .then(() => {
            setMessage("회원가입완료!");
          })
          .catch(() => {
            setMessage("존재하는 이메일입니다.");
          });
      }
    },
    [email, name, nickname, password, passwordCheck]
  );
  const closeModal = useCallback(
    (message) => {
      if (message === "회원가입완료!") {
        history.push("/");
      } else {
        setIsOpen(false);
      }
    },
    [history]
  );
  const onClick = () => {
    setIsOpen(true);
  };
  return (
    <div className="sign-up">
      {isOpen && <MessageModal openModal={openModal} closeModal={closeModal} />}
      <h1>SignUp</h1>
      <div className="sign-up__form">
        <h2>userinfo</h2>
        <div className="sign-up__row">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="sign-up__row">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
          />
        </div>
        <div className="sign-up__row">
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="sign-up__row">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="sign-up__row">
          <label htmlFor="password-check">비밀헌호 확인</label>
          <input
            type="password"
            id="password-check"
            onChange={(e) => setPasswordCheck(e.target.value)}
            value={passwordCheck}
          />
        </div>
      </div>
      <button className="sign-up__btn" onClick={onClick}>
        SignUp
      </button>
    </div>
  );
}
