"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface UserAccount {
  name: string;
  customerID: string;
  email: string;
  phone: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

const OrdersPage: React.FC = () => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // --- Check login using localStorage ---
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      // --- Mock order data ---
      setOrders([
        { id: "ORD-10045", date: "2025-09-28", total: 680.5, status: "Delivered", items: 3 },
        { id: "ORD-10044", date: "2025-09-15", total: 1250, status: "Delivered", items: 5 },
        { id: "ORD-10043", date: "2025-09-01", total: 450, status: "Cancelled", items: 2 },
      ]);
    } else {
      alert("Please login first");
      window.location.href = "/auth"; // redirect to login page
    }
  }, []);

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Header />

      <main className="container py-5">
        <h2 className="mb-4 fw-bold text-center">Order History</h2>
        <div className="card shadow-sm p-4">
          <p className="text-muted">Your transaction history is listed below. Customer ID: {user.customerID}</p>

          <ul className="list-group list-group-flush">
            {orders.map(order => (
              <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0 fw-bold">Order {order.id}</h6>
                  <small className="text-muted">Placed on {order.date}</small>
                </div>
                <div className="text-end">
                  <span className="d-block fw-bold" style={{ color: "#B12704", fontSize: "1.1em" }}>
                    Rs {order.total.toFixed(2)}
                  </span>
                  <span className={`badge bg-${order.status === "Delivered" ? "success" : order.status === "Cancelled" ? "danger" : "info"}`}>
                    {order.status}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-primary ms-2"
                    onClick={() => alert(`Viewing details for ${order.id}`)}
                  >
                    Details
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button className="btn btn-outline-secondary mt-4">Load More Orders</button>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default OrdersPage;
