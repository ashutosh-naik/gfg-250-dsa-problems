"use client";

import { Problem } from "@/data/problems";
import { ProblemRow } from "./ProblemRow";

interface ProblemListProps {
  problems: Problem[];
}

export function ProblemList({ problems }: ProblemListProps) {
  return (
    <div className="border rounded-lg overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto">
      {problems.map((problem) => (
        <ProblemRow key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
