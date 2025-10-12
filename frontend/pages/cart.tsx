"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface UserAccount {
  name: string;
  customerID: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  unit: string;
}

const CartPage: React.FC = () => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // --- Login & Load Mock Data ---
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      // Mock cart items
      setCartItems([
        { id: 1, name: "Organic Red Apples", price: 90.0, qty: 2, unit: "kg" },
        { id: 2, name: "Sharp Cheddar Cheese (Shredded)", price: 349.05, qty: 1, unit: "pack" },
        { id: 3, name: "Italian Penne Pasta", price: 159.0, qty: 3, unit: "pkts" },
      ]);
    } else {
      alert("Please login first");
      window.location.href = "/auth";
    }
  }, []);

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  // --- Update Quantity ---
  const updateQuantity = (itemId: number, newQty: number) => {
    const MAX_QTY = 10;
    if (newQty <= 0) return removeItem(itemId);
    if (newQty > MAX_QTY) newQty = MAX_QTY;

    setCartItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, qty: newQty } : item))
    );
  };

  // --- Remove Item ---
  const removeItem = (itemId: number) => {
    const itemToRemove = cartItems.find(item => item.id === itemId);
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    if (itemToRemove) alert(`✅ Product removed: ${itemToRemove.name}`);
  };

  // --- Compute Totals ---
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const FREE_DELIVERY_THRESHOLD = 3000;
  const BASE_SHIPPING_CHARGE = 40;
  const shipping =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : cartItems.length === 0 ? 0 : BASE_SHIPPING_CHARGE;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />

      <main className="container py-5">
        <h2 className="mb-4 fw-bold text-center">🛒 Your Shopping Cart ({cartItems.length} items)</h2>
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm p-3">
              <div className="d-none d-md-flex row fw-bold border-bottom mb-2 pb-2 text-muted">
                <div className="col-md-5">Item</div>
                <div className="col-md-2 text-center">Price</div>
                <div className="col-md-2">Quantity</div>
                <div className="col-md-2 text-end">Subtotal</div>
                <div className="col-md-1"></div>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-center text-muted py-5">Your cart is empty!</p>
              ) : (
                cartItems.map(item => (
                  <div
                    key={item.id}
                    className="row align-items-center border-bottom py-3"
                  >
                    <div className="col-md-5 d-flex align-items-center mb-2 mb-md-0">
                      <i className="bi bi-bag-check fs-4 me-3 text-success"></i>
                      <span className="fw-bold">{item.name}</span>
                    </div>
                    <div className="col-md-2 col-4 text-center">
                      <span className="product-price">Rs {item.price.toFixed(2)}</span>
                    </div>
                    <div className="col-md-2 col-4">
                      <input
                        type="number"
                        className="form-control form-control-sm text-center"
                        value={item.qty}
                        min={1}
                        max={10}
                        onChange={e =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="col-md-2 col-4 text-end fw-bold">
                      Rs {(item.price * item.qty).toFixed(2)}
                    </div>
                    <div className="col-md-1 col-12 text-end mt-2 mt-md-0">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}

              <button
                className="btn btn-outline-info mt-4"
                onClick={() => window.location.href = "/dashboard"}
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card shadow-sm p-4 sticky-top" style={{ top: "20px" }}>
              <h4 className="fw-bold mb-3">Order Summary</h4>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item d-flex justify-content-between">
                  Subtotal: <span id="summary-subtotal">Rs {subtotal.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Shipping:{" "}
                  <span id="summary-shipping">
                    {shipping === 0 && subtotal > 0 ? (
                      <span className="text-success fw-bold">FREE! 🎉</span>
                    ) : cartItems.length === 0 ? (
                      <span className="text-secondary">N/A</span>
                    ) : (
                      `Rs ${shipping.toFixed(2)} (Add Rs ${(
                        FREE_DELIVERY_THRESHOLD - subtotal
                      ).toFixed(2)} for FREE)`
                    )}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Tax (5%): <span id="summary-tax">Rs {tax.toFixed(2)}</span>
                </li>
              </ul>
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total:</span>
                <span className="product-price" id="summary-total">
                  Rs {total.toFixed(2)}
                </span>
              </div>
              <button
                className="btn btn-lg btn-success w-100"
                onClick={() => alert("Simulate Payment Modal")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CartPage;
