import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { checkIsLogined } from "./api/auth";
import Login from "./Components/login/Login";
import Mypage from "./Components/mypage/MyPage";
import SignUp from "./Components/signup/SignUp";
import { setAccessToken } from "./reducers/appReducer";
import { changeCurrentPageWidth } from "../src/reducers/pageWidthReducer";
import { connect } from "react-redux";
import { goToMyPage } from "./reducers/mypageReducer";
import Main from "./Components/main/Main";
import { RootState } from "./reducers";

function App({ pageWidth, modifyCilentWidth }: any) {
  const dispatch = useDispatch();
  const { accessToken, init } = useSelector(
    (state: RootState) => state.appReducer
  );
  useEffect(() => {
    (async () => {
      const accessToken = await checkIsLogined();
      dispatch(setAccessToken(accessToken));
    })();
    const resizeListener = async () => {
      let currentWidth = await getWidth();
      if (
        (pageWidth < 1024 && currentWidth >= 1024) ||
        (pageWidth >= 1024 && currentWidth < 1024)
      ) {
        console.log(pageWidth, currentWidth, "테스트");
        modifyCilentWidth(getWidth());
      }
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  });

  const getWidth = () => window.innerWidth;
  // console.log(init, accessToken);
  return (
    <>
      {!init ? (
        "loading"
      ) : (
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/">메인</Link>
              </li>
              {accessToken ? (
                <>
                  <li>
                    <Link
                      to="/mypage"
                      onClick={() => {
                        dispatch(goToMyPage());
                      }}
                    >
                      마이페이지
                    </Link>
                  </li>
                  <li>로그아웃</li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">로그인</Link>
                  </li>
                  <li>
                    <Link to="/signup">회원가입</Link>
                  </li>
                </>
              )}
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
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </>
  );
}
const mapStateToProps = (state: any) => {
  return { pageWidth: state.pageWidth.width };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyCilentWidth: (width: number) =>
      dispatch(changeCurrentPageWidth(width)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
