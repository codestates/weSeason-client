import axios from "axios";
import React, { useState } from "react";
import "./WithdrawalMember.css";
import ErrorModal from "./ErrorModal";
import { API_URL } from "../const";
import { useHistory } from "react-router-dom";

const WithdrawalMember = ({ accessToken, logout }) => {
  const [isPassword, setPassword] = useState("");
  const [isErrorPassword, setErrorPassword] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = () => {
    if (!isPassword) {
      // 패스워드 미입력 후 요청시 에러 모달 노출
      setErrorPassword(true);
      setErrorMessage("비밀번호를 입력해주세요.");
    } else {
      axios
        .post(
          `${API_URL}/auth/check`,
          { password: isPassword },
          { headers: { authorization: `Bearer ${accessToken}` } }
        )
        .then(() => {
          // 인증이 완료된 경우 탈퇴 버튼 노출
          setAuth(true);
        })
        .catch((err) => {
          // 오류시
          console.log(err);
          // 비밀번호 에러 모달
          setErrorPassword(true);
          setErrorMessage("비밀번호를 재확인해주세요.");
        });
    }
  };

  const handleDeleteUser = () => {
    axios
      .delete(`${API_URL}/users`, {
        headers: { authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        // 성공시 삭제후 메인으로 이동, 로그아웃 진행
        logout();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleModalResponse = () => {
    setErrorPassword(false);
    setErrorMessage("");
  };

  return (
    <div className="WithdrawalMember">
      <div className="WithdrawalMember__main-contain">
        <p className="message">탈퇴를 위해 비밀번호를 입력해주세요.</p>
        <input
          className="WithdrawalMember__input-password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력해주세요"
        ></input>
        <button
          className={
            isAuth
              ? "WithdrawalMember__submit-btn--black"
              : "WithdrawalMember__submit-btn--origin"
          }
          name="submit"
          onClick={handlePasswordCheck}
        >
          submit
        </button>
      </div>
      {isAuth ? (
        <button
          className="WithdrawalMember__out-btn"
          name="out-btn"
          onClick={handleDeleteUser}
        >
          회원 탈퇴 완료
        </button>
      ) : null}
      {isErrorPassword ? (
        <ErrorModal
          error={isErrorMessage}
          handleModalResponse={handleModalResponse}
        />
      ) : null}
    </div>
  );
};

export default WithdrawalMember;
