import type { ReactNode } from "react";

type StatCardVariant = "default" | "success" | "warning" | "danger";

interface StatCardProps {
  label: string;
  count: number;
  variant?: StatCardVariant;
  icon?: ReactNode;
  testId?: string;
}

const ICON_VARIANT_CLASSES: Record<StatCardVariant, string> = {
  default: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
};

export default function StatCard({
  label,
  count,
  variant = "default",
  icon,
  testId,
}: StatCardProps) {
  return (
    <div
      data-testid={testId}
      className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      {icon ? (
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${ICON_VARIANT_CLASSES[variant]}`}
        >
          {icon}
        </div>
      ) : null}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-2xl font-bold text-gray-900">{count}</span>
      </div>
    </div>
  );
}
