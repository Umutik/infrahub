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

export async function getAssetStats(): Promise<{
  total: number;
  active: number;
  inactive: number;
  retired: number;
  maintenance: number;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("assets").select("status");

  if (error) {
    throw new Error(`Failed to fetch asset stats: ${error.message}`);
  }

  const stats = {
    total: 0,
    active: 0,
    inactive: 0,
    retired: 0,
    maintenance: 0,
  };

  for (const asset of data ?? []) {
    stats.total += 1;

    switch (asset.status) {
      case "active":
        stats.active += 1;
        break;
      case "inactive":
        stats.inactive += 1;
        break;
      case "retired":
        stats.retired += 1;
        break;
      case "maintenance":
        stats.maintenance += 1;
        break;
    }
  }

  return stats;
}

export async function getRecentAssets(limit: number = 5): Promise<AssetRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("assets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch recent assets: ${error.message}`);
  }

  return data ?? [];
}
