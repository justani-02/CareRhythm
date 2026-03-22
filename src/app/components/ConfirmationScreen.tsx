import { motion } from "motion/react";
import deviceImage from "figma:asset/74327fc80ecd78f2890056a5ee0150578bd00bec.png";
import { useNavigate } from "react-router";

interface ConfirmationScreenProps {
  member: string;
  action: string;
  onClose: () => void;
}

export function ConfirmationScreen({ member, action, onClose }: ConfirmationScreenProps) {
  const navigate = useNavigate();

  const handleLogAnother = () => {
    onClose();
    // This will return to home which can then reopen the log sheet
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{ backgroundColor: "#FAF9F6" }}
    >
      {/* Device - pulsing brighter */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 1.5,
            times: [0, 0.5, 1],
            ease: "easeInOut",
          }}
        >
          <img 
            src={deviceImage} 
            alt="CareRhythm Device" 
            style={{ width: 160, height: 160 }}
          />
        </motion.div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="mt-10 mb-3"
        style={{ color: "#2C2C2A", textAlign: "center" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Rhythm tended.
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="mb-16"
        style={{
          fontSize: "14px",
          color: "#888780",
          textAlign: "center",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {member} — just now.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="w-full max-w-sm space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {/* Primary button */}
        <button
          onClick={onClose}
          className="w-full py-4"
          style={{
            backgroundColor: "#EF9F27",
            color: "#FAF9F6",
            borderRadius: "99px",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          Back to home
        </button>

        {/* Secondary button */}
        <button
          onClick={handleLogAnother}
          className="w-full py-4"
          style={{
            backgroundColor: "transparent",
            color: "#888780",
            borderRadius: "99px",
            fontSize: "16px",
            fontWeight: 500,
            border: "1px solid #ECECEA",
          }}
        >
          Log another moment
        </button>
      </motion.div>
    </div>
  );
}