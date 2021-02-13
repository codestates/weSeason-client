import axios from "axios";
import { API_URL } from "../../const";

type checkIsLoginedRes = {
  data: {
    accessToken: string;
  };
};
export const checkIsLogined = async () => {
  const { data } = await axios.get<checkIsLoginedRes>(`${API_URL}/auth/check`, {
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
