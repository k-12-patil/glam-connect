import React from "react";
import { useNavigate } from "react-router-dom";
import { cartManager } from "../utils/cartManager";
import { toast } from "../utils/toast";

const productData = [
  { id: 1, name: "Maybelline New York Mascara", price: 750.00, image: "/images/MayMascara.jpeg",description:"LASH SENSATIONAL Waterproof Mascara,Longlasting, Highly pigmented 10 ml(Black)" },
  { id: 2, name: "Mars Mascara", price: 699.00, image: "/images/MarsMascara.jpg",description:"2-in-1 Volumizing and Lengthening Long Lasting Mascara 15 ml(Black)" },
  { id: 3, name: "Swiss Beauty Eye Liner", price: 599.00, image: "/images/EyeLiner1.jpeg" ,descripion:"Waterproof Matte Liquid Black Eyeliner|Smudge Proof,Transfer Proof for EyeMakeup 4 ml(Black)"},
  { id: 4, name: "Lakme Kajal", price:  399.00, image: "/images/Kajal.jpg",description:"9 to 5 Kajal, Smudgeproof, Waterproof, lasts upto 24hrs, (Deep Black,0.35 g) "},
  { id: 5, name: "MamaEarth Kajal", price: 299.00, image: "/images/kajal1.jpeg",description:"Charcoal Black Long Stay Kajal Black Waterproof,with Vitamin C & Chamomile for 11-Hour Smudge-free Stay (Black, 0.35 g)" },
  { id: 6, name: "Swiss Beauty Kajal", price: 499.00, image: "/images/Kajal2.jpeg",description:"Swiss Beauty Bold and Black Kajal,Waterproof,24 Hour Stay,Enriched with Vitamin E" },
  { id: 7, name: "Swiss Beauty EyeShadow", price: " 800.00", image: "/images/Eyeshadow.jpg",description:"Ultimate Eyeshadow Palette 9 Colors 6 g(04) \ Vibrant eyeshadow palette for bold looks." },
  { id: 8, name: "Sugar Eyeshadow", price: 1499.00, image: "/images/Eyeshadow1.jpeg",description:"Blend The Rules Eyeshadow Palette 10.4 g (04 Fetish (Nudes))" },
  { id: 9, name: "Mars Eyeshadow", price: 1299.00, image: "/images/Eyeshadow2.jpeg" ,description:"Ultra Pigmented Smoky Eyes Mesmereyes Eyeshadow palette 28 g (Shimmers,Mattes,Glitters)"}
];

// Define your unique headings here (one per row)
const rowHeadings = 
[ "Kajal",
  "Eye shadow"

];

const Eyes = () => {
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
      <h2 className="top-heading">EyeLiner & Mascara</h2>
      
      {rows}
    </section>
  );
};

export default Eyes;