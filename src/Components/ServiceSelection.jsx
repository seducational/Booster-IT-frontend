import { useState } from "react";

export default function ServiceSelection({ onBack, onContinue }) {
  const services = [
    { id: "web-dev", icon: "fa-code", name: "Web Development", desc: "Custom websites & web applications" },
    { id: "digital-marketing", icon: "fa-chart-line", name: "Digital Marketing", desc: "SEO, PPC, Social Media Marketing" },
    { id: "ecommerce", icon: "fa-shopping-cart", name: "E-commerce Solutions", desc: "Online stores & payment integration" },
    { id: "seo", icon: "fa-search", name: "SEO Optimization", desc: "Improve search engine rankings" },
    { id: "mobile-app", icon: "fa-mobile-alt", name: "Mobile App Development", desc: "iOS & Android applications" },
    { id: "it-consulting", icon: "fa-laptop-code", name: "IT Consulting", desc: "Strategic IT advice & planning" },
  ];

  const [selected, setSelected] = useState([]);

  const toggleService = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selected.length === 0) {
      alert("Please select at least one service");
      return;
    }
    onContinue(selected);
  };

  return (
    <>
      <button className="back-btn" onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <div className="login-header">
        <h2>Select IT Services</h2>
        <p>Choose the services you're interested in</p>
      </div>

      <div className="service-grid">
        {services.map((s) => (
          <div
            key={s.id}
            className={`service-card ${selected.includes(s.id) ? "selected" : ""}`}
            onClick={() => toggleService(s.id)}
          >
            <div className="service-icon">
              <i className={`fas ${s.icon}`}></i>
            </div>
            <div className="service-name">{s.name}</div>
            <div className="service-desc">{s.desc}</div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>
        BOOK SELECTED SERVICES
      </button>
    </>
  );
}
