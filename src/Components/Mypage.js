import React, { useEffect, useState } from "react";
import OriginMypage from "./OriginMypage";
import EditMypage from "./EditMypage";
import "./Mypage.css";
import axios from "axios";
import { API_URL } from "../const";
function Mypage({ accessToken, setAccessToken }) {
  const [isMypage, setIsMyPage] = useState(false);
  const [userinfo, setUserinfo] = useState({});
  //유저정보 불러오기
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API_URL}/users`, {
        headers: { authorization: `Bearer ${accessToken}` },
        cancelToken: source.token,
      })
      //성공시 유저정보 저장
      .then(
        ({
          data: {
            data: { userInfo },
          },
        }) => {
          setUserinfo(userInfo);
        }
      )
      //실패시
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          //토큰이 만료되면 다시요청
          if (message === "expired token") {
            axios
              .get(`${API_URL}/auth/signin`, {
                cancelToken: source.token,
                withCredentials: true,
              })
              .then(
                ({
                  data: {
                    data: { accessToken },
                  },
                }) => {
                  setAccessToken(accessToken);
                }
              );
          }
        }
      );
    return () => {
      source.cancel("Component got unmounted");
    };
  }, [accessToken, setAccessToken, isMypage]);

  const handleChangeMypage = () => {
    setIsMyPage(!isMypage);
  };
  return (
    <>
      <div className="Mypage">
        {isMypage ? (
          <EditMypage
            userinfo={userinfo}
            accessToken={accessToken}
            handleChangeMypage={handleChangeMypage}
          />
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
