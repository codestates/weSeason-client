import React, { Component } from "react";
import BasicUserinfo from "./BasicUserinfo";
import "./Mypage.css";
// /users get > response
// props.userinfo =
// {
//     id: "jpjgv05",
//     email: "jhrang0925@gmail.com",
//     name: "harang",
//     nickname: "Hal-ang",
// }
class Mypage extends Component {
  render() {
    return (
      <div className="Mypage">
        <BasicUserinfo userinfo={this.props.userinfo} />
      </div>
    );
  }
}

export default Mypage;
