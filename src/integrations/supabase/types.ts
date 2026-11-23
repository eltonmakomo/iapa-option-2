export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          consent: boolean
          country: string
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          organisation: string
          phone: string
          preferred_language: string
          status: string
          subject: string
        }
        Insert: {
          consent: boolean
          country: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          organisation?: string
          phone?: string
          preferred_language: string
          status?: string
          subject: string
        }
        Update: {
          consent?: boolean
          country?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          organisation?: string
          phone?: string
          preferred_language?: string
          status?: string
          subject?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          date_label: string
          id: string
          is_placeholder: boolean
          location: string
          sort: number
          status: string
          title_en: string
          title_fr: string
        }
        Insert: {
          date_label?: string
          id?: string
          is_placeholder?: boolean
          location?: string
          sort?: number
          status?: string
          title_en: string
          title_fr: string
        }
        Update: {
          date_label?: string
          id?: string
          is_placeholder?: boolean
          location?: string
          sort?: number
          status?: string
          title_en?: string
          title_fr?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer_en: string
          answer_fr: string
          category: string
          id: string
          is_placeholder: boolean
          question_en: string
          question_fr: string
          sort: number
        }
        Insert: {
          answer_en: string
          answer_fr: string
          category: string
          id?: string
          is_placeholder?: boolean
          question_en: string
          question_fr: string
          sort?: number
        }
        Update: {
          answer_en?: string
          answer_fr?: string
          category?: string
          id?: string
          is_placeholder?: boolean
          question_en?: string
          question_fr?: string
          sort?: number
        }
        Relationships: []
      }
      news_posts: {
        Row: {
          approach: string
          body_en: string
          body_fr: string
          country: string
          date_label: string
          id: string
          image_caption: string
          image_url: string
          is_placeholder: boolean
          kind: string
          sort: number
          title_en: string
          title_fr: string
        }
        Insert: {
          approach?: string
          body_en?: string
          body_fr?: string
          country?: string
          date_label?: string
          id?: string
          image_caption?: string
          image_url?: string
          is_placeholder?: boolean
          kind?: string
          sort?: number
          title_en: string
          title_fr: string
        }
        Update: {
          approach?: string
          body_en?: string
          body_fr?: string
          country?: string
          date_label?: string
          id?: string
          image_caption?: string
          image_url?: string
          is_placeholder?: boolean
          kind?: string
          sort?: number
          title_en?: string
          title_fr?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          language: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          language?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          language?: string
        }
        Relationships: []
      }
      regional_contacts: {
        Row: {
          email: string
          id: string
          is_placeholder: boolean
          name: string
        }
        Insert: {
          email?: string
          id: string
          is_placeholder?: boolean
          name?: string
        }
        Update: {
          email?: string
          id?: string
          is_placeholder?: boolean
          name?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          id: string
          is_placeholder: boolean
          sort: number
          title_en: string
          title_fr: string
          type_en: string
          type_fr: string
          url: string | null
        }
        Insert: {
          id?: string
          is_placeholder?: boolean
          sort?: number
          title_en: string
          title_fr: string
          type_en: string
          type_fr: string
          url?: string | null
        }
        Update: {
          id?: string
          is_placeholder?: boolean
          sort?: number
          title_en?: string
          title_fr?: string
          type_en?: string
          type_fr?: string
          url?: string | null
        }
        Relationships: []
      }
      scholarships: {
        Row: {
          body_en: string
          body_fr: string
          id: string
          is_placeholder: boolean
          sort: number
          title_en: string
          title_fr: string
        }
        Insert: {
          body_en?: string
          body_fr?: string
          id?: string
          is_placeholder?: boolean
          sort?: number
          title_en: string
          title_fr: string
        }
        Update: {
          body_en?: string
          body_fr?: string
          id?: string
          is_placeholder?: boolean
          sort?: number
          title_en?: string
          title_fr?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          contact_phones: string
          facebook_url: string
          hq_address: string
          hq_coordinates: string
          id: number
          linkedin_url: string
          office_hours: string
          secretariat_email: string
          show_placeholders: boolean
          whatsapp: string
          x_url: string
          youtube_url: string
        }
        Insert: {
          contact_phones?: string
          facebook_url?: string
          hq_address?: string
          hq_coordinates?: string
          id?: number
          linkedin_url?: string
          office_hours?: string
          secretariat_email?: string
          show_placeholders?: boolean
          whatsapp?: string
          x_url?: string
          youtube_url?: string
        }
        Update: {
          contact_phones?: string
          facebook_url?: string
          hq_address?: string
          hq_coordinates?: string
          id?: number
          linkedin_url?: string
          office_hours?: string
          secretariat_email?: string
          show_placeholders?: boolean
          whatsapp?: string
          x_url?: string
          youtube_url?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio_en: string
          bio_fr: string
          country: string
          group_key: string
          id: string
          is_placeholder: boolean
          linkedin: string
          name: string
          photo_url: string
          role_en: string
          role_fr: string
          sort: number
        }
        Insert: {
          bio_en?: string
          bio_fr?: string
          country?: string
          group_key: string
          id?: string
          is_placeholder?: boolean
          linkedin?: string
          name?: string
          photo_url?: string
          role_en: string
          role_fr: string
          sort?: number
        }
        Update: {
          bio_en?: string
          bio_fr?: string
          country?: string
          group_key?: string
          id?: string
          is_placeholder?: boolean
          linkedin?: string
          name?: string
          photo_url?: string
          role_en?: string
          role_fr?: string
          sort?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          is_placeholder: boolean
          name: string
          quote_en: string
          quote_fr: string
          role_en: string
          role_fr: string
          sort: number
        }
        Insert: {
          id?: string
          is_placeholder?: boolean
          name?: string
          quote_en: string
          quote_fr: string
          role_en: string
          role_fr: string
          sort?: number
        }
        Update: {
          id?: string
          is_placeholder?: boolean
          name?: string
          quote_en?: string
          quote_fr?: string
          role_en?: string
          role_fr?: string
          sort?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vacancies: {
        Row: {
          body_en: string
          body_fr: string
          id: string
          is_placeholder: boolean
          sort: number
          title_en: string
          title_fr: string
        }
        Insert: {
          body_en?: string
          body_fr?: string
          id?: string
          is_placeholder?: boolean
          sort?: number
          title_en: string
          title_fr: string
        }
        Update: {
          body_en?: string
          body_fr?: string
          id?: string
          is_placeholder?: boolean
          sort?: number
          title_en?: string
          title_fr?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
