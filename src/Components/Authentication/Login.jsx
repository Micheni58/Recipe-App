import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {

      console.log("Login successful");

      navigate('/dashboard');
    } else {
      alert("Please fill in both fields.");
    }
  }

  return (
    <div className="login-form">
      <form className="login-form-container" onSubmit={handleSubmit}>
        <div className="login-inputs">
          <h1 id="login-header">Login</h1>

          <label>Enter Email:</label><br />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />

          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />

          <button className="btn" type="submit">Login</button>
          <p>Don't have an account? <a href="/signup">Sign Up here!</a></p>
        </div>

        <div className="login-image">
          <img src="https://cdn.pixabay.com/photo/2016/11/18/19/00/bread-1836411_640.jpg" alt="" />
        </div>
      </form>
    </div>
  );
}

export default Login;
