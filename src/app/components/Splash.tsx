import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#2C2C2A" }}
    >
      {/* Logo */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=120&h=120&fit=crop"
          alt="CareRhythm Logo"
          style={{
            width: 120,
            height: 120,
            objectFit: "contain",
          }}
        />
      </motion.div>

      {/* App name */}
      <motion.h1
        className="mb-3"
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#FFFFFF",
          textAlign: "center",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        CareRhythm
      </motion.h1>

      {/* Tagline */}
      <motion.p
        style={{
          fontSize: "14px",
          color: "#888780",
          textAlign: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        Stay close. Without trying so hard.
      </motion.p>
    </div>
  );
}