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
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  handleEditResoponse() {
    this.setState({
      isEdit: true,
    });
  }

  render() {
    return (
      <div className="Mypage">
        <BasicUserinfo
          userinfo={this.props.userinfo}
          handleEditResoponse={this.handleEditResoponse.bind(this)}
        />
      </div>
    );
  }
}

export default Mypage;
