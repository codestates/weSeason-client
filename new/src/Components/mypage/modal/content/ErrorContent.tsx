import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../../../reducers";
import { clickClose } from "../../../../reducers/mypageReducer";

type ErrorContentProps = {
  goToHome?: boolean;
};
export default function ErrorContent({ goToHome }: ErrorContentProps) {
  const error = useSelector((state: RootState) => state.mypageReducer.error);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <p className="modal__info">{error}</p>
      <div className="modal__button-container">
        <button
          className="modal__button"
          onClick={() => {
            dispatch(clickClose());
            if (goToHome) {
              history.push("/");
            }
          }}
        >
          X
        </button>
      </div>
    </>
  );
}
