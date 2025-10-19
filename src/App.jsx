import { useState } from "react";
import "./index.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

export default function App() {
  return (
    <div className="login-container">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
