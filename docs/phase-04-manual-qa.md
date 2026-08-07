# Phase 04 Manual QA

 Date: 2026-06-25

| Test Case                                   | Result  |
| ------------------------------------------- | ------- |
| TC-4.01 Assets page loads                   | PASS    |
| TC-4.02 Search by partial name              | PASS    |
| TC-4.03 Search is case-insensitive          | PASS    |
| TC-4.04 Search — clear input                | PASS    |
| TC-4.05 Search — no results                 | PASS    |
| TC-4.06 Filter by status — active           | PASS    |
| TC-4.07 Filter by status — retired          | PASS    |
| TC-4.08 Filter by asset type                | PASS    |
| TC-4.09 Filter by environment               | PASS    |
| TC-4.10 Filter — no results                 | PASS    |
| TC-4.11 Clear filters button                | PASS    |
| TC-4.12 Sort by Name ascending              | PASS    |
| TC-4.13 Sort by Name — toggle direction     | PASS    |
| TC-4.14 Sort by Created At                  | PASS    |
| TC-4.15 Sort by Status                      | PASS    |
| TC-4.16 Pagination — next page              | PASS    |
| TC-4.17 Pagination — previous page          | PASS    |
| TC-4.18 Search + filter combined            | PASS    |
| TC-4.19 Filter + sort combined              | PASS    |
| TC-4.20 Filter resets page to 1             | PASS    |
| TC-4.21 URL persistence                     | PASS    |
| TC-4.22 Back button works                   | PASS    |
| TC-4.23 View still works on filtered rows   | PASS    |
| TC-4.24 Edit still works on filtered rows   | PASS    |
| TC-4.25 Delete still works on filtered rows | PASS    |
| TC-4.26 Empty state — no assets at all      | SKIPPED |
| TC-4.27 No pagination when ≤ 10 assets      | SKIPPED |
| TC-4.28 Results count text                  | PASS    |


| Check                                              | Result |
| -------------------------------------------------- | ------ |
| Assets page remains a Server Component             | PASS   |
| No `"use client"` in AssetsPage                    | PASS   |
| SearchBar uses client-side URL updates only        | PASS   |
| FilterBar uses client-side URL updates only        | PASS   |
| SortableColumn uses client-side URL updates only   | PASS   |
| Pagination uses client-side URL updates only       | PASS   |
| Data fetching stays in `getFilteredAssets()`       | PASS   |
| URL params persist search/filter/sort/page state   | PASS   |
| No infinite Fetch/XHR request loop after page load | PASS   |
| `npx tsc --noEmit` completed with no errors        | PASS   |
