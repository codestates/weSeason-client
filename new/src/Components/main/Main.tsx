import React, { useEffect, useState } from 'react';
import SearchVillage from '../modal/SearchVillage';
import ClothesBox from './clothes/ClothesBox';
import './main.css';
import Weather from './weather/Weather';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { API_URL } from '../../const';
import { connect } from 'react-redux';
import { setAccessToken } from '../../reducers/appReducer';

const Main = ({ accessToken, modifyAccessToken }: any) => {
  const [clickModal, setClickModal] = useState<boolean>(false);
  const location = useLocation();
  const handleClickModal = () => {
    setClickModal(!clickModal);
  };

  useEffect(() => {
    let { code } = queryString.parse(location.search);
    let pathname = location.pathname;

    if (code) {
      axios
        .post(`${API_URL}${pathname}`, { code }, { withCredentials: true })
        .then((data) => {
          modifyAccessToken(data.data.accessToken);
        })
        .catch((err) => console.log(err));
      // 수정중
    }
  }, [accessToken, location.search, modifyAccessToken]);

  return (
    <div id='main'>
      <div id='main__contain'>
        <Weather />
        <ClothesBox />
        <button id='searchVillage__btn' onClick={handleClickModal}>
          동네 검색
        </button>
        {clickModal ? (
          <SearchVillage handleClickModal={handleClickModal} />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { accessToken: state.appReducer };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyAccessToken: (token: string) => dispatch(setAccessToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
