"use client";

import { create } from "zustand";

interface UIState {
  sidebarCollapsed: boolean;
  selectedTaskId: string | null;
  isTaskDetailOpen: boolean;
  isCreateProjectOpen: boolean;
  isCommandPaletteOpen: boolean;

  setSidebarCollapsed: (collapsed: boolean) => void;
  setSelectedTaskId: (id: string | null) => void;
  setIsTaskDetailOpen: (open: boolean) => void;
  setIsCreateProjectOpen: (open: boolean) => void;
  setIsCommandPaletteOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  selectedTaskId: null,
  isTaskDetailOpen: false,
  isCreateProjectOpen: false,
  isCommandPaletteOpen: false,

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
  setIsTaskDetailOpen: (open) => set({ isTaskDetailOpen: open }),
  setIsCreateProjectOpen: (open) => set({ isCreateProjectOpen: open }),
  setIsCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
}));
