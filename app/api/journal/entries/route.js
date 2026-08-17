import { NextResponse } from "next/server";
import { db } from "@/lib/journal/db";

const NUM = (v) => (v === "" || v === null || v === undefined ? null : Number(v));
const TXT = (v) => {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s ? s : null;
};

// GET /api/journal/entries?limit=20&offset=0&q=search&from=..&to=..
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") || 20), 100);
  const offset = Number(searchParams.get("offset") || 0);
  const q = searchParams.get("q");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  let query = db()
    .from("journal_entries")
    .select("*", { count: "exact" })
    .order("entry_date", { ascending: false })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (q) query = query.or(`journal.ilike.%${q}%,goal.ilike.%${q}%`);
  if (from) query = query.gte("entry_date", from);
  if (to) query = query.lte("entry_date", to);

  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ entries: data, total: count });
}

// POST /api/journal/entries  — save today's check-in
export async function POST(request) {
  const b = await request.json().catch(() => ({}));
  if (!b.entry_date) {
    return NextResponse.json({ error: "entry_date required" }, { status: 400 });
  }

  const row = {
    entry_date: b.entry_date,
    days_sober: NUM(b.days_sober),
    sleep: NUM(b.sleep),
    mood: NUM(b.mood),
    goal_accomplished: TXT(b.goal_accomplished),
    workout_type: TXT(b.workout_type),
    workout_minutes: NUM(b.workout_minutes),
    breakfast: TXT(b.breakfast),
    breakfast_plan: NUM(b.breakfast_plan),
    lunch: TXT(b.lunch),
    lunch_plan: NUM(b.lunch_plan),
    dinner: TXT(b.dinner),
    dinner_plan: NUM(b.dinner_plan),
    snacks: TXT(b.snacks),
    snacks_plan: NUM(b.snacks_plan),
    weight: NUM(b.weight),
    goal: TXT(b.goal),
    prompt: TXT(b.prompt),
    journal: TXT(b.journal),
  };

  const { data, error } = await db()
    .from("journal_entries")
    .insert(row)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ entry: data });
}
