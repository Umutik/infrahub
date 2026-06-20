import Link from "next/link";
import type { AssetRow } from "@/types/database.types";
import StatusBadge from "@/components/assets/StatusBadge";
import DeleteButton from "@/components/assets/DeleteButton";

interface AssetTableProps {
  assets: AssetRow[];
}

export default function AssetTable({ assets }: AssetTableProps) {
  if (assets.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow">
        <p className="text-gray-500">
          No assets found. Create your first asset to get started.
        </p>
        <Link
          href="/assets/new"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Create Asset
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-900 text-xs uppercase text-white">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Environment</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr
              key={asset.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-4 py-3 font-bold">
                <Link href={`/assets/${asset.id}`} className="hover:underline">
                  {asset.asset_name}
                </Link>
              </td>
              <td className="px-4 py-3">{asset.asset_type}</td>
              <td className="px-4 py-3">{asset.environment}</td>
              <td className="px-4 py-3">
                <StatusBadge status={asset.status} />
              </td>
              <td className="px-4 py-3">{asset.created_at.slice(0, 10)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/assets/${asset.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/assets/${asset.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    assetId={asset.id}
                    assetName={asset.asset_name}
                    redirectTo="/assets"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
