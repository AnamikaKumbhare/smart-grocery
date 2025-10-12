import React from "react";

const Header = () => {
  const handleSignInClick = () => {
    alert("Sign In functionality will be implemented here!");
  };

  return (
    <header className="top-header">
      <div className="auth-status-bar">
        <div className="container-fluid d-flex justify-content-end align-items-center">
          <span className="user-id-display me-3">
            User ID: <strong>Guest_12345</strong>
          </span>
          <button className="btn btn-sm btn-success" onClick={handleSignInClick}>
            <i className="bi bi-box-arrow-in-right"></i> Sign In
          </button>
        </div>
      </div>

      <div className="logo-container text-center">
        <img src="https://i.imgur.com/G5g22Wd.png" alt="My Grocer Logo" />
      </div>

      <div className="container-fluid py-2">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-12 mb-2 mb-lg-0">
            <div className="search-bar d-flex">
              <input type="text" className="form-control" placeholder="Search for groceries..." />
              <button className="btn btn-search">
                <i className="bi bi-search"></i> Search
              </button>
            </div>
          </div>
          <div className="col-lg-5 col-md-12">
            <nav className="navbar navbar-dark p-0">
              <ul className="navbar-nav d-flex flex-row justify-content-end w-100 gap-3">
                <li className="nav-item">
                  <a className="nav-link-custom" href="#"><i className="bi bi-person-circle"></i> Account</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link-custom" href="#"><i className="bi bi-box-seam"></i> Orders</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link-custom" href="#"><i className="bi bi-cart3"></i> Cart (0)</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="promo-banner text-center">
        <p className="mb-0">
          <strong>Flash Sale!</strong> 10% off Fresh Produce - Ends Tomorrow!{" "}
          <a href="#">Shop Now <i className="bi bi-arrow-right"></i></a>
        </p>
      </div>
    </header>
  );
};

export default Header;
