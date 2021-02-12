import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkPassword } from "../../api";
import { RootState } from "../../reducers";
import { clickClose, setError } from "../../reducers/mypageReducer";

export default function CheckPasswordContent() {
  const accessToken = useSelector(
    (state: RootState) => state.appReducer.accessToken
  );
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");

  return (
    <>
      <p className="modal__info">본인확인을 위해 비밀번호를 입력해 주세요.</p>
      <input
        className="modal__input"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div className="modal__button-container">
        <button
          className="modal__button"
          onClick={async () => {
            try {
              await checkPassword(password, accessToken);
            } catch (error) {
              if (error.response.status === 400) {
                dispatch(setError("비밀번호를 재확인해주세요."));
              }
            }
          }}
        >
          O
        </button>
        <button
          className="modal__button"
          onClick={() => {
            dispatch(clickClose());
          }}
        >
          X
        </button>
      </div>
    </>
  );
}
