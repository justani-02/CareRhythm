import { useState } from "react";
import { Plus, Settings } from "lucide-react";
import { motion } from "motion/react";
import deviceImage from "figma:asset/74327fc80ecd78f2890056a5ee0150578bd00bec.png";
import { RhythmCardHome } from "./RhythmCardHome";
import { LogCareSheet } from "./LogCareSheet";
import { ConfirmationScreen } from "./ConfirmationScreen";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";

export function HomeScreen() {
  const navigate = useNavigate();
  const { rhythms, updateRhythm, getOrbState } = useApp();
  
  const [showLogSheet, setShowLogSheet] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastLoggedMember, setLastLoggedMember] = useState("");
  const [lastLoggedAction, setLastLoggedAction] = useState("");

  const handleLogComplete = (member: string, action: string) => {
    setLastLoggedMember(member);
    setLastLoggedAction(action);
    setShowLogSheet(false);
    updateRhythm(member, action);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <ConfirmationScreen
        member={lastLoggedMember}
        action={lastLoggedAction}
        onClose={handleCloseConfirmation}
      />
    );
  }

  const orbState = getOrbState();
  
  // Status text below orb
  const statusText = {
    thriving: "All rhythms healthy",
    fading: "Some rhythms are fading",
    dormant: "Connections dormant",
  }[orbState];

  const statusColor = {
    thriving: "#1D9E75",
    fading: "#EF9F27",
    dormant: "#888780",
  }[orbState];

  // Today's date
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#FAF9F6" }}
    >
      {/* Top section - Device area */}
      <div className="flex flex-col items-center px-6 pt-12 pb-8" style={{ minHeight: "45vh" }}>
        {/* Settings icon */}
        <div className="w-full flex justify-end mb-8">
          <button
            onClick={() => navigate("/settings")}
            className="p-2 -mr-2"
            style={{ color: "#888780" }}
          >
            <Settings size={22} />
          </button>
        </div>

        {/* Device */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <img 
            src={deviceImage} 
            alt="CareRhythm Device" 
            style={{ width: 140, height: 140 }}
          />
        </div>

        {/* Status text */}
        <p
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: statusColor,
          }}
        >
          {statusText}
        </p>
      </div>

      {/* Bottom section - Rhythm cards */}
      <div className="flex-1 px-6 pb-28">
        <div className="space-y-2">
          {rhythms.map((rhythm) => (
            <RhythmCardHome
              key={rhythm.id}
              rhythm={rhythm}
              onClick={() => navigate(`/rhythm/${rhythm.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Floating action button */}
      <motion.button
        className="fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 flex items-center gap-2"
        style={{
          backgroundColor: "#EF9F27",
          color: "#FAF9F6",
          borderRadius: "99px",
          fontSize: "16px",
          fontWeight: 500,
          boxShadow: "0 4px 20px rgba(239, 159, 39, 0.25)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowLogSheet(true)}
      >
        <Plus size={20} />
        Log care moment
      </motion.button>

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