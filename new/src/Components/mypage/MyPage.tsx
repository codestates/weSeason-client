import { clickEdit, clickWithdrawal } from "../../reducers/mypageReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import Modal from "./Modal";
import ErrorContent from "./ErrorContent";
import CheckPasswordContent from "./CheckPasswordContent";
import AskWithdrawalContent from "./AskWithdrawalContent";

export default function Mypage() {
  const dispatch = useDispatch();
  const isEditClick = useSelector(
    (state: RootState) => state.mypageReducer.isEditClick
  );
  const isWithdrawalClick = useSelector(
    (state: RootState) => state.mypageReducer.isWithdrawalClick
  );
  const error = useSelector((state: RootState) => state.mypageReducer.error);
  return (
    <div className="mypage">
      <h1 className="mypage__title">마이페이지</h1>
      <section className="mypage__box">
        <button
          className="mypage__editbtn"
          onClick={() => {
            dispatch(clickEdit());
          }}
        >
          edit
        </button>
        <form className="mypage__form">
          <div className="mypage__row">
            <label htmlFor="name">이름</label>
            <input type="text" name="name" id="name" value="soSim" readOnly />
          </div>
          <div className="mypage__row">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              value="weSeason"
              readOnly
            />
          </div>
          <div className="mypage__row">
            <label htmlFor="id">아이디</label>
            <input type="text" name="id" id="id" value="weSeason" readOnly />
          </div>
          <div className="mypage__row">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              name="email"
              id="email"
              value="weSeson@weseason.com"
              readOnly
            />
          </div>
          <div className="mypage__row">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="password"
              id="password"
              value="soSim"
              readOnly
            />
          </div>
        </form>
      </section>
      <button
        onClick={() => {
          dispatch(clickWithdrawal());
        }}
      >
        탈퇴
      </button>
      {isEditClick && (
        <Modal>{error ? <ErrorContent /> : <CheckPasswordContent />}</Modal>
      )}
      {isWithdrawalClick && (
        <Modal>
          <AskWithdrawalContent />
        </Modal>
      )}
    </div>
  );
}
