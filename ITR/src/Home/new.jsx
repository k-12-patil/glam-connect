import React from "react";
import { useNavigate } from "react-router-dom";
import { cartManager } from "../utils/cartManager";
import { toast } from "../utils/toast";

const productData = [
  { id: 1, name: "Mac Blush", price:  2650.00, image: "/images/Blush.jpg",description:"M.A.C Mineralize Blush Petal Power - Petal Power - 2.3 gm"  },
  { id: 2, name: "Maybelline New York Primer ", price: 699.00, image: "/images/Primer.jpg",description:"MAYBELLINE NEW YORK Fit me Face Primer Matte + Poreless,30 ml Primer -30 ml(Matte+Poreless) A mattifying primer for a smooth base." },
  { id: 3, name: "Lakme Kajal", price:  399.00, image: "/images/Kajal.jpg",description:"9 to 5 Kajal, Smudgeproof, Waterproof, lasts upto 24hrs, (Deep Black,0.35 g) " },
  { id: 4, name:"Mars Lip Gloss", price:  209.00, image: "/images/MarsLipGloss.jpeg" ,description:"MARS Candylicious Coloured Lip Gloss|Hydrating | High shine | Non-Sticky Lipgloss (4 ml, 03-CARAMEL CRUNCH)" },
  { id: 5, name: "Mama Earth Lipstick", price: 399.00, image: "/images/MamLipstick.jpg",description:"Mamaearth Moisture Matte Longstay Lipstick with Avocado Oil & Vitamin E-12 Hour Long Stay (Grapefruit Pink, 2 g)" },
  { id: 6, name: " Swiss Beauty Eyeshadow", price:  800.00, image: "/images/Eyeshadow.jpg",description:"Ultimate Eyeshadow Palette 9 Colors 6 g(04) \ Vibrant eyeshadow palette for bold looks." },
  { id: 7, name: "Huda eauty Lipstick", price: 1200.00, image: "/images/HudaLipstick.jpg",description:"Huda Beauty Power Bullet Matte Lipstick" },
  { id: 8, name: "Sugar Compact", price: 659.00, image: "/images/SugarPowder.jpg" ,description:"Set The Tone Tinted Powder Compact (30 Chococcino (Medium), 15 g)"},
  { id: 9, name: "Mars Lipstick", price:  359.00, image: "/images/MarsLipstick.jpeg" ,description:"Mars Ultra Pigmented Creamy Matte Lipstick (06 Bhangra Bloom, 3.2 g)"}, 

];

const New = () => {
    const navigate = useNavigate();

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product }});
  };

  return (
    <section className="products1">
      <h2 className="top-heading">Latest Products</h2>
      <br/>
      <div className="product-gridl">
        {productData.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Rs.{product.price}.00</p>
            <button 
                onClick={() => handleViewDetails(product)}
              >
                View Details
              </button>
          </div>
          
        ))}
      </div>
    </section>
    
  );
};

export default New;