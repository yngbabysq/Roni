"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Inbox, Sun, Calendar, Archive, Clock, Zap, BarChart2, Settings, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { springPresets } from "@/lib/motion";
import { useUIStore } from "@/stores/ui-store";
import { useTasks } from "@/hooks/use-tasks";

const NAV_ITEMS = [
  { label: "Inbox", href: "/inbox", icon: Inbox, group: "Navigate" },
  { label: "Today", href: "/today", icon: Sun, group: "Navigate" },
  { label: "Upcoming", href: "/upcoming", icon: Calendar, group: "Navigate" },
  { label: "Anytime", href: "/anytime", icon: Archive, group: "Navigate" },
  { label: "Someday", href: "/someday", icon: Clock, group: "Navigate" },
  { label: "Calendar", href: "/calendar", icon: Calendar, group: "Navigate" },
  { label: "Focus", href: "/focus", icon: Zap, group: "Navigate" },
  { label: "Insights", href: "/insights", icon: BarChart2, group: "Navigate" },
  { label: "Settings", href: "/settings", icon: Settings, group: "Navigate" },
];

export function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen } = useUIStore();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data: tasks } = useTasks();

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  const filteredNav = NAV_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTasks = (tasks ?? [])
    .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()) && query.length > 0)
    .slice(0, 5);

  const allResults = [
    ...filteredNav.map((item) => ({ ...item, type: "nav" as const })),
    ...filteredTasks.map((t) => ({
      label: t.title,
      href: `/inbox`,
      icon: Search,
      group: "Tasks",
      type: "task" as const,
      id: t.id,
    })),
  ];

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function handleSelect(index: number) {
    const item = allResults[index];
    if (!item) return;
    router.push(item.href);
    setIsCommandPaletteOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, allResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      handleSelect(activeIndex);
    } else if (e.key === "Escape") {
      setIsCommandPaletteOpen(false);
    }
  }

  const groups = allResults.reduce<Record<string, typeof allResults>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  let globalIndex = 0;

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsCommandPaletteOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={springPresets.fluidExpand}
              className="w-full max-w-lg pointer-events-auto"
              style={{
                boxShadow: "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              <div className="glass-high rounded-2xl overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
                  <Search className="w-4 h-4 text-[--on-surface-variant] shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search or jump to..."
                    className="flex-1 bg-transparent text-sm text-[--on-surface] placeholder:text-[--outline] focus:outline-none font-[family-name:var(--font-inter)]"
                  />
                  <kbd className="label-sm text-[--on-surface-variant] bg-white/5 px-1.5 py-0.5 rounded">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div className="max-h-80 overflow-y-auto thin-scrollbar py-2">
                  {allResults.length === 0 && (
                    <p className="text-sm text-[--on-surface-variant] text-center py-8 font-[family-name:var(--font-inter)]">
                      No results found
                    </p>
                  )}
                  {Object.entries(groups).map(([group, items]) => (
                    <div key={group}>
                      <p className="label-sm text-[--on-surface-variant] px-4 py-2">{group}</p>
                      {items.map((item) => {
                        const Icon = item.icon;
                        const idx = globalIndex++;
                        const isActive = idx === activeIndex;
                        return (
                          <button
                            key={`${item.group}-${item.label}`}
                            onClick={() => handleSelect(idx)}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer font-[family-name:var(--font-inter)] ${
                              isActive
                                ? "bg-[--primary]/10 text-[--on-surface]"
                                : "text-[--on-surface-variant] hover:text-[--on-surface]"
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="flex-1 text-left">{item.label}</span>
                            {isActive && <ArrowRight className="w-3.5 h-3.5 opacity-60" />}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
