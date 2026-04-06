"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, FolderOpen } from "lucide-react";
import { springPresets } from "@/lib/motion";
import { useUIStore } from "@/stores/ui-store";
import { useCreateProject } from "@/hooks/use-projects";

const COLORS = [
  "#6366F1", "#8B5CF6", "#EC4899", "#EF4444",
  "#F97316", "#EAB308", "#22C55E", "#06B6D4",
];

export function CreateProjectModal() {
  const { isCreateProjectOpen, setIsCreateProjectOpen } = useUIStore();
  const { mutate: createProject } = useCreateProject();
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  function handleClose() {
    setIsCreateProjectOpen(false);
    setName("");
    setColor(COLORS[0]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    createProject({ name: name.trim(), color });
    handleClose();
  }

  return (
    <AnimatePresence>
      {isCreateProjectOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 4 }}
              transition={springPresets.fluidExpand}
              className="w-full max-w-sm pointer-events-auto glass-high rounded-2xl p-6"
              style={{
                boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: color + "33" }}
                  >
                    <FolderOpen className="w-4 h-4" style={{ color }} />
                  </div>
                  <h2 className="text-base font-bold text-[--on-surface] font-[family-name:var(--font-manrope)]">
                    New Project
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[--on-surface-variant] hover:text-[--on-surface] hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label-sm text-[--on-surface-variant] mb-1.5 block">
                    Project Name
                  </label>
                  <input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Design System"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[--on-surface] text-sm placeholder:text-[--outline] font-[family-name:var(--font-inter)] focus:outline-none focus:border-[--primary]/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="label-sm text-[--on-surface-variant] mb-2 block">
                    Color
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className="w-7 h-7 rounded-full transition-transform cursor-pointer"
                        style={{
                          backgroundColor: c,
                          transform: color === c ? "scale(1.2)" : "scale(1)",
                          boxShadow: color === c ? `0 0 0 2px rgba(255,255,255,0.3)` : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-2.5 rounded-xl glass border border-white/10 text-[--on-surface-variant] text-sm font-medium cursor-pointer font-[family-name:var(--font-inter)] hover:text-[--on-surface] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!name.trim()}
                    className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold cursor-pointer font-[family-name:var(--font-inter)] disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ boxShadow: "0 4px 16px rgba(99,102,241,0.3)" }}
                  >
                    Create
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
