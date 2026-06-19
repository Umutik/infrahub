import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  maxLength?: number;
};

export default function Textarea({
  label,
  error,
  maxLength,
  id,
  value,
  className = "",
  ...props
}: TextareaProps) {
  const textareaId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const showCounter = maxLength !== undefined && typeof value === "string";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={textareaId}
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        value={value}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-800 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-950"
            : "border-zinc-200 dark:border-zinc-800"
        } ${className}`}
        {...props}
      />
      {showCounter ? (
        <p className="text-right text-xs text-zinc-500 dark:text-zinc-400">
          {value.length} / {maxLength} characters
        </p>
      ) : null}
      {error ? (
        <p
          id={`${textareaId}-error`}
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
