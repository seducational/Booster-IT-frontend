import { useState } from "react";
import StepIndicator from "./StepIndicator";
import LoginForm from "./LoginForm";
import OTPVerification from "./OtpVerification";
import UserDetails from "./UserDetails";
import ServiceSelection from "./ServiceSelection";
import Confirmation from "./Confirmation";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function RightPanel() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});

  // inside RightPanel.jsx
  const handleRegister = async (finalUserData) => {
    try {
      const resp = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalUserData),
      });
      const data = await resp.json();
      if (data.success) {
        // store token and user
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setUserData(data.data.user);
        setStep(5); // confirmation
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("register error", err);
      alert("Failed to connect to server");
    }
  };

  const handleSendOtp = async ({ method, contact }) => {
    try {
      const response = await fetch(`${API_BASE}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, method }),
      });
      const data = await response.json();

      if (data.success) {
        setUserData({ method, contact });
        setStep(2); // move to OTP screen
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="login-right">
      <StepIndicator currentStep={step} />

      {step === 1 && <LoginForm onContinue={handleSendOtp} />}

      {step === 2 && (
        <OTPVerification
          contact={userData.contact}
          onBack={() => setStep(1)}
          onVerify={(otp) => setStep(3)}
        />
      )}

      {step === 3 && (
        <UserDetails
          onBack={() => setStep(2)}
          onContinue={(details) => {
            setUserData({ ...userData, ...details });
            setStep(4);
          }}
        />
      )}

      {step === 4 && (
        <ServiceSelection
          onBack={() => setStep(3)}
          onContinue={(services) => {
            setUserData({ ...userData, services });
            setStep(5);
          }}
        />
      )}

      {step === 5 && (
        <Confirmation
          data={userData}
          onDashboard={() => alert("Redirecting to Dashboard...")}
        />
      )}
    </div>
  );
}
