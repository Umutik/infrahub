import Link from "next/link";

type AssetsEmptyStateProps = {
  hasFilters: boolean;
};

export default function AssetsEmptyState({
  hasFilters,
}: AssetsEmptyStateProps) {
  const content = hasFilters
    ? {
        icon: "🔍",
        heading: "No assets match your filters",
        subtext:
          "Try adjusting your search terms or filters to find what you are looking for.",
        linkText: "Clear all filters",
        href: "/assets",
      }
    : {
        icon: "📦",
        heading: "No assets yet",
        subtext: "Get started by adding your first IT asset.",
        linkText: "+ Create Your First Asset",
        href: "/assets/new",
      };

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-6 py-16 text-center shadow">
      <div className="text-4xl">{content.icon}</div>
      <h2 className="mt-4 text-lg font-semibold text-gray-900">
        {content.heading}
      </h2>
      <p className="mt-2 text-sm text-gray-500">{content.subtext}</p>
      <Link
        href={content.href}
        className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        {content.linkText}
      </Link>
    </div>
  );
}
