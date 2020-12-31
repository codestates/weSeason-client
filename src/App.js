import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./const";
import SignUp from "./Component/SignUp/SignUp";
import SignIn from "./Component/SignIn/SignIn";
import Main from "./Component/Main/Main";
import Mypage from "./Components/Mypage";
import WithdrawalMember from "./Components/WithdrawalMember";
import Loading from "./Component/Loading/Loading";
import Modal from "./Component/Modal/Modal";
import Menu from "./Component/Menu/Menu";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  //로그아웃 하고 엑세스 토큰 비우기
  const logout = useCallback(() => {
    return axios
      .post(`${API_URL}/auth/signout`, null, { withCredentials: true })
      .then(() => {
        setAccessToken("");
      });
  }, []);
  // 앱 실행시  로그인했는지 확인
  useEffect(() => {
    axios
      .get(`${API_URL}/auth/signin`, { withCredentials: true })
      //로그인 유지시 엑세스 토큰 세팅 및 로딩 끝.
      .then(
        ({
          data: {
            data: { accessToken },
          },
        }) => {
          setAccessToken(accessToken);
          setIsLoading(false);
        }
      )
      .catch(({ response: { data: { message } = {} } = {} } = {}) => {
        //로딩 끝내기
        setIsLoading(false);
        if (message === "invalid refresh token") {
          // 리플레쉬 토큰 만료 되면 강제 로그아웃 모달 표시
          // 메뉴나 유저정보는 분기처리로 인해 저절로 로그아웃 된거 처럼 보임
          setIsError(true);
        }
      });
  }, []);
  //에러 모달 닫기 버튼
  const closeError = useCallback(() => {
    // 모달 닫기 , 로그아웃
    setIsError(false);
    logout();
  }, [logout]);
  //앱 시작시 로딩 표시
  return (
    <>
      {isError && (
        <Modal closeModal={closeError}>
          <p>오랜시간 작업이 없어서 로그 아웃 되었습니다.</p>
        </Modal>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Menu accessToken={accessToken} logout={logout} />
          <Switch>
            <Route path="/signin">
              {accessToken ? (
                <Redirect to="/" />
              ) : (
                <SignIn setAccessToken={setAccessToken} />
              )}
            </Route>
            <Route path="/signup">
              {accessToken ? <Redirect to="/" /> : <SignUp />}
            </Route>
            <Route path="/mypage">
              {!accessToken ? (
                <Redirect to="/signin" />
              ) : (
                <Mypage
                  setAccessToken={setAccessToken}
                  accessToken={accessToken}
                  logout={logout}
                />
              )}
            </Route>
            <Route path="/Withdrawal">
              {!accessToken ? (
                <Redirect to="/" />
              ) : (
                <WithdrawalMember accessToken={accessToken} logout={logout} />
              )}
            </Route>
            <Route exact path="/">
              <Main accessToken={accessToken} />
            </Route>
            <Route path="/">어디에 접속할려구요?</Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
