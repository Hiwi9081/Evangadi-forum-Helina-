import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!emailValue || !passwordValue) {
      setErrorMessage("Please provide all required information");
      return;
    }

    try {
      const response = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      const token = response.data.token;
      localStorage.setItem("auth-token", token);
      alert("Login successful. Redirecting to home page...");
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.data.msg === "Incorrect email") {
          setErrorMessage("Incorrect email");
        } else if (error.response.data.msg === "Incorrect password") {
          setErrorMessage("Incorrect password");
        } else {
          setErrorMessage("Incorrect email or password");
        }
      } else {
        setErrorMessage("Something went wrong");
      }
      console.log(error);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h3>Login to your account</h3>
        <p>
          Don't have an account? <a href="/signup">Create a new account</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <input ref={emailRef} type="text" placeholder="Email address" />
          </div>
          <div className="password-container">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          {errorMessage && (
            <div className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </div>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
