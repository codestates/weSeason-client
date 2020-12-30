import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import Circle from "./Component/Circle";
import Loading from "./Component/Loading";
import Main from "./Component/Main";
import Mypage from "./Components/Mypage";
import WithdrawalMember from "./Components/WithdrawalMember";

function App() {
  console.log(process.env);
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/SignIn">SignIn</Link>
          </li>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
          <li>
            <Link to="/test">test</Link>
          </li>
          <li>
            <Link to="/Mypage">Mypage</Link>
          </li>
          <li>
            <Link to="/Withdrawal">WithdrawalMember</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="/Mypage">
          <Mypage
            userinfo={{
              id: "jpjgv05",
              email: "jhrang0925@gmail.com",
              name: "harang",
              nickname: "Hal-ang",
            }}
          />
        </Route>
        <Route path="/SignUp">
          <SignUp />
        </Route>
        <Route path="/test">
          <Circle />
          <Loading />
        </Route>
        <Route path="/Withdrawal">
          <WithdrawalMember />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
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
