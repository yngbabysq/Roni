"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, createProject, updateProject, deleteProject } from "@/lib/actions/projects";
import type { TablesInsert, TablesUpdate } from "@/types/database";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects().then(r => r.data ?? []),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Omit<TablesInsert<"projects">, "user_id">) =>
      createProject(input),
    onMutate: async (newProject) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });
      const previous = queryClient.getQueryData(["projects"]);

      queryClient.setQueryData(["projects"], (old: unknown[]) => [
        ...(old ?? []),
        { id: "temp-" + Date.now(), ...newProject, created_at: new Date().toISOString() },
      ]);

      return { previous };
    },
    onError: (_err, _input, context) => {
      queryClient.setQueryData(["projects"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: TablesUpdate<"projects"> }) =>
      updateProject(id, updates),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });
      const previous = queryClient.getQueryData(["projects"]);
      queryClient.setQueryData(
        ["projects"],
        (old: { id: string }[]) => (old ?? []).filter(p => p.id !== id)
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["projects"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
