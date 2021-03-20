import axios from 'axios';
import { API_URL } from '../../const';

type CheckIsLoginedRes = {
  data: {
    accessToken: string;
  };
};
export const checkIsLogined = async () => {
  try {
    const { data } = await axios.get<CheckIsLoginedRes>(
      `${API_URL}/auth/check`,
      {
        withCredentials: true,
      }
    );
    return data.data.accessToken;
  } catch (error) {
    return '';
  }
};

type CheckPasswordRes = {
  message: string;
};
export const checkPassword = async (password: string, accessToken: string) => {
  try {
    const { data } = await axios.post<CheckPasswordRes>(
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

type loginLocalRes = {
  data: {
    accessToken: string;
  };
};
export const loginLocal = async (email: string, password: string) => {
  const { data } = await axios.post<loginLocalRes>(
    `${API_URL}/auth/local`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return data.data.accessToken;
};
export const logout = async () => {
  await axios.post(`${API_URL}/auth/signout`, null, { withCredentials: true });
};
