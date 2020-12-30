import React, { useEffect, useState } from "react";
import OriginMypage from "./OriginMypage";
import EditMypage from "./EditMypage";
import "./Mypage.css";
import axios from "axios";
import { API_URL } from "../const";
// // /users get > response
// // props.userinfo =
// // {
// //     id: "jpjgv05",
// //     email: "jhrang0925@gmail.com",
// //     name: "harang",
// //     nickname: "Hal-ang",
// // }
function Mypage({ accessToken, setAccessToken, logout }) {
  const [isMypage, setIsMyPage] = useState(false);
  const [userinfo, setUserinfo] = useState({});
  useEffect(() => {
    axios
      .get(`${API_URL}/users`, {
        headers: { authorization: `Bearer ${accessToken}` },
      })
      .then(
        ({
          data: {
            data: { userInfo },
          },
        }) => {
          setUserinfo(userInfo);
        }
      )
      .catch(({ response: { data } }) => {
        if (data === "expired token") {
          axios
            .get(`${API_URL}/auth/signin`, { withCredentials: true })
            .then(
              ({
                data: {
                  data: { accessToken },
                },
              }) => {
                setAccessToken(accessToken);
              }
            )
            .catch(
              ({
                response: {
                  data: { message },
                },
              }) => {
                if (message === "invalid refresh token") {
                  logout();
                }
              }
            );
        }
      });
  }, [accessToken, setAccessToken, logout]);
  const handleChangeMypage = () => {
    setIsMyPage(true);
  };

  return (
    <div className="Mypage">
      {isMypage ? (
        <EditMypage userinfo={userinfo} />
      ) : (
        <OriginMypage
          userinfo={userinfo}
          handleChangeMypage={handleChangeMypage}
        />
      )}
    </div>
  );
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
