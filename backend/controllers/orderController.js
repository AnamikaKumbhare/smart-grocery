import Order from "../models/Order.js";

// 🧾 Fetch all orders for the logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId; // can be from JWT or params
    if (!userId)
      return res.status(400).json({ success: false, message: "User ID missing" });

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch orders", error: error.message });
  }
};

// 🧪 Seed mock orders (for testing)
export const createMockOrder = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId; // fallback for manual testing

    if (!userId)
      return res.status(400).json({ success: false, message: "User ID required" });

    const mockOrders = [
      {
        userId,
        orderId: "ORD-10045",
        total: 680.5,
        status: "Delivered",
        items: [
          { name: "Organic Red Apples", price: 90, qty: 2, unit: "kg" },
          { name: "Cheddar Cheese", price: 349, qty: 1, unit: "pack" },
        ],
      },
      {
        userId,
        orderId: "ORD-10046",
        total: 1250,
        status: "Delivered",
        items: [{ name: "Pasta", price: 159, qty: 3, unit: "pack" }],
      },
    ];

    await Order.insertMany(mockOrders);
    res.json({ success: true, message: "Mock orders created successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating mock orders",
      error: error.message,
    });
  }
};
