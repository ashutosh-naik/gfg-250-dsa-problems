"use client";

import { Problem } from "@/data/problems";
import { useProgress } from "@/contexts/ProgressContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, ExternalLink, BookOpen } from "lucide-react";

interface ProblemRowProps {
  problem: Problem;
  index: number;
}

export function ProblemRow({ problem, index }: ProblemRowProps) {
  const { isSolved, toggleSolved } = useProgress();
  const solved = isSolved(problem.id);

  const difficultyStyles: Record<string, string> = {
    Easy: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    Hard: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  };

  const hasLink = Boolean(problem.link || problem.article);

  return (
    <div
      className={`group flex items-center gap-1.5 sm:gap-2 lg:gap-3 px-2 sm:px-3 lg:px-4 py-2.5 sm:py-3 border-b last:border-b-0 transition-colors min-h-[52px] sm:min-h-0 ${
        solved ? "bg-green-500/5" : "hover:bg-accent/30"
      }`}
    >
      {/* Index - hidden on smallest screens */}
      <span className="hidden xs:block w-5 sm:w-6 lg:w-8 text-xs text-muted-foreground text-right tabular-nums shrink-0">
        {index}
      </span>

      {/* Checkbox - larger touch target */}
      <button
        onClick={() => toggleSolved(problem.id)}
        className="shrink-0 cursor-pointer focus:outline-none p-1 -ml-1 sm:ml-0"
        title={solved ? "Mark as unsolved" : "Mark as solved"}
      >
        {solved ? (
          <CheckCircle2 className="h-5 w-5 sm:h-5 sm:w-5 text-green-500" />
        ) : (
          <Circle className="h-5 w-5 sm:h-5 sm:w-5 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors" />
        )}
      </button>

      {/* Title + Links */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {hasLink ? (
            <a
              href={problem.link || problem.article || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium truncate hover:text-green-600 dark:hover:text-green-400 transition-colors py-0.5"
            >
              {problem.title}
            </a>
          ) : (
            <span className="text-sm font-medium truncate text-muted-foreground py-0.5">
              {problem.title}
            </span>
          )}
          {problem.link && (
            <a
              href={problem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-muted-foreground/40 hover:text-green-500 transition-colors p-0.5"
              title="Solve on GeeksforGeeks"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {problem.article && (
            <a
              href={problem.article}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-muted-foreground/40 hover:text-blue-500 transition-colors p-0.5"
              title="Read article"
            >
              <BookOpen className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 flex-wrap">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal text-muted-foreground leading-none">
            {problem.pattern}
          </Badge>
          <span
            className={`inline-flex items-center rounded-full border px-1.5 sm:px-2 py-0 text-[10px] font-medium h-4 leading-none ${
              difficultyStyles[problem.difficulty] || ""
            }`}
          >
            {problem.difficulty}
          </span>
        </div>
      </div>

      {/* Action button - compact on mobile */}
      <Button
        variant={solved ? "secondary" : "outline"}
        size="sm"
        onClick={() => toggleSolved(problem.id)}
        className={`shrink-0 cursor-pointer text-xs h-8 min-w-[52px] px-2 sm:px-3 ${
          solved
            ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/20"
            : ""
        }`}
      >
        {solved ? "Done" : "Mark"}
      </Button>
    </div>
  );
}
