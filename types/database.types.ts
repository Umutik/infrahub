export type AssetStatus =
  | "active"
  | "inactive"
  | "retired"
  | "maintenance";

export type Database = {
  public: {
    Tables: {
      assets: {
        Row: {
          id: string;
          asset_name: string;
          asset_type: string;
          environment: string;
          owner: string | null;
          status: AssetStatus;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          asset_name: string;
          asset_type: string;
          environment: string;
          owner?: string | null;
          status: AssetStatus;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          asset_name?: string;
          asset_type?: string;
          environment?: string;
          owner?: string | null;
          status?: AssetStatus;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "assets_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type AssetRow =
  Database["public"]["Tables"]["assets"]["Row"];

export type AssetInsert =
  Database["public"]["Tables"]["assets"]["Insert"];

export type AssetUpdate =
  Database["public"]["Tables"]["assets"]["Update"];