import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../reducers";
import { goToMyPage } from "../../reducers/mypageReducer";
import { closeMenu } from "../../reducers/menuReducer";

export default function Nav() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.appReducer.accessToken
  );
  const menuOpen = useSelector(
    (state: RootState) => state.menuReducer.menuOpen
  );
  useEffect(() => {
    if (menuOpen) {
      const clickWindow = () => {
        dispatch(closeMenu());
        window.removeEventListener("click", clickWindow);
      };
      window.addEventListener("click", clickWindow);
    }

    return () => {};
  }, [dispatch, menuOpen]);
  return (
    <nav className={`menu__nav ${menuOpen ? "menu__nav--open" : ""}`}>
      <ul className={`menu__items ${menuOpen ? "menu__items--open" : ""}`}>
        <li>
          <Link to="/">메인</Link>
        </li>
        {accessToken ? (
          <>
            <li>
              <Link
                to="/mypage"
                onClick={() => {
                  dispatch(goToMyPage());
                }}
              >
                마이페이지
              </Link>
            </li>
            <li>로그아웃</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
