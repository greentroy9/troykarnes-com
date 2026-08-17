"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const PAGE = 20;

function fmtDate(d) {
  return new Date(`${d}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Entry({ e }) {
  const [open, setOpen] = useState(false);
  const preview = (e.journal || "").slice(0, 150);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white border border-divider rounded-xl p-4 mb-3"
    >
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <span className="font-semibold text-sm">{fmtDate(e.entry_date)}</span>
        {e.days_sober != null && (
          <span className="text-xs text-brand font-semibold shrink-0">
            Day {e.days_sober}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-ink/50 mb-2">
        {e.mood != null && <span>Mood {e.mood}/4</span>}
        {e.sleep != null && <span>Sleep {e.sleep}/4</span>}
        {e.weight != null && <span>{e.weight} lbs</span>}
        {e.workout_type && e.workout_type.toLowerCase() !== "none" && (
          <span>
            {e.workout_type}
            {e.workout_minutes ? ` ${e.workout_minutes}m` : ""}
          </span>
        )}
        {e.goal && <span>🎯 {e.goal}</span>}
      </div>
      {e.journal && (
        <p className="text-sm font-[var(--font-body)] leading-relaxed whitespace-pre-wrap">
          {open ? e.journal : preview + (e.journal.length > 150 ? "…" : "")}
        </p>
      )}
      {open && (e.breakfast || e.lunch || e.dinner || e.snacks) && (
        <div className="mt-3 pt-3 border-t border-divider/50 text-xs text-ink/60 space-y-0.5">
          {e.breakfast && <p>🍳 {e.breakfast}</p>}
          {e.lunch && <p>🥪 {e.lunch}</p>}
          {e.dinner && <p>🍽️ {e.dinner}</p>}
          {e.snacks && <p>🍿 {e.snacks}</p>}
        </div>
      )}
    </button>
  );
}

export default function ArchivePage() {
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const debounce = useRef(null);

  const load = useCallback(async (query, offset) => {
    setLoading(true);
    const params = new URLSearchParams({ limit: PAGE, offset });
    if (query) params.set("q", query);
    const res = await fetch(`/api/journal/entries?${params}`);
    const data = await res.json();
    setEntries((prev) =>
      offset === 0 ? data.entries || [] : [...prev, ...(data.entries || [])]
    );
    setTotal(data.total ?? 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    load("", 0);
  }, [load]);

  function onSearch(e) {
    const v = e.target.value;
    setQ(v);
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => load(v, 0), 350);
  }

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6">
      <h1 className="font-[var(--font-display)] font-bold text-2xl mb-4">
        Archive
      </h1>
      <input
        type="search"
        value={q}
        onChange={onSearch}
        placeholder="Search entries and goals…"
        className="w-full border border-divider rounded-lg px-3 py-2.5 bg-white text-base mb-4"
      />
      {total != null && (
        <p className="text-xs text-ink/40 mb-3">
          {total} entr{total === 1 ? "y" : "ies"}
        </p>
      )}
      {entries.map((e) => (
        <Entry key={e.id} e={e} />
      ))}
      {entries.length < (total || 0) && (
        <button
          onClick={() => load(q, entries.length)}
          disabled={loading}
          className="w-full bg-surface border border-divider rounded-lg py-3 font-semibold text-sm mb-8 disabled:opacity-50"
        >
          {loading ? "Loading…" : "Load more"}
        </button>
      )}
    </div>
  );
}
