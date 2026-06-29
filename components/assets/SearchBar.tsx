"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchBarProps = {
  defaultValue?: string;
};

export default function SearchBar({ defaultValue }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(defaultValue ?? "");

  // Keep the input in sync when the URL changes
  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue]);

  // Debounce search updates
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedValue = value.trim();
      const currentSearch = searchParams.get("search") ?? "";
  
      // Do nothing if the search value did not actually change.
      // This prevents SearchBar from resetting page=1 when Pagination changes page.
      if (trimmedValue === currentSearch) {
        return;
      }
  
      const params = new URLSearchParams(searchParams.toString());
  
      if (trimmedValue) {
        params.set("search", trimmedValue);
      } else {
        params.delete("search");
      }
  
      params.set("page", "1");
  
      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
  
      router.push(nextUrl);
    }, 400);
  
    return () => clearTimeout(timer);
  }, [value, pathname, router, searchParams]);

  return (
    <div className="relative w-full">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      >
        🔍
      </span>

      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search by name..."
        aria-label="Search assets by name"
        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}