"use client";

import { Suspense, useState, useMemo, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { StatsBar } from "@/components/layout/StatsBar";
import { ProblemList } from "@/components/problems/ProblemList";
import { FilterSidebar, type SortOption } from "@/components/filters/FilterSidebar";
import { useSearchParams, useRouter } from "next/navigation";
import { useProgress } from "@/contexts/ProgressContext";
import { PROBLEMS } from "@/data/problems";

function sortProblems(problems: typeof PROBLEMS, sortBy: SortOption) {
  const sorted = [...problems];
  switch (sortBy) {
    case "title-asc":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "difficulty": {
      const order = { Easy: 0, Medium: 1, Hard: 2 };
      sorted.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
      break;
    }
    case "difficulty-desc": {
      const order = { Easy: 2, Medium: 1, Hard: 0 };
      sorted.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
      break;
    }
  }
  return sorted;
}

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isSolved } = useProgress();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const selectedPatterns = useMemo(
    () => searchParams.get("pattern")?.split(",") || [],
    [searchParams],
  );
  const selectedDifficulties = useMemo(
    () => searchParams.get("difficulty")?.split(",") || [],
    [searchParams],
  );
  const selectedStatus = useMemo(
    () => searchParams.get("status")?.split(",") || [],
    [searchParams],
  );

  const updateUrl = useCallback(
    (key: string, values: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const handlePatternChange = useCallback(
    (pattern: string, checked: boolean) => {
      const next = checked
        ? [...selectedPatterns, pattern]
        : selectedPatterns.filter((p) => p !== pattern);
      updateUrl("pattern", next);
    },
    [selectedPatterns, updateUrl],
  );

  const handleDifficultyChange = useCallback(
    (difficulty: string, checked: boolean) => {
      const next = checked
        ? [...selectedDifficulties, difficulty]
        : selectedDifficulties.filter((d) => d !== difficulty);
      updateUrl("difficulty", next);
    },
    [selectedDifficulties, updateUrl],
  );

  const handleStatusChange = useCallback(
    (status: string, checked: boolean) => {
      const next = checked
        ? [...selectedStatus, status]
        : selectedStatus.filter((s) => s !== status);
      updateUrl("status", next);
    },
    [selectedStatus, updateUrl],
  );

  const handleClearAll = useCallback(() => {
    router.replace("/", { scroll: false });
  }, [router]);

  const filteredProblems = useMemo(() => {
    const result = PROBLEMS.filter((problem) => {
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
    return sortProblems(result, sortBy);
  }, [selectedPatterns, selectedDifficulties, selectedStatus, isSolved, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 relative">
        {/* Desktop sidebar */}
        <FilterSidebar
          selectedPatterns={selectedPatterns}
          selectedDifficulties={selectedDifficulties}
          selectedStatus={selectedStatus}
          onPatternChange={handlePatternChange}
          onDifficultyChange={handleDifficultyChange}
          onStatusChange={handleStatusChange}
          onClearAll={handleClearAll}
          sortBy={sortBy}
          onSortChange={setSortBy}
          className="hidden lg:block"
        />

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className={`absolute left-0 top-0 bottom-0 bg-background shadow-xl transition-all ${
                sidebarOpen ? "w-[85vw] max-w-sm" : "w-0"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <FilterSidebar
                selectedPatterns={selectedPatterns}
                selectedDifficulties={selectedDifficulties}
                selectedStatus={selectedStatus}
                onPatternChange={handlePatternChange}
                onDifficultyChange={handleDifficultyChange}
                onStatusChange={handleStatusChange}
                onClearAll={handleClearAll}
                sortBy={sortBy}
                onSortChange={setSortBy}
                className="!w-full !border-r-0"
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 max-w-full">
            <StatsBar />
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredProblems.length}
                </span>{" "}
                <span className="hidden xs:inline">of </span>
                <span className="font-medium text-foreground">
                  {PROBLEMS.length}
                </span>{" "}
                <span className="hidden xs:inline">problems</span>
              </p>
            </div>
            <ProblemList problems={filteredProblems} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-screen bg-background font-sans">
          <Header />
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
