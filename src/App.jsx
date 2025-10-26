import { useState } from "react";
import "./index.css";
import LeftPanel from "./Components/LeftPanel";
import RightPanel from "./Components/RightPanel";

export default function App() {
  return (
    <div className="login-container">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
