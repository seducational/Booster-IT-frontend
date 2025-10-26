import { useState } from "react";
import StepIndicator from "./StepIndicator";
import LoginForm from "./LoginForm";
import OTPVerification from "./OtpVerification";
import UserDetails from "./UserDetails";
import ServiceSelection from "./ServiceSelection";
import Confirmation from "./Confirmation";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RightPanel() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async ({ method, contact }) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact,
          method,
          name: userData.name,
          serviceBooked: userData.services?.selected,
          expectedResponse: userData.services?.responseTime
        }),
      });
      const data = await response.json();

      if (data.success) {
        setUserData({ ...userData, method, contact, bookingId: data.bookingId });
        setStep(2); // move to OTP screen
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("Error connecting to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-right">
      <StepIndicator currentStep={step} />

      {step === 1 && <LoginForm onContinue={handleSendOtp} isLoading={isLoading} />}

      {step === 2 && (
        <OTPVerification
          contact={userData.contact}
          onBack={() => setStep(1)}
          onVerify={async (otp) => {
            try {
              const response = await fetch(`${API_BASE_URL}api/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contact: userData.contact,
                  otp
                }),
              });
              const data = await response.json();
              
              if (data.success) {
                setUserData(prev => ({
                  ...prev,
                  ...data.user,
                  verified: true
                }));
                setStep(3);
              } else {
                alert(data.message || "Failed to verify OTP");
              }
            } catch (err) {
              console.error("Error verifying OTP:", err);
              alert("Error connecting to server");
            }
          }}
        />
      )}

      {step === 3 && (
        <UserDetails
          onBack={() => setStep(2)}
          onContinue={async (details) => {
            const fullName = `${details.firstName} ${details.lastName}`;
            try {
              const response = await fetch("http://localhost:5000/api/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contact: userData.contact,
                  method: userData.method,
                  name: fullName,
                  serviceBooked: "Pending Selection",
                  expectedResponse: details.role
                }),
              });
              const data = await response.json();
              if (data.success) {
                setUserData({ 
                  ...userData, 
                  ...details, 
                  name: fullName
                });
                setStep(4);
              }
            } catch (err) {
              console.error("Error updating user details:", err);
              alert("Error updating user details");
            }
          }}
        />
      )}

      {step === 4 && (
        <ServiceSelection
          onBack={() => setStep(3)}
          onContinue={async (selectedServices) => {
            try {
              const response = await fetch("http://localhost:5000/api/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contact: userData.contact,
                  method: userData.method,
                  name: userData.name,
                  serviceBooked: selectedServices.join(", "),
                  expectedResponse: userData.role
                }),
              });
              const data = await response.json();
              if (data.success) {
                setUserData({ 
                  ...userData, 
                  services: selectedServices
                });
                setStep(5);
              }
            } catch (err) {
              console.error("Error updating services:", err);
              alert("Error updating services");
            }
          }}
        />
      )}

      {step === 5 && (
        <Confirmation
          data={{
            ...userData,
            bookingId: userData.bookingId,
            email: userData.contact,
            service: userData.services?.selected,
            expectedResponse: userData.services?.responseTime
          }}
          onDashboard={() => alert("Redirecting to Dashboard...")}
        />
      )}
    </div>
  );
}
