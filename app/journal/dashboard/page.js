"use client";
import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const WINDOWS = [14, 30, 60, 90, 360];

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const avg = (arr) => {
  const v = arr.filter((x) => x != null && !Number.isNaN(x));
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};

function mealAvg(e) {
  return avg([e.breakfast_plan, e.lunch_plan, e.dinner_plan, e.snacks_plan]);
}

function fmt(n, digits = 1) {
  return n == null ? "—" : n.toFixed(digits);
}

function Delta({ now, prev, digits = 1, goodWhenUp = true }) {
  if (now == null || prev == null) return null;
  const d = now - prev;
  if (Math.abs(d) < 0.05) return <span className="text-xs text-ink/40">steady</span>;
  const up = d > 0;
  const good = up === goodWhenUp;
  return (
    <span className={`text-xs font-medium ${good ? "text-brand" : "text-accent"}`}>
      {up ? "▲" : "▼"} {Math.abs(d).toFixed(digits)}
    </span>
  );
}

function StatCard({ label, value, unit, delta }) {
  return (
    <div className="bg-white border border-divider rounded-xl p-4">
      <p className="text-xs text-ink/50 mb-1">{label}</p>
      <p className="font-[var(--font-display)] font-bold text-2xl leading-none">
        {value}
        {unit && <span className="text-sm font-medium text-ink/50"> {unit}</span>}
      </p>
      <div className="mt-1 h-4">{delta}</div>
    </div>
  );
}

function Chart({ title, children }) {
  return (
    <div className="bg-white border border-divider rounded-xl p-4 mb-4">
      <h3 className="font-semibold text-sm mb-2">{title}</h3>
      <div className="h-48">{children}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [all, setAll] = useState(null);
  const [win, setWin] = useState(14);

  useEffect(() => {
    fetch(`/api/journal/stats?from=${daysAgo(760)}`)
      .then((r) => r.json())
      .then((d) => setAll(d.entries || []))
      .catch(() => setAll([]));
  }, []);

  const view = useMemo(() => {
    if (!all) return null;
    const cutoff = daysAgo(win);
    const prevCutoff = daysAgo(win * 2);
    const cur = all.filter((e) => e.entry_date >= cutoff);
    const prev = all.filter(
      (e) => e.entry_date >= prevCutoff && e.entry_date < cutoff
    );

    const stats = (list) => ({
      weight: avg(list.map((e) => e.weight)),
      workout: avg(list.map((e) => e.workout_minutes)),
      sleep: avg(list.map((e) => e.sleep)),
      mood: avg(list.map((e) => e.mood)),
      eating: avg(list.map(mealAvg)),
      goalRate:
        list.filter((e) => e.goal_accomplished).length > 0
          ? (100 *
              list.filter((e) => e.goal_accomplished === "Yes").length) /
            list.filter((e) => e.goal_accomplished).length
          : null,
    });

    // Rolling 14-day averages, computed over ALL entries (so the first days of
    // the window still have a trailing average), then trimmed to the window.
    const ms = (d) => new Date(`${d}T00:00:00`).getTime();
    const ROLL = 14 * 86400000;
    const series = [];
    let start = 0;
    for (let i = 0; i < all.length; i++) {
      const e = all[i];
      const t = ms(e.entry_date);
      while (start < i && ms(all[start].entry_date) <= t - ROLL) start++;
      if (e.entry_date < cutoff) continue;
      const slice = all.slice(start, i + 1);
      series.push({
        date: e.entry_date.slice(5),
        weight: e.weight,
        mood: avg(slice.map((x) => x.mood)),
        sleep: avg(slice.map((x) => x.sleep)),
        workout: avg(slice.map((x) => x.workout_minutes)),
      });
    }

    // Workout mix: last 28 days. Entries can hold several comma-separated
    // activities, so each one is counted on its own.
    const cutoff28 = daysAgo(28);
    const recent = all.filter((e) => e.entry_date >= cutoff28);
    const mix = {};
    for (const e of recent) {
      for (let t of (e.workout_type || "").split(",")) {
        t = t.trim();
        if (!t || t.toLowerCase() === "none") continue;
        mix[t] = (mix[t] || 0) + 1;
      }
    }
    const mixData = Object.entries(mix)
      .map(([type, count]) => ({ type, count, perWeek: count / 4 }))
      .sort((a, b) => b.count - a.count);

    return { cur: stats(cur), prev: stats(prev), series, mixData, count: cur.length };
  }, [all, win]);

  if (!view) {
    return <p className="text-center pt-20 text-ink/50">Loading…</p>;
  }

  const { cur, prev, series, mixData } = view;

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6">
      <h1 className="font-[var(--font-display)] font-bold text-2xl mb-4">
        Dashboard
      </h1>

      <div className="flex gap-1.5 mb-5">
        {WINDOWS.map((w) => (
          <button
            key={w}
            onClick={() => setWin(w)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold border ${
              win === w
                ? "bg-brand text-white border-brand"
                : "bg-white border-divider text-ink/60"
            }`}
          >
            {w}d
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard
          label="Weight"
          value={fmt(cur.weight)}
          unit="lbs"
          delta={<Delta now={cur.weight} prev={prev.weight} goodWhenUp={false} />}
        />
        <StatCard
          label="Workout / day"
          value={fmt(cur.workout, 0)}
          unit="min"
          delta={<Delta now={cur.workout} prev={prev.workout} digits={0} />}
        />
        <StatCard
          label="Sleep"
          value={fmt(cur.sleep)}
          unit="/ 4"
          delta={<Delta now={cur.sleep} prev={prev.sleep} />}
        />
        <StatCard
          label="Mood"
          value={fmt(cur.mood)}
          unit="/ 4"
          delta={<Delta now={cur.mood} prev={prev.mood} />}
        />
        <StatCard
          label="Eating on-plan"
          value={fmt(cur.eating)}
          unit="/ 4"
          delta={<Delta now={cur.eating} prev={prev.eating} />}
        />
        <StatCard
          label="Goals hit"
          value={fmt(cur.goalRate, 0)}
          unit="%"
          delta={<Delta now={cur.goalRate} prev={prev.goalRate} digits={0} />}
        />
      </div>

      <Chart title="Weight">
        <ResponsiveContainer>
          <LineChart data={series} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ede8d1" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} minTickGap={30} />
            <YAxis domain={["dataMin - 2", "dataMax + 2"]} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#dc602e"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </Chart>

      <Chart title="Mood & Sleep, 14-day rolling average">
        <ResponsiveContainer>
          <LineChart data={series} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ede8d1" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} minTickGap={30} />
            <YAxis domain={[1, 4]} ticks={[1, 2, 3, 4]} tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v) => v?.toFixed(2)} />
            <Legend iconType="plainline" wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="mood" name="Mood" stroke="#69995d" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="sleep" name="Sleep" stroke="#b5b09a" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Chart>

      <Chart title="Workout minutes per day, 14-day rolling average">
        <ResponsiveContainer>
          <LineChart data={series} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ede8d1" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} minTickGap={30} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v) => `${Math.round(v)} min`} />
            <Line type="monotone" dataKey="workout" name="Minutes" stroke="#69995d" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Chart>

      <div className="bg-white border border-divider rounded-xl p-4 mb-4">
        <h3 className="font-semibold text-sm mb-3">Workout mix, last 28 days</h3>
        {mixData.length === 0 ? (
          <p className="text-sm text-ink/50">No workouts logged.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-ink/50 border-b border-divider">
                <th className="text-left font-medium pb-2">Activity</th>
                <th className="text-right font-medium pb-2">Sessions</th>
                <th className="text-right font-medium pb-2">Per week</th>
              </tr>
            </thead>
            <tbody>
              {mixData.map((m) => (
                <tr key={m.type} className="border-b border-divider/40 last:border-0">
                  <td className="py-2">{m.type}</td>
                  <td className="py-2 text-right tabular-nums">{m.count}</td>
                  <td className="py-2 text-right tabular-nums font-semibold">
                    {m.perWeek.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-center text-xs text-ink/40 mb-8">
        {view.count} check-ins in the last {win} days
      </p>
    </div>
  );
}
