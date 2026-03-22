import { Heart } from "lucide-react";

interface Rhythm {
  id: string;
  name: string;
  initial: string;
  color: string;
  status: "healthy" | "fading" | "dormant";
  daysAgo: number;
  isPet?: boolean;
}

interface RhythmCardHomeProps {
  rhythm: Rhythm;
  onClick: () => void;
}

export function RhythmCardHome({ rhythm, onClick }: RhythmCardHomeProps) {
  // Status dot color
  const dotColor = {
    healthy: "#1D9E75",
    fading: "#EF9F27",
    dormant: "#888780",
  }[rhythm.status];

  return (
    <button
      onClick={onClick}
      className="w-full px-6 py-5 flex items-center justify-between transition-all"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #ECECEA",
        borderRadius: "16px",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {/* Left side - Avatar and name */}
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

        {/* Name */}
        <span style={{ fontSize: "16px", fontWeight: 500, color: "#2C2C2A" }}>
          {rhythm.name}
        </span>
      </div>

      {/* Right side - Days ago */}
      <span style={{ fontSize: "14px", color: "#888780" }}>
        {rhythm.daysAgo === 0 ? "Today" : `${rhythm.daysAgo}d`}
      </span>
    </button>
  );
}