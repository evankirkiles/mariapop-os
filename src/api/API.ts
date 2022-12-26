export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      calendar_event_participants: {
        Row: {
          participant_id: string
          event_id: number
        }
        Insert: {
          participant_id: string
          event_id: number
        }
        Update: {
          participant_id?: string
          event_id?: number
        }
      }
      calendar_events: {
        Row: {
          id: number
          created_at: string
          creator: string
          title: string
          contents: string | null
          repeat_every_year: boolean
          repeat_every_month: boolean
          repeat_every_weekday: boolean
          year: number
          month: number
          day: number
          weekday: number
          enabled: boolean
          icon: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          creator: string
          title: string
          contents?: string | null
          repeat_every_year?: boolean
          repeat_every_month?: boolean
          repeat_every_weekday?: boolean
          year: number
          month: number
          day: number
          weekday: number
          enabled?: boolean
          icon?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          creator?: string
          title?: string
          contents?: string | null
          repeat_every_year?: boolean
          repeat_every_month?: boolean
          repeat_every_weekday?: boolean
          year?: number
          month?: number
          day?: number
          weekday?: number
          enabled?: boolean
          icon?: string | null
        }
      }
      mail: {
        Row: {
          id: number
          created_at: string
          contents: string | null
          sender: string
          recipient: string
          previous: number | null
          read: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          contents?: string | null
          sender: string
          recipient: string
          previous?: number | null
          read?: boolean
        }
        Update: {
          id?: number
          created_at?: string
          contents?: string | null
          sender?: string
          recipient?: string
          previous?: number | null
          read?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string
          name: string | null
          permissions: number
        }
        Insert: {
          id: string
          created_at?: string
          username: string
          name?: string | null
          permissions?: number
        }
        Update: {
          id?: string
          created_at?: string
          username?: string
          name?: string | null
          permissions?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_calendar_events: {
        Args: { p_month: number; p_year: number }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
