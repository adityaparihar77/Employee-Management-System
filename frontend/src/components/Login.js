import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";  // Import custom CSS for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (role) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/${role}/login`,
        { email, password }
      );
      if (res.data.role === role) {
        localStorage.setItem("token", res.data.token);
        navigate(`/${role}`);
      }
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttons">
          <button className="login-btn" onClick={() => handleLogin("admin")}>
            Admin Login
          </button>
          <button
            className="login-btn"
            onClick={() => handleLogin("employee")}
          >
            Employee Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
