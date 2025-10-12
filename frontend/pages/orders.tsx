import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getOrders } from "../services/api";

interface Order {
  _id: string;
  orderId: string;
  date: string;
  total: number;
  status: string;
  items: { name: string; qty: number; unit: string; price: number }[];
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    const fetchData = async () => {
      const data = await getOrders(token);
      setOrders(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">Your Order History</h2>
        {orders.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total (₹)</th>
                  <th>Status</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order.orderId}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.total.toFixed(2)}</td>
                    <td>{order.status}</td>
                    <td>
                      <ul>
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} ({item.qty} {item.unit}) - ₹{item.price}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
