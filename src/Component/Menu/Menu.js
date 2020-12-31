import { Link } from "react-router-dom";
import { useState } from "react";
import "./Menu.css";

export default function Menu({ accessToken, logout }) {
  const [isMenu, setMenu] = useState(false);

  const handleClickMenu = () => {
    setMenu(!isMenu);
  };

  return (
    <nav>
      <ul className={isMenu ? "Menu__ul--before" : ""}>
        <li>
          <Link className="link" to="/">
            main
          </Link>
        </li>
        {!accessToken ? (
          <>
            <li>
              <Link className="link" to="/signin">
                login
              </Link>
            </li>
            <li>
              <Link className="link" to="/signup">
                signup
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="link" to="/mypage">
                mypage
              </Link>
            </li>
            <li>
              <button className="link" onClick={logout}>
                logout
              </button>
            </li>
          </>
        )}
      </ul>
      <div className="Menu__btn" onClick={handleClickMenu}>
        MENU
      </div>
    </nav>
  );
}
