import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Data from "./Data";
import { cartManager } from "./utils/cartManager";
import { toast } from "./utils/toast";

const SearchBar = ({ setShowSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredData = Data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    setShowSearch(false); // ✅ Close search bar
    navigate("/productdetails", { state: { product } });
    setSearchTerm("");
  };

  const handleAddToCart = async (product, event) => {
    event.stopPropagation(); // Prevent navigation when clicking Add to Cart
    
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');
    
    if (!userId || !token) {
      toast.warning("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      const success = await cartManager.addToCart(product);
      if (success) {
        toast.success(`${product.name} added to cart successfully!`);
        // Dispatch event to update cart count in navbar
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      } else {
        toast.error("Failed to add item to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding item to cart. Please try again.");
    }
  };

  return (
    <div className="search-section" style={{ padding: "20px" }}>
      <div className="search-container" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            border: "2px solid pink",
            borderRadius: "5px",
            outline: "none",
          }}
        />
      </div>

      <div
        className="product-list"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <div
              key={product.id}
              className="product-card"
              style={{
                border: "1px solid #f4ececff",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
                width: "200px",
                cursor: "pointer",
              }}
            >
              <div onClick={() => handleProductClick(product)}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
                <h3 style={{ fontSize: "16px" }}>{product.name}</h3>
                <p style={{ color: "gray" }}>Rs.{product.price}.00</p>
              </div>
  
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;