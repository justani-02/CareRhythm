import { motion } from "motion/react";
import { useNavigate } from "react-router";
import deviceImage from "figma:asset/74327fc80ecd78f2890056a5ee0150578bd00bec.png";

export function OnboardingWelcome() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col px-8 py-12"
      style={{ backgroundColor: "#FAF9F6" }}
    >
      {/* Top 40% - Device illustration */}
      <div className="flex-[0.4] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={deviceImage}
            alt="CareRhythm Device"
            style={{ width: 180, height: 180 }}
          />
        </motion.div>
      </div>

      {/* Bottom 60% - Content */}
      <div className="flex-[0.6] flex flex-col justify-center">
        <motion.h1
          className="mb-5"
          style={{ color: "#2C2C2A", fontSize: "28px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Your rhythms live here.
        </motion.h1>

        <motion.p
          className="mb-16"
          style={{
            fontSize: "16px",
            color: "#888780",
            lineHeight: "1.6",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          CareRhythm learns when you usually connect with the people you love — and quietly shows you when that's drifted.
        </motion.p>

        <motion.button
          onClick={() => navigate("/onboarding/who")}
          className="w-full py-4"
          style={{
            backgroundColor: "#EF9F27",
            color: "#FAF9F6",
            borderRadius: "99px",
            fontSize: "16px",
            fontWeight: 500,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileTap={{ scale: 0.98 }}
        >
          Get started
        </motion.button>
      </div>
    </div>
  );
}