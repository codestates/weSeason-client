import axios from "axios";
import { API_URL } from "../const";

type getAccessTokenRes = {
  data: {
    accessToken: string;
  };
};
export const checkIsLogined = async () => {
  const { data } = await axios.get<getAccessTokenRes>(`${API_URL}/auth/check`, {
    withCredentials: true,
  });
  return data.data.accessToken;
};
type checkPasswordRes = {
  message: string;
};
export const checkPassword = async (password: string, accessToken: string) => {
  try {
    const { data } = await axios.post<checkPasswordRes>(
      `${API_URL}/auth/checkpassword`,
      { password },
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    return data.message;
  } catch (error) {
    return error.message;
  }
};
type getUserInfoRes = {
  data: {
    userInfo: {
      email: string;
      name: string;
      nickname: string;
    };
  };
};
export const getUserInfo = async (accessToken: string) => {
  const { data } = await axios.get<getUserInfoRes>(`${API_URL}/users`, {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  return data.data.userInfo;
};
export const getAccessToken = async () => {
  await axios.get(`${API_URL}/auth/signin`, {
    withCredentials: true,
  });
};
export const updateUserInfo = async (
  nickname: string,
  password: string,
  accessToken: string
) => {
  await axios.patch(
    `${API_URL}/users`,
    {
      nickname,
      password,
    },
    {
      headers: { authorization: `Bearer ${accessToken}` },
    }
  );
};
