import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { checkIsLogined } from './api/auth';
import Login from './Components/login/Login';
import Mypage from './Components/mypage/MyPage';
import SignUp from './Components/signup/SignUp';
import { setAccessToken } from './reducers/appReducer';
import { changeCurrentPageWidth } from '../src/reducers/pageWidthReducer';
// import { connect } from 'react-redux';
import Main from './Components/main/Main';
import { RootState } from './reducers';
import './app.css';
import Menu from './Components/menu/Menu';
import Withdrawl from './Components/mypage/withdrawl/Withdrawl';
import { userLat, userLon } from './reducers/locationReducer';

declare global {
  interface Window {
    kakao: any;
  }
}

// type AppProps = {
//   // pageWidth: number;
//   // modifyCilentWidth(pageWidth: number): void;
//   modifyLat(lat: number): void;
//   modifyLon(lon: number): void;
// };

export default function App() {
  const dispatch = useDispatch();
  const init = useSelector((state: RootState) => state.appReducer.init);
  const pageWidth: number = useSelector(
    (state: RootState) => state.pageWidth.width
  );

  useEffect(() => {
    (async () => {
      const accessToken: string = await checkIsLogined();
      dispatch(setAccessToken(accessToken));
    })();
    const resizeListener = async () => {
      let currentWidth = await getWidth();
      if (
        (pageWidth < 1024 && currentWidth >= 1024) ||
        (pageWidth >= 1024 && currentWidth < 1024)
      ) {
        dispatch(changeCurrentPageWidth(getWidth()));
      }
    };
    window.addEventListener('resize', resizeListener);

    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(userLat(position.coords.latitude));
      dispatch(userLon(position.coords.longitude));
    });

    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, [dispatch, pageWidth]);
  const getWidth = () => window.innerWidth;

  return (
    <>
      {!init ? (
        'loading'
      ) : (
        <BrowserRouter>
          <header className='app__header'>
            <div id='app__logo'>weSeason</div>
            <Menu />
          </header>
          <main className='app__main'>
            <Switch>
              <Route path='/mypage'>
                <Mypage />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/signup'>
                <SignUp />
              </Route>
              <Route path='/withdrawal'>
                <Withdrawl />
              </Route>
              <Route path='/'>
                <Main />
              </Route>
            </Switch>
          </main>
        </BrowserRouter>
      )}
    </>
  );
}
