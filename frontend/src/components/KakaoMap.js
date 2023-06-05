import React from "react";
import {
  MapMarker,
  Map,
  useMap,
  MapTypeControl,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import styles from "./KakaoMap.module.css";
import axios from "axios";

const KakaoMap = () => {
  const [post, setPost] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    //post model 불러오기
    axios
      .get("http://127.0.0.1:8000/api/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then(function (response) {
        console.log(response);
        const data = response.data;
        const posts = data.map((element) => {
          return {
            id: element.id,
            title: element.title,
            latlng: { lat: element.lat, lng: element.lng },
            content: element.content,
          };
        });
        setPost(posts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //Map Marker 표시하기
  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);
    const handleMarkerClick = (marker) => {
      setIsVisible(true);
      map.panTo(marker.getPosition());
      setSelectedMarker(position);
    };
    useEffect(() => {
      setIsVisible(selectedMarker === position);
    }, [selectedMarker, position]);
    return (
      <div>
        <MapMarker
          position={position} // 마커를 표시할 위치
          // @ts-ignore
          onClick={(marker) => handleMarkerClick(marker)}
          // onMouseOver={() => setIsVisible(true)}
          // onMouseOut={() => setIsVisible(false)}
        ></MapMarker>
        {isVisible && (
          <CustomOverlayMap position={position}>
            <div className={styles.infowindow}>
              <h3 className={styles.title}>{content.title}</h3>
              <p className={styles.contents}>{content.content}</p>
            </div>
          </CustomOverlayMap>
        )}
      </div>
    );
  };
  // console.log(post);

  return (
    <>
      <Map
        className={styles.map}
        center={{ lat: 36.627883, lng: 127.456268 }}
        level={3}
      >
        {post &&
          post.map((value) => (
            <EventMarkerContainer
              key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
              position={value.latlng}
              content={value}
            />
          ))}
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      </Map>
    </>
  );
};

export default KakaoMap;
