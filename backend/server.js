import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import accountsRoutes from "./routes/accountsRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";

dotenv.config();
const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/accounts", accountsRoutes);
app.use("/api", dataRoutes);

// Health check
app.get("/", (req, res) => res.send("Grocery Backend API Running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
