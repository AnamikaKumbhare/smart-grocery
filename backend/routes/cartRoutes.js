// routes/cartRoutes.js
import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// ✅ GET all cart items for a specific user
router.get("/:customerID", async (req, res) => {
  try {
    const { customerID } = req.params;
    const cart = await Cart.findOne({ customerID });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ ADD item to cart
router.post("/", async (req, res) => {
  try {
    const { customerID, item } = req.body;
    let cart = await Cart.findOne({ customerID });

    if (!cart) {
      cart = new Cart({ customerID, items: [item] });
    } else {
      cart.items.push(item);
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ UPDATE quantity or details of an item
router.put("/:customerID/:itemId", async (req, res) => {
  try {
    const { customerID, itemId } = req.params;
    const { qty } = req.body;

    const cart = await Cart.findOne({ customerID });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ REMOVE item from cart
router.delete("/:customerID/:itemId", async (req, res) => {
  try {
    const { customerID, itemId } = req.params;
    const cart = await Cart.findOne({ customerID });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
