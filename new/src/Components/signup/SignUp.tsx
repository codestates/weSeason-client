import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserInfo from "./UserInfo";
import "./signUp.css";
import { infoFormData } from "./infoData";
import { connect } from "react-redux";
import axios from "axios";
import { API_URL } from "../../const";
import {
  changeName,
  changeNickName,
  changeEmail,
  changePassword,
  changePasswordCheck,
} from "../../reducers/userInfoReducer";
import { changeCurrentPageWidth } from "../../reducers/pageWidthReducer";
import OneBtnModal from "../modal/OneBtnModal";

interface InfoDataType {
  title: string;
  name: string;
  type: string;
  placeholder: string;
  id: number;
}

const SignUp = ({ userInfo, pageWidth, ...rest }: any) => {
  const name = userInfo.name;
  const nickName = userInfo.nickName;
  const email = userInfo.email;
  const password = userInfo.password;
  const passwordCheck = userInfo.passwordCheck;

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resError, setResError] = useState<boolean>(false);
  const [webError, setWebError] = useState<boolean>(false);
  const [webJoin, setWebJoin] = useState<boolean>(false);
  const [defaultBtnColor, setDefaultBtnColor] = useState<boolean>(true);
  const [resMessage, setResMessage] = useState<string>("");

  const history = useHistory();
  const infoForm: InfoDataType[] = infoFormData;
  let searchPageWidthLoop = () => {
    rest.modifyCilentWidth(document.documentElement.clientWidth);
  };

  let searchPageWidth = window.setInterval(searchPageWidthLoop, 400);

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
        // 스테이트 초기화
        formatUserInfo();

        if (pageWidth >= 1024) {
          setErrorMessage("회원가입 완료");
          setResMessage("확인을 누르면 로그인 페이지로 이동합니다");
          setWebJoin(true);
        } else {
          history.push("/signin");
        }
      })
      .catch(() => {
        // 존재하는 이메일 오류 모달 or 모바일 안내
        setErrorMessage("이미 존재하는 이메일입니다");
        if (pageWidth < 1024) {
          setResError(true);
        } else if (pageWidth >= 1024) {
          setWebError(true);
        }
      });
  };

  const formatUserInfo = () => {
    rest.modifyName("");
    rest.modifyNickName("");
    rest.modifyEmail("");
    rest.modifyPassword("");
    rest.modifyPasswordCheck("");
  };

  const checkPageWidthErrorConcepts = () => {
    if (pageWidth < 1024 && errorMessage) {
      setResError(true);
    } else if (pageWidth >= 1024 && errorMessage) {
      // 웹 에러 모달
      console.log(errorMessage, "에러메세지");
      setWebError(true);
    } else if (!errorMessage && !defaultBtnColor) {
      // ajax 호출
      joinUserOrCheckEqualUser();
    }
  };

  const handleClickJoinBtn = async () => {
    await checkEmptyOrFaultPassword();
    await checkPageWidthErrorConcepts();
  };

  const handleFindModalClose = () => {
    setWebError(false);
    if (errorMessage === "이미 존재하는 이메일입니다") {
      setErrorMessage("");
    }
    if (resError) {
      setResError(false);
    }

    if (resMessage) {
      setResMessage("");
      history.push("/login");
    }
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
      {webError ? (
        <OneBtnModal
          message={errorMessage}
          info=""
          handleFindModalClose={handleFindModalClose}
        />
      ) : null}
      {webJoin ? (
        <OneBtnModal
          message={errorMessage}
          info={resMessage}
          handleFindModalClose={handleFindModalClose}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { userInfo: state.userInfo, pageWidth: state.pageWidth.width };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyName: (name: string) => dispatch(changeName(name)),
    modifyNickName: (nickName: string) => dispatch(changeNickName(nickName)),
    modifyEmail: (email: string) => dispatch(changeEmail(email)),
    modifyPassword: (pw: string) => dispatch(changePassword(pw)),
    modifyPasswordCheck: (pw: string) => dispatch(changePasswordCheck(pw)),
    modifyCilentWidth: (width: number) =>
      dispatch(changeCurrentPageWidth(width)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
