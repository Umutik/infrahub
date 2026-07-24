"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ASSET_TYPES, ENVIRONMENTS, STATUS_OPTIONS } from "@/lib/constants";

type FilterBarProps = {
  currentStatus?: string;
  currentAssetType?: string;
  currentEnvironment?: string;
};

type FilterKey = "status" | "asset_type" | "environment";

export default function FilterBar({
  currentStatus,
  currentAssetType,
  currentEnvironment,
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: FilterKey, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset pagination whenever a filter changes
    params.set("page", "1");

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const hasActiveFilters = Boolean(
    currentStatus || currentAssetType || currentEnvironment
  );

  const selectClassName =
    "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={currentStatus ?? ""}
        onChange={(event) => updateFilter("status", event.target.value)}
        aria-label="Filter by status"
        className={selectClassName}
      >
        <option value="">All Statuses</option>
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={currentAssetType ?? ""}
        onChange={(event) => updateFilter("asset_type", event.target.value)}
        aria-label="Filter by asset type"
        className={selectClassName}
      >
        <option value="">All Types</option>
        {ASSET_TYPES.map((assetType) => (
          <option key={assetType} value={assetType}>
            {assetType}
          </option>
        ))}
      </select>

      <select
        value={currentEnvironment ?? ""}
        onChange={(event) => updateFilter("environment", event.target.value)}
        aria-label="Filter by environment"
        className={selectClassName}
      >
        <option value="">All Environments</option>
        {ENVIRONMENTS.map((environment) => (
          <option key={environment} value={environment}>
            {environment}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}