import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../utils/toast";

const MyAccount = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    countryCode: "+91",
    gender: "Female",
    dob: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const navigate = useNavigate();

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Get user ID from localStorage (set during login)
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      
      if (!userId || !token) {
        setError("Please login to view your account");
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:4200/api/users/profile/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({
          name: data.user.name || "",
          email: data.user.email || "",
          mobile: data.user.mobile || "",
          countryCode: data.user.countryCode || "+91",
          gender: data.user.gender || "Female",
          dob: data.user.dob || ""
        });
        setEditData({
          name: data.user.name || "",
          mobile: data.user.mobile || "",
          countryCode: data.user.countryCode || "+91",
          gender: data.user.gender || "Female",
          dob: data.user.dob || ""
        });
      } else if (response.status === 401 || response.status === 403) {
        // Token is invalid or expired
        setError("Your session has expired. Please login again.");
        // Clear invalid data
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setLoading(false);
        // Redirect to login after a short delay
        setTimeout(() => navigate("/login"), 2000);
        return;
      } else {
        setError("Failed to fetch user data");
      }
    } catch (err) {
      setError("Error fetching user data");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: userData.name,
      mobile: userData.mobile,
      countryCode: userData.countryCode,
      gender: userData.gender,
      dob: userData.dob
    });
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');

      if (!userId || !token) {
        setError("Please login to update your account");
        return;
      }

      const response = await fetch(`http://localhost:4200/api/users/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({
          ...userData,
          ...editData
        });
        setIsEditing(false);
        toast.success("Account details updated successfully!");
      } else if (response.status === 401 || response.status === 403) {
        // Token is invalid or expired
        setError("Your session has expired. Please login again.");
        // Clear invalid data
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        // Redirect to login after a short delay
        setTimeout(() => navigate("/login"), 2000);
        return;
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update account");
      }
    } catch (err) {
      setError("Error updating account");
      console.error("Error:", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: userData.name,
      mobile: userData.mobile,
      countryCode: userData.countryCode,
      gender: userData.gender,
      dob: userData.dob
    });
  };

  const handleLogout = async () => {
    // Show confirmation dialog before deleting account
    const confirmDelete = window.confirm(
      "⚠️ WARNING: This will permanently delete your account and all your data!\n\n" +
      "This action cannot be undone. Are you sure you want to continue?"
    );

    if (!confirmDelete) {
      return; // User cancelled the deletion
    }

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');

      if (userId && token) {
        // Call backend delete account endpoint to remove user from MongoDB
        const response = await fetch(`http://localhost:4200/api/users/account/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          console.log("✅ Account deleted from MongoDB successfully");
          toast.success("Account deleted successfully. You have been logged out.");
        } else {
          console.log("⚠️ Account deletion failed, but continuing with frontend logout");
          toast.warning("Account deletion failed, but you have been logged out.");
        }
      }
    } catch (err) {
      console.log("⚠️ Error during account deletion:", err);
      toast.error("Error during account deletion, but you have been logged out.");
    } finally {
      // Clear user data from localStorage regardless of backend response
      localStorage.removeItem('userId');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      
      // Navigate to home page
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="myaccount-page">
        <div className="myaccount-container">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading your account...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !userData.email) {
    return (
      <div className="myaccount-page">
        <div className="myaccount-container">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'red' }}>{error}</p>
            <button 
              className="back-btn" 
              onClick={() => navigate("/login")}
              style={{ marginTop: '20px' }}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="myaccount-page">
      <div className="myaccount-container">
        <div className="myaccount-header">
          <h1>My Account</h1>
          <button className="back-btn" onClick={() => navigate("/Hfome")}>
            ← Back to Home
          </button>
        </div>

        {/* Profile Image */}
        <div className="profile-img">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" />
        </div>

        {/* Gender Selection */}
        <div className="gender-section">
          <label>Gender:</label>
          <div className="gender-options">
            <button
              className={editData.gender === "Male" ? "active" : ""}
              onClick={() => setEditData({...editData, gender: "Male"})}
              disabled={!isEditing}
            >
              ♂ Male
            </button>
            <button
              className={editData.gender === "Female" ? "active" : ""}
              onClick={() => setEditData({...editData, gender: "Female"})}
              disabled={!isEditing}
            >
              ♀ Female
            </button>
          </div>
        </div>

        {/* Full Name */}
        <label>Full Name</label>
        <input 
          type="text" 
          value={editData.name} 
          onChange={(e) => setEditData({...editData, name: e.target.value})}
          disabled={!isEditing}
        />

        {/* Phone Number */}
        <label>Phone Number</label>
        <div className="mobile-input">
          <select
            value={editData.countryCode}
            onChange={(e) => setEditData({...editData, countryCode: e.target.value})}
            disabled={!isEditing}
            style={{ width: '80px', padding: '8px', marginRight: '10px' }}
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          <input 
            type="text" 
            value={editData.mobile} 
            onChange={(e) => setEditData({...editData, mobile: e.target.value})}
            disabled={!isEditing}
            style={{ flex: 1 }}
          />
        </div>

        {/* Email */}
        <label>E-Mail Address</label>
        <div className="email-container">
          <input type="email" value={userData.email} readOnly />
          <span className="verified">Verified</span>
        </div>

        {/* DOB */}
        <label>DOB</label>
        <input
          type="date"
          value={editData.dob}
          onChange={(e) => setEditData({...editData, dob: e.target.value})}
          disabled={!isEditing}
        />

        {/* Action Buttons */}
        {!isEditing ? (
          <button className="done-btn" onClick={handleEdit}>
            EDIT PROFILE
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button className="done-btn" onClick={handleSave} style={{ flex: 1 }}>
              SAVE CHANGES
            </button>
            <button className="logout-btn" onClick={handleCancel} style={{ flex: 1 }}>
              CANCEL
            </button>
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Delete Account & Logout
        </button>
      </div>
    </div>
  );
};

export default MyAccount;