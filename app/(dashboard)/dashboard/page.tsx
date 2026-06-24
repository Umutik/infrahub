import { getAssetStats, getRecentAssets } from "@/services/assetService";
import StatCard from "@/components/dashboard/StatCard";
import RecentAssetsTable from "@/components/dashboard/RecentAssetsTable";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";

export default async function DashboardPage() {
  let stats;
  let recentAssets;

  try {
    [stats, recentAssets] = await Promise.all([
      getAssetStats(),
      getRecentAssets(5),
    ]);
  } catch {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-red-700">
        Failed to load dashboard data. Please try refreshing the page.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stats.total === 0 ? (
        <EmptyDashboard />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Assets" count={stats.total} variant="default" />
            <StatCard label="Active" count={stats.active} variant="success" />
            <StatCard label="Retired" count={stats.retired} variant="danger" />
            <StatCard
              label="Maintenance"
              count={stats.maintenance}
              variant="warning"
            />
          </div>

          <RecentAssetsTable assets={recentAssets} />
        </>
      )}
    </div>
  );
}
