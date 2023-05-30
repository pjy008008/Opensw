import React from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import styles from "./KakaoMap.module.css";

const KakaoMap = () => {
  // const [currentPosition, setCurrentPosition] = useState(null);
  // useEffect(() => {
  //   // 현재 위치를 로딩
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCurrentPosition({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  return (
    <Map
      className={styles.map}
      center={{ lat: 36.627883, lng: 127.456268 }}
      level={4}
    >
      {/* <MapMarker position={currentPosition}>
        <div style={{ color: "#000" }}>Hello World!</div>
      </MapMarker> */}
    </Map>
  );
};

export default KakaoMap;
