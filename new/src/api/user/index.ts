import axios from "axios";
import { API_URL } from "../../const";

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
