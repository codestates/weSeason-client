import { useDispatch, useSelector } from "react-redux";
import { openMenu } from "../../reducers/menuReducer";
import Nav from "./Nav";
import "./menu.css";
import { RootState } from "../../reducers";

export default function Menu() {
  const dispatch = useDispatch();
  const menuOpen = useSelector(
    (state: RootState) => state.menuReducer.menuOpen
  );
  return (
    <div className="menu">
      <Nav />
      <button
        className="manu__btn"
        onClick={() => {
          if (!menuOpen) {
            dispatch(openMenu());
          }
        }}
      >
        MENU
      </button>
    </div>
  );
}
