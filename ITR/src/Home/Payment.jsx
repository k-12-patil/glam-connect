import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment";
import { orderManager } from "../utils/orderManager";
import { cartManager } from "../utils/cartManager";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Gather checkout context
  const {
    product,
    address,
    quantity = 1,
    totalAmount: stateTotalAmount = 0,
    cartItems,
    fromCart = false
  } = location.state || {};
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const toggleMethod = (method) => {
    setSelectedMethod(selectedMethod === method ? null : method);
  };

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
  };

  const buildOrderPayload = (paymentMethod) => {
    const platformFee = 5;

    let items = [];
    let subtotal = 0;

    if (fromCart && Array.isArray(cartItems) && cartItems.length > 0) {
      items = cartItems.map((item) => ({
        productId: String(item.id),
        productName: item.name,
        productPrice: parsePrice(item.price),
        productImage: item.image,
        quantity: item.quantity || 1
      }));
      subtotal = cartItems.reduce((sum, i) => sum + parsePrice(i.price) * (i.quantity || 1), 0);
    } else if (product) {
      items = [{
        productId: String(product.id),
        productName: product.name,
        productPrice: parsePrice(product.price),
        productImage: product.image,
        quantity: quantity || 1
      }];
      subtotal = parsePrice(product.price) * (quantity || 1);
    }

    const finalAmount = subtotal + platformFee;

    // Normalize address to only required fields
    const normalizedAddress = address ? {
      fullName: address.fullName,
      phone: address.phone,
      pincode: address.pincode,
      state: address.state,
      city: address.city,
      house: address.house,
      area: address.area,
      landmark: address.landmark || "",
      addressType: address.addressType || "Home"
    } : undefined;

    return {
      items,
      totalAmount: subtotal,
      finalAmount,
      paymentMethod,
      // Let backend default paymentStatus to Pending unless UPI success sets Completed
      shippingAddress: normalizedAddress,
      fromCart: !!fromCart
    };
  };

  const handleCODSelect = async () => {
    try {
      setError("");
      setPlacingOrder(true);
      if (!address) {
        throw new Error("Shipping address is missing. Please go back and select an address.");
      }
      const payload = buildOrderPayload("COD");
      await orderManager.createOrder(payload);
      if (fromCart) {
        await cartManager.clearCart();
      }
      setOrderPlaced(true);
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (e) {
      setError(e?.message || "Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleUPIClick = () => {
    const payload = buildOrderPayload("UPI");
    navigate("/upi", { state: { orderPayload: payload } });
  };
  // Optional: If page is refreshed and orderPlaced is true, still redirect
  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [orderPlaced, navigate]);

  return (
    <div className="payment-container">
      {/* Step Indicator */}
      <div className="step-indicator">
        <div className="step">1 Address</div>
        <div className="step">2 Order Summary</div>
        <div className="step active">3 Payment</div>
      </div>

      {/* Header */}
      <div className="payment-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h2>Payments</h2>
        <span className="secure-tag">100% Secure</span>
      </div>

      {/* Total Amount */}
      <div className="total-amount">
        <span>Total Amount</span>
        <span className="amount">₹{stateTotalAmount || (buildOrderPayload(selectedMethod || "COD").finalAmount)}.00</span>
      </div>

      {/* Payment Methods */}
      <div className="methods">
        {/* UPI */}
        <div className="method">
          <button className="method-btn" onClick= {handleUPIClick}>
            <span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg"
                alt="UPI"
                className="upi-icon"
              />{" "}
              UPI
            </span>
          </button>
        </div>

        {/* COD with Radio Button */}
        <div className="method">
          <button className="method-btn" onClick={() => toggleMethod("cod")}>
            <span>
              <input
                type="radio"
                name="paymentMethod"
                onChange={handleCODSelect}
                checked={selectedMethod === "cod"}
                style={{ marginRight: "8px" }}
                disabled={placingOrder}
              />
              💵 Cash on Delivery
            </span>
            <span>⌄</span>
          </button>
          {selectedMethod === "cod" && (
            <div className="method-body">
              Pay when you receive your order.
            </div>
          )}
        </div>
      </div>

      {/* Success Message */}
      {orderPlaced && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#d4edda",
            color: "#e91e63",
            borderRadius: "5px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ✅ Order Placed Successfully! Redirecting to Home...
        </div>
      )}
      {/* Error Message */}
      {!orderPlaced && error && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f8d7da",
            color: "#721c24",
            borderRadius: "5px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ❌ {error}
        </div>
      )}
    </div>
  );
}

export default Payment;
