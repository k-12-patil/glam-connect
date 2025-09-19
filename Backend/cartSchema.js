import mongoose, { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  size: { type: String, default: "M" },
  color: { type: String, default: "Default" }
}, { timestamps: true });

const cartSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
  totalAmount: { type: Number, default: 0 }
}, { timestamps: true });

const Cart = model("Cart", cartSchema);
export default Cart;

