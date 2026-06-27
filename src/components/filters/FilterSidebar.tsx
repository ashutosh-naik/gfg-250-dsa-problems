"use client";

import { PATTERNS } from "@/data/problems";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface FilterSidebarProps {
  selectedPatterns: string[];
  selectedDifficulties: string[];
  selectedStatus: string[];
  onPatternChange: (pattern: string, checked: boolean) => void;
  onDifficultyChange: (difficulty: string, checked: boolean) => void;
  onStatusChange: (status: string, checked: boolean) => void;
  onClearAll: () => void;
}

export function FilterSidebar({
  selectedPatterns,
  selectedDifficulties,
  selectedStatus,
  onPatternChange,
  onDifficultyChange,
  onStatusChange,
  onClearAll,
}: FilterSidebarProps) {
  const difficulties = ["Easy", "Medium", "Hard"];
  const statuses = ["Solved", "Unsolved"];

  return (
    <div className="w-64 border-r p-4 space-y-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="cursor-pointer"
        >
          Clear All
        </Button>
      </div>

      <Separator />

      {/* Pattern Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">Topics / Patterns</h3>
        <div className="space-y-2">
          {PATTERNS.map((pattern) => (
            <div key={pattern.slug} className="flex items-center space-x-2">
              <Checkbox
                id={`pattern-${pattern.slug}`}
                checked={selectedPatterns.includes(pattern.slug)}
                onCheckedChange={(checked) =>
                  onPatternChange(pattern.slug, checked === true)
                }
              />
              <label
                htmlFor={`pattern-${pattern.slug}`}
                className="text-sm cursor-pointer flex-1"
              >
                {pattern.name} ({pattern.total})
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Difficulty Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">Difficulty</h3>
        <div className="space-y-2">
          {difficulties.map((difficulty) => (
            <div key={difficulty} className="flex items-center space-x-2">
              <Checkbox
                id={`difficulty-${difficulty}`}
                checked={selectedDifficulties.includes(difficulty)}
                onCheckedChange={(checked) =>
                  onDifficultyChange(difficulty, checked === true)
                }
              />
              <label
                htmlFor={`difficulty-${difficulty}`}
                className="text-sm cursor-pointer flex-1"
              >
                {difficulty}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Status Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm">Status</h3>
        <div className="space-y-2">
          {statuses.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status}`}
                checked={selectedStatus.includes(status)}
                onCheckedChange={(checked) =>
                  onStatusChange(status, checked === true)
                }
              />
              <label
                htmlFor={`status-${status}`}
                className="text-sm cursor-pointer flex-1"
              >
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
