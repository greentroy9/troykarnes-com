"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export default function SettingsPage() {
  const router = useRouter();
  const [pushState, setPushState] = useState("loading"); // loading | unsupported | off | on
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setPushState("unsupported");
        return;
      }
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        setPushState(sub ? "on" : "off");
      } catch {
        setPushState("off");
      }
    })();
  }, []);

  async function enablePush() {
    setMsg("");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setMsg("Notifications were blocked. Enable them in iPhone Settings → HALT.");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      });
      const res = await fetch("/api/journal/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      if (!res.ok) throw new Error("Failed to save subscription");
      setPushState("on");
      setMsg("Reminders on. You'll get your goal at 10am.");
    } catch (err) {
      setMsg(err.message || "Could not enable notifications.");
    }
  }

  async function disablePush() {
    setMsg("");
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      await fetch("/api/journal/push", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: sub.endpoint }),
      });
      await sub.unsubscribe();
    }
    setPushState("off");
    setMsg("Reminders off on this device.");
  }

  async function logout() {
    await fetch("/api/journal/logout", { method: "POST" });
    router.push("/journal/login");
  }

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6">
      <h1 className="font-[var(--font-display)] font-bold text-2xl mb-6">
        Settings
      </h1>

      <section className="bg-white border border-divider rounded-xl p-4 mb-4">
        <h2 className="font-semibold text-sm mb-1">10am goal reminder</h2>
        <p className="text-xs text-ink/50 mb-3">
          A push notification with your goal for the day, at 10am Mountain Time.
          On iPhone: add this page to your Home Screen first (Share → Add to Home
          Screen), then open it from the icon and enable.
        </p>
        {pushState === "unsupported" && (
          <p className="text-sm text-ink/60">
            Notifications aren&apos;t available in this browser. On iPhone, open
            the app from your Home Screen icon.
          </p>
        )}
        {pushState === "off" && (
          <button
            onClick={enablePush}
            className="bg-brand text-white rounded-lg px-5 py-2.5 font-semibold text-sm"
          >
            Enable reminders
          </button>
        )}
        {pushState === "on" && (
          <button
            onClick={disablePush}
            className="bg-surface border border-divider rounded-lg px-5 py-2.5 font-semibold text-sm"
          >
            Turn off on this device
          </button>
        )}
        {msg && <p className="text-sm mt-3">{msg}</p>}
      </section>

      <section className="bg-white border border-divider rounded-xl p-4 mb-4">
        <h2 className="font-semibold text-sm mb-1">Your data</h2>
        <p className="text-xs text-ink/50 mb-3">
          Download every entry as a CSV (opens in Excel or Google Sheets). Your
          data also lives in your own Supabase account — you can log in there
          anytime.
        </p>
        <a
          href="/api/journal/export"
          className="inline-block bg-brand text-white rounded-lg px-5 py-2.5 font-semibold text-sm"
        >
          Download my data (CSV)
        </a>
      </section>

      <section className="bg-white border border-divider rounded-xl p-4 mb-8">
        <h2 className="font-semibold text-sm mb-3">Session</h2>
        <button
          onClick={logout}
          className="bg-surface border border-divider rounded-lg px-5 py-2.5 font-semibold text-sm"
        >
          Log out
        </button>
      </section>
    </div>
  );
}
