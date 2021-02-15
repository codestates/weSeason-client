import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { checkIsLogined } from "./api/auth";
import Login from "./Components/login/Login";
import Mypage from "./Components/mypage/MyPage";
import SignUp from "./Components/signup/SignUp";
import { setAccessToken } from "./reducers/appReducer";
import { changeCurrentPageWidth } from "../src/reducers/pageWidthReducer";
import { connect } from "react-redux";
import Main from "./Components/main/Main";
import { RootState } from "./reducers";
import "./app.css";
import Menu from "./Components/menu/Menu";
import Withdrawl from "./Components/withdrawl/Withdrawl";

function App({ modifyCilentWidth }: any) {
  const dispatch = useDispatch();
  const init = useSelector((state: RootState) => state.appReducer.init);

  useEffect(() => {
    (async () => {
      const accessToken = await checkIsLogined();
      dispatch(setAccessToken(accessToken));
    })();

    const resizeListener = () => {
      modifyCilentWidth(getWidth());
    };
    window.addEventListener("resize", resizeListener);
  }, [dispatch, modifyCilentWidth]);

  const getWidth = () => window.innerWidth;
  return (
    <>
      {!init ? (
        "loading"
      ) : (
        <BrowserRouter>
          <header className="app__header">
            <div>LOGO</div>
            <Menu />
          </header>
          <main className="app__main">
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
              <Route path="/withdrawal">
                <Withdrawl />
              </Route>
              <Route path="/">
                <Main />
              </Route>
            </Switch>
          </main>
        </BrowserRouter>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyCilentWidth: (width: number) =>
      dispatch(changeCurrentPageWidth(width)),
  };
};

export default connect(null, mapDispatchToProps)(App);
