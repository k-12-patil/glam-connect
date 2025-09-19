import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { orderManager } from "../utils/orderManager";
import { cartManager } from "../utils/cartManager";

const UpiPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderPayload } = location.state || {};
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const handleDone = async () => {
    if (!orderPayload) {
      setError("Missing order data. Please go back and try again.");
      return;
    }
    try {
      setPlacing(true);
      setError("");
      const order = await orderManager.createOrder({
        ...orderPayload,
        // Mark payment completed for UPI success path
        paymentStatus: "Completed"
      });
      if (orderPayload.fromCart) {
        await cartManager.clearCart();
      }
      setOrderPlaced(true);
    } catch (e) {
      setError(e?.message || "Payment success acknowledged but order creation failed.");
    } finally {
      setPlacing(false);
    }
  };

  // Redirect after 2 seconds if order is placed
  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => {
        navigate("/orders");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [orderPlaced, navigate]);

  return (
    <div className="upi-container" style={{ textAlign: "center", padding: "40px" }}>
      <h2>Scan to Pay</h2>
      <img
        src="/images/Upiscanner.jpeg" // assuming it's in public/images
        alt="UPI QR Scanner"
        className="upi-image"
        style={{ maxWidth: "300px", width: "100%", marginBottom: "20px" }}
      />
      
      {!orderPlaced ? (
        <>
          <button className="done-button" onClick={handleDone} disabled={placing}>
            {placing ? "Placing order..." : "✅ Done"}
          </button>
          {error && (
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
        </>
      ) : (
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
          ✅ Order placed successfully! Redirecting to Home...
        </div>
      )}
    </div>
  );
};

export default UpiPayment;
