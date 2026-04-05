"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, createTask, updateTask, completeTask, deleteTask } from "@/lib/actions/tasks";
import type { Enums, TablesInsert, TablesUpdate } from "@/types/database";

export function useTasks(folder?: Enums<"task_folder">) {
  return useQuery({
    queryKey: ["tasks", folder],
    queryFn: () => getTasks(folder).then(r => r.data ?? []),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Omit<TablesInsert<"tasks">, "user_id">) =>
      createTask(input),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData(["tasks", newTask.folder]);

      queryClient.setQueryData(
        ["tasks", newTask.folder ?? "inbox"],
        (old: unknown[]) => [
          ...(old ?? []),
          { id: "temp-" + Date.now(), ...newTask, is_completed: false, position: 0 },
        ]
      );

      return { previousTasks };
    },
    onError: (_err, newTask, context) => {
      queryClient.setQueryData(["tasks", newTask.folder], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: TablesUpdate<"tasks"> }) =>
      updateTask(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const queries = queryClient.getQueriesData({ queryKey: ["tasks"] });
      queries.forEach(([queryKey, data]) => {
        if (Array.isArray(data)) {
          queryClient.setQueryData(
            queryKey,
            data.map((t: { id: string }) => (t.id === id ? { ...t, ...updates } : t))
          );
        }
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => completeTask(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const queries = queryClient.getQueriesData({ queryKey: ["tasks"] });
      queries.forEach(([queryKey, data]) => {
        if (Array.isArray(data)) {
          queryClient.setQueryData(
            queryKey,
            data.filter((t: { id: string }) => t.id !== id)
          );
        }
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const queries = queryClient.getQueriesData({ queryKey: ["tasks"] });
      queries.forEach(([queryKey, data]) => {
        if (Array.isArray(data)) {
          queryClient.setQueryData(
            queryKey,
            data.filter((t: { id: string }) => t.id !== id)
          );
        }
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
