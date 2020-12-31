import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import Circle from "./Component/Circle";
import Loading from "./Component/Loading";
import Main from "./Component/Main";
import Mypage from "./Components/Mypage";
import { useCallback, useState } from "react";
import axios from "axios";
import { API_URL } from "./const";
import Menu from "./Component/Menu";
import MessageModal from "./Component/MessageModal";
import WithdrawalMember from "./Components/WithdrawalMember";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const openModal = useCallback((setMessage, closeModal) => {
    axios
      .get(`${API_URL}/auth/signin`, { withCredentials: true })
      .then(
        ({
          data: {
            data: { accessToken },
          },
        }) => {
          setAccessToken(accessToken);
          closeModal();
        }
      )
      .catch(({ response: { data: { message } = {} } = {} } = {}) => {
        if (message === "invalid refresh token") {
          logout().then(() => {
            setMessage("오랜시간 작업이 없어 로그아웃 되었습니다.");
          });
        } else {
          closeModal();
        }
      });
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const logout = () => {
    return axios
      .post(`${API_URL}/auth/signout`, null, { withCredentials: true })
      .then(() => {
        setAccessToken("");
      });
  };
  return (
    <BrowserRouter>
      {isOpen ? (
        <MessageModal openModal={openModal} closeModal={closeModal} />
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
            <Route path="/test">
              <Circle />
              <Loading />
            </Route>
            <Route path="/Withdrawal">
              <WithdrawalMember accessToken={accessToken} logout={logout} />
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/">어디에 접속할려구요?</Route>
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
