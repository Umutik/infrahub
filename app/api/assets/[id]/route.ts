import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getAssetById,
  updateAsset,
  deleteAsset,
} from "@/services/assetService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const asset = await getAssetById(id);

    if (asset === null) {
      return NextResponse.json(
        { error: "Asset not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: asset });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch asset" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();

    const updated = await updateAsset(id, body);

    return NextResponse.json({ data: updated });
  } catch (error) {
    if (error instanceof Error && error.message.includes("No rows")) {
      return NextResponse.json(
        { error: "Asset not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Failed to update asset" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteAsset(id);

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete asset" },
      { status: 500 },
    );
  }
}
