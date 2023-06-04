import KakaoMap from "../components/KakaoMap";
import styles from "./Home.module.css"
import KM from "../components/KM";
const Home = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div>
      <h1>Home</h1>
      <KakaoMap />
      <span id="logout" onClick={logout}>logout</span>
    </div>
  );
};

export default Home;
