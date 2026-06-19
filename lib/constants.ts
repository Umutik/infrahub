export const APP_NAME = "InfraHub";
export const ASSET_TYPES = [
    "Server",
    "Laptop",
    "Desktop",
    "Switch",
    "Router",
    "Firewall",
    "Storage",
    "Other",
  ] as const;
  
  export const ENVIRONMENTS = [
    "Production",
    "Staging",
    "Development",
    "DR",
  ] as const;
  
  export const STATUS_OPTIONS = [
    "active",
    "inactive",
    "retired",
    "maintenance",
  ] as const;
  
  export const STATUS_LABELS: Record<string, string> = {
    active: "Active",
    inactive: "Inactive",
    retired: "Retired",
    maintenance: "Maintenance",
  };
  
  export const STATUS_COLORS: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-700",
    retired: "bg-red-100 text-red-800",
    maintenance: "bg-yellow-100 text-yellow-800",
  };
