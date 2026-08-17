import { db } from "@/lib/journal/db";

const COLS = [
  "entry_date",
  "created_at",
  "days_sober",
  "sleep",
  "mood",
  "goal_accomplished",
  "workout_type",
  "workout_minutes",
  "breakfast",
  "breakfast_plan",
  "lunch",
  "lunch_plan",
  "dinner",
  "dinner_plan",
  "snacks",
  "snacks_plan",
  "weight",
  "goal",
  "prompt",
  "journal",
];

function csvCell(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

// GET /api/journal/export → full CSV download
export async function GET() {
  const all = [];
  const page = 1000;
  for (let i = 0; ; i += page) {
    const { data, error } = await db()
      .from("journal_entries")
      .select(COLS.join(","))
      .order("entry_date", { ascending: true })
      .order("created_at", { ascending: true })
      .range(i, i + page - 1);
    if (error) return new Response(error.message, { status: 500 });
    all.push(...data);
    if (data.length < page) break;
  }

  const lines = [COLS.join(",")];
  for (const row of all) {
    lines.push(COLS.map((c) => csvCell(row[c])).join(","));
  }
  const csv = "﻿" + lines.join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="halt-journal-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
