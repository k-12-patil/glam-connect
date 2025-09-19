import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addressManager } from "./utils/addressManager";
import { toast } from "./utils/toast";
import "./ShopNow";

const ShopNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const cartItems = location.state?.cartItems;
  const totalAmount = location.state?.totalAmount;
  const fromCart = location.state?.fromCart;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    house: "",
    area: "",
    landmark: "",
    addressType: "Home",
  });
  const [saving, setSaving] = useState(false);
  const [existingAddresses, setExistingAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  // Load existing addresses when component mounts
  useEffect(() => {
    loadExistingAddresses();
  }, []);

  // No automatic redirect - let user choose to edit or use existing address

  const loadExistingAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const addresses = await addressManager.getAddresses();
      setExistingAddresses(addresses);
    } catch (error) {
      console.error('Error loading addresses:', error);
      // Don't show error to user, just log it
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const useExistingAddress = (address) => {
    setForm({
      fullName: address.fullName,
      phone: address.phone,
      pincode: address.pincode,
      state: address.state,
      city: address.city,
      house: address.house,
      area: address.area,
      landmark: address.landmark || "",
      addressType: address.addressType
    });
  };

  const useExistingAddressForOrder = (address) => {
    // Navigate directly to order summary using existing address
    if (fromCart && cartItems) {
      navigate("/ordersummary", {
        state: { 
          cartItems: cartItems, 
          totalAmount: totalAmount,
          address: address,
          fromCart: true
        },
      });
    } else if (product) {
      navigate("/ordersummary", {
        state: { product, address: address, quantity: 1 },
      });
    }
  };

  const saveAddressToBackend = async (addressData) => {
    try {
      return await addressManager.addAddress(addressData);
    } catch (error) {
      console.error('Error saving address:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (
      !form.fullName ||
      !form.phone ||
      !form.pincode ||
      !form.state ||
      !form.city ||
      !form.house ||
      !form.area
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      // Save address to backend
      const savedAddress = await saveAddressToBackend(form);
      console.log('Address saved to backend:', savedAddress);

      if (fromCart && cartItems) {
        // Navigate to order summary with cart data
        navigate("/ordersummary", {
          state: { 
            cartItems: cartItems, 
            totalAmount: totalAmount,
            address: savedAddress,
            fromCart: true
          },
        });
      } else if (product) {
        // Navigate to order summary with single product
        navigate("/ordersummary", {
          state: { product, address: savedAddress, quantity: 1 },
        });
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error(`Failed to save address: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Show loading state while checking for existing addresses
  if (loadingAddresses) {
    return (
      <div className="address-container">
        <div className="step-indicator">
          <div className="step active">1 Address</div>
          <div className="step">2 Order Summary</div>
          <div className="step">3 Payment</div>
        </div>
        
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div style={{ fontSize: '24px', marginBottom: '20px' }}>🔄</div>
          <h3>Checking for existing addresses...</h3>
          <p style={{ color: '#666' }}>Please wait while we load your saved addresses.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="address-container">
      <div className="step-indicator">
        <div className="step active">1 Address</div>
        <div className="step">2 Order Summary</div>
        <div className="step">3 Payment</div>
      </div>

      {/* Show different heading based on whether it's from cart or single product */}
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#e34962' }}>
        {fromCart ? 'Shipping Address for Cart Items' : 'Shipping Address'}
      </h2>
      
      {/* Show message if user has existing addresses */}
      {existingAddresses.length > 0 && (
        <div style={{ 
          background: '#e8f5e8', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '1px solid #c3e6c3',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0 0 10px 0', color: '#2d5a2d', fontWeight: 'bold' }}>
            🎯 You have {existingAddresses.length} saved address{existingAddresses.length > 1 ? 'es' : ''}!
          </p>
          <p style={{ margin: '5px 0 0 0', color: '#6c757d', fontSize: '14px' }}>
            You can use an existing address or edit/create a new one below.
          </p>
        </div>
      )}
      
      {/* Show cart summary if coming from cart */}
      {fromCart && cartItems && (
        <div style={{ 
          background: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>Cart Summary</h4>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>Items:</strong> {cartItems.length} product{cartItems.length > 1 ? 's' : ''}
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>Total:</strong> ₹{totalAmount}.00
          </p>
        </div>
      )}

      {/* Show existing addresses if available */}
      {existingAddresses.length > 0 && (
        <div style={{ 
          background: '#e8f5e8', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '1px solid #c3e6c3'
        }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#2d5a2d' }}>
            📍 Saved Addresses
          </h4>
          {loadingAddresses ? (
            <p style={{ margin: 0, color: '#666' }}>Loading addresses...</p>
          ) : (
                         existingAddresses.map((address, index) => (
               <div key={address._id || index} style={{
                 background: 'white',
                 padding: '15px',
                 borderRadius: '8px',
                 marginBottom: '15px',
                 border: '1px solid #ddd',
                 transition: 'all 0.2s ease'
               }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                   <div>
                     <strong style={{ fontSize: '16px' }}>{address.fullName}</strong>
                     {address.isDefault && (
                       <span style={{
                         background: '#28a745',
                         color: 'white',
                         fontSize: '12px',
                         padding: '2px 8px',
                         borderRadius: '12px',
                         marginLeft: '10px'
                       }}>
                         Default
                       </span>
                     )}
                   </div>
                   <span style={{ color: '#666', fontSize: '16px' }}>
                     {address.addressType === 'Home' ? '🏠' : '🏢'}
                   </span>
                 </div>
                 <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                   {address.house}, {address.area}
                 </p>
                 <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                   {address.city}, {address.state} - {address.pincode}
                 </p>
                 <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
                   📞 {address.phone}
                 </p>
                 
                 {/* Action Buttons */}
                 <div style={{ 
                   display: 'flex', 
                   gap: '10px', 
                   marginTop: '15px',
                   justifyContent: 'flex-end'
                 }}>
                   <button
                     onClick={() => useExistingAddress(address)}
                     style={{
                       background: '#17a2b8',
                       color: 'white',
                       border: 'none',
                       padding: '8px 16px',
                       borderRadius: '6px',
                       cursor: 'pointer',
                       fontSize: '14px',
                       transition: 'all 0.2s ease'
                     }}
                     onMouseEnter={(e) => e.target.style.background = '#138496'}
                     onMouseLeave={(e) => e.target.style.background = '#17a2b8'}
                   >
                     ✏️ Edit
                   </button>
                   <button
                     onClick={() => useExistingAddressForOrder(address)}
                     style={{
                       background: '#28a745',
                       color: 'white',
                       border: 'none',
                       padding: '8px 16px',
                       borderRadius: '6px',
                       cursor: 'pointer',
                       fontSize: '14px',
                       transition: 'all 0.2s ease'
                     }}
                     onMouseEnter={(e) => e.target.style.background = '#218838'}
                     onMouseLeave={(e) => e.target.style.background = '#28a745'}
                   >
                     ✅ Use This Address
                   </button>
                 </div>
               </div>
             ))
          )}
        </div>
      )}

      {/* New Address Form Section */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        border: '1px solid #e9ecef'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>
          📝 {existingAddresses.length > 0 ? 'Add New Address or Edit Above' : 'Add New Address'}
        </h4>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#6c757d' }}>
          {existingAddresses.length > 0 
            ? 'Fill the form below to create a new address, or use the edit button above to modify an existing one.'
            : 'Please fill in your shipping address details below.'
          }
        </p>
      </div>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name (Required)*"
        value={form.fullName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone number (Required) *"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        type="text"
        name="pincode"
        placeholder="Pincode (Required) *"
        value={form.pincode}
        onChange={handleChange}
      />
      <div className="row">
  <select
    name="state"
    value={form.state}
    onChange={handleChange}
    required
  >
    <option value="">Select State *</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Delhi">Delhi</option>
    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
    <option value="Ladakh">Ladakh</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </select>
       <input
          type="text"
          name="city"
          placeholder="City (Required) *"
          value={form.city}
          onChange={handleChange}
        />
      </div>

      <input
        type="text"
        name="house"
        placeholder="House No., Building Name (Required) *"
        value={form.house}
        onChange={handleChange}
      />
      <input
        type="text"
        name="area"
        placeholder="Road name, Area, Colony (Required) *"
        value={form.area}
        onChange={handleChange}
      />

      <div className="address-type">
        <label>
          <input
            type="radio"
            name="addressType"
            value="Home"
            checked={form.addressType === "Home"}
            onChange={handleChange}
          />
          🏠 Home
        </label>
        <label>
          <input
            type="radio"
            name="addressType"
            value="Work"
            checked={form.addressType === "Work"}
            onChange={handleChange}
          />
          🏢 Work
        </label>
      </div>

      <button 
        className="save-btn" 
        onClick={handleSave}
        disabled={saving}
        style={{
          opacity: saving ? 0.7 : 1,
          cursor: saving ? 'not-allowed' : 'pointer'
        }}
      >
        {saving ? '🔄 Saving Address...' : 'Save Address'}
      </button>
    </div>
  );
};

export default ShopNow;
