import { motion } from "motion/react";

interface OrbProps {
  state: "thriving" | "fading" | "dormant";
  size?: number;
}

export function Orb({ state, size = 120 }: OrbProps) {
  // Orb colors based on state
  const orbColor = {
    thriving: "#EF9F27", // Amber
    fading: "#1D9E75",   // Teal
    dormant: "#888780",  // Muted grey
  }[state];

  // Petal rotation based on state (fully open = thriving, half = fading, closed = dormant)
  const petalScale = {
    thriving: 1,
    fading: 0.6,
    dormant: 0.2,
  }[state];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Center orb */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: orbColor,
          top: "50%",
          left: "50%",
          width: size * 0.67,
          height: size * 0.67,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: state === "thriving" ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 6 petals around the orb */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const petalSize = size * 0.2;
        const distance = size * 0.35;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: orbColor,
              opacity: 0.6,
              width: petalSize,
              height: petalSize,
              left: "50%",
              top: "50%",
            }}
            initial={{
              x: Math.cos(angle) * distance - petalSize / 2,
              y: Math.sin(angle) * distance - petalSize / 2,
              scale: 0,
            }}
            animate={{
              x: Math.cos(angle) * distance - petalSize / 2,
              y: Math.sin(angle) * distance - petalSize / 2,
              scale: petalScale,
            }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
