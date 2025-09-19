// src/components/Slider.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

// Required CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
 // Your custom styles
 // Assuming you have styles here

const CustomSlider = () => {
  const [active, setActive] = useState();
  const navigate = useNavigate();                             
                                                                   
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const filters = ["New","Lips", "Eyes", "Face"];

  const handleFilterClick = (filter) => {
    setActive(filter);
    navigate(`/category/${filter.toLowerCase()}`); // 👈 Redirect to route
  };

  return (
    <div className="slider-wrapper">
      {/* Sticky Filters */}
      <div className="filters-sticky">
        <div className="filters-container">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${active === filter ? "active" : ""}`}
              onClick={() => handleFilterClick(filter)}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Slider Content */}
      <div className="slider-content">
        <h2 className="slider-title">Welcome to Glam Connect</h2>

        <Slider {...settings}>
          {/*<div>
            <img
              src="/images/lorel.jpg"
              alt="Slide 1"
              className="slider-image"
            />
          </div>*/}

          <div>
            <video className="slider-image" autoPlay muted loop>
              <source src="/videos/Sugarvid.mp4" type="video/mp4"/>
            </video>
          </div>

          <div>
            <video className="slider-image" autoPlay  loop>
              <source src="/videos/Sugar1.mp4" type="video/mp4"/>
            </video>
          </div>

          <div>
            <video className="slider-image" autoPlay muted loop>
              <source src="/videos/Loreal.mp4" type="video/mp4"/>
            </video>
          </div>
          
        </Slider>
      </div>
    </div>
  );
};

export default CustomSlider;