import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAllAssets, createAsset } from "@/services/asset.service";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const assets = await getAllAssets();
    return NextResponse.json({ data: assets });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch assets" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const { asset_name, asset_type, environment, status } = body;

    if (
      typeof asset_name !== "string" ||
      typeof asset_type !== "string" ||
      typeof environment !== "string" ||
      typeof status !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const allowedStatuses = [
      "active",
      "inactive",
      "retired",
      "maintenance",
    ];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status"},
        {status: 400},
      );
    }

    const asset = await createAsset({
      ...body,
      owner: user.id,
    });

    return NextResponse.json({ data: asset }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create asset" },
      { status: 500 },
    );
  }
}
