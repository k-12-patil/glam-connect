import mongoose,{Schema,model} from "mongoose";

const userSchema = new Schema
(
    {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  countryCode: { type: String, default: "+91" },
  gender: { type: String, enum: ["Male", "Female"], default: "Female" },
  dob: { type: Date },
}, 
{ timestamps: true });

const User = model("Users", userSchema);
export default User;
