import React, { useState } from "react";
import { connect } from "react-redux";
import "./OneBtnModal.css";

const OneBtnModal = ({ message, info, handleFindModalClose }: any) => {
  const [clickModal, setClickModal] = useState<boolean>(false);

  const handleClickModal = () => {
    setClickModal(true);
    handleFindModalClose();
    setClickModal(false);
  };

  return (
    <>
      {!clickModal ? (
        <div className="onebtnModal__background">
          <div className="onebtnModal__contain">
            <p className="onbtnModal__message">{message}</p>
            {info ? <p className="onbtnModal__info">{info}</p> : null}
            <div className="onebtnModal__btn-contain">
              <button className="onebtnModal__btn" onClick={handleClickModal}>
                확인
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { pageWidth: state };
};

export default connect(mapStateToProps)(OneBtnModal);
