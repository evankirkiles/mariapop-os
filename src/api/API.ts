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
      mail: {
        Row: {
          id: number
          created_at: string
          contents: string | null
          sender: string
          recipient: string
          previous: number | null
        }
        Insert: {
          id?: number
          created_at?: string
          contents?: string | null
          sender: string
          recipient: string
          previous?: number | null
        }
        Update: {
          id?: number
          created_at?: string
          contents?: string | null
          sender?: string
          recipient?: string
          previous?: number | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string
          name: string | null
        }
        Insert: {
          id: string
          created_at?: string
          username: string
          name?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          username?: string
          name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
