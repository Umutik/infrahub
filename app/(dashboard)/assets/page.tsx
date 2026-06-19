import Link from "next/link";
import { getAllAssets } from "@/services/assetService";
import AssetTable from "@/components/assets/AssetTable";
import type { AssetRow } from "@/types/database.types";

export default async function AssetsPage() {
  let assets: AssetRow[] = [];
  let hasError = false;

  try {
    assets = await getAllAssets();
  } catch {
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="p-6">
        <p className="text-red-600">Failed to load assets. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Assets</h1>
        <Link
          href="/assets/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + New Asset
        </Link>
      </div>
      <AssetTable assets={assets} />
    </div>
  );
}