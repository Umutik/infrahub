"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import {
  ASSET_TYPES,
  ENVIRONMENTS,
  STATUS_OPTIONS,
  STATUS_LABELS,
} from "@/lib/constants";
import type { AssetRow } from "@/types/database.types";

export type AssetFormData = {
  asset_name: string;
  asset_type: string;
  environment: string;
  status: string;
  description?: string | null;
};

type AssetFormProps = {
  initialData?: Partial<AssetRow>;
  onSubmit: (data: AssetFormData) => Promise<void>;
  submitLabel?: string;
  cancelHref: string;
};

export default function AssetForm({
  initialData,
  onSubmit,
  submitLabel,
  cancelHref,
}: AssetFormProps) {
  const [assetName, setAssetName] = useState(initialData?.asset_name ?? "");
  const [assetType, setAssetType] = useState(initialData?.asset_type ?? "");
  const [environment, setEnvironment] = useState(
    initialData?.environment ?? "",
  );
  const [status, setStatus] = useState<string>(
    initialData?.status ?? "active",
  );
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    const nextErrors: Record<string, string> = {};

    if (assetName.trim().length < 2) {
      nextErrors.asset_name = "Asset name must be at least 2 characters.";
    }
    if (!assetType) {
      nextErrors.asset_type = "Asset type is required.";
    }
    if (!environment) {
      nextErrors.environment = "Environment is required.";
    }
    if (!status) {
      nextErrors.status = "Status is required.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await onSubmit({
        asset_name: assetName.trim(),
        asset_type: assetType,
        environment,
        status,
        description: description.trim() || null,
      });
    } catch {
      setSubmitError("Failed to save asset. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          {submitError}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Input
            label="Asset Name"
            name="asset_name"
            required
            minLength={2}
            maxLength={120}
            value={assetName}
            onChange={(event) => setAssetName(event.target.value)}
            error={errors.asset_name}
          />
        </div>

        <Select
          label="Asset Type"
          name="asset_type"
          required
          value={assetType}
          onChange={(event) => setAssetType(event.target.value)}
          error={errors.asset_type}
        >
          <option value="">Select asset type</option>
          {ASSET_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>

        <Select
          label="Environment"
          name="environment"
          required
          value={environment}
          onChange={(event) => setEnvironment(event.target.value)}
          error={errors.environment}
        >
          <option value="">Select environment</option>
          {ENVIRONMENTS.map((env) => (
            <option key={env} value={env}>
              {env}
            </option>
          ))}
        </Select>

        <Select
          label="Status"
          name="status"
          required
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          error={errors.status}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {STATUS_LABELS[option]}
            </option>
          ))}
        </Select>

        <div className="md:col-span-2">
          <Textarea
            label="Description"
            name="description"
            rows={4}
            maxLength={500}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            error={errors.description}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link
          href={cancelHref}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/[.08] bg-transparent px-5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          Cancel
        </Link>
        <Button type="submit" variant="primary" loading={isLoading}>
          {submitLabel ?? "Save Asset"}
        </Button>
      </div>
    </form>
  );
}
