import Link from "next/link";

import StatusBadge from "@/components/assets/StatusBadge";
import type { AssetRow } from "@/types/database.types";

interface RecentAssetsTableProps {
  assets: AssetRow[];
}

export default function RecentAssetsTable({ assets }: RecentAssetsTableProps) {
  if (assets.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Assets</h2>
        <Link
          href="/assets"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all →
        </Link>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
            <th scope="col" className="px-6 py-3 font-medium">Name</th>
            <th scope="col" className="px-6 py-3 font-medium">Type</th>
            <th scope="col" className="px-6 py-3 font-medium">Status</th>
            <th scope="col" className="px-6 py-3 font-medium">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td className="px-6 py-3">
                <Link
                  href={`/assets/${asset.id}`}
                  className="font-bold text-blue-600 hover:underline"
                >
                  {asset.asset_name}
                </Link>
              </td>
              <td className="px-6 py-3 text-gray-500">{asset.asset_type}</td>
              <td className="px-6 py-3">
                <StatusBadge status={asset.status} />
              </td>
              <td className="px-6 py-3 text-gray-500">
                {asset.created_at.slice(0, 10)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
