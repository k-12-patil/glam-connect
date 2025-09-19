import React from "react";
import { useNavigate } from "react-router-dom";
import { cartManager } from "../utils/cartManager";
import { toast } from "../utils/toast";

const productData = [
  { id: 1, name: "Huda Beauty Lipstick", price:  1200.00, image: "/images/HudaLipstick.jpg",description:"Huda Beauty Power Bullet Matte Lipstick" },
  { id: 2, name: "MamaEarth Lipstick", price:  399.00, image: "/images/MamLipstick.jpg" ,description:"Mamaearth Moisture Matte Longstay Lipstick with Avocado Oil & Vitamin E-12 Hour Long Stay (Grapefruit Pink, 2 g)"},
  { id: 3, name: "Maybelline New York Lipstick", price:  469.00, image: "/images/MayLipstick1.jpg" ,description:"MAYBELLINE NEW YORK Superstay Vinyl Ink Liquid Lipstick, Awestruck, 4.2ml (Awestruck, 4.2 ml)"},
  { id: 4, name: "Mars Lip Gloss", price:  209.00, image: "/images/MarsLipGloss.jpeg" ,description:"MARS Candylicious Coloured Lip Gloss|Hydrating | High shine | Non-Sticky Lipgloss (4 ml, 03-CARAMEL CRUNCH)"},
  { id: 5, name: "Mars LipLiner", price: 89.00, image: "/images/LipLiner1.jpeg" ,description:"MARS matte Lip Liner | Smooth Application, Long Lasting & Travel friendly Lip Pencil (WINE NIGHTS)"},
  { id: 6, name: "Mars Lipstick", price:  359.00, image: "/images/MarsLipstick.jpeg" ,description:"Mars Ultra Pigmented Creamy Matte Lipstick (06 Bhangra Bloom, 3.2 g)"},
  { id: 7, name: " Bene Lip Tint", price: 199.00, image: "/images/LipTint.jpg" ,description:"Benetint Lip & Cheek Stain Waterproof,longlasting tint for lip and cheeck (12.5 ml,red)"},
  { id: 8, name: "Swiss Beauty Lip Balm", price: 99.00, image: "/images/LipBalm2.jpeg",description:"SWISS BEAUY Swiss Beauty Kiss Kandy Lip Balm With Olive Oil" },
  { id: 9, name: "Sugar Lip Balm", price: 119.00, image: "/images/Lipbalm3.jpeg",description:"SUGAR POP SUGAR POP Lip Balm Cherry (Pack of:1, 4.5 g)" }
];

// Define your unique headings here (one per row)
const rowHeadings = [
  "Lip Liner",
  "Lip Balm"

];

const Lips = () => {
  const rows = [];
  const navigate = useNavigate();

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product }});
  };

  for (let i = 0; i < productData.length; i += 3) {
    const rowItems = productData.slice(i, i + 3);
    const heading = rowHeadings[i / 3] || ""; // fallback if heading is missing

    rows.push(
      <React.Fragment key={i}>
        <div className="product-gridl">
          {rowItems.map((product) => (
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
        <br></br>
        {heading && <h2 className="row-heading">{heading}</h2>}
      </React.Fragment>
    );
  }

  return (
    <section className="products1">
      <h2 className="top-heading">Lipstick's</h2>
      
      {rows}
    </section>
  );
};

export default Lips;