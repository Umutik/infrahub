import Link from "next/link";

export default function EmptyDashboard() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
      <span className="text-6xl" role="img" aria-label="Package">
        📦
      </span>
      <h2 className="mt-6 text-xl font-semibold text-gray-900">No assets yet</h2>
      <p className="mt-2 max-w-md text-gray-500">
        Get started by adding your first IT asset — a server, laptop, or any
        piece of equipment you want to track.
      </p>
      <Link
        href="/assets/new"
        className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
      >
        + Create Your First Asset
      </Link>
    </div>
  );
}
