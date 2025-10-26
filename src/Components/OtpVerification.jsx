import { useState, useEffect } from "react";

export default function OTPVerification({ contact, onBack, onVerify }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    onVerify(fullOtp);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <div className="login-header">
        <h2>Verify {contact.includes("@") ? "Email" : "Phone"} </h2>
        <p>We've sent a 6-digit code to your {contact}</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Enter 6-digit OTP</label>
          <div className="otp-input-container">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                className="otp-input"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
              />
            ))}
          </div>
          <div className="timer">
            {timer > 0
              ? `Resend OTP in ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`
              : "You can now resend OTP"}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          VERIFY & CONTINUE
        </button>
      </form>
    </>
  );
}
