"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AssetForm, { type AssetFormData } from "@/components/assets/AssetForm";
import type { AssetRow } from "@/types/database.types";

export default function EditAssetPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [asset, setAsset] = useState<AssetRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    async function loadAsset() {
      try {
        const response = await fetch(`/api/assets/${id}`);

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error ?? "Failed to load asset");
        }

        const result = await response.json();
        setAsset(result.data);
      } catch {
        setError("Failed to load asset.");
      } finally {
        setIsLoading(false);
      }
    }

    loadAsset();
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
        <Link
          href="/assets"
          className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to Assets
        </Link>
      </div>
    );
  }

  if (asset === null) {
    return (
      <div className="p-6">
        <p>Asset not found.</p>
        <Link
          href="/assets"
          className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to Assets
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href={`/assets/${id}`}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to Asset
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Edit: {asset.asset_name}</h1>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <AssetForm
          initialData={asset}
          onSubmit={async (data: AssetFormData) => {
            const response = await fetch(`/api/assets/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              const result = await response.json();
              throw new Error(result.error ?? "Failed to update asset");
            }

            router.push(`/assets/${id}`);
          }}
          submitLabel="Save Changes"
          cancelHref={`/assets/${id}`}
        />
      </div>
    </div>
  );
}
