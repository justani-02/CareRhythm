import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Home, Eye, MapPin } from "lucide-react";

export function OnboardingDevice() {
  const navigate = useNavigate();

  const tips = [
    { icon: Home, text: "Bedroom shelf or desk" },
    { icon: Eye, text: "Somewhere you pass daily" },
    { icon: MapPin, text: "Not hidden — it needs to be seen" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col px-6 py-8"
      style={{ backgroundColor: "#FAF9F6" }}
    >
      {/* Progress pill */}
      <div
        className="self-start px-4 py-2 mb-6"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #D3D1C7",
          borderRadius: "99px",
          fontSize: "12px",
          color: "#888780",
        }}
      >
        Step 3 of 3
      </div>

      {/* Header */}
      <h2 className="mb-8" style={{ color: "#2C2C2A" }}>
        Put CareRhythm somewhere you'll see it.
      </h2>

      {/* Illustration - simple shelf with orb */}
      <motion.div
        className="mb-12 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Simple orb */}
        <div
          className="rounded-full mb-8"
          style={{
            width: 60,
            height: 60,
            backgroundColor: "#EF9F27",
          }}
        />

        {/* Simple shelf line */}
        <div
          style={{
            width: 200,
            height: 3,
            backgroundColor: "#D3D1C7",
            borderRadius: "99px",
          }}
        />
      </motion.div>

      {/* Tips */}
      <div className="space-y-4 mb-auto">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#EF9F27",
                  color: "#FAF9F6",
                }}
              >
                <Icon size={16} />
              </div>
              <span style={{ fontSize: "14px", color: "#2C2C2A" }}>
                {tip.text}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.button
        onClick={() => navigate("/home")}
        className="w-full py-4 mt-6"
        style={{
          backgroundColor: "#EF9F27",
          color: "#FAF9F6",
          borderRadius: "99px",
          fontSize: "16px",
          fontWeight: 500,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        whileTap={{ scale: 0.98 }}
      >
        My device is placed. Let's begin.
      </motion.button>
    </div>
  );
}
