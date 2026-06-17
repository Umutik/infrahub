import Link from "next/link";

type TopbarProps = {
  title?: string;
};

export default function Topbar({ title = "Dashboard" }: TopbarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>

      <Link
        href="/assets/new"
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        + New Asset
      </Link>
    </header>
  );
}