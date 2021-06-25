import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserInfo from './UserInfo';
import './signUp.css';
import { infoFormData } from './infoData';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeName,
  changeNickName,
  changeEmail,
  changePassword,
  changePasswordCheck,
} from '../../reducers/userInfoReducer';
import OneBtnModal from '../modal/OneBtnModal';
import { createUserInfo } from '../../api/user';
import { RootState } from '../../reducers';

type InfoDataType = {
  title: string;
  name: string;
  type: string;
  placeholder: string;
  id: number;
};

type UserInfoStateType = {
  name: string;
  nickName: string;
  email: string;
  password: string;
  passwordCheck: string;
};

export default function SignUp() {
  const pageWidth: number = useSelector(
    (state: RootState) => state.pageWidth.width
  );
  const userInfo: UserInfoStateType = useSelector(
    (state: RootState) => state.userInfo
  );
  const dispatch = useDispatch();

  const name = userInfo.name;
  const nickName = userInfo.nickName;
  const email = userInfo.email;
  const password = userInfo.password;
  const passwordCheck = userInfo.passwordCheck;

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [resError, setResError] = useState<boolean>(false);
  const [webError, setWebError] = useState<boolean>(false);
  const [webJoin, setWebJoin] = useState<boolean>(false);
  const [defaultBtnColor, setDefaultBtnColor] = useState<boolean>(true);
  const [resMessage, setResMessage] = useState<string>('');

  const history = useHistory();
  const infoForm: InfoDataType[] = infoFormData;

  useEffect(() => {
    if (
      name &&
      nickName &&
      email &&
      password &&
      password.length === passwordCheck.length &&
      password.length >= 6
    ) {
      setDefaultBtnColor(false);
    } else {
      setDefaultBtnColor(true);
    }

    if (pageWidth < 1024 && webError) {
      setWebError(false);
    }
  }, [
    name,
    nickName,
    email,
    password,
    passwordCheck.length,
    pageWidth,
    webError,
  ]);

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
      setErrorMessage('정보를 모두 입력해주세요');
    } else if (password.length < 6) {
      setErrorMessage('6자리 이상의 비밀번호를 입력해주세요');
    } else if (password !== passwordCheck) {
      setErrorMessage('비밀번호를 재확인 해주세요');
    } else {
      setErrorMessage('');
      setDefaultBtnColor(true);
    }
  };

  const joinUserOrCheckEqualUser = async () => {
    try {
      await createUserInfo(name, nickName, password, email);
      // 성공할 경우 모달 or 모바일 안내
      // 스테이트 초기화
      formatUserInfo();
      if (pageWidth >= 1024) {
        setErrorMessage('회원가입 완료');
        setResMessage('확인을 누르면 로그인 페이지로 이동합니다');
        setWebJoin(true);
      } else {
        history.push('/login');
      }
    } catch {
      setErrorMessage('이미 존재하는 이메일입니다');
      if (pageWidth < 1024) {
        setResError(true);
      } else if (pageWidth >= 1024) {
        setWebError(true);
      }
    }
  };

  const formatUserInfo = () => {
    dispatch(changeName(''));
    dispatch(changeNickName(''));
    dispatch(changeEmail(''));
    dispatch(changePassword(''));
    dispatch(changePasswordCheck(''));
  };

  const checkPageWidthErrorConcepts = () => {
    if (pageWidth < 1024 && errorMessage) {
      setResError(true);
    } else if (pageWidth >= 1024 && errorMessage) {
      // 웹 에러 모달
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
    if (errorMessage === '이미 존재하는 이메일입니다') {
      setErrorMessage('');
    }
    if (resError) {
      setResError(false);
    }

    if (resMessage) {
      setResMessage('');
      history.push('/login');
    }
  };

  return (
    <div id='signUpPage'>
      <h1 id='signUp__ment'>회원가입</h1>
      <div id='signUp__userInfo'>
        {userInfoListItem}
        {resError ? <div id='userInfo__errorView'>{errorMessage}</div> : null}
      </div>
      <button
        id={
          defaultBtnColor ? 'signUp__joinBtn-basic' : 'signUp__joinBtn-extend'
        }
        onClick={handleClickJoinBtn}
      >
        가입하기
      </button>
      {webError ? (
        <OneBtnModal
          message={errorMessage}
          info=''
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
}
