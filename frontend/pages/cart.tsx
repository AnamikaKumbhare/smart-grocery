"use client";
import React, { useEffect, useState } from "react";

interface UserAccount {
  name: string;
  customerID: string;
  email: string;
  phone: string;
}

interface CartItem {
  name: string;
  price: string;
  qty: number;
  img: string;
  badge: string;
}

const Header = () => (
  <header style={{ backgroundColor: "#007bff", color: "white", padding: "16px 0" }}>
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", cursor: "pointer" }} onClick={() => window.location.href = "/dashboard"}>
          GroceryMart
        </h1>
        <nav style={{ display: "flex", gap: "16px" }}>
          <a href="/dashboard" style={{ color: "white", textDecoration: "none" }}>Home</a>
          <a href="/cart" style={{ color: "white", textDecoration: "none" }}>Cart</a>
          <a href="/accounts" style={{ color: "white", textDecoration: "none" }}>Account</a>
        </nav>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer style={{ backgroundColor: "#343a40", color: "white", padding: "24px 0", marginTop: "48px" }}>
    <div className="container text-center">
      <p style={{ margin: 0 }}>© 2025 GroceryMart. All rights reserved.</p>
    </div>
  </footer>
);

const CartPage: React.FC = () => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("Please login first");
      window.location.href = "/auth";
    }

    const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const formatted = storedCart.map((p: CartItem) => ({
      ...p,
      qty: p.qty || 1,
    }));
    setCartItems(formatted);
  }, []);

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  const parsePrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  };

  const updateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(index);
    } else {
      const updated = [...cartItems];
      updated[index].qty = newQty;
      setCartItems(updated);
      localStorage.setItem("cartItems", JSON.stringify(updated));
    }
  };

  const removeItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
  const tax = subtotal * 0.05;
  const shipping = subtotal > 3000 ? 0 : subtotal === 0 ? 0 : 40;
  const total = subtotal + tax + shipping;

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentConfirmation = () => {
    if (!transactionId.trim()) {
      alert("Please enter the UPI Transaction ID");
      return;
    }

    // Send email notification (simulated)
    const orderDetails = {
      customerName: user.name,
      customerId: user.customerID,
      email: user.email,
      phone: user.phone,
      transactionId: transactionId,
      items: cartItems,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
      orderDate: new Date().toLocaleString(),
    };

    console.log("Order Confirmation Email Sent:", orderDetails);

    // Show success message
    alert(
      `✅ Payment Successful!\n\nTransaction ID: ${transactionId}\n\nOrder Details:\nTotal Amount: ₹${total.toFixed(2)}\n\nA confirmation email has been sent to ${user.email}\nOrder details sent to ${user.phone}\n\nThank you for shopping with GroceryMart!`
    );

    // Clear cart
    localStorage.removeItem("cartItems");
    setCartItems([]);
    setShowPaymentModal(false);
    setTransactionId("");
  };

  return (
    <>
      <Header />
      <main className="container py-5" style={{ minHeight: "70vh" }}>
        <h2 className="mb-4 fw-bold text-center">🛒 Your Shopping Cart ({cartItems.length} items)</h2>
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm p-3">
              {cartItems.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-3" style={{ fontSize: "1.2rem" }}>Your cart is empty!</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.location.href = "/dashboard"}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  {cartItems.map((item, i) => (
                    <div key={i} className="row align-items-center border-bottom py-3">
                      <div className="col-md-5 d-flex align-items-center mb-2 mb-md-0">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="me-3"
                          style={{ 
                            width: "80px", 
                            height: "80px", 
                            objectFit: "cover", 
                            borderRadius: "8px",
                            border: "1px solid #ddd"
                          }}
                        />
                        <div>
                          <div className="fw-bold">{item.name}</div>
                          <small className="badge bg-danger">{item.badge}</small>
                        </div>
                      </div>
                      <div className="col-md-2 text-center">
                        <div className="text-muted small">Price</div>
                        <div className="fw-bold">{item.price}</div>
                      </div>
                      <div className="col-md-2">
                        <div className="text-muted small text-center mb-1">Quantity</div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(i, item.qty - 1)}
                            style={{ width: "30px", padding: "2px" }}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            value={item.qty}
                            min={1}
                            max={10}
                            onChange={(e) => updateQuantity(i, parseInt(e.target.value) || 1)}
                            style={{ width: "50px" }}
                          />
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(i, item.qty + 1)}
                            style={{ width: "30px", padding: "2px" }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-center">
                        <div className="text-muted small">Total</div>
                        <div className="fw-bold text-primary">₹{(parsePrice(item.price) * item.qty).toFixed(2)}</div>
                      </div>
                      <div className="col-md-1 text-end">
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => removeItem(i)}
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                  <button 
                    className="btn btn-outline-primary mt-4" 
                    onClick={() => window.location.href = "/dashboard"}
                  >
                    ← Continue Shopping
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm p-4 sticky-top" style={{ top: "20px" }}>
              <h4 className="fw-bold mb-3">Order Summary</h4>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item d-flex justify-content-between px-0">
                  <span>Subtotal:</span>
                  <span className="fw-bold">₹{subtotal.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between px-0">
                  <span>Tax (5%):</span>
                  <span className="fw-bold">₹{tax.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between px-0">
                  <span>Shipping:</span>
                  <span className="fw-bold">
                    {shipping === 0 && subtotal > 0 ? (
                      <span className="text-success">FREE 🎉</span>
                    ) : subtotal === 0 ? (
                      "N/A"
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </li>
              </ul>
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3 pt-2 border-top">
                <span>Total:</span>
                <span className="text-success">₹{total.toFixed(2)}</span>
              </div>
              <button 
                className="btn btn-lg btn-success w-100" 
                onClick={handleProceedToPayment}
                disabled={cartItems.length === 0}
              >
                {cartItems.length === 0 ? "Cart is Empty" : "Proceed to Payment"}
              </button>
              {subtotal < 3000 && subtotal > 0 && (
                <small className="text-muted text-center mt-2 d-block">
                  Add ₹{(3000 - subtotal).toFixed(2)} more for FREE shipping!
                </small>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPaymentModal(false);
          }}
        >
          <div 
            className="card shadow-lg" 
            style={{ 
              maxWidth: "500px", 
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">💳 Complete Payment</h4>
            </div>
            <div className="card-body text-center">
              <h5 className="mb-3">Scan QR Code to Pay</h5>
              <div className="mb-3">
                <img 
                  src="https://images.unsplash.com/photo-1617141636403-f511e2d65af8?w=300&h=300&fit=crop"
                  alt="UPI QR Code"
                  style={{ 
                    width: "250px", 
                    height: "250px", 
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "white"
                  }}
                />
                <p className="text-muted mt-2 small">Scan with any UPI app (GPay, PhonePe, Paytm)</p>
              </div>
              
              <div className="alert alert-info mb-3">
                <strong>Amount to Pay: ₹{total.toFixed(2)}</strong>
              </div>

              <div className="mb-3 text-start">
                <label className="form-label fw-bold">Enter UPI Transaction ID *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., 123456789012"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
                <small className="text-muted">Enter the 12-digit transaction ID from your UPI app</small>
              </div>

              <div className="alert alert-warning small text-start">
                <strong>Order Details will be sent to:</strong>
                <div>📧 Email: {user.email}</div>
                <div>📱 Phone: {user.phone}</div>
              </div>

              <div className="d-flex gap-2">
                <button 
                  className="btn btn-success flex-grow-1"
                  onClick={handlePaymentConfirmation}
                >
                  Confirm Payment
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setTransactionId("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CartPage;