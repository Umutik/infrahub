"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AssetForm, { type AssetFormData } from "@/components/assets/AssetForm";

export default function NewAssetPage() {
  const router = useRouter();

  async function handleSubmit(data: AssetFormData) {
    const response = await fetch("/api/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error ?? "Failed to create asset");
    }

    router.push("/assets");
    router.refresh();
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/assets"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to Assets
        </Link>
        <h1 className="mt-2 text-2xl font-bold">New Asset</h1>
      </div>

      <div className="rounded-lg border border-black/[.08] bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-[#0a0a0a]">
        <AssetForm
          onSubmit={handleSubmit}
          submitLabel="Create Asset"
          cancelHref="/assets"
        />
      </div>
    </div>
  );
}
