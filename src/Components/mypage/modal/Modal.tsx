import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

import "./modal.css";

const Modal: FC = ({ children }) => {
  const [init, setInit] = useState(false);
  const error = useSelector((state: RootState) => state.mypageReducer.error);
  useEffect(() => {
    setInit(true);
  }, []);
  return (
    <div className={`modal ${init && "modal--init"}`}>
      <div className={`modal__content ${error && "modal__content--error"}`}>
        {children}
      </div>
    </div>
  );
};
export default Modal;
