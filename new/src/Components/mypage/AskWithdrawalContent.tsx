import { useDispatch } from "react-redux";
import { clickClose } from "../../reducers/mypageReducer";

export default function AskWithdrawalContent() {
  const dispatch = useDispatch();
  return (
    <>
      <p className="modal__info">정말 회원탈퇴를 하실건가요?</p>
      <div className="modal__button-container">
        <button className="modal__button" onClick={async () => {}}>
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
