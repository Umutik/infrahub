import { getAssetStats, getRecentAssets } from "@/services/asset.service";
import StatCard from "@/components/dashboard/StatCard";
import RecentAssetsTable from "@/components/dashboard/RecentAssetsTable";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let stats;
  let recentAssets;

  try {
    [stats, recentAssets] = await Promise.all([
      getAssetStats(),
      getRecentAssets(5),
    ]);
  } catch (error) {
    console.error("Failed to load dashboard data:", error);

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
            <StatCard
              label="Total Assets"
              count={stats.total}
              variant="default"
              testId="stat-total-assets"
            />
            <StatCard
              label="Active"
              count={stats.active}
              variant="success"
              testId="stat-active-assets"
            />
            <StatCard
              label="Retired"
              count={stats.retired}
              variant="danger"
              testId="stat-retired-assets"
            />
            <StatCard
              label="Maintenance"
              count={stats.maintenance}
              variant="warning"
              testId="stat-maintenance-assets"
            />
          </div>

          <RecentAssetsTable assets={recentAssets} />
        </>
      )}
    </div>
  );
}
