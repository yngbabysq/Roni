export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      events: {
        Row: {
          color: string
          created_at: string
          description: string | null
          end_time: string
          id: string
          is_all_day: boolean
          linked_task_id: string | null
          start_time: string
          title: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          end_time: string
          id?: string
          is_all_day?: boolean
          linked_task_id?: string | null
          start_time: string
          title: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          end_time?: string
          id?: string
          is_all_day?: boolean
          linked_task_id?: string | null
          start_time?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      focus_sessions: {
        Row: {
          created_at: string
          duration_minutes: number
          ended_at: string | null
          id: string
          started_at: string
          task_id: string | null
          type: Database["public"]["Enums"]["focus_session_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_minutes: number
          ended_at?: string | null
          id?: string
          started_at: string
          task_id?: string | null
          type?: Database["public"]["Enums"]["focus_session_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          duration_minutes?: number
          ended_at?: string | null
          id?: string
          started_at?: string
          task_id?: string | null
          type?: Database["public"]["Enums"]["focus_session_type"]
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          onboarding_completed: boolean
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id: string
          onboarding_completed?: boolean
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          onboarding_completed?: boolean
        }
        Relationships: []
      }
      projects: {
        Row: {
          color: string
          created_at: string
          icon: string | null
          id: string
          name: string
          position: number
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          icon?: string | null
          id?: string
          name: string
          position?: number
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
          position?: number
          user_id?: string
        }
        Relationships: []
      }
      subtasks: {
        Row: {
          id: string
          is_completed: boolean
          position: number
          task_id: string
          title: string
        }
        Insert: {
          id?: string
          is_completed?: boolean
          position?: number
          task_id: string
          title: string
        }
        Update: {
          id?: string
          is_completed?: boolean
          position?: number
          task_id?: string
          title?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      task_tags: {
        Row: {
          tag_id: string
          task_id: string
        }
        Insert: {
          tag_id: string
          task_id: string
        }
        Update: {
          tag_id?: string
          task_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          folder: Database["public"]["Enums"]["task_folder"]
          id: string
          is_completed: boolean
          position: number
          priority: Database["public"]["Enums"]["task_priority"]
          project_id: string | null
          reminder_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          folder?: Database["public"]["Enums"]["task_folder"]
          id?: string
          is_completed?: boolean
          position?: number
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id?: string | null
          reminder_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          folder?: Database["public"]["Enums"]["task_folder"]
          id?: string
          is_completed?: boolean
          position?: number
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id?: string | null
          reminder_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          auto_start_breaks: boolean
          auto_start_tasks: boolean
          daily_focus_goal: number
          pomodoro_long_break: number
          pomodoro_short_break: number
          pomodoro_work: number
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_start_breaks?: boolean
          auto_start_tasks?: boolean
          daily_focus_goal?: number
          pomodoro_long_break?: number
          pomodoro_short_break?: number
          pomodoro_work?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_start_breaks?: boolean
          auto_start_tasks?: boolean
          daily_focus_goal?: number
          pomodoro_long_break?: number
          pomodoro_short_break?: number
          pomodoro_work?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: {
      delete_user: { Args: never; Returns: undefined }
    }
    Enums: {
      focus_session_type: "work" | "short_break" | "long_break"
      task_folder: "inbox" | "today" | "upcoming" | "anytime" | "someday"
      task_priority: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: { [_ in never]: never }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Row"]

export type TablesInsert<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Insert"]

export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Update"]

export type Enums<T extends keyof DefaultSchema["Enums"]> =
  DefaultSchema["Enums"][T]
