"use client";

import { create } from "zustand";
import type { Enums } from "@/types/database";

type SessionType = Enums<"focus_session_type">;

interface FocusState {
  isRunning: boolean;
  isPaused: boolean;
  currentSession: SessionType;
  timeRemaining: number;
  sessionsCompleted: number;
  activeTaskId: string | null;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  dailyGoal: number;

  startSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  endSession: () => void;
  skipBreak: () => void;
  tick: () => void;
  setActiveTask: (taskId: string | null) => void;
  setDurations: (work: number, shortBreak: number, longBreak: number) => void;
  setDailyGoal: (goal: number) => void;
}

export const useFocusStore = create<FocusState>((set, get) => ({
  isRunning: false,
  isPaused: false,
  currentSession: "work",
  timeRemaining: 25 * 60,
  sessionsCompleted: 0,
  activeTaskId: null,
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  dailyGoal: 4,

  startSession: () => {
    const { workDuration } = get();
    set({
      isRunning: true,
      isPaused: false,
      currentSession: "work",
      timeRemaining: workDuration * 60,
    });
  },

  pauseSession: () => set({ isRunning: false, isPaused: true }),

  resumeSession: () => set({ isRunning: true, isPaused: false }),

  endSession: () => {
    const { workDuration } = get();
    set({
      isRunning: false,
      isPaused: false,
      currentSession: "work",
      timeRemaining: workDuration * 60,
    });
  },

  skipBreak: () => {
    const { workDuration, sessionsCompleted } = get();
    set({
      currentSession: "work",
      timeRemaining: workDuration * 60,
      sessionsCompleted: sessionsCompleted + 1,
    });
  },

  tick: () => {
    const { timeRemaining, currentSession, sessionsCompleted, workDuration, shortBreakDuration, longBreakDuration } = get();

    if (timeRemaining <= 1) {
      if (currentSession === "work") {
        const newCount = sessionsCompleted + 1;
        const isLongBreak = newCount % 4 === 0;
        const nextSession: SessionType = isLongBreak ? "long_break" : "short_break";
        const nextDuration = isLongBreak ? longBreakDuration : shortBreakDuration;
        set({
          currentSession: nextSession,
          timeRemaining: nextDuration * 60,
          sessionsCompleted: newCount,
          isRunning: true,
        });
      } else {
        set({
          currentSession: "work",
          timeRemaining: workDuration * 60,
          isRunning: true,
        });
      }
    } else {
      set({ timeRemaining: timeRemaining - 1 });
    }
  },

  setActiveTask: (taskId) => set({ activeTaskId: taskId }),

  setDurations: (work, shortBreak, longBreak) =>
    set({
      workDuration: work,
      shortBreakDuration: shortBreak,
      longBreakDuration: longBreak,
      timeRemaining: work * 60,
    }),

  setDailyGoal: (goal) => set({ dailyGoal: goal }),
}));
