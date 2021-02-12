import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { getAccessToken } from "./api";
import Login from "./Components/login/Login";
import Mypage from "./Components/mypage/MyPage";
import SignUp from "./Components/signup/SignUp";
import { setAccessToken } from "./reducers/appReducer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken();
      dispatch(setAccessToken(accessToken));
    })();
  }, []);
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
          <li>
            <Link to="/mypage">mypage</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/mypage">
          <Mypage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">{/* <Home /> */}</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
