"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Zap, FolderOpen, Bell, Clock } from "lucide-react";
import { springPresets } from "@/lib/motion";
import { useUIStore } from "@/stores/ui-store";

const MENU_ITEMS = [
  { icon: Zap, label: "Quick Task", shortcut: "⌘K", action: "quickTask" },
  { icon: FolderOpen, label: "Project", shortcut: "⌘P", action: "project" },
  { icon: Bell, label: "Reminder", shortcut: "⌃R", action: "reminder" },
  { icon: Clock, label: "Time Block", shortcut: "⌃T", action: "timeBlock" },
];

export function MagicButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsCreateProjectOpen } = useUIStore();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleAction(action: string) {
    setIsOpen(false);
    if (action === "project") {
      setIsCreateProjectOpen(true);
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={springPresets.fluidExpand}
              className="flex flex-col gap-1 glass-high light-leak-strong rounded-2xl p-2 mb-1 min-w-[200px]"
            >
              {MENU_ITEMS.map((item, i) => (
                <motion.button
                  key={item.action}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ ...springPresets.fluidExpand, delay: i * 0.04 }}
                  onClick={() => handleAction(item.action)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-[--on-surface] group"
                >
                  <item.icon className="w-4 h-4 text-[--primary]" />
                  <span className="flex-1 text-sm font-medium font-[family-name:var(--font-inter)] text-left">
                    {item.label}
                  </span>
                  <kbd className="label-sm text-[--on-surface-variant] bg-white/5 px-1.5 py-0.5 rounded">
                    {item.shortcut}
                  </kbd>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-14 h-14 rounded-full gradient-primary light-leak flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.05, transition: springPresets.snappy }}
          whileTap={{ scale: 0.93, transition: springPresets.snappy }}
          style={{ boxShadow: "0 8px 32px rgba(99, 102, 241, 0.4)" }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={springPresets.fluidExpand}
          >
            <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
          </motion.div>
        </motion.button>
      </div>
    </>
  );
}
