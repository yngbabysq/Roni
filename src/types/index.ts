export type Priority = "low" | "medium" | "high" | "critical";
export type TaskFolder = "inbox" | "today" | "upcoming" | "anytime" | "someday";
export type FocusSessionType = "work" | "short_break" | "long_break";
export type CalendarView = "3day" | "week" | "month";

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  onboarding_completed: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon: string | null;
  position: number;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  project_id: string | null;
  title: string;
  description: string | null;
  is_completed: boolean;
  priority: Priority;
  folder: TaskFolder;
  due_date: string | null;
  reminder_at: string | null;
  position: number;
  created_at: string;
  completed_at: string | null;
  subtasks?: Subtask[];
  tags?: Tag[];
}

export interface Subtask {
  id: string;
  task_id: string;
  title: string;
  is_completed: boolean;
  position: number;
}

export interface Tag {
  id: string;
  user_id: string;
  name: string;
  color: string;
}

export interface TaskTag {
  task_id: string;
  tag_id: string;
}

export interface Event {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  color: string;
  is_all_day: boolean;
  linked_task_id: string | null;
  created_at: string;
}

export interface FocusSession {
  id: string;
  user_id: string;
  task_id: string | null;
  duration_minutes: number;
  started_at: string;
  ended_at: string | null;
  type: FocusSessionType;
}

export interface UserSettings {
  user_id: string;
  pomodoro_work: number;
  pomodoro_short_break: number;
  pomodoro_long_break: number;
  daily_focus_goal: number;
  auto_start_breaks: boolean;
  auto_start_tasks: boolean;
}
