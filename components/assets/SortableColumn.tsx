"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SortableColumnProps = {
  column: string;
  label: string;
  currentSort: string;
  currentOrder: string;
};

export default function SortableColumn({
  column,
  label,
  currentSort,
  currentOrder,
}: SortableColumnProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = column === currentSort;

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (isActive) {
      params.set("sort", column);
      params.set("order", currentOrder === "asc" ? "desc" : "asc");
    } else {
      params.set("sort", column);
      params.set("order", "desc");
    }

    // Reset pagination whenever the sort changes
    params.set("page", "1");

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const indicator = isActive ? (
    currentOrder === "asc" ? (
      <span>↑</span>
    ) : (
      <span>↓</span>
    )
  ) : (
    <span className="text-gray-500">↕</span>
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider hover:underline ${
        isActive ? "text-white" : "text-gray-300"
      }`}
    >
      {label}
      {indicator}
    </button>
  );
}
