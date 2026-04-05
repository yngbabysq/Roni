"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/lib/actions/events";
import type { TablesInsert, TablesUpdate } from "@/types/database";

export function useEvents(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["events", startDate, endDate],
    queryFn: () => getEvents(startDate, endDate).then(r => r.data ?? []),
    enabled: !!startDate && !!endDate,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Omit<TablesInsert<"events">, "user_id">) =>
      createEvent(input),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: TablesUpdate<"events"> }) =>
      updateEvent(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });

      const queries = queryClient.getQueriesData({ queryKey: ["events"] });
      queries.forEach(([queryKey, data]) => {
        if (Array.isArray(data)) {
          queryClient.setQueryData(
            queryKey,
            data.map((e: { id: string }) => (e.id === id ? { ...e, ...updates } : e))
          );
        }
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });

      const queries = queryClient.getQueriesData({ queryKey: ["events"] });
      queries.forEach(([queryKey, data]) => {
        if (Array.isArray(data)) {
          queryClient.setQueryData(
            queryKey,
            data.filter((e: { id: string }) => e.id !== id)
          );
        }
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
