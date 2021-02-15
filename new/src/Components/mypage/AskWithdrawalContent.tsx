import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { clickClose } from "../../reducers/mypageReducer";

export default function AskWithdrawalContent() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <p className="modal__info">정말 회원탈퇴를 하실건가요?</p>
      <div className="modal__button-container">
        <button
          className="modal__button"
          onClick={() => {
            history.push("/withdrawal");
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
