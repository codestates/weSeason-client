import axios from "axios";
import { API_URL } from "../const";
type getAccessTokenRes = {
  data: {
    accessToken: string;
  };
};
export const getAccessToken = async () => {
  const { data } = await axios.get<getAccessTokenRes>(`${API_URL}/auth/check`, {
    withCredentials: true,
  });
  return data.data.accessToken;
};
export const checkPassword = async (password: string, accessToken: string) => {
  await axios.post(
    `${API_URL}/auth/checkpassword`,
    { password },
    {
      headers: { authorization: `Bearer ${accessToken}` },
    }
  );
};
