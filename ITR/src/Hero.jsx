// Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Bestsellers from "./Home/BestSellers";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Unleash Your Glow</h1>
        <p>Luxury makeup for every shade of beauty</p>
        <button onClick={() => navigate("/login")}>Shop Now</button>
       
      </div>
    </section>
    
  
  );
};

export default Hero;