import { useState } from "react";
import axios from "axios";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (event)=>{
    event.preventDefault();
    axios
    .post("http://localhost:8000/user/rest-auth/login/", {
      email: email,
      password: password,
    },{
      headers: {
        'Content-Type': 'application/json' // 요청 헤더에 JSON 형식으로 설정
      }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "Email") {
      setEmail((prev) => value);
    } else if (name === "password") {
      setPassword((prev) => value);
    }
  };
  return (
    <div>
      <h1>login</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Email"
          name="Email"
          value={email}
          onChange={onChange}
          required
        />
        <br />
        <input
          placeholder="비밀번호"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
export default LoginUser;
