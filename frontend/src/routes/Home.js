import KakaoMap from "../components/KakaoMap";
import styles from "./Home.module.css";
import MakePost from "../components/MakePost";
import ChatRoom from "../components/ChatRoom";
import { useState } from "react";

const Home = () => {
  const [form, setForm] = useState(false);
  const toggle = () => {
    setForm((prev) => !prev);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.reload();
  };
  return (
    <div>
      <div>
        <h1>Home</h1>
        <KakaoMap />
        <span className={styles.logout} onClick={logout}>
          로그아웃
        </span>
        {form ? (
          <>
            <span className={styles.submitBtn} onClick={toggle}>
              포스팅닫기
            </span>
            <MakePost />
          </>
        ) : (
          <span className={styles.submitBtn} onClick={toggle}>
            포스팅열기
          </span>
        )}
        {/* <MakePost /> */}
        <footer>
          <a href="https://www.flaticon.com/kr/free-icons/" title="소녀 아이콘">
            소녀 아이콘 제작자: Freepik - Flaticon
          </a>
          <a href="https://www.flaticon.com/kr/free-icons/" title="남성 아이콘">
            남성 아이콘 제작자: Freepik - Flaticon
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Home;
