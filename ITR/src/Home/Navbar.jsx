import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaClipboardList, FaUser, FaSearch ,FaHome} from "react-icons/fa";

const Navbar = ({ showSearch, setShowSearch }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  // Load cart count when component mounts
  useEffect(() => {
    loadCartCount();
  }, []);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(totalItems);
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <ul>
            <li>
              <Link to="/" className="logo">Glam Connect</Link>
            </li>
          </ul>
        </div>
        <ul className="nav-links">
          {/* Search */}
          <li>
            <button
              className="icon-link search-icon"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch size={18} />
            </button>
          </li>

          {/* Home */}
          <li><Link to="/Hfome" className="nav-link"><FaHome size={18}/></Link></li>

          {/* Orders */}
          <li>
            <Link to="/Orders" className="icon-link"><FaClipboardList size={18} /></Link>
          </li>

          {/* Cart */}
          <li>
            <Link to="/Cart" className="icon-link" style={{ position: "relative" }}>
              <FaShoppingCart size={18} />
              {cartItemCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "#e34962",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}>
                  {cartItemCount}
                </span>
              )}
            </Link>
          </li>

          {/* My Account (separate page) */}
          <li>
            <Link to="/Myaccount" className="icon-link">
              <FaUser size={18} />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

