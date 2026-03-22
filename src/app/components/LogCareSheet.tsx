import { useState } from "react";
import { X, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

interface LogCareSheetProps {
  onClose: () => void;
  onComplete: (member: string, action: string) => void;
}

const careActions = [
  { id: "called", label: "Called them" },
  { id: "voice", label: "Sent a voice note" },
  { id: "photo", label: "Shared a photo" },
  { id: "text", label: "Checked in by text" },
  { id: "together", label: "Spent time together" },
];

export function LogCareSheet({ onClose, onComplete }: LogCareSheetProps) {
  const { rhythms } = useApp();
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<string>("");

  const handleSubmit = () => {
    if (selectedAction && selectedMember) {
      const actionLabel = careActions.find(a => a.id === selectedAction)?.label || "";
      onComplete(selectedMember, actionLabel);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        className="relative w-full px-6 py-10"
        style={{
          backgroundColor: "#FAF9F6",
          borderRadius: "32px 32px 0 0",
          maxHeight: "75vh",
          overflowY: "auto",
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-6 p-2"
          style={{ color: "#888780" }}
        >
          <X size={24} />
        </button>

        {/* Section 1: What did you do? */}
        <div className="mb-10">
          <h3
            className="mb-5"
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#2C2C2A",
            }}
          >
            What did you do?
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {careActions.map((action) => {
              const isSelected = selectedAction === action.id;
              return (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action.id)}
                  className="px-4 py-3.5"
                  style={{
                    backgroundColor: isSelected ? "#7F77DD" : "#FFFFFF",
                    color: isSelected ? "#FAF9F6" : "#2C2C2A",
                    border: `1px solid ${isSelected ? "#7F77DD" : "#ECECEA"}`,
                    borderRadius: "99px",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Who was it for? */}
        <div className="mb-10">
          <h3
            className="mb-5"
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#2C2C2A",
            }}
          >
            Who was it for?
          </h3>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {rhythms.map((rhythm) => {
              const isSelected = selectedMember === rhythm.name;
              return (
                <button
                  key={rhythm.id}
                  onClick={() => setSelectedMember(rhythm.name)}
                  className="flex flex-col items-center gap-2.5 flex-shrink-0"
                  style={{ minWidth: 68 }}
                >
                  <div
                    className="flex items-center justify-center transition-all"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: rhythm.color,
                      color: "#FAF9F6",
                      fontSize: "20px",
                      fontWeight: 700,
                      border: isSelected ? "3px solid #EF9F27" : "3px solid transparent",
                    }}
                  >
                    {rhythm.isPet ? <Heart size={26} fill="#FAF9F6" /> : rhythm.initial}
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      color: isSelected ? "#2C2C2A" : "#888780",
                      fontWeight: isSelected ? 500 : 400,
                    }}
                  >
                    {rhythm.name}
                  </span>
                </button>
              );
            })}
            
            {/* All of them option */}
            <button
              onClick={() => setSelectedMember("All of them")}
              className="flex flex-col items-center gap-2.5 flex-shrink-0"
              style={{ minWidth: 68 }}
            >
              <div
                className="flex items-center justify-center transition-all"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#888780",
                  color: "#FAF9F6",
                  fontSize: "20px",
                  fontWeight: 700,
                  border: selectedMember === "All of them" ? "3px solid #EF9F27" : "3px solid transparent",
                }}
              >
                <Heart size={26} fill="#FAF9F6" />
              </div>
              <span
                style={{
                  fontSize: "13px",
                  color: selectedMember === "All of them" ? "#2C2C2A" : "#888780",
                  fontWeight: selectedMember === "All of them" ? 500 : 400,
                }}
              >
                All of them
              </span>
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedAction || !selectedMember}
          className="w-full py-4"
          style={{
            backgroundColor: selectedAction && selectedMember ? "#EF9F27" : "#ECECEA",
            color: selectedAction && selectedMember ? "#FAF9F6" : "#888780",
            borderRadius: "99px",
            fontSize: "16px",
            fontWeight: 500,
            cursor: selectedAction && selectedMember ? "pointer" : "not-allowed",
          }}
        >
          Log it
        </button>
      </motion.div>
    </div>
  );
}