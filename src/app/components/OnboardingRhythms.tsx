import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Heart } from "lucide-react";

interface Person {
  id: string;
  initial: string;
  name: string;
  color: string;
  rhythm: string;
  isPet?: boolean;
}

const rhythmOptions = [
  { value: "few-days", label: "Every few days" },
  { value: "weekly", label: "Weekly" },
  { value: "few-weeks", label: "Every few weeks" },
];

export function OnboardingRhythms() {
  const navigate = useNavigate();

  const [people, setPeople] = useState<Person[]>([
    { id: "mum", initial: "M", name: "Mum", color: "#7F77DD", rhythm: "weekly" },
    { id: "dad", initial: "D", name: "Dad", color: "#EF9F27", rhythm: "weekly" },
    { id: "sibling", initial: "S", name: "Sibling", color: "#1D9E75", rhythm: "weekly" },
    { id: "pets", initial: "", name: "Pets", color: "#D85A30", rhythm: "weekly", isPet: true },
  ]);

  const setRhythm = (id: string, rhythm: string) => {
    setPeople(prev =>
      prev.map(p => (p.id === id ? { ...p, rhythm } : p))
    );
  };

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
        Step 2 of 3
      </div>

      {/* Header */}
      <h2 className="mb-8" style={{ color: "#2C2C2A" }}>
        How often do you usually connect?
      </h2>

      {/* Person cards */}
      <div className="space-y-4 mb-auto">
        {people.map((person, index) => (
          <motion.div
            key={person.id}
            className="px-5 py-4"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D3D1C7",
              borderRadius: "16px",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            {/* Person header */}
            <div className="flex items-center gap-3 mb-4">
              {/* Small avatar */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: person.color,
                  color: "#FAF9F6",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                {person.isPet ? <Heart size={16} fill="#FAF9F6" /> : person.initial}
              </div>
              <span style={{ fontSize: "16px", fontWeight: 500, color: "#2C2C2A" }}>
                {person.name}
              </span>
            </div>

            {/* Rhythm selector pills */}
            <div className="flex gap-2">
              {rhythmOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setRhythm(person.id, option.value)}
                  className="flex-1 py-2"
                  style={{
                    backgroundColor: person.rhythm === option.value ? "#7F77DD" : "#FAF9F6",
                    color: person.rhythm === option.value ? "#FAF9F6" : "#2C2C2A",
                    border: `1px solid ${person.rhythm === option.value ? "#7F77DD" : "#D3D1C7"}`,
                    borderRadius: "99px",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate("/onboarding/device")}
        className="w-full py-4 mt-6"
        style={{
          backgroundColor: "#EF9F27",
          color: "#FAF9F6",
          borderRadius: "99px",
          fontSize: "16px",
          fontWeight: 500,
        }}
      >
        Continue
      </button>
    </div>
  );
}
