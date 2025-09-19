// MyOrders.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaHome } from "react-icons/fa";
import { orderManager } from "../utils/orderManager";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load orders when component mounts
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const userOrders = await orderManager.getOrders();
      setOrders(userOrders);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnHome = () => {
    navigate("/Hfome");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDeliveryDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div style={{ fontSize: "24px", marginBottom: "20px" }}>🔄</div>
        <h3>Loading your orders...</h3>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div style={{ fontSize: "24px", marginBottom: "20px" }}>❌</div>
        <h3>Error loading orders</h3>
        <p style={{ color: "#666", marginBottom: "20px" }}>{error}</p>
        <button
          onClick={loadOrders}
          style={{
            padding: "10px 20px",
            backgroundColor: "#e91e63",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          Try Again
        </button>
        <button
          onClick={handleReturnHome}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Return Home
        </button>
      </div>
    );
  }

  // Show no orders state
  if (orders.length === 0) {
  return (
    <center>
    <div className="orders-container">
      <br/><br/>
      <FaBoxOpen size={100} color="#e91e63" />
      <br/>
      <h2 style={{ marginTop: "20px" }}>Hi! You have no recent orders.</h2>
          <p style={{ color: "#666", marginTop: "10px" }}>
            Start shopping to see your orders here!
          </p>

      <button
        onClick={handleReturnHome}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          backgroundColor: "#e91e63",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
            <FaHome style={{ marginRight: "8px" }} />
        Return to the Homepage
      </button>
      <br/>
    </div>
    </center>
    );
  }

  // Show orders
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "30px",
        padding: "20px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ margin: 0, color: "#333" }}>
          <FaBoxOpen style={{ marginRight: "15px", color: "#e91e63" }} />
          My Orders ({orders.length})
        </h1>
        <button
          onClick={handleReturnHome}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          <FaHome style={{ marginRight: "8px" }} />
          Return Home
        </button>
      </div>

      {/* Orders List */}
      <div style={{ marginBottom: "30px" }}>
        {orders.map((order) => {
          const orderStatus = orderManager.formatOrderStatus(order.orderStatus);
          const paymentStatus = orderManager.formatPaymentStatus(order.paymentStatus);
          const paymentMethod = orderManager.formatPaymentMethod(order.paymentMethod);
          
          return (
            <div key={order._id} style={{
              background: "white",
              padding: "25px",
              marginBottom: "20px",
              borderRadius: "15px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              border: "1px solid #e9ecef"
            }}>
              {/* Order Header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
                paddingBottom: "15px",
                borderBottom: "2px solid #f8f9fa"
              }}>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>
                    Order #{order.orderId}
                  </h3>
                  <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                    Placed on: {formatDate(order.createdAt)}
                  </p>
                  <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                    Estimated Delivery: {formatDeliveryDate(order.estimatedDelivery)}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    background: orderStatus.color,
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "8px"
                  }}>
                    {orderStatus.icon} {orderStatus.text}
                  </div>
                  <div style={{
                    background: paymentStatus.color,
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {paymentStatus.icon} {paymentStatus.text}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ margin: "0 0 15px 0", color: "#333" }}>
                  Order Items ({order.items.length})
                </h4>
                {order.items.map((item, index) => (
                  <div key={index} style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    background: "#f8f9fa",
                    borderRadius: "8px",
                    marginBottom: "10px"
                  }}>
                    <img 
                      src={item.productImage} 
                      alt={item.productName} 
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        marginRight: "15px"
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h5 style={{ margin: "0 0 5px 0", color: "#333" }}>
                        {item.productName}
                      </h5>
                      <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                        Quantity: {item.quantity}
                      </p>
                      <p style={{ margin: "5px 0", color: "#e91e63", fontWeight: "bold" }}>
                        ₹{item.productPrice}.00
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px"
              }}>
                {/* Shipping Address */}
                <div style={{
                  background: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "8px"
                }}>
                  <h5 style={{ margin: "0 0 10px 0", color: "#333" }}>
                    📍 Shipping Address
                  </h5>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                    <strong>{order.shippingAddress.fullName}</strong>
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                    {order.shippingAddress.house}, {order.shippingAddress.area}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                    📞 {order.shippingAddress.phone}
                  </p>
                </div>

                {/* Payment & Order Info */}
                <div style={{
                  background: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "8px"
                }}>
                  <h5 style={{ margin: "0 0 10px 0", color: "#333" }}>
                    💳 Payment Details
                  </h5>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                    <strong>Method:</strong> {paymentMethod.icon} {paymentMethod.text}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                    <strong>Subtotal:</strong> ₹{order.totalAmount}.00
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                    <strong>Platform Fee:</strong> ₹{order.platformFee}.00
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#e91e63", fontWeight: "bold" }}>
                    <strong>Total:</strong> ₹{order.finalAmount}.00
                  </p>
                </div>
              </div>

              {/* Order Message */}
              <div style={{
                background: "#e8f5e8",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #c3e6c3",
                textAlign: "center"
              }}>
                <p style={{ margin: 0, color: "#2d5a2d", fontWeight: "bold" }}>
                  🎉 Your order has been placed in your specified account!
                </p>
                <p style={{ margin: "5px 0 0 0", color: "#6c757d", fontSize: "14px" }}>
                  We'll keep you updated on your order status.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;