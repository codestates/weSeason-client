import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import "./signUp.css";
import { infoFormData } from "./infoData";
import { connect } from "react-redux";
import axios from "axios";
import { API_URL } from "../../const";

interface InfoDataType {
  title: string;
  name: string;
  type: string;
  placeholder: string;
  id: number;
}

const SignUp = ({ userInfo }: any) => {
  const name = userInfo.userInfo.name;
  const nickName = userInfo.userInfo.nickName;
  const email = userInfo.userInfo.email;
  const password = userInfo.userInfo.password;
  const passwordCheck = userInfo.userInfo.passwordCheck;

  const infoForm: InfoDataType[] = infoFormData;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resError, setResError] = useState<boolean>(false);
  const [defaultBtnColor, setDefaultBtnColor] = useState<boolean>(true);

  useEffect(() => {
    if (
      name &&
      nickName &&
      email &&
      password &&
      password.length === passwordCheck.length
    ) {
      setDefaultBtnColor(false);
    } else {
      setDefaultBtnColor(true);
    }
  });

  const userInfoListItem = infoForm.map((item) => {
    return (
      <UserInfo
        title={item.title}
        name={item.name}
        type={item.type}
        placeholder={item.placeholder}
        key={item.id}
      />
    );
  });

  const checkEmptyOrFaultPassword = () => {
    if (!name || !nickName || !email || !password || !passwordCheck) {
      setErrorMessage("정보를 모두 입력해주세요");
    } else if (password.length < 6) {
      setErrorMessage("6자리 이상의 비밀번호를 입력해주세요");
    } else if (password !== passwordCheck) {
      setErrorMessage("비밀번호를 재확인 해주세요");
    } else {
      setErrorMessage("");
      setDefaultBtnColor(true);
    }
  };

  const joinUserOrCheckEqualUser = async () => {
    axios
      .post(`${API_URL}/users`, {
        name,
        nickname: nickName,
        password,
        email,
      })
      .then(() => {
        // 성공할 경우 모달 or 모바일 안내
        // 로그인 페이지로 이동
      })
      .catch(() => {
        // 존재하는 이메일 오류 모달 or 모바일 안내
      });
  };

  const checkPageWidthErrorConcepts = () => {
    const pageWidth = document.documentElement.clientWidth;

    if (pageWidth < 1024 && errorMessage) {
      setResError(true);
    } else if (pageWidth >= 1024 && errorMessage) {
      // 웹 에러 모달
    } else if (!errorMessage) {
      // ajax 호출
      joinUserOrCheckEqualUser();
      // redux 유저 인포 전부 초기화 필요
    }
  };

  const handleClickJoinBtn = async () => {
    await checkEmptyOrFaultPassword();
    await checkPageWidthErrorConcepts();
  };

  return (
    <div id="signUpPage">
      <h1 id="signUp__ment">회원가입</h1>
      <div id="signUp__userInfo">
        {userInfoListItem}
        {resError ? <div id="userInfo__errorView">{errorMessage}</div> : null}
      </div>
      <button
        id={
          defaultBtnColor ? "signUp__joinBtn-basic" : "signUp__joinBtn-extend"
        }
        onClick={handleClickJoinBtn}
      >
        가입하기
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { userInfo: state };
};

export default connect(mapStateToProps)(SignUp);
