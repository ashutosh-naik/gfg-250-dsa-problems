"use client";

import { Problem } from "@/data/problems";
import { useProgress } from "@/contexts/ProgressContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface ProblemRowProps {
  problem: Problem;
}

export function ProblemRow({ problem }: ProblemRowProps) {
  const { isSolved, toggleSolved } = useProgress();
  const solved = isSolved(problem.id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "Hard":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {problem.link ? (
            <a
              href={problem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium truncate hover:underline cursor-pointer"
            >
              {problem.title}
            </a>
          ) : (
            <h3 className="font-medium truncate">{problem.title}</h3>
          )}
          {problem.article && (
            <a
              href={problem.article}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
              title="Read article"
            >
              <BookOpen className="h-4 w-4" />
            </a>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="outline" className="text-xs">
            {problem.pattern}
          </Badge>
          <Badge
            className={`text-xs ${getDifficultyColor(problem.difficulty)}`}
          >
            {problem.difficulty}
          </Badge>
        </div>
      </div>
      <Button
        variant={solved ? "default" : "outline"}
        size="sm"
        onClick={() => toggleSolved(problem.id)}
        className="ml-4 cursor-pointer"
      >
        {solved ? "Solved" : "Mark Solved"}
      </Button>
    </div>
  );
}
