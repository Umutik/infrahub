"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { signOutAction } from "@/app/(auth)/login/actions";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assets", label: "Assets" },
] as const;

type SidebarProps = {
  userEmail: string;
};

export default function Sidebar({ userEmail }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
        <Link
          href="/dashboard"
          className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          InfraHub
        </Link>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Infrastructure assets
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <p className="truncate text-sm text-zinc-600 dark:text-zinc-400">
          {userEmail}
        </p>
        <form action={signOutAction} className="mt-3">
          <button
            type="submit"
            className="w-full rounded-lg border border-black/[.08] px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-[#1a1a1a]"
          >
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
