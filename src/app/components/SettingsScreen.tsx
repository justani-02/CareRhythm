import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Heart, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

export function SettingsScreen() {
  const navigate = useNavigate();
  const { rhythms } = useApp();
  const [deviceConnected, setDeviceConnected] = useState(true);

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: "#FAF9F6" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-12">
        <button
          onClick={() => navigate("/home")}
          className="p-2 -ml-2"
          style={{ color: "#888780" }}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ color: "#2C2C2A", fontSize: "20px", fontWeight: 600 }}>
          Settings
        </h2>
      </div>

      {/* Section: Your people */}
      <div className="mb-12">
        <h3
          className="mb-5"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#888780",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Your people
        </h3>

        <div className="space-y-2 mb-6">
          {rhythms.map((rhythm) => (
            <div
              key={rhythm.id}
              className="px-6 py-5 flex items-center justify-between"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #ECECEA",
                borderRadius: "16px",
              }}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: rhythm.color,
                    color: "#FAF9F6",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  {rhythm.isPet ? <Heart size={22} fill="#FAF9F6" /> : rhythm.initial}
                </div>

                <span style={{ fontSize: "16px", fontWeight: 500, color: "#2C2C2A" }}>
                  {rhythm.name}
                </span>
              </div>

              <button
                style={{
                  fontSize: "14px",
                  color: "#888780",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        <button
          className="flex items-center gap-2 px-2"
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#EF9F27",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Plus size={18} />
          Add someone
        </button>
      </div>

      {/* Section: Your device */}
      <div className="mb-12">
        <h3
          className="mb-5"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#888780",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Your device
        </h3>

        <div
          className="px-6 py-5"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #ECECEA",
            borderRadius: "16px",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: "16px", fontWeight: 500, color: "#2C2C2A" }}>
              Device connected
            </span>

            {/* Toggle */}
            <button
              onClick={() => setDeviceConnected(!deviceConnected)}
              className="relative flex-shrink-0"
              style={{
                width: 44,
                height: 24,
                borderRadius: "99px",
                backgroundColor: deviceConnected ? "#1D9E75" : "#E0DFD8",
                transition: "background-color 0.3s ease",
                border: "none",
                cursor: "pointer",
              }}
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#FFFFFF",
                  top: 2,
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
                animate={{
                  left: deviceConnected ? 22 : 2,
                }}
                transition={{ type: "spring", stiffness: 700, damping: 35 }}
              />
            </button>
          </div>

          <p style={{ fontSize: "13px", color: "#888780" }}>
            {deviceConnected ? "Up to date" : "Disconnected"}
          </p>
        </div>
      </div>

      {/* Section: Privacy */}
      <div className="mb-12">
        <h3
          className="mb-5"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#888780",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Privacy
        </h3>

        <div
          className="px-6 py-5"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #ECECEA",
            borderRadius: "16px",
          }}
        >
          <p style={{ fontSize: "14px", color: "#2C2C2A", lineHeight: "1.6" }}>
            All data stays on this device. Nothing is uploaded, shared, or visible to anyone else.
          </p>
        </div>
      </div>

      {/* Reset rhythms */}
      <button
        className="px-2"
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#D85A30",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Reset rhythms
      </button>
    </div>
  );
}