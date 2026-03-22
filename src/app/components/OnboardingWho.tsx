import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Heart } from "lucide-react";

interface Person {
  id: string;
  initial: string;
  name: string;
  relationship: string;
  color: string;
  enabled: boolean;
  isPet?: boolean;
}

export function OnboardingWho() {
  const navigate = useNavigate();

  const [people, setPeople] = useState<Person[]>([
    { id: "mum", initial: "M", name: "Mum", relationship: "Parent", color: "#7F77DD", enabled: true },
    { id: "dad", initial: "D", name: "Dad", relationship: "Parent", color: "#EF9F27", enabled: true },
    { id: "sibling", initial: "S", name: "Sibling", relationship: "Sibling", color: "#1D9E75", enabled: true },
    { id: "pets", initial: "", name: "Pets", relationship: "Home", color: "#D85A30", enabled: true, isPet: true },
  ]);

  const togglePerson = (id: string) => {
    setPeople(prev =>
      prev.map(p => (p.id === id ? { ...p, enabled: !p.enabled } : p))
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
        Step 1 of 3
      </div>

      {/* Header */}
      <h2 className="mb-8" style={{ color: "#2C2C2A" }}>
        Who do you want to stay close to?
      </h2>

      {/* Person cards */}
      <div className="space-y-3 mb-auto">
        {people.map((person, index) => (
          <motion.div
            key={person.id}
            className="px-5 py-4 flex items-center justify-between"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D3D1C7",
              borderRadius: "16px",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            {/* Left side - Avatar, name, relationship */}
            <div className="flex items-center gap-3">
              {/* Avatar circle */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: person.color,
                  color: "#FAF9F6",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                {person.isPet ? <Heart size={24} fill="#FAF9F6" /> : person.initial}
              </div>

              {/* Name and relationship */}
              <div>
                <div style={{ fontSize: "16px", fontWeight: 500, color: "#2C2C2A" }}>
                  {person.name}
                </div>
                <div style={{ fontSize: "14px", color: "#888780" }}>
                  {person.relationship}
                </div>
              </div>
            </div>

            {/* Toggle switch */}
            <button
              onClick={() => togglePerson(person.id)}
              className="relative"
              style={{
                width: 48,
                height: 28,
                borderRadius: "99px",
                backgroundColor: person.enabled ? "#1D9E75" : "#D3D1C7",
                transition: "background-color 0.2s",
              }}
            >
              <motion.div
                className="absolute top-1 rounded-full"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: "#FFFFFF",
                }}
                animate={{
                  left: person.enabled ? 22 : 2,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Small note */}
      <p
        className="mb-6 text-center"
        style={{
          fontSize: "12px",
          color: "#888780",
        }}
      >
        You can add or change these later.
      </p>

      {/* CTA */}
      <button
        onClick={() => navigate("/onboarding/rhythms")}
        className="w-full py-4"
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
