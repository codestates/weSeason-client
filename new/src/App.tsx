import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Login from "./Components/login/Login";
import SignUp from "./Components/signup/SignUp";
import { changeCurrentPageWidth } from "../src/reducers/pageWidthReducer";
import { connect } from "react-redux";

function App({ modifyCilentWidth }: any) {
  let searchPageWidthLoop = () => {
    modifyCilentWidth(document.documentElement.clientWidth);
  };

  let searchPageWidth = window.setInterval(searchPageWidthLoop, 400);

  return (
    <BrowserRouter>
      <div id="router">
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
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">{/* <Home /> */}</Route>
        </Switch>
      </div>
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
