import React, { Component } from "react";
import OriginMypage from "./OriginMypage";
import EditMypage from "./EditMypage";
import "./Mypage.css";
// // /users get > response
// // props.userinfo =
// // {
// //     id: "jpjgv05",
// //     email: "jhrang0925@gmail.com",
// //     name: "harang",
// //     nickname: "Hal-ang",
// // }
class Mypage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMypage: false,
    };
  }

  handleChangeMypage() {
    this.setState({
      isMypage: true,
    });
  }

  render() {
    return (
      <div className="Mypage">
        {this.state.isMypage ? (
          <EditMypage userinfo={this.props.userinfo} />
        ) : (
          <OriginMypage
            userinfo={this.props.userinfo}
            handleChangeMypage={this.handleChangeMypage.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default Mypage;
// import React, { useState } from "react";
// import OriginMypage from "./OriginMypage";
// import EditMypage from "./EditMypage";

// const Mypage = ({ userinfo }) => {
//   [isMypage, setMypage] = useState(false);

//   handleChangeMypage = () => {
//     setMypage(true);
//   };

//   return (
//     <div className="Mypage">
//       {isMypage ? (
//         <EditMypage userinfo={userinfo} />
//       ) : (
//         <OriginMypage
//           userinfo={userinfo}
//           handleChangeMypage={handleChangeMypage}
//         />
//       )}
//     </div>
//   );
// };

// export default Mypage;
