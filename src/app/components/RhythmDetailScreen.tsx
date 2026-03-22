import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Heart } from "lucide-react";
import { motion } from "motion/react";
import { LogCareSheet } from "./LogCareSheet";
import { ConfirmationScreen } from "./ConfirmationScreen";
import { useApp } from "../context/AppContext";

export function RhythmDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rhythms, updateRhythm } = useApp();
  
  const [showLogSheet, setShowLogSheet] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastLoggedAction, setLastLoggedAction] = useState("");

  const rhythm = rhythms.find(r => r.id === id);

  if (!rhythm) {
    return null;
  }

  const handleLogComplete = (memberName: string, action: string) => {
    setLastLoggedAction(action);
    setShowLogSheet(false);
    updateRhythm(memberName, action);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <ConfirmationScreen
        member={rhythm.name}
        action={lastLoggedAction}
        onClose={handleCloseConfirmation}
      />
    );
  }

  // Status pill
  const statusConfig = {
    healthy: { label: "Healthy", color: "#1D9E75", bg: "#1D9E7520" },
    fading: { label: "Fading", color: "#EF9F27", bg: "#EF9F2720" },
    dormant: { label: "Dormant", color: "#888780", bg: "#88878020" },
  }[rhythm.status];

  // Mock timeline data - last 6 weeks
  const weeks = Array.from({ length: 6 }, (_, i) => {
    const weekNum = 6 - i;
    const hasCare = rhythm.status === "healthy" 
      ? i <= 5 
      : rhythm.status === "fading" 
        ? i <= 3 
        : i === 0;
    return { week: weekNum, hasCare };
  });

  // Recent acts (mock data)
  const recentActs = [
    { action: rhythm.lastAction || "Called them", date: "Mon 10 Mar", duration: "40 mins" },
    { action: "Sent a voice note", date: "Fri 6 Mar", duration: "" },
    { action: "Checked in by text", date: "Wed 4 Mar", duration: "" },
  ];

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

        <h2 style={{ color: "#2C2C2A", fontSize: "20px", fontWeight: 600 }}>
          {rhythm.name}
        </h2>
      </div>

      {/* Section 1: Status strip */}
      <div className="mb-12">
        <p style={{ fontSize: "15px", color: "#2C2C2A", lineHeight: "1.6" }}>
          Last act: <span style={{ fontWeight: 500 }}>{rhythm.lastAction || "Called them"}</span>
        </p>
        <p style={{ fontSize: "14px", color: "#888780", marginTop: "4px" }}>
          {rhythm.daysAgo === 0 ? "Today" : `${rhythm.daysAgo} ${rhythm.daysAgo === 1 ? "day" : "days"} ago`}
        </p>
      </div>

      {/* Section 2: Timeline */}
      <div className="mb-8">
        <h3
          className="mb-4"
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#2C2C2A",
          }}
        >
          Last 6 weeks
        </h3>

        <div className="flex items-center justify-between mb-2">
          {weeks.map((week, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <motion.div
                className="rounded-full"
                style={{
                  width: week.hasCare ? 12 : 10,
                  height: week.hasCare ? 12 : 10,
                  backgroundColor: week.hasCare ? "#EF9F27" : "transparent",
                  border: week.hasCare ? "none" : "2px dashed #D3D1C7",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              />
              <span
                style={{
                  fontSize: "11px",
                  color: "#888780",
                }}
              >
                W{week.week}
              </span>
            </div>
          ))}
        </div>

        {/* Current week underline */}
        <div className="flex items-center justify-between">
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 1 }}></div>
          <div
            style={{
              flex: 1,
              height: 2,
              backgroundColor: "#EF9F27",
              borderRadius: "99px",
            }}
          ></div>
        </div>
      </div>

      {/* Section 3: Recent acts */}
      <div className="mb-8">
        <h3
          className="mb-4"
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#2C2C2A",
          }}
        >
          Recent acts
        </h3>

        <div className="space-y-3">
          {recentActs.slice(0, 3).map((act, index) => (
            <div
              key={index}
              className="px-4 py-3 flex items-center justify-between"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D3D1C7",
                borderRadius: "16px",
              }}
            >
              <div>
                <p style={{ fontSize: "14px", color: "#2C2C2A", fontWeight: 500 }}>
                  {act.action}
                </p>
                <p style={{ fontSize: "12px", color: "#888780" }}>
                  {act.date}
                </p>
              </div>
              {act.duration && (
                <span style={{ fontSize: "12px", color: "#888780" }}>
                  {act.duration}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA button */}
      <button
        onClick={() => setShowLogSheet(true)}
        className="w-full py-4 mb-4"
        style={{
          backgroundColor: "#EF9F27",
          color: "#FAF9F6",
          borderRadius: "99px",
          fontSize: "16px",
          fontWeight: 500,
        }}
      >
        Do something now
      </button>

      {/* Privacy note */}
      <p
        className="text-center"
        style={{
          fontSize: "12px",
          color: "#888780",
        }}
      >
        Only you can see this. Nothing is shared.
      </p>

      {/* Log care sheet */}
      {showLogSheet && (
        <LogCareSheet
          onClose={() => setShowLogSheet(false)}
          onComplete={handleLogComplete}
        />
      )}
    </div>
  );
}