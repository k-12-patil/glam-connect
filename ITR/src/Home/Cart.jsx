import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartManager } from "../utils/cartManager";
import { toast } from "../utils/toast";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load cart data when component mounts
  useEffect(() => {
    loadCartData();
  }, []);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCartData();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCartData = async () => {
    setLoading(true);
    try {
      console.log('Loading cart data...');
      
      // Try to load from backend first, fallback to localStorage
      const cart = await cartManager.loadCartFromBackend();
      console.log('Cart data loaded:', cart);
      
      setCartItems(cart);
      setTotalAmount(cartManager.getCartTotal());
      
      console.log('Cart items set:', cart);
      console.log('Total amount:', cartManager.getCartTotal());
    } catch (error) {
      console.error("Error loading cart data:", error);
      // Fallback to localStorage
      const cart = cartManager.getCart();
      console.log('Fallback to localStorage cart:', cart);
      setCartItems(cart);
      setTotalAmount(cartManager.getCartTotal());
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const success = await cartManager.updateQuantity(itemId, newQuantity);
      if (success) {
        loadCartData();
      } else {
        toast.error("Failed to update quantity. Please try again.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Error updating quantity. Please try again.");
    }
  };

  const removeItem = async (itemId) => {
    try {
      const success = await cartManager.removeFromCart(itemId);
      if (success) {
        loadCartData();
      } else {
        toast.error("Failed to remove item. Please try again.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Error removing item. Please try again.");
    }
  };

  const clearCart = async () => {
    try {
      const success = await cartManager.clearCart();
      if (success) {
        loadCartData();
        toast.success("Cart cleared successfully!");
      } else {
        toast.error("Failed to clear cart. Please try again.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Error clearing cart. Please try again.");
    }
  };

  const handleStartShopping = () => {
    navigate("/Hfome");
  };

  // Show loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>Loading cart...</h3>
      </div>
    );
  }

  // If cart is empty, show empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="cart-container" style={{ textAlign: "center", padding: "50px" }}>
        <img
          src="/images/emptybag.webp"
          alt="Empty Bag"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <h4>Your Shopping Bag is Empty</h4>
        <h2>Add now, Buy Later</h2>
        <h2> Save your favourite beauty items here!</h2>
        
        <button
          className="Cartpro"
          onClick={handleStartShopping}
          style={{
            backgroundColor: "rgb(227, 73, 98)",
            color: "white",
            fontWeight: "bold",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // Show cart with items
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
        <h1 style={{ margin: 0, color: "#333" }}>Shopping Cart</h1>
        <button 
          onClick={clearCart}
          style={{
            background: "#dc3545",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items */}
      <div style={{ marginBottom: "30px" }}>
        {cartItems.map((item) => (
          <div key={item.id} style={{
            display: "flex",
            alignItems: "center",
            background: "white",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            position: "relative"
          }}>
            {/* Product Image */}
            <div style={{ width: "100px", height: "100px", marginRight: "20px" }}>
              <img 
                src={item.image} 
                alt={item.name} 
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />
            </div>
            
            {/* Product Details */}
            <div style={{ flex: 1, marginRight: "20px" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{item.name}</h3>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#e34962", margin: "5px 0" }}>
                ₹{item.price}
              </p>
            </div>

            {/* Quantity Controls */}
            <div style={{ marginRight: "20px", textAlign: "center" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#666" }}>
                Quantity:
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid #ddd",
                    background: item.quantity <= 1 ? "#f5f5f5" : "white",
                    borderRadius: "4px",
                    cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                    fontSize: "16px"
                  }}
                >
                  -
                </button>
                <span style={{ fontWeight: "bold", minWidth: "30px" }}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid #ddd",
                    background: "white",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px"
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Item Total */}
            <div style={{ marginRight: "20px", textAlign: "center", minWidth: "80px" }}>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#e34962", margin: 0 }}>
                ₹{item.price * item.quantity}
              </p>
            </div>

            {/* Remove Button */}
            <button 
              onClick={() => removeItem(item.id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "30px",
                height: "30px",
                border: "none",
                background: "#dc3545",
                color: "white",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: "1px solid #eee"
        }}>
          <span>Subtotal:</span>
          <span>₹{totalAmount}</span>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: "1px solid #eee"
        }}>
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0 10px 0",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#e34962"
        }}>
          <span>Total:</span>
          <span>₹{totalAmount}</span>
        </div>
        
        <button 
          onClick={() => navigate("/shopnow", { 
            state: { 
              cartItems: cartItems,
              totalAmount: totalAmount,
              fromCart: true 
            } 
          })}
          style={{
            width: "100%",
            background: "#e34962",
            color: "white",
            border: "none",
            padding: "15px",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            margin: "20px 0 10px 0"
          }}
        >
          Proceed to Address
        </button>
        
        <button 
          onClick={handleStartShopping}
          style={{
            width: "100%",
            background: "#6c757d",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
