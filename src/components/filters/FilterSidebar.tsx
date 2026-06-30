"use client";

import { PATTERNS } from "@/data/problems";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, X } from "lucide-react";

export type SortOption = "default" | "title-asc" | "title-desc" | "difficulty" | "difficulty-desc";

interface FilterSidebarProps {
  selectedPatterns: string[];
  selectedDifficulties: string[];
  selectedStatus: string[];
  onPatternChange: (pattern: string, checked: boolean) => void;
  onDifficultyChange: (difficulty: string, checked: boolean) => void;
  onStatusChange: (status: string, checked: boolean) => void;
  onClearAll: () => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

export function FilterSidebar({
  selectedPatterns,
  selectedDifficulties,
  selectedStatus,
  onPatternChange,
  onDifficultyChange,
  onStatusChange,
  onClearAll,
  sortBy,
  onSortChange,
  className = "",
}: FilterSidebarProps) {
  const difficulties = ["Easy", "Medium", "Hard"];
  const statuses = ["Solved", "Unsolved"];
  const activeFilterCount =
    selectedPatterns.length + selectedDifficulties.length + selectedStatus.length;

  return (
    <div className={`w-64 sm:w-72 shrink-0 border-r bg-card h-full overflow-y-auto overscroll-contain ${className}`}>
      <div className="p-3 sm:p-4 space-y-4 sm:space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
            <h2 className="font-semibold text-sm sm:text-base">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium px-1.5">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearAll}
              className="h-8 w-8 cursor-pointer"
              title="Clear all filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Sort problems"
            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="default">Default (ID)</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="difficulty">Difficulty (Easy first)</option>
            <option value="difficulty-desc">Difficulty (Hard first)</option>
          </select>
        </div>

        <Separator />

        {/* Difficulty Filter */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Difficulty</h3>
          <div className="space-y-1">
            {difficulties.map((difficulty) => {
              const colorDot =
                difficulty === "Easy"
                  ? "bg-green-500"
                  : difficulty === "Medium"
                    ? "bg-amber-500"
                    : "bg-red-500";
              return (
                <label
                  key={difficulty}
                  htmlFor={`difficulty-${difficulty}`}
                  className="flex items-center gap-2.5 rounded-md px-2 py-2 sm:py-1.5 hover:bg-accent/50 cursor-pointer transition-colors min-h-[36px] sm:min-h-0"
                >
                  <Checkbox
                    id={`difficulty-${difficulty}`}
                    checked={selectedDifficulties.includes(difficulty)}
                    onCheckedChange={(checked) =>
                      onDifficultyChange(difficulty, checked === true)
                    }
                  />
                  <span className={`h-2 w-2 rounded-full shrink-0 ${colorDot}`} />
                  <span className="text-sm flex-1">{difficulty}</span>
                </label>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Status Filter */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</h3>
          <div className="space-y-1">
            {statuses.map((status) => (
              <label
                key={status}
                htmlFor={`status-${status}`}
                className="flex items-center gap-2.5 rounded-md px-2 py-2 sm:py-1.5 hover:bg-accent/50 cursor-pointer transition-colors min-h-[36px] sm:min-h-0"
              >
                <Checkbox
                  id={`status-${status}`}
                  checked={selectedStatus.includes(status)}
                  onCheckedChange={(checked) =>
                    onStatusChange(status, checked === true)
                  }
                />
                <span className="text-sm flex-1">{status}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        {/* Pattern Filter */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Topics / Patterns
          </h3>
          <div className="space-y-0.5 max-h-[200px] sm:max-h-[280px] lg:max-h-[320px] overflow-y-auto overscroll-contain pr-1">
            {PATTERNS.map((pattern) => (
              <label
                key={pattern.slug}
                htmlFor={`pattern-${pattern.slug}`}
                className="flex items-center gap-2.5 rounded-md px-2 py-2 sm:py-1.5 hover:bg-accent/50 cursor-pointer transition-colors min-h-[36px] sm:min-h-0"
              >
                <Checkbox
                  id={`pattern-${pattern.slug}`}
                  checked={selectedPatterns.includes(pattern.slug)}
                  onCheckedChange={(checked) =>
                    onPatternChange(pattern.slug, checked === true)
                  }
                />
                <span className="text-sm flex-1 truncate">{pattern.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums shrink-0">{pattern.total}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
