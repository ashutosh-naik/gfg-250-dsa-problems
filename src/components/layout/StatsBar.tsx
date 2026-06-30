"use client";

import { useProgress } from "@/contexts/ProgressContext";
import { PROBLEMS } from "@/data/problems";
import { useMemo } from "react";

export function StatsBar() {
  const { solvedCount, totalCount, percent, isHydrated } = useProgress();

  const difficultyCounts = useMemo(() => {
    const easy = PROBLEMS.filter((p) => p.difficulty === "Easy").length;
    const medium = PROBLEMS.filter((p) => p.difficulty === "Medium").length;
    const hard = PROBLEMS.filter((p) => p.difficulty === "Hard").length;
    return { easy, medium, hard };
  }, []);

  const barColor =
    percent >= 75
      ? "bg-green-500"
      : percent >= 40
        ? "bg-amber-500"
        : percent > 0
          ? "bg-orange-500"
          : "bg-muted";

  if (!isHydrated) {
    return (
      <div className="rounded-lg border bg-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Your Progress</span>
          <span className="text-sm text-muted-foreground">0 / {totalCount}</span>
        </div>
        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: "0%" }} />
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>Easy: 0 / {difficultyCounts.easy}</span>
          <span>Medium: 0 / {difficultyCounts.medium}</span>
          <span>Hard: 0 / {difficultyCounts.hard}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Your Progress</span>
        <span className="text-sm tabular-nums">
          <span className="font-bold">{solvedCount}</span>
          <span className="text-muted-foreground"> / {totalCount} solved</span>
          <span className="text-muted-foreground ml-1">({percent.toFixed(1)}%)</span>
        </span>
      </div>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span>
          Easy: <span className="font-medium text-green-600 dark:text-green-400">{difficultyCounts.easy}</span>
        </span>
        <span>
          Medium: <span className="font-medium text-amber-600 dark:text-amber-400">{difficultyCounts.medium}</span>
        </span>
        <span>
          Hard: <span className="font-medium text-red-600 dark:text-red-400">{difficultyCounts.hard}</span>
        </span>
      </div>
    </div>
  );
}
