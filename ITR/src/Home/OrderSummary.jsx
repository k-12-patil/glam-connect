import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSummary";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, address, cartItems, totalAmount: cartTotalAmount, fromCart } = location.state || {};
  const [quantity, setQuantity] = useState(1);

  if (!address) {
    return <h2>Missing address information</h2>;
  }

  if (!fromCart && !product) {
    return <h2>Missing product information</h2>;
  }

  // Convert "Rs. 450.00" → 450
  const parsePrice = (price) => {
    if (!price) return 0;
    return Number(String(price).replace(/[^0-9.]/g, ""));
  };

  // Handle cart purchase
  if (fromCart && cartItems) {
    const platformFee = 5;
    const totalAmount = cartTotalAmount + platformFee;

    const handleContinue = () => {
      navigate("/payment", {
        state: { cartItems, address, totalAmount, fromCart: true },
      });
    };

    return (
      <div className="order-container">
        <div className="step-indicator">
          <div className="step">1 Address</div>
          <div className="step active">2 Order Summary</div>
          <div className="step">3 Payment</div>
        </div>

        {/* Address */}
        <div className="address-section">
          <h3>
            {address.fullName} <span className="pincode">{address.pincode}</span>
          </h3>
          <p>{address.house}, {address.area}</p>
          <p>{address.city}, {address.state} - {address.pincode}</p>
          <p>{address.phone}</p>
          <p>Address Type: {address.addressType}</p>
          <button
            className="change-btn"
            onClick={() => navigate("/shopnow", { 
              state: { cartItems, totalAmount: cartTotalAmount, fromCart: true } 
            })}
          >
            Change
          </button>
        </div>

        {/* Cart Items */}
        <div className="order-section">
          <h4>Cart Items ({cartItems.length})</h4>
          {cartItems.map((item) => (
            <div key={item.id} className="order-details">
              <img src={item.image} alt={item.name} className="order-image" />
              <div className="order-info">
                <h4>{item.name}</h4>
                <div className="price">
                  <span className="new-price">₹{item.price * item.quantity}.00</span>
                </div>
                <p>Quantity: {item.quantity}</p>
                <h5>Delivery in 3-5 days</h5>
              </div>
            </div>
          ))}
        </div>

        {/* Price Details */}
        <div className="price-section">
          <h4>Price Details</h4>
          <div className="price-row">
            <span>Price ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
            <span>₹{cartTotalAmount}.00</span>
          </div>
          <div className="price-row">
            <span>Platform Fee</span>
            <span>₹{platformFee}.00</span>
          </div>
          <hr />
          <div className="total-row">
            <span>Total</span>
            <span>₹{totalAmount}.00</span>
          </div>
        </div>

        {/* Continue */}
        <div className="continue-section">
          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Handle single product purchase
  if (product) {
    // Numeric price values
    const numericPrice = parsePrice(product.price);

    // Calculate totals
    const productPrice = numericPrice * quantity;
    const platformFee = 5;
    const totalAmount = productPrice + platformFee;

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () =>
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleContinue = () => {
      navigate("/payment", {
        state: { product, address, quantity, totalAmount },
      });
    };

    return (
      <div className="order-container">
        <div className="step-indicator">
          <div className="step">1 Address</div>
          <div className="step active">2 Order Summary</div>
          <div className="step">3 Payment</div>
        </div>

        {/* Address */}
        <div className="address-section">
          <h3>
            {address.fullName} <span className="pincode">{address.pincode}</span>
          </h3>
          <p>{address.house}, {address.area}</p>
          <p>{address.city}, {address.state} - {address.pincode}</p>
          <p>{address.phone}</p>
          <p>Address Type: {address.addressType}</p>
          <button
            className="change-btn"
            onClick={() => navigate("/shopnow", { state: { product } })}
          >
            Change
          </button>
        </div>

        {/* Product */}
        <div className="order-section">
          <div className="order-details">
            <img src={product.image} alt={product.name} className="order-image" />
            <div className="order-info">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <div className="price">
                <span className="new-price">₹{productPrice}.00</span>
              </div>
              <h5>Delivery in 3-5 days</h5>

              {/* Quantity */}
              <div className="quantity-control">
                <button onClick={decreaseQuantity} className="qty-btn">-</button>
                <span className="qty">{quantity}</span>
                <button onClick={increaseQuantity} className="qty-btn">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="price-section">
          <h4>Price Details</h4>
          <div className="price-row">
            <span>Price ({quantity} item{quantity > 1 ? "s" : ""})</span>
            <span>₹{productPrice}.00</span>
          </div>
          <div className="price-row">
            <span>Platform Fee</span>
            <span>₹{platformFee}.00</span>
          </div>
          <hr />
          <div className="total-row">
            <span>Total</span>
            <span>₹{totalAmount}.00</span>
          </div>
        </div>

        {/* Continue */}
        <div className="continue-section">
          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  return <h2>Invalid order information</h2>;
};

export default OrderSummary;
