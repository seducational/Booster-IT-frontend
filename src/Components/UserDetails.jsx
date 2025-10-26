import { useState } from "react";

export default function UserDetails({ onBack, onContinue }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    role: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.role) {
      alert("Please fill all required fields");
      return;
    }
    onContinue(form);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <div className="login-header">
        <h2>Tell Us About Yourself</h2>
        <p>Help us serve you better with your details</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="user-details-grid">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-input"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-input"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Company Name (Optional)</label>
          <input
            type="text"
            name="company"
            className="form-input"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">What best describes you?</label>
          <select
            name="role"
            className="form-input"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">Select your role</option>
            <option value="business_owner">Business Owner</option>
            <option value="manager">Manager</option>
            <option value="developer">Developer</option>
            <option value="marketer">Marketer</option>
            <option value="student">Student</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          CONTINUE TO SERVICES
        </button>
      </form>
    </>
  );
}
