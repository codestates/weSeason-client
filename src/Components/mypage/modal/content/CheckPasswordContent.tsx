import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkPassword } from "../../../../api/auth";
import { RootState } from "../../../../reducers";
import { clickClose, setError } from "../../../../reducers/mypageReducer";

type CheckPasswordContentProps = {
  onSuccess: ActionCreatorWithoutPayload<string>;
  goToHome?: boolean;
};
export default function CheckPasswordContent({
  onSuccess,
  goToHome,
}: CheckPasswordContentProps) {
  const accessToken = useSelector(
    (state: RootState) => state.appReducer.accessToken
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const passwordInput = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    passwordInput.current.focus();
  }, []);
  return (
    <>
      <p className="modal__info">본인확인을 위해 비밀번호를 입력해 주세요.</p>
      <input
        className="modal__input"
        ref={passwordInput}
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
            const message = await checkPassword(password, accessToken);
            if (message === "OK") {
              dispatch(onSuccess());
            } else {
              dispatch(setError("비밀번호를 재확인해주세요."));
            }
          }}
        >
          확인
        </button>
        <button
          className="modal__button"
          onClick={() => {
            dispatch(clickClose());
            if (goToHome) {
              history.push("/");
            }
          }}
        >
          닫기
        </button>
      </div>
    </>
  );
}
