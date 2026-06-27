"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { PROBLEMS } from "@/data/problems";

interface ProgressContextType {
  isSolved: (id: number) => boolean;
  toggleSolved: (id: number) => void;
  solvedCount: number;
  totalCount: number;
  percent: number;
  isMounted: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [solvedIds, setSolvedIds] = useState<Set<number>>(new Set());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("gfg-tracker-progress");
    setSolvedIds(stored ? new Set(JSON.parse(stored)) : new Set());
    setIsMounted(true);
  }, []);

  const isSolved = (id: number) => solvedIds.has(id);

  const toggleSolved = (id: number) => {
    setSolvedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem("gfg-tracker-progress", JSON.stringify([...next]));
      return next;
    });
  };

  const solvedCount = solvedIds.size;
  const totalCount = PROBLEMS.length;
  const percent = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;

  return (
    <ProgressContext.Provider
      value={{
        isSolved,
        toggleSolved,
        solvedCount,
        totalCount,
        percent,
        isMounted,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
}
