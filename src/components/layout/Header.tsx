"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore, useCallback } from "react";

function useHydrated() {
  return useSyncExternalStore(
    useCallback(() => () => {}, []),
    () => true,
    () => false,
  );
}

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6 safe-area-padding">
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden h-9 w-9 sm:h-10 sm:w-10"
            onClick={onToggleSidebar}
            aria-label="Toggle filter sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity min-w-0"
          >
            <Image
              src="/geeksforgeeks.ico"
              alt="GeeksforGeeks"
              width={32}
              height={32}
              className="rounded shrink-0 sm:w-9 sm:h-9"
              priority
            />
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg font-bold tracking-tight leading-tight truncate">
                GFG DSA
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight truncate hidden xs:block">
                Master Data Structures & Algorithms
              </p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer h-9 w-9 sm:h-10 sm:w-10"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {!hydrated ? (
              <div className="h-5 w-5" />
            ) : theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
