import Link from "next/link";
import { notFound } from "next/navigation";
import { getAssetById } from "@/services/assetService";
import AssetDetail from "@/components/assets/AssetDetail";
import type { AssetRow } from "@/types/database.types";

export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let asset: AssetRow | null = null;
  let hasError = false;

  try {
    asset = await getAssetById(id);
  } catch {
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="p-6">
        <p className="text-red-600">Failed to load asset details.</p>
      </div>
    );
  }

  if (asset === null) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link
            href="/assets"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ← Back to Assets
          </Link>
          <h1 className="mt-2 text-2xl font-bold">{asset.asset_name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/assets/${id}/edit`}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Edit Asset
          </Link>
          <button
            type="button"
            className="rounded-md border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>

      <AssetDetail asset={asset} />
    </div>
  );
}
