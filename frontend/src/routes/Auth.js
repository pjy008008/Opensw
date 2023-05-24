import { useState } from "react";
import RegisterUser from "../components/RegisterUser";
import LoginUser from "../components/LoginUser";
import styles from "./Auth.module.css"
const Auth = () => {
  const [first, setFirst] = useState(false);
  const onClick = () => {
    setFirst((prev) => !prev);
  };
  return (
    <div>
      <h1 className="title">과팅</h1>
      {first ? <RegisterUser /> : <LoginUser />}
      <button className={styles.toggle} onClick={onClick}>{first ? "로그인" : "회원가입"}</button>
    </div>
  );
};

export default Auth;
