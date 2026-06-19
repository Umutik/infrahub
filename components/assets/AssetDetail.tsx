import type { AssetRow } from "@/types/database.types";
import StatusBadge from "@/components/assets/StatusBadge";

interface AssetDetailProps {
  asset: AssetRow;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function AssetDetail({ asset }: AssetDetailProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Asset Name
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {asset.asset_name}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Status
          </p>
          <div className="mt-1">
            <StatusBadge status={asset.status} />
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Asset Type
          </p>
          <p className="mt-1 text-gray-900">{asset.asset_type}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Environment
          </p>
          <p className="mt-1 text-gray-900">{asset.environment}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Description
          </p>
          {asset.description ? (
            <p className="mt-1 text-gray-900">{asset.description}</p>
          ) : (
            <p className="mt-1 text-gray-400">No description</p>
          )}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Created
          </p>
          <p className="mt-1 text-gray-900">{formatDate(asset.created_at)}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Last Updated
          </p>
          <p className="mt-1 text-gray-900">{formatDate(asset.updated_at)}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Owner ID
          </p>
          {asset.owner ? (
            <p className="mt-1 text-gray-900">{asset.owner}</p>
          ) : (
            <p className="mt-1 text-gray-400">No owner</p>
          )}
        </div>
      </div>
    </div>
  );
}
