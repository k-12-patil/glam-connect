import mongoose, { Schema, model } from "mongoose";

const addressSchema = new Schema({
  userId: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  house: { type: String, required: true },
  area: { type: String, required: true },
  landmark: { type: String, default: "" },
  addressType: { type: String, enum: ["Home", "Work"], default: "Home" },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

// Compound index to ensure unique addresses per user
addressSchema.index({ userId: 1, fullName: 1, phone: 1, pincode: 1, house: 1, area: 1 });

const Address = model("Address", addressSchema);
export default Address;
