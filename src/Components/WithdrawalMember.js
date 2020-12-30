import axios from "axios";
import React, { useState } from "react";
import "./WithdrawalMember.css";
import ErrorModal from "./ErrorModal";

const WithdrawalMember = () => {
  const [isPassword, setPassword] = useState("");
  const [isErrorPassword, setErrorPassword] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = () => {
    if (!isPassword) {
      // 패스워드 미입력 후 요청시 에러 모달 노출
      setErrorPassword(true);
      setErrorMessage("비밀번호를 확인해주세요.");
    } else {
      axios
        .post(`${process.env.URL}/auth/check`, { password: isPassword })
        .then(() => {
          // 인증이 완료된 경우 탈퇴 버튼 노출
          setAuth(true);
        })
        .catch((err) => {
          // 오류시
          // 테스트
          setAuth(true);
        });
    }
  };

  const handleDeleteUser = () => {
    axios
      .delete(`${process.env.URL}/users`, { password: isPassword })
      .then(() => {
        // 성고시 삭제후 메인으로 이동
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
          탈퇴하기
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
