"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { springPresets } from "@/lib/motion";
import { TaskCard } from "./task-card";
import { useTasks, useCreateTask } from "@/hooks/use-tasks";
import type { Enums } from "@/types/database";

interface TaskListProps {
  folder: Enums<"task_folder">;
}

export function TaskList({ folder }: TaskListProps) {
  const { data: tasks, isLoading } = useTasks(folder);
  const { mutate: createTask } = useCreateTask();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleStartAdd() {
    setIsAddingTask(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function handleSubmit() {
    const title = newTaskTitle.trim();
    if (title) {
      createTask({ title, folder });
    }
    setNewTaskTitle("");
    setIsAddingTask(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") {
      setNewTaskTitle("");
      setIsAddingTask(false);
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 rounded-xl bg-white/5 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4">
      <AnimatePresence initial={false}>
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {isAddingTask && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={springPresets.fluidExpand}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-[--primary]/30 mt-1"
          >
            <div className="w-5 h-5 rounded-full border-2 border-[--primary]/50 shrink-0" />
            <input
              ref={inputRef}
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSubmit}
              placeholder="New task..."
              className="flex-1 bg-transparent text-sm text-[--on-surface] placeholder:text-[--outline] font-[family-name:var(--font-inter)] focus:outline-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isAddingTask && (
        <motion.button
          onClick={handleStartAdd}
          className="flex items-center gap-2 w-full px-3 py-2 mt-1 rounded-xl text-[--on-surface-variant] hover:text-[--on-surface] hover:bg-white/5 transition-colors text-sm font-[family-name:var(--font-inter)]"
          whileHover={{ x: 2, transition: springPresets.snappy }}
        >
          <Plus className="w-4 h-4" />
          Add task
        </motion.button>
      )}

      {(!tasks || tasks.length === 0) && !isAddingTask && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-2xl mb-2">✓</p>
          <p className="text-sm text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
            All clear — nothing here.
          </p>
        </div>
      )}
    </div>
  );
}
