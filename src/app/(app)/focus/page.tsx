"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { springPresets } from "@/lib/motion";
import { useFocusStore } from "@/stores/focus-store";
import { Zap, X } from "lucide-react";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const SESSION_LABEL: Record<string, string> = {
  work: "Deep Work",
  short_break: "Short Break",
  long_break: "Long Break",
};

export default function FocusPage() {
  const {
    isRunning, isPaused, currentSession,
    timeRemaining, sessionsCompleted, dailyGoal,
    startSession, pauseSession, resumeSession, endSession, skipBreak, tick,
    workDuration,
  } = useFocusStore();

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const progress = 1 - timeRemaining / (workDuration * 60);
  const circumference = 2 * Math.PI * 90;

  return (
    <div className="flex flex-col h-full bg-[--surface-dim] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 30%, var(--electric-indigo), transparent)",
        }}
      />

      <div className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[--primary]" />
          <span className="label-sm text-[--on-surface-variant]">RONI — PRODUCTIVITY MODE</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[--electric-indigo]/20 border border-[--electric-indigo]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[--electric-indigo] animate-pulse" />
          <span className="label-sm text-[--primary]">Deep Work</span>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-10">
        <p className="label-sm text-[--on-surface-variant]">
          {SESSION_LABEL[currentSession]}
        </p>

        <div className="relative">
          <svg className="w-56 h-56 -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100" cy="100" r="90"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            <motion.circle
              cx="100" cy="100" r="90"
              fill="none"
              stroke="url(#timerGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              transition={{ duration: 0.5, ease: "linear" }}
            />
            <defs>
              <linearGradient id="timerGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="var(--electric-indigo)" />
                <stop offset="100%" stopColor="var(--vibrant-violet)" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={timeRemaining}
              className="text-6xl font-extrabold text-[--on-surface] font-[family-name:var(--font-manrope)] tracking-[-0.04em] tabular-nums"
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              transition={springPresets.snappy}
            >
              {formatTime(timeRemaining)}
            </motion.span>
            <span className="label-sm text-[--on-surface-variant] mt-1">REMAINING</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: dailyGoal }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: i < sessionsCompleted
                  ? "var(--primary)"
                  : "rgba(255,255,255,0.1)",
              }}
              animate={i === sessionsCompleted && isRunning ? { scale: [1, 1.3, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {!isRunning && !isPaused && (
            <motion.button
              onClick={startSession}
              className="px-8 py-3 rounded-2xl gradient-primary text-white font-semibold text-base light-leak font-[family-name:var(--font-inter)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={springPresets.snappy}
            >
              Start Focus
            </motion.button>
          )}

          {isRunning && (
            <motion.button
              onClick={pauseSession}
              className="px-8 py-3 rounded-2xl glass border border-white/15 text-[--on-surface] font-semibold text-base font-[family-name:var(--font-inter)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={springPresets.snappy}
            >
              Pause
            </motion.button>
          )}

          {isPaused && (
            <motion.button
              onClick={resumeSession}
              className="px-8 py-3 rounded-2xl gradient-primary text-white font-semibold text-base light-leak font-[family-name:var(--font-inter)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={springPresets.snappy}
            >
              Resume
            </motion.button>
          )}

          {(isRunning || isPaused) && (
            <>
              {currentSession !== "work" && (
                <motion.button
                  onClick={skipBreak}
                  className="px-5 py-3 rounded-2xl glass border border-white/10 text-[--on-surface-variant] text-sm font-medium font-[family-name:var(--font-inter)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springPresets.snappy}
                >
                  Skip break
                </motion.button>
              )}
              <motion.button
                onClick={endSession}
                className="p-3 rounded-2xl glass border border-white/10 text-[--on-surface-variant] hover:text-[--error] hover:border-red-500/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={springPresets.snappy}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </>
          )}
        </div>

        <p className="text-xs text-[--on-surface-variant] font-[family-name:var(--font-inter)]">
          {sessionsCompleted} / {dailyGoal} sessions today
        </p>
      </div>
    </div>
  );
}
