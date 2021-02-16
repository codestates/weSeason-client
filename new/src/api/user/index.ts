import axios from "axios";
import { API_URL } from "../../const";

type GetUserInfoRes = {
  data: {
    userInfo: {
      email: string;
      name: string;
      nickname: string;
    };
  };
};
export const getUserInfo = async (accessToken: string) => {
  const { data } = await axios.get<GetUserInfoRes>(`${API_URL}/users`, {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  return data.data.userInfo;
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
export const deleteUserInfo = async (accessToken: string) => {
  await axios.delete(`${API_URL}/users`, {
    headers: { authorization: `Bearer ${accessToken}` },
  });
};
