import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUserInfo } from "../../api/user";
import { RootState } from "../../reducers";
import {
  hideWithdrawalBtn,
  setError,
  showWithdrawalBtn,
} from "../../reducers/mypageReducer";
import CheckPasswordContent from "../mypage/CheckPasswordContent";
import ErrorContent from "../mypage/ErrorContent";
import Modal from "../mypage/Modal";
import "./withdrawal.css";
export default function Withdrawl() {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector(
    (state: RootState) => state.appReducer.accessToken
  );
  const { error, showBtn } = useSelector(
    (state: RootState) => state.mypageReducer
  );
  useEffect(() => {
    if (!accessToken) {
      dispatch(setError("로그인을 해주세요."));
    }
    return () => {
      dispatch(hideWithdrawalBtn());
    };
  }, [accessToken, dispatch]);
  return (
    <div className="withdrawal">
      <h1 className="withdrawal__title">회원탈퇴</h1>
      <Modal>
        {error ? (
          <ErrorContent goToHome />
        ) : (
          <CheckPasswordContent onSuccess={showWithdrawalBtn} goToHome />
        )}
      </Modal>
      <button
        onClick={async () => {
          await deleteUserInfo(accessToken);
          history.push("/");
        }}
        className={`withdrawal__btn ${showBtn ? "withdrawal__btn--show" : ""}`}
      ></button>
    </div>
  );
}
