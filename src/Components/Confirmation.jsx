export default function Confirmation({ data, onDashboard }) {
  return (
    <div className="login-step active">
      <div className="login-header">
        <i
          className="fas fa-check-circle"
          style={{ fontSize: "60px", color: "var(--success)", marginBottom: "20px" }}
        ></i>
        <h2>Booking Confirmed!</h2>
        <p>Your IT services have been booked successfully</p>
      </div>

      <div className="confirmation-details">
        <div className="detail-row">
          <span>Booking ID:</span>
          <span>BE-{Math.floor(Math.random() * 9000 + 1000)}</span>
        </div>
        <div className="detail-row">
          <span>Services Booked:</span>
          <span>{data.services.join(", ")}</span>
        </div>
        <div className="detail-row">
          <span>Customer Name:</span>
          <span>{`${data.firstName} ${data.lastName}`}</span>
        </div>
        <div className="detail-row">
          <span>Contact:</span>
          <span>{data.contact}</span>
        </div>
        <div className="detail-row">
          <span>Expected Response:</span>
          <span>Within 24 hours</span>
        </div>
      </div>

      <button className="btn btn-outline" onClick={onDashboard}>
        GO TO DASHBOARD
      </button>
    </div>
  );
}
