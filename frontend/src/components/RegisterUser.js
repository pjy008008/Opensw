import { useState } from "react";

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [ps1, setPs1] = useState("");
  const [ps2, setPs2] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [major, setMajor] = useState("");
  const [real, setReal] = useState("");
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "Email") {
      setEmail((prev) => value);
    } else if (name === "Password1") {
      setContext((prev) => value);
    } else if (name === "Password2") {
      setPeople((prev) => value);
    }
  };
  // axios.post('/user', {
  //     firstName: 'Fred',
  //     lastName: 'Flintstone'
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  return (
    <div>
      <form>
        <input
          name="Email"
          onChange={onchange}
          placeholder="충북대 웹메일"
          value={email}
          required
        />
        <input
          name="Password1"
          onChange={onchange}
          placeholder="비밀번호"
          value={ps1}
          required
        />
        <input
          name="Password2"
          onChange={onchange}
          placeholder="비밀번호 재입력"
          value={ps2}
          required
        />
        <input
          name="Age"
          onChange={onchange}
          placeholder="나이"
          value={age}
          required
        />
        <input
          name="Gender"
          onChange={onchange}
          placeholder="성별"
          value={gender}
          required
        />
        <input
          name="Phone"
          onChange={onchange}
          placeholder="전화번호"
          value={phone}
          required
        />
        <input
          name="Major"
          onChange={onchange}
          placeholder="전공"
          value={major}
          required
        />
        <input
          name="Realname"
          onChange={onchange}
          placeholder="이름"
          value={real}
          required
        />
      </form>
    </div>
  );
};
export default RegisterUser;
