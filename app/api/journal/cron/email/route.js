import { NextResponse } from "next/server";
import { db, todayInTz } from "@/lib/journal/db";

export const maxDuration = 60;

// Fired by Vercel cron at 17:00 and 18:00 UTC.
// Sends the 11am Mountain Time goal reminder email exactly once per day —
// the handler checks that it is currently the 11 o'clock hour in Denver
// (one of the two UTC slots matches depending on daylight saving).
export async function GET(request) {
  const auth = request.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.JOURNAL_EMAIL_TO;
  if (!apiKey || !to) {
    return NextResponse.json({ skipped: true, reason: "email not configured" });
  }

  const hourDenver = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Denver",
      hour: "numeric",
      hour12: false,
    }).format(new Date())
  );
  if (hourDenver !== 11) {
    return NextResponse.json({ skipped: true, hourDenver });
  }

  const today = todayInTz("America/Denver");
  const supabase = db();

  // Only send once per day.
  const { data: kv } = await supabase
    .from("journal_kv")
    .select("value")
    .eq("key", "last_email_date")
    .maybeSingle();
  if (kv?.value === today) {
    return NextResponse.json({ skipped: true, reason: "already sent" });
  }

  // Today's goal (from this morning's check-in) or yesterday's as fallback.
  const { data: entries } = await supabase
    .from("journal_entries")
    .select("entry_date, goal")
    .order("entry_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1);
  const latest = entries?.[0];

  let headline;
  let goal = null;
  if (latest?.entry_date === today && latest.goal) {
    headline = "Today's goal";
    goal = latest.goal;
  } else if (latest?.goal) {
    headline = "You haven't checked in yet. Yesterday's goal was";
    goal = latest.goal;
  } else {
    headline = "Time to check in with your journal";
  }

  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const link = "https://troykarnes.com/journal";
  const text = goal
    ? `${headline}:\n\n${goal}\n\n${link}`
    : `${headline}.\n\n${link}`;
  const html = goal
    ? `<p>${esc(headline)}:</p><p style="font-size:18px"><strong>${esc(goal)}</strong></p><p><a href="${link}">Open your journal</a></p>`
    : `<p>${esc(headline)}.</p><p><a href="${link}">Open your journal</a></p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.JOURNAL_EMAIL_FROM || "HALT Journal <onboarding@resend.dev>",
      to,
      subject: "HALT Journal 🎯 Your goal for today",
      text,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: "send failed", detail: err }, { status: 502 });
  }

  await supabase
    .from("journal_kv")
    .upsert({ key: "last_email_date", value: today });

  return NextResponse.json({ sent: true });
}
