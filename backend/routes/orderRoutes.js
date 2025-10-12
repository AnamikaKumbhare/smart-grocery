import express from "express";
import { getUserOrders, createMockOrder } from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Fetch all orders for logged-in user
router.get("/", protect, getUserOrders);

// ✅ Seed mock orders for testing (optional)
router.post("/mock", protect, createMockOrder);

export default router;
