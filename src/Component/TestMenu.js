import { Link } from "react-router-dom";
export default function TextMenu({ accessToken, logout }) {
  return (
    <nav>
      <ul>
        {/* 하랑님 작업 하실때는 느낌표 빼주세여 */}
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
        <li>
          <Link className="link" to="/test">
            test
          </Link>
        </li>
      </ul>
    </nav>
  );
}
