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
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/geeksforgeeks.ico"
              alt="GeeksforGeeks"
              width={36}
              height={36}
              className="rounded"
              priority
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight leading-tight">
                GeeksforGeeks DSA
              </h1>
              <p className="text-xs text-muted-foreground leading-tight">
                Master Data Structures & Algorithms
              </p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer"
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
