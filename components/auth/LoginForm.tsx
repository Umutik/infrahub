"use client";

import { useState, type FormEvent } from "react";

import {
  demoLoginAction,
  loginAction,
} from "@/app/(auth)/login/actions";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await loginAction(email, password);

      if (result?.error) {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDemoLogin() {
    setDemoLoading(true);
    setError("");

    try {
      const result = await demoLoginAction();

      if (result?.error) {
        setError(result.error);
      }
    } finally {
      setDemoLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4"
    >
      <Input
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      {error ? (
        <p
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        loading={loading}
        className="w-full"
      >
        Sign In
      </Button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <span className="text-xs uppercase tracking-wide text-zinc-500">
          or
        </span>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <Button
        type="button"
        variant="secondary"
        loading={demoLoading}
        className="w-full"
        onClick={handleDemoLogin}
      >
        Explore Demo
      </Button>

      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        Explore the portfolio without entering credentials.
      </p>
    </form>
  );
}