import React from "react";
import { useNavigate } from "react-router-dom";

const productData = [
  {
    id: 1,
    name: "M.A.C Highlighter",
    price: 2700.00,
    image: "/images/MacHighlighter.jpg",
    description: "M.A.C Mineral-Infused powder highlighter foe a natural glow sheer buildable coverage"
  },
  {
    id: 2,
    name: "Mars Mascara",
    price: 450.00,
    image: "/images/MarsMascara.jpg",
    description: "2-in-1 Volumizing and Lengthening Long Lasting Mascara 15 ml(Black)" 
  },
  {
    id: 3,
    name: "Sugar Foundation",
    price: 950.00,
    image: "/images/Foundation.jpg",
    description: "Drop The Base Serum Foundation (15 Cappuccino (Light, Cool undertone) Foundation, 20 ml)" 
  },
  {
    id: 4,
    name: "Maybelline Lipstick",
    price:  500.00,
    image: "/images/MayLipstick1.jpg",
    description: "MAYBELLINE NEW YORK Superstay Vinyl Ink Liquid Lipstick, Awestruck, 4.2ml (Awestruck, 4.2 ml)"
  },
];

const Products = () => {
  const navigate = useNavigate();
   
const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product }});
  };

  return (
    <section className="products">
      <h2>BESTSELLERS</h2>
      <div className="product-grid">
        {productData.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Rs.{product.price}.00</p>
            <button onClick={() => handleViewDetails(product)}>View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
