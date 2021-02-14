import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { checkIsLogined } from "./api/auth";
import Login from "./Components/login/Login";
import Mypage from "./Components/mypage/MyPage";
import SignUp from "./Components/signup/SignUp";
import { setAccessToken } from "./reducers/appReducer";
import { changeCurrentPageWidth } from "../src/reducers/pageWidthReducer";
import { connect } from "react-redux";
import { goToMyPage } from "./reducers/mypageReducer";

function App({ modifyCilentWidth }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const accessToken = await checkIsLogined();
      dispatch(setAccessToken(accessToken));
    })();

    const resizeListener = () => {
      modifyCilentWidth(getWidth());
    };
    window.addEventListener("resize", resizeListener);
  });

  const getWidth = () => window.innerWidth;

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
            <Link
              to="/mypage"
              onClick={() => {
                dispatch(goToMyPage());
              }}
            >
              mypage
            </Link>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyCilentWidth: (width: number) =>
      dispatch(changeCurrentPageWidth(width)),
  };
};

export default connect(null, mapDispatchToProps)(App);
