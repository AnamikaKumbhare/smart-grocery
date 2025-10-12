import Account from "../models/Account.js";

// Get logged-in user account
export const getUserAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.user.id });
    if (!account) return res.status(404).json({ success: false, message: "Account not found" });
    res.json({ success: true, user: account });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch account" });
  }
};

// Seed mock account data (optional)
export const createMockAccount = async (req, res) => {
  try {
    const mockAccount = {
      userId: req.user.id,
      name: "Vansh M.",
      customerID: "CUST-8072",
      email: "vansh@example.com",
      phone: "9876543210"
    };
    await Account.create(mockAccount);
    res.json({ success: true, message: "Mock account created" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating mock account" });
  }
};
