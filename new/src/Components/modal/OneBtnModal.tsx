import { useState } from 'react';
import './OneBtnModal.css';

type OneBtnModalProps = {
  message: string;
  info: string;
  handleFindModalClose(): void;
};

const OneBtnModal = ({
  message,
  info,
  handleFindModalClose,
}: OneBtnModalProps) => {
  const [clickModal, setClickModal] = useState<boolean>(false);

  const handleClickModal = () => {
    setClickModal(true);
    handleFindModalClose();
    setClickModal(false);
  };

  return (
    <>
      {!clickModal ? (
        <div className='onebtnModal__background'>
          <div className='onebtnModal__contain'>
            <p className='onbtnModal__message'>{message}</p>
            {info ? <p className='onbtnModal__info'>{info}</p> : null}
            <div className='onebtnModal__btn-contain'>
              <button className='onebtnModal__btn' onClick={handleClickModal}>
                확인
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OneBtnModal;
