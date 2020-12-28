import { useState } from "react";
import ErrModal from "./ErrModal";
import "./SignUp.css";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const checkFields = () => {
    if (!email || !password || !passwordCheck || (!name && !nickname)) {
      setError("모든 정보를 입력해주세요");
    } else if (passwordCheck !== password) {
      setError("입력하신 비밀번호가 달라요");
    } else {
    }
  };
  const closeModal = () => {
    setError("");
  };
  return (
    <div className="sign-up">
      {error && <ErrModal setError={setError} error={error} />}
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
      <button className="sign-up__btn" onClick={checkFields}>
        SignUp
      </button>
    </div>
  );
}
