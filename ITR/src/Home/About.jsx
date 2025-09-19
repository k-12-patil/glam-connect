import React from "react";


export default function About() {

  const cards = [
    {
      img: "/-/media/project/loreal/brand-sites/mny/americas/us/about-us/maybelline-lp-about-606x911.jpg?rev=f34db76aace140298b6759a832b07b76",
      alt: "maybelline lp about 606x911",
      title: "Makeup for every look, style, skin tone",
    },
    {
      img: "/-/media/project/loreal/brand-sites/mny/master/dmi/about-us-2024/mny_aboutus_03b_we_believe_in.jpg?rev=-1",
      alt: "",
      title: "Trendsetting looks from NYC",
    },
    {
      img: "/-/media/project/loreal/brand-sites/mny/master/dmi/about-us-2024/mny_aboutus_03c_we_believe_in.jpg?rev=-1",
      alt: "",
      title: "Fast + easy on the go makeup",
    },
    {
      img: "/-/media/project/loreal/brand-sites/mny/master/dmi/about-us-2024/mny_aboutus_03d_we_believe_in.jpg?rev=-1",
      alt: "",
      title: "Makeup that stands up to the city",
    },
  ];
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about">
  <h1><b>About Us</b></h1>
  <p>
    Welcome to <strong>Glam Connect</strong> — where beauty meets elegance.
    We craft premium, cruelty-free makeup products that empower you to
    embrace your individuality. Every shade, texture, and product is
    designed with love, care, and a commitment to sustainability, so
    you can feel confident, radiant, and uniquely you every single day.
  </p>
</section>

     

      {/* Founder Section */}
  <section className="founder">
  <div className="founder-image">
    <img
      src="https://amoeboids.com/wp-content/uploads/2023/03/12-Inspiring-Product-Vision-Examples-banner1.webp"
      alt="Founder Vision"
      style={{ borderRadius: "12px", objectFit: "cover", width: "100%", maxWidth: "400px" }}
    />
  </div>
  <div className="founder-text">
    <h2>Our Founders’ Vision – Shaping a Future Where Beauty Empowers</h2>
    <p>
      At <strong>Glam Connect</strong>, our vision is driven by an unstoppable team:  
      <strong>Kajal Patil, Khushi Dhande, Payal Jawale, Bhakti Mahajan </strong>.  
      United by passion and purpose, we are revolutionizing beauty—crafting cruelty-free, sustainable products that empower you to shine with confidence and authenticity every day.
    </p>
  </div>
</section>






      {/* Mission Section */}
      <section className="mission">
  <div className="mission-text">
    <h2><b>Illuminating Your Beauty, Defining Timeless Elegance</b></h2>
    <p>
      At <strong>Glam Connect</strong>, we believe beauty should be as unique as you are. 
      Our handpicked collection blends luxury, sustainability, and ethical practices 
      to bring you products that enhance your natural charm while caring for the 
      planet. We don’t just create makeup — we create confidence, radiance, 
      and elegance that never fades.
    </p>
    <div className="mission-info">
      <span>Our Brand Values</span>
    </div>
  </div>

</section>


      {/* Team Section */}
      <section className="team">
  <h2><b>Meet the Visionaries Behind Glam Connect</b></h2>
  <p>
    At <strong>Glam Connect</strong>, our strength lies in the passion and creativity of our people. 
    From innovative designers to strategic thinkers, every member of our team shares one goal — 
    to craft beauty experiences that inspire, empower, and leave a lasting impression.
  </p>
  <div className="team-grid">
    <div className="team-member">
    
      <b><h3>Kajal Patil</h3></b>
      <b><p>Dream Builders</p></b>
    </div>
    <div className="team-member">
      
      <b><h3>Khushi Dhande</h3></b>
      <b><p>Dream Builders</p></b>
    </div>
    <div className="team-member">
      
      <b><h3>Payal Jawale</h3></b>
      <b><p>Dream Builders</p></b>
    </div>
    <div className="team-member">
      
      <h3><b>Bhakti Mahajan</b> </h3>
      <b><p>Dream Builders</p></b>
    </div>
  </div>
</section>
</div>  
);
}