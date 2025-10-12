// frontend/services/api.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // backend base URL

// --- Auth APIs ---
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "Registration failed" };
  }
};

export const loginUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "Login failed" };
  }
};

export const fetchUser = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch {
    return null;
  }
};

// --- Orders API ---
export const getOrders = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.orders;
  } catch (error) {
    return [];
  }
};

// --- Cart APIs ---
export const getCartItems = async (customerID: string) => {
  try {
    const response = await axios.get(`${API_URL}/cart/${customerID}`);
    return response.data;
  } catch {
    return [];
  }
};

export const updateCartItemQty = async (customerID: string, itemId: string, qty: number) => {
  try {
    const response = await axios.put(`${API_URL}/cart/${customerID}/${itemId}`, { qty });
    return response.data;
  } catch {
    return null;
  }
};

export const removeCartItem = async (customerID: string, itemId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/${customerID}/${itemId}`);
    return response.data;
  } catch {
    return null;
  }
};

// Get user account info
export const getUserAccount = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/accounts/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch {
    return null;
  }
};
