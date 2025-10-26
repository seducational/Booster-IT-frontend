export default function StepIndicator({ currentStep }) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="step-indicator">
      {steps.map((num) => (
        <div
          key={num}
          className={`step ${currentStep >= num ? "active" : ""}`}
        >
          {num}
        </div>
      ))}
    </div>
  );
}
