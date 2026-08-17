"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/journal/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/journal");
      router.refresh();
    } else {
      setError("Wrong password.");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-xs text-center">
        <h1 className="font-[var(--font-display)] font-bold text-2xl mb-1">
          HALT Journal
        </h1>
        <p className="text-sm text-ink/60 mb-6">Private. Just for Troy.</p>
        <input
          type="password"
          inputMode="text"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-divider rounded-lg px-4 py-3 mb-3 bg-white text-base"
        />
        {error && <p className="text-accent text-sm mb-3">{error}</p>}
        <button
          type="submit"
          disabled={busy || !password}
          className="w-full bg-brand text-white rounded-lg py-3 font-semibold disabled:opacity-50"
        >
          {busy ? "…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}
