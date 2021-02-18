import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { userLat, userLon } from "../../reducers/locationReducer";
import "./searchVillage.css";
const { kakao, event } = window;

declare global {
  interface Window {
    kakao: any;
  }
}

const SearchVillage = ({
  handleClickModal,
  lat,
  lon,
  modifyLat,
  modifyLon,
}: any) => {
  const [clickLat, setClickLat] = useState<number>(0);
  const [clickLon, setClickLon] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  const handleClickClose = () => {
    handleClickModal();
  };

  const handleClickSearchBtn = () => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    let container = document.getElementById("searchVillage__map"); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // 지도를 생성합니다
    // var map = new kakao.maps.Map(container, options);

    // 장소 검색 객체를 생성합니다
    let ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(inputValue, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: any) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }

    let marker = new window.kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    window.kakao.maps.event.addListener(
      map,
      "click",
      function (mouseEvent: any) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);

        let newLat = latlng.getLat();
        let newLon = latlng.getLng();
        setClickLat(newLat);
        setClickLon(newLon);
      }
    );
  };

  const handleChangeInputValue = (e: any) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    let container = document.getElementById("searchVillage__map"); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // 지도를 클릭한 위치에 표출할 마커입니다
    let marker = new window.kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    window.kakao.maps.event.addListener(
      map,
      "click",
      function (mouseEvent: any) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);

        let newLat = latlng.getLat();
        let newLon = latlng.getLng();
        setClickLat(newLat);
        setClickLon(newLon);
      }
    );
  }, [lat, lon]);

  const checkEnterKey = (e: any) => {
    if (e.keyCode === 13) {
      handleClickSearchBtn();
    } else if (e.keyCode === 27) {
      handleClickClose();
    }
  };

  const handleClickMap = () => {
    modifyLat(clickLat);
    modifyLon(clickLon);
    handleClickClose();
  };

  return (
    <div id="searchVillage-background">
      <div id="searchVillage__contain">
        <div className="searchVillage__input-contain">
          <input
            id="searchVillage__input"
            type="text"
            placeholder="어느 곳을 방문할 예정인가요?"
            onChange={handleChangeInputValue}
            onKeyUp={checkEnterKey}
          ></input>
          <button id="searchVillage__btn-search" onClick={handleClickSearchBtn}>
            검색
          </button>
        </div>
        <p id="searchVillage__info-ment--head">
          원하시는 장소를 지도에서 클릭하세요.
        </p>
        <div id="searchVillage__map"></div>
        <p id="searchVillage__info-ment--foot">
          ESC를 눌러 창을 닫을 수 있습니다.
        </p>
        <div id="searchvillage__footer-contain">
          <button className="searchVillage__btn" onClick={handleClickMap}>
            옷 추천 받기
          </button>
          <button
            className="searchVillage__btn btn--close"
            onClick={handleClickClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { lat: state.locationReducer.lat, lon: state.locationReducer.lon };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyLat: (lat: number) => dispatch(userLat(lat)),
    modifyLon: (lon: number) => dispatch(userLon(lon)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchVillage);