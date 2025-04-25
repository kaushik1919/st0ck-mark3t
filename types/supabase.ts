export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          risk_tolerance: string
          investment_style: string
          preferred_sectors: Json
          notification_settings: Json
          theme: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          risk_tolerance?: string
          investment_style?: string
          preferred_sectors?: Json
          notification_settings?: Json
          theme?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          risk_tolerance?: string
          investment_style?: string
          preferred_sectors?: Json
          notification_settings?: Json
          theme?: string
          created_at?: string
          updated_at?: string
        }
      }
      watchlists: {
        Row: {
          id: string
          user_id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      watchlist_items: {
        Row: {
          id: string
          watchlist_id: string
          symbol: string
          added_at: string
        }
        Insert: {
          id?: string
          watchlist_id: string
          symbol: string
          added_at?: string
        }
        Update: {
          id?: string
          watchlist_id?: string
          symbol?: string
          added_at?: string
        }
      }
      price_alerts: {
        Row: {
          id: string
          user_id: string
          symbol: string
          target_price: number
          alert_type: string
          is_triggered: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          target_price: number
          alert_type: string
          is_triggered?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          target_price?: number
          alert_type?: string
          is_triggered?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      portfolios: {
        Row: {
          id: string
          user_id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      portfolio_positions: {
        Row: {
          id: string
          portfolio_id: string
          symbol: string
          quantity: number
          average_price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          portfolio_id: string
          symbol: string
          quantity: number
          average_price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          portfolio_id?: string
          symbol?: string
          quantity?: number
          average_price?: number
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          portfolio_id: string
          symbol: string
          transaction_type: string
          quantity: number
          price: number
          total_amount: number
          transaction_date: string
          notes: string | null
        }
        Insert: {
          id?: string
          portfolio_id: string
          symbol: string
          transaction_type: string
          quantity: number
          price: number
          total_amount: number
          transaction_date?: string
          notes?: string | null
        }
        Update: {
          id?: string
          portfolio_id?: string
          symbol?: string
          transaction_type?: string
          quantity?: number
          price?: number
          total_amount?: number
          transaction_date?: string
          notes?: string | null
        }
      }
      recommendations: {
        Row: {
          id: string
          user_id: string
          recommendations: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          recommendations: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          recommendations?: Json
          created_at?: string
        }
      }
      market_anomalies: {
        Row: {
          id: string
          symbol: string
          anomaly_type: string
          severity: string
          details: Json
          detected_at: string
        }
        Insert: {
          id?: string
          symbol: string
          anomaly_type: string
          severity: string
          details: Json
          detected_at?: string
        }
        Update: {
          id?: string
          symbol?: string
          anomaly_type?: string
          severity?: string
          details?: Json
          detected_at?: string
        }
      }
      learning_resources: {
        Row: {
          id: string
          title: string
          description: string | null
          content: string | null
          resource_type: string
          difficulty_level: string
          tags: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          content?: string | null
          resource_type: string
          difficulty_level: string
          tags?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          content?: string | null
          resource_type?: string
          difficulty_level?: string
          tags?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_activity: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          details: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
  }
}
