import logo from "./logo.svg";
import "./App.css";
import Mypage from "./Components/Mypage";

function App() {
  return (
    <div className="App">
      <Mypage
        userinfo={{
          id: "jpjgv05",
          email: "jhrang0925@gmail.com",
          name: "harang",
          nickname: "Hal-ang",
        }}
      />
    </div>
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
