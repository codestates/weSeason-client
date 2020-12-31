import { Link } from "react-router-dom";
export default function TextMenu({ accessToken, logout }) {
  return (
    <nav>
      <ul>
        <li>
          <Link className="link" to="/">
            Main
          </Link>
        </li>
        {!accessToken ? (
          <>
            <li>
              <Link className="link" to="/signin">
                SignIn
              </Link>
            </li>
            <li>
              <Link className="link" to="/signup">
                SignUp
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="link" to="/mypage">
                Mypage
              </Link>
            </li>
            <li>
              <button className="link" onClick={logout}>
                SignOut
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
