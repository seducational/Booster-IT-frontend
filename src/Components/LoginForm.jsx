import { useState } from "react";

export default function LoginForm({ onContinue }) {
  const [method, setMethod] = useState("phone");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === "phone" && !/^\d{10}$/.test(value)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }
    if (method === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      alert("Enter a valid email address");
      return;
    }

    onContinue({ method, contact: value }); // 👈 This will call handleSendOtp in RightPanel
  };

  return (
    <>
      <div className="login-header">
        <h2>Choose Login Method</h2>
        <p>Select how you want to login to BoosterEra</p>
      </div>

      <div className="method-selector">
        <div
          className={`method-btn ${method === "phone" ? "active" : ""}`}
          onClick={() => setMethod("phone")}
        >
          <i className="fas fa-mobile-alt"></i>
          <span>Phone</span>
        </div>

        <div
          className={`method-btn ${method === "email" ? "active" : ""}`}
          onClick={() => setMethod("email")}
        >
          <i className="fas fa-envelope"></i>
          <span>Gmail</span>
        </div>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {method === "phone" ? (
          <div className="form-group">
            <label className="form-label">Enter your phone number</label>
            <div className="input-container">
              <div className="input-prefix">
                <i className="fas fa-flag"></i> +91 India
              </div>
              <input
                type="tel"
                className="form-input"
                placeholder="Enter mobile no."
                maxLength="10"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="form-group">
            <label className="form-label">Enter your Gmail address</label>
            <div className="input-container">
              <div className="input-prefix">
                <i className="fas fa-envelope"></i> Gmail
              </div>
              <input
                type="email"
                className="form-input"
                placeholder="Enter Gmail address"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          CONTINUE
        </button>
      </form>

      <div className="terms">
        By Signing up, you agree to our <a href="#">Terms of Use</a> and{" "}
        <a href="#">Privacy Policy</a>
      </div>
    </>
  );
}
