"use client";

import { useProgress } from "@/contexts/ProgressContext";

export function StatsBar() {
  const { solvedCount, totalCount, percent, isMounted } = useProgress();

  if (!isMounted) {
    return (
      <div className="p-4 border-b space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Progress</span>
          <span className="text-muted-foreground">
            0 / {totalCount} solved (0.0%)
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{ width: "0%", backgroundColor: "#2F8D46" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-b space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Progress</span>
        <span className="text-muted-foreground">
          {solvedCount} / {totalCount} solved ({percent.toFixed(1)}%)
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${percent}%`, backgroundColor: "#2F8D46" }}
        />
      </div>
    </div>
  );
}
