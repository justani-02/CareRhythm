import { createContext, useContext, useState, ReactNode } from "react";

type RhythmStatus = "healthy" | "fading" | "dormant";

export interface Rhythm {
  id: string;
  name: string;
  initial: string;
  color: string;
  status: RhythmStatus;
  daysAgo: number;
  lastAction?: string;
  isPet?: boolean;
}

interface AppContextType {
  rhythms: Rhythm[];
  updateRhythm: (name: string, action: string) => void;
  getOrbState: () => "thriving" | "fading" | "dormant";
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [rhythms, setRhythms] = useState<Rhythm[]>([
    { id: "mum", name: "Mum", initial: "M", color: "#7F77DD", status: "healthy", daysAgo: 2, lastAction: "Called them" },
    { id: "dad", name: "Dad", initial: "D", color: "#EF9F27", status: "fading", daysAgo: 6, lastAction: "Sent a voice note" },
    { id: "sibling", name: "Sibling", initial: "S", color: "#1D9E75", status: "healthy", daysAgo: 3, lastAction: "Checked in by text" },
    { id: "pets", name: "Pets", initial: "", color: "#D85A30", status: "healthy", daysAgo: 1, lastAction: "Shared a photo", isPet: true },
  ]);

  const updateRhythm = (name: string, action: string) => {
    setRhythms(prev =>
      prev.map(r =>
        r.name.toLowerCase() === name.toLowerCase()
          ? { ...r, status: "healthy" as RhythmStatus, daysAgo: 0, lastAction: action }
          : r
      )
    );
  };

  const getOrbState = () => {
    if (rhythms.some(r => r.status === "dormant")) return "dormant";
    if (rhythms.some(r => r.status === "fading")) return "fading";
    return "thriving";
  };

  return (
    <AppContext.Provider value={{ rhythms, updateRhythm, getOrbState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}