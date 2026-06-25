import Link from "next/link";
import { getFilteredAssets } from "@/services/assetService";
import { parseSearchParams } from "@/lib/searchParams";
import AssetTable from "@/components/assets/AssetTable";
import SearchBar from "@/components/assets/SearchBar";
import FilterBar from "@/components/assets/FilterBar";

const PAGE_SIZE = 10;

export default async function AssetsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = parseSearchParams(await searchParams);

  let assets: Awaited<ReturnType<typeof getFilteredAssets>>["assets"] = [];
  let total = 0;

  try {
    ({ assets, total } = await getFilteredAssets(filters));
  } catch {
    return (
      <div className="p-6">
        <p className="text-red-600">Failed to load assets. Please try again.</p>
      </div>
    );
  }

  const currentPage = filters.page ?? 1;
  const start = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const end = Math.min(currentPage * PAGE_SIZE, total);

  const hasActiveFilters = Boolean(
    filters.search || filters.status || filters.asset_type || filters.environment
  );

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

      <div className="mb-4 space-y-3">
        <SearchBar defaultValue={filters.search} />

        <FilterBar
          currentStatus={filters.status}
          currentAssetType={filters.asset_type}
          currentEnvironment={filters.environment}
        />
      </div>

      <p className="mb-4 text-sm text-gray-500">
        {total === 0
          ? "No assets found"
          : `Showing ${start}–${end} of ${total} assets`}
      </p>

      {total === 0 && hasActiveFilters ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow">
          <p className="text-gray-500">No assets match your filters.</p>
        </div>
      ) : total === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow">
          <p className="text-gray-500">
            No assets found. Create your first asset to get started.
          </p>
        </div>
      ) : (
        <AssetTable
          assets={assets}
          currentSort={filters.sort ?? "created_at"}
          currentOrder={filters.order ?? "desc"}
        />
      )}

      {/* Pagination will be added in Step 08 */}
    </div>
  );
}