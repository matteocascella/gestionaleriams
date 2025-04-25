export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      eventi: {
        Row: {
          carsexpected: number
          created_at: string
          date: string
          description: string
          id: string
          image: string | null
          location: string
          participants: number
          time: string
          title: string
        }
        Insert: {
          carsexpected?: number
          created_at?: string
          date: string
          description: string
          id?: string
          image?: string | null
          location: string
          participants?: number
          time: string
          title: string
        }
        Update: {
          carsexpected?: number
          created_at?: string
          date?: string
          description?: string
          id?: string
          image?: string | null
          location?: string
          participants?: number
          time?: string
          title?: string
        }
        Relationships: []
      }
      garage_convenzionati: {
        Row: {
          address: string
          created_at: string
          discount: number
          id: string
          name: string
          phone: string
          services: string
        }
        Insert: {
          address: string
          created_at?: string
          discount: number
          id?: string
          name: string
          phone: string
          services: string
        }
        Update: {
          address?: string
          created_at?: string
          discount?: number
          id?: string
          name?: string
          phone?: string
          services?: string
        }
        Relationships: []
      }
      soci: {
        Row: {
          address: string
          cardexpirydate: string
          cardnumber: string
          city: string
          created_at: string
          email: string
          id: string
          membershiptype: string
          membersince: string
          name: string
          notes: string | null
          phone: string
          postalcode: string
          status: string
          surname: string
          taxcode: string
        }
        Insert: {
          address: string
          cardexpirydate: string
          cardnumber: string
          city: string
          created_at?: string
          email: string
          id?: string
          membershiptype: string
          membersince: string
          name: string
          notes?: string | null
          phone: string
          postalcode: string
          status: string
          surname: string
          taxcode: string
        }
        Update: {
          address?: string
          cardexpirydate?: string
          cardnumber?: string
          city?: string
          created_at?: string
          email?: string
          id?: string
          membershiptype?: string
          membersince?: string
          name?: string
          notes?: string | null
          phone?: string
          postalcode?: string
          status?: string
          surname?: string
          taxcode?: string
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
      veicoli: {
        Row: {
          brand: string
          category: string
          created_at: string
          id: string
          licenseplate: string
          model: string
          ownerid: string
          status: string
          year: number
        }
        Insert: {
          brand: string
          category: string
          created_at?: string
          id?: string
          licenseplate: string
          model: string
          ownerid: string
          status: string
          year: number
        }
        Update: {
          brand?: string
          category?: string
          created_at?: string
          id?: string
          licenseplate?: string
          model?: string
          ownerid?: string
          status?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "veicoli_ownerid_fkey"
            columns: ["ownerid"]
            isOneToOne: false
            referencedRelation: "soci"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderatore" | "utente"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderatore", "utente"],
    },
  },
} as const
