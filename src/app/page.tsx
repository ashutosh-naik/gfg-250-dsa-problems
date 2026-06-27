"use client";

import { Header } from "@/components/layout/Header";
import { StatsBar } from "@/components/layout/StatsBar";
import { ProblemList } from "@/components/problems/ProblemList";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { useSearchParams, useRouter } from "next/navigation";
import { useProgress } from "@/contexts/ProgressContext";
import { PROBLEMS } from "@/data/problems";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isSolved } = useProgress();

  const selectedPatterns = searchParams.get("pattern")?.split(",") || [];
  const selectedDifficulties = searchParams.get("difficulty")?.split(",") || [];
  const selectedStatus = searchParams.get("status")?.split(",") || [];

  const handlePatternChange = (pattern: string, checked: boolean) => {
    const current = selectedPatterns;
    const next = checked
      ? [...current, pattern]
      : current.filter((p) => p !== pattern);
    updateUrl("pattern", next);
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    const current = selectedDifficulties;
    const next = checked
      ? [...current, difficulty]
      : current.filter((d) => d !== difficulty);
    updateUrl("difficulty", next);
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const current = selectedStatus;
    const next = checked
      ? [...current, status]
      : current.filter((s) => s !== status);
    updateUrl("status", next);
  };

  const updateUrl = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (values.length > 0) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleClearAll = () => {
    router.replace("/", { scroll: false });
  };

  const filteredProblems = PROBLEMS.filter((problem) => {
    if (
      selectedPatterns.length > 0 &&
      !selectedPatterns.includes(problem.patternSlug)
    ) {
      return false;
    }
    if (
      selectedDifficulties.length > 0 &&
      !selectedDifficulties.includes(problem.difficulty)
    ) {
      return false;
    }
    if (selectedStatus.length > 0) {
      const solved = isSolved(problem.id);
      if (selectedStatus.includes("Solved") && !solved) return false;
      if (selectedStatus.includes("Unsolved") && solved) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <div className="flex-1 flex">
        <FilterSidebar
          selectedPatterns={selectedPatterns}
          selectedDifficulties={selectedDifficulties}
          selectedStatus={selectedStatus}
          onPatternChange={handlePatternChange}
          onDifficultyChange={handleDifficultyChange}
          onStatusChange={handleStatusChange}
          onClearAll={handleClearAll}
        />
        <div className="flex-1 p-4">
          <StatsBar />
          <ProblemList problems={filteredProblems} />
        </div>
      </div>
    </div>
  );
}
