"use client";
import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
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

    const series = cur.map((e) => ({
      date: e.entry_date.slice(5),
      weight: e.weight,
      sleep: e.sleep,
      mood: e.mood,
      workout: e.workout_minutes,
      eating: mealAvg(e),
    }));

    // Workout mix: last 28 days → average sessions per week
    const cutoff28 = daysAgo(28);
    const recent = all.filter((e) => e.entry_date >= cutoff28);
    const mix = {};
    for (const e of recent) {
      const t = (e.workout_type || "").trim();
      if (!t || t.toLowerCase() === "none") continue;
      mix[t] = (mix[t] || 0) + 1;
    }
    const mixData = Object.entries(mix)
      .map(([type, count]) => ({ type, perWeek: +(count / 4).toFixed(1) }))
      .sort((a, b) => b.perWeek - a.perWeek);

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

      <Chart title="Mood & Sleep (1–4)">
        <ResponsiveContainer>
          <LineChart data={series} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ede8d1" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} minTickGap={30} />
            <YAxis domain={[1, 4]} ticks={[1, 2, 3, 4]} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="mood" stroke="#69995d" strokeWidth={2} dot={false} connectNulls />
            <Line type="monotone" dataKey="sleep" stroke="#b5b09a" strokeWidth={2} dot={false} connectNulls />
          </LineChart>
        </ResponsiveContainer>
      </Chart>

      <Chart title="Workout minutes">
        <ResponsiveContainer>
          <BarChart data={series} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ede8d1" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} minTickGap={30} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="workout" fill="#69995d" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Chart>

      <Chart title="Workout mix — sessions per week (last month)">
        <ResponsiveContainer>
          <BarChart
            data={mixData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 30, bottom: 0 }}
          >
            <XAxis type="number" tick={{ fontSize: 10 }} />
            <YAxis
              type="category"
              dataKey="type"
              tick={{ fontSize: 11 }}
              width={80}
            />
            <Tooltip />
            <Bar dataKey="perWeek" fill="#dc602e" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Chart>

      <p className="text-center text-xs text-ink/40 mb-8">
        {view.count} check-ins in the last {win} days
      </p>
    </div>
  );
}
