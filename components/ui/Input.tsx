import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`h-11 rounded-lg border bg-white px-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-800 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-950"
            : "border-zinc-200 dark:border-zinc-800"
        } ${className}`}
        {...props}
      />
      {error ? (
        <p
          id={`${inputId}-error`}
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
