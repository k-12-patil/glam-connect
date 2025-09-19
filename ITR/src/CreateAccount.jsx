import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount'; // Make sure your CSS styles this file

function CreateAccount() {
  const [form, setForm] = useState({
    countryCode: '+91',
    mobile: '',
    email: '',
    name: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Clear any existing invalid data first
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    const res = await fetch("http://localhost:4200/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      // Store user data and token in localStorage
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);
      
      setPopupMessage("✅ Account created successfully!");
      setTimeout(() => navigate("/Hfome"), 2000);
    } else {
      setError(data.message);
    }
  } catch (err) {
    setError("Server error. Try again later.");
  }
};


  return (
    <div className="container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Mobile number
          <div className="mobile-input">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
            >
              <option value="+91">IN +91</option>
              <option value="+1">US +1</option>
              <option value="+44">UK +44</option>
            </select>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile number"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Your name:
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password (at least 6 characters):
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </label>

        <p className="info-text">Passwords must be at least 6 characters.</p>

        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

        <center>
          <button type="submit" className="verify-btn">Submit</button>
        </center>

        <br />

        <p className="terms">
          By creating an account or logging in, you agree to Glam Connect's{' '}
          <a href="#">Conditions of Use</a> and <a href="#">Privacy Policy</a>.
        </p>
      </form>

      {/* Popup Message */}
      {popupMessage && (
        <div className="popup-message">{popupMessage}</div>
      )}
    </div>
  );
}

export default CreateAccount;