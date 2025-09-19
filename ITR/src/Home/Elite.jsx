// Ellite.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { cartManager } from "../utils/cartManager";


const productData = [
  { 
    id: 1,
    name: "Bene LipTint", 
    price:  199.00, 
    image: "/images/LipTint.jpg",
    description: "Benetint Lip & Cheek Stain Waterproof,longlasting tint for lip and cheeck (12.5 ml,red)"
   },
  {
     id: 2, 
     name: "Swiss Beauty Eyeshadow", 
     price:  800.00, 
     image: "/images/Eyeshadow.jpg",
     description: "Ultimate Eyeshadow Palette 9 Colors 6 g(04) \
    Vibrant eyeshadow palette for bold looks."
     },
  { 
    id: 3, 
    name: "Maybelline New York Primer", 
    price: 499.00, 
    image: "/images/Primer.jpg",
    description: "MAYBELLINE NEW YORK Fit me Face Primer Matte + Poreless,30 ml Primer -30 ml(Matte+Poreless) A mattifying primer for a smooth base."
   },
  { 
    id: 4, 
    name: "Sugar Contour", 
    price: 349.00, 
    image: "/images/Contour.jpg",
    description: "Contour De Force Fcae Palette 01 Subtle Summit, 3-in-1 makeup palette that includes highlighter,bronzer and blush"
  },
];

const Elite = () => {
  const navigate = useNavigate();

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product }});
  };

  return (
    <section className="products">
      <h2>ELITE-EDITION</h2>
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

export default Elite;