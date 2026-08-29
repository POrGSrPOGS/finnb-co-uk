import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request failed:", err);
    }

    navigate("/home");
  };

  return (
    <div
      style={{
        background: "#000",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
      }}
    >
      <button
        onClick={handleStart}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "16px 40px",
          fontSize: "20px",
          fontWeight: "600",
          borderRadius: "8px",
          cursor: "pointer",
          outline: "none",
          boxShadow: "none",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#1d4ed8";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#2563eb";
        }}
      >
        Start
      </button>
    </div>
  );
}