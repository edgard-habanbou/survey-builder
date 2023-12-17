import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const handleLogin = () => {
    MySwal.fire({
      title: "Logging In...",
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    axios
      .post(process.env.REACT_APP_API_URL + "auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        MySwal.hideLoading();
        MySwal.close();
        localStorage.setItem("jwt", res.data.token);
        if (res.data.user.admin) {
          navigate("/landing-admin");
        } else {
          navigate("/landing");
        }
      })
      .catch((e) => {
        console.log(e);
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Username or Password!",
        });
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log("Username: ", username);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("Password: ", password);
  };

  const handleToggleRegister = () => {
    setRegister(!register);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleRegister = () => {
    MySwal.fire({
      title: "Registering...",
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    axios
      .post(process.env.REACT_APP_API_URL + "auth/register", {
        fname: firstName,
        lname: lastName,
        username: username,
        password: password,
      })
      .then((res) => {
        MySwal.hideLoading();
        MySwal.close();
        console.log(res);
        setRegister(false);
      })
      .catch((e) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Try Again!",
        });
        console.log(e);
      });
  };

  return (
    <div>
      {register ? (
        <div className="flex column gap center full-height">
          <div>
            <h2>Register</h2>
          </div>
          <div>
            <input
              type="text"
              placeholder="First Name"
              onChange={handleFirstNameChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              onChange={handleLastNameChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>

          <button onClick={handleRegister}>Register</button>
          <p>Already have an account?</p>
          <button onClick={handleToggleRegister}>Login</button>
        </div>
      ) : (
        <div className="flex column center gap full-height">
          <div>
            <h2>Login</h2>
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <button onClick={handleLogin}>Login</button>
          </div>
          <div>
            <p>Don't have an account?</p>
          </div>
          <div>
            <button onClick={handleToggleRegister}>Register</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
