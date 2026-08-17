import { NextResponse } from "next/server";
import { db } from "@/lib/journal/db";

// GET /api/journal/stats?from=YYYY-MM-DD
// Lightweight fields for dashboard / year views (no journal text).
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");

  const fields =
    "entry_date, created_at, days_sober, sleep, mood, goal_accomplished, workout_type, workout_minutes, breakfast_plan, lunch_plan, dinner_plan, snacks_plan, weight";

  // Page through everything (Supabase caps a single select at 1000 rows).
  const all = [];
  const page = 1000;
  for (let i = 0; ; i += page) {
    let q = db()
      .from("journal_entries")
      .select(fields)
      .order("entry_date", { ascending: true })
      .order("created_at", { ascending: true })
      .range(i, i + page - 1);
    if (from) q = q.gte("entry_date", from);
    const { data, error } = await q;
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    all.push(...data);
    if (data.length < page) break;
  }

  return NextResponse.json({ entries: all });
}
