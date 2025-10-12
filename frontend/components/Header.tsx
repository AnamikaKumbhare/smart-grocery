"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  customerID: string;
}

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    router.replace("/auth");
  };

  const isDashboard = pathname === "/dashboard";

  return (
    <header className="top-header">
      {/* ------------------- DIV 1: Logo + User Info ------------------- */}
      <div className="auth-logo-bar d-flex justify-content-between align-items-center px-3 py-2">
        {/* Logo */}
        <div className="logo-container">
          <img
            src="https://i.imgur.com/G5g22Wd.png"
            alt="My Grocer Logo"
            style={{ height: "50px" }}
          />
        </div>

        {/* User Info */}
        <div className="d-flex align-items-center gap-3">
          {user && (
            <>
              <span className="user-name-display fw-semibold">
                Welcome, <strong>{user.name}</strong>
              </span>
              <span className="user-id-display fw-semibold">
                Customer ID: <strong>{user.customerID}</strong>
              </span>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>

      {/* ------------------- DIV 2: Search / Navigation / Back Button ------------------- */}
      <div className="container-fluid py-2">
        {isDashboard ? (
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12 mb-2 mb-lg-0">
              <div className="search-bar d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for groceries..."
                />
                <button className="btn btn-search">
                  <i className="bi bi-search"></i> Search
                </button>
              </div>
            </div>

            <div className="col-lg-5 col-md-12">
              <nav className="navbar navbar-dark p-0">
                <ul className="navbar-nav d-flex flex-row justify-content-end w-100 gap-3">
                  <li className="nav-item">
                    <Link href="/accounts" className="nav-link-custom">
                      <i className="bi bi-person-circle"></i> Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/orders" className="nav-link-custom">
                      <i className="bi bi-box-seam"></i> Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/cart" className="nav-link-custom">
                      <i className="bi bi-cart3"></i> Cart (0)
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-start">
            <button
              className="btn btn-yellow btn-sm"
              onClick={() => router.push("/dashboard")}
            >
              <i className="bi bi-arrow-left"></i> Back to Dashboard
            </button>
          </div>
        )}
      </div>

      {/* Promo Banner only on Dashboard */}
      {isDashboard && (
        <div className="promo-banner text-center">
          <p className="mb-0">
            <strong>Flash Sale!</strong> 10% off Fresh Produce - Ends Tomorrow!{" "}
            <Link href="/dashboard">
              Shop Now <i className="bi bi-arrow-right"></i>
            </Link>
          </p>
        </div>
      )}

      {/* ------------------- Styles ------------------- */}
      <style jsx>{`
        .btn-yellow {
          background-color: #ffc107;
          color: #111;
          border: none;
        }
        .btn-yellow:hover {
          background-color: #e0a800;
          color: #111;
        }
        .auth-logo-bar {
          background-color: #4a607b;
          color: white;
        }
        .user-name-display,
        .user-id-display {
          color: #fff;
        }
        .search-bar input {
          border-radius: 0.25rem 0 0 0.25rem;
        }
        .btn-search {
          background-color: #ffc107;
          color: #111;
          border: none;
        }
        .btn-search:hover {
          background-color: #e0a800;
          color: #111;
        }
      `}</style>
    </header>
  );
};

export default Header;
