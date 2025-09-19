import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Products from "./Products";
import Footer from "./Footer";
import Login from "./Login";
import Lips from "./Home/Lips";
import Eyes from "./Home/Eyes";
import Face from "./Home/Face";
import New from "./Home/new";
import CreateAccount from "./CreateAccount";
import Hfome from "./Home/Hfome";
import About from "./Home/About";
import MyOrders from "./Home/Orders";
import Cart from "./Home/Cart";
import ShopNow from "./ShopNow";
import OrderSummary from "./Home/OrderSummary";
import Payment from "./Home/Payment";
import SearchBar from "./SearchBar";
import ProductDetails from "./Home/ProductDetails";
import Bestsellers from "./Home/BestSellers";
import Myaccount from "./Home/Myaccount"; 
import UpiPayment from "./Home/UpiPayment";// ✅ Import MyAccount
import "./Style.css";
import ReactDOM from "react-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

// Simple Toast Provider
const ToastContainer = () => {
  const [toasts, setToasts] = React.useState([]);
  React.useEffect(() => {
    const handler = (e) => {
      const { message, type = 'info', durationMs = 3000 } = e.detail || {};
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), durationMs);
    };
    window.addEventListener('app:toast', handler);
    return () => window.removeEventListener('app:toast', handler);
  }, []);
  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          minWidth: 240,
          maxWidth: 420,
          padding: '12px 14px',
          borderRadius: 8,
          color: '#fff',
          background: t.type === 'success' ? '#1e992aff' : t.type === 'error' ? '#dc3545' : t.type === 'warning' ? '#ffc107' : '#17a2b8',
          boxShadow: '0 6px 20px rgba(31, 165, 49, 0.15)'
        }}>
          {t.message}
        </div>
      ))}
    </div>,
    document.body
  );
};

const Layout = ({ showSearch, setShowSearch }) => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/create-account";

  return (
    <>
      {/* Navbar (hidden on auth pages) */}
      {!isAuthPage && (
        <Navbar showSearch={showSearch} setShowSearch={setShowSearch} />
      )}

      {/* Search Bar */}
      {showSearch && !isAuthPage && (
        <SearchBar setShowSearch={setShowSearch} />
      )}

      <Routes>
        {/* Home page (public) */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Bestsellers />
            </>
          }
        />

        {/* Product Details */}
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />

        {/* Categories */}
        <Route path="/hfome" element={<Hfome />} />
        <Route path="/category/lips" element={<Lips />} />
        <Route path="/category/eyes" element={<Eyes />} />
        <Route path="/category/face" element={<Face />} />
        <Route path="/category/new" element={<New />} />

        {/* Orders, Cart, My Account, About */}
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myaccount" element={<Myaccount />} /> {/* ✅ Enabled */}
        <Route path="/about" element={<About />} />

        {/* Shopping & Checkout */}
        <Route path="/shopnow" element={<ShopNow />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/upi" element={<UpiPayment />} />

        {/* Products list */}
        <Route path="/products" element={<Products />} />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "2rem" }}>
              404 - Page Not Found
            </div>
          }
        />
      </Routes>

      {/* Footer */}
      {!isAuthPage && <Footer />}

      {/* Auth page footer */}
      {isAuthPage && (
        <footer style={{ textAlign: "center", padding: "20px", color: "#555" }}>
          © Glam Connect {pathname === "/login" ? "Login" : "Create Account"} - 2025
        </footer>
      )}
    </>
  );
};

const App = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <BrowserRouter>
      <Layout showSearch={showSearch} setShowSearch={setShowSearch} />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
