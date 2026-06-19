import { createClient } from "@/lib/supabase/server";
import type {
  AssetRow,
  AssetInsert,
  AssetUpdate,
} from "@/types/database.types";

export async function getAllAssets(): Promise<AssetRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("assets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch assets: ${error.message}`);
  }

  return data ?? [];
}

export async function getAssetById(id: string): Promise<AssetRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("assets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    // PGRST116 is returned when .single() finds no matching row.
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(`Failed to fetch asset ${id}: ${error.message}`);
  }

  return data;
}

export async function createAsset(data: AssetInsert): Promise<AssetRow> {
  const supabase = await createClient();

  const { data: created, error } = await supabase
    .from("assets")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create asset: ${error.message}`);
  }

  return created;
}

export async function updateAsset(
  id: string,
  data: AssetUpdate,
): Promise<AssetRow> {
  const supabase = await createClient();

  const { data: updated, error } = await supabase
    .from("assets")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update asset ${id}: ${error.message}`);
  }

  return updated;
}

export async function deleteAsset(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from("assets").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete asset ${id}: ${error.message}`);
  }
}
