import React from "react";
import {
  MapMarker,
  Map,
  useMap,
  MapTypeControl,
  CustomOverlayMap,
  Polygon,
} from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import styles from "./KakaoMap.module.css";
import axios from "axios";
import maleImg from "../image/man.png";
import femaleImg from "../image/woman.png";
import { Link } from "react-router-dom";
import ChatRoom from "./ChatRoom";

const KakaoMap = () => {
  const [post, setPost] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const email1 = localStorage.getItem("email");

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
            gender: element.gender,
            person: element.personnel,
            major: element.major,
            match: element.match,
            roomid: element.roomid,
            realname: element.realname,
            email: element.email,
            date: new Date(element.created_at).toLocaleString(),
          };
        });
        setPost(posts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://127.0.0.1:8000/api/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    window.location.reload();
  };

  //Map Marker 표시하기
  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap();
    const [isWoman, setIsWoman] = useState(content.gender === "F");
    const [isVisible, setIsVisible] = useState(false);
    const handleMarkerClick = (marker) => {
      if (isVisible && selectedMarker === position) {
        setIsVisible(false); // 이미 열려 있는 infowindow를 닫기 위해 isVisible 값을 false로 설정
        setSelectedMarker(null); // 선택된 마커를 해제
      } else {
        setIsVisible(true);
        map.panTo(marker.getPosition());
        setSelectedMarker(position);
      }
    };

    useEffect(() => {
      setIsVisible(selectedMarker === position);
    }, [selectedMarker, position]);

    const putRequest = async (event) => {
      const id = event.id;
      const token = localStorage.getItem("token");
      console.log(id);
      const url = `http://127.0.0.1:8000/api/${id}/`;
      console.log(url);
      try {
        const response = await axios.put(url, null, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log(response.data); // 성공적인 응답 데이터 처리
      } catch (error) {
        console.error(error); // 오류 처리
      }
      window.location.reload();
    };
    return (
      <div>
        {isWoman ? (
          <MapMarker
            position={position} // 마커를 표시할 위치
            onClick={(marker) => handleMarkerClick(marker)}
            image={{
              src: femaleImg,
              size: {
                width: 32,
                height: 34,
              },
              options: {
                offset: {
                  x: 16,
                  y: 34,
                },
              },
            }}
          ></MapMarker>
        ) : (
          <MapMarker
            position={position} // 마커를 표시할 위치
            onClick={(marker) => handleMarkerClick(marker)}
            image={{
              src: maleImg,
              size: {
                width: 32,
                height: 34,
              },
              options: {
                offset: {
                  x: 16,
                  y: 34,
                },
              },
            }}
          ></MapMarker>
        )}

        {isVisible && (
          <CustomOverlayMap position={position}>
            <div className={styles.infowindow}>
              <div className={styles.head}>
                {email1 === content.email && (
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(content.id)}
                  >
                    삭제
                  </button>
                )}
                <p className={styles.date}>{content.date}</p>
                <h3 className={styles.title}>{content.title}</h3>
                <hr className={styles.line} />
              </div>
              <div className={styles.body}>
                <p className={styles.contents}>{content.content}</p>
                {/* <p className={styles.gender}>{content.gender}</p> */}
                <p className={styles.person}>인원 : {content.person}명</p>
                <p className={styles.major}>전공 : {content.major}</p>
                {content.match === 1 ? (
                  <button className={styles.match}>
                    <Link to={`/chat/${content.roomid}`}>채팅</Link>
                  </button>
                ) : (
                  email1 !== content.email && (
                    <button
                      className={styles.match}
                      onClick={() => putRequest(content)}
                    >
                      매칭
                    </button>
                  )
                )}
              </div>
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
        maxLevel={4}
        minLevel={2}
      >
        {post &&
          post.map((value) => (
            <EventMarkerContainer
              key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
              position={value.latlng}
              content={value}
            />
          ))}
        <MapTypeControl position={window.kakao.maps.ControlPosition.TOPRIGHT} />
      </Map>
    </>
  );
};

export default KakaoMap;
