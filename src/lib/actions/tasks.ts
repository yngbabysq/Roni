"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { TablesInsert, TablesUpdate, Enums } from "@/types/database";

export async function getTasks(folder?: Enums<"task_folder">) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  let query = supabase
    .from("tasks")
    .select("*, subtasks(*), task_tags(tag_id, tags(*))")
    .eq("user_id", user.id)
    .eq("is_completed", false)
    .order("position");

  if (folder) {
    query = query.eq("folder", folder);
  }

  const { data, error } = await query;
  return { data, error: error?.message };
}

export async function createTask(
  input: Omit<TablesInsert<"tasks">, "user_id">
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("tasks")
    .insert({ ...input, user_id: user.id })
    .select()
    .single();

  if (!error) revalidatePath("/app");
  return { data, error: error?.message };
}

export async function updateTask(
  id: string,
  updates: TablesUpdate<"tasks">
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (!error) revalidatePath("/app");
  return { data, error: error?.message };
}

export async function completeTask(id: string) {
  return updateTask(id, {
    is_completed: true,
    completed_at: new Date().toISOString(),
  });
}

export async function deleteTask(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (!error) revalidatePath("/app");
  return { error: error?.message };
}

export async function reorderTasks(
  taskIds: string[]
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const updates = taskIds.map((id, index) => ({ id, position: index }));

  const { error } = await supabase
    .from("tasks")
    .upsert(updates.map(u => ({ ...u, user_id: user.id })));

  return { error: error?.message };
}

export async function createSubtask(
  input: Omit<TablesInsert<"subtasks">, "id">
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subtasks")
    .insert(input)
    .select()
    .single();

  return { data, error: error?.message };
}

export async function updateSubtask(
  id: string,
  updates: TablesUpdate<"subtasks">
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subtasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  return { data, error: error?.message };
}

export async function deleteSubtask(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("subtasks").delete().eq("id", id);
  return { error: error?.message };
}
