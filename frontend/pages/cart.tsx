import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCartItems, updateCartItemQty, removeCartItem } from "../services/api";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  qty: number;
  unit: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }
    fetchCart();
  }, []);

  const customerID = "CUST-8072"; // Demo user

  const fetchCart = async () => {
    setLoading(true);
    const data = await getCartItems(customerID);
    setCartItems(data);
    setLoading(false);
  };

  const handleQtyChange = async (itemId: string, qty: number) => {
    await updateCartItemQty(customerID, itemId, qty);
    fetchCart();
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeCartItem(customerID, itemId);
    fetchCart();
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <Header />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">🛒 My Cart</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Item</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Subtotal (₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        value={item.qty}
                        min={1}
                        onChange={(e) => handleQtyChange(item._id, Number(e.target.value))}
                        className="form-control"
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>{item.unit}</td>
                    <td>{(item.price * item.qty).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-end mt-3">
              <h5>Total: ₹{total.toFixed(2)}</h5>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
