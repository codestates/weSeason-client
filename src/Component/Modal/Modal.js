import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import Loading from "../Loading/Loading";
import "./Modal.css";

export default function Modal({ children, closeModal }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInit, setIsInit] = useState(true);
  // 모달 창 끄기
  const close = useCallback(() => {
    // 애니메이션 시작
    setIsInit(true);
    // 0.5 초 후에 모달창 사라짐
    setTimeout(closeModal, 500);
  }, [closeModal]);
  useEffect(() => {
    // ESC 눌렀을때 모달 창 닫기
    const onKeyDown = ({ keyCode }) => {
      if (keyCode === 27) {
        close();
      }
    };
    // 키보드 이벤트 리스닝
    window.addEventListener("keydown", onKeyDown);
    // 로딩 뜨고 0.3초 후에 모달창 표시
    const id = setTimeout(() => {
      setIsLoading(false);
      setIsInit(false);
    }, 300);
    // 모달창 닫힐때 실행
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(id);
    };
  }, [close]);
  // 모달창 뜨기전에 무조건 로딩 표시
  return (
    <>
      {isLoading && isInit && <Loading />}
      <div className="modal">
        <div className={`${isInit ? "modal__mask--open " : ""}modal__mask`}>
          <div
            className={`${isInit ? "modal__window--open " : ""}modal__window`}
          >
            {Children.map(children, (child) => {
              if (typeof child.type === "function")
                return cloneElement(child, { close: close });
              return cloneElement(child);
            })}
            <button className="modal__close-btn" onClick={close}>
              X
            </button>
            <div className="modal__info">ESC를 눌러서 닫을 수 있습니다.</div>
          </div>
        </div>
      </div>
    </>
  );
}
