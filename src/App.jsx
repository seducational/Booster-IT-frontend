import { useState } from "react";
import "./index.css";
const LeftPanel = require('./Components/LeftPanel');
const RightPanel = require('./Components/RightPanel');

export default function App() {
  return (
    <div className="login-container">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
