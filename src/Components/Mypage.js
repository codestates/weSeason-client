import React, { useCallback, useEffect, useState } from "react";
import OriginMypage from "./OriginMypage";
import EditMypage from "./EditMypage";
import "./Mypage.css";
import axios from "axios";
import { API_URL } from "../const";
import MessageModal from "../Component/MessageModal";
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
  const [isOpen, setIsOpen] = useState(false);
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
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          if (message === "expired token") {
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
                    setIsOpen(true);
                  }
                }
              );
          }
        }
      );
  }, [accessToken, setAccessToken, logout]);
  const openModal = useCallback((setMessage) => {
    setMessage("오랜시간 작업이 없어 로그아웃 되었습니다.");
  }, []);
  const closeModal = useCallback(() => {
    logout();
  }, [logout]);
  const handleChangeMypage = () => {
    setIsMyPage(true);
  };

  return (
    <>
      {isOpen && <MessageModal openModal={openModal} closeModal={closeModal} />}
      <div className="Mypage">
        {isMypage ? (
          <EditMypage userinfo={userinfo} />
        ) : (
          <OriginMypage
            userinfo={userinfo}
            handleChangeMypage={handleChangeMypage}
            accessToken={accessToken}
          />
        )}
      </div>
    </>
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
