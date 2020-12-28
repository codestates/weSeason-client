import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import Circle from "./Component/Circle";
import Loading from "./Component/Loading";
import Main from "./Component/Main";

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
        </ul>
      </nav>
      <Switch>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="/SignUp">
          <SignUp />
        </Route>
        <Route path="/test">
          <Circle />
          <Loading />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>

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
