import { useState } from "react";
import RegisterUser from "../components/RegisterUser";
import LoginUser from "../components/LoginUser";
const Auth = () => {
  const [first, setFirst] = useState(false);
  return (
    <div>
      <h1>Auth</h1>
      {first ? <RegisterUser /> : <LoginUser />}
    </div>
  );
};

export default Auth;
