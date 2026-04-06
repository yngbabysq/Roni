"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { format, parseISO } from "date-fns";
import {
  X, Calendar, Flag, Folder, AlignLeft, Plus, CheckCircle2, Trash2,
} from "lucide-react";
import { springPresets } from "@/lib/motion";
import { useUIStore } from "@/stores/ui-store";
import { useTasks, useUpdateTask, useDeleteTask, useCompleteTask } from "@/hooks/use-tasks";
import type { Tables } from "@/types/database";

type Task = Tables<"tasks">;

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low", color: "text-[--on-surface-variant]" },
  { value: "medium", label: "Medium", color: "text-yellow-400" },
  { value: "high", label: "High", color: "text-orange-400" },
  { value: "critical", label: "Critical", color: "text-red-400" },
] as const;

const FOLDER_OPTIONS = [
  { value: "inbox", label: "Inbox" },
  { value: "today", label: "Today" },
  { value: "upcoming", label: "Upcoming" },
  { value: "anytime", label: "Anytime" },
  { value: "someday", label: "Someday" },
] as const;

export function TaskDetail() {
  const { selectedTaskId, isTaskDetailOpen, setIsTaskDetailOpen, setSelectedTaskId } = useUIStore();
  const { data: tasks } = useTasks();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: completeTask } = useCompleteTask();

  const task = tasks?.find((t) => t.id === selectedTaskId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
    }
  }, [task]);

  function handleClose() {
    setIsTaskDetailOpen(false);
    setTimeout(() => setSelectedTaskId(null), 300);
  }

  function handleTitleBlur() {
    if (task && title.trim() && title !== task.title) {
      updateTask({ id: task.id, updates: { title: title.trim() } });
    }
  }

  function handleDescriptionBlur() {
    if (task && description !== (task.description ?? "")) {
      updateTask({ id: task.id, updates: { description: description || null } });
    }
  }

  function handlePriorityChange(priority: Task["priority"]) {
    if (task) updateTask({ id: task.id, updates: { priority } });
  }

  function handleFolderChange(folder: Task["folder"]) {
    if (task) updateTask({ id: task.id, updates: { folder } });
  }

  function handleDelete() {
    if (task) {
      deleteTask(task.id);
      handleClose();
    }
  }

  function handleComplete() {
    if (task) {
      completeTask(task.id);
      handleClose();
    }
  }

  return (
    <AnimatePresence>
      {isTaskDetailOpen && task && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={handleClose}
          />
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={springPresets.gentle}
            className="fixed right-0 top-0 bottom-0 z-50 w-96 glass-high flex flex-col"
            style={{
              boxShadow: "-8px 0 40px rgba(0,0,0,0.4), inset 1px 0 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 text-sm text-[--on-surface-variant] hover:text-[--success] transition-colors cursor-pointer group font-[family-name:var(--font-inter)]"
              >
                <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Complete
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleDelete}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[--on-surface-variant] hover:text-[--error] hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[--on-surface-variant] hover:text-[--on-surface] hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto thin-scrollbar p-5 space-y-5">
              {/* Title */}
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleBlur}
                rows={2}
                className="w-full text-xl font-bold text-[--on-surface] font-[family-name:var(--font-manrope)] bg-transparent resize-none focus:outline-none placeholder:text-[--outline] leading-snug tracking-tight"
                placeholder="Task title"
              />

              {/* Description */}
              <div className="flex gap-2.5">
                <AlignLeft className="w-4 h-4 text-[--on-surface-variant] mt-0.5 shrink-0" />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={handleDescriptionBlur}
                  rows={3}
                  className="flex-1 text-sm text-[--on-surface-variant] bg-transparent resize-none focus:outline-none placeholder:text-[--outline] font-[family-name:var(--font-inter)] leading-relaxed"
                  placeholder="Add description..."
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-white/5" />

              {/* Priority */}
              <div className="flex items-center gap-3">
                <Flag className="w-4 h-4 text-[--on-surface-variant] shrink-0" />
                <div className="flex items-center gap-1.5">
                  {PRIORITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handlePriorityChange(opt.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer font-[family-name:var(--font-inter)] ${
                        task.priority === opt.value
                          ? `bg-white/10 ${opt.color}`
                          : "text-[--on-surface-variant] hover:bg-white/5"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Folder */}
              <div className="flex items-center gap-3">
                <Folder className="w-4 h-4 text-[--on-surface-variant] shrink-0" />
                <div className="flex items-center gap-1.5 flex-wrap">
                  {FOLDER_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleFolderChange(opt.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer font-[family-name:var(--font-inter)] ${
                        task.folder === opt.value
                          ? "bg-[--primary]/20 text-[--primary]"
                          : "text-[--on-surface-variant] hover:bg-white/5"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[--on-surface-variant] shrink-0" />
                <input
                  type="date"
                  value={task.due_date ?? ""}
                  onChange={(e) =>
                    updateTask({ id: task.id, updates: { due_date: e.target.value || null } })
                  }
                  className="text-sm text-[--on-surface-variant] bg-transparent focus:outline-none font-[family-name:var(--font-inter)] cursor-pointer [color-scheme:dark]"
                />
              </div>

              {/* Created at */}
              <div className="h-px bg-white/5" />
              <p className="text-xs text-[--outline] font-[family-name:var(--font-inter)]">
                Created {format(parseISO(task.created_at), "MMM d, yyyy")}
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
