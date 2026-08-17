import { NextResponse } from "next/server";
import { db, todayInTz, hashString } from "@/lib/journal/db";

// GET /api/journal/today?date=YYYY-MM-DD
// Returns yesterday's goal + sober count, today's prompt, and whether an
// entry already exists for the given date.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") || todayInTz();

  const supabase = db();

  const [{ data: last }, { data: existing }] = await Promise.all([
    supabase
      .from("journal_entries")
      .select("entry_date, days_sober, goal")
      .lt("entry_date", date)
      .order("entry_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("journal_entries")
      .select("id")
      .eq("entry_date", date)
      .limit(1),
  ]);

  // Day of week for the requested date (1=Mon..7=Sun)
  const d = new Date(`${date}T12:00:00Z`);
  const dow = ((d.getUTCDay() + 6) % 7) + 1;

  const { data: prompts } = await supabase
    .from("journal_prompts")
    .select("theme, prompt")
    .eq("day_of_week", dow)
    .eq("active", true)
    .order("id");

  let prompt = null;
  if (prompts && prompts.length) {
    prompt = prompts[hashString(date) % prompts.length];
  }

  return NextResponse.json({
    date,
    yesterday: last?.[0] || null,
    alreadyLogged: Boolean(existing?.length),
    prompt,
  });
}
