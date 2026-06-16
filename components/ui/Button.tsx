import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] disabled:opacity-50",
  secondary:
    "border border-black/[.08] bg-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] disabled:opacity-50",
  danger:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 disabled:opacity-50",
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
