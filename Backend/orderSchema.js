import mongoose, { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 }
}, { _id: false });

// Helpers for defaults
const generateOrderId = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD${year}${month}${day}${random}`;
};

const calculateEstimatedDelivery = () => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
  return deliveryDate;
};

const orderSchema = new Schema({
  userId: { type: String, required: true },
  orderId: { type: String, required: true, unique: true, default: generateOrderId },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  platformFee: { type: Number, default: 5 },
  finalAmount: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ["COD", "UPI"], 
    required: true 
  },
  paymentStatus: { 
    type: String, 
    enum: ["Pending", "Completed", "Failed"], 
    default: "Pending" 
  },
  orderStatus: { 
    type: String, 
    enum: ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"], 
    default: "Placed" 
  },
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    house: { type: String, required: true },
    area: { type: String, required: true },
    landmark: { type: String, default: "" },
    addressType: { type: String, enum: ["Home", "Work"], default: "Home" }
  },
  estimatedDelivery: { type: Date, default: calculateEstimatedDelivery },
  trackingNumber: { type: String, default: null },
  notes: { type: String, default: "" }
}, { timestamps: true });

const Order = model("Order", orderSchema);
export default Order;
