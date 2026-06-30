"use client";

import { Problem } from "@/data/problems";
import { ProblemRow } from "./ProblemRow";
import { ListChecks } from "lucide-react";

interface ProblemListProps {
  problems: Problem[];
}

export function ProblemList({ problems }: ProblemListProps) {
  if (problems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <ListChecks className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground">No problems match your filters</h3>
        <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your filter criteria</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="hidden sm:flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 border-b bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        <span className="w-6 lg:w-8 text-right shrink-0">#</span>
        <span className="w-5 shrink-0" />
        <span className="flex-1 min-w-0">Problem</span>
        <span className="w-16 text-right shrink-0">Action</span>
      </div>
      <div className="max-h-[50vh] sm:max-h-[calc(100vh-320px)] lg:max-h-[calc(100vh-280px)] overflow-y-auto overscroll-contain">
        {problems.map((problem, idx) => (
          <ProblemRow key={problem.id} problem={problem} index={idx + 1} />
        ))}
      </div>
    </div>
  );
}
