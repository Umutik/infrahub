export type AssetFilters = {
  search?: string;
  status?: string;
  asset_type?: string;
  environment?: string;
  sort?: string;
  order?: string;
  page?: number;
};

function firstValue(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === undefined || raw === "") {
    return undefined;
  }
  return raw;
}

export function parseSearchParams(
  params: Record<string, string | string[] | undefined>
): AssetFilters {
  const search = firstValue(params.search);
  const status = firstValue(params.status);
  const asset_type = firstValue(params.asset_type);
  const environment = firstValue(params.environment);

  const sort = firstValue(params.sort) ?? "created_at";

  const rawOrder = firstValue(params.order);
  const order = rawOrder === "asc" || rawOrder === "desc" ? rawOrder : "desc";

  const rawPage = firstValue(params.page);
  const parsedPage = rawPage !== undefined ? Number(rawPage) : NaN;
  const page =
    Number.isInteger(parsedPage) && parsedPage >= 1 ? parsedPage : 1;

  return {
    search,
    status,
    asset_type,
    environment,
    sort,
    order,
    page,
  };
}

export function buildSearchParams(filters: AssetFilters): string {
  const query = new URLSearchParams();

  const stringKeys: (keyof AssetFilters)[] = [
    "search",
    "status",
    "asset_type",
    "environment",
    "sort",
    "order",
  ];

  for (const key of stringKeys) {
    const value = filters[key];
    if (typeof value === "string" && value !== "") {
      query.set(key, value);
    }
  }

  if (filters.page !== undefined && filters.page !== 1) {
    query.set("page", String(filters.page));
  }

  return query.toString();
}

export function buildUrl(base: string, filters: AssetFilters): string {
  const queryString = buildSearchParams(filters);
  return queryString ? `${base}?${queryString}` : base;
}
