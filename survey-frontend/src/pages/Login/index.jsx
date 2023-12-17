import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "auth/login", {
        username: Username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("jwt", res.data.token);
        if (res.data.user.admin) {
          navigate("/landing-admin");
        } else {
          navigate("/landing");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log("Username: ", Username);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("Password: ", password);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        onChange={handleUsernameChange}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
