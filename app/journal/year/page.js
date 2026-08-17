"use client";
import { useEffect, useMemo, useState } from "react";

const avg = (arr) => {
  const v = arr.filter((x) => x != null && !Number.isNaN(x));
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};

function Big({ n, label, color = "text-ink" }) {
  return (
    <div className="bg-white border border-divider rounded-xl p-4 text-center">
      <p className={`font-[var(--font-display)] font-bold text-3xl ${color}`}>
        {n}
      </p>
      <p className="text-xs text-ink/50 mt-1">{label}</p>
    </div>
  );
}

function DayCard({ e }) {
  const [open, setOpen] = useState(false);
  if (!e) return null;
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white border border-divider rounded-xl p-4 mb-3"
    >
      <div className="flex items-baseline justify-between mb-1">
        <span className="font-semibold text-sm">
          {new Date(`${e.entry_date}T12:00:00`).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span className="text-xs text-ink/50">Mood {e.mood}/4</span>
      </div>
      {e.goal && <p className="text-xs text-ink/60 mb-1">🎯 {e.goal}</p>}
      {e.journal && (
        <p className="text-sm font-[var(--font-body)] leading-relaxed whitespace-pre-wrap">
          {open ? e.journal : e.journal.slice(0, 120) + (e.journal.length > 120 ? "…" : "")}
        </p>
      )}
    </button>
  );
}

export default function YearPage() {
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(thisYear);
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    setEntries(null);
    const params = new URLSearchParams({
      from: `${year}-01-01`,
      to: `${year}-12-31`,
      limit: 100,
      offset: 0,
    });
    // page through the whole year (up to ~366 entries)
    (async () => {
      const all = [];
      for (let offset = 0; ; offset += 100) {
        params.set("offset", offset);
        const res = await fetch(`/api/journal/entries?${params}`);
        const data = await res.json();
        all.push(...(data.entries || []));
        if (!data.entries || all.length >= (data.total || 0)) break;
      }
      setEntries(all);
    })();
  }, [year]);

  const v = useMemo(() => {
    if (!entries) return null;
    const kickass = entries.filter((e) => e.mood === 4);
    const awful = entries.filter((e) => e.mood === 1);
    const withGoal = entries.filter((e) => e.goal_accomplished);
    return {
      count: entries.length,
      kickass,
      awful,
      goalPct: withGoal.length
        ? Math.round(
            (100 * withGoal.filter((e) => e.goal_accomplished === "Yes").length) /
              withGoal.length
          )
        : null,
      avgMood: avg(entries.map((e) => e.mood)),
      avgSleep: avg(entries.map((e) => e.sleep)),
      weights: entries.filter((e) => e.weight != null),
    };
  }, [entries]);

  const years = [];
  for (let y = thisYear; y >= 2021; y--) years.push(y);

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6">
      <h1 className="font-[var(--font-display)] font-bold text-2xl mb-4">
        Year in Review
      </h1>

      <div className="flex gap-1.5 mb-5 overflow-x-auto">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border shrink-0 ${
              year === y
                ? "bg-brand text-white border-brand"
                : "bg-white border-divider text-ink/60"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {!v ? (
        <p className="text-center pt-10 text-ink/50">Loading…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Big n={v.count} label="check-ins" />
            <Big
              n={v.goalPct != null ? `${v.goalPct}%` : "—"}
              label="goals hit"
            />
            <Big n={v.kickass.length} label="kick-ass days (4/4)" color="text-brand" />
            <Big n={v.awful.length} label="awful days (1/4)" color="text-accent" />
            <Big n={v.avgMood ? v.avgMood.toFixed(2) : "—"} label="avg mood" />
            <Big n={v.avgSleep ? v.avgSleep.toFixed(2) : "—"} label="avg sleep" />
          </div>

          {v.weights.length > 1 && (
            <p className="text-sm text-ink/60 mb-6 text-center">
              Weight: started {v.weights[v.weights.length - 1].weight} lbs → latest{" "}
              {v.weights[0].weight} lbs
            </p>
          )}

          <h2 className="font-[var(--font-display)] font-bold text-lg mb-2 text-brand">
            Kick-ass days ({v.kickass.length})
          </h2>
          {v.kickass.slice(0, 30).map((e) => (
            <DayCard key={e.id} e={e} />
          ))}
          {v.kickass.length === 0 && (
            <p className="text-sm text-ink/50 mb-4">None yet this year.</p>
          )}

          <h2 className="font-[var(--font-display)] font-bold text-lg mb-2 mt-6 text-accent">
            Awful days ({v.awful.length})
          </h2>
          {v.awful.slice(0, 30).map((e) => (
            <DayCard key={e.id} e={e} />
          ))}
          {v.awful.length === 0 && (
            <p className="text-sm text-ink/50 mb-8">None. 💪</p>
          )}
          <div className="h-8" />
        </>
      )}
    </div>
  );
}
