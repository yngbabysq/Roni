"use client";

import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";

const PAGE_TITLES: Record<string, string> = {
  "/app/inbox": "Task Stream",
  "/app/today": "Today",
  "/app/upcoming": "Upcoming",
  "/app/anytime": "Anytime",
  "/app/someday": "Someday",
  "/app/calendar": "Calendar",
  "/app/focus": "Focus",
  "/app/insights": "Insights",
  "/app/settings": "Settings",
};

export function TopBar() {
  const pathname = usePathname();
  const { setIsCommandPaletteOpen } = useUIStore();
  const title = PAGE_TITLES[pathname] ?? "Roni";
  const isTaskView = ["/app/inbox", "/app/today", "/app/upcoming", "/app/anytime", "/app/someday"].includes(pathname);

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-bold text-[--on-surface] font-[family-name:var(--font-manrope)] tracking-tight">
          {title}
        </h1>
        {isTaskView && (
          <div className="flex items-center gap-1">
            <TabButton label="Activity" active />
            <TabButton label="Archive" active={false} />
          </div>
        )}
      </div>

      <button
        onClick={() => setIsCommandPaletteOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass border border-white/10 text-[--on-surface-variant] hover:text-[--on-surface] hover:border-white/20 transition-all text-sm font-[family-name:var(--font-inter)]"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="text-xs">Search</span>
        <kbd className="label-sm bg-white/5 px-1.5 py-0.5 rounded text-[--on-surface-variant]">
          ⌘K
        </kbd>
      </button>
    </header>
  );
}

function TabButton({ label, active }: { label: string; active: boolean }) {
  return (
    <button
      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors font-[family-name:var(--font-inter)] ${
        active
          ? "bg-white/10 text-[--on-surface]"
          : "text-[--on-surface-variant] hover:text-[--on-surface]"
      }`}
    >
      {label}
    </button>
  );
}
