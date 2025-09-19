import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose"; // MongoDB connection
import User from "./userSchema.js";    // User schema
import Cart from "./cartSchema.js";    // Cart schema
import Address from "./addressSchema.js";    // Address schema
import Order from "./orderSchema.js";    // Order schema
import cors from "cors";
import jwt from "jsonwebtoken";

const app=express();
app.use(express.json());
app.use(cors());

// JWT Secret (in production, use environment variable)
const JWT_SECRET = "your-secret-key-here";

// Store blacklisted tokens (in production, use Redis or database)
const blacklistedTokens = new Set();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  // Check if token is blacklisted
  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: "Token has been invalidated" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Fix MongoDB connection - use modern connection string format
try{
  await mongoose.connect("mongodb://127.0.0.1:27017/ITRDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ MongoDB connected");
}
 catch(err) {
  console.error("❌ MongoDB connection failed:", err);
  process.exit(1); // Stop server if DB is not connected
}

// ✅ Create account route
app.post("/api/users/register", async (req, res) => {
  const { email, name, password, countryCode, mobile } = req.body;

  try {
    console.log("📝 Received registration data:", { email, name, mobile, countryCode, passwordLength: password?.length });
    
    // Validation
    if (!email || !name || !password || !mobile) {
      console.log("❌ Validation failed - missing fields:", { email: !!email, name: !!name, password: !!password, mobile: !!mobile });
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user - fix field names to match schema
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      countryCode: countryCode || "+91",
      mobile,
    });

    console.log("💾 Attempting to save user:", { email, name, mobile });
    await newUser.save();
    console.log("✅ User saved successfully:", newUser._id);
    
    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({ 
      message: "User created successfully", 
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        countryCode: newUser.countryCode
      },
      token
    });
  } catch (err) {
    console.error("❌ Error in /create-account:", err); // ✅ Log the real error
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login route
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔐 Login attempt for:", email);
    
    // Validation
    if (!email || !password) {
      console.log("❌ Login validation failed - missing fields");
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("❌ Invalid password for user:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    console.log("✅ Login successful for:", email);
    res.status(200).json({ 
      message: "Login successful", 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        mobile: user.mobile,
        countryCode: user.countryCode
      },
      token
    });
  } catch (err) {
    console.error("❌ Error in /login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Logout route
app.post("/api/users/logout", authenticateToken, async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
      // Add token to blacklist
      blacklistedTokens.add(token);
      console.log("✅ User logged out successfully, token blacklisted");
    }
    
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("❌ Error in /logout:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get user profile route
app.get("/api/users/profile/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Verify the user is requesting their own profile
    if (req.user.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("❌ Error in /profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update user profile route
app.put("/api/users/profile/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, mobile, countryCode, gender, dob } = req.body;
    
    // Verify the user is updating their own profile
    if (req.user.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Validation
    if (!name || !mobile) {
      return res.status(400).json({ message: "Name and mobile are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, mobile, countryCode, gender, dob },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (err) {
    console.error("❌ Error in /profile update:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete user account route
app.delete("/api/users/account/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Verify the user is deleting their own account
    if (req.user.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Get the token to blacklist it
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
      // Add token to blacklist
      blacklistedTokens.add(token);
      console.log("✅ Token blacklisted for account deletion");
    }

    // Delete the user account from MongoDB
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Also delete the user's cart
    await Cart.findOneAndDelete({ userId });
    console.log("✅ User cart deleted from MongoDB");

    console.log("✅ User account deleted from MongoDB:", userId);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("❌ Error in /account deletion:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🛒 Cart Management Endpoints

// ✅ Add item to cart
app.post("/api/cart/add", authenticateToken, async (req, res) => {
  try {
    const { productId, productName, productPrice, productImage, quantity, size, color } = req.body;
    const userId = req.user.userId;

    // Validation
    if (!productId || !productName || !productPrice || !productImage) {
      return res.status(400).json({ message: "Missing required product information" });
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [],
        totalAmount: 0
      });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(item => 
      item.productId === productId && 
      item.size === (size || "M") && 
      item.color === (color || "Default")
    );

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      cart.items[existingItemIndex].quantity += (quantity || 1);
    } else {
      // Add new item
      cart.items.push({
        productId,
        productName,
        productPrice,
        productImage,
        quantity: quantity || 1,
        size: size || "M",
        color: color || "Default"
      });
    }

    // Calculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.productPrice * item.quantity);
    }, 0);

    await cart.save();
    console.log("✅ Item added to cart for user:", userId);

    res.status(200).json({ 
      message: "Item added to cart successfully", 
      cart: cart 
    });
  } catch (err) {
    console.error("❌ Error in /cart/add:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get user's cart
app.get("/api/cart", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      // Return empty cart
      return res.status(200).json({ 
        cart: { userId, items: [], totalAmount: 0 } 
      });
    }

    res.status(200).json({ cart });
  } catch (err) {
    console.error("❌ Error in /cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update cart item quantity
app.put("/api/cart/update/:productId", authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.userId;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    
    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.productPrice * item.quantity);
    }, 0);

    await cart.save();
    console.log("✅ Cart item quantity updated for user:", userId);

    res.status(200).json({ 
      message: "Cart updated successfully", 
      cart: cart 
    });
  } catch (err) {
    console.error("❌ Error in /cart/update:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Remove item from cart
app.delete("/api/cart/remove/:productId", authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove item
    cart.items.splice(itemIndex, 1);
    
    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + (item.productPrice * item.quantity);
    }, 0);

    await cart.save();
    console.log("✅ Item removed from cart for user:", userId);

    res.status(200).json({ 
      message: "Item removed from cart successfully", 
      cart: cart 
    });
  } catch (err) {
    console.error("❌ Error in /cart/remove:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Clear entire cart
app.delete("/api/cart/clear", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();
    
    console.log("✅ Cart cleared for user:", userId);

    res.status(200).json({ 
      message: "Cart cleared successfully", 
      cart: cart 
    });
  } catch (err) {
    console.error("❌ Error in /cart/clear:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🏠 Address Management Endpoints

// ✅ Add new address
app.post("/api/addresses", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fullName, phone, pincode, state, city, house, area, landmark, addressType } = req.body;

    // Validation
    if (!fullName || !phone || !pincode || !state || !city || !house || !area) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check if this address already exists for the user
    const existingAddress = await Address.findOne({
      userId,
      fullName,
      phone,
      pincode,
      house,
      area
    });

    if (existingAddress) {
      return res.status(400).json({ message: "This address already exists" });
    }

    // If this is the first address, make it default
    const userAddresses = await Address.find({ userId });
    const isDefault = userAddresses.length === 0;

    const newAddress = new Address({
      userId,
      fullName,
      phone,
      pincode,
      state,
      city,
      house,
      area,
      landmark: landmark || "",
      addressType: addressType || "Home",
      isDefault
    });

    await newAddress.save();
    console.log("✅ Address saved successfully for user:", userId);

    res.status(201).json({
      message: "Address added successfully",
      address: newAddress
    });
  } catch (err) {
    console.error("❌ Error in /addresses:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get user's addresses
app.get("/api/addresses", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const addresses = await Address.find({ userId }).sort({ isDefault: -1, createdAt: -1 });
    console.log("✅ Addresses retrieved for user:", userId);

    res.status(200).json({ addresses });
  } catch (err) {
    console.error("❌ Error in /addresses:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update address
app.put("/api/addresses/:addressId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { addressId } = req.params;
    const updateData = req.body;

    // Remove userId from update data to prevent unauthorized changes
    delete updateData.userId;

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    console.log("✅ Address updated successfully for user:", userId);

    res.status(200).json({
      message: "Address updated successfully",
      address
    });
  } catch (err) {
    console.error("❌ Error in /addresses/update:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete address
app.delete("/api/addresses/:addressId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { addressId } = req.params;

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // If deleted address was default, make another address default
    if (address.isDefault) {
      const nextAddress = await Address.findOne({ userId });
      if (nextAddress) {
        nextAddress.isDefault = true;
        await nextAddress.save();
        console.log("✅ New default address set for user:", userId);
      }
    }

    console.log("✅ Address deleted successfully for user:", userId);

    res.status(200).json({
      message: "Address deleted successfully"
    });
  } catch (err) {
    console.error("❌ Error in /addresses/delete:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Set default address
app.put("/api/addresses/:addressId/default", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { addressId } = req.params;

    // Remove default from all other addresses
    await Address.updateMany(
      { userId },
      { isDefault: false }
    );

    // Set this address as default
    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      { isDefault: true },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    console.log("✅ Default address set for user:", userId);

    res.status(200).json({
      message: "Default address set successfully",
      address
    });
  } catch (err) {
    console.error("❌ Error in /addresses/default:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📦 Order Management Endpoints

// ✅ Create new order
app.post("/api/orders", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      items: rawItems,
      totalAmount: rawTotalAmount,
      finalAmount: rawFinalAmount,
      paymentMethod,
      paymentStatus,
      shippingAddress,
      fromCart
    } = req.body || {};

    // Basic presence checks
    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }
    if (!shippingAddress ||
        !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.pincode ||
        !shippingAddress.state || !shippingAddress.city || !shippingAddress.house || !shippingAddress.area) {
      return res.status(400).json({ message: "Valid shipping address is required" });
    }
    if (!paymentMethod || !["COD", "UPI"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Valid payment method is required" });
    }

    // Normalize items to match schema & compute totals server-side
    const items = rawItems.map((it) => ({
      productId: String(it.productId),
      productName: it.productName,
      productPrice: Number(it.productPrice) || 0,
      productImage: it.productImage,
      quantity: Number(it.quantity) || 1
    }));

    const subtotal = items.reduce((sum, it) => sum + (it.productPrice * it.quantity), 0);
    const platformFee = 5;
    const computedFinal = subtotal + platformFee;

    const newOrder = new Order({
      userId,
      items,
      totalAmount: Number(rawTotalAmount) || subtotal,
      platformFee,
      finalAmount: Number(rawFinalAmount) || computedFinal,
      paymentMethod,
      paymentStatus: paymentStatus && ["Pending","Completed","Failed"].includes(paymentStatus)
        ? paymentStatus
        : undefined,
      shippingAddress
    });

    await newOrder.save();
    console.log("✅ Order created successfully for user:", userId, "OrderId:", newOrder.orderId);

    // If order is from cart, clear the cart
    if (fromCart) {
      try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
          cart.items = [];
          cart.totalAmount = 0;
          await cart.save();
          console.log("✅ Cart cleared after order placement for user:", userId);
        }
      } catch (cartError) {
        console.error("❌ Error clearing cart:", cartError);
        // Don't fail the order creation if cart clearing fails
      }
    }

    return res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder
    });
  } catch (err) {
    console.error("❌ Error in /api/orders:", err?.message, err);
    return res.status(500).json({ message: err?.message || "Server error" });
  }
});

// ✅ Get user's orders
app.get("/api/orders", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    console.log("✅ Orders retrieved for user:", userId);

    res.status(200).json({ orders });
  } catch (err) {
    console.error("❌ Error in /orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get specific order by ID
app.get("/api/orders/:orderId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("✅ Order retrieved for user:", userId);

    res.status(200).json({ order });
  } catch (err) {
    console.error("❌ Error in /orders/:orderId:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
const PORT = 4200;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});