import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import Circle from "./Component/Circle";
import Loading from "./Component/Loading";
import Main from "./Component/Main";
import Mypage from "./Components/Mypage";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "./const";
import { useMessageModal } from "./Component/MessageModal";
import TestMenu from "./Component/TestMenu";

import WithdrawalMember from "./Components/WithdrawalMember";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isOpen, setIsOpen, MessageModal] = useMessageModal(
    (setMessage, closeModal) => {
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
        .catch(
          ({
            response: {
              data: { message },
            },
          }) => {
            if (message === "invalid refresh token") {
              logout().then(() => {
                setMessage("오랜시간 작업이 없어 로그아웃 되었습니다.");
              });
            } else {
              closeModal();
            }
          }
        );
    },
    () => {
      setIsOpen(false);
    },
    true
  );
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
        MessageModal
      ) : (
        <>
          <TestMenu accessToken={accessToken} logout={logout} />
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
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/">어디에 접속할려구요?</Route>
          </Switch>
        </>
      )}
    </BrowserRouter>
    // <Mypage
    //   userinfo={{
    //     id: "jpjgv05",
    //     email: "jhrang0925@gmail.com",
    //     name: "harang",
    //     nickname: "Hal-ang",
    //   }}
    // />
  );
}

export default App;

// /users get > response
// props.userinfo =
// {
//   message: "OK",
//   data: {
//     id: "jpjgv05",
//     email: "jhrang0925@gmail.com",
//     name: "harang",
//     nickname: "Hal-ang",
//   },
// }
