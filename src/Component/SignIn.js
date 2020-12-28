import { useState } from "react";
import ErrModal from "./ErrModal";
import "./SignIn.css";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const checkFields = () => {
    if (!email || !password) {
      setError("모든 정보를 입력해주세요");
    } else {
    }
  };
  return (
    <div className="sign-in">
      {error && <ErrModal setError={setError} error={error} />}
      <h1 className="sign-in__logo">weSeason</h1>
      <div className="sign-in__form">
        <div>
          <label htmlFor="email">이메일</label>
          <input
            className="sign-in__input"
            type="text"
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
        <button className="sign-in__btn" onClick={checkFields}>
          Login
        </button>
      </div>
    </div>
  );
}
