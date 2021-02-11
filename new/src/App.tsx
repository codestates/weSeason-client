import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Login from "./Components/login/Login";
import SignUp from "./Components/signup/SignUp";

function App() {
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

export default App;
