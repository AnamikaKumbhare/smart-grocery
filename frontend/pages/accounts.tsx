import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUserAccount } from "../services/api";

interface UserAccount {
  name: string;
  customerID: string;
  email: string;
  phone: string;
}

const AccountsPage = () => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    const fetchAccount = async () => {
      const data = await getUserAccount(token);
      setUser(data);
      setLoading(false);
    };

    fetchAccount();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  if (!user) return <p className="text-center mt-5">Failed to load account info.</p>;

  return (
    <>
      <Header />

      <div className="container py-5">
        <h2 className="mb-4 fw-bold text-center">My Account</h2>
        <div className="row g-4">

          <div className="col-lg-4 col-md-6">
            <div
              className="card p-3 h-100 shadow account-nav-card"
              onClick={() =>
                alert(`Viewing Personal Information. Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}`)
              }
            >
              <div className="card-body">
                <h5 className="fw-bold text-primary">
                  <i className="bi bi-person-circle me-2"></i>Personal Info
                </h5>
                <p className="card-text text-muted">Manage your profile, email, and phone number.</p>
                <hr />
                <small className="d-block">Email: {user.email}</small>
                <small className="d-block">Phone: {user.phone}</small>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div
              className="card p-3 h-100 shadow account-nav-card"
              onClick={() => alert("Navigating to Password Management Screen.")}
            >
              <div className="card-body">
                <h5 className="fw-bold text-danger">
                  <i className="bi bi-key-fill me-2"></i>Password & Security
                </h5>
                <p className="card-text text-muted">Change your password and manage login methods.</p>
                <hr />
                <small className="text-info">Last password change: 2 months ago (Placeholder)</small>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div
              className="card p-3 h-100 shadow account-nav-card"
              onClick={() => alert("Accessing Customer Help Center.")}
            >
              <div className="card-body">
                <h5 className="fw-bold text-success">
                  <i className="bi bi-headset me-2"></i>Customer Help
                </h5>
                <p className="card-text text-muted">View FAQs, chat with support, or raise a ticket.</p>
                <hr />
                <small>Your Customer ID: {user.customerID}</small>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default AccountsPage;
