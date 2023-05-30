import React from "react";
import { MapMarker, Map, useMap } from "react-kakao-maps-sdk";
import { useState,useEffect } from "react";
import styles from "./KakaoMap.module.css";
import axios from "axios";

const KakaoMap = () => {
  const [post, setPost] = useState([]);
  // const res = await fetch("http://127.0.0.1:8000/api/grade");
  //       const data = await res.json();
  //       setPosts(data);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then(function (response) {
        const data = response.data;
        const posts = data.map((element) => {
          return {
            title: <div>{element.title}</div>,
            latlng: { lat: element.lat, lng: element.lng },
          };
        });
        setPost(posts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        // @ts-ignore
        onClick={(marker) => map.panTo(marker.getPosition())}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && content}
      </MapMarker>
    );
  };
  console.log(post);
  return (
    <Map
      className={styles.map}
      center={{ lat: 36.627883, lng: 127.456268 }}
      level={4}
    >
      {post &&
        post.map((value) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            position={value.latlng}
            content={value.title}
          />
        ))}
    </Map>
  );
};

export default KakaoMap;
