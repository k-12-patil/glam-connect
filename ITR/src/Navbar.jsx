import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaClipboardList, FaUser, FaSearch ,FaHome} from "react-icons/fa";
import { cartManager } from "./utils/cartManager";
import { toast } from "./utils/toast";

const Navbar = ({ showSearch, setShowSearch }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  // Update cart count when component mounts and when cart updates
  useEffect(() => {
    const updateCartCount = () => {
      const count = cartManager.getCartItemCount();
      setCartItemCount(count);
    };

    // Initial load
    updateCartCount();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

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

          {/* Home (requires login to go to Hfome) */}
          <li>
            <button
              className="nav-link"
              onClick={() => {
                const token = localStorage.getItem('userToken');
                if (!token) { toast.warning('Please login to continue'); navigate('/login'); return; }
                navigate('/Hfome');
              }}
            >
              <FaHome size={18}/>
            </button>
          </li>

          {/* Orders */}
          <li>
            <button
              className="icon-link"
              onClick={() => {
                const token = localStorage.getItem('userToken');
                if (!token) { toast.warning('Please login to continue'); navigate('/login'); return; }
                navigate('/Orders');
              }}
            >
              <FaClipboardList size={18} />
            </button>
          </li>

          {/* Cart */}
          <li>
            <button
              className="icon-link"
              style={{ position: 'relative' }}
              onClick={() => {
                const token = localStorage.getItem('userToken');
                if (!token) { toast.warning('Please login to continue'); navigate('/login'); return; }
                navigate('/Cart');
              }}
            >
              <FaShoppingCart size={18} />
              {cartItemCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#e34962',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {cartItemCount}
                </span>
              )}
            </button>
          </li>

          {/* My Account (separate page) */}
          <li>
            <button
              className="icon-link"
              onClick={() => {
                const token = localStorage.getItem('userToken');
                if (!token) { toast.warning('Please login to continue'); navigate('/login'); return; }
                navigate('/Myaccount');
              }}
            >
              <FaUser size={18} />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
