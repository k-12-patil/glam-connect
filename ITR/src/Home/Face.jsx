import React from "react";
import { useNavigate } from "react-router-dom";
import { cartManager } from "../utils/cartManager";
import { toast } from "../utils/toast";

const productData = [
  { id: 1, name: " Sugar Foundation", price: 759.00, image: "/images/Foundation.jpg",description:"Drop The Base Serum Foundation (15 Cappuccino (Light, Cool undertone) Foundation, 20 ml)" },
  { id: 2, name: "Fit Me Foundation", price:  599.00, image: "/images/Foundation1.jpeg" ,description:"MAYBELLINE NEW YORK Fit Me Matte + Poreless Foundation Natural Matte|12H ,30 ml Foundation (Soft Nude, 30 ml)"},
  { id: 3, name: "L'Oreal Paris Foundation", price: 899.00, image: "/images/Foundation2.jpeg",description:"True Match Super-Blendable Foundation -3W Warm (30 ml)" },
  { id: 4, name: "Maybelline New York Primer", price: 499.00, image: "/images/Primer.jpg",description:"MAYBELLINE NEW YORK Fit me Face Primer Matte + Poreless,30 ml Primer -30 ml(Matte+Poreless) A mattifying primer for a smooth base." },
  { id: 5, name: " Maybelline New York Concealer", price: 505.00, image: "/images/Concealer1.jpeg",description:"MAYBELLINE NEW YORK New Instant Age Rewind Concealer (Ivory, 6 ml)" },
  { id: 6, name: "Maybelline New York Concealer", price: 415.00, image: "/images/Concealer2.jpeg",description:"MAYBELLINE NEW YORK Fit Me Concealer (25 Medium, 6.8 ml)" },
  { id: 7, name: "Maybelline New York Compact", price: 199.00, image: "/images/MayCompact.jpg",description:"MAYBELLINE NEW YORK Fit Me Matte + Poreless Powder| 16H Oil Control with SPF 32 +++ Compact (Shade 115, 6 g)" },
  { id: 8, name: "Mamaearth Compact powder", price: 429.00, image: "/images/Compactpowder1.jpeg",description:"Glow Oil Control Compact SPF 30 with Vitamin C & Turmeric for 2X Instant Glow Compact (Nude Glow, 9 g)" },
  { id: 9, name: "Sugar Compact", price: 659.00, image: "/images/SugarPowder.jpg",description:"Set The Tone Tinted Powder Compact (30 Chococcino (Medium), 15 g)" },
  { id: 10, name: "M.A.C Blush", price:  2650.00, image: "/images/Blush.jpg",description:"M.A.C Mineralize Blush Petal Power - Petal Power - 2.3 gm" },
  { id: 11, name: "Swiss Beauty Blush & Highlighter", price: 299.00, image: "/images/BlushHighlighter.jpeg",description:"SWISS BEAUTY Baked Blusher & Highlighter (Shade-02)" },
  { id: 12, name: "Pixi Blush", price:  799.00, image: "/images/Blush2.jpg",description:"PIXI On The Glow Blush (FLEUR)"}
];

// Define your unique headings here (one per row)
const rowHeadings = [
  "Concealer & Primer",
  "Compact Powder",
  "Blush"

];

const Face = () => {
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
                  onClick={() => handleViewDetails(product)}
                >
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
      <h2 className="top-heading">Foundation</h2>
      
      {rows}
    </section>
  );
};

export default Face;