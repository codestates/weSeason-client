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
import Withdrawl from "./Components/mypage/withdrawl/Withdrawl";
import { userLat, userLon } from "./reducers/locationReducer";

declare global {
  interface Window {
    kakao: any;
  }
}

function App({
  pageWidth,
  lat,
  lon,
  modifyCilentWidth,
  modifyLat,
  modifyLon,
}: any) {
  const dispatch = useDispatch();
  const init = useSelector((state: RootState) => state.appReducer.init);

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
        modifyCilentWidth(getWidth());
      }
    };
    window.addEventListener("resize", resizeListener);

    navigator.geolocation.getCurrentPosition((position) => {
      modifyLat(position.coords.latitude);
      modifyLon(position.coords.longitude);
    });

    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, [dispatch, lat, lon, modifyCilentWidth, modifyLat, modifyLon, pageWidth]);
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
const mapStateToProps = (state: any) => {
  return {
    pageWidth: state.pageWidth.width,
    lat: state.locationReducer.lat,
    lon: state.locationReducer.lon,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyCilentWidth: (width: number) =>
      dispatch(changeCurrentPageWidth(width)),
    modifyLat: (lat: number) => dispatch(userLat(lat)),
    modifyLon: (lon: number) => dispatch(userLon(lon)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
