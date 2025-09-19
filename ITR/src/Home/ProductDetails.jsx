import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa"; // ⭐ & ❤️ icons
import { cartManager } from "../utils/cartManager";
import { toast } from "../utils/toast";
import "./ProductDetails";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [rating, setRating] = useState(0); // ⭐ state
  const [liked, setLiked] = useState(false); // ❤️ state
  const [addingToCart, setAddingToCart] = useState(false); // Loading state for cart

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const parsePrice = (price) => {
    if (!price) return 0;
    return Number(String(price).replace(/[^0-9.]/g, ""));
  };

  const numericPrice = parsePrice(product.price);
  const numericOldPrice = parsePrice(product.oldPrice);

  const handleShopNow = () => {
    navigate("/shopnow", { 
      state: { 
        product: { 
          ...product, 
          price: numericPrice, 
          oldPrice: numericOldPrice 
        } 
      } 
    });
  };

  const handleAddToCart = async () => {
    if (addingToCart) return; // Prevent multiple clicks
    
    setAddingToCart(true);
    try {
      const success = await cartManager.addToCart(product);
      if (success) {
        toast.success(`${product.name} added to cart successfully!`);
        // Dispatch event to update cart count in navbar if needed
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      } else {
        toast.error("Failed to add item to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding item to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="product-page">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-details-container">
        <h1>{product.name}</h1>
        <br />
        <h3>{product.description}</h3>

        <br></br>
        <b><p>Rs.{numericPrice}.00</p></b>

        {/* ⭐ Ratings */}
        <div className="ratings-container">
          <strong>Ratings: </strong>
          {[1, 2, 3, 4, 5].map((star) =>
            star <= rating ? (
              <FaStar
                key={star}
                className="star filled"
                onClick={() => setRating(star)}
              />
            ) : (
              <FaRegStar
                key={star}
                className="star"
                onClick={() => setRating(star)}
              />
            )
          )}

          {/* ❤️ Like Button */}
          <span
            className="heart-icon"
            onClick={() => setLiked(!liked)}
            style={{ cursor: "pointer", marginLeft: "15px" }}
          >
            {liked ? (
              <FaHeart style={{ color: "pink", fontSize: "20px" }} />
            ) : (
              <FaRegHeart style={{ fontSize: "20px" }} />
            )}
          </span>
        </div>

        <br />
        
        <div className="trust-badges">
          <span>✅ 100% Genuine</span>
          <span>🔄 Easy Returns</span>
          <span>🔒 Secure Payment</span>
        </div>

        <div className="button-group">
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            disabled={addingToCart}
            style={{
              opacity: addingToCart ? 0.7 : 1,
              cursor: addingToCart ? 'not-allowed' : 'pointer'
            }}
          >
            {addingToCart ? '🔄 Adding...' : '🛒 Add to Cart'}
          </button>
          <button className="shop-now-btn" onClick={handleShopNow}>
            ⚡ Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;