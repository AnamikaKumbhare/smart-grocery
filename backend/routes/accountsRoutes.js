import express from "express";
import { getUserAccount, createMockAccount } from "../controllers/accountsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getUserAccount);
router.post("/mock", protect, createMockAccount); // optional for testing

export default router;
