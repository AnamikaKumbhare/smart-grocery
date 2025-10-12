import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  customerID: { type: String, index: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String },
  password: { type: String }, // hashed password if used
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
