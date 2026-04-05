"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { TablesInsert, TablesUpdate } from "@/types/database";

export async function getEvents(startDate: string, endDate: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", user.id)
    .gte("start_time", startDate)
    .lte("end_time", endDate)
    .order("start_time");

  return { data, error: error?.message };
}

export async function createEvent(
  input: Omit<TablesInsert<"events">, "user_id">
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("events")
    .insert({ ...input, user_id: user.id })
    .select()
    .single();

  if (!error) revalidatePath("/app/calendar");
  return { data, error: error?.message };
}

export async function updateEvent(
  id: string,
  updates: TablesUpdate<"events">
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("events")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (!error) revalidatePath("/app/calendar");
  return { data, error: error?.message };
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (!error) revalidatePath("/app/calendar");
  return { error: error?.message };
}
