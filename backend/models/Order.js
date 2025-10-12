import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  total: Number,
  status: {
    type: String,
    enum: ["Delivered", "Cancelled", "Pending"],
    default: "Pending"
  },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
      unit: String
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
