import { useState } from "react";
import "./SignIn.css";
import { useMessageModal } from "./MessageModal";
import axios from "axios";
import { API_URL } from "../const";

export default function SignIn({ setAccessToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen, MessageModal] = useMessageModal(
    (setMessage) => {
      if (!email || !password) {
        setMessage("모든 정보를 입력해주세요");
      } else {
        axios
          .post(
            `${API_URL}/auth/signin`,
            { email, password },
            { withCredentials: true }
          )
          .then(
            ({
              data: {
                data: { accessToken },
              },
            }) => {
              setAccessToken(accessToken);
            }
          )
          .catch(() => {
            setMessage("입력정보를 확인해주세요.");
          });
      }
    },
    () => {
      setIsOpen(false);
    }
  );
  const onClick = () => {
    setIsOpen(true);
  };
  return (
    <div className="sign-in">
      {isOpen && MessageModal}
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
        <button className="sign-in__btn" onClick={onClick}>
          Login
        </button>
      </div>
    </div>
  );
}
