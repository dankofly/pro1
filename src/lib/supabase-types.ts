export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
        }
        Update: {
          full_name?: string | null
          updated_at?: string
        }
      }
      calculations: {
        Row: {
          id: string
          user_id: string
          label: string | null
          jahresgewinn: number
          monatliche_vorschreibung: number
          beitragsgrundlage: number
          endgueltige_svs: number
          vorlaeufige_svs: number
          nachzahlung: number
          spar_empfehlung: number
          steuer_ersparnis: number
          created_at: string
        }
        Insert: {
          user_id: string
          label?: string | null
          jahresgewinn: number
          monatliche_vorschreibung: number
          beitragsgrundlage: number
          endgueltige_svs: number
          vorlaeufige_svs: number
          nachzahlung: number
          spar_empfehlung: number
          steuer_ersparnis: number
        }
        Update: {
          label?: string | null
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Calculation = Database['public']['Tables']['calculations']['Row']
export type CalculationInsert = Database['public']['Tables']['calculations']['Insert']
