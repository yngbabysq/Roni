"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, CalendarDays, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { springPresets } from "@/lib/motion";
import { useCompleteTask } from "@/hooks/use-tasks";
import { useUIStore } from "@/stores/ui-store";
import type { Tables } from "@/types/database";

type Task = Tables<"tasks">;

const PRIORITY_CONFIG = {
  critical: { label: "CRITICAL", color: "text-red-400", dot: "bg-red-400" },
  high: { label: "HIGH", color: "text-orange-400", dot: "bg-orange-400" },
  medium: { label: "MED", color: "text-yellow-400", dot: "bg-yellow-400" },
  low: { label: "LOW", color: "text-[--on-surface-variant]", dot: "bg-[--on-surface-variant]" },
};

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isChecking, setIsChecking] = useState(false);
  const { mutate: completeTask } = useCompleteTask();
  const { setSelectedTaskId, setIsTaskDetailOpen } = useUIStore();
  const priority = PRIORITY_CONFIG[task.priority];

  function handleComplete() {
    setIsChecking(true);
    setTimeout(() => {
      completeTask(task.id);
    }, 400);
  }

  function handleOpenDetail() {
    setSelectedTaskId(task.id);
    setIsTaskDetailOpen(true);
  }

  return (
    <AnimatePresence>
      {!isChecking && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          transition={springPresets.fluidExpand}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/4 transition-colors group cursor-pointer"
          onClick={handleOpenDetail}
        >
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleComplete();
            }}
            className="shrink-0 relative w-5 h-5"
            whileTap={{ scale: 0.85, transition: springPresets.snappy }}
          >
            <motion.div
              className={cn(
                "w-5 h-5 rounded-full border-2 transition-all",
                isChecking
                  ? "border-[--primary] bg-[--primary]"
                  : "border-white/20 group-hover:border-[--primary]/60"
              )}
              animate={isChecking ? { scale: [1, 1.3, 0.9, 1] } : {}}
              transition={springPresets.bounce}
            />
            <AnimatePresence>
              {isChecking && (
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 w-5 h-5"
                  viewBox="0 0 20 20"
                >
                  <motion.path
                    d="M5 10l3.5 3.5L15 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>

          <span className="flex-1 text-sm text-[--on-surface] font-[family-name:var(--font-inter)] truncate">
            {task.title}
          </span>

          <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            {task.priority !== "medium" && (
              <div className={cn("flex items-center gap-1", priority.color)}>
                {task.priority === "critical" && <AlertCircle className="w-3 h-3" />}
                <span className="label-sm">{priority.label}</span>
              </div>
            )}
            {task.due_date && (
              <div className="flex items-center gap-1 text-[--on-surface-variant]">
                <CalendarDays className="w-3 h-3" />
                <span className="text-xs font-[family-name:var(--font-inter)]">
                  {format(new Date(task.due_date), "MMM d")}
                </span>
              </div>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-[--on-surface-variant]" />
          </div>

          <div
            className={cn(
              "shrink-0 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-0 transition-opacity",
              priority.dot
            )}
            style={{
              opacity: task.priority === "critical" || task.priority === "high" ? 1 : 0,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
