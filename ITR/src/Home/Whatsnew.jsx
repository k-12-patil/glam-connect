// WhatsNew.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { cartManager } from "../utils/cartManager";
import { toast } from "../utils/toast";

const productData = [
  { id: 1, 
    name: "M.A.C Blush",
    price: 2650.00,
    image: "/images/Blush.jpg",
    description: "M.A.C Mineralize Blush Petal Power - Petal Power - 2.3 gm"},
  {
    id: 2,
    name: "Maybelline New York Compact", 
    price: 199.00, 
    image: "/images/MayCompact.jpg",
    description: "MAYBELLINE NEW YORK Fit Me Matte + Poreless Powder| 16H Oil Control with SPF 32 +++ Compact (Shade 115, 6 g)"
  },
  {
    id: 3,
    name: "Lakme Kajal",
    price: 399.00, 
    image: "/images/Kajal.jpg",
    description: "9 to 5 Kajal, Smudgeproof, Waterproof, lasts upto 24hrs,<br/> (Deep Black,0.35 g) "
  },
  { 
    id: 4,
    name: "Mars Lipstick",
     price:  359.00,
      image: "/images/MayLipstick1.jpg" ,
      description:"Mars Ultra Pigmented Creamy Matte Lipstick (06 Bhangra Bloom, 3.2 g)"},
    
];

const Whatsnew = () => {
  const navigate = useNavigate();

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product }});
  };

  return (
    <section className="products">
      <h2>WHAT'S NEW</h2>
      <br/>
      <div className="product-grid">
        {productData.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Rs.{product.price}.00</p>
              <button 
                onClick={() => handleViewDetails(product)}>
                View Details
              </button>
            </div>
        ))}
      </div>
    </section>
  );
};

export default Whatsnew;