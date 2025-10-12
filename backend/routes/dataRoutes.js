import express from "express";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

const router = express.Router();

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

// Get single user by customerID
router.get("/users/:customerID", async (req, res) => {
  try {
    const user = await User.findOne({ customerID: req.params.customerID }).lean();
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
});

// Get cart by userId (or customerID param)
router.get("/cart/:customerID", async (req, res) => {
  try {
    const user = await User.findOne({ customerID: req.params.customerID });
    if (!user) return res.status(404).json({ message: "User not found" });

    const cart = await Cart.findOne({ userId: user._id }).populate("items.productId").lean();
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
});

// Get orders for user
router.get("/orders/:customerID", async (req, res) => {
  try {
    const user = await User.findOne({ customerID: req.params.customerID });
    if (!user) return res.status(404).json({ message: "User not found" });

    const orders = await Order.find({ userId: user._id }).sort({ date: -1 }).lean();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

export default router;
