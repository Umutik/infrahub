"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const navigate = (page: number) => {
    const safePage = Math.min(Math.max(page, 1), totalPages);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", safePage.toString());

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const buttonClassName =
    "px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages} · {totalItems} total assets
      </p>

      <div>
        <button
          type="button"
          className={buttonClassName}
          disabled={currentPage === 1}
          onClick={() => navigate(currentPage - 1)}
        >
          ← Previous
        </button>

        <button
          type="button"
          className={`${buttonClassName} ml-2`}
          disabled={currentPage === totalPages}
          onClick={() => navigate(currentPage + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}