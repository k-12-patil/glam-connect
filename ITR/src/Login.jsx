// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Simple email regex validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

 const handleLogin = async () => {
  if (!email || !password) {
    setError("Please fill in all fields");
    return;
  }

  try {
    // Clear any existing invalid data first
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    const res = await fetch("http://localhost:4200/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      // Store user data and token in localStorage
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);
      
      // Login success, navigate to home
      navigate("/Hfome");
    } else {
      setError(data.message);
    }
  } catch (err) {
    setError("Server error. Try again later.");
  }
};


  return (
    <div className="login-container" style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1 className="login-title" style={{ textAlign: "center" }}>Glam Connect</h1>
      <div className="login-box" style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}

        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: 10, backgroundColor: "#e91e63", color: "white", border: "none", borderRadius: 4 }}
        >
          Login
        </button>

        <p style={{ marginTop: 15, textAlign: "center" }}>
          Don’t have an account? <Link to="/create-account">Sign up free</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;