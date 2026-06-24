import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAssetStats } from "@/services/assetService";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stats = await getAssetStats();
    return NextResponse.json({ data: stats });
  } catch {
    return NextResponse.json(
      { error: "Failed to load dashboard stats" },
      { status: 500 },
    );
  }
}
