import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  unit: String,
  image: String,
  category: String,
  stock: { type: Number, default: 0 },
  tags: [String],
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
