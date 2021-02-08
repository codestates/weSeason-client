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
import Auth from "./Component/Auth/Auth";
import Error from "./Component/Error/Error";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [auth, setAuth] = useState("");
  const [isError, setIsError] = useState(false);
  // 앱 실행시  로그인했는지 확인
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API_URL}/auth/check`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      //로그인 유지시 엑세스 토큰 세팅 및 로딩 끝.
      .then(
        ({
          data: {
            data: { accessToken, auth },
          },
        }) => {
          setAccessToken(accessToken);
          setAuth(auth);
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
    return () => {
      source.cancel("Component got unmounted");
    };
  }, []);

  //로그아웃 하고 엑세스 토큰 비우기
  const logout = useCallback(async () => {
    return axios
      .post(`${API_URL}/auth/signout`, null, { withCredentials: true })
      .then(() => {
        setAccessToken("");
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
                <SignIn setAccessToken={setAccessToken} setAuth={setAuth} />
              )}
            </Route>
            <Route path="/signup">
              {accessToken ? <Redirect to="/" /> : <SignUp />}
            </Route>
            <Route path="/auth">
              {accessToken ? (
                <Redirect to="/" />
              ) : (
                <Auth setAccessToken={setAccessToken} setAuth={setAuth} />
              )}
            </Route>
            <Route path="/mypage">
              {!accessToken ? (
                <Redirect to="/signin" />
              ) : (
                <Mypage
                  setAccessToken={setAccessToken}
                  accessToken={accessToken}
                  logout={logout}
                  auth={auth}
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
            <Route path="/">
              <Error />
            </Route>
          </Switch>
        </>
      )}
      {isError && (
        <Modal closeModal={closeError}>
          오랜시간 작업이 없어서 로그 아웃 되었습니다.
        </Modal>
      )}
    </>
  );
}

export default App;
