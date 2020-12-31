import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import Loading from "../Loading/Loading";
import "./Map.css";
const { kakao } = window;
export default function Map({ lat, lon, setLat, setLon, close }) {
  const [input, setInput] = useState("");
  const [place, setPlace] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [tempLat, setTempLat] = useState(lat);
  const [tempLon, setTempLon] = useState(lon);
  const ref = useRef();
  useEffect(() => {
    const mapOption = {
      center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };
    // 지도를 생성합니다
    const map = new kakao.maps.Map(ref.current, mapOption);
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();
    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // 지도에 마커를 표시하는 함수입니다
    const displayMarker = (place) => {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
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
    };
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setIsLoading(false);
        setMessage("");
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      } else {
        setMessage("보다 명확한 검색어를 입력해주세요.");
      }
    };
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(place, placesSearchCB);
    // 지도를 클릭한 위치에 표출할 마커입니다
    const marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      setTempLat(latlng.getLat());
      setTempLon(latlng.getLng());
    });
  }, [place, lat, lon]);
  const search = useCallback(
    (e) => {
      e.preventDefault();
      setPlace(input);
      setIsLoading(true);
    },
    [input]
  );
  const recomend = useCallback(() => {
    setLat(tempLat);
    setLon(tempLon);
    close();
  }, [setLat, tempLon, tempLat, setLon, close]);
  return (
    <>
      {isLoading && <Loading />}
      <div className="map">
        <form className="map__form">
          <input
            className="map__input"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            placeholder="오늘 방문하시려는 곳이 어디인가요?"
          />
          <button className="map__button" onClick={search}>
            검색
          </button>
        </form>
        <div className="map__message">{message}</div>
        <div className="map__message">원하시는 장소를 click해 주세요.</div>
        <div id="map" ref={ref} />
      </div>
      <button className="modal__close-btn" onClick={recomend}>
        옷 추천 받기
      </button>
    </>
  );
}
