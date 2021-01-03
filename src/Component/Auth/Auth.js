import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../const";

export default function Auth({ setAccessToken, setAuth }) {
  const history = useHistory();
  useEffect(() => {
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const code = url.searchParams.get("code");
    axios
      .post(`${API_URL}${pathname}`, { code }, { withCredentials: true })
      .then(({ data: { accessToken, auth } }) => {
        setAccessToken(accessToken);
        setAuth(auth);
      })
      .catch(() => history.push("/"));
  }, [setAccessToken, setAuth, history]);
  return null;
}
