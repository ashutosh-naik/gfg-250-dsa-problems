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

  return (
    <div className="rounded-lg border bg-card p-3 sm:p-4 space-y-2.5 sm:space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs sm:text-sm font-semibold shrink-0">Your Progress</span>
        <span className="text-xs sm:text-sm tabular-nums text-right min-w-0">
          <span className="font-bold">{isHydrated ? solvedCount : 0}</span>
          <span className="text-muted-foreground">
            <span className="hidden xs:inline"> / {totalCount} solved</span>
            <span className="xs:hidden">/{totalCount}</span>
          </span>
          <span className="text-muted-foreground ml-1">
            <span className="hidden xs:inline">({(isHydrated ? percent : 0).toFixed(1)}%)</span>
            <span className="xs:hidden">({(isHydrated ? percent : 0).toFixed(0)}%)</span>
          </span>
        </span>
      </div>
      <div className="h-2 sm:h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${isHydrated ? barColor : ""}`}
          style={{ width: `${isHydrated ? percent : 0}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 sm:gap-4 text-xs text-muted-foreground">
        <span>
          Easy:{" "}
          <span className="font-medium text-green-600 dark:text-green-400">
            {difficultyCounts.easy}
          </span>
        </span>
        <span>
          Medium:{" "}
          <span className="font-medium text-amber-600 dark:text-amber-400">
            {difficultyCounts.medium}
          </span>
        </span>
        <span>
          Hard:{" "}
          <span className="font-medium text-red-600 dark:text-red-400">
            {difficultyCounts.hard}
          </span>
        </span>
      </div>
    </div>
  );
}
