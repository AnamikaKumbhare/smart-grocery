"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  customerID: string;
}

const Auth: React.FC = () => {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [customerID, setCustomerID] = useState("Click 'Generate ID' below");

  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
    otp: "",
  });

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) router.replace("/"); // Dashboard is at "/"
  }, [router]);

  // Generate a unique customer ID
  const generateCustomerID = () => {
    const prefix = "CUST-";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setCustomerID(prefix + randomNum);
  };

  // Handle registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, password } = regData;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("❌ Please enter a valid email address.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      alert("❌ Please enter a valid 10-digit phone number.");
      return;
    }
    if (!customerID.startsWith("CUST-")) {
      alert("⚠ Please generate your Customer ID before registering!");
      return;
    }

    const userData: UserData = { name, email, phone, password, customerID };
    localStorage.setItem("userData", JSON.stringify(userData));

    alert(`✅ Registration Successful!\nCustomer ID: ${customerID}`);
    setRegData({ name: "", email: "", phone: "", password: "" });
    setCustomerID("Click 'Generate ID' below");
    setShowLogin(true);
  };

  // Handle OTP generation
  const handleGenerateOtp = () => {
    const identifier = loginData.identifier.trim();
    const storedData = JSON.parse(localStorage.getItem("userData") || "null") as UserData;

    if (!storedData) {
      alert("⚠ No registered user found. Please register first.");
      return;
    }

    const userExists = storedData.email === identifier || storedData.phone === identifier;
    if (!userExists) {
      alert("❌ Email/Phone not registered.");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    alert(`📩 OTP Sent! (Demo OTP: ${otp})`);
  };

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("userData") || "null") as UserData;

    if (!storedData) {
      alert("⚠ No registered user found. Please register first!");
      return;
    }

    const matched = storedData.email === loginData.identifier || storedData.phone === loginData.identifier;

    if (!matched) {
      alert("❌ Email/Phone not registered.");
      return;
    }

    let loginSuccess = false;

    if (!useOtp) {
      if (storedData.password === loginData.password) loginSuccess = true;
      else {
        alert("❌ Incorrect password!");
        return;
      }
    } else {
      if (loginData.otp === generatedOtp && loginData.otp !== "") {
        loginSuccess = true;
        setGeneratedOtp(null);
      } else {
        alert("❌ Invalid or expired OTP!");
        return;
      }
    }

    if (loginSuccess) {
      localStorage.setItem("loggedInUser", JSON.stringify(storedData));
      alert(`✅ Login Successful! Welcome, ${storedData.name}.`);
      router.replace("/"); // Redirect to dashboard
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #f75990, #6610f2)" }}
    >
      <div
        className="card p-4"
        style={{
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">
          <i className="fa-solid fa-basket-shopping me-2"></i>High-Tech Grocery Store
        </h3>

        {/* Registration Form */}
        {!showLogin && (
          <form onSubmit={handleRegister}>
            <h5 className="text-center mb-3">Create an Account</h5>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                required
                value={regData.name}
                onChange={(e) => setRegData({ ...regData, name: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter your 10-digit phone number"
                required
                pattern="[0-9]{10}"
                maxLength={10}
                value={regData.phone}
                onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                required
                value={regData.password}
                onChange={(e) => setRegData({ ...regData, password: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Customer ID</label>
              <div
                className="customer-id-box mb-2"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  fontWeight: 600,
                  color: "#0d6efd",
                  textAlign: "center",
                }}
              >
                {customerID}
              </div>
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={generateCustomerID}>
                Generate ID
              </button>
            </div>

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary">
                Register Account
              </button>
            </div>

            <p className="text-center mt-3 text-muted">
              Already registered?{" "}
              <span
                className="toggle-link"
                style={{ cursor: "pointer", color: "#0d6efd" }}
                onClick={() => setShowLogin(true)}
              >
                Login here
              </span>
            </p>
          </form>
        )}

        {/* Login Form */}
        {showLogin && (
          <form onSubmit={handleLogin}>
            <h5 className="text-center mb-3">Login to Your Account</h5>

            <div className="mb-3">
              <label className="form-label">Email or Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email or phone number"
                required
                value={loginData.identifier}
                onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
              />
            </div>

            {!useOtp && (
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>
            )}

            {useOtp && (
              <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Enter OTP"
                  value={loginData.otp}
                  onChange={(e) => setLoginData({ ...loginData, otp: e.target.value })}
                />
                <button type="button" className="btn btn-outline-primary" onClick={handleGenerateOtp}>
                  Get OTP
                </button>
              </div>
            )}

            <div className="text-end mb-3">
              <small
                className="toggle-link"
                style={{ cursor: "pointer", color: "#0d6efd" }}
                onClick={() => setUseOtp(!useOtp)}
              >
                {useOtp ? "Use Password instead" : "Use OTP instead"}
              </small>
            </div>

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            <p className="text-center mt-3 text-muted">
              New user?{" "}
              <span
                className="toggle-link"
                style={{ cursor: "pointer", color: "#0d6efd" }}
                onClick={() => setShowLogin(false)}
              >
                Create account
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
