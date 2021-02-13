import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { clickClose } from "../../reducers/mypageReducer";

export default function ErrorContent() {
  const error = useSelector((state: RootState) => state.mypageReducer.error);
  const dispatch = useDispatch();
  return (
    <>
      <p className="modal__info">{error}</p>
      <div className="modal__button-container">
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
